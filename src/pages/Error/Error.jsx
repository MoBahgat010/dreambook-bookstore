import { Link } from "react-router-dom"
import "./Error.css"

function Error() {

    return (
        <section className="error">
            <h1 className="text-danger">404</h1>
            <h2>Page not found</h2>
            <p>OOPS! The page you are looking for does not exist. It might have been moved or delete</p>
            <Link  to={"/home"}>Back to home</Link>
        </section>
    )
}

export default Error