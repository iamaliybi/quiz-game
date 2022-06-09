import { useState } from 'react';

type StateType<T> = {
	hasError: boolean;
	status: 'PENDING' | 'REJECTED' | 'SUCCEEDED'
	data: T | null
};

type HookResponse<T> = StateType<T> & {
	request: () => Promise<unknown>
};

type CacheType = {
	[key:string]: unknown
};

const CACHE: CacheType = {};

const useFetch = <T>(url: string, options: RequestInit, cache = true): HookResponse<T> => {
	const [state, setState] = useState<StateType<T>>({
		hasError: false,
		status: 'PENDING',
		data: null
	});

	const request = () => new Promise(async (resolve, reject) => {
		/* Check cache storage */
		if (cache && (url in CACHE)) {
			resolve(CACHE[url]);
			return;
		}

		/* Send HTTP request */
		const response = await fetch(url, {
			...options,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		});
		const data: T = await response.json();

		/* Check HTTP status code */
		if (response.status !== 200) {
			reject({
				message: response.statusText,
				code: response.status,
				data
			});
			return;
		}

		/* Done request */
		setState({
			data: data,
			hasError: false,
			status: 'SUCCEEDED'
		});
		resolve(data);

		if (cache) CACHE[url] = data;
	});

	return { ...state, request };
};

export default useFetch;