import { createAsyncThunk } from '@reduxjs/toolkit';

/* export const updateUser = createAsyncThunk<QuestionType[]>('users/update', async (userData, { rejectWithValue }) => {
	try {
		const { id, ...fields } = userData;
		const response = await userAPI.updateById<UpdateUserResponse>(id, fields);
		return response.data.user;
	} catch (err) {
		const error: AxiosError<ValidationErrors> = err; // cast the error for access
		if (!error.response) {
			throw err;
		}
		// We got validation errors, let's return those so we can reference in our component and set form errors
		return rejectWithValue(error.response.data);
	}
}); */