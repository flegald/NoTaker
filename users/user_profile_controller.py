from django.contrib.auth.models import User
from users.models import Profile
from restapi.serializers import NoteSerializer


class UserProfileController:

    def create_user_account(self, account_info):
        username = account_info["username"]
        password = account_info["password"]
        if User.objects.filter(username=username):
            return False
        new_user = User.objects.create_user(username=username, password=password)
        new_user.save()
        return new_user

    def create_user_profile(self, user):
        prof = Profile()
        django_user = User.objects.get(pk=user.pk)
        django_user.profile = prof
        prof.save()

    def return_user(self, user):
        try:
            return User.objects.get(pk=user.pk)
        except:
            return False

    def return_user_notes(self, user):
        notes = user.profile.notes.all()
        serialized_notes = []
        returned_id = 0
        for note in notes:
            if not note.is_deleted and not note.is_completed:
                print(note.is_completed)
                print(note.is_deleted)
                serialized_notes.append({str(returned_id): NoteSerializer(note).data})
                returned_id += 1
        return serialized_notes

    def return_user_deleted_notes(self, user):
        notes = user.profile.notes.all()
        serialized_notes = []
        returned_id = 0
        for note in notes:
            if note.is_deleted:
                serialized_notes.append({str(returned_id): NoteSerializer(note).data})
                returned_id += 1
        return serialized_notes

    def return_user_completed_notes(self, user):
        notes = user.profile.notes.all()
        serialized_notes = []
        returned_id = 0
        for note in notes:
            if note.is_completed:
                serialized_notes.append({str(returned_id): NoteSerializer(note).data})
                returned_id += 1
        return serialized_notes
