import { renderHook } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';
import apiRoutes from '../api/routes';
import { useFetch } from '../hooks';
import mockData from './api.json';

/* Enable mock */
fetchMock.enableMocks();

beforeEach(() => {
	/* Mock API */
	fetchMock.doMock();
});

test('useFetch', async () => {
	// @ts-ignore: Unreachable code error
	fetch.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

	const { result } = renderHook(() => useFetch(apiRoutes.questions.get));

	await act(async () => {
		result.current.request();
	});

	expect(result.current.hasError).toEqual(false);
});