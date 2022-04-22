
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from forum import views

router = routers.DefaultRouter()
router.register(r'forum', views.ForumView, 'forum')
router.register(r'thread', views.ThreadView, 'thread')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('router/', include(router.urls)),
    path('api/', include('api.urls')),
    path('auth/', include('accounts.urls')),
]
