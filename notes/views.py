# DJANGO
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
# helpers
from helpers.JWT_handler import JWTHandler
from helpers.note_handler import NoteHandler
from helpers.reqresp_handler import ReqRespHandler
from helpers.user_profile_handler import UserProfileHandler
# restapi
from restapi.serializers import *
# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

import json


@api_view(["POST"])
def create_note(request):
    nh = NoteHandler()
    uph = UserProfileHandler()
    rh = ReqRespHandler()

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
    nh = NoteHandler()
    rh = ReqRespHandler()

    note = nh.get_note(pk)
    if note.user != request.user.profile:
        return Response("you suck")
    reminder_body = rh.parse_json(request)

    reminder = nh.create_note_reminder(note,reminder_body)

    reminder_serialized = ReminderSerializer(reminder).data
    return Response(reminder_serialized)

@api_view(["POST"])
def delete_note(request,pk):
    nh = NoteHandler()
    if nh.delete_note(pk):
        return Response(json.dumps({"success":True}))
    return Response(json.dumps({"success":False}))

@api_view(["POST"])
def update_note(request, pk):
    nh = NoteHandler()
    rh = ReqRespHandler()

    note_body = request.data
    nh.update_note(note_body, pk)

    note = nh.get_note(pk)
    note_serialized = NoteSerializer(note).data
    return Response(note_serialized)
