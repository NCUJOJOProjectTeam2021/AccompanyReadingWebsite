# from urllib import response
# from django.shortcuts import render
import email
from .serializers import RegisterSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import User

# Create your views here.


# Same effect as RegisterView
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer

class HelloAPIView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'hello'}
        return Response(data=content, status=status.HTTP_200_OK)


class GetUsernameView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_email = request.user
        user = User.objects.get(email=user_email)
        content = {'message': 'hello', 'user': str(user.username)}
        return Response(data=content, status=status.HTTP_200_OK)


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        user = request.data
        serializer = RegisterSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data

        response = {
            'status': status.HTTP_201_CREATED,
            'user': user_data,
            'message': 'User Registered successfully',
        }

        return Response(response, status=status.HTTP_201_CREATED)


class LogoutView(generics.GenericAPIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        return Response(status=status.HTTP_205_RESET_CONTENT)


# class LoginAPIView(generics.GenericAPIView):

#     serializer_class = LoginSerializer
#     permission_classes = (AllowAny,)

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
