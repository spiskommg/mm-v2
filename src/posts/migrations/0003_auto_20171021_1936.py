# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-10-21 19:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20171020_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(max_length=40, null=True),
        ),
    ]