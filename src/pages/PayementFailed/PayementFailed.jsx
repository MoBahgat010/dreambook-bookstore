import { Link, useLocation } from "react-router-dom";
import "./PayementFailed.css"

function PayementFailed() {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const message = query.get("message");

    function RenderErrorMessage() {
        switch(message) {
            case "amountNM":
                return <p className="error-message">Money available is less than the required</p>;
            case "pending":
                return <p className="error-message">Issue With Payment Try Again or Contact Support</p>;
            case "canceled":
                return <p className="error-message">Payment Canceled</p>;
            default:;
        }
    }

    return (
        <section className="payement-failed text-center py-5">
            <i class="fa-solid fa-exclamation"></i>
            <h2 className="fs-2 my-4">Your Payement was failed</h2>
            { RenderErrorMessage() }
            <Link to={"/home"}>Back To Home</Link>
        </section>
    );
}

export default PayementFailed