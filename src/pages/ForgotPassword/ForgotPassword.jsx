import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ResetPasswrod } from "../../RTK/Slices/AuthorizationSlice";
import { useRef } from "react";

function ForgotPassword() {

    const dispatch = useDispatch();
    const NewPassword = useRef();
    const params = useParams();

    return (
        <section className="pt-5">
            <div className="container">
                <form onSubmit={(e) => {
                    dispatch(ResetPasswrod({ new_password: NewPassword.current.value, temp_token: params.tempToken}));
                    e.preventDefault();
                    e.target.reset();
                }} action="">
                    <label htmlFor="inputPassword5" className="form-label">New Password</label>
                    <input ref={NewPassword} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
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