import React, { useState } from 'react'
import './todo.css'
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const Todo = (props) => {
 const [decor, setdecor] = useState('');
   const textdecor=()=>{
if(decor===''){
    setdecor('checkbox')
}else{
    setdecor('')
}
   }
 

    return (<>
    <div id="todo-holder">
        {console.log(props.index)}
    {/* onClick={textDecor} */}
<input className='int' onClick={textdecor} type="checkbox" />
<h2 id= "todo-textHolder"  className={`${decor}`}>{props.item1}</h2>
<div id='icons'>
<FiEdit onClick={() => props.editTask(props.index)} />
<MdDelete onClick={()=>{
    props.onSelect(props.id)
}} className="fa-solid fa-trash-can" id="icon" /></div>
</div>
</>
)
}

export default Todo