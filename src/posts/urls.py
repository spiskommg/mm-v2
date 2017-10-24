from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import posts.views

urlpatterns = [
    # RETURNS RESULTS FOR A POST TYPE SPECIFIED IN THE URL
    url(_(r'^type/(?P<post_type>[a-z0-9\W]+)$'),
    posts.views.PostsList.as_view(),
    name='content'),
    # THIS ROUTE LOOKS FOR ID FIRST SO THAT WE NCAN BE MORE SPECIFIC
    # USED FOR UPDATING ITEMS
    url(_(r'^(?P<id>\d+)$'),
    posts.views.PostsDetailID.as_view(),
    name='content'),
    # IF NOT RECOGNIZED AS AN ID IT RENDERS AS A SLUG
    url(_(r'^(?P<slug>[a-z0-9\W]+)$'),
    posts.views.PostsDetailSlug.as_view(),
    name='content'),
    # RETURNS A FULL POSTS LIST OR CREATES THE ITEM
    url(_(r'^$'),
    posts.views.PostsList.as_view(),
    name='content'),

]
