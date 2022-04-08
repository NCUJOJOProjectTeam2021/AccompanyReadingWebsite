from django.shortcuts import render, redirect
from .models import *
from .serializers import ForumSerializer
from rest_framework import viewsets
# Create your views here.


class ForumView(viewsets.ModelViewSet):
    serializer_class = ForumSerializer
    queryset = Post.objects.all()

# ----------------------------------------------------------------------
# If the request is not POST, It would only return a adding page,
# and after finishing the form, the request class would save the POST information
# in the request object, and return the request again
# ----------------------------------------------------------------------

# def addPost(request):
#     form = CreatePost()
#     if request.method == 'POST':
#         form = CreatePost(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('/')
#     context = {'form': form}
#     return render(request, 'addPost.html', context)


# def addReply(request):
#     form = CreateReply()
#     if request.method == 'POST':
#         form = CreateReply(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('/')
#     context = {'form': form}
#     return render(request, 'addReply.html', context)
