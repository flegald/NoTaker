# Generated by Django 2.0.2 on 2018-03-10 03:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contents',
            name='note',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='contents', to='notes.Note'),
        ),
        migrations.AlterField(
            model_name='properties',
            name='note',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='notes.Note'),
        ),
        migrations.AlterField(
            model_name='properties',
            name='rank',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='reminders',
            name='note',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='notes.Note'),
        ),
    ]
