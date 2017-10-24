import itertools

from rest_framework import serializers
from django.template.defaultfilters import slugify

from posts.models import Post, PostMeta
from lib.utils import validate_email as email_is_valid

# Serializer classes
class PostMetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostMeta
        fields =('id', 'meta_key', 'meta_value')
        extra_kwargs = {
            "id": {
                "read_only": False,
            },
        }

class PostSerializer(serializers.ModelSerializer):
    # id = serializers.ReadOnlyField()
    meta_queryset = PostMeta.objects.all()
    postmeta = PostMetaSerializer(meta_queryset, many=True)
    print(postmeta.data)

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'slug', 'post_status', 'post_type', 'published_date', 'created_date', 'postmeta')

    def create(self, validated_data):
        """
        Create the object.

        :param validated_data: string
        """
        max_length = Post._meta.get_field('slug').max_length
        validated_data['slug'] = orig = validated_data['post_type'] + '/' + slugify(validated_data['title'])[:max_length]

        for x in itertools.count(1):
            if not Post.objects.filter(slug=validated_data['slug']).exists():
                break
            validated_data['slug'] = '%s-%d' % (orig[:max_length - len(str(x)) - 1], x)
            # POSTMETA IS A DICTIONARY / ARRAY OF OBJECTS, THIS MEANS WE NEED TO ACCESS EACH OBJECT INDIVIDUALLY AND UPDATE ACCORDINLY
        postmeta = validated_data.pop('postmeta')
        post = Post.objects.create(**validated_data)
        for i in range(len(postmeta)):
            PostMeta.objects.create(post=post,**postmeta[i])
        return post

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.author = validated_data.get('author', instance.author)
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.post_status = validated_data.get('post_status', instance.post_status)
        instance.post_type = validated_data.get('post_type', instance.post_type)
        instance.published_date = validated_data.get('published_date', instance.published_date)
        instance.created_date = validated_data.get('created_date', instance.created_date)
        postmeta_data = validated_data.pop('postmeta')

        # loop through the post meta ordered dict and grab the values and manually update them
        for i in range(len(postmeta_data)):
            print(postmeta_data[i])
            postmeta = PostMeta.objects.filter(id=postmeta_data[i].pop('id'))
            #  NEED TO GET THE INDIVIDUAL VALUES FROM THE ORDERED DICT
            meta_key = postmeta_data[i].pop('meta_key')
            meta_value = postmeta_data[i].pop('meta_value')
            # NEED TO UPDATE EACH VALUE WITHIN THE UPDATE METHOD ITSELF AND PASS THE NEW VALUES
            postmeta.update(meta_key=meta_key, meta_value=meta_value)
            print(postmeta)

        instance.save()
        return instance
