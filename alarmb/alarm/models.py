# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
# Create your models here.


class Region(models.Model):
    region_name = models.CharField(max_length=50)
    region_url = models.URLField()
    username = models.CharField(max_length=50)
    passwd = models.CharField(max_length=100)

    def __unicode__(self):
        return self.region_name
