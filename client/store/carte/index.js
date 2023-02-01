import { createSlice } from '@reduxjs/toolkit';
import { getInitialValue, deleteValue, addValue, deleteCategory } from './actions'


export const dataSlicer = createSlice({
	name: 'carte',
	initialState: {
		category: '',
		menu: '',
	},
	reducers: {
		setData: (state, action) => {
			state.category = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getInitialValue.fulfilled, (state, action) => {
				state.category = action.payload[0];
				state.menu = action.payload[1];
			})
			.addCase(deleteValue.fulfilled, (state, action) => {
				if (action.payload.status.findItem === 1) {
					state.menu = state.menu.filter(el => el.id !== action.payload.id)
				}
			})
			.addCase(addValue.fulfilled, (state, action) => {
				let categoryIndex = state.category.findIndex((el) => el.id === action.payload.category[0].id);
				let menuIndex = state.menu.findIndex((el) => el.id === action.payload.menu.id);
				if (categoryIndex !== -1) {
					state.category[categoryIndex] = action.payload.category[0];
				} else {
					state.category.push(action.payload.category[0]);
				}
				if (menuIndex !== -1) {
					state.menu[menuIndex] = action.payload.menu;
				} else {
					state.menu.push(action.payload.menu);
				}
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				if (action.payload.status.findItem === 1) {
					state.category = state.category.filter(el => el.id !== action.payload.id)
				}
			})
	}
});


export default dataSlicer.reducer