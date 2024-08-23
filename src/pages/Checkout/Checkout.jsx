import { useRef, useState } from "react";
import "./Checkout.css"

import TestImage from "../../assets/TestImage.jpg"
import VisaMasterCard from "../../assets/visa_master.jpeg"
import CashOnDelivery from "../../assets/cash_on_delivery.png"
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../RTK/Slices/ProductCartSlice";
import { useTranslation } from "react-i18next";

function Checkout() {

    const { t } = useTranslation();

    const FirstName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Mobile = useRef();
    const Country = useRef();
    const Block = useRef();
    const Gada = useRef();
    const Building = useRef();
    const Street = useRef();
    const Flat = useRef();
    const Floor = useRef();
    const PaciNo = useRef();
    const OrderNotes = useRef();

    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const { CartProducts, cartTotal } = useSelector(state => state.Cart);
    const dispatch = useDispatch();
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);

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
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                e.target.reset();
                            }} className=" w-100">
                                <div className="d-flex gap-1 py-4 w-100">
                                    <div className="w-100">
                                        <input ref={FirstName} required className="w-100 p-2" type="text" placeholder={t("First Name")} />
                                    </div>
                                    <div className="w-100">
                                        <input ref={LastName} required className="w-100 p-2" type="text" placeholder={t("Last Name")} />
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input ref={Email} required className="w-100 p-2" type="emial" placeholder={t("Email")} />
                                </div>
                                <div className="w-100 py-4">
                                    <input ref={Mobile} required className="w-100 p-2" type="tel" placeholder={t("Mobile")} />
                                </div>
                                <select ref={Country} onInput={() => {
                                    Country.current.value == "Select Country" ? setShowPaymentMethods(false) : setShowPaymentMethods(true);
                                }} required className="form-select p-2 form-select-lg" aria-label="Large select example">
                                  <option selected>{t("Select Country")}</option>
                                  <option value="egypt">Egypt</option>
                                </select>
                                <div className="w-100 py-4">
                                    <input ref={Block} required className="w-100 p-2" type="text" placeholder={t("Block")} />
                                </div>
                                <div className="d-flex gap-1 w-100">
                                    <div className="w-100">
                                        <input ref={Gada} required className="w-100 p-2" type="text" placeholder={t("Gada")} />
                                    </div>
                                    <div className="w-100">
                                        <input ref={Building} required className="w-100 p-2" type="text" placeholder={t("Building")} />
                                    </div>
                                </div>
                                <div className="w-100 py-4">
                                    <input ref={Street} required className="w-100 p-2" type="text" placeholder={t("Street")} />
                                </div>
                                <div className="d-flex w-100">
                                    <div className="pe-1">
                                        <input ref={Flat} required className="w-100 p-2" type="text" placeholder={t("Flat")} />
                                    </div>
                                    <div className="px-1">
                                        <input ref={Floor} required className="w-100 p-2" type="text" placeholder={t("Floor")} />
                                    </div>
                                    <div className="ps-1">
                                        <input ref={PaciNo} required className="w-100 p-2" type="text" placeholder={t("Paci No")} />
                                    </div>
                                </div>
                                <div className="w-100 pt-4">
                                    <textarea ref={OrderNotes} required className="w-100 p-2" type="text" placeholder={t("Order Notes")} />
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
                                    <p>{t("Payement Method")}</p>
                                </div>
                            </div>
                            {
                                showPaymentMethods ?
                                    <form id="payment-method" className="d-flex align-items-center justify-content-evenly py-2">
                                        <div className="d-flex">
                                            <input type="radio" name="payement-method" id="visa-master" value="visa"/>
                                            <label htmlFor="visa-master">
                                                <img src={VisaMasterCard} alt="" />
                                            </label>
                                        </div>
                                        <div>
                                            <input type="radio" name="payement-method" id="cash-on-delivey" value="cash"/>
                                            <label htmlFor="cash-on-delivey">
                                                <img src={CashOnDelivery} alt="" />
                                            </label>
                                        </div>
                                    </form>
                                :
                                    <p className="my-3 px-4 py-3 rounded-pill bg-warning">{t("No Country Message")}</p>
                            }
                            <div className="title d-flex align-items-center p-1">
                                <div>
                                    <div className="step-one px-3 py-2 text-white">
                                        3
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
                                                  <img src={product.image} alt="" />
                                              </div>
                                              <div className="product-text text-center px-2">
                                                <strong>Girl, Missing</strong>
                                                <p>Code <strong>:202300719</strong></p>
                                                <p>Author <strong>:Sophie McKenzie</strong></p>
                                                <p>Publication <strong>:Simon & Schuster</strong></p>
                                                <p>Physical Book</p>
                                              </div>
                                          </div>
                                        </th>
                                        <td className="text-center">{countryCurrency} {product.price}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{countryCurrency} {product.quantity * product.price}</td>
                                        <td className="text-center cross"><i onClick={() => {
                                          dispatch(removeProduct({ id: product.id, quantity: product.quantity, price:product.price }));
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
                                  <div>{cartTotal} AED</div>
                                </div>
                                <div className="discount d-flex justify-content-between">
                                  <div>{t('Discount or Coupon')}</div>
                                  <div>AED0.000</div>
                                </div>
                                <div className="shipping d-flex justify-content-between">
                                  <div>{t("Shipping")}</div>
                                  <div>{0.05 * cartTotal} AED</div>
                                </div>
                                <div className="total d-flex justify-content-between">
                                  <div>{t("Grand Total")}</div>
                                  <div>{1.05 * cartTotal}</div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payement-button py-3 text-center">
                    <button type="button">{t("Pay")}</button>
                </div>
            </div>
        </section>
    );
}

export default Checkout;