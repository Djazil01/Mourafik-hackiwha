import { Link } from "react-router-dom"
import Navigator from "./Navigator"
import { useContext } from "react"
import { UserContexts } from "../contexts/UserContexts"

//Check user if islogged or not by their token on localStorage

export default function Header(){
    const user = useContext(UserContexts)
    function handleClickLogOut(){
        if(!window.localStorage.getItem('token')) return
        window.localStorage.setItem('token',"")
        window.location.href = '/'
    }
    return(
        <header>
            <nav className="container">
                <Link to="/" style={{textDecoration:"none", color:"#2F2F2F"}}><h2 className="logo">MOURAFIK.</h2></Link>
                <Navigator />
                <div>
                    {window.localStorage.getItem('token')  ? null : <Link to={'/login'}><button className="btn-login ">log in</button></Link>}
                    <Link to={!window.localStorage.getItem('token') ? '/registre' : '/'}><button className="btn-join btn-primary" onClick={handleClickLogOut}>{window.localStorage.getItem('token')  ? "Log out" : "Join Us"}</button></Link>
                </div>
            </nav>
        </header>
    )
}