from django.urls import path
from django.conf.urls import url
from comment import views

app_name = 'comment'

urlpatterns = [
    path('recipe/<int:recipe_id>/', views.RecipeCommentViewSet.as_view(), name='recipe-comments'),
    path('create-comment/<int:recipe_id>/', views.CreateRecipeComment.as_view(), name='create-comment'),
]
