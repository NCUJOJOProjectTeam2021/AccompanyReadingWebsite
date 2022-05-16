from rest_framework import serializers
from .models import *


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        table_name = 'Thread_table'
        model = Reply
        fields = "__all__"


class ForumSerializer(serializers.ModelSerializer):
    threads = ThreadSerializer(read_only=True, many=True)
    Post_created_date = serializers.DateTimeField(
        read_only=True, default=datetime.datetime.now, format="%Y-%m-%d %H:%M:%S")

    class Meta:
        table_name = 'Post_table'
        model = Post
        fields = "__all__"
