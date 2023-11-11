import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredContacts: (state, action) => action.payload,
  },
});

export const { filteredContacts } = filterSlice.actions;
