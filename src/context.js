import {createContext, useContext, useState, useEffect, useCallback } from "react";

//Firebase Authentication
import { auth, signOut } from './firebase';

//Firebase Firestore
import {db} from './firebase'
import {collection, getDocs, addDoc, updateDoc, query, where, deleteDoc, doc} from 'firebase/firestore';

export const TodoContext = createContext({});

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoContextProvider = ({children}) => {

    //Firebase Firestore
    const habitsCollectionRef = collection(db, 'habits');

    //Authentication State
    const [showAuthPages, setShowAuthPages] = useState({
        loginPage: 1,
        signupPage: 0,
    });
    const [userEmailID, setUserEmailID] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true); // Track if auth state is being checked

	const [displayAddItem, setDisplayAddItem] = useState(false);
    const [displayDeleteItem, setDisplayDeleteItem] = useState(false);

	//Todo's List-----------------------------------------------------
	const initialList = [];
    const [TodosList, setTodosList] = useState(initialList);

	//Todo's Table-----------------------------------------------------
	const initialTable = {};
    const [TodosTable, setTodosTable] = useState(initialTable);

	//User's Settings--------1)Show Border 2)ShowTitle 3)Reverse-----------
	const initialSettings = {showBorder: true, showTitles: true, reverse: false};
	const [userSettings, setUserSettings] = useState(initialSettings);


    const getCurrentDate = () => {
        const D = new Date();
        const date = `${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()}`;
        // console.log("Date: ",date);
        return date;
    }

	//CRUD - Read, Write, Update Delete Operations in Database---------------------	
	const handleSaveOrUpdateData = useCallback(async () => {
		if (!userEmailID) return;
		
		try{
			const userQuery = query(habitsCollectionRef, where("email", "==", userEmailID));
			const queryData = await getDocs(userQuery);

			const userData = {
				TodosList: TodosList,
				TodosTable: TodosTable,
				userSettings: userSettings,
				email: userEmailID
			};

			//If Data Exists, Update Data
			if(!queryData.empty){
				const userDoc = queryData.docs[0];
				await updateDoc(userDoc.ref, userData);
				console.log("Data Updated Successfully!");
			}
			
			//If Data Does Not Exist, Save Data
			else{
				await addDoc(habitsCollectionRef, userData);
				console.log("Data Saved Successfully!");
			}

		}
		catch(error){
			console.error("Error Saving/Updating Data!", error.message);
		}
	}, [userEmailID, TodosList, TodosTable, userSettings])

	const handleFetchData = async (emailID) => {
		try{
			const userQuery = query(habitsCollectionRef, where("email", "==", emailID));
			const queryData = await getDocs(userQuery);
			if(!queryData.empty){
				const userDoc = queryData.docs[0];
				const userData = userDoc.data();
				console.log("User Data Fetched Successfully");

				//Update state with Data from Database
				if (userData.TodosList) setTodosList(userData.TodosList);
				if (userData.TodosTable) setTodosTable(userData.TodosTable);
				if (userData.userSettings) setUserSettings(userData.userSettings);
			}
			else{
				console.log("No User Data Found!");
			}

		}
		catch(error){
			console.error("Error Fetching Data!", error.message);
		}
	}

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setUserEmailID("");
			setIsAuthenticated(false);
			setShowAuthPages({ loginPage: 1, signupPage: 0 });
			setTodosList([]);
			setTodosTable({});
			setUserSettings({showBorder: true, showTitles: true, reverse: false});
			console.log("Logged out successfully!");
		} catch (error) {
			console.error("Error logging out:", error.message);
		}
	}

	//Check if User is Authenticated
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async(user) => {
			if (user) {
				console.log("User Login Data Present!");
				setUserEmailID(user.email);
				setIsAuthenticated(true);
				setShowAuthPages({ loginPage: 0, signupPage: 0 });

				//Fetch user data from Firestore
				await handleFetchData(user.email);
			} else {
				setShowAuthPages({ loginPage: 1, signupPage: 0 });
				setIsAuthenticated(false);
				console.log("No User Login Data Present!");
			}
			// Auth state check is complete
			setAuthLoading(false);
		});

		return () => unsubscribe();
	}, []);

	//Save data to Firestore whenever TodosList, TodosTable, or userSettings changes
	useEffect(() => {
		if (isAuthenticated && userEmailID) {
			handleSaveOrUpdateData();
		}
	}, [isAuthenticated, userEmailID, handleSaveOrUpdateData]);

	  

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

		//Authentication
		showAuthPages,
		setShowAuthPages,
		userEmailID,
		setUserEmailID,
		isAuthenticated,
		authLoading,
		handleLogout,
    };

    return <TodoContext.Provider value={value}> {children} </TodoContext.Provider>;
};