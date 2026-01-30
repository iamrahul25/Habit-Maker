import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTodoContext } from './context';

const ToDoBox = () => {

    const {setDisplayAddItem, setDisplayDeleteItem, TodosList} = useTodoContext();

    // useEffect(()=>{

    // },[TodosList]);

    return (

        <div className="todo">

            <div className="heading_div">
                <h1>To-Do Daily</h1>
            </div>

            <div className="todo_container">

                {TodosList.map((item, index) => {
                    return (
                        <div className="todo_item" key={index}>
                            <span className="icons"><i className={item.logoclass} style={{color: `hsl(${item.color}, 75%, 50%)`, backgroundColor: `hsl(${item.color}, 75%, 93%)`}}> </i></span>
                            <p>{item.title}</p>
                        </div>
                    )
                })}

                {/* <div className="todo_item">
                    <span className="icons"><i className="fa-solid fa-person-running"> </i></span>
                    <p>Running</p>
                </div> */}

                {/* <div className="todo_item">
                    <span className="icons"> <i className="fa-solid fa-code">  </i></span>
                    <p>CodeChef</p>
                </div>

                <div className="todo_item">
                    <span className="icons"> <i className="fa-solid fa-file-code">  </i></span>
                    <p>Data Structure</p>
                </div>

                <div className="todo_item">
                    <span className="icons"> <i className="fa-solid fa-file-code">  </i></span>
                    <p>Data Structure</p>
                </div>

                <div className="todo_item">
                    <span className="icons"> <i className="fa-solid fa-file-code">  </i></span>
                    <p>Data Structure</p>
                </div> */}

            </div>


            <div className="button_div">
                <button className="button1" onClick={()=>{setDisplayAddItem(true); setDisplayDeleteItem(false)}}>Add Item</button>
                <button className="button2" onClick={()=>{setDisplayDeleteItem(true); setDisplayAddItem(false)}}>Delete Item</button>
            </div>

        </div>

    )
}

export default ToDoBox;