from notes.models import *
from django.contrib.auth.models import User


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
        props.save()
