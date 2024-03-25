
export default function FooterCard({title,children}){
    return(
        <div className="footer-card">
                    <h4>{title}</h4>
                    {children}
        </div>
    )
}