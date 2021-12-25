from django.db import models


class SiteSetting(models.Model):
    name = models.CharField(max_length=20, default="")
    value = models.CharField(max_length=1000, default=None, null=True)

    def __str__(self) -> str:
        return self.name