import { useEffect, useState } from "react";
import { signup } from "../api/auth";


const Signup = () =>{


    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (payload) =>{
        setForm({
            ...form,
            [payload.target.name]:payload.target.value
        });
        console.log(...form)
    }

    const handleSubmit = async () => {
        try{
            const res = await signup(form)
            alert("Signup Successful")
            console.log(res.data)
        }
        catch(err){
            console.log(err)
            alert("Signup Failed")
        }
    };

    return (
        <>
        
        <h2>Sign Up page</h2>

        <input type="text" name="name" placeholder="Name" onChange={handleChange}></input>
        <br></br>
        <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
        <br></br>
        <input type = "password" name="password" placeholder="Password" onChange={handleChange}></input>
        <br></br>

        <button onClick={handleSubmit}>Signup</button>
        
        </>
    )
}

export default Signup