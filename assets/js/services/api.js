export class API {
	constructor() {

		// MAIN CLASS METHOD
		this.hitInternal = function(endpoint, method, body, headers) {
			var url = `http://127.0.0.1:8000/api${endpoint}`;
		    return new Promise( (resolve, reject) => {
				$.ajax({
					url: url,
					type: method,
					headers: headers,
					data: body,
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

// User Calls
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

	getUserNotes(token) {
		return new Promise ( (resolve, reject) => {
			var endpoint = '/user/notes/';
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
				var headers = {
					'Content-Type': 'application/json'
				};
				var bodyRaw = {
					'username': username,
					'password': password
				};
				var body = JSON.stringify(bodyRaw);
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
				var headers = {
					'Content-Type': 'application/json'
				};
				var bodyRaw = {
					'username': username,
					'password': password
				};
				var body = JSON.stringify(bodyRaw);
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

// Note Calls
	createNewNoteRequest(token, noteData) {
			return new Promise ( (resolve, reject) => {
				var endpoint = '/note/create/';
				var method = 'POST';
				var headers = {
					"Authorization": `JWT ${token}`,
					"Content-Type": "application/json"
				};
				var body = JSON.stringify(noteData);
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

		updateExistingNoteRequest(token, noteData, pk) {
				return new Promise ( (resolve, reject) => {
					var endpoint = `/note/${pk}/update/`;
					var method = 'POST';
					var headers = {
						"Authorization": `JWT ${token}`,
						"Content-Type": "application/json"
					};
					var body = JSON.stringify(noteData);
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
