import { RegistreContexts } from "../../contexts/RegistreContexts"
import { useContext } from "react"

export default function CreateAccount({handleNext}){
    const {registre,setRegistre} = useContext(RegistreContexts)

    return(
        <>
        <div style={{display:"flex",alignItems:"center",gap:'20px'}}>
        <div>
            <label>First Name </label> <br></br><input  type="text" placeholder="your username" value={registre.firstName} onChange={(e)=>setRegistre({...registre,firstName:e.target.value})}/>
        </div>
        <div>
            <label>Last Name </label><br></br> <input type="text"  placeholder="your username" value={registre.lastName} onChange={(e)=>setRegistre({...registre,lastName:e.target.value})}/>
        </div>
        </div>
        <div>
            <label>Phone Number </label><br></br> <input type="text"  placeholder="Your Number" value={registre.phoneNumber} onChange={(e)=>setRegistre({...registre,phoneNumber:e.target.value})}/>
        </div>
        <div>
            <label>Email </label><br></br> <input type="text"  placeholder="Your Email" value={registre.email} onChange={(e)=>setRegistre({...registre,email:e.target.value})}/>
        </div>
        <div>
            <label>Password </label><br></br> <input type="password"  placeholder="Your Password" value={registre.password} onChange={(e)=>setRegistre({...registre,password:e.target.value})}/>
        </div>
        <div style={{display:"flex",alignItems:"center"}}>
           <div style={{display:"flex",alignItems:"center",width:"30%"}}><input  type="radio" id="doctor" checked={registre.type === "Doctor" ? true : false} onChange={(e)=>setRegistre({...registre,type:e.target.checked ? "Doctor" : ""})}/> <label htmlFor="doctor" style={{width:'250px',cursor:"pointer"}}>Im a Doctor </label></div>
           <div style={{display:"flex",alignItems:"center",width:'30%'}}><input type="radio" id="patient" checked={registre.type === "Patient" ? true : false} onChange={(e)=>setRegistre({...registre,type:e.target.checked ? "Patient" : ""})}/> <label htmlFor="patient" style={{width:'250px',cursor:"pointer"}}>Im a Patient </label></div>
           
        </div>
        <button type="button" className="sign-btn" onClick={handleNext}>Next</button>
        </>
    )
}