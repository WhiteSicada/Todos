from .views import *
from django.urls import path,include
from knox import views as knox_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='TheUsers')


urlpatterns = [
    path("", include(router.urls)),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('me/',CurrentUserView.as_view()),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]