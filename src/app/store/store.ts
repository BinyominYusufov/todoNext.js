import  InfoSlice  from '@/entities/get-by-id/reducer/infoSlice'
import todolistSlice from '@/entities/todolist/reducer/todolistSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todolist: todolistSlice,
    info: InfoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch