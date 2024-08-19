import "./SinglePage.css"
import TestImage from "../../assets/TestImage.jpg"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddThenGetCartProducts } from "../../RTK/Slices/ProductCartSlice"
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { FetchCertainProduct } from "../../RTK/Slices/FetchProductsSlice";
import { AddThenGetWishList, RemoveThenGetWishList } from "../../RTK/Slices/ProductsWishListSlice";

function SinglePage() {

    const params  = useParams();
    
    const { wishproducts } = useSelector(state => state.WishList);
    // const { token } = useSelector(state => state.Authorization);
    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const dispatch = useDispatch();
    
    const { certainProduct } = useSelector(state => state.ShopPage);
    // const [productData, setProductData] = useState({})

    const { t } = useTranslation();
    
    const [quantity, setQuantity] = useState(1);
    const WholeHeart = useRef();

    function handleSettingLiked() {
        if(WholeHeart.current.classList.contains("like-active"))
            dispatch(RemoveThenGetWishList(params.productId));
        else
            dispatch(AddThenGetWishList(params.productId));
    }
    
    useEffect(() => {
        let flag = false;
        for(let item of wishproducts)
            if(item._id === params.productId) {
                flag = true;
                break;
            }
        if(flag) {
            WholeHeart.current.classList.add("like-active");
        } else {
            WholeHeart.current.classList.remove("like-active");
        }
    }, [wishproducts])

    useEffect(() => {
        dispatch(FetchCertainProduct(params.productId));
    }, [countryCurrency, params])  


    return (
        <section className="single-page py-5">
            <div className="container">
                <div className="inner-container fw-bolder row">
                    <div className="image-container px-2 col-12 col-md-6">
                        <img src={certainProduct.image} alt="" />
                    </div>
                    <div className="data col-12 col-md-6">
                        <div className="upper-data">
                            <h1>{certainProduct.title}</h1>
                            <span>{certainProduct.price} {countryCurrency}</span>
                            <div className="review overflow-hidden position-relative mt-5">
                                <p>{t("Add Quantity")}</p>
                                <div className="select-quantity mt-2 d-flex align-items-center">
                                    <div className="d-flex pe-1">
                                        <button onClick={() => {
                                            quantity && setQuantity(quantity - 1);
                                        }} className="text-white fs-3 py-1 px-3">-</button>
                                        <div className="p-2 d-flex bg-light-subtle align-items-center">{quantity}</div>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-white fs-3 py-1 px-3">+</button>
                                    </div>
                                    <div className="px-1">
                                        <button onClick={() => {
                                            // console.log(quantity);
                                            dispatch(AddThenGetCartProducts({ id: params.productId, quantity: quantity }))
                                            let current_product = {
                                                id: params.productId,
                                                image: certainProduct.image,
                                                title: certainProduct.title,
                                                quantity: quantity,
                                                price: certainProduct.price
                                            }
                                            // dispatch(addProduct(current_product));
                                        }} type="button" className="h-100 text-white rounded-pill py-2 px-4">{t("Add to Cart")}</button>
                                    </div>
                                    {
                                        certainProduct.new &&
                                        <p style={{color: "#054871"}} className="mx-2">{t("New")}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lower-data d-flex flex-column mt-3">
                            <table className="table table-striped flex-grow-1 table-bordered">
                                <tbody>
                                  <tr>
                                      <td>{t("DEPARTEMENTS")}</td>
                                      <td>{t(certainProduct.departement)}</td>
                                  </tr>
                                  <tr>
                                      <td>{t("Category")}</td>
                                      <td>{t("Articles")}</td>
                                  </tr>
                                  <tr>
                                      <td>{t("AUTHOR")}</td>
                                      <td>John Doe</td>
                                  </tr>
                                  <tr>
                                      <td>{t("Publication")}</td>
                                      <td>EM</td>
                                  </tr>
                                  <tr>
                                      <td>{t("Page Count")}</td>
                                      <td>368</td>
                                  </tr>
                                  <tr>
                                        <td>{t("Weight")}</td>
                                        <td>{certainProduct.weight}</td>
                                  </tr>
                                  <tr>
                                        <td>{t('Code')}</td>
                                        <td>{params.productId}</td>
                                  </tr>
                                  <tr>
                                        <td>{t('Availability')}</td>
                                        <td>{certainProduct.availability ? t("In Stock") : t("Out of Stock")}</td>
                                  </tr>
                                  <tr>
                                        <td>{t("Views")}</td>
                                        <td>315</td>
                                  </tr>
                                  <tr>
                                        <td className="me-auto">{t('Stocks')}</td>
                                        <td>321</td>
                                  </tr>
                                </tbody>
                            </table>
                            <div className="more-options d-flex justify-content-between">
                                <div className="like position-relative p-2 px-3 bg-info" onClick={() => {
                                    handleSettingLiked();
                                }}>
                                    <i className="fa-regular fa-heart"></i>
                                    <i ref={WholeHeart} className="fa-solid fa-heart"></i>
                                </div>
                                <div className="d-flex">
                                    <div className="facebook">
                                        <div className="p-2 px-3 bg-info">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </div>
                                    </div>
                                    <div className="x">
                                        <div className="p-2 px-3 bg-info">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SinglePage;