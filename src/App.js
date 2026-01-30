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
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff)'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: '#1f2937'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <p style={{ fontSize: '16px', color: '#6b7280' }}>Loading...</p>
                </div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
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
            <div style={{position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{fontSize: '14px', color: '#666'}}>{userEmailID}</span>
                <button 
                    onClick={handleLogout} 
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}
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