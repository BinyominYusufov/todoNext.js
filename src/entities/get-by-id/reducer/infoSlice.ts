import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InfoTodo } from '../api/info-todo'


export interface ITodo {
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

export const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b
            .addCase(InfoTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
                state.data = action.payload
            })
    }
})

export default InfoSlice.reducer