export async function fetchGet(pathName, token = null, method = 'GET') {
	const apiURL = "http://localhost:9999/";
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			method,
			headers: { Authorization: 'Bearer ' + token },
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}


export async function fetchPost(pathName, token = null, body, method = 'POST', contentType = 'application/json') {
	const apiURL = "http://localhost:9999/";
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': contentType,
			},
			method,
			body,
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}

export async function fetchUpload(pathName, token = null, body) {
	const apiURL = "http://localhost:9999/";
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			method: 'POST',
			body,
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}
