import { axiosClientRequest } from "@/shared/utils/axiosClientRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const InfoTodo = createAsyncThunk("todolist/InfoTodo", async (id, { dispatch }) => {
    try {
        const { data } = await axiosClientRequest.get(`/to-dos/${id}`)
        return data
    } catch (error) {
        console.error(error);
    }
})