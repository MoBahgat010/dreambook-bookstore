import { useParams } from "react-router-dom";

function ForgotPassword() {

    const params = useParams();
    console.log(params.tempToken);

    return (
        <section className="pt-5">
            <div className="container">
                <form onSubmit={() => {
                    
                }} action="">
                    <label htmlFor="inputPassword5" class="form-label">New Password</label>
                    <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
                    <button className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default ForgotPassword;