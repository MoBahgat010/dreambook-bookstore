import { useEffect, useRef, useState } from "react";
import TestImage from "../../assets/TestImage.jpg"
import "./Card.css"
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../../assets/shopping-cart.png"
import { AddThenGetWishList, RemoveThenGetWishList } from "../../RTK/Slices/ProductsWishListSlice";
import { AddThenGetCartProducts } from "../../RTK/Slices/ProductCartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

function Card(props) {

    const { isToastful } = useSelector(state => state.Cart);
    const { wishproducts } = useSelector(state => state.WishList);
    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const WholeHeart = useRef();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    function handleSettingLiked() {        
        if(WholeHeart.current.classList.contains("like-active"))
            dispatch(RemoveThenGetWishList(props.id));
        else
            dispatch(AddThenGetWishList(props.id));
    }
    
    useEffect(() => {
        let flag = false;  
        for(let item of wishproducts)
            if(item._id === props.id) {
                flag = true;
                break;
            }
        if(flag) {
            WholeHeart.current.classList.add("like-active");
        } else {
            WholeHeart.current.classList.remove("like-active");
        }
    }, [wishproducts])    

    return (
        <Link to={`/single-page/${props.id}`} className="card w-100 position-relative overflow-hidden">
            {
                props.newBadge &&
                <div className="new-badge d-flex justify-content-center align-items-center position-absolute">{t("New")}</div>
            }
            {
                Boolean(props.discount) &&
                <div className="discount-badge d-flex justify-content-center align-items-center position-absolute">{props.discount}% {t("Off")}</div>
            }
            <div className="image-container w-100">
                <img src={props.image} className="" alt="" />
            </div>
            <div className="card-body text-center">
                <h5 className="card-title text-center">{props.title}</h5>
                {
                    Boolean(props.discount) ?
                        <div className="d-flex gap-2">
                            <p className="card-text old-price">{props.price} {countryCurrency}</p>
                            <p className="card-text">{props.price * ((100 - props.discount) / 100.0)} {countryCurrency}</p>
                        </div>
                    :
                        <p className="card-text">{props.price} {countryCurrency}</p>
                }
                {
                    props.quantity == 0 && 
                    <p className="m-0 p-0 card-text text-center old-price">out of stock</p>
                }
                <div className="options mt-3 d-flex justify-content-center align-items-center">
                    <div className="button rounded add-button">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(AddThenGetCartProducts({ id: props.id, quantity: 1}))
                        }} className="btn text-white rounded"><p>{t("Add to Cart")}</p></button>
                    </div>
                    <div className="button rounded flex-grow-1 like-button px-sm-2 px-1">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleSettingLiked();
                        }} className="btn text-white rounded">
                            <i className="fa-regular fa-heart"></i>
                            <i ref={WholeHeart} className="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;