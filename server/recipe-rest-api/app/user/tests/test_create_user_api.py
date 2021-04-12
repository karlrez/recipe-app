from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class CreateUserApiTests(TestCase):
    """Test the create users API"""

    # We can re-use this payload because db refreshes after each test
    PAYLOAD = {
        'email': 'testEmail@gmail.com',
        'username': 'testUsername',
        'password': 'testPassword'
    }

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""

        # Storing response from POST request to create user
        res = self.client.post(CREATE_USER_URL, self.PAYLOAD)
        # Storing user info from our new user
        user = get_user_model().objects.get(**res.data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(user.check_password(self.PAYLOAD['password']))
        # Password should not be returned when we get a user
        self.assertNotIn('password', res.data)

    def test_create_invalid_user_fails(self):
        """Test creating user with invalid payload fails"""

        # Missing email
        payload = {
            'username': 'testUsername',
            'password': 'testPassword'}
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        # Missing username
        payload = {
            'email': 'testEmail@gmail.com',
            'password': 'testPassword'}
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        # Missing password
        payload = {
            'email': 'testEmail@gmail.com',
            'username': 'testUsername'}
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

        # Additional values
        payload = {
            'email': 'testEmail@gmail.com',
            'username': 'testUsername',
            'full_name': 'test name'}
        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_exists(self):
        """Test creating user that already exists fails"""

        # We create a user and then create the same user using the api url
        create_user(**self.PAYLOAD)
        res = self.client.post(CREATE_USER_URL, self.PAYLOAD)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test that the password must be more than 5 characters"""
        payload = self.PAYLOAD
        payload['password'] = '1234'
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        # Check user not in db
        user_exists = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exists)

    def test_invalid_email(self):
        """Test invalid email"""
        payload = self.PAYLOAD
        payload['email'] = 'karl@gmailcom'
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
