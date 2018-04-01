from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from users.views import *
from notes.views import *
from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),

    # User
    url(r'^user/create/$', create_account),
    url(r'^user/get/$', get_user),
    url(r'^user/notes/$', get_user_notes),
    url(r'^user/notes/deleted/$', get_user_deleted_notes),


    # Note
    url(r'^note/create/$', create_note),
    url(r'^note/(?P<pk>[0-9]+)/update/$', update_note),
    url(r'^note/(?P<pk>[0-9]+)/delete/$', delete_note),

    # Reminder
    url(r'^note/(?P<pk>[0-9]+)/reminder/create/$', create_reminder),

    # JWT Auth
    url(r'^login/', obtain_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
]
