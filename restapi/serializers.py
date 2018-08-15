from rest_framework import serializers
from django.contrib.auth.models import User

from notes.models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = ["username"]

class PropertySerializer(serializers.ModelSerializer):

    class Meta:
        model = Properties

        fields = ["rank",
        "title",
        "note",
        "last_modified_date",
        "color",
        "font",]

class ContentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contents

        fields = ["note", "checked", "contents"]

class ReminderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reminders

        fields = ["note","name","time"]

class NoteSerializer(serializers.ModelSerializer):
    properties = PropertySerializer(many=False)
    contents = ContentsSerializer(many=False)

    class Meta:

        model = Note

        fields = [ "properties", "contents", "pk", "is_deleted"]
