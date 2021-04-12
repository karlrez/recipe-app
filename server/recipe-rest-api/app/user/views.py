from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from user.serializers import *


class CreateUserView(generics.CreateAPIView):
    """Create a new user account"""
    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create a new auth token for user"""
    serializer_class = AuthTokenSerializer
    # This lets us view this endpoint in the browser and make POST requests
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateDestroyAPIView):
    """User can update, view, or delete their own info if authenticated"""
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user


class ManageUserProfileView(generics.RetrieveUpdateAPIView):
    """User can update their own profile info if authenticated"""
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user


class UserProfileView(generics.RetrieveAPIView):
    """To view a user profile"""
    lookup_field = 'username'
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)


class UserSearchView(generics.ListAPIView):
    """To query for a list of users by username"""
    serializer_class = UserProfileSerializer
    permission_classes = (AllowAny,)
    # pagination_class

    def get_queryset(self):
        searchInput = self.kwargs['username']

        try:
            queryset = get_user_model().objects.filter(username__contains=searchInput)
            return queryset
        except get_user_model().DoesNotExist:
            raise Http404("No users with this name")


class FollowersViewSet(generics.ListAPIView):
    """To view list of a users followers"""
    serializer_class = FollowSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        username = self.kwargs['username']
        queryset = get_user_model().objects.get(
            username=username).followers.all()
        return queryset


class FollowingViewSet(generics.ListAPIView):
    """To view a list of who a user follows"""
    serializer_class = FollowSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        username = self.kwargs['username']
        queryset = get_user_model().objects.get(
            username=username).following.all()
        return queryset


class FollowUserView(APIView):
    """To follow/unfollow a user"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None, username=None):
        to_user = get_user_model().objects.get(username=username)
        from_user = self.request.user
        follow = None
        if from_user.is_authenticated:
            if from_user != to_user:
                if from_user in to_user.followers.all():
                    follow = 'Unfollowed'
                    from_user.following.remove(to_user)
                    to_user.followers.remove(from_user)
                else:
                    follow = 'Followed'
                    from_user.following.add(to_user)
                    to_user.followers.add(from_user)
            else:
                follow = 'You cannot follow yourself'
        else:
            follow = "not authenticated"
        data = {
            'follow': follow
        }
        return Response(data)
