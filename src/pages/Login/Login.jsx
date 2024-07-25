import "./Login.css"

function Login() {
    return (
        <section className="login pt-5">
            <div className="container">
                <div className="state d-flex">
                    <p className="px-2">
                        <p className="active">Register</p>
                    </p>
                    <p className="px-2">
                        <p>Log In</p>
                    </p>
                </div>
                <form className="data py-4">
                    <div className="d-flex align-items-end">
                        <div className="pe-2 pb-0 w-50">
                            <label for="exampleFormControlInput1" className="ms-2 form-label">Code</label>
                            <select id="exampleFormControlInput1" className="form-select" aria-label="Default select example">
                                <option selected>Code</option>
                            </select>
                        </div>
                        <div class="w-50">
                          <label for="exampleFormControlInput1" className="ms-2 form-label">Mobile</label>
                          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Mobile" />
                        </div>
                    </div>
                    <div className="w-100 mt-2">
                        <input className="w-100 py-2 px-2 rounded" type="password" placeholder="Password"/>
                    </div>
                    <div className="mt-4 d-flex">
                        <div className="px-2">
                            <button type="button" class="btn btn-primary">Log In</button>
                        </div>
                        <div className="px-2">
                            <button type="button" class="btn"><p className="fw-bold">Forget Password</p></button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;