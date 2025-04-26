"use client"

import { axiosClientRequest } from "@/shared/utils/axiosClientRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("todolist/getData", async () => {
    try {
        const { data } = await axiosClientRequest.get("/to-dos")
        return data.data
    } catch (error) {
        console.error(error);
    }
})

export const DelTodo = createAsyncThunk("todolist/DelTodo", async (id, { dispatch }) => {
    try {
        await axiosClientRequest.delete(`to-dos?id=${id}`)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})

export const CheckTodo = createAsyncThunk("todolist/CheckTodo", async (id, { dispatch }) => {
    try {
        await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})


export const DelImageTodo = createAsyncThunk("todolist/DelImageTodo", async (id, { dispatch }) => {
    try {
        await axiosClientRequest.delete(`/to-dos/images/${id}`)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})


export const AddTodo = createAsyncThunk("todolist/AddTodo", async (objFormData, { dispatch }) => {
    try {
        await axiosClientRequest.post(`/to-dos`, objFormData)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})


export const addImages = createAsyncThunk("todolist/addImages", async ({ idx2, formData2 }, { dispatch }) => {
    try {
        await axiosClientRequest.post(`/to-dos/${idx2}/images`, formData2)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})


export const EditTodo = createAsyncThunk("todolist/EditTodo", async (obj, { dispatch }) => {
    try {
        await axiosClientRequest.put(`/to-dos/`, obj)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})





