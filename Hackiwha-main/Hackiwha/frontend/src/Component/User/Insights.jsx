import { VscSettings } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { LuHeartPulse } from "react-icons/lu";
import { UserContexts } from "../../contexts/UserContexts";
import { useContext } from "react";


export default function Insights(){
    const user = useContext(UserContexts)
    return(
        <div className="insights container">
            <h1>Welcome {user.fullName}!</h1>
            <div className="ins-content">
                <div className="personal-track">
                    <h1>Personal Health Tracking.</h1>
                    <div>
                        <div className="bettry"></div>
                    <div className="custom-device">
                        <div>
                            <h2>Customize your device</h2>
                            <button className="setting-btn"><VscSettings/></button>
                        </div>
                        <img src="./watch-complete.png" alt="" style={{height:"100px"}}/>
                    </div>
                    </div>
                </div>
                <div className="health-track" >
                    <div className="health-records">
                        <div>
                            <h3>Health records</h3>
                            <div className="list-month">
                                <p>April <IoIosArrowDown /></p>
                                {/*Array month */}
                            </div>
                        </div>
                        <img src="./graph-records.png" alt="" />
                    </div>
                    
                        <div className="heart-beat">
                            <div style={{display:"flex",alignItems:"center",marginBottom:"20px"}}>
                                <div style={{display:"flex",padding:"10px",backgroundColor:"white",borderRadius:"10px",marginRight:"10px",color:"black"}}><LuHeartPulse/></div>
                                <h3>HeartBeat</h3>
                            </div>
                            <p><span style={{fontWeight:"bolder",fontSize:"2em"}}>98</span> bpm</p>
                        </div>
                    
                </div>
            </div>
        </div>
    )
}