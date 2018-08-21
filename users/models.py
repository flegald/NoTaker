from django.db import models as md
from django.contrib.auth.models import User

# Create your models here.
class Profile(md.Model):
    user = md.OneToOneField(User, on_delete=md.CASCADE)

class Preferences(md.Model):
    profile = md.OneToOneField(Profile, on_delete=md.CASCADE,null=True)
    nightmode = md.BooleanField(default=False)
