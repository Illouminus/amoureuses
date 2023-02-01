import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getInitialValue = createAsyncThunk('menu/value', async () => {
	console.log('GOT HERE IN ACTION');
	const response = await axios.get('http://localhost:4000/initialValues');
	return response.data
});

export const deleteValue = createAsyncThunk('menu/delete', async (id) => {
	const response = await axios.post('http://localhost:4000/delete', { id });
	console.log(response.data, id);
	return { status: response.data, id }
});

export const addValue = createAsyncThunk('menu/addArticle', async (newItem) => {
	const response = await axios.post('http://localhost:4000/addArticle', newItem);
	return response.data
});

export const deleteCategory = createAsyncThunk('deleteCategory', async (id) => {
	const response = await axios.post('http://localhost:4000/deleteCategory', {idCategory : id});
	return { status: response.data, id }
});

