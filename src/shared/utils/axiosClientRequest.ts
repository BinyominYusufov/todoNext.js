"use client";

import axios from "axios";

export  const axiosClientRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
