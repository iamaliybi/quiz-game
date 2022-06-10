export const encodeStr = (value: string): string => {
	let str = '';

	for (let i = value.length - 1; i >= 0; i--) {
		str += value[i].charCodeAt(0) + 'x';
	}

	return str.substring(0, str.length - 1);
};

export const decodeStr = (value: string): string => {
	const encodedValue = value.split('x').reverse().map(Number);

	return String.fromCharCode.apply(null, encodedValue);
};

export const improveStr = (str: string) => {
	return str.replace(/&quot;/g, '"').replace(/&#39/g, '\'');
};