import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AppState {
	questions: []
}

const initialState: AppState = {
	questions: []
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		//
	},
});

// export const {  } = counterSlice.actions;

export default appSlice.reducer;
