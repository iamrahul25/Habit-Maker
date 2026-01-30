import {createContext, useContext, useState, useEffect } from "react";

export const TodoContext = createContext({});

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoContextProvider = ({children}) => {

    // const list_dummy = [
    //     { "logoclass": "fa-solid fa-person-running", "title": "Running", "color": "1" },
    //     { "logoclass": "fa-solid fa-hand-fist", "title": "Boxing", "color": "100" },
    //     { "logoclass": "fa-solid fa-person-biking", "title": "Cycling", "color": "150" },
    //     { "logoclass": "fa-solid fa-code", "title": "CodeChef", "color": "20" },
    //     { "logoclass": "fa-solid fa-keyboard", "title": "Typing", "color": "50" },
    // ];

    // const table_dummy = {
    //     '16/8/2022' : ['Cycling', 'Running', 'Boxing'],
    //     '17/8/2022' : ['Cycling', 'Running', 'CodeChef','Typing'],
	// 	'18/8/2022' : ['Cycling', 'Running', 'CodeChef'],
	// 	'19/8/2022' : ['Cycling', 'CodeChef'],
    // };

	const [displayAddItem, setDisplayAddItem] = useState(false);
    const [displayDeleteItem, setDisplayDeleteItem] = useState(false);

	//Todo's List-----------------------------------------------------
	const initialList = JSON.parse(localStorage.getItem('ToDosList')) || [];
    const [TodosList, setTodosList] = useState(initialList);
	// console.log("TodosList LocalStorage: ", TodosList);

	//Todo's Table-----------------------------------------------------
	const initialTable = JSON.parse(localStorage.getItem('ToDosTable')) || {};
    const [TodosTable, setTodosTable] = useState(initialTable);
	// console.log("TodosTable LocalStorage: ", TodosTable);


	//User's Settings--------1)Show Border 2)ShowTitle 3)Reverse-----------
	const initialSettings = JSON.parse(localStorage.getItem('ToDosSettings')) || {showBorder: true, showTitles: true, reverse: false};
	const [userSettings, setUserSettings] = useState(initialSettings);
	// console.log("UserSettings LocalStorage: ", userSettings);


    const getCurrentDate = () => {
        const D = new Date();
        const date = `${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()}`;
        // console.log("Date: ",date);
        return date;
    }

	//For Saving ToDo'sList Item to LocalStorage
	useEffect(() => {
		localStorage.setItem('ToDosList', JSON.stringify(TodosList));
	}, [TodosList]);

	//Saving ToDo'sTable to LocalStorage 
	useEffect(() => {
		localStorage.setItem('ToDosTable', JSON.stringify(TodosTable));
	}, [TodosTable]);

	//Saving User's Settings to LocalStorage
	useEffect(() => {
		localStorage.setItem('ToDosSettings', JSON.stringify(userSettings));
	} , [userSettings]);

	  

    //Inserting New Date in Todo's Table
    useEffect(()=>{
        if(getCurrentDate() in TodosTable){
        //   console.log("Present");
        }
    
        else{
        //   console.log("Not Present");
          
			setTodosTable((TodosTable)=>{
				return {...TodosTable, [getCurrentDate()]: []}
			});
        }
          
    },[TodosTable]);


	const handleCheck = (e) =>{
		const name = e.target.name;
		// console.log("Name of CheckBox: ",name);
	
		const [date, item] = name.split('-');
		// console.log("Date: ",date," Item: ",item);
	

		let array = TodosTable[date];
		// console.log("Array: ",array);

		//Check if item is already in the array
		if(array.includes(item)){
			array.pop(item);
		}

		else{
			//Add item to array
			array.push(item);
		}

		//Updating Table
		setTodosTable((TodosTable)=>{
			return {...TodosTable, [date]: array};
		});
	
	}


	const clearAll = () => {

		//Confirm Before Deleting All
		if(window.confirm("Are you sure you want to clear all Todo's List & Table ?")){
			setTodosList([]);
			setTodosTable({});

			//For Creating New Date in Todos Table
			window.location.reload();
		}
	}


	//Reverse Table (Date wise)
	const reverseTable = () => {
		const temp = {};

		const keys = Object.keys(TodosTable).reverse();
		keys.forEach((key)=>{
			temp[key] = TodosTable[key];
		});

		setTodosTable(temp);
	};


    const value = {
        displayAddItem,
        setDisplayAddItem,

        displayDeleteItem,
        setDisplayDeleteItem,

        TodosList,
        setTodosList,

        TodosTable,
        setTodosTable,

		getCurrentDate,

		userSettings,
		setUserSettings,

		reverseTable,

		clearAll,

		handleCheck,
    };

    return <TodoContext.Provider value={value}> {children} </TodoContext.Provider>;
};