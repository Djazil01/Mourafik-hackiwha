import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom"
import axios from "axios"

export default function Login(){
    const [login,setLogin] = useState({email:"",password:""})

    function handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:3139/api/user/login",
            login
        ).then(res => {
            console.log(res.data)
            localStorage.setItem('token',res.data.token)
            window.location.href = '/'
        }).catch((e)=>{
            if(e.response.status == 401){
                alert("Password or Username Is Incorrect Please try again!!")
            }
            console.log(e)
        })
    }
    return(
        <div className="login">
           <div>
           <h1>Welcome To MOURAFIK</h1>
            <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <label>Email </label> <br></br><input type="text" value={login.email} placeholder="Your Email" onChange={(e)=>setLogin({...login,email:e.target.value})}/>
                </div>
                <div>
                    <label>Password </label><br></br> <input type="password" value={login.password} placeholder="Your Password" onChange={(e)=>setLogin({...login,password:e.target.value})}/>
                </div>
                <button type="submit" className="sign-btn">Sign in</button>
            </form>
            <p>Need an account? <Link to='/registre'><button>Create one</button></Link></p>
            <div className="or"></div>
            <button className="sign-google-btn">Sign in with Google <FcGoogle /></button>
           </div>
        </div>
    )
}