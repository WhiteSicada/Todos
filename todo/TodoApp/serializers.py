from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):

    author = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Todo
        exclude = ("created_at",)

class TodoCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('completed',)