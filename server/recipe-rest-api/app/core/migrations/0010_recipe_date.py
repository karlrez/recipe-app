# Generated by Django 3.0.8 on 2020-08-28 01:26

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20200827_1840'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
