from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet,CheckAll,ClearCompleted

router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("CheckAll/<str:completed>/", CheckAll.as_view()),
    path("ClearCompleted/", ClearCompleted.as_view()),
]