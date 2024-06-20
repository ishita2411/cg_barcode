'use client'
import { useEffect, useState } from "react";

// import { useRouter } from 'next/navigation'

export default function addUsers(){

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    function addUserOnClick(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        
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
                <select name="cars" id="cars">
                    <option value="supervisor">supervisor</option>
                    <option value="staff">staff</option>
                </select>
                <button type='submit'>Add User</button>
            </form>
        </div>
    )
    
    
}