import "./WishList.css"
import TestImage from "../../assets/TestImage.jpg"
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromWishList } from "../../RTK/Slices/ProductsWishListSlice";
import { useTranslation } from "react-i18next";

function WishList() {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const { wishproducts } = useSelector(state => state.WishList);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <section className="wishlist pt-4 pb-2">
            <div className="container">
                <table class="table table-striped position-relative">
                <thead>
                    <tr>
                    <th scope="col">#</th>
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
                                return <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td className="d-none d-md-block">
                                        <div className="image-container">
                                            <img src={TestImage} alt="" />
                                        </div>
                                    </td>
                                    <td className="product-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molestias,
                                    ratione sequi ea aut odit vero architecto atque magnam deserunt illum at dicta recusandae
                                    eum officiis quo mollitia. Autem, nostrum!</td>
                                    <td className="remove-col">
                                        <button onClick={() => {
                                            dispatch(removeProductFromWishList(index));
                                        }} class="btn btn-danger">{t("Remove")}</button>
                                    </td>
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