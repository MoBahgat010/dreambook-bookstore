import { Link } from "react-router-dom";
import "./PayementSuccess.css"

function PayementSuccess() {
    return (
        <section className="payement-success text-center py-5">
            <i class="fa-solid fa-check"></i>
            <h2 className="fs-2 my-4">Your Payement was successful</h2>
            <Link to={"/home"}>Back To Home</Link>
        </section>
    );
}

export default PayementSuccess