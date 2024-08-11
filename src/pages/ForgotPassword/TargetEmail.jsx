import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../../RTK/Slices/AuthorizationSlice";

function TargetEmail() {

    const dispatch = useDispatch();
    const emial = useRef();
    const navigate = useNavigate();

    return (
        <section className="pt-5">
            <div className="container">
                <form onSubmit={() => {
                    dispatch(ForgotPassword(emial.current.value));
                    navigate('/login/forgot-password');
                }} action="">
                    <div class="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Enter Your Emial</label>
                      <input ref={emial} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default TargetEmail