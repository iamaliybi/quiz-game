import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { fetchQuestions } from './appAPI';

interface AppState {
	userName: string | null;
	answeredQuestions: number;
	questions: QuestionType[] | null
}

const initialState: AppState = {
	userName: localStorage.getItem('username'),
	answeredQuestions: 0,
	questions: null
};

export const appSlice = createSlice({
	name: 'app',

	initialState,

	reducers: {
		setUsername: (state: AppState, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
		setAnsweredQuestions: (state: AppState, action: PayloadAction<string>) => {
			state.userName = action.payload;
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
			state.questions = payload;
		});
	}
});

/* Get reducers */
export const { setAnsweredQuestions, setUsername } = appSlice.actions;

/* Get states */
export const getUsername = (state: RootState) => state.app.userName;
export const getQuestions = (state: RootState) => state.app.questions;
export const getAnsweredQuestions = (state: RootState) => state.app.answeredQuestions;

export default appSlice.reducer;
