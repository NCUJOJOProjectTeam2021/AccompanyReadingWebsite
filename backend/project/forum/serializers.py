from rest_framework import serializers
from .models import *


class ForumSerializer(serializers.ModelSerializer):
    class Meta:
        table_name = 'Post_table'
        model = Post
        fields = "__all__"
