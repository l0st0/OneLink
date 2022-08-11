import { Response, User } from '@/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import userService from './userService'

interface UserState {
  user?: User
  isAuth: Boolean
  loading: Boolean
  loginErr?: string
  userError?: string
}

const initialState: UserState = {
  user: undefined,
  isAuth: true,
  loading: false,
  loginErr: undefined,
  userError: undefined,
}

export const getUser = createAsyncThunk<
  Response<User>,
  undefined,
  {
    rejectValue: string
  }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    return await userService.fetchUser()
  } catch (err) {
    const message = 'Something happend.'
    return rejectWithValue(message)
  }
})

export const getIsAuth = createAsyncThunk<
  boolean,
  undefined,
  {
    rejectValue: string
  }
>('user/getIsAuth', async (_, { rejectWithValue }) => {
  try {
    return await userService.fetchIsAuth()
  } catch (err) {
    const message = 'Something happend.'
    return rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<Boolean>) => {
      state.isAuth = action.payload
      if (!action.payload) {
        state.loginErr = 'Something happened during login.'
      }
    },
    setLogout: (state) => {
      state.isAuth = false
      state.user = undefined
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // getIsAuth
      .addCase(getIsAuth.pending, (state) => {
        state.loading = true
      })
      .addCase(getIsAuth.fulfilled, (state, action) => {
        state.loading = false
        state.isAuth = action.payload
      })
      .addCase(getIsAuth.rejected, (state) => {
        state.loading = false
        state.isAuth = false
      })
      // getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        state.loading = false
        state.user = ok
        state.userError = err
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.user = undefined
        state.userError = action.payload
      })
  },
})

export const { setLogin, setLogout, updateUser } = userSlice.actions
export const userState = (state: RootState) => state.user

export default userSlice.reducer
