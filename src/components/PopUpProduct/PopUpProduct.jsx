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

    const { t } = useTranslation();

    useEffect(() => {
        axios.get("http://localhost:3500/api/v1/popup")
        .then(res => {
            const allPopupProducts = res.data.result;
            console.log(allPopupProducts)
            if(allPopupProducts.length > 0) {
                const chosenProduct = Math.floor(Math.random() * (allPopupProducts.length));
                console.log(res.data.result[chosenProduct])
                setPopupProduct(res.data.result[chosenProduct]);
            }
            else
                setPopupProduct(null);
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
        tl
            .to(".pop-up-product", {
                opacity: 0,
                duration: 0.5
            })
            .to(".pop-up-product", {
                visibility: "hidden"
            })
    }

    useEffect(() => {
        if(location.pathname === "/home" && !isPopupShowed && popupProduct) {
            setIsPopupShowed(true);
            setTimeout(ShowPopUp, 2000);
        }
    }, [location.pathname, popupProduct])
    
    if((popupProduct != null || popupProduct != undefined) && (popupProduct.product != null || popupProduct.product != undefined))
        return (
            <div className="pop-up-product">
                <Link to={`/single-page/${popupProduct.product._id}`} onClick={HidePopUp} className="inner-container">
                    <i onClick={(e) => {
                        e.preventDefault(); //this line made the link does not work which is the thing I need
                        e.stopPropagation();
                        HidePopUp();
                    }} className="fa-solid fa-xmark"></i>
                    <h4 className="text-center">{popupProduct.product.title}</h4>
                    <div className="product-image mb-2">
                        <img src={popupProduct.product.image} alt={popupProduct.product.title} />
                    </div>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        HidePopUp();
                        dispatch(AddThenGetCartProducts({ id: popupProduct.product._id, quantity: 1}))
                    }} >{t("Add To Cart")}</button>
                </Link>
            </div>
        );
        else if((popupProduct != null || popupProduct != undefined) && !(popupProduct.product != null || popupProduct.product != undefined)) {
            return (
                <div className="pop-up-product">
                    <div className="inner-container">
                        <i onClick={(e) => {
                            e.preventDefault(); //this line made the link does not work which is the thing I need
                            e.stopPropagation();
                            HidePopUp();
                        }} className="fa-solid fa-xmark"></i>
                        <h4 className="text-center">{popupProduct.title}</h4>
                        <div className="product-image mb-2">
                            <img src={popupProduct.image} alt={popupProduct.title} />
                        </div>
                    </div>
                </div>
            );
        }
    }   
    
    export default PopUpProduct;