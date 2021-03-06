"""alarmb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from alarm.views import UserViewSet, GroupViewSet, RegionViewSet, events_view, triggers_view, hostgroups_view, hosts_view, items_view, user_login
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'regions', RegionViewSet, basename='region')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'events', events_view),
    url(r'triggers', triggers_view),
    url(r'hosts', hosts_view),
    url(r'hostgroups', hostgroups_view),
    url(r'items', items_view),
    url(r'login', user_login)
    # url(r'^api-token-auth/', views.obtain_auth_token),
]
