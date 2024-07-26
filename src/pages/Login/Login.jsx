import { Link } from "react-router-dom";
import "./Login.css"

function Login() {
    return (
        <section className="login pt-5">
            <div className="container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Register</button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                    <form id="login-form" className="data py-4">
                        <div className="d-flex align-items-end">
                            <div className="pe-2 pb-0 w-50">
                                <label for="exampleFormControlInput1" className="ms-2 form-label">Code</label>
                                <select id="exampleFormControlInput1" className="form-select" aria-label="Default select example">
                                    <option selected>Code</option>
                                </select>
                            </div>
                            <div className="w-50">
                              <label for="exampleFormControlInput1" className="ms-2 form-label">Mobile</label>
                              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Mobile" />
                            </div>
                        </div>
                        <div className="w-100 mt-2">
                            <input className="w-100 py-2 px-2 rounded" type="password" placeholder="Password"/>
                        </div>
                        <div className="mt-4 d-flex">
                            <div className="px-2">
                                <button type="button" className="btn btn-primary">Log In</button>
                            </div>
                            <div className="px-2">
                                <button type="button" className="btn"><p className="fw-bold">Forget Password</p></button>
                            </div>
                        </div>
                    </form>
                  </div>
                  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="1">
                    <form id="register" className="data py-4 px-4">
                        <input className="form-control mb-2" type="text" placeholder="Full Name" required aria-label="default input example" />
                        <input className="form-control mb-2" type="text" placeholder="Email" required aria-label="default input example" />
                        <div className="d-flex mb-2 align-items-end">
                            <div className="pe-2 pb-0 w-50">
                                <label for="exampleFormControlInput1" className="ms-2 form-label">Code</label>
                                <select id="exampleFormControlInput1" required className="form-select" aria-label="Default select example">
                                    <option selected>Code</option>
                                </select>
                            </div>
                            <div className="w-50">
                              <label for="exampleFormControlInput1" className="ms-2 form-label">Mobile</label>
                              <input type="text" className="form-control" required id="exampleFormControlInput1" placeholder="Mobile" />
                            </div>
                        </div>
                        <input className="form-control mb-2" type="password" required placeholder="Password" aria-label="default input example" />
                        <input className="form-control mb-4" type="password" required placeholder="Re-Password" aria-label="default input example" />
                        <button type="submit" class="btn btn-primary">Regiser</button>
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