import { Link } from "react-router-dom";
import "./PayementFailed.css"

function PayementFailed() {
    return (
        <section className="payement-failed text-center py-5">
            <i class="fa-solid fa-exclamation"></i>
            <h2 className="fs-2 my-4">Your Payement was failed</h2>
            <Link to={"/home"}>Back To Home</Link>
        </section>
    );
}

export default PayementFailed