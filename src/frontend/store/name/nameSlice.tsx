import { Name, Response, User } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { updateUser } from '../user/userSlice'
import nameService from './nameService'

interface NameState {
  name?: Name
  nameError?: string
}

const initialState: NameState = {
  name: undefined,
}

export const getName = createAsyncThunk<
  Response<Name>,
  string,
  {
    rejectValue: string
  }
>('name/getName', async (name, { rejectWithValue }) => {
  try {
    return await nameService.getName(name)
  } catch (err) {
    const message = 'Something happend.'
    return rejectWithValue(message)
  }
})

export const createName = createAsyncThunk<
  Response<{ user: User; name: Name }>,
  string,
  {
    rejectValue: string
  }
>('name/createName', async (name, { rejectWithValue, dispatch }) => {
  try {
    const response: Response<{ user: User; name: Name }> = await nameService.createName(name)

    if (response.ok) dispatch(updateUser(response.ok.user))

    return response
  } catch (err) {
    const message = 'Something happend.'
    return rejectWithValue(message)
  }
})

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUser
      .addCase(getName.pending, () => {})
      .addCase(getName.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        state.name = ok
        state.nameError = err
      })
      .addCase(getName.rejected, (state, action) => {
        state.name = undefined
        state.nameError = action.payload
      })
      .addCase(createName.pending, () => {})
      .addCase(createName.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        state.name = ok?.name
        state.nameError = err
      })
      .addCase(createName.rejected, (state, action) => {
        state.name = undefined
        state.nameError = action.payload
      })
  },
})

export const {} = nameSlice.actions
export const nameState = (state: RootState) => state.name

export default nameSlice.reducer
