import { Link } from "react-router-dom";


export default function CardServices({card}){
    return(
        <>
            <div style={{fontSize: "4em"}}>{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <Link to={`/services/${card.id}`}><button className="learn-btn">LEARN MORE</button></Link>
        </>
    )
}