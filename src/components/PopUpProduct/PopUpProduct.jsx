import { useTranslation } from "react-i18next";
import TestImage from "../../assets/TestImage.jpg"
import "./PopUpProduct.css"
import gsap from "gsap";

function PopUpProduct() {

    function ShowPopUp() {
        gsap.set("body", {
            overflow: "hidden"
        })
        gsap.to(".pop-up-product", {
            opacity: 1,
            visibility: "visible",
            duration: 0.5
        })
        gsap.to(".pop-up-product .inner-container", {
            top: "50%",
            duration: 0.5
        })
    }
    function HidePopUp() {
        gsap.set("body", {
            overflow: "visible"
        })
        const tl = gsap.timeline();
        gsap.to(".pop-up-product .inner-container", {
            top: "-50%",
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

    // setInterval(ShowPopUp, 5000);
    
    const { t } = useTranslation();

    return (
        <div className="pop-up-product">
            <div className="inner-container">
                <i onClick={HidePopUp} className="fa-solid fa-xmark"></i>
                <h4>Product Title</h4>
                <div className="product-image mb-2">
                    <img src={TestImage} alt="test image" />
                </div>
                <button>{t("Add To Cart")}</button>
            </div>
        </div>
    );
}

export default PopUpProduct;