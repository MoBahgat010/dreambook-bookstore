import "./CartPage.css"
import TestImage from "../../assets/TestImage.jpg"
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../RTK/Slices/ProductCartSlice";

function CartPage() {

  const { CartProducts } = useSelector(state => state.Cart);
  const dispatch = useDispatch();

    return (
        <section className="cart-page pt-5 pb-4">
            <h2 className="text-center mb-4 fs-1">Shopping Cart</h2>
            <div className="container">
              <table class="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th className="w-50" scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    CartProducts?.map(product => {
                      return (
                        <tr>
                          <th>
                            <div className="d-flex align-items-center">
                                <div className="image-container p-2">
                                    <img src={TestImage} alt="" />
                                </div>
                                <div className="product-text px-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum provident nam mollitia consequuntur sapiente commodi nihil alias, veniam possimus totam!
                                </div>
                            </div>
                          </th>
                          <td className="text-center">BHD 11.000</td>
                          <td className="text-center">2</td>
                          <td className="text-center">BHD 11.000</td>
                          <td className="text-center cross"><i onClick={() => {
                            dispatch(removeProduct(1));
                          }} className="fa-solid fa-circle-xmark"></i></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
                <caption className="text-center">
                  {
                    CartProducts.length ?
                    <button type="button" className="btn w-25">Update</button>
                    :
                    <div className="w-100 px-2">
                      <p className="w-100 text-center text-white no-items py-2 rounded">no items</p>
                    </div>
                  }
                </caption>
              </table>
              <div className="inner-container row">
                <div className="col-12 col-md-6">
                  <div className="coupon">
                    <p>Coupon</p>
                    <div className="p-2">
                      <input type="text" placeholder="Coupon" />
                      <button>Apply</button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="cart-total">
                    <p>Cart Total</p>
                    <div className="p-2">
                      <div className="total-amount d-flex">
                        <div className="me-auto">Total Amount:</div>
                        <div>52.50 AED</div>
                      </div>
                      <div className="discount d-flex">
                        <div className="me-auto">Discount or Coupon</div>
                        <div>AED0.000</div>
                      </div>
                      <div className="shipping d-flex">
                        <div className="me-auto">AED0.000</div>
                        <div>AED0.000</div>
                      </div>
                      <div className="total d-flex">
                        <div className="me-auto">Grand Total</div>
                        <div>52.500</div>
                      </div>
                      <button>Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </section>
    )
}

export default CartPage;