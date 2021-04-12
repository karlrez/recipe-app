from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status


def query_recipe_tag(tag):
    return reverse('recipe:tag_recipes', args=[tag])


class RecipeViewsetsTests(TestCase):
    """Recipe viewsets API tests"""

    def setUp(self):
        self.client = APIClient()

    def test_all_recipes_viewset(self):
        """Test getting all recipes"""
        res = self.client.get(reverse('recipe:all_recipes'))
