from rest_framework import viewsets,status
from .serializers import TodoSerializer,TodoCompletedSerializer
from .models import Todo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import APIException


class TodoViewSet(viewsets.ModelViewSet):
    
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Todo.objects.filter(author=self.request.user)
        return queryset

    def perform_create(self, serializer):
        author = self.request.user
        serializer.save(author=author)

    # def perform_update(self, serializer):
    #     obj = self.get_object()
    #     if str(obj.author) == str(self.request.user):
    #         serializer.save()
    #     else:
    #         raise APIException("You cannot update others todos")

class CheckAll(APIView):

    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        completed = self.kwargs['completed']
        queryset = Todo.objects.filter(author=self.request.user)
        instances = []
        if completed == "true":
            for todoItem in queryset:
                todoItem.completed = True
                todoItem.save()
                instances.append(todoItem)
        else:
            for todoItem in queryset:
                todoItem.completed = False
                todoItem.save()
                instances.append(todoItem)
        serializer = TodoCompletedSerializer(instances, many=True)
        return Response(serializer.data)

class ClearCompleted(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        queryset = Todo.objects.filter(author=self.request.user)
        for todoItem in queryset:
            if todoItem.completed:
                Todo.objects.get(id=todoItem.id).delete()
        return Response('Deleted !')