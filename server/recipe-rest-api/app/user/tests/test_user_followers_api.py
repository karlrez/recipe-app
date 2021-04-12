from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def user_followers_url(user):
    return reverse('user:followers', args=[user])


def user_following_url(user):
    return reverse('user:following', args=[user])


def follow_user_url(user):
    return reverse('user:follow', args=[user])


class GetFollowersTests(TestCase):
    """Test the get followers API"""

    PAYLOAD = {
        'email': 'testEmail@gmail.com',
        'username': 'user',
        'password': 'testPassword'
    }

    def setUp(self):
        self.client = Client()
        self.user = create_user(**self.PAYLOAD)
        self.client.force_login(self.user)

    def test_user_no_followers(self):
        """Test getting followers for user with no followers"""
        res = self.client.get(user_followers_url(self.user.username))

        self.assertTrue(len(res.data) == 0)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_with_followers(self):
        payload = {
            'email': 'newuser@gmail.com',
            'username': 'user2',
            'password': 'testPassword'
        }
        self.user2 = create_user(**payload)
        # user follows user2
        res = self.client.get(follow_user_url(self.user2.username))
        res = self.client.get(user_followers_url(self.user2.username))

        self.assertTrue(res.data[0]['username'] == self.user.username)


class GetFollowingTests(TestCase):
    """Test the get following API"""

    PAYLOAD = {
        'email': 'testEmail@gmail.com',
        'username': 'testUsername',
        'password': 'testPassword'
    }

    def setUp(self):
        self.client = Client()
        self.user = create_user(**self.PAYLOAD)
        self.client.force_login(self.user)

    def test_user_no_following(self):
        """Test getting following for user not following anyone"""
        res = self.client.get(user_following_url(self.user.username))

        self.assertTrue(len(res.data) == 0)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_user_with_following(self):
        payload = {
            'email': 'newuser@gmail.com',
            'username': 'newuser',
            'password': 'testPassword'
        }
        user2 = create_user(**payload)
        # user follows user2
        res = self.client.get(follow_user_url(user2.username))
        res = self.client.get(user_following_url(self.user.username))

        self.assertTrue(res.data[0]['username'] == user2.username)


class FollowUserTests(TestCase):
    """Test the follow user API"""

    PAYLOAD = {
        'email': 'testEmail@gmail.com',
        'username': 'testUsername',
        'password': 'testPassword'
    }

    def setUp(self):
        self.client = Client()
        self.user = create_user(**self.PAYLOAD)
        self.client.force_login(self.user)

    def test_follow_user(self):
        payload = {
            'email': 'newuser@gmail.com',
            'username': 'newuser',
            'password': 'testPassword'
        }
        user2 = create_user(**payload)

        # Test we cannot follow a user without logging in
        notLoggedIn = Client()
        res = notLoggedIn.get(follow_user_url(self.user.username))
        self.assertTrue(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        res = notLoggedIn.get(user_followers_url(self.user.username))
        self.assertTrue(len(res.data) == 0)

        # user follows user2
        # Request should be good and returned 'followed'
        res = self.client.get(follow_user_url(user2.username))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data['follow'] == 'Followed')

        # user should be in user2's followers list
        res = self.client.get(user_followers_url(user2.username))
        self.assertTrue(res.data[0]['username'] == self.user.username)

        # Posting to follow api again will unfollow user
        res = self.client.get(follow_user_url(user2.username))
        self.assertTrue(res.data['follow'] == 'Unfollowed')
        res = self.client.get(user_following_url(self.user.username))
        self.assertTrue(len(res.data) == 0)
