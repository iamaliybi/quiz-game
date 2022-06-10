import { encodeStr, improveStr } from './../../utils/helper';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../../api/routes';

export const fetchQuestions = createAsyncThunk('fetch/questions', async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(apiRoutes.questions.get);
		const data: ApiResponse<APIQuestion[]> = await response.json();

		const questions: QuestionType[] = [...data.results].map(q => {
			const answers = [q.correct_answer, ...q.incorrect_answers]
				.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
				.map(improveStr);

			return {
				correct_answer: encodeStr(q.correct_answer),
				question: improveStr(q.question),
				answers
			};
		});


		return questions;
	} catch (err) {
		throw rejectWithValue(err);
	}
});