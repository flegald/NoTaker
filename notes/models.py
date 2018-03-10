from django.db import models as md
from users.models import Profile


class Note(md.Model):
    user = md.ForeignKey(
        Profile,
        on_delete=md.CASCADE,
        related_name="notes"
    )


class Contents(md.Model):
    note = md.OneToOneField(Note, on_delete=md.CASCADE, related_name="contents")
    checked = md.BooleanField(default=False)
    contents = md.TextField(max_length=1024)


class Properties(md.Model):
    COLORS = (
        ("Red","Red"),
        ("Blue","Blue"),
        ("Green","Green"),
    )
    FONTS = (
        ("Helvetica","Helvetica"),
        ("Comic-Sans","Comic Sans"),
        ("Papyrus","Papyrus"),
        ("Times-New-Roman","Times New Roman"),
    )
    rank = md.IntegerField(null=True)
    title = md.CharField(max_length=32)
    note = md.OneToOneField(Note, on_delete=md.CASCADE)
    last_modified_date = md.DateField(auto_now=True)
    color = md.CharField(
        max_length=32,
        choices=COLORS,
        default="Red"
    )
    font = md.CharField(
        max_length=32,
        choices=FONTS,
        default="Times-New-Roman"
    )


class Reminders(md.Model):
    note = md.OneToOneField(Note, on_delete=md.CASCADE)
    name = md.CharField(max_length=32)
    time = md.DateField(auto_now=False, auto_now_add=False)
