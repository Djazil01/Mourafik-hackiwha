import FooterCard from "./FooterCard";

export default function Footer(){
    return(
        <footer>
            <div className="container">
            <div className="footer-head">
                <h2>MOURAFIK.</h2>
                <div className="icons">

                </div>
            </div>
            <div className="footer-box">
                <FooterCard title="pricing" >
                     <ul>
                        <li>Surgery</li>
                        <li>Vet Treatment</li>
                    </ul>
                </FooterCard>
                <FooterCard title="About">
                    <ul>
                        <li>Chat with us</li>
                        <li>Doctors</li>
                        <li>Contact us</li>
                    </ul>
                </FooterCard>
                <FooterCard title="pricing" >
                     <ul>
                        <li>Surgery</li>
                        <li>Vet Treatment</li>
                    </ul>
                </FooterCard>
                <FooterCard title="About">
                    <ul>
                        <li>Chat with us</li>
                        <li>Doctors</li>
                        <li>Contact us</li>
                    </ul>
                </FooterCard>
            </div>
            </div>
        </footer>
    )
}