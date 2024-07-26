import "./SinglePage.css"
import TestImage from "../../assets/TestImage.jpg"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../RTK/Slices/ProductCartSlice";

function SinglePage() {

    const { currencyName } = useSelector(state => state.SelectedCurrency);
    const dispatch = useDispatch();

    const [isLiked, setIsLiked] = useState(false);
    const [quantity, setQuantity] = useState(0);
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

    return (
        <section className="single-page py-5">
            <div className="container">
                <div className="inner-container fw-bolder row">
                    <div className="image-container px-2 col-12 col-md-6">
                        <img src={TestImage} alt="" />
                    </div>
                    <div className="data col-12 col-md-6">
                        <div className="upper-data">
                            <h1>the psychology of money</h1>
                            <span>11.000 {currencyName}</span>
                            <div className="review overflow-hidden position-relative mt-5">
                                <div className="hollow-stars d-flex">
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div className="solid-stars d-flex">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </div>
                                <p className="mt-1 mb-3">0 Reviews</p>
                                <div className="d-flex align-items-center">
                                    <div className="pe-1">
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
                                    <button type="button" className="btn btn-secondary">Add Review</button>
                                </div>
                                <div className="select-quantity mt-2 d-flex align-items-center">
                                    <div className="d-flex pe-1">
                                        <button onClick={() => {
                                            quantity && setQuantity(quantity - 1);
                                        }} className="text-white fs-3 py-1 px-3">-</button>
                                        <div className="p-2 d-flex bg-light-subtle align-items-center">{quantity}</div>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-white fs-3 py-1 px-3">+</button>
                                    </div>
                                    <div className="ps-1">
                                        <button onClick={() => {
                                            dispatch(addProduct(1));
                                        }} type="button" className="h-100 text-white rounded-pill py-2 px-4">Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lower-data mt-3">
                            <table class="table table-striped table-bordered">
                                <tbody>
                                  <tr>
                                      <td>Departement</td>
                                      <td>Books</td>
                                  </tr>
                                  <tr>
                                      <td>Category</td>
                                      <td>Articles</td>
                                  </tr>
                                  <tr>
                                      <td>Author</td>
                                      <td>John Doe</td>
                                  </tr>
                                  <tr>
                                      <td>Publication</td>
                                      <td>EM</td>
                                  </tr>
                                  <tr>
                                      <td>Page Count</td>
                                      <td>368</td>
                                  </tr>
                                  <tr>
                                        <td>Weight ( Grams )</td>
                                        <td>400</td>
                                  </tr>
                                  <tr>
                                        <td>Code</td>
                                        <td>1000005440</td>
                                  </tr>
                                  <tr>
                                        <td>Availability</td>
                                        <td>In STock</td>
                                  </tr>
                                  <tr>
                                        <td>Views</td>
                                        <td>315</td>
                                  </tr>
                                  <tr>
                                        <td className="me-auto">Stocks</td>
                                        <td>321</td>
                                  </tr>
                                </tbody>
                            </table>
                            <div className="more-options d-flex">
                                <div className="like me-auto position-relative p-2 px-3 bg-info" onClick={() => {
                                    setLiked();
                                }}>
                                    <i class="fa-regular fa-heart"></i>
                                    <i ref={WholeHeart} class="fa-solid fa-heart"></i>
                                </div>
                                <div className="pe-2 d-flex">
                                    <div className="pe-1">
                                        <div className="facebook p-2 px-3 bg-info">
                                            <i class="fa-brands fa-facebook-f"></i>
                                        </div>
                                    </div>
                                    <div className="ps-1">
                                        <div className="facebook p-2 px-3 bg-info">
                                            <i class="fa-brands fa-x-twitter"></i>
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