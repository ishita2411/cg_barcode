'use client'


import { useEffect, useState } from "react";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn,  auth_s } from "../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
import { signInWithEmailAndPassword } from 'firebase/auth';



export default function supervisor(){


    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const router = useRouter()


    function signInSupervisor(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (email === undefined || password === undefined) {
            return;
        }
        // console.log(auth)
        signInWithEmailAndPassword(auth, email, password).then((userCred) => {
            console.log('User Signed In')
            console.log(isLoggedIn())
            console.log(isSupervisorLoggedIn())
            const getRoleFunction = httpsCallable(functions, "getRole");
                    getRoleFunction({
                        'uid':userCred.user.uid
                    }).then((data) => {
                        const x = JSON.stringify(data)
                        const d = JSON.parse(x)
                        if (d.data.role === 'supervisor'){
                            const role ='supervisor'
                            router.push('/supervisor/addCompanyProduct')
                        }
                        else{
                            router.push('/error')
                        }
                    }).catch((error) => {
                        console.log('oops')
                        console.log("Error adding user ", error.code, error.message);
                        alert("Error adding user. Please try again.");
                    })
            
            
        }).catch((error) => {
            console.log("Error signin in: ", error.code, error.message);
        });
        


    }


    
    return (
        <div>
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