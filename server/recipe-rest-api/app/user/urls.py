from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('create', views.CreateUserView.as_view(), name='create'),
    path('manage/info', views.ManageUserView.as_view(), name='manage_info'),
    path('manage/profile', views.ManageUserProfileView.as_view(), name='manage_profile'),
    path('token', views.CreateTokenView.as_view(), name='token'),
    path('search-user/<slug:username>/', views.UserProfileView.as_view(), name='search_user'),
    path('search-users/<slug:username>', views.UserSearchView.as_view(), name='search_users'),
    path('<slug:username>/update-profile', views.ManageUserProfileView.as_view(), name='update_profile'),
    path('<slug:username>/followers', views.FollowersViewSet.as_view(), name='followers'),
    path('<slug:username>/following', views.FollowingViewSet.as_view(), name='following'),
    path('<slug:username>/follow', views.FollowUserView.as_view(), name='follow'),
]
