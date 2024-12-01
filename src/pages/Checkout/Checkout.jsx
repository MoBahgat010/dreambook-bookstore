import { useEffect, useRef, useState } from "react";
import "./Checkout.css"

import TestImage from "../../assets/TestImage.jpg"
import VisaMasterCard from "../../assets/visa_master.jpeg"
import CashOnDelivery from "../../assets/cash_on_delivery.png"
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, RemoveThenGetCartProducts } from "../../RTK/Slices/ProductCartSlice";
import { useTranslation } from "react-i18next";
import { GetUserOrders, SendPayment } from "../../RTK/Slices/PaymentSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const { t } = useTranslation();

    const FirstName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Mobile = useRef();
    const Country = useRef();
    const Block = useRef();
    const Appartement = useRef();
    const City = useRef();
    const Street = useRef();
    const Flat = useRef();
    const Floor = useRef();
    const Area = useRef();
    const OrderNotes = useRef();
    const paymentButton = useRef();

    const { countryName, countryCurrency } = useSelector(state => state.SelectCountry);
    const { CartProducts, cartTotal } = useSelector(state => state.Cart);
    const { redirectURL, shippingData } = useSelector(state => state.Payment);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);

    useEffect(() => {
      if (cartTotal == 0) {
        paymentButton.current.classList.add("button-disabled");
        paymentButton.current.setAttribute("disabled", "");
      }
      else {
        paymentButton.current.classList.remove("button-disabled");
        paymentButton.current.removeAttribute("disabled", "");
      }
    }, [cartTotal])

    useEffect(() => {
        if(redirectURL)
            window.location.href = redirectURL;
    }, [redirectURL])

    useEffect(() => {
      // console.log("User Orders");
      dispatch(GetUserOrders());
    }, [CartProducts])

    useEffect(() => {
      Street.current.value = shippingData.street != undefined ? shippingData.street : "";
      Block.current.value = shippingData.building != undefined ? shippingData.building : "";
      Area.current.value = shippingData.area != undefined ? shippingData.area : "";
      Floor.current.value = shippingData.floor != undefined ? shippingData.floor : "";
      Appartement.current.value = shippingData.apartment != undefined ? shippingData.apartment : "";
      City.current.value = shippingData.city != undefined ? shippingData.city : "";
      Mobile.current.value = shippingData.phone != undefined ? shippingData.phone : "";
    }, [shippingData])

    return (
        <section className="checkout py-5">
            <div className="container bg-white">
                <div className="inner-container row">
                    <div className="left-form col-md-4 col-12 py-4">
                        <div>
                            <div className="title d-flex align-items-center p-1">
                                <div>
                                    <div className="step-one px-3 py-2 text-white">
                                        1
                                    </div>
                                </div>
                                <div className="address">
                                    <p>{t("Address Details")}</p>
                                </div>
                            </div>
                            <form id="order-details" onSubmit={(e) => {
                              dispatch(SendPayment({
                                  street: Street.current.value,
                                  building: Block.current.value,
                                  area: Area.current.value,
                                  floor: Floor.current.value,
                                  apartment: Appartement.current.value,
                                  city: City.current.value,
                                  phone: Mobile.current.value,
                                  country: countryName
                              }));
                              e.preventDefault();
                              e.target.reset();
                            }} className=" w-100">
                                {/* <div className="d-flex gap-1 py-4 w-100">
                                    <div className="w-100">
                                        <input ref={FirstName} required className="w-100 p-2" type="text" placeholder={t("First Name")} />
                                    </div>
                                    <div className="w-100">
                                        <input ref={LastName} required className="w-100 p-2" type="text" placeholder={t("Last Name")} />
                                    </div>
                                </div> */}
                                {/* <div className="w-100">
                                    <input ref={Email} required className="w-100 p-2" type="emial" placeholder={t("Email")} />
                                </div> */}
                                <div className="w-100 pt-4">
                                    <input ref={Mobile} required className="w-100 p-2" type="tel" placeholder={t("Mobile")} />
                                </div>
                                {/* <select ref={Country} onInput={() => {
                                    Country.current.value == "Select Country" ? setShowPaymentMethods(false) : setShowPaymentMethods(true);
                                }} required className="form-select p-2 form-select-lg" aria-label="Large select example">
                                  <option selected>{t("Select Country")}</option>
                                  <option value="egypt">Egypt</option>
                                </select> */}
                                <div className="w-100 pt-4">
                                    <input ref={Area} required className="w-100 p-2" type="text" placeholder={t("Area")} />
                                </div>
                                <div className="w-100 py-4">
                                    <input ref={Block} required className="w-100 p-2" type="text" placeholder={t("Block")} />
                                </div>
                                <div className="d-flex gap-1 w-100">
                                    <div className="w-100">
                                        <input ref={Appartement} required className="w-100 p-2" type="text" placeholder={t("Appartement No.")} />
                                    </div>
                                    <div className="w-100">
                                        <input ref={City} required className="w-100 p-2" type="text" placeholder={t("City")} />
                                    </div>
                                </div>
                                <div className="w-100 py-4">
                                    <input ref={Street} required className="w-100 p-2" type="text" placeholder={t("Street")} />
                                </div>
                                <div className="w-100">
                                    <input ref={Floor} required className="w-100 p-2" type="text" placeholder={t("Floor")} />
                                </div>
                                {/* <div className="d-flex w-100">
                                    <div className="pe-1">
                                        <input ref={Flat} required className="w-100 p-2" type="text" placeholder={t("Flat")} />
                                    </div>
                                    <div className="px-1">
                                        <input ref={Floor} required className="w-100 p-2" type="text" placeholder={t("Floor")} />
                                    </div>
                                    <div className="ps-1">
                                        <input ref={PaciNo} required className="w-100 p-2" type="text" placeholder={t("Paci No")} />
                                    </div>
                                </div> */}
                                <div className="w-100 pt-4">
                                    <textarea ref={OrderNotes} className="w-100 p-2" type="text" placeholder={t("Order Notes")} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="right-data col-md-8 col-12 py-4">
                        <div>
                            <div className="title d-flex align-items-center p-1">
                                <div>
                                    <div className="step-one px-3 py-2 text-white">
                                        2
                                    </div>
                                </div>
                                <div className="address">
                                    <p>{t("CART DETAIL")}</p>
                                </div>
                            </div>
                            <table className="table table-bordered">
                              <thead>
                                <tr className="text-center">
                                  <th className="w-50" scope="col">{t("Product")}</th>
                                  <th scope="col">{t("Price")}</th>
                                  <th scope="col">{t("Quantity")}</th>
                                  <th scope="col">{t("Total")}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  CartProducts?.map(product => {
                                    return (
                                      <tr>
                                        <th>
                                          <div className="d-flex align-items-center">
                                              <div className="image-container d-none d-md-block p-2">
                                                  <img src={product.product.image} alt="" />
                                              </div>
                                              <div className="product-text text-center px-2">
                                                <p>{product.product.title}</p>
                                              </div>
                                          </div>
                                        </th>
                                        <td className="text-center">{countryCurrency} {product.price}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{countryCurrency} {(product.quantity * product.priceExchanged).toFixed(2)}</td>
                                        <td className="text-center cross"><i onClick={() => {
                                          dispatch(RemoveThenGetCartProducts(product._id));
                                        }} className="fa-solid fa-circle-xmark"></i></td>
                                      </tr>
                                    );
                                  })
                                }
                              </tbody>
                              <caption className="text-center">
                                {
                                  !CartProducts.length &&
                                  <div className="w-100 px-2">
                                    <p className="w-100 text-center text-white no-items py-2 rounded">{t("no items")}</p>
                                  </div>
                                }
                              </caption>
                            </table>
                            <div className="cart-total">
                              <p>{t("Cart Total")}</p>
                              <div className="p-2">
                                <div className="total-amount d-flex justify-content-between">
                                  <div>{t("Total Amount")}:</div>
                                  <div>{cartTotal} {countryCurrency}</div>
                                </div>
                                <div className="discount d-flex justify-content-between">
                                  <div>{t('Discount or Coupon')}</div>
                                  <div>0.000 {countryCurrency}</div>
                                </div>
                                <div className="shipping d-flex justify-content-between">
                                  <div>{t("Shipping")}</div>
                                  <div>{(0.05 * cartTotal).toFixed(2)} {countryCurrency}</div>
                                </div>
                                <div className="total d-flex justify-content-between">
                                  <div>{t("Grand Total")}</div>
                                  <div>{(1.05 * cartTotal).toFixed(2)} {countryCurrency}</div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payement-button py-3 text-center">
                    <button ref={paymentButton} disabled type="submit" className="button-disabled" form="order-details">{t("Pay")}</button>
                </div>
            </div>
        </section>
    );
}

export default Checkout;