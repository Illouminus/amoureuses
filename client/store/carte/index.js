import { createSlice } from '@reduxjs/toolkit';
import { getInitialValue, deleteValue, addValue, deleteCategory } from './actions'


export const dataSlicer = createSlice({
	name: 'carte',
	initialState: {
		category: [],
		menu: [],
	},
	reducers: {
		setData: (state, action) => {
			state.category = action.payload
			state.menu = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			// .addCase(getInitialValue.fulfilled, (state, action) => {
			// 	state.category = action.payload[0];
			// 	state.menu = action.payload[1];
			// })
			// .addCase(deleteValue.fulfilled, (state, action) => {
			// 	console.log('DELETE', action )
			// 	if (action.payload.status.findItem) {
			// 		state.menu = state.menu.filter(el => el._id !== action.payload.id)
			// 	}
			// })
			// .addCase(addValue.fulfilled, (state, action) => {
			// 	console.log(action)
			// 	let categoryIndex = state.category.findIndex((el) => el._id === action.payload.category._id);
			// 	console.log('Нашли категорию', categoryIndex)
			// 	let menuIndex = state.menu.findIndex((el) => el._id === action.payload.menu._id);
			// 	console.log('Нашли меню', menuIndex)
			// 	if (categoryIndex !== -1) {
			// 		state.category[categoryIndex] = action.payload.category;
			// 		console.log('Попадаем в условие если нашли категорию')
			// 	} else {
			// 		state.category.push(action.payload.category);
			// 		console.log('Попадаем в условие если не нашли категорию')
			// 	}
			// 	if (menuIndex !== -1) {
			// 		state.menu[menuIndex] = action.payload.menu;
			// 		console.log('Попадаем в условие если нашли меню')
			// 	} else {
			// 		state.menu.push(action.payload.menu);
			// 		console.log('Попадаем в условие если не нашли меню')
			// 	}
			// })
			// .addCase(deleteCategory.fulfilled, (state, action) => {
			// 	console.log(action)
			// 	if (action.payload.status.findItem) {
			// 		state.category = state.category.filter(el => el._id !== action.payload.id)
			// 	}
			// })
	}
});


export const { setData } = dataSlicer.actions;
export default dataSlicer.reducer
