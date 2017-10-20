from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from posts.models import Post
from posts.serializers import PostSerializer, SlugSerializer
from lib.utils import AtomicMixin



# Create your views here.
# class PostCreationView(AtomicMixin, CreateModelMixin, GenericAPIView):
#     serializer_class = PostSerializer
#
#     def post(self, request):
#         """User registration view."""
#         return self.create(request)
#
# class PostUpdateView(AtomicMixin, UpdateModelMixin, GenericAPIView):
#     serializer_class = PostSerializer
#
#     def post(self, request, *args, **kwargs):
#         """Post update view"""
#         return self.update(request)
#
#     def get_queryset(self):
#         return


class PostsList(ListCreateAPIView):
    model = Post
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        if self.kwargs:#check if there are any arguments/ otherwise proceed without
            filt = self.kwargs['post_type']
            print(filt)
            if filt:
                queryset = queryset.filter(post_type=filt)

        return queryset

class PostsDetail(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'


# class AllPostView(AtomicMixin, GenericAPIView):
#     serializer_class = PostSerializer
#
#     def get(self, request):
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)
#
#     def get_queryset(self):
#         return
#
#
# class SlugIdentifyView(AtomicMixin, CreateModelMixin, GenericAPIView):
#     serializer_class = PostSerializer
#
#     def get(self, request, slug):
#         """Post content return view."""
#         clean_slug = slug.replace('/', '', 1)
#         post = Post.objects.filter(slug=clean_slug)
#         serializer = PostSerializer(post, many=True)
#         return Response({'data':serializer.data[0]})
#
#     def get_queryset(self):
#         return
