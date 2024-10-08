import { useRef } from "react";
import "./ContactUs.css"
import { useTranslation } from "react-i18next";

function ContactUs() {

    const FullName = useRef();
    const Email = useRef();
    const Message = useRef();

    const { t } = useTranslation();

    return (
        <section className="contact-us py-5">
            <div className="container">
                <h2 className="text-center mb-5">{t("Contact Us")}</h2>
                <div className="row">
                    <div className="left-form mb-4 mb-md-0 bg-white col-12 col-md-6">
                        <div className="p-5">
                            <p className="text-center fs-3 fw-semi-bold mb-3">{t("Contact Form")}</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                e.target.reset();
                            }}>
                                <div>
                                    <label className="fw-bold mb-2" htmlFor="Full Name">{t("Full Name")}</label>
                                    <input ref={FullName} className="w-100 p-2" type="text" id="Full Name" required placeholder={t("Full Name")} />
                                </div>
                                <div className="my-4">
                                    <label className="fw-bold mb-2" htmlFor="Email">Emial</label>
                                    <input ref={Email} className="w-100 p-2" type="email" id="Email" required placeholder={t("Email")} />
                                </div>
                                <div>
                                    <label className="fw-bold mb-2" htmlFor="message">Message</label>
                                    <textarea ref={Message} className="w-100 p-2" type="text" id="Message" placeholder={t("Message")} />
                                </div>
                                <div className="submit-button text-end">
                                    <button>{t("Send")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="addresses col-12 col-md-6">
                        <div style={{lineHeight: "40px"}} className="p-3 bg-white text-center">
                            <p>ابق على تواصل معنا</p>
                            <p>الكويت</p>
                            <p>0096551455511 - 0096566016006</p>
                            <p>خدمة 7 أيام في الأسبوع من 9:00 حتي 05:00 </p>
                            <p>info@dardreambook.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;