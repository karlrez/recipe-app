from rest_framework import serializers
from core.models import Comment
from django.contrib.auth import get_user_model


class CommentSerializer(serializers.ModelSerializer):
    """Serializer for a Comment object"""
    user = serializers.StringRelatedField(many=False)
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'user', 'profile_pic', 'recipe', 'comment_text', 'date')
        read_only_fields = ('id', 'user', 'profile_pic', 'recipe', 'date')

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        pic_url = get_user_model().objects.get(username=obj.user).profile_pic.url
        return request.build_absolute_uri(pic_url)
