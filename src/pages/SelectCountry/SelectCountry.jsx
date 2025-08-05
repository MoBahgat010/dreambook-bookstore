import { Link, useNavigate } from "react-router-dom";
import "./SelectCountry.css"
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import world from "../../assets/world.png"
import logo from "../../assets/logo.png"
import { useDispatch } from "react-redux";
import { changeCountry } from "../../RTK/Slices/SelectedCountrySlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function SelectCountry() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const loginToken = !!localStorage.getItem('login_token');
        const currency = !!localStorage.getItem('currency');
        if (loginToken && currency)
            window.location.href = "/home";
    }, [])

    return (
        <section className="select-country py-5">
            <div className="container">
                <div className="inner-container row justify-content-center">
                    <div className="sau px-2di-arabia col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link to={"/home"} onClick={() => {
                            dispatch(changeCountry({ countryImg: saudiarabia, countryName:"Saudi Arabia", countryCurrency:"SAR" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={saudiarabia} alt="" />
                            <p className="mt-2">{t("Saudi Arabia")}</p>
                        </Link>
                    </div>
                    <div className="Kuw px-2ait col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link to={"/home"} onClick={() => {
                            dispatch(changeCountry({ countryImg: kuwait, countryName:"Kuwait", countryCurrency:"KWD" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={kuwait} alt="" />
                            <p className="mt-2">{t("Kuwait")}</p>
                        </Link>
                    </div>
                    <div className="UAE px-2 col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link to={"/home"} onClick={() => {
                            dispatch(changeCountry({ countryImg: emirates, countryName:"UAE", countryCurrency:"AED" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={emirates} alt="" />
                            <p className="mt-2">{t("United Arab Emirates")}</p>
                        </Link>
                    </div>
                    <div className="Bah px-2rain col-md-6 col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                        <Link to={"/home"} onClick={() => {
                            dispatch(changeCountry({ countryImg: bahrain, countryName:"Bahrain", countryCurrency:"BHD" }));
                        }} className="w-75 h-75 d-flex flex-column justify-content-center align-items-center">
                            <img src={bahrain} alt="" />
                            <p className="mt-2">{t("Bahrain")}</p>
                        </Link>
                    </div>
                    <div className="oth px-2er-country col-md-6 col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                        <Link to={"/home"}k onClick={() => {
                            dispatch(changeCountry({ countryImg: world, countryName:"World" }));
                        }} className="w-75 h-75 d-flex flex-column justify-content-center align-items-center">
                            <img src={world} alt="" />
                            <p className="mt-2">{t("Other World")}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectCountry