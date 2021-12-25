from django.db import models


class Product(models.Model):
    title = models.CharField(max_length=20, default="")
    price = models.FloatField(default=None, null=True)
    imageUrl = models.CharField(max_length=200, default="", null=True)
    brand = models.CharField(max_length=100, default="", null=True)
    category = models.CharField(max_length=100, default="")
    inCarousel = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
