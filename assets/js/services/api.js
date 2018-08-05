export class API {
	constructor() {

		// MAIN CLASS METHOD
		this.hitInternal = function(endpoint, method, body, headers) {
			var url = `http://127.0.0.1:8000/api${endpoint}`;
				console.log(body);
		    return new Promise( (resolve, reject) => {
				$.ajax({
					url: url,
					type: method,
					headers: headers,
					data: body,
					success: function(data) {
						console.log(data)
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
			var method = 'GET';
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
				reject(resp)
			})
		})
	}

	loginRequest(username, password) {
			return new Promise ( (resolve, reject) => {
				var endpoint = '/login/';
				var method = 'POST';
				var headers = null;
				var body = {
					'username': username,
					'password': password
				};
				this.hitInternal(
					endpoint,
					method,
					body,
					headers
				)
				.then(resp => {
					return resp
				})
				.then(resp => {
					resolve(resp)
				})
				.catch(resp => {
					reject(resp)
				})
			})
		}

		createUserRequest(username, password) {
				return new Promise ( (resolve, reject) => {
					var endpoint = '/user/create/';
					var method = 'POST';
					var headers = null;
					var body = {
						'username': username,
						'password': password
					};
					this.hitInternal(
						endpoint,
						method,
						body,
						headers
					)
					.then(resp => {
						return resp
					})
					.then(resp => {
						resolve(resp)
					})
					.catch(resp => {
						reject(resp)
					})
				})
			}
}
