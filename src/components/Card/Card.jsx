import { useState } from "react";
import TestImage from "../../assets/TestImage.jpg"
import "./Card.css"
import { useDispatch, useSelector } from "react-redux";
import ShoppingCart from "../../assets/shopping-cart.png"
import { addProductToWishList } from "../../RTK/Slices/ProductsWishListSlice";
import { addProduct } from "../../RTK/Slices/ProductCartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Card(props) {

    const { currencyName } = useSelector(state => state.SelectedCurrency);
    const [newBadge, setNewBadge] = useState(true);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <Link to={"/single-page"} className="card w-100 position-relative overflow-hidden">
            {
                newBadge &&
                <div className="new-badge d-flex justify-content-center align-items-center position-absolute">New</div>
            }
            <div className="image-container w-100">
                <img src={TestImage} className="" alt="" />
            </div>
            <div className="card-body text-center">
                <h5 className="card-title text-center">Card title</h5>
                <p className="card-text">5000 {currencyName}</p>
                <div className="options mt-3 d-flex justify-content-center align-items-center">
                    <div className="button add-button">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(addProduct(1));
                        }} className="btn btn-primary"><p>{t("Add to Cart")}</p></button>
                    </div>
                    <div className="button like-button px-sm-2 px-1">
                        <button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            dispatch(addProductToWishList(1));
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