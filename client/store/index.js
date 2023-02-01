import { combineReducers, configureStore } from '@reduxjs/toolkit';
import carte from './carte/index';
import user from './user/index'


const rootReducer = combineReducers({
	carte,
	user
})


export const store = configureStore({
	reducer: rootReducer
});



