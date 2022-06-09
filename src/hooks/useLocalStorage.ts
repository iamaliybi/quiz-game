import { useState, useEffect } from 'react';

const useLocalStorage = <T>(name: string, defaultValue: T) => {
	const [value, setValue] = useState(
		JSON.parse(localStorage.getItem(name) || '') ?? defaultValue
	);

	useEffect(() => {
		localStorage.setItem(name, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
};

export default useLocalStorage;