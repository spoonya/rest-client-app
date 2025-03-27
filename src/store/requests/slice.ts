import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequestState {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

const initialState: RequestState = {
  method: 'GET',
  url: '',
  headers: {},
  body: '',
};

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setMethod: (state, action: PayloadAction<string>) => {
      state.method = action.payload;
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setMethod, setUrl } = requestsSlice.actions;
export default requestsSlice.reducer;
