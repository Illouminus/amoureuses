import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getInitialValue = createAsyncThunk('menu/value', async () => {
	const response = await axios.get('/api/carte/initial');
	return response.data
});

// export const deleteValue = createAsyncThunk('menu/delete', async (id) => {
// 	const response = await axios.post('http://localhost:4000/delete', { id });
// 	console.log(response.data, id);
// 	return { status: response.data, id }
// });

// export const addValue = createAsyncThunk('menu/addArticle', async (newItem) => {
// 	console.log('Отправляем на бэк это',newItem)
// 	const response = await axios.post('/api/carte/addItem', newItem);
// 	console.log('NEW DATE MONGOOSE',response)
// 	return response.data
// });

export const deleteCategory = createAsyncThunk('deleteCategory', async (id) => {
	console.log(id)
	const response = await axios.post('http://localhost:4000/deleteCategory', {id});
	console.log(response.data)
	return { status: response.data, id }
});

