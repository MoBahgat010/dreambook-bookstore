import { Link } from "react-router-dom";
import "./MainPage.css"
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"

function MainPage() {



    return (
        <section>
            <nav className="navbar navbar-expand">
              <div className="container">
                <div className="collapse navbar-collapse flex-column flex-md-row d-flex justify-content-center align-items-center" id="navbarSupportedContent">
                  <ul className="navbar-nav me-0 me-md-auto">
                    <li className="nav-item d-flex align-items-center terms pr-1 p-md-2 p-lg-3">
                      <Link className="active text-white" aria-current="page" href="#">Terms and conditions</Link>
                    </li>
                    <li className="nav-item social-media-li">
                        <div className="w-100 h-100 social-media d-flex align-items-center">
                            <div>
                                <div>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-x-twitter"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-instagram"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="email">
                        <Link className="link-li pl-1 pl-md-2 pl-lg-3 text-light d-flex align-items-center w-100 h-100">
                            <div>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <p>Info@darkalemat.com</p>
                        </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav text-white d-flex align-items-center">
                    <li className="p-2 currency position-relative">
                        <p className="mb-0 me-3">KWD</p>
                        <div className="arrow position-absolute"></div>
                        <ul className="currency-dropdown p-2 position-absolute">
                            <li>
                                <p className="fs-6">Kuwait - Kwd</p>
                            </li>
                            <li>
                                <p className="fs-6">Bahraini - BHD</p>
                            </li>
                            <li>
                                <p className="fs-6">UAE - AED</p>
                            </li>
                            <li>
                                <p className="fs-6">Saudi - SAR</p>
                            </li>
                            <li>
                                <p className="fs-6">Quatar - QAR</p>
                            </li>
                            <li>
                                <p className="fs-6">Oman - OMR</p>
                            </li>
                            <li>
                                <p className="fs-6">USA - USD</p>
                            </li>
                            <li>
                                <p className="fs-6">Europe - EUR</p>
                            </li>
                            <li>
                                <p className="fs-6 mb-1 mb-md-0">British - GPB</p>
                            </li>
                        </ul>
                    </li>
                    <li className="language p-2 ">
                        <p className="mb-0">EN</p>
                    </li>
                    <li className="login p-2 d-flex align-items-center">
                        <Link className="link-li">Login</Link>
                    </li>
                    <li className="current-country position-relative p-2 d-flex align-items-center">
                        <p className="mb-0">Change Country</p>
                        <div className="image-container ms-2 d-flex align-items-center">
                            <img src={bahrain} alt="bahrain" />
                        </div>
                        <ul className="country-dropdown position-absolute">
                            <li className="py-1 py-md-2 d-flex justify-content-between">
                                <p>Kuwait</p>
                                <div className="image-container ms-0 ms-md-2 d-flex align-items-center">
                                    <img src={kuwait} alt="bahrain" />
                                </div>
                            </li>
                            <li className="py-1 py-md-2 d-flex justify-content-between">
                                <p>Emirates</p>
                                <div className="image-container ms-0 ms-md-2 d-flex align-items-center">
                                    <img src={emirates} alt="bahrain" />
                                </div>
                            </li>
                            <li className="pt-1 pt-md-2 d-flex justify-content-between">
                                <p>Saudi Arabia</p>
                                <div className="image-container ms-0 ms-md-2 d-flex align-items-center">
                                    <img src={saudiarabia} alt="bahrain" />
                                </div>
                            </li>
                        </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </section>
    );
}

export default MainPage