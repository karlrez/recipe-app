from django.urls import path
from django.conf.urls import url
from recipe import views

app_name = 'recipe'

urlpatterns = [
    path('all-recipes', views.RecipeViewSet.as_view(), name='all_recipes'),
    path('my-recipes', views.MyRecipeViewSet.as_view(), name='my_recipes'),
    path('create-recipe', views.CreateRecipeView.as_view(), name='create_recipe'),
    path('retrieve-update/<int:id>', views.RecipeDetailView.as_view(), name='retrieve_update_recipe'),
    path('view-create-ingredients/', views.IngredientViewSet.as_view(), name='view_create_ingredients'),
    path('ingredient-detail/<slug:name>', views.IngredientDetailView.as_view(), name='ingredient_detail'),
    path('view-create-tags/', views.TagViewSet.as_view(), name='view_create_tags'),
    path('tag-detail/<slug:name>', views.TagDetailView.as_view(), name='tag_detail'),
    path('like/<int:recipe_id>', views.LikeRecipeView.as_view(), name='like_recipe'),
    path('likes/<int:recipe_id>', views.RecipeLikesViewSet.as_view(), name='recipe_likes'),
    path('popular/', views.PopularRecipeViewSet.as_view(), name='popular_recipes'),
    path('feed/', views.UserFeedRecipeViewSet.as_view(), name='user_feed_recipes'),

    # Recipe query APIs
    path('user/<slug:username>/', views.UserRecipeViewSet.as_view(), name='user_recipes'),
    path('tag/<slug:tag>', views.TagRecipeViewSet.as_view(), name='tag_recipes'),
    path('ingredients/<str:i1>/', views.IngredientRecipeViewSet.as_view(), name='ingredient_recipes1'),
    path('ingredients/<str:i1>/<str:i2>/', views.IngredientRecipeViewSet.as_view(), name='ingredient_recipes2'),
    path('ingredients/<str:i1>/<str:i2>/<str:i3>/', views.IngredientRecipeViewSet.as_view(), name='ingredient_recipes3'),
    path('name/<str:name>', views.RecipeNameViewSet.as_view(), name='name_recipes'),
]
