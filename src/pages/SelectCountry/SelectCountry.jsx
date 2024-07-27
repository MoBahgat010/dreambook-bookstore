import { Link } from "react-router-dom";
import "./SelectCountry.css"
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import world from "../../assets/world.png"
import logo from "../../assets/logo.png"
import { useDispatch } from "react-redux";
import { changeCountry } from "../../RTK/Slices/SelectedCountrySlice";

function SelectCountry() {

    const dispatch = useDispatch();

    return (
        <section className="select-country py-5">
            <div className="container">
                <div className="inner-container row justify-content-center">
                    <div className="sau px-2di-arabia col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link onClick={() => {
                            dispatch(changeCountry({ countryImg: saudiarabia, countryName:"Saudi Arabia" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={saudiarabia} alt="" />
                            <p className="mt-2">Saudi Arabia</p>
                        </Link>
                    </div>
                    <div className="Kuw px-2ait col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link onClick={() => {
                            dispatch(changeCountry({ countryImg: kuwait, countryName:"Kuwait" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={kuwait} alt="" />
                            <p className="mt-2">Kuwait</p>
                        </Link>
                    </div>
                    <div className="UAE px-2 col-md-6 col-12 col-lg-3 flex-column d-flex justify-content-center align-items-center">
                        <Link onClick={() => {
                            dispatch(changeCountry({ countryImg: emirates, countryName:"UAE" }));
                        }} className="w-75 h-75 flex-column d-flex justify-content-center align-items-center">
                            <img src={emirates} alt="" />
                            <p className="mt-2">United Arab Emirates</p>
                        </Link>
                    </div>
                    <div className="Bah px-2rain col-md-6 col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                        <Link onClick={() => {
                            dispatch(changeCountry({ countryImg: bahrain, countryName:"Bahrain" }));
                        }} className="w-75 h-75 d-flex flex-column justify-content-center align-items-center">
                            <img src={bahrain} alt="" />
                            <p className="mt-2">Bahrain</p>
                        </Link>
                    </div>
                    <div className="oth px-2er-country col-md-6 col-12 col-lg-3 d-flex flex-column justify-content-center align-items-center">
                        <Link onClick={() => {
                            dispatch(changeCountry({ countryImg: world, countryName:"World" }));
                        }} className="w-75 h-75 d-flex flex-column justify-content-center align-items-center">
                            <img src={world} alt="" />
                            <p className="mt-2">Other World</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SelectCountry