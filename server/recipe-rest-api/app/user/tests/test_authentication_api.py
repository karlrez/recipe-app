from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


TOKEN_URL = reverse('user:token')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def setUp(self):
    self.client = APIClient()


class LoginTests(TestCase):
    """Tests for the token authentication"""

    PAYLOAD = {
        'email': 'testEmail@gmail.com',
        'password': 'testPassword',
        'username': 'bob'
    }

    def test_create_token_for_user(self):
        """Test token is created for user"""
        create_user(**self.PAYLOAD)
        res = self.client.post(TOKEN_URL, self.PAYLOAD)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_wrong_password(self):
        """Test token is not given for wrong password"""
        create_user(**self.PAYLOAD)
        # Passing in bad password
        res = self.client.post(TOKEN_URL, {'email': 'test@gmail.com',
                                           'password': 'wrongPassword'})

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_create_token_wrong_username(self):
        """Test token is not given for invalid username"""
        # Username not in db
        res = self.client.post(TOKEN_URL, {'email': 'test@gmail.com',
                                           'password': 'wrongPassword'})

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    """
    Test all other api's cant be accessed before login
    """
