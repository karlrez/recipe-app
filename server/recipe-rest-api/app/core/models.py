import uuid
import os
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.contrib.auth import get_user_model
from django.conf import settings


def user_profile_pic_file_path(instance, filename):
    """Generate file path for new User profile picture"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/profile-pics/', filename)

def recipe_image_file_path(instance, filename):
    """Generate file path for new recipe image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/recipe-images/', filename)


class UserManager(BaseUserManager):
    """UserManager class provides all the helper functions for
    creating a user or superuser"""

    # Password=none so we can create a user that is not active/without password
    def create_user(self, email, username, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        user = self.model(email=self.normalize_email(email),
                          username=username.lower(),
                          **extra_fields)
        # Use set_password() to encrypt password
        user.set_password(password)
        user.save(using=self.db)

        return user

    def create_superuser(self, email, username, password):
        """Creates and saves a new superuser"""
        user = self.create_user(email, username, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=25, unique=True)
    full_name = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    profile_pic = models.ImageField(upload_to=user_profile_pic_file_path,
                                    default='avatar.png')
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                       related_name="user_followers",
                                       blank=True,
                                       symmetrical=False)
    following = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                       related_name="user_following",
                                       blank=True,
                                       symmetrical=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Creates a new UserManager for our object
    objects = UserManager()
    # Username field used for authentication
    USERNAME_FIELD = 'email'
    # Username and password added by default
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username


class Tag(models.Model):
    """Tag to be used for a recipe"""
    name = models.CharField(max_length=255, unique=True)

    # To get string representation of model (we only want name)
    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """Ingredient to be used in a recipe"""
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    """Recipe object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    time_hours = models.DecimalField(blank=True, default=0, max_digits=5, decimal_places=2)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    instructions = models.TextField(blank=True)
    ingredients = models.ManyToManyField('Ingredient',
                                         related_name="ingredients",
                                         blank=True,)
    tags = models.ManyToManyField('Tag',
                                  related_name="tags",
                                  blank=True,)
    image = models.ImageField(upload_to=recipe_image_file_path)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                   related_name="likes",
                                   blank=True,
                                   symmetrical=False)

    def __str__(self):
        return self.name


class Comment(models.Model):
    """Comment object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comment_text = models.TextField()
