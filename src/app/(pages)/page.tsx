"use client"

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../types/redux'
import { addImages, AddTodo, CheckTodo, DelImageTodo, DelTodo, EditTodo, getData } from '@/entities/todolist/api/api'
import { ITodo } from '@/entities/todolist/reducer/todolistSlice'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  const data = useAppSelector((store: any) => store.todolist.data)

  const [modal2, setModal2] = useState(false);
  const [addImage, setAddImage] = useState("")
  const [idx2, setIdx2] = useState(null)
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [idx, setIdx] = useState(null);
  const [modal, setModal] = useState(false);


  function Edit() {
    let EDIT = {
      name: editName,
      description: editDesc,
      id: idx,
    };
    dispatch(EditTodo(EDIT));
    setModal(false);
  }

  const dispatch = useAppDispatch()


  function AddIMAGE() {
    const formData2 = new FormData()
    for (let i = 0; i < addImage.length; i++) {
      formData2.append("Images", addImage[i])
    }
    formData2.append("todoId", idx2)
    dispatch(addImages({ idx2, formData2 }))
    setModal2(false)
  }




  function AddUser(e: any) {
    e.preventDefault()
    const formData = new FormData();

    formData.append("Name", e.target.name.value);
    formData.append("Description", e.target.desc.value);
    for (let i = 0; i < e.target.file.files.length; i++) {
      formData.append("Images", e.target.file.files[i]);
    }
    dispatch(AddTodo(formData))
  }

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  return (
    <div className="flex flex-col items-center gap-10 p-6">

      <form onSubmit={AddUser} className="flex flex-col items-center gap-4 w-80">
        <input
          placeholder="Name"
          type="text"
          name="name"
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
        />
        <input
          placeholder="Desc"
          type="text"
          name="desc"
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
        />
        <input
          multiple
          type="file"
          name="file"
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 w-full p-3 text-white text-xl rounded-lg hover:scale-105 transition-transform"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap justify-center gap-6">
        {data.map((el: ITodo) => (
          <div
            key={el.id}
            className="bg-white p-6 rounded-2xl shadow-lg w-96 flex flex-col items-center transition hover:scale-105"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{el.name}</h1>
            <p className="text-gray-600 mb-2">{el.description}</p>
            <span className={`mb-4 font-semibold ${el.isCompleted ? 'text-green-500' : 'text-red-500'}`}>
              {el.isCompleted ? "Active" : "Inactive"}
            </span>

            {el.images.map((image: any) => (
              <div key={image.id} className="mb-4">
                <Image
                  src={`https://to-dos-api.softclub.tj/images/${image.imageName}`}
                  alt="Image"
                  width={300}
                  height={300}
                  className="rounded-lg shadow"
                />
                <button
                  onClick={() => dispatch(DelImageTodo(image.id))}
                  className="mt-2 text-red-500 hover:underline text-sm"
                >
                  Delete Image
                </button>
              </div>
            ))}

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                className="text-red-500 text-2xl hover:scale-125 transition-transform"
                onClick={() => dispatch(DelTodo(el.id))}
              >
                🗑️
              </button>

              <button
                onClick={() => {
                  setEditDesc(el.description);
                  setEditName(el.name);
                  setIdx(el.id);
                  setModal(true);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(CheckTodo(el.id))}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Check
              </button>

              <button
                onClick={() => {
                  setModal2(true);
                  setIdx2(el.id);
                }}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Add Images
              </button>

              <Link href={`/${el.id}`}>
                <button className="text-blue-500 underline text-sm">Info</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-80 flex flex-col gap-4">
            <h2 className="text-center text-2xl font-bold text-gray-800">Edit User</h2>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={Edit}
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {modal2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-80 flex flex-col gap-4">
            <h2 className="text-center text-2xl font-bold text-gray-800">Add Images</h2>
            <input
              multiple
              type="file"
              onChange={(e) => setAddImage(e.target.files)}
              className="border-2 border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={AddIMAGE}
              className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </div>
      )}

    </div>



  )
}

export default Home
