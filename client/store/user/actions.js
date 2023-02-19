import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const getLogin = createAsyncThunk('user/login', async (loginForm) => {
	const response = await axios.post('http://localhost:4000/login', loginForm);
	return response.data
});

export const logoutThunk = createAsyncThunk('user/logout', async () => {
	const response = await axios.post('http://localhost:4000/logout');
	console.log(response);
	return response.status
});
