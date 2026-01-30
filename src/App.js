import React from 'react';
import { useTodoContext } from './context';
import './App.css';

import ToDoBox from './ToDoBox';
import AddItem from './AddItem';
import DeleteItem from './DeleteItem';
import ToDoTable from './ToDoTable';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';

const App = () => {

    const { displayAddItem, displayDeleteItem, clearAll, showAuthPages, isAuthenticated, authLoading, handleLogout, userEmailID} = useTodoContext();

    // Show loading indicator while checking auth state
    if (authLoading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            </div>
        );
    }

    // Show login/signup pages if not authenticated
    if (!isAuthenticated) {
        return (
            <>
                {showAuthPages.loginPage ? <LoginPage/> : null}
                {showAuthPages.signupPage ? <SignupPage/> : null}
            </>
        );
    }

    // Show main app if authenticated
    return (
        <div className='App'>
            <div className="logout-container">
                {/* <span style={{fontSize: '14px', color: '#666'}}>{userEmailID}</span> */}
                <button 
                    onClick={handleLogout} 
                    className="logout-button"
                >
                    Logout
                </button>
            </div>

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