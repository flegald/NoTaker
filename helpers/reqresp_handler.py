import json

class ReqRespHandler:

    # Requests
    def parse_json(self, request):
        try:
            return json.loads(request.body)
        except:
            return {"Error": "Invalid JSON"}


    # Response
    def return_json(self, resp):
        return json.dumps(resp)