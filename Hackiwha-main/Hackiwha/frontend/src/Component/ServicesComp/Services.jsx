import CardServices from "./CardServices";
import { useContext } from "react";
import { UserContexts } from "../../contexts/UserContexts";
import { ServicesContexts } from "../../contexts/ServicesContexts";


export default function Services(){
    const user = useContext(UserContexts)
    const styleService = {display:"flex",justifyContent:"center",alignItems:"center",minHeight:"90vh"}
    const cardList = useContext(ServicesContexts)

    return (
        
        <div className="services" id="services" style={user.isLogged ? styleService : null }>
            <div className="container">
                <h2 className="title">OUR SERVICES</h2>
                <div className="services-boxes">
                    {cardList.map((card)=>{
                        return <div className="service-card" key={card.id}><CardServices card={card}/></div>
                    })}
                </div>
            </div>
        </div>
    )
    }