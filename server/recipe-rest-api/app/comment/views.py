from core.models import Comment, Recipe
from comment.serializers import *
from rest_framework import viewsets, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import Http404

class RecipeCommentViewSet(generics.ListAPIView):
    """View all comments for a recipe"""
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        try:
            recipe = Recipe.objects.get(id=self.kwargs['recipe_id'])
        except Recipe.DoesNotExist:
            raise Http404("Recipe does not exist")

        try:
            queryset = Comment.objects.filter(recipe=recipe).order_by('-date')
            return queryset
        except Comment.DoesNotExist:
            raise Http404("There are no comments for this post")


class CreateRecipeComment(generics.CreateAPIView):
    """Add a comment to a recipe"""
    serializer_class = CommentSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, recipe=Recipe.objects.get(id=self.kwargs['recipe_id']))
