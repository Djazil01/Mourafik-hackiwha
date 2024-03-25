import { useState } from "react"

export default function About(){
    const [isOpen,setIsOpen] = useState(true)
    const [isOpenSecond,setIsOpenSecond] = useState(false)
    return(
        <div className="about" id="about">
            <div className="container">
                <h2 className="title">ABOUT MOURAFIK.</h2>
                <p>Monitor and gain insights into your health data to improve your overall well-being.</p>
                <div className="about-content">
                    <div className="accordion">
                        <span onClick={()=>setIsOpen(!isOpen)}></span>
                        <div></div>
                        <ul style={{height:isOpen ? "100px": "0px",overflow:"hidden",transition:"0.7s"}}>
                            <li>
                                <h3>WHAT IS MOURAFIK ?</h3>
                                <p style={{lineHeight:"1.5"}}>Monitor and gain insights into your health data to improve your overall well-being </p>
                            </li>
                            <li>
                                <h3>OUR GOALS </h3>
                                <p style={{lineHeight:"1.5"}}>Monitor and gain insights into your health data to improve your overall well-being </p>
                            </li>
                        </ul>
                    </div>
                    <div className="accordion">
                    <span onClick={()=>setIsOpenSecond(!isOpenSecond)}></span>
                        <div></div>
                        <h2 style={{padding:"10px 0"}}>MOURAFIK. Doctor List</h2>

                        <div className="list-doctor">

                        </div>
                        
                    </div>
                </div>
            </div> 
        </div>
    )
}