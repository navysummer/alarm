# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User, Group
from alarm.models import ZabbixUser
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, ZabbixUserSerializer
from rest_framework import generics
from alarm.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view,  authentication_classes, permission_classes
from alarm.config import zabbix_config
from rest_framework.response import Response
from rest_framework import status
from alarm.event import Zabbix
from rest_framework.decorators import action
from alarm.models import ZabbixUser
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly, IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly, IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ZabbixUserViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser)
    queryset = ZabbixUser.objects.all()
    serializer_class = ZabbixUserSerializer


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def events_view(request):
    data = request.data
    if 'config' in data and 'args' in data:
        config = data['config']
        args = data['args']
        if 'region_name' in config and 'user' in config and 'password' in config:
            region_name = config['region_name']
            if region_name in zabbix_config:
                url = zabbix_config[region_name]
                user = config['user']
                password = config['password']
                try:
                    zabbix = Zabbix(url, user, password)
                    events = zabbix.get_events(args)
                    return Response(events)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error={'error':'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error,status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def triggers_view(request):
    data = request.data
    if 'config' in data and 'args' in data:
        config = data['config']
        args = data['args']
        if 'region_name' in config and 'user' in config and 'password' in config:
            region_name = config['region_name']
            if region_name in zabbix_config:
                url = zabbix_config[region_name]
                user = config['user']
                password = config['password']
                try:
                    zabbix = Zabbix(url, user, password)
                    triggers = zabbix.get_trigger(args)
                    return Response(triggers)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error={'error':'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error,status=status.HTTP_403_FORBIDDEN)

# def user_login(request):
#     if request.POST:
#




