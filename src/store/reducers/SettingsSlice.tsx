import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
   theme: TTheme;
}

export type TTheme = 'dark' | 'light';

const initialState: IAuthState = {
   theme: 'dark',
};

export const SettingsSlice = createSlice({
   name: 'SettingsSlice',
   initialState,
   reducers: {
      setTheme: (state, action: PayloadAction<TTheme>) => {
         state.theme = action.payload;
      },
   },
});

export default SettingsSlice.reducer;

export const { setTheme } = SettingsSlice.actions;
