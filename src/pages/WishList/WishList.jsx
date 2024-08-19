import "./WishList.css"
import TestImage from "../../assets/TestImage.jpg"
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromWishList, RemoveFromWishListAction, RemoveThenGetWishList } from "../../RTK/Slices/ProductsWishListSlice";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function WishList() {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const { wishproducts } = useSelector(state => state.WishList);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <section className="wishlist pt-4 pb-2">
            <div className="container">
                <table className="table table-striped position-relative">
                <thead>
                    <tr>
                    <th className="text-center" scope="col">#</th>
                    {
                        !isSmallScreen &&
                        <th scope="col product-image">{t("Product Image")}</th>
                    }
                    <th scope="col">{t("Product Title")}</th>
                    <th scope="col">{t("Handle")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !wishproducts.length ?
                            <div className="no-items position-absolute left-0 right-0 w-100 p-1">
                                <p className="text-white text-center rounded">{t("No items in wishlist")}</p>
                            </div>
                        :
                            wishproducts.map((product, index) => {
                                return <tr className="position-relative" key={index}>
                                        <th className="text-center" scope="row">{index + 1}</th>
                                        <td className="d-none d-md-block">
                                            <div className="image-container">
                                                <img src={product.image} alt="" />
                                            </div>
                                        </td>
                                        <td className="product-title">{product.title}</td>
                                        <td className="remove-col">
                                            <button onClick={() => {
                                                dispatch(RemoveThenGetWishList(product._id));
                                            }} className="btn btn-danger">{t("Remove")}</button>
                                        </td>
                                        <Link to={`/single-page/${product._id}`}></Link>
                                </tr>
                            })
                    }
                </tbody>
                </table>
            </div>
        </section>
    );
}

export default WishList;