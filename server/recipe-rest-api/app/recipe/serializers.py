from rest_framework import serializers
from core.models import Tag, Ingredient, Recipe
from django.contrib.auth import get_user_model


class HelperUserSerializer(serializers.ModelSerializer):
    """Helper serializer to get username and profile pic"""

    class Meta:
        model = get_user_model()
        fields = ('username', 'profile_pic')


class TagSerializer(serializers.ModelSerializer):
    """Serializer for tag objects"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


class IngredientSerializer(serializers.ModelSerializer):
    """Serializer for ingredient objects"""

    class Meta:
        model = Ingredient
        fields = ('id', 'name')
        read_only_fields = ('id',)


class RecipeSerializer(serializers.ModelSerializer):
    """This serializer used for creating recipes"""
    ingredients = serializers.PrimaryKeyRelatedField(many=True, queryset=Ingredient.objects.all())
    tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())

    class Meta:
        model = Recipe
        fields = (
            'name', 'ingredients', 'tags',
            'time_hours', 'price', 'instructions', 'image',
        )
        read_only_fields = ('id', 'user')
        extra_kwargs = {'ingredients': {'required': False},
                        'tags': {'required': False},
                        'time_hours': {'required': False},
                        'price': {'required': False}}


class StringRecipeSerializer(serializers.ModelSerializer):
    """Serialize a recipe with fk's as Strings"""
    # StringRelatedField may be used to represent the target
    # of the relationship using its __str__ method.
    ingredients = serializers.StringRelatedField(many=True)
    tags = serializers.StringRelatedField(many=True)
    user = serializers.StringRelatedField(many=False)
    likes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Recipe
        fields = (
            'id', 'user', 'name', 'ingredients', 'ingredients', 'tags', 'tags',
            'time_hours', 'price', 'instructions', 'image', 'date', 'likes'
        )
        read_only_fields = ('id', 'user')
        extra_kwargs = {'tags': {'required': False},
                        'time_hours': {'required': False}}
