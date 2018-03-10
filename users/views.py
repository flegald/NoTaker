# DJANGO
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
# helpers
from helpers.JWT_handler import JWTHandler
from helpers.reqresp_handler import ReqRespHandler
from helpers.user_profile_handler import UserProfileHandler
# restapi
from restapi.serializers import *
# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny,])
def create_account(request):
    rh = ReqRespHandler()
    uph = UserProfileHandler()
    jh = JWTHandler()

    account_info = rh.parse_json(request)
    user = uph.create_user_account(account_info)
    uph.create_user_profile(user)
    token = jh.hand_new_account_token(user)
    resp = {"username": user.username,
            "token": token}
    return Response(resp, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_user(request):
    uph = UserProfileHandler()

    user = uph.return_user(request.user)
    user_serialized = UserSerializer(user).data
    return Response(user_serialized)

@api_view(["GET"])
def get_user_notes(request):
    uph = UserProfileHandler()
    user = uph.return_user(request.user)
    notes = uph.return_user_notes(user)
    return Response(notes)
