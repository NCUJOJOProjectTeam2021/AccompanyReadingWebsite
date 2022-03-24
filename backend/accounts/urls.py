from django.urls import path
from .views import RegisterView, HelloAPIView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloAPIView.as_view(), name='hello'),
]
