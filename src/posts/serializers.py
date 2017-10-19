import itertools

from rest_framework import serializers
from django.template.defaultfilters import slugify

from posts.models import Post
from lib.utils import validate_email as email_is_valid


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('author', 'title', 'text', 'slug', 'published_date', 'created_date')

class SlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields =('slug')

class PostCreationSerializer(serializers.ModelSerializer):
    #email = serializers.EmailField()

    class Meta:
        model = Post
        fields = ('author', 'title', 'text',)

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        max_length = Post._meta.get_field('slug').max_length
        validated_data['slug'] = orig = slugify(validated_data['title'])[:max_length]

        for x in itertools.count(1):
            if not Post.objects.filter(slug=validated_data['slug']).exists():
                break
            validated_data['slug'] = '%s-%d' % (orig[:max_length - len(str(x)) - 1], x)

        post = Post.objects.create(**validated_data)
        post.save()
        return post
