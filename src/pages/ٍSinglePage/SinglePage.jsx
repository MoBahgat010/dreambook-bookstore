import "./SinglePage.css"
import TestImage from "../../assets/TestImage.jpg"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, AddToCart, AddToCartAction, AddToCartSlice } from "../../RTK/Slices/ProductCartSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";

function SinglePage() {

    const params  = useParams();
    
    const { token } = useSelector(state => state.Authorization);
    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const dispatch = useDispatch();
    
    const [productData, setProductData] = useState({})

    const { t } = useTranslation();
    
    const [isLiked, setIsLiked] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const WholeHeart = useRef();
    
    function setLiked() {
        if(isLiked) {
            WholeHeart.current.classList.remove("like-active");
        } else {
            WholeHeart.current.classList.add("like-active");
        }
        setIsLiked(!isLiked);
    }
    
    useEffect(() => {
        setIsLiked();
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3500/api/v1/products/${params.productId}`,{
            headers: {
                currency:  countryCurrency
            }
        })
        .then(res => {
            console.log(res.data);
            setProductData(res.data.result)
        })
    }, [countryCurrency, params])  


    return (
        <section className="single-page py-5">
            <div className="container">
                <div className="inner-container fw-bolder row">
                    <div className="image-container px-2 col-12 col-md-6">
                        <img src={productData.image} alt="" />
                    </div>
                    <div className="data col-12 col-md-6">
                        <div className="upper-data">
                            <h1>{productData.title}</h1>
                            <span>{productData.price} {countryCurrency}</span>
                            <div className="review overflow-hidden position-relative mt-5">
                                <div className="hollow-stars d-flex">
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div>
                                <div className="solid-stars d-flex">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                                <p className="mt-1 mb-3">0 {t("Reviews")}</p>
                                <div className="d-flex align-items-center">
                                    <div className="px-1">
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">1</option>
                                            <option value="1.5">1.5</option>
                                            <option value="2">2</option>
                                            <option value="2.5">2.4</option>
                                            <option value="3">3</option>
                                            <option value="3.5">3.5</option>
                                            <option value="4">4</option>
                                            <option value="4.5">4.5</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <button type="button" className="btn btn-secondary">{t("Add Review")}</button>
                                </div>
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
                                            console.log(quantity);
                                            dispatch(AddToCartAction({ id: params.productId, quantity: quantity}))
                                            let current_product = {
                                                id: params.productId,
                                                image: productData.image,
                                                title: productData.title,
                                                quantity: quantity,
                                                price: productData.price
                                            }
                                            dispatch(addProduct(current_product));
                                        }} type="button" className="h-100 text-white rounded-pill py-2 px-4">{t("Add to Cart")}</button>
                                    </div>
                                    {
                                        productData.new &&
                                        <p style={{color: "#8B572A"}} className="mx-2">{t("New")}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lower-data mt-3">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                  <tr>
                                      <td>{t("DEPARTEMENTS")}</td>
                                      <td>{t(productData.departement)}</td>
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
                                        <td>{productData.weight}</td>
                                  </tr>
                                  <tr>
                                        <td>{t('Code')}</td>
                                        <td>{params.productId}</td>
                                  </tr>
                                  <tr>
                                        <td>{t('Availability')}</td>
                                        <td>{productData.availability ? t("In Stock") : t("Out of Stock")}</td>
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
                                    setLiked();
                                }}>
                                    <i className="fa-regular fa-heart"></i>
                                    <i ref={WholeHeart} className="fa-solid fa-heart"></i>
                                </div>
                                <div className="px-1 d-flex">
                                    <div className="px-1">
                                        <div className="facebook p-2 px-3 bg-info">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </div>
                                    </div>
                                    <div className="px-1">
                                        <div className="facebook p-2 px-3 bg-info">
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