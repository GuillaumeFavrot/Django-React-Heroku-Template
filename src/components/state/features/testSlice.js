import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

//URL and axios setup

let url = ''
  
if(process.env.NODE_ENV === 'development') {
  url = 'http://127.0.0.1:8000'
}

const api = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

//action creators

export const getTestMessage = createAsyncThunk(
  'test/getTestMessage',
  async () => {
    try {
      const response = await api.get(`/api/test`)
      return JSON.stringify(response)
    }
    catch (e) {
      console.log(e)
      throw(e)
    }
  }
)

export const addTestMessage = createAsyncThunk(
  'test/addTestMessage',
  async (testMessage) => {
    try{
      const response = await api.post(`/api/test`, testMessage)
      return JSON.stringify(response)
    }
    catch (e) {
      return JSON.stringify({
        data: [],
        status: "Null",
        statusText: e.message
      })
    }
  }
)

export const modifyTestMessage = createAsyncThunk(
  'test/modifyTestMessage',
  async (data) => {
    try {
      const response = await api.put(`/api/test`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

export const deleteTestMessage = createAsyncThunk(
  'test/deleteTestMessage',
  async (id) => {
    try {
      console.log(id)
      const response = await api.delete(`/api/test`, {data : {id : id}})
      console.log(JSON.stringify(response))
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)


//Initial state and reducers

const initialState = {
  messages: [],
  loading: false,
  statusText: '',
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: {

    //GET reducers  
    [getTestMessage.pending]: (state) => {
      state.loading = true
    },
    [getTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [getTestMessage.rejected]: (state, { error } ) => {
      console.log(error)
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //POST reducers
    [addTestMessage.pending]: (state) => {
      state.loading = true
    },
    [addTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = res.status != 'Null' ? `POST Request ${res.statusText} with status code ${res.status}` : 'POST request failed with status code 404'  
      state.messages = res.data
    },
    [addTestMessage.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `POST ${error.message}`
    },

    //PUT reducers
    [modifyTestMessage.pending]: (state) => {
      console.log('pending')
      state.loading = true
    },
    [modifyTestMessage.fulfilled]: (state, { payload } ) => {
      console.log('fulfilled')
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [modifyTestMessage.rejected]: (state, { error }) => {
      console.log('rejected')
      state.loading = false
      state.statusText = `PUT ${error.message}`
    },
  
    //DELETE reducers
    [deleteTestMessage.pending]: (state) => {
      state.loading = true
    },
    [deleteTestMessage.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `DELETE Request ${res.statusText} with status code ${res.status}`
      state.messages = res.data
    },
    [deleteTestMessage.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `DELETE ${error.message}`
    }
  },
})

export const testReducer = testSlice.reducer




