import { useState,useContext } from "react"
import { RegistreContexts } from "../../contexts/RegistreContexts"
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import CreateAccount from "./CreateAccount"
import DateBirth from "./DateBirth"
import axios from "axios"

export default function Registre(){
    const {registre,setRegistre} = useContext(RegistreContexts)
    const [isNext,setIsNext]= useState(false)
    function handleNext(){
        setIsNext(true)
    }
    function handleSubmitRegistre(e){
        e.preventDefault();
        const dateBirth = new Date(`${registre.dayBirth}/${registre.monthBirth}/${registre.yearBirth}`)
        const fullName = registre.firstName  + registre.lastName;
        let body = {
            "info":{
                phone : registre.phoneNumber,
                email : registre.email,
                fullName: fullName,
                password: registre.password,
                birthDate: dateBirth,
            },
            "role":{
                type: registre.type
            }
        }
        console.log(body)
        axios.post('http://localhost:3139/api/user/registre',{
            "info":{
                phone : registre.phoneNumber,
                email : registre.email,
                fullName: fullName,
                password: registre.password,
                birthDate: dateBirth,
            },
            "role":{
                type: registre.type
            }
        }).then((res)=>{
            let token = res.data.token
            window.localStorage.setItem('token',token)
            
        }).catch((e)=>{console.log(e)})
    }
    return(
        <div className="login">
        <div>
        <h1>{!isNext ? "Create a new account" : "Date of birth"}</h1>
         <form onSubmit={(e)=> handleSubmitRegistre(e)}>
             {!isNext ?  <CreateAccount isNext = {isNext} handleNext={handleNext}/> : <DateBirth/>}
         </form>
         <p>Already have an account? <Link to='/login'><button>Sign in</button></Link></p>
         <div className="or"></div>
         <button className="sign-google-btn">Sign in with Google <FcGoogle/></button>
        </div>
     </div>   
    )
}