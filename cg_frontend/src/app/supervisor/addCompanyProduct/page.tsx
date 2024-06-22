'use client'


import { useEffect, useState } from "react";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn} from "../../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
// import { signInWithEmailAndPassword } from 'firebase/auth';



export default function supervisor(){

    const router = useRouter()

    const [newVal, setNewVal] = useState<string | undefined>(undefined);
    const [option, setOption] = useState<string | undefined>(undefined);
    // const [hideAddDetails, setHideAddDetails] = useState(false);
    // const [hideAddCompProd, setHideAddCompProd] = useState(false);

    const [action, setAction] = useState('newProdComp')

    const [itemName, setItemName] = useState<string | undefined>(undefined);
    const [productGrp, setProductGrp] = useState<string | undefined>(undefined);
    const [company, setCompany] = useState<string | undefined>(undefined);
    const [supplier, setSupplier] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);


    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
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
        //                 }
        //                 else{
        //                     router.push('/error')
        //                 }
        //             }).catch((error) => {
        //                 router.push('/error')
        //             })

        const getCompaniesFunction = httpsCallable(functions, "getCompanies");
                getCompaniesFunction().then((data) => {
                            setCompanies(data.data.data)
                        }).catch((error) => {
                            router.push('/error')
                        })

        const getProductsFunction  = httpsCallable(functions, "getProducts");
                getProductsFunction().then((data) => {
                            setProducts(data.data.data)
                            // const x = JSON.stringify(data)
                            // const d = JSON.parse(x)
                            // console.log(d.data.data)
                            // setProducts(d.data.data)
                        }).catch((error) => {
                            router.push('/error')
                        })
    }, []);
    // useEffect(()=>{console.log('its a change')});


    function addCompanyOrProduct(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const addCompProdFunction = httpsCallable(functions, "addCompProd");
                    addCompProdFunction({
                        'option' : option,
                        'value' : newVal
                    }).then((data) => {
                        console.log('added')
                        if (option === "company"){
                            
                            let new_data = {'newcompany' : newVal}
                            console.log(new_data)
                            const comp = companies
                            comp.push(new_data)
                            setCompanies(comp)
                        }
                        else{
                            
                            let new_data = {'newproduct' : newVal}
                            console.log(new_data)
                            const prod = products
                            prod.push(new_data)
                            setProducts(prod)
                            
                        }
                    }).catch((error) => {
                        console.log("Error adding new product/ company ", error.code, error.message);
                        alert("Error adding new product/ company. Please try again.");
                    })
    }

    const selectAddDetails = () =>{
        setAction('newItem')
    }

    const selectAddCompanyOrProduct = () => { 
        setAction('newProdComp')
    }

    function additemDetails(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(itemName, company, productGrp, price, supplier)
        const addItemDetailsFunction  = httpsCallable(functions, "addItemDetails");
        addItemDetailsFunction().then((data) => {
            console.log('wtf')
                        }).catch((error) => {
                            router.push('/error')
                        })
    }



    
    return (
        <div>

            <button  onClick={selectAddDetails}>Add Product details</button>
            <button onClick={selectAddCompanyOrProduct}>Add New Company or Group of Product</button>
           {action === 'newItem'?<div></div>:<div>
            <h2> New Company or Product</h2>
                <form onSubmit={addCompanyOrProduct}>
                    

                    <input type="radio" id="company" name="addNew" value="company" onChange={(event) => setOption(event.target.value)}></input>
                    <label>Company</label><br></br>
                    <input type="radio" id="product" name="addNew" value="product" onChange={(event) => setOption(event.target.value)}></input>
                    <label>Product</label><br></br>
                    <label>Enter Value</label>
                    <input type="text" onChange={(event) => setNewVal(event.target.value)}></input>
                    <button type='submit'>Add New Value</button>
                </form>
            </div>}





            {action ==="newProdComp"?<div></div>:<div>
                <h2>Add Product Details</h2>
                <form onSubmit={additemDetails}>
                    <label>Item Name:</label>
                    <input type="text" onChange={(event) => setItemName(event.target.value)}></input><br></br>

                    <label>Product Group</label>
                    <select onChange={(event) => setProductGrp(event.target.value)}> 
                        <option value="select product">select product </option>
                        {products.map((product) => <option value={product['newproduct']} key={product['newproduct']}>{product['newproduct']}</option>)}
                    </select>

                    <label>Company</label>
                    <select onChange={(event) => setCompany(event.target.value)}> 
                        <option value="select company"> select company</option>
                        {companies.map((company) => <option value={company['newcompany']} key={company['newcompany']}>{company['newcompany']}</option>)}
                    </select>

                    <label>Supplier</label>
                    <input type="text" onChange={(event) => setSupplier(event.target.value)}></input><br></br>

                    <label>Price</label>
                    <input type="text" onChange={(event) => setPrice(event.target.value)}></input><br></br>

                    <button type="submit">Submit details</button>


                    
                </form>
            </div>}
        </div>
    )
    
    
}