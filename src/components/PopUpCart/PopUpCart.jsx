import gsap from "gsap"
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideComponents } from "../../RTK/Slices/ComponentsSlice";
import TestImage from "../../assets/TestImage.jpg";
import "./PopUpCart.css"
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PopUpCart() {

    const { token } = useSelector(state => state.Authorization);
    const { CartProducts } = useSelector(state => state.Cart);
    
    // useEffect(() => {
    //   console.log(CartProducts);
    // }, [CartProducts]) 
    
    const { currencyName } = useSelector(state => state.SelectedCurrency);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 678px)' });
    const { t } = useTranslation();

    const { isShown } = useSelector(state => state.Components);
    const PopUbCart = useRef();
    const PopUpCartContainer = useRef();
    const dispatch = useDispatch();

    function ShowPopUpCart() {
      gsap.set("body", {
        overflow: "hidden",
      })
      gsap.to(".pop-up-cart", {
        visibility: "visible",
        opacity: 1,
        zIndex: 500     
      })
      if(isSmallScreen) {
          gsap.to(".pop-up-cart .inner-container", {
            duration: 0.5,
            y: 350,
            visibility: "visible",
            opacity: 1
          })
        }
        else {
            gsap.to(".pop-up-cart .inner-container", {
              duration: 0.5,
              y: 280,
              visibility: "visible",
              opacity: 1
            })        
      }
    }
    
    function HidePopUpCart() {
      gsap.set("body", {
        overflow: "visible"
      })
      gsap.to(".pop-up-cart", {
        visibility: "hidden",
        opacity: 0,
        zIndex: -1
      })
      gsap.to(".pop-up-cart .inner-container", {
        duration: 0.5,
        y: 0,
        visibility: "invisible",
        opacity: 0,
      })
    }

    useEffect(() => {
      isShown ? ShowPopUpCart() : HidePopUpCart();
    }, [isShown])

    return (
        <div ref={PopUbCart} className='pop-up-cart .pop-up-deactive'>
          <div ref={PopUpCartContainer} className="inner-container bg-white">
            <table className="table">
              <thead>
                <tr className='fw-bold'>
                  <th className='image product-text text-center' scope="col">{t("Image")}</th>
                  <th className="product-text" scope="col">{t("product")}</th>
                  <th className="product-text" scope="col">{t("qty")}</th>
                  <th className="product-text" scope="col">{t("Total")}</th>
                </tr>
              </thead>
              <tbody>
                {
                  CartProducts?.map(product => {
                    // console.log(product);
                    return (
                      <tr key={product.product._id}>
                        <th>
                          <div className="image-container">
                            <img src={product.product.image} alt="" />
                          </div>
                        </th>
                        <td className="product-text">{product.product.title}</td>
                        <td className="product-text">{product.quantity}</td>
                        <td className='text-center product-text'>
                          <p>{currencyName}</p>
                          <p>{product.quantity * product.price}</p>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
              {
                !(CartProducts? CartProducts.length : 0) && 
                  <caption>
                    <div className="w-100 px-2">
                      <p className="no-items w-100 text-center text-white no-items py-2 rounded">{t("no items")}</p>
                    </div>
                  </caption>
              }
            </table>
            <div className="options position-sticky bottom-0 bg-white pb-2 d-flex justify-content-end">
                <div className="close px-1">
                  <button onClick={() => {
                    dispatch(hideComponents());
                  }} type="button" className="btn btn-primary product-text button-resp">{t("Close")}</button>
                </div>
                <Link onClick={() => {
                    dispatch(hideComponents());
                }} to={"cart"} className="close px-1">
                  <button type="button" className="btn btn-primary product-text button-resp">{t("Shopping Cart")}</button>
                </Link>
            </div>
          </div>
        </div>
    );
}

export default PopUpCart;