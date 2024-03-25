import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ServicesContexts } from "../../contexts/ServicesContexts";

export default function ServicesDetails(){
    const {serviceId} = useParams()
    const services = useContext(ServicesContexts)
    const service = services.find((s)=>{
        return s.id == serviceId
    })
    const styleService = {display:"flex",alignItems:"center",minHeight:"90vh",marginTop:"20px"}
    return(
        
        <div className="services" id="services" style= {styleService}>
            <div className="container">
                <h2 className="title" style={{marginBottom:"10px"}}>OUR SERVICES</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque illo porro sequi quam. Soluta fugit reiciendis.</p>
                <div style={{display:"flex",alignItems:"center"}}>
                <div className=" learn-service">
                    <div>
                        {service.icon}
                        <h3>{service.title}</h3>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci in illo reprehenderit nostrum dolorem, magni perspiciatis facere dolor. Molestiae minima ipsam laborum deleniti qui tempora corrupti enim officia quia vitae.</p>
                </div>
                <img src="./watch-complete.png" alt="" />
                </div>
            </div>
        </div>
    )
}