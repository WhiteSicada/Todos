from rest_framework import generics, permissions,viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated 



# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        # "token": AuthToken.objects.create(user)[1]
        })



class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                content = {"Error": "Unable to log in with provided credentials."}
                return Response(content)
        else:
            content = {"Error": "Must include username and password."}
            return Response(content)
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)



class UserViewSet(viewsets.ModelViewSet):

    model = User
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self,request,pk=None):
        user = request.user
        if str(user.id) == str(pk):
            serializer = UserSerializer(user)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            raise APIException("You cannot Access this data.")

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)