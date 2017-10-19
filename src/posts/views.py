from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from posts.models import Post
from posts.serializers import PostCreationSerializer, PostSerializer, SlugSerializer
from lib.utils import AtomicMixin



# Create your views here.
class PostCreationView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = PostCreationSerializer

    def post(self, request):
        """User registration view."""
        return self.create(request)


class AllPostView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = PostSerializer

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        return


class SlugIdentifyView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = PostSerializer

    def get(self, request, slug):
        """Post content return view."""
        clean_slug = slug.replace('/', '', 1)
        post = Post.objects.filter(slug=clean_slug)
        serializer = PostSerializer(post, many=True)
        return Response({'data':serializer.data[0]})

    def get_queryset(self):
        return
