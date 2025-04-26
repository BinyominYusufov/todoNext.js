import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getData } from '../api/api'


export interface ITodo  {
  id: number,
  isCompleted: boolean,
  images: [number, string],
  name: string,
  description: string
}

interface StateTodo {
  data: ITodo[] | []
}

const initialState: StateTodo = {
  data: []
}

export const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      .addCase(getData.fulfilled, (state, action:PayloadAction<ITodo>) => {
        state.data = action.payload
      })
  }
})

export default todolistSlice.reducer