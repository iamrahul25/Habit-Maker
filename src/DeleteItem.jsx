import {useRef} from 'react';
import { useTodoContext } from './context';

const DeleteItem = () => {
    const {setDisplayDeleteItem, TodosList, setTodosList} = useTodoContext();

    const itemRef = useRef("");

    const handleDelete = ()=>{
        const todoname = itemRef.current.value.trim();
        console.log("Item: ", todoname);

        //Delete the item from List.
        const newTodosList = TodosList.filter(item => item.title !== todoname);
        setTodosList(newTodosList);

        console.log("New TodosList: ", newTodosList);

        //Reset the form---------------
        itemRef.current.value = "";
        setDisplayDeleteItem(false);
    }

    return (
        <div className="delete_item">

            <div>
                <b><label className='label' htmlFor="title">Title : </label></b>
                <br/><br/>
                <input ref={itemRef} className="input_field" type="text" name="title" placeholder="eg: Running"/>
            </div>

            <div className="button_div">
                <button className="button1" type="button" onClick={handleDelete}>Delete Item</button>
                <button className="button2" type="button" onClick={()=>{setDisplayDeleteItem(false)}} >Cancel</button>
            </div>

        </div>
    )
}

export default DeleteItem