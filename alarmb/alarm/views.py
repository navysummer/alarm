# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.contrib.auth.models import User, Group
from alarm.models import Region
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, RegionSerializer
from rest_framework import generics
from alarm.permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view,  authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from alarm.zabbix import Zabbix
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
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


class RegionViewSet(viewsets.ModelViewSet):
    authentication_classes = (BasicAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser)
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def events_view(request):
    data = request.data
    if 'config' in data:
        config = data['config']
        params = None
        if 'region_name' in config and 'id' in config:
            try:
                region = Region.objects.get(region_name=config['region_name'], id=config['id'])
            except:
                error = {'error': '%s can not find'%(config['region_name'])}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            url = region.region_url
            user = region.username
            password = region.passwd
            try:
                try:
                    zabbix = Zabbix(url, user, password)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
                if 'params' in data:
                    params = data['params']
                events = zabbix.get_events(params)
                return Response(events,status=status.HTTP_200_OK)
            except:
                error = {'error': 'get events is error'}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error = {'error': 'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error,status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def triggers_view(request):
    data = request.data
    if 'config' in data:
        config = data['config']
        params = None
        if 'region_name' in config and 'id' in config:
            try:
                region = Region.objects.get(region_name=config['region_name'], id=config['id'])
            except:
                error = {'error': '%s can not find' % (config['region_name'])}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            url = region.region_url
            user = region.username
            password = region.passwd
            try:
                try:
                    zabbix = Zabbix(url, user, password)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
                if 'params' in data:
                    params = data['params']
                triggers = zabbix.get_triggers(params)
                return Response(triggers,status=status.HTTP_200_OK)
            except:
                error = {'error': 'get triggers is fail'}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error = {'error': 'params config is error'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def hostgroups_view(request):
    data = request.data
    if 'config' in data:
        config = data['config']
        params = None
        if 'region_name' in config and 'id' in config:
            try:
                region = Region.objects.get(region_name=config['region_name'], id=config['id'])
            except:
                error = {'error': '%s can not find'%(config['region_name'])}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            url = region.region_url
            user = region.username
            password = region.passwd
            try:
                try:
                    zabbix = Zabbix(url, user, password)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
                if 'params' in data:
                    params = data['params']
                hostgroups = zabbix.get_hostgroups(params)
                return Response(hostgroups,status=status.HTTP_200_OK)
            except:
                error = {'error': 'get hostgroups is error'}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error = {'error': 'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def hosts_view(request):
    data = request.data
    if 'config' in data:
        config = data['config']
        params = None
        if 'region_name' in config and 'id' in config:
            try:
                region = Region.objects.get(region_name=config['region_name'], id=config['id'])
            except:
                error = {'error': '%s can not find'%(config['region_name'])}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            url = region.region_url
            user = region.username
            password = region.passwd
            try:
                try:
                    zabbix = Zabbix(url, user, password)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
                if 'params' in data:
                    params = data['params']
                hosts = zabbix.get_hosts(params)
                return Response(hosts,status=status.HTTP_200_OK)
            except:
                error = {'error': 'get hostgroups is error'}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error = {'error': 'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)


@api_view(["POST"])
@authentication_classes((BasicAuthentication,))
@permission_classes((IsAuthenticated,))
def items_view(request):
    data = request.data
    if 'config' in data:
        config = data['config']
        params = None
        if 'region_name' in config and 'id' in config:
            try:
                region = Region.objects.get(region_name=config['region_name'], id=config['id'])
            except:
                error = {'error': '%s can not find'%(config['region_name'])}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
            url = region.region_url
            user = region.username
            password = region.passwd
            try:
                try:
                    zabbix = Zabbix(url, user, password)
                except:
                    error = {'error': 'zabbix config is error'}
                    return Response(error, status=status.HTTP_403_FORBIDDEN)
                if 'params' in data:
                    params = data['params']
                items = zabbix.get_items(params)
                return Response(items,status=status.HTTP_200_OK)
            except:
                error = {'error': 'get items is error'}
                return Response(error, status=status.HTTP_403_FORBIDDEN)
        else:
            error = {'error': 'params config is error'}
            return Response(error,status=status.HTTP_403_FORBIDDEN)
    else:
        error = {'error': 'params is error'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            user = json.loads(request.body)
        except:
            info = {'status': '0', 'msg': 'user params is wrong'}
            return JsonResponse(info, status=status.HTTP_403_FORBIDDEN)
        if 'username' not in user and 'password' not in user:
            info = {'status': '0', 'msg': 'user params is wrong'}
            return JsonResponse(info, status=status.HTTP_403_FORBIDDEN)
        user_name = user['username']
        pass_word = user['password']
        user = authenticate(username=user_name, password=pass_word)
        if user is not None:
            login(request, user)
            info = {'status': '1', 'msg': 'login success'}
            return JsonResponse(info, status=status.HTTP_200_OK)
        else:
            info = {'status':'0','msg': 'login fail,username or password is wrong'}
            return JsonResponse(info, status=status.HTTP_401_UNAUTHORIZED)
    else:
        info = {'status': '0', 'msg': '%s is not allowed'%(request.method)}
        return JsonResponse(info, status=status.HTTP_403_FORBIDDEN)


