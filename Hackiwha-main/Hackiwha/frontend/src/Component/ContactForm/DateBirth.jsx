import { useContext } from "react"
import { RegistreContexts } from "../../contexts/RegistreContexts"

export default function DateBirth(){
    const {registre,setRegistre} = useContext(RegistreContexts)
    return(
        <>
        <div style={{display:"flex",alignItems:"center",gap:'20px',margin:"20px 0"}}>
        <div className="date-input" style={{display:"flex",alignItems:"center",gap:"20px"}}>
            <div className="days">
                <p>DAY</p>
                <input type="text" placeholder="DD" value={registre.dayBirth} onChange={(e)=>{setRegistre({...registre,dayBirth:e.target.value})}}/>
                <span></span>
            </div>
            <div className="month">
                <p>MONTH</p>
                <input type="text" placeholder="MM" value={registre.monthBirth} onChange={(e)=>{setRegistre({...registre,monthBirth:e.target.value})}}/>
                <span></span>
            </div>
            <div className="year">
                <p>YEAR</p>
                <input type="text" placeholder="YYYY" value={registre.yearBirth} onChange={(e)=>{setRegistre({...registre,yearBirth:e.target.value})}}/>
                <span></span>
            </div>
        </div>
        </div>
        <button type="submit" className="sign-btn">Sign Up</button>
        </>
    )
}