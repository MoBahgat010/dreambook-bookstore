import { Link } from "react-router-dom";
import "./Login.css"
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { LoginAuthorization, RegisterAuthorization } from "../../RTK/Slices/AuthorizationSlice";
import axios from "axios";

function Login() {

    const dispatch = useDispatch();

    const { t } = useTranslation();
    const Login_Email = useRef();
    const Login_Password = useRef();
    const Register_FullName = useRef();
    const Register_Email = useRef();
    const Register_Password = useRef();
    const Register_Re_Password = useRef();

    function Register(e) {
        dispatch(RegisterAuthorization({ name: Register_FullName.current.value, 
            email: Register_Email.current.value,
            password: Register_Password.current.value,
        }))
        e.preventDefault();
        e.target.reset();
    }

    function Login(e) {
        dispatch(LoginAuthorization({  
            email: Login_Email.current.value,
            password: Login_Password.current.value,
        }))
        e.preventDefault();
        e.target.reset();
    }

    return (
        <section className="login pt-5">
            <div className="container">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">{t("Login")}</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">{t("Register")}</button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <form onSubmit={(e) => {
                        Login(e);
                    }} id="login-form" className="data py-4">
                        <div className="w-100 mb-2">
                            <label htmlFor="exampleFormControlInput5" className="ms-2 form-label">{t("Email")}</label>
                            <input ref={Login_Email} type="email" className="form-control" id="exampleFormControlInput5" placeholder={t("Email")} />
                        </div>
                        <div className="d-flex align-items-end">
                            <div className="pe-2 pb-0 w-50">
                                <label htmlFor="exampleFormControlInput1" className="ms-2 form-label">{t("Code")}</label>
                                <select id="exampleFormControlInput1" defaultValue={"code"} className="form-select" aria-label="Default select example">
                                    <option>{t("Code")}</option>
                                </select>
                            </div>
                            <div className="w-50">
                              <label htmlFor="exampleFormControlInput2" className="ms-2 form-label">{t("Mobile")}</label>
                              <input type="email" className="form-control" id="exampleFormControlInput2" placeholder={t("Mobile")} />
                            </div>
                        </div>
                        <div className="w-100 mt-2">
                            <input ref={Login_Password} className="w-100 py-2 px-2 rounded" type="password" placeholder={t("Password")}/>
                        </div>
                        <div className="mt-4 d-flex">
                            <div className="px-2">
                                <button type="submit" className="btn btn-primary">{t("Login")}</button>
                            </div>
                            <div className="px-2">
                                <button type="button" className="btn"><p className="fw-bold">{t("Forgot Password")}</p></button>
                            </div>
                        </div>
                    </form>
                  </div>
                  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="1">
                    <form onSubmit={(e) => {
                        Register(e);
                    }} id="register" className="data py-4 px-4">
                        <input ref={Register_FullName} className="form-control mb-2" type="text" placeholder={t("Full Name")} aria-label="default input example" />
                        <input ref={Register_Email} className="form-control mb-2" type="text" placeholder={t("Email")} aria-label="default input example" />
                        <div className="d-flex gap-1 mb-2 align-items-end">
                            <div className="pe-2 pb-0 w-50">
                                <label htmlFor="exampleFormControlInput3" className="ms-2 form-label">{t("Code")}</label>
                                <select id="exampleFormControlInput3" defaultValue={"code"} className="form-select" aria-label="Default select example">
                                    <option>{t("Code")}</option>
                                </select>
                            </div>
                            <div className="w-50">
                              <label htmlFor="exampleFormControlInput4" className="ms-2 form-label">{t("Mobile")}</label>
                              <input type="text" className="form-control" id="exampleFormControlInput4" placeholder={t("Mobile")} />
                            </div>
                        </div>
                        <input ref={Register_Password} className="form-control mb-2" type="password" placeholder={t("Password")} aria-label="default input example" />
                        <input ref={Register_Re_Password} className="form-control mb-4" type="password" placeholder={t("Re-Password")} aria-label="default input example" />
                        <button type="submit" className="btn btn-primary">{t("Register")}</button>
                    </form>
                  </div>
                </div>
                {/* <div className="state d-flex">
                    <p className="px-2">
                        <p className="active">Register</p>
                    </p>
                    <p className="px-2">
                        <p>Log In</p>
                    </p>
                </div> */}
                
                
            </div>
        </section>
    );
}

export default Login;