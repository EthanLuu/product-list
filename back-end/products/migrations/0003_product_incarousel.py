# Generated by Django 3.2.9 on 2021-12-15 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20211204_0502'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='inCarousel',
            field=models.BooleanField(default=False),
        ),
    ]