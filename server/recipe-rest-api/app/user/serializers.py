from django.contrib.auth import get_user_model, authenticate
# from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    """Serializer for users to create, update, and delete their own user account"""

    class Meta:
        model = get_user_model()
        fields = ('email', 'username', 'full_name', 'password',
                  'bio', 'profile_pic')
        extra_kwargs = {'password': {'write_only': True,
                                     'min_length': 5},
                        'username': {'min_length': 3},
                        'full_name': {'required': False},
                        'bio': {'required': False},
                        'profile_pic': {'required': False}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """To get or update user profile information"""
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'full_name', 'bio', 'followers', 'following',
                  'date_joined', 'profile_pic')
        read_only_fields = ('followers', 'following', 'date_joined')
        extra_kwargs = {'username': {'min_length': 3, 'required': False},
                        'full_name': {'required': False},
                        'bio': {'required': False},
                        'profile_pic': {'required': False}}

    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.following.count()


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = ('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user

        return attrs


class FollowSerializer(serializers.ModelSerializer):
    """To view users followers/following list"""
    class Meta:
        model = get_user_model()
        fields = ('username', 'profile_pic')
        read_only_fields = ('username', 'profile_pic')
