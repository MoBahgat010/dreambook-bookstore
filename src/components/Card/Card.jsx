import { useState } from "react";
import TestImage from "../../assets/TestImage.jpg"
import "./Card.css"
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../../assets/shopping-cart.png"
import { addProductToWishList, AddToWishListAction } from "../../RTK/Slices/ProductsWishListSlice";
import { addProduct, AddToCartAction } from "../../RTK/Slices/ProductCartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Card(props) {

    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <Link to={`/single-page/${props.id}`} className="card w-100 position-relative overflow-hidden">
            {
                props.newBadge &&
                <div className="new-badge d-flex justify-content-center align-items-center position-absolute">New</div>
            }
            <div className="image-container w-100">
                <img src={props.image} className="" alt="" />
            </div>
            <div className="card-body text-center">
                <h5 className="card-title text-center">{props.title}</h5>
                <p className="card-text">{props.price} {countryCurrency}</p>
                <div className="options mt-3 d-flex justify-content-center align-items-center">
                    <div className="button add-button">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(AddToCartAction({ id: props.id, quantity: 1}))
                            let current_product = {
                                id: props.id,
                                image: props.image,
                                title: props.title,
                                quantity: 1,
                                price: props.price
                            }
                            dispatch(addProduct(current_product));
                        }} className="btn btn-primary"><p>{t("Add to Cart")}</p></button>
                    </div>
                    <div className="button like-button px-sm-2 px-1">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            let current_product = {
                                id: props.id,
                                image: props.image,
                                title: props.title
                            }
                            dispatch(AddToWishListAction(current_product));
                        }} className="btn btn-primary">
                            <i className="fa-regular fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Card;