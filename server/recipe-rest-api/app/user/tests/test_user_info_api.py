from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


PAYLOAD = {
    'email': 'testEmail@gmail.com',
    'username': 'user',
    'password': 'testPassword'
}


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def user_profile_url(user):
    return reverse('user:user_profile', args=[user])

def update_profile_url(user):
    return reverse('user:update_profile', args=[user])


class PublicUserProfileTests(TestCase):
    """UserProfile API tests that dont require log in"""

    updateData = {
        'bio': 'new update'
    }

    def setUp(self):
        self.client = Client()
        self.user = create_user(**PAYLOAD)

    def test_update_no_login(self):
        """Test updating a profile without logging in"""
        res = self.client.put(update_profile_url(self.user.username), self.updateData)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserProfileTests(TestCase):
    """UserProfile API tests that require log in"""

    def setUp(self):
        self.client = Client()
        self.user = create_user(**PAYLOAD)
        self.client.force_login(self.user)

    def test_update_profile(self):
        payload = {
            'full_name': 'test name',
            'bio': 'this is a test'
        }
        res = self.client.patch(update_profile_url(self.user.username), payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['username'], payload['username'])
        self.assertEqual(res.data['full_name'], payload['full_name'])
        self.assertEqual(res.data['bio'], payload['bio'])
