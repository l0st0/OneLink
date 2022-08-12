import { Controller, Link, Look, Name, Profile, Response, User } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { updateUser } from '../user/userSlice'
import nameService from './nameService'

interface NameState {
  name: string
  links: Link[]
  profile: Profile
  look: Look
  controllers: Controller[]
  nameError?: string
  updating: boolean
}

const defaultProfile = {
  bio: '',
  image: '',
  title: '',
}

const defaultLook = {
  background: {
    color: '',
  },
  gradient: {
    color: '',
    position: { top: true },
    show: false,
  },
  theme: '',
}

const initialState: NameState = {
  name: '',
  links: [],
  profile: defaultProfile,
  look: defaultLook,
  controllers: [],
  updating: false,
}

export const getName = createAsyncThunk<
  Response<Name>,
  string,
  {
    rejectValue: string
  }
>('name/getName', async (name, { rejectWithValue }) => {
  try {
    return await nameService.fetchName(name)
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
    const response: Response<{ user: User; name: Name }> = await nameService.fetchCreateName(name)

    if (response.ok) dispatch(updateUser(response.ok.user))

    return response
  } catch (err) {
    const message = 'Something happend.'
    return rejectWithValue(message)
  }
})

export const updateLinks = createAsyncThunk<
  Response<Link[]>,
  { name: string; links: Link[] },
  {
    rejectValue: string
  }
>('name/updateLinks', async ({ name, links }, { rejectWithValue }) => {
  try {
    return await nameService.fetchUpdateLinks(name, links)
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
      // getName
      .addCase(getName.pending, () => {})
      .addCase(getName.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        if (ok) {
          const { controllers, links, look, name, profile } = ok

          state.name = name
          state.links = links
          state.look = look
          state.profile = profile
          state.controllers = controllers
        }

        state.nameError = err
      })
      .addCase(getName.rejected, (state, action) => {
        state.name = ''
        state.links = []
        state.look = defaultLook
        state.profile = defaultProfile
        state.controllers = []
        state.nameError = action.payload
      })
      // createName
      .addCase(createName.pending, () => {})
      .addCase(createName.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        if (ok?.name) {
          const { controllers, links, look, name, profile } = ok.name

          state.name = name
          state.links = links
          state.look = look
          state.profile = profile
          state.controllers = controllers
        }
        state.nameError = err
      })
      .addCase(createName.rejected, (state, action) => {
        state.name = ''
        state.links = []
        state.look = defaultLook
        state.profile = defaultProfile
        state.controllers = []
        state.nameError = action.payload
      })
      // createLink
      .addCase(updateLinks.pending, (state) => {
        state.updating = true
      })
      .addCase(updateLinks.fulfilled, (state, action) => {
        const { ok, err } = action.payload
        state.links = ok || state.links
        state.nameError = err
        state.updating = false
      })
      .addCase(updateLinks.rejected, (state, action) => {
        state.updating = false
        state.nameError = action.payload
      })
  },
})

export const {} = nameSlice.actions
export const nameState = (state: RootState) => state.name

export default nameSlice.reducer
