'use client'

import { auth, isLoggedIn } from '../page'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Admin(){
    useEffect(() => {}, []);
    const [signUpEmail, setSignUpEmail] = useState<string | undefined>(undefined);
    const [signUpPassword, setSignUpPassword] = useState<string | undefined>(undefined);

    const [loginEmail, setLoginEmail] = useState<string | undefined>(undefined);
    const [loginPassword, setLoginPassword] = useState<string | undefined>(undefined);
    const router = useRouter()

    function signup(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('in sign up')
        console.log(isLoggedIn())
        if (signUpEmail === undefined || signUpPassword === undefined) {
            return;
        }
        createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword).then((userCred) => {
            console.log('created user')
            console.log(isLoggedIn())
            router.push('/admin/addUsers')
        }).catch((error) => {
            console.log("Error signin in: ", error.code, error.message);
        });
        
    }

    function login(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('i login')
        console.log(isLoggedIn())
        if (loginEmail === undefined || loginPassword === undefined) {
            return;
        }
        console.log(auth)
        signInWithEmailAndPassword(auth, loginEmail, loginPassword).then((userCred) => {
            console.log('User Signed In')
            console.log(isLoggedIn())
            router.push('/admin/addUsers')
            
        }).catch((error) => {
            console.log("Error signin in: ", error.code, error.message);
        });
        
    }

    function logout(){
        console.log('in log out ')
        console.log(isLoggedIn())
        signOut(auth).then(() => {
            console.log('user signed out')
            console.log(isLoggedIn())
        }).catch((error) => {
            console.log('error in logging out')
        })

    }

    return (
        <div>
            admin  <br></br>
            <form onSubmit={signup}>
                <label>Email : </label>
                <input type = 'text' onChange={(event) => setSignUpEmail(event.target.value)}></input>
                <label>Password: </label>
                <input type = 'password' onChange={(event) => setSignUpPassword(event.target.value)}></input>
                <button type='submit'>Sign Up</button>
            </form><br></br><br></br>

            <form onSubmit={login}>
                <label>Email : </label>
                <input type = 'text' onChange={(event) => setLoginEmail(event.target.value)}></input>
                <label>Password: </label>
                <input type = 'password' onChange={(event) => setLoginPassword(event.target.value)}></input>
                <button type='submit'>Login</button>
            </form> <br></br><br></br>
            <button onClick={logout}>Logout</button>
            
        </div>
    )
    
    
}