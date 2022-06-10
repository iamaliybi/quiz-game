import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchQuestions } from './appAPI';


interface AppState {
	username: string | null;
	questions: QuestionType[] | null;
	answeredQuestions: number;
	correctQuestions: number;
}

const initialState: AppState = {
	username: localStorage.getItem('username'),
	questions: [],
	answeredQuestions: 0,
	correctQuestions: 0,
};

export const appSlice = createSlice({
	name: 'app',

	initialState,

	reducers: {
		setUsername: (state: AppState, { payload }: PayloadAction<string>) => {
			state.username = payload;
			localStorage.setItem('username', payload);
		},

		setQuestions: (state: AppState, { payload }: PayloadAction<QuestionType[]>) => {
			state.questions = payload;
		},

		addCorrectQuestion: (state: AppState) => {
			state.correctQuestions = state.correctQuestions + 1;
		},

		setCorrectQuestion: (state: AppState, { payload }: PayloadAction<number>) => {
			state.correctQuestions = payload;
		},

		addAnsweredQuestion: (state: AppState) => {
			state.answeredQuestions = state.answeredQuestions + 1;
		},

		setAnsweredQuestion: (state: AppState, { payload }: PayloadAction<number>) => {
			state.answeredQuestions = payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchQuestions.pending, (state) => {
			state.questions = null;
		});

		builder.addCase(fetchQuestions.rejected, (state) => {
			state.questions = [];
		});

		builder.addCase(fetchQuestions.fulfilled, (state, { payload }) => {
			state.questions = payload as QuestionType[];
		});
	}
});

/* Get reducers */
export const { setUsername, setQuestions, addCorrectQuestion, addAnsweredQuestion, setCorrectQuestion, setAnsweredQuestion } = appSlice.actions;

/* Get states */
export const getUsername = (state: RootState) => state.app.username;
export const getQuestions = (state: RootState) => state.app.questions;
export const getAnsweredQuestions = (state: RootState) => state.app.answeredQuestions;
export const getCorrectQuestions = (state: RootState) => state.app.correctQuestions;

export default appSlice.reducer;
