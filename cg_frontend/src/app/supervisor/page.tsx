'use client'
import { useEffect, useState } from "react";
import { auth_supervisor, isSupervisorLoggedIn, db, functions, isLoggedIn,  auth_s } from "../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function supervisor(){

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);

    function signInSupervisor(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(isLoggedIn())
        console.log(isSupervisorLoggedIn())
        if (email === undefined || password === undefined) {
            return;
        }
        // console.log(auth)
        signInWithEmailAndPassword(auth_supervisor, email, password).then((userCred) => {
            console.log('User Signed In')
            console.log(isLoggedIn())
            console.log(isSupervisorLoggedIn())
            
            
            
        }).catch((error) => {
            console.log("Error signin in: ", error.code, error.message);
        });
        


    }


    
    return (
        <div>
            Login
            <form onSubmit={signInSupervisor}>
                <label>Email : </label>
                <input type = 'text' onChange={(event) => setEmail(event.target.value)}></input>
                <label>Password: </label>
                <input type = 'password' onChange={(event) => setPassword(event.target.value)}></input>
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
    
    
}