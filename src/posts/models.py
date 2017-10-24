from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.template.defaultfilters import slugify

from accounts.models import User


class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=200)
    text = models.TextField()
    slug = models.SlugField(max_length=40, null=True)
    post_type = models.CharField(max_length=50, default='post')
    post_status = models.CharField(max_length=50, default='draft')
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def create(self):
        self.slug = slugify(self.title)
        self.published_date = timezone.now()
        return self.save()

    def update_post(self):
        return self.save()

    def __str__(self):
        return self.title

class PostMeta(models.Model):
    post = models.ForeignKey(Post, null=True, related_name='postmeta')
    meta_key = models.CharField(max_length=50)
    meta_value = models.CharField(max_length=512)

    def __str__(self):
        return self.meta_value
