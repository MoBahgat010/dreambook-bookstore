import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import "./ShopPage.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProducts } from "../../RTK/Slices/FetchProductsSlice";

function ShopPage () {

    const { FetchedProducts } = useSelector(state => state.ShopPage); 
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchProducts());
    }, [])

    return (
        <div className="shop-page pb-2 pt-4">
            <div className="container d-flex flex-column-reverse align-items-center align-items-md-start flex-md-row">
                <aside className="filter mt-4 top-5 px-3">
                    <div className="w-100">
                        <div className="department">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>{t("DEPARTEMENTS")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="categories">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>{t("CATEGORIES")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="author">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>{t("AUTHOR")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="publication">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>{t("Publication")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="inner-container row">
                    {
                        FetchedProducts?.map((product, index) => {
                            return (
                                <div key={product.id + `${index}`} className="col-lg-4 p-2 col-md-6 col-12">
                                    <Card key={product._id} id={product._id} newBadge={product.new} image={product.image} title={product.title} price={product.price} />
                                </div>
                            );
                        })
                    }
                    {
                        FetchedProducts?.map((product, index) => {
                            return (
                                <div key={product.id + `${index}`} className="col-lg-4 p-2 col-md-6 col-12">
                                    <Card key={product._id} id={product._id} newBadge={product.new} image={product.image} title={product.title} price={product.price} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ShopPage;