import { createSlice } from '@reduxjs/toolkit';
import { getLogin, logoutThunk } from './actions'


export const dataSlicer = createSlice({
	name: 'user',
	initialState: {
		login: false
	},
	reducers: {
		checkInitLogin(state, action) {
			state.login = action.payload
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(getLogin.fulfilled, (state, action) => {
				if (action.payload.status === true) {
					state.login = true;
					localStorage.setItem("user", action.payload.status)
				}
			})
			.addCase(logoutThunk.fulfilled, (state, action) => {
				console.log(action.payload);
				if (action.payload === 200) {
					state.login = false;
				}
			})
	}
});




export default dataSlicer.reducer
