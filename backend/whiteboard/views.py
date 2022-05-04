from django.shortcuts import render
from django.conf import settings
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant
from faker import Faker
from django.views import View
from flask import request, jsonify
import os
from django.http import JsonResponse

fake = Faker()


class TokenView(View):
    def get(self, request, *args, **kwargs):
        # get credentials from environment variables
        account_sid = settings.TWILIO_ACCOUNT_SID
        api_key = settings.TWILIO_API_KEY
        api_secret = settings.TWILIO_API_SECRET
        sync_service_sid = settings.TWILIO_SYNC_SERVICE_SID
        username = request.GET.get('username', fake.user_name())

        # create access token with credentials
        token = AccessToken(account_sid, api_key,
                            api_secret, identity=username)
        # create a Sync grant and add to token
        sync_grant = SyncGrant(sync_service_sid)
        token.add_grant(sync_grant)
        return JsonResponse({"token": token.to_jwt()})
