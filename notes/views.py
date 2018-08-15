import json
# DJANGO
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
# controllers
from users.JWT_controller import JWTController
from users.user_profile_controller import UserProfileController
from notes.controller import NoteController
# restapi
from restapi.serializers import *
# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@api_view(["POST"])
def create_note(request):
    nh = NoteController()
    uph = UserProfileController()
    user = uph.return_user(request.user)
    profile = user.profile
    note = nh.create_note(profile)
    body = request.data
    nh.create_note_contents(note, body["contents"])
    nh.create_note_properties(note, body["properties"])

    note_serialized = NoteSerializer(note).data
    return Response(note_serialized)


@api_view(["POST"])
def create_reminder(request, pk):
    nh = NoteController()

    note = nh.get_note(pk)
    if note.user != request.user.profile:
        return Response("Note Note Found")
    reminder_body = request.data
    reminder = nh.create_note_reminder(note, reminder_body)
    reminder_serialized = ReminderSerializer(reminder).data
    return Response(reminder_serialized)


@api_view(["POST"])
def delete_note(request,pk):
    nh = NoteController()
    if nh.delete_note(pk):
        return Response(json.dumps({"success":True}))
    return Response(json.dumps({"success":False}))


@api_view(["POST"])
def update_note(request, pk):
    nh = NoteController()

    note_body = request.data
    nh.update_note(note_body, pk)

    note = nh.get_note(pk)
    note_serialized = NoteSerializer(note).data
    return Response(note_serialized)
