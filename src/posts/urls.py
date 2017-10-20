from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import posts.views

urlpatterns = [
    # url(_(r'^create/$'),
    #     posts.views.PostCreationView.as_view(),
    #     name='create-post'),
    # url(_(r'^update/$'),
    #     posts.views.PostUpdateView.as_view(),
    #     name='update-post'),
    # url(_(r'^all/$'),
    #     posts.views.AllPostView.as_view(),
    #     name='all-post'),
    # url(_(r'^read/(?P<slug>[a-z0-9\W]+)$'),
    #     posts.views.SlugIdentifyView.as_view(),
    #     name='content'),
        url(_(r'^single/(?P<slug>[a-z0-9\W]+)$'),
        posts.views.PostsDetail.as_view(),
        name='content'),
        url(_(r'^(?P<post_type>[a-z0-9\W]+)$'),
        posts.views.PostsList.as_view(),
        name='content'),
        url(_(r'^$'),
        posts.views.PostsList.as_view(),
        name='content'),

]
