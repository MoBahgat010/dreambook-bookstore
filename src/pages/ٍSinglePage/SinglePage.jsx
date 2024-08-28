import "./SinglePage.css"
import TestImage from "../../assets/TestImage.jpg"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddThenGetCartProducts, TriggerInsuffecientProductQuantity } from "../../RTK/Slices/ProductCartSlice"
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { FetchCertainProduct } from "../../RTK/Slices/FetchProductsSlice";
import { AddThenGetWishList, RemoveThenGetWishList } from "../../RTK/Slices/ProductsWishListSlice";
import toast from "react-hot-toast";
import i18next from "i18next";

function SinglePage() {

    const params  = useParams();
    
    const { wishproducts } = useSelector(state => state.WishList);
    // const { token } = useSelector(state => state.Authorization);
    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const dispatch = useDispatch();
    
    const { certainProduct } = useSelector(state => state.ShopPage);
    // const [productData, setProductData] = useState({})

    const { i18n, t } = useTranslation();
    
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

    useEffect(() => {
        window.scrollTo(0,0);
    }, [params])

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
                            {
                                Boolean(certainProduct.discount) ?
                                    <div className="d-flex gap-2">
                                        <span>{(100 - certainProduct.discount) / 100.0 * certainProduct.price} {countryCurrency}</span>
                                        <span className="old-price">{certainProduct.price} {countryCurrency}</span>
                                    </div>
                                :
                                    <span>{certainProduct.price} {countryCurrency}</span>
                            }
                            <div className="review overflow-hidden position-relative mt-5">
                                <p>{t("Add Quantity")}</p>
                                <div className="select-quantity mt-2 d-flex align-items-center">
                                    <div className="d-flex pe-1">
                                        <button onClick={() => {
                                            quantity && setQuantity(quantity - 1);
                                        }} className="text-white fs-3 py-1 px-3">-</button>
                                        <div className="p-2 d-flex bg-light-subtle align-items-center">{quantity}</div>
                                        <button onClick={() => {
                                            quantity != certainProduct.quantity ?
                                                setQuantity(quantity + 1)
                                            :
                                                toast.error("Insufficient product quantity.")
                                        }} className="text-white fs-3 py-1 px-3">+</button>
                                    </div>
                                    <div className="px-1">
                                        <button onClick={() => {
                                            // console.log(quantity);
                                            dispatch(AddThenGetCartProducts({ id: params.productId, quantity: quantity }))
                                            // dispatch(addProduct(current_product));
                                        }} type="button" className="h-100 text-white rounded-pill py-2 px-4">{t("Add to Cart")}</button>
                                    </div>
                                    {
                                        certainProduct.quantity < 10 &&
                                            <p className="alert p-0 m-0 ms-2 text-danger">{certainProduct.quantity} item{certainProduct.quantity != 1 && <span>s</span>} available</p>
                                    }
                                    {
                                        certainProduct.new &&
                                        <p style={{color: "#916741"}} className="mx-2">{t("New")}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="lower-data d-flex flex-column mt-3">
                            <table className="table table-striped flex-grow-1 table-bordered">
                                <tbody>
                                  <tr>
                                      <td>{t("Category")}</td>
                                      <td>{i18next.language === 'en' ? certainProduct.category?.englishname : certainProduct.category?.arabicname}</td>
                                  </tr>
                                  <tr>
                                      <td>{t("SubCategory")}</td>
                                      <td>{i18next.language === 'en' ? certainProduct.Subcategory?.englishname : certainProduct.Subcategory?.arabicname}</td>
                                  </tr>
                                  <tr>
                                      <td>{t("AUTHOR")}</td>
                                      <td>John Doe</td>
                                  </tr>
                                  <tr>
                                      <td>{t("Publication")}</td>
                                      <td>{certainProduct.publication}</td>
                                  </tr>
                                  <tr>
                                      <td>{t("Page Count")}</td>
                                      <td>{certainProduct.papersnumber}</td>
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
                                        <td>{certainProduct.quantity ? t("In Stock") : t("Out of Stock")}</td>
                                  </tr>
                                  <tr>
                                        <td>{t("Views")}</td>
                                        <td>315</td>
                                  </tr>
                                  <tr>
                                        <td className="me-auto">{t('Stocks')}</td>
                                        <td>{certainProduct.quantity}</td>
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