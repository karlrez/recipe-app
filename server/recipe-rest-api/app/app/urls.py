"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

schema_view = get_schema_view(
                              title="Recipe Rest API",
                              description="This project contains API endpoints for a instagram-like application",
                              version="1.0.0")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('recipes/', include('recipe.urls')),
    path('comments/', include('comment.urls')),
    # path('', schema_view),
    path('', include_docs_urls(title='Recipe Rest API',
                               description="This project contains API endpoints to create a Instagram-like application")),

    # This makes the media url available on our development server
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
