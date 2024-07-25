import gsap from "gsap"
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideComponents } from "../../RTK/Slices/ComponentsSlice";
import TestImage from "../../assets/TestImage.jpg";
import "./PopUpCart.css"
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

function PopUpCart() {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 678px)' })

    const { isShown } = useSelector(state => state.Components);
    const PopUbCart = useRef();
    const PopUpCartContainer = useRef();
    const dispatch = useDispatch();

    function ShowPopUpCart() {
      gsap.to(".pop-up-cart", {
        visibility: "visible",
        opacity: 1,
        zIndex: 500     
      })
      if(isSmallScreen) {
          gsap.to(".pop-up-cart .inner-container", {
            duration: 0.5,
            yPercent: 100,
            visibility: "visible",
            opacity: 1
          })
        }
        else {
            gsap.to(".pop-up-cart .inner-container", {
              duration: 0.5,
              yPercent: 60,
              visibility: "visible",
              opacity: 1
            })        
      }
    }
    
    function HidePopUpCart() {
      gsap.to(".pop-up-cart", {
        visibility: "hidden",
        opacity: 0,
        zIndex: -1
    })
    gsap.to(".pop-up-cart .inner-container", {
        duration: 0.5,
        yPercent: 0,
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
            <table class="table">
              <thead>
                <tr className='fw-bold'>
                  <th className='image product-text' scope="col">Image</th>
                  <th className="product-text" scope="col">product</th>
                  <th className="product-text" scope="col">qty</th>
                  <th className="product-text" scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="image-container">
                      <img src={TestImage} alt="" />
                    </div>
                  </th>
                  <td className="product-text">Psychology of Money (Physical Book)</td>
                  <td product-text>1</td>
                  <td className='text-center product-text'>
                    <p>BHD</p>
                    <p>11400</p>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div className="image-container">
                      <img src={TestImage} alt="" />
                    </div>
                  </th>
                  <td className="product-text">Psychology of Money (Physical Book)</td>
                  <td product-text>1</td>
                  <td className='text-center product-text'>
                    <p>BHD</p>
                    <p>11400</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="options pb-2 d-flex justify-content-end">
                <div className="close px-1">
                  <button onClick={() => {
                    dispatch(hideComponents());
                  }} type="button" className="btn btn-primary product-text button-resp">Close</button>
                </div>
                <Link onClick={() => {
                    dispatch(hideComponents());
                }} to={"cart"} className="close px-1">
                  <button type="button" className="btn btn-primary product-text button-resp">Shopping Cart</button>
                </Link>
            </div>
          </div>
        </div>
    );
}

export default PopUpCart;