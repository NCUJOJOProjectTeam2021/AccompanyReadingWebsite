from django.urls import path

from whiteboard.views import TokenView

urlpatterns = [
    path("token/", TokenView.as_view(), name="token"),
]
