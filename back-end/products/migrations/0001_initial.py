# Generated by Django 3.2.9 on 2021-11-28 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=20)),
                ('price', models.FloatField(default=None)),
                ('imageUrl', models.CharField(default='', max_length=200)),
                ('brand', models.CharField(default='', max_length=100)),
                ('category', models.CharField(default='', max_length=100)),
            ],
        ),
    ]