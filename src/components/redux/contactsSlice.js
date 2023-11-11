import { createSlice } from '@reduxjs/toolkit';
import contactsList from '../../data/data.json';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { list: contactsList },
  reducers: {
    addContact(state, action) {
      state.list = [...state.list, action.payload];
    },
    deleteContact(state, action) {
      state.list = state.list.filter(contact => contact.id !== action.payload);
    },
  },
});
const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
export const { addContact, deleteContact } = contactsSlice.actions;
