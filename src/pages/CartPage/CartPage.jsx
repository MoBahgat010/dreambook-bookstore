import "./CartPage.css";
import TestImage from "../../assets/TestImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllCartProducts,
  RemoveThenGetCartProducts,
  UpdateQuantityThenGetCartProducts,
} from "../../RTK/Slices/ProductCartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CartPage() {
  const { RegenerateData } = useSelector((state) => state.Authorization);
  const { FetchedProducts } = useSelector((state) => state.ShopPage);
  const { CartProducts, cartTotal, cartTotalBeforeDiscount } = useSelector((state) => state.Cart);
  const { countryCurrency } = useSelector((state) => state.SelectCountry);
  const [updatedQuantity, setUpdatedQuantity] = useState([]);
  const [productsAvailableQuantities, setProductsAvailableQuantities] =
    useState([]);


  useEffect(() => {
    let temp_array = [];
    let temp_array_qua = [];
    let temp_array_ids = [];
    temp_array_ids = CartProducts.map((product, index) => {
      temp_array[index] = product.quantity;
      return product.product._id;
    });
    let indexing = 0;
    FetchedProducts.forEach((product) => {
      if (temp_array_ids.includes(product._id))
        temp_array_qua[indexing++] = product.quantity;
    });
    setUpdatedQuantity(temp_array);
    setProductsAvailableQuantities(temp_array_qua);
  }, [CartProducts]);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <section className="cart-page pt-5 pb-4">
      <h2 className="text-center mb-4 fs-1">{t("Shopping Cart")}</h2>
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th className="w-50" scope="col">
                {t("Product")}
              </th>
              <th scope="col">{t("Price")}</th>
              <th scope="col">{t("Quantity")}</th>
              <th scope="col">{t("Total")}</th>
            </tr>
          </thead>
          <tbody>
            {CartProducts?.map((product, index) => {
              return (
                <tr key={product.product._id}>
                  <th>
                    <div className="d-flex align-items-center">
                      <div className="image-container d-none d-md-block p-2">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}products/images/${product.product.image}`}
                          alt=""
                        />
                      </div>
                      <div className="product-text px-2">
                        {product.product.title}
                      </div>
                    </div>
                  </th>
                  <td className="text-center">
                    {countryCurrency} {product.priceExchanged.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => {
                          let temp_array = [...updatedQuantity];
                          temp_array[index] > 0 && temp_array[index]--;
                          setUpdatedQuantity(temp_array);
                        }}
                        className="text-white position-relative mb-1 px-1 rounded-pill"
                      >
                        <p className="position-absolute">-</p>
                      </button>
                      <p className="mx-2">{updatedQuantity[index]}</p>
                      <button
                        onClick={() => {
                          let temp_array = [...updatedQuantity];
                          productsAvailableQuantities[index] >
                          updatedQuantity[index]
                            ? temp_array[index]++
                            : toast.error("Insufficient product quantity.");
                          setUpdatedQuantity(temp_array);
                        }}
                        className="text-white position-relative px-1 mb-1 rounded-pill"
                      >
                        <p className="position-absolute">+</p>
                      </button>
                    </div>
                    {product.quantity !== updatedQuantity[index] && (
                      <button
                        onClick={() => {
                          updatedQuantity[index]
                            ? dispatch(
                                UpdateQuantityThenGetCartProducts({
                                  id: product.product._id,
                                  quantity: updatedQuantity[index],
                                })
                              )
                            : dispatch(RemoveThenGetCartProducts(product._id));
                        }}
                      >
                        Save
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    {countryCurrency}{" "}
                    {(product.quantity * product.priceExchanged).toFixed(2)}
                  </td>
                  <td className="text-center cross">
                    <i
                      onClick={() => {
                        dispatch(RemoveThenGetCartProducts(product._id));
                      }}
                      className="fa-solid fa-circle-xmark"
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {!CartProducts.length && (
            <caption className="text-center">
              <div className="w-100 px-2">
                <p className="w-100 text-center text-white no-items py-2 rounded">
                  {t("no items")}
                </p>
              </div>
            </caption>
          )}
        </table>
        <div className="inner-container row">
          <div className="col-12 col-md-6">
            <div className="coupon">
              <p>{t("Coupon")}</p>
              <div className="p-2">
                <input type="text" placeholder={t("Coupon")} />
                <button>{t("Apply")}</button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="cart-total">
              <p>{t("Cart Total")}</p>
              <div className="p-2">
                <div className="total-amount d-flex justify-content-between">
                  <div>{t("Total Amount")}:</div>
                  <div>
                    {countryCurrency} {cartTotalBeforeDiscount}
                  </div>
                </div>
                <div className="discount d-flex justify-content-between">
                  <div>{t("Discount or Coupon")}</div>
                  <div>
                    {countryCurrency}{" "}
                    {(cartTotalBeforeDiscount - cartTotal).toFixed(2)}
                  </div>
                </div>
                <div className="shipping d-flex justify-content-between">
                  <div>{t("Shipping")}</div>
                  <div>
                    {countryCurrency} {0}
                  </div>
                </div>
                <div className="total d-flex justify-content-between">
                  <div>{t("Grand Total")}</div>
                  <div>
                    {countryCurrency} {cartTotal}
                  </div>
                </div>
                <Link to={"/checkout"}>{t("Checkout")}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
