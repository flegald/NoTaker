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
    return Response(note_serialized, content_type="application/json")

def check_permissions(note,request):
    allowed = (note.user.user == request.user)
    return allowed

@api_view(["POST"])
def create_reminder(request, pk):
    nh = NoteController()
    note = nh.get_note(pk)
    if note.user != request.user.profile:
        return Response({"error": "invalid_note_id"}, content_type="application/json")
    reminder_body = request.data
    reminder = nh.create_note_reminder(note, reminder_body)
    reminder_serialized = ReminderSerializer(reminder).data
    return Response(reminder_serialized, content_type="application/json")


@api_view(["POST"])
def delete_note(request, pk):
    nh = NoteController()
    note = nh.get_note(pk)
    if not note:
        return Response({"error": "invalid_note_id"}, content_type="application/json")
    if check_permissions(note, request) :
        if nh.delete_note(pk):
            return Response({"success": "deleted"}, content_type="application/json")
    return Response({"error": "unknown_error"}, content_type="application/json")

@api_view(["POST"])
def update_note(request, pk):
    nh = NoteController()
    note_body = request.data
    note = nh.get_note(pk)
    if not note:
        return Response({"error": "invalid_note_id"}, content_type="application/json")
    if check_permissions(nh.get_note(pk),request):
        nh.update_note(note_body, pk)
        note_serialized = NoteSerializer(note).data
        response = Response(note_serialized, content_type="application/json")
    else:
        response = Response({"error": "invalid_arguments_or_permissions"}, content_type="application/json")
    return response
