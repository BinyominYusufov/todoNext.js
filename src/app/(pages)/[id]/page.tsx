"use client"

import { useAppDispatch, useAppSelector } from "@/app/types/redux"
import { InfoTodo } from "@/entities/get-by-id/api/info-todo"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const GetById = () => {
    const { id }: any = useParams()
    const dispatch = useAppDispatch()
    const data = useAppSelector((store) => store.info.data)

    useEffect(() => {
        dispatch(InfoTodo(id))
    }, [id, dispatch])

    return (
        <div className="p-6 min-h-screen flex flex-col items-center bg-gray-50">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
                {data?.data?.images?.map((el: any) => (
                    <div key={el.id} className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform bg-white">
                        <Image
                            src={`https://to-dos-api.softclub.tj/images/${el.imageName}`}
                            alt={data?.data?.name || "Todo Image"}
                            width={500}
                            height={300}
                            className="object-cover w-full h-60"
                        />
                    </div>
                ))}
            </div>

            <div className="text-center w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{data?.data?.name}</h1>
                <p className="text-gray-600 text-lg">{data?.data?.description}</p>
            </div>

        </div>
    )
}

export default GetById
