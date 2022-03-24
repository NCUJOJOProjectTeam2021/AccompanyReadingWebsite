from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib import auth


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password1 = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True
    )

    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password1']
        )
        user.save()
        return user


# class LoginSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(write_only=True, required=True)
#     username = serializers.CharField(read_only=True)
#     tokens = serializers.SerializerMethodField()

#     def get_tokens(self, obj):
#         user = User.objects.get(email=obj['email'])

#         return {
#             'refresh': user.tokens()['refresh'],
#             'access': user.tokens()['access']
#         }

#     class Meta:
#         model = User
#         fields = ['email', 'password', 'username', 'tokens']

#     def validate(self, attrs):
#         email = attrs['email']
#         password = attrs['password']
#         user = auth.authenticate(email=email, password=password)

#         if not user:
#             raise AuthenticationFailed('Invalid credentials, try again')
#         if not user.is_active:
#             raise AuthenticationFailed('Account disabled, contact admin')

#         return {
#             'email': user.email,
#             'tokens': user.tokens
#         }
