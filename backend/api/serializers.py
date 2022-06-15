from django.conf import settings
from rest_framework import serializers
from twilio.jwt.access_token import AccessToken, grants


class TokenSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
    )

    roomname = serializers.CharField(
        required=True,
    )

    # def validate(self, attrs):
    #     # check user is exist or not
    #     # check room is exist or not
    #     pass

    def create(self, validated_data):
        username = validated_data['username']
        roomname = validated_data['roomname']

        # make token
        voice_grant = grants.VoiceGrant(
            outgoing_application_sid=settings.TWIML_APPLICATION_SID,
            incoming_allow=True,
        )
        video_grant = grants.VideoGrant(
            room=roomname
        )
        access_token = AccessToken(
            settings.TWILIO_ACCOUNT_SID,
            settings.TWILIO_API_KEY,
            settings.TWILIO_API_SECRET,
            identity=username
        )

        access_token.add_grant(voice_grant)
        access_token.add_grant(video_grant)

        # return token
        return access_token.to_jwt()
