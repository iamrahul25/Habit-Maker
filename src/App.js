import React from 'react';
import { useTodoContext } from './context';
import './App.css';

import ToDoBox from './ToDoBox';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import ToDoTable from './ToDoTable';

const App = () => {

    const { displayAddItem, displayDeleteItem, clearAll} = useTodoContext();

    return (
        <div className='App'>

            <ToDoBox/>

            {displayAddItem && <AddItem/>}
            {displayDeleteItem && <DeleteItem/>}
                
            <ToDoTable/>
            

            <div className="clear_all">
                <button onClick={clearAll} className="clear_button"> <i className="fa-solid fa-trash-can"></i> Clear All</button>
            </div>

        </div>
    )
}

export default App