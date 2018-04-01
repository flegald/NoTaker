import json
from django.contrib.auth.models import User
from users.models import Profile
from notes.models import Note
from restapi.serializers import NoteSerializer

class UserProfileHandler:

    def create_user_account(self, account_info):
        username = account_info["username"]
        password = account_info["password"]
        new_user = User.objects.create_user(username=username, password=password)
        new_user.save()
        return new_user

    def create_user_profile(self, user):
        prof = Profile()
        django_user = User.objects.get(pk=user.pk)
        django_user.profile = prof
        prof.save()

    def return_user(self, user):
        user = User.objects.get(pk=user.pk)
        return user

    def return_user_notes(self, user):
        notes = user.profile.notes.all()
        serialized_notes = []
        for note in notes:
            if not note.is_deleted:
                serialized_notes.append({note.properties.title:NoteSerializer(note).data})
        return serialized_notes

    def return_user_deleted_notes(self, user):
        notes = user.profile.notes.all()
        serialized_notes = []
        for note in notes:
            if note.is_deleted:
                serialized_notes.append({note.properties.title:NoteSerializer(note).data})
        return serialized_notes
