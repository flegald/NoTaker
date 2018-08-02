export class API {
	constructor() {

		// MAIN CLASS METHOD
		this.hitInternal = function(endpoint, method, body, headers) {
			var url = `http://127.0.0.1:8000${endpoint}`;
		    return new Promise( (resolve, reject) => {
				$.ajax({
					url: url,
					type: method,
					headers: headers,
					body: body,
					success: function(data) {
						resolve(data)
					},
					error: function(data) {
						reject(data)
					}
				})
			})
	  	}
	}

	getUserSelf(token) {
		return new Promise ( (resolve, reject) => { 
			var endpoint = '/user/get';
			var method = "GET";
			var headers = {
				"Authorization": `JWT ${token}`
			};
			var body = null;
			this.hitInternal(
				endpoint, 
				method,
				body,
				headers
			).then(resp => {
				resolve(resp)
			}).catch(resp => {
				reject(resp.responseJSON)
			})
		})
	}
}

