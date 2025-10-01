const API_KEY = import.meta.env.VITE_API_KEY

/**
 * Metodo para obtener datos por una petición HTTP [GET]
 * @param { string } url
 * @return { object }
*/
export const getData = async (url) => {
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': API_KEY,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	const responseData = await response.json();
	
	return { status: response.status, dataResponse: responseData };
};

/**
 * Metodo para enviar datos por una petición HTTP [POST]
 * @param { string } url
 * @param { object } data
 * @return { object }
 */
export const postData = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': API_KEY,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});

	const responseData = await response.json();

	return { status: response.status, dataResponse: responseData };
};

/**
 * Metodo para enviar datos por una petición HTTP [PUT]
 * @param { string } url
 * @param { object } data
 * @return { object }
 */
export const putData = async (url, data) => {
	const response = await fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': API_KEY,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	});
	const responseData = await response.json();
	return { status: response.status, dataResponse: responseData };
};

/**
 * Metodo para obtener datos por una petición HTTP [GET]
 * @param { string } url
 * @return { object }
*/
export const deleteData = async (url) => {
	const response = await fetch(url, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': API_KEY,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
	const responseData = await response.json();
	
	return { status: response.status, dataResponse: responseData };
};