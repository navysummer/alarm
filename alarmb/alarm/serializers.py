from django.contrib.auth.models import User, Group
from rest_framework import serializers
from alarm.models import ZabbixUser


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='group-detail'
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'is_staff',  'is_active', 'is_superuser', 'last_login', 'date_joined', 'email', 'url', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    user_set = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='user-detail'
    )

    class Meta:
        model = Group
        fields = ['id', 'url', 'name','user_set']


class ZabbixUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZabbixUser
        fields = ['id', 'region_name', 'url']