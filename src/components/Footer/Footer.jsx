import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import AppStore from "../../assets/apple.png"
import PlayStore from "../../assets/google.png"
import "./Footer.css"
import { useTranslation } from "react-i18next"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SendEmail } from "../../RTK/Slices/NewsEmailSlice"

function Footer() {

    const { isemailSent, isEmailSubmitted } = useSelector(state => state.NewsEmail);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const EmailInp = useRef();
    const [isWriting, setIsWriting] = useState(false);

    function EmailSendMessage() {
        if(isEmailSubmitted) {
            if(isemailSent) 
                return <p className="text-center text-success">{t("Email Saved")}</p>
            else
                return <p className="text-center text-danger">{t("Email already exists")}</p>
        }
    }

    return (
        <footer>
            <div className="upper-footer py-5">
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <div className="logo-container d-flex flex-column align-items-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <p className="my-3 fs-3">{t("NewsLetter")}</p>
                    <form className="w-100 text-center" onSubmit={(e) => {
                        setIsWriting(false);
                        dispatch(SendEmail(EmailInp.current.value));
                        e.preventDefault();
                        e.target.reset();
                    }}>
                        <input ref={EmailInp} type="email" onChange={() => {
                            EmailInp?.current?.value != "" ?
                                setIsWriting(true)
                            :
                                setIsWriting(false)
                        }} className="text-center" placeholder={t("Enter Email")} />
                        {
                            isWriting &&
                            <button>{t("Save")}</button>
                        }
                        { EmailSendMessage() }
                    </form>
                    <div className="social-media d-flex justify-content-center align-items-center">
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
                    </div>
            </div>
            <div className="middle-footer py-3">
                <div className="container">
                    <div className="inner-container text-white row">
                        <div className="contact col-12 mb-5 mb-lg-0 col-md-6 col-lg-3">
                            <div className="text-center">
                                <h3 className="py-2">{t("Contact Us")}</h3>
                                <a href="#">Info@darkalemat.com</a>
                                <p className="fw-bolder py-2">Whatsapp +965-94921270</p>
                                <p>https://api.whatsapp.com/send/?phone=96594921270</p>
                            </div>
                        </div>
                        <div className="about-us col-12 mb-5 mb-md-0 col-md-6 col-lg-3">
                            <div className="text-center">
                                <h3 className="py-2">{t("About Us")}</h3>
                                <p>Kalemat.com</p>
                                <p>{t("definition")}</p>
                            </div>
                        </div>
                        <div className="links col-12 mb-5 mb-md-0 mb-lg-0 col-md-6 col-lg-3">
                            <div className="text-center">
                                <h3 className="py-2">{t("Links")}</h3>
                                <ul className="p-0">
                                    <li className="pb-1">
                                        <Link>{t("About Us")}</Link>
                                    </li>
                                    <li className="py-1">
                                        <Link>{t("Contact Us")}</Link>
                                    </li>
                                    <li className="py-1">
                                        <Link>{t("Terms and Conditions")}</Link>
                                    </li>
                                    <li className="py-1">
                                        <Link>{t("Login")}</Link>
                                    </li>
                                    <li className="pt-1">
                                        <Link>{t("Register")}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="download text-center col-12 mb-lg-0 col-md-6 col-lg-3">
                            <h3>{t("DOWNLOAD APP")}</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="px-1">
                                    <Link>
                                        <img src={AppStore} alt="download" />
                                    </Link>
                                </div>
                                <div className="px-1">
                                    <Link>
                                        <img src={PlayStore} alt="download" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lower-footer text-center py-2">
                <p>Kalemat Bookstore. © 2020. | All Rights Reserved | Designed & Developed By Mohamed Bahgat</p>
            </div>
        </footer>
    );
}

export default Footer