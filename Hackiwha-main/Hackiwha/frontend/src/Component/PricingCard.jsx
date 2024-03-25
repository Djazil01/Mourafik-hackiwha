import { FaCheck } from "react-icons/fa6";

export default function PricingCard({type,price,isPopular}){
    return(
        <div className="pricing-card">
            {isPopular ? <span className="popular-ticket">Most Popular</span>: null}
            <div className="pricing-content">
                <h2>{type}</h2>
                <p>Best for personal use</p>
            </div>
            <p className="price">${price}<span><sub>/month</sub></span></p>
            <div>
                <h2>{price == 0 ? "What you get" : "All free features,plus"}</h2>
                <ul className="pricing-list">
                    <li><FaCheck style={{color:"rgb(0 95 255)",marginRight:"15px"}}/> Task Management</li>
                    <li><FaCheck style={{color:"rgb(0 95 255)",marginRight:"15px"}}/> Project Planing</li>
                    <li><FaCheck style={{color:"rgb(0 95 255)",marginRight:"15px"}}/> Team Collaboration</li>
                    <li><FaCheck style={{color:"rgb(0 95 255)",marginRight:"15px"}}/> Notification and Reminders</li>
                    <li><FaCheck style={{color:"rgb(0 95 255)",marginRight:"15px"}}/> What you get</li>
                </ul>
            </div>
            <button className="start-btn">Get Started</button>
        </div>
    )
}