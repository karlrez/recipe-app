from unittest.mock import patch
from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


class UserModelTests(TestCase):

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@TEST.COM'
        user = get_user_model().objects.create_user(email,
                                                    'username',
                                                    'randomPassword')

        self.assertEqual(user.email, email.lower())

    def test_new_user_no_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None,
                                                 'username',
                                                 'randomPassword')

    def test_new_user_no_username(self):
        """Test creating user with no username raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('email', None, 'password')

    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@test.ca',
            'testusername',
            'test222'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    @patch('uuid.uuid4')
    def test_user_profile_pic_file_name_uuid(self, mock_uuid):
        """Test that image is saved in the correct location"""
        # We are overriding uuid function to return
        # 'test-uuid' every time
        uuid = 'test-uuid'
        mock_uuid.return_value = uuid
        file_path = models.user_profile_pic_file_path(None, 'myimage.jpg')

        exp_path = f'uploads/profile-pics/{uuid}.jpg'
        self.assertEqual(file_path, exp_path)
