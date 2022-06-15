from django.urls import path

from api.views import RoomView, TokenView

urlpatterns = [
    path("token", TokenView.as_view(), name="token"),
    # path("token/<username>", TokenView.as_view(), name="token"),
    path("rooms", RoomView.as_view(), name="room_list"),
]
