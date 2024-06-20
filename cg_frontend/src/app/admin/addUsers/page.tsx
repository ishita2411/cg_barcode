'use client'
import { useEffect, useState } from "react";
import { auth, db, functions, isLoggedIn,  auth_s } from "../../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";

// Import the functions you need from the SDKs you need
// import { useRouter } from 'next/navigation'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



export default function addUsers(){
    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn()){
            router.push('/error')
        }
    });

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [value,setValue]=useState('');

    function addUserOnClick(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(email, password, value)
        
        if (email === undefined || password === undefined) {
            return;
        }

        // const addExpenseFunction = httpsCallable(functions, "addUser");
        // addExpenseFunction({
        //     // 'uid':userCred.user.uid,
        //     'role' : value
        // }).then((data) => {
        //     console.log("Successfully added expense.");
        // }).catch((error) => {
        //     console.log('oops')
        //     console.log("Error adding user ", error.code, error.message);
        //     alert("Error adding user. Please try again.");
        // })

        createUserWithEmailAndPassword(auth_s, email, password).then((userCred) => {
            console.log(userCred.user.uid)
            const addExpenseFunction = httpsCallable(functions, "addUser");
                    addExpenseFunction({
                        'uid':userCred.user.uid,
                        'role' : value
                    }).then((data) => {
                        console.log("Successfully added user.");
                    }).catch((error) => {
                        console.log('oops')
                        console.log("Error adding user ", error.code, error.message);
                        alert("Error adding user. Please try again.");
                    })
            signOut(auth_s).then(() => {
                console.log('this is necesssary')
            }).catch((error) => {
                console.log('error in logging out')
            })
        }).catch((error) => {
            console.log("Error signin in: ", error.code, error.message);
        });
        
        
        // const balancesFunction = httpsCallable(functions, "addUser");
    }


  
    return (
        
        <div>
            Add Users
            <form onSubmit={addUserOnClick}>
                <label>Email : </label>
                <input type = 'text' onChange={(event) => setEmail(event.target.value)}></input>
                <label>Password: </label>
                <input type = 'password' onChange={(event) => setPassword(event.target.value)}></input>
                <label >Choose User Role:</label>
                <select name="cars" id="cars" onChange={(event) => setValue(event.target.value)}>
                    <option value="supervisor">supervisor</option>
                    <option value="staff">staff</option>
                </select>
                <button type='submit'>Add User</button>
            </form>
        </div>
    )
    
    
}