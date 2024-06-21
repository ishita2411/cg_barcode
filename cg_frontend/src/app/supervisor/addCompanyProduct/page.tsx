'use client'


import { useEffect, useState } from "react";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn} from "../../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
import { signInWithEmailAndPassword } from 'firebase/auth';



export default function supervisor(){

    const router = useRouter()

    const [newVal, setNewVal] = useState<string | undefined>(undefined);
    const [option, setOption] = useState<string | undefined>(undefined);

    // useEffect(() => {
        // if (!isLoggedIn()){
        //     router.push('/error')
            
        // }

        // const getRoleFunction = httpsCallable(functions, "getRole");
        //             getRoleFunction({
        //                 'uid':auth.currentUser!.uid!
        //             }).then((data) => {
        //                 const x = JSON.stringify(data)
        //                 const d = JSON.parse(x)
        //                 if (d.data.role === 'supervisor'){
        //                     const role ='supervisor'
        //                     router.push('/supervisor/addCompanyProduct')
        //                 }
        //                 else{
        //                     router.push('/error')
        //                 }
        //             }).catch((error) => {
        //                 router.push('/error')
        //             })
    // });


    function addCompanyOrProduct(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const addCompProdFunction = httpsCallable(functions, "addCompProd");
                    addCompProdFunction({
                        'option' : option,
                        'value' : newVal
                    }).then((data) => {
                        console.log('added')
                    }).catch((error) => {
                        console.log("Error adding new product/ company ", error.code, error.message);
                        alert("Error adding new product/ company. Please try again.");
                    })
    }



    
    return (
        <div>
            <form onSubmit={addCompanyOrProduct}>

                <input type="radio" id="company" name="addNew" value="company" onChange={(event) => setOption(event.target.value)}></input>
                <label>Company</label><br></br>
                <input type="radio" id="product" name="addNew" value="product" onChange={(event) => setOption(event.target.value)}></input>
                <label>Product</label><br></br>
                <label>Enter Value</label>
                <input type="text" onChange={(event) => setNewVal(event.target.value)}></input>
                <button type='submit'>Add New Value</button>
            </form>
        </div>
    )
    
    
}