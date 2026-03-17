import { createSlice } from '@reduxjs/toolkit';
import { currentUser } from '../../utils/initialData';

const userSlice = createSlice({
  name: 'user',
  initialState: currentUser, 
  reducers: {
    updateProfile: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;