import { useTranslation } from "react-i18next";
import TestImage from "../../assets/TestImage.jpg"
import "./PopUpProduct.css"
import gsap from "gsap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddThenGetCartProducts } from "../../RTK/Slices/ProductCartSlice";

function PopUpProduct() {

    const location = useLocation();
    const [popupProduct, setPopupProduct] = useState({});
    const [isPopupShowed, setIsPopupShowed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:3500/api/v1/popup")
        .then(res => {
            console.log(res.data.result);
            const allPopupProducts = res.data.result;
            const chosenProduct = Math.floor(Math.random() * (allPopupProducts.length));
            console.log(chosenProduct);
            setPopupProduct(res.data.result[chosenProduct].product);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    function ShowPopUp() {
        gsap.to(".pop-up-product", {
            opacity: 1,
            visibility: "visible",
            duration: 0.5
        })
        const tl = gsap.timeline();
        tl
            .to(".pop-up-product .inner-container", {
                opacity: 1,
                duration: 0.5
            })
            .set("body", {
                overflow: "hidden"
            })
    }
    function HidePopUp() {
        gsap.set("body", {
            overflow: "visible"
        })
        const tl = gsap.timeline();
        gsap.to(".pop-up-product .inner-container", {
            opacity: 0,
            ease: "power2.inOut", // Easing function,
            duration: 0.5
        })
        tl.to(".pop-up-product", {
            opacity: 0,
            duration: 0.5
        })
          .to(".pop-up-product", {
            visibility: "hidden"
        })
    }

    useEffect(() => {
        if(location.pathname === "/home" && !isPopupShowed) {
            setIsPopupShowed(true);
            setTimeout(ShowPopUp, 2000)
        }
    }, [location.pathname])
    
    const { t } = useTranslation();

    return (
        <div className="pop-up-product">
            <Link to={`/single-page/${popupProduct._id}`} onClick={HidePopUp} className="inner-container">
                <i onClick={(e) => {
                    e.preventDefault(); //this line made the link does not work which is the thing I need
                    e.stopPropagation();
                    HidePopUp();
                }} className="fa-solid fa-xmark"></i>
                <h4>{popupProduct.title}</h4>
                <div className="product-image mb-2">
                    <img src={popupProduct.image} alt={popupProduct.title} />
                </div>
                <button onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    HidePopUp();
                    dispatch(AddThenGetCartProducts({ id: popupProduct._id, quantity: 1}))
                }} >{t("Add To Cart")}</button>
            </Link>
        </div>
    );
}

export default PopUpProduct;