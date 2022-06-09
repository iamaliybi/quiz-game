import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../../api/routes';

export const fetchQuestions = createAsyncThunk<QuestionType[]>('fetch/questions', async () => {
	try {
		const response = await fetch(apiRoutes.questions.get);
		const data = await response.json();

		return data.results;
	} catch (err) {
		console.log(err);
	}
});