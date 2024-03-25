import Landing from './Landing'
import Pricing from './Pricing'
import Services from './ServicesComp/Services'
import About from './About'
import Footer from './Footer'

export default function Main(){
    return(
        <>
            <Landing />
            <Services />
            <Pricing/>
            <About />
            <Footer />
        </>
    )
}