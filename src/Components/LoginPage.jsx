import React, { useRef } from 'react';
import styles from '../CSS/LoginPage.module.css';

//React Icons (Library)
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

//Firebase
import { auth, signInWithEmailAndPassword } from '../firebase';

//Context API
import { useTodoContext } from '../context';


function LoginPage() {

    //Context API
    const { setShowAuthPages, setUserEmailID } = useTodoContext();

    //useRef
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSignupPage = () => {
        setShowAuthPages({ loginPage: 0, signupPage: 1 });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);

            // Set User Email
            setUserEmailID(user.user.email);

            // Show Main App
            setShowAuthPages({ loginPage: 0, signupPage: 0 });

            window.alert("✅🙋‍♂️ Logged In Successfully!");

        } catch (error) {
            // Handle Errors here.
            if (error.code === 'auth/user-not-found') {
                window.alert("⚠️ User not found!");
            } else if (error.code === 'auth/invalid-credential') {
                window.alert("⚠️ Invalid Email Id or Password!");
            } else if (error.code === 'auth/invalid-email') {
                window.alert("⚠️ Invalid Email ID!");
            } else if (error.code === 'auth/wrong-password') {
                window.alert("⚠️ Wrong Password!");
            } else {
                console.error(error.message);
                window.alert("⚠️ Error! " + error.message);
            }
        }
    }

    return (
        <div className={styles.login_page_div}>
            <div className={styles.card_container}>
                <div className={styles.header}>
                    <div className={styles.icon_circle}>
                        <FaUser />
                    </div>
                    <h2 className={styles.heading}>Welcome Back</h2>
                    <p className={styles.para}>
                        Login to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                <div className={styles.input_div}>
                    <MdEmail />
                    <input required ref={emailRef} className={styles.input_field} placeholder="Email Address" type="email" name="" id="email" />
                </div>

                <div className={styles.input_div}>
                    <RiLockPasswordFill />
                    <input required ref={passwordRef} className={styles.input_field} placeholder="Password" type="password" name="" id="password" />
                </div>

                <button className={styles.button}>Login</button>

                </form>

                <p className={`${styles.para} ${styles.para2}`}>
                    Don't have an account? <span onClick={handleSignupPage} className={styles.anchor_tag}>Sign Up</span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
