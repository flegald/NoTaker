from notes.models import *
from django.contrib.auth.models import User
import datetime


class NoteHandler:

    def create_note(self, profile):
        note = Note()
        note.user = profile
        note.save()
        return note

    def create_note_contents(self, note, contents_body):
        contents = Contents()
        contents.note = note
        for key in contents_body:
            if key.lower() == "contents":
                contents.contents = contents_body["contents"]
            if key.lower() == "checked":
                contents.checked = contents_body["checked"]
        contents.save()

    def create_note_properties(self, note, contents_props):
        props = Properties()
        props.note = note
        for key in contents_props:
            #import pdb; pdb.set_trace()
            if key.lower() == "rank" and type(contents_props["rank"]) == int:
                props.rank = contents_props["rank"]
            if key.lower() == "title":
                props.title = contents_props["title"]
            if key.lower() == "color":
                props.color = contents_props["color"]
            if key.lower() == "font":
                props.font = contents_props["font"]
        props.save()

    def create_note_reminder(self, note, contents_reminder):
        reminder = Reminders()
        reminder.note = note
        for key in contents_reminder:
            if key.lower() == "name":
                reminder.name = contents_reminder["name"]
            if key.lower() == "time":
                date_format = "%Y %m %d %H:%M"
                date_object = datetime.datetime.strptime(contents_reminder["time"],date_format)
                reminder.time = date_object
        reminder.save()
        return reminder

    def get_note(self, pk):
        return Note.objects.get(pk=pk) 

