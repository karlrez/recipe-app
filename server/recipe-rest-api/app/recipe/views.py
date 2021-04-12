from django.contrib.auth import get_user_model
from core.models import Recipe
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.permissions import IsOwnerOrReadOnly
from rest_framework.views import APIView
from core.models import Tag, Ingredient, Recipe
from django.db.models import Count
from recipe.serializers import *
from django.http import Http404


class TagViewSet(generics.ListCreateAPIView):
    """Viewset for creating or listing all tags"""
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)
    queryset = Tag.objects.all()


class TagDetailView(generics.RetrieveAPIView):
    """Viewset for retrieving tag details"""
    lookup_field = 'name'
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (AllowAny,)


class IngredientViewSet(generics.ListCreateAPIView):
    """Viewset for creating or listing all ingredients"""
    serializer_class = IngredientSerializer
    permission_classes = (AllowAny,)
    queryset = Ingredient.objects.all()


class IngredientDetailView(generics.RetrieveAPIView):
    """Viewset for retrieving ingredient details"""
    lookup_field = 'name'
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = (AllowAny,)


class RecipeViewSet(generics.ListAPIView):
    """Viewset for all recipes"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)
    queryset = Recipe.objects.all().order_by('-date')


class RecipeDetailView(generics.RetrieveUpdateAPIView):
    """To view an individual recipe"""
    lookup_field = 'id'
    serializer_class = StringRecipeSerializer
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Recipe.objects.all()


class CreateRecipeView(generics.CreateAPIView):
    """Viewset for creating recipes"""
    serializer_class = RecipeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserRecipeViewSet(generics.ListAPIView):
    """Viewset to list a users recipes"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        user = get_user_model().objects.get(
            username = self.kwargs['username']
        )
        queryset = Recipe.objects.filter(user=user).order_by('-date')
        return queryset


class MyRecipeViewSet(generics.ListAPIView):
    """Viewset for current users recipes"""
    serializer_class = StringRecipeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Recipe.objects.filter(
            user=self.request.user).order_by('-date')
        return queryset


class TagRecipeViewSet(generics.ListAPIView):
    """Viewset to list recipes with a specified tag"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        tag_string = self.kwargs['tag']

        try:
            tag = Tag.objects.get(name=tag_string)
        except Tag.DoesNotExist:
            raise Http404("No recipes with this tag")

        try:
            queryset = Recipe.objects.filter(tags=tag)
            return queryset
        except Recipe.DoesNotExist:
            raise Http404("No recipes with this tag")


class IngredientRecipeViewSet(generics.ListAPIView):
    """Viewset to list recipes with specified ingredients"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
            if (len(self.kwargs) == 1):
                i1 = self.kwargs['i1']
                try:
                    ingred1 = Ingredient.objects.get(name=i1)
                except Ingredient.DoesNotExist:
                    raise Http404("No recipes with this ingredient")
                try:
                    queryset = Recipe.objects.filter(ingredients=ingred1)
                except Recipe.DoesNotExist:
                    raise Http404("No recipes with this ingredient")
            elif (len(self.kwargs) == 2):
                i1 = self.kwargs['i1']
                i2 = self.kwargs['i2']
                try:
                    ingred1 = Ingredient.objects.get(name=i1)
                    ingred2 = Ingredient.objects.get(name=i2)
                except Ingredient.DoesNotExist:
                    raise Http404("No recipes with these ingredients")
                try:
                    queryset = Recipe.objects.filter(ingredients=ingred1).filter(ingredients=ingred2)
                except Recipe.DoesNotExist:
                    raise Http404("No recipes with these ingredients")
            else:
                i1 = self.kwargs['i1']
                i2 = self.kwargs['i2']
                i3 = self.kwargs['i3']
                try:
                    ingred1 = Ingredient.objects.get(name=i1)
                    ingred2 = Ingredient.objects.get(name=i2)
                    ingred3 = Ingredient.objects.get(name=i3)
                except Ingredient.DoesNotExist:
                    raise Http404("No recipes with these ingredients")
                try:
                    queryset = Recipe.objects.filter(ingredients=ingred1).filter(ingredients=ingred2).filter(ingredients=ingred3)
                except Recipe.DoesNotExist:
                    raise Http404("No recipes with these ingredients")

            return queryset


class RecipeNameViewSet(generics.ListAPIView):
    """Viewset to list recipes with a specified name"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        try:
            return Recipe.objects.filter(name__icontains=self.kwargs['name'])
        except Recipe.DoesNotExist:
            raise Http404("No recipes with this name")


class RecipeLikesViewSet(generics.ListAPIView):
    """Viewset to view users that liked a recipe"""
    serializer_class = HelperUserSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = Recipe.objects.get(
            id=self.kwargs['recipe_id']).likes.all()
        return queryset


class LikeRecipeView(APIView):
    """Add like to a recipe"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None, recipe_id=None):
        recipe = Recipe.objects.get(id=recipe_id)
        user = self.request.user
        if user.is_authenticated:
            if user in recipe.likes.all():
                like = False
                recipe.likes.remove(user)
            else:
                like = True
                recipe.likes.add(user)
        data = {
            'like': like
        }
        return Response(data)

class PopularRecipeViewSet(generics.ListAPIView):
    """Viewset for all recipes ordered by most likes"""
    serializer_class = StringRecipeSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = Recipe.objects.annotate(likes_count=Count('likes')).order_by('-likes_count')
        return queryset

class UserFeedRecipeViewSet(generics.ListAPIView):
    """Viewset to view recipes from users you follow"""
    serializer_class = StringRecipeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        following_users = user.following.all()
        queryset = Recipe.objects.filter(user__in=following_users).order_by('-date')
        return queryset
