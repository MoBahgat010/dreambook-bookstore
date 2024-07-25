import "./CartPage.css"
import TestImage from "../../assets/TestImage.jpg"

function CartPage() {
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
                  <td className="text-center cross"><i class="fa-solid fa-circle-xmark"></i></td>
                </tr>
              </tbody>
              <caption className="text-center">
                <button type="button" className="btn w-25">Update</button>
              </caption>
            </table>
            </div>
        </section>
    )
}

export default CartPage;