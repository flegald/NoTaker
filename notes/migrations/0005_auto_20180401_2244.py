# Generated by Django 2.0.2 on 2018-04-01 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0004_note_is_deleted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='properties',
            name='title',
            field=models.CharField(max_length=256),
        ),
    ]
