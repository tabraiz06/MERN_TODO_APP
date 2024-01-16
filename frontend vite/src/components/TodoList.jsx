import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import img1 from "./todo.jpg"
import Todo from './Todo'
import './todo.css'
import { HiOutlineSaveAs } from "react-icons/hi";
import Login from './login/Login'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from './context/Context';
const TodoList = () => {
    const Token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { maintask, fetchtodos, setmaintask, username } = useContext(Context)
    const [editedtask, seteditedtask] = useState("");
    console.log(editedtask)
    const [title, settitle] = useState('')

    // const [maintask, setmaintask] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const token = localStorage.getItem('token')

    let getElement = (e) => {
        settitle(e.target.value)

    }

    const editTask = (index) => {
        console.log(maintask)
        seteditedtask(maintask[index].todo)
        console.log(maintask[index])
        setEditIndex(index);
    };

    let add = async () => {
        
        const response = await fetch(`${window.location.origin}/api/addtodo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ todo: title })
        })
        const result = await response.json()
        console.log(result)
        if (response.ok) {
            fetchtodos()
        }

        if (title === "" && !token) {

            toast.warn('🦄 Please login first !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {

            setmaintask((olditmes) => {
                return [...olditmes, title]

            })

            settitle('')

            clear()
            // textdecor()

        }

    }
    // 

    let clear = async (id) => {
        const response = await fetch(`${window.location.origin}/api/deletetodo/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }

        })
        console.log(response)
        if (response.ok) {
            fetchtodos()
        }

        setmaintask((olditmes) => {
            return olditmes.filter((arrEle, indx) => {
                return indx !== id;
            })
        })

    }
    const saveEditedTask = async (id, index) => {
        const response = await fetch(`${window.location.origin}/api/updatetodo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')

            },
            body: JSON.stringify({ todo: editedtask })
        })
        console.log(response)

        const updatedTasks = [...maintask];
        updatedTasks[editIndex] = editedtask;
        if (editedtask === '') {
            deleteTask(id, index)
        }

        setmaintask(updatedTasks);
        toast.success('🦄 data saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        seteditedtask('')
        setEditIndex(-1);
        fetchtodos()

    };
    const Logout = () => {

        localStorage.removeItem('token')

        navigate('/')
        setmaintask([])
    }
    return (
        <>
            <div className="container">
                <div className='btn-holder'>
                    {token ? <button onClick={Logout} >Logout</button> : <>
                        <button><Link to='/login'>Login</Link> </button>
                        <button><Link to='/register'>Sign Up</Link></button>
                    </>
                    }


                </div>
                {token?<h2>Welcome <span style={{ color: 'red' }}>{username}</span></h2>:
                <h2>Welcome to  <span style={{ color: 'red' }}>Todo APP</span></h2>
                }
                
                <div className="todo-app">
                    <div className="mains">
                        <h2>To-Do List </h2>
                        <img src={img1} alt="TodoImage" />
                    </div>
                    <div className="row">
                        <input value={title} onChange={getElement} type="text" id="input-box" placeholder="Add Your Text" />

                    </div>
                    <div className="btn">
                        <button onClick={add} type="submit">Add</button>
                        {/* <button onClick={clearAll} id="clearAll" type="submit">Clear All</button> */}
                    </div>

                    <div id="list-todo">
                        {maintask.map((title, index) => (

                            <div key={index} >

                                {editIndex === index ? (<>
                                    <div id='todo-holder'>
                                        <input
                                            // onKeyUp={keypress}
                                            className="editTask p-3 my-5"
                                            value={editedtask}
                                            onChange={(e) => {

                                                //  editTask
                                                seteditedtask(e.target.value)
                                                    ;

                                            }}
                                            placeholder="Edit task..."
                                        />
                                        <HiOutlineSaveAs onClick={() => saveEditedTask(title._id, index)} />
                                    </div>
                                </>) : (<> <Todo key={index} id={title._id} index={index}
                                    onSelect={clear} item1={title.todo} editTask={editTask} /></>)}
                            </div>

                        ))}
                        {/* <div id="todo-holder">
                            <input onClick={textDecor} type="checkbox" id="checkbox" />
                            <h2 id="todo-textHolder">{title}</h2>
                            <i onclick={clear} className="fa-solid fa-trash-can" id="icon"></i> 
                        </div> */}

                    </div>
                    {/* <div id="contain"></div> */}

                </div>
            </div>
        </>
    )
}
export default TodoList