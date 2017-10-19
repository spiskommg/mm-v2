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
    slug = models.SlugField(max_length=40)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def create(self):
        self.slug = slugify(self.title)
        self.published_date = timezone.now()
        return self.save()


    def __str__(self):
        return self.title
