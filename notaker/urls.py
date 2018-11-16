from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from notaker.views import *
from users.views import *
from notes.views import *
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),

    # Frontend
    url(r'^$', home_page),

    # User
    url(r'^api/user/create/$', create_account),
    url(r'^api/user/get/$', get_user),
    url(r'^api/user/notes/$', get_user_notes),
    url(r'^api/user/notes/deleted/$', get_user_deleted_notes),
    url(r'^api/user/notes/completed/$', get_user_completed_notes),


    # Note
    url(r'^api/note/create/$', create_note),
    url(r'^api/note/(?P<pk>[0-9]+)/update/$', update_note),
    url(r'^api/note/(?P<pk>[0-9]+)/delete/$', delete_note),
    url(r'^api/note/(?P<pk>[0-9]+)/complete/$', complete_note),

    # Reminder
    url(r'^api/note/(?P<pk>[0-9]+)/reminder/create/$', create_reminder),

    # JWT Auth
    url(r'^api/login/', obtain_jwt_token),
    url(r'^api/api-token-verify/', verify_jwt_token),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
