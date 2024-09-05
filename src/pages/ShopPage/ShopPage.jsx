import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import "./ShopPage.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
import i18n from "../../i18n";
import gsap from "gsap";
import { ClearFilteredProducts, FetchProducts, GetSpecificCategory, GetSpecificSubCategory, SetFilterStatus } from "../../RTK/Slices/FetchProductsSlice";

function ShopPage () {

    const { FetchedProducts, filteredProducts, allCategories, allSubCategories, totalPages, startToFilter, allAuthors } = useSelector(state => state.ShopPage); 
    const { i18n, t } = useTranslation();

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [pagenumber, setPagenumber] = useState(0);
    const [reFilter, setReFilter] = useState(true);
    // const [categories, setCategories] = useState([]);
    // const [subCategories, setSubCategories] = useState([]);

    const CategoriesCheckBoxes = useRef([]);
    const SubCategoryCheckBoxes = useRef([]);
    const PublicationCheckBoxes = useRef([]);
    const AuthorCheckBoxes = useRef([]);

    console.log(filteredProducts)

    useEffect(() => {
        if(startToFilter)
            dispatch(FetchProducts(pagenumber + 1));
    }, [pagenumber])

    function FilterProducts() {
        dispatch(ClearFilteredProducts());
        let flag = false;
        console.log(CategoriesCheckBoxes.current[0]);
        for(let i in CategoriesCheckBoxes.current) {
            if(CategoriesCheckBoxes.current[i].checked) {
                console.log("true status")
                flag = true;
                dispatch(GetSpecificCategory(CategoriesCheckBoxes.current[i].id));
            }
        }
        for(let i in SubCategoryCheckBoxes.current) {
            if(SubCategoryCheckBoxes.current[i].checked) {
                flag = true;
                dispatch(GetSpecificSubCategory(SubCategoryCheckBoxes.current[i].id));
            }
        }
        console.log("Please send smth: ", flag)
        dispatch(SetFilterStatus(flag));
        setPagenumber(0);
    }

    useEffect(() => {
        FilterProducts();
    }, [reFilter, allCategories, allSubCategories])
    
    useEffect(() => {
        if(location.state?.data != "") {
            for(let i in CategoriesCheckBoxes.current) {
                if(CategoriesCheckBoxes.current[i].id == location.state?.data) {
                    CategoriesCheckBoxes.current[i].checked = true;
                    break;
                }
            }
            for(let i in SubCategoryCheckBoxes.current) {    
                if(SubCategoryCheckBoxes.current[i].id == location.state?.data) {
                    SubCategoryCheckBoxes.current[i].checked = true;
                    break;
                }
            }
            FilterProducts();
        }
    }, [location.state?.data, allCategories, allSubCategories, i18next.language])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pagenumber])

    function renderPagination() {
        console.log("Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaamn")
        console.log(startToFilter)
        return (
            startToFilter ?
                Array(Math.ceil(filteredProducts.length > 0 ? filteredProducts.length / 20.0 : 1)).fill().map((_, index) => {
                    return <li className={index == pagenumber && "active-pagination"} onClick={() => {
                        setPagenumber(index)
                    }}>{index + 1}</li>
                })
            :
                Array(totalPages).fill().map((_, index) => {
                    return <li className={index == pagenumber && "active-pagination"} onClick={() => {
                        setPagenumber(index)
                    }}>{index + 1}</li>
                })
        )
    }

    return (
        <div className="shop-page pb-2 pt-4">
            <div className="container d-flex flex-column-reverse align-items-center align-items-md-start flex-md-row">
                <aside className="filter mt-4 top-5 px-3">
                    <div className="w-100">
                        <div className="department mb-5">
                            <div className="d-flex px-1 rounded bg-white justify-content-between">
                                <p>{t("DEPARTEMENTS")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                            {
                                allCategories?.map((category, index, array) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{t(category.name)}</p>
                                            <input id={category._id} onChange={() => {
                                                setReFilter(!reFilter);
                                                navigate(location.pathname, {});
                                            }} ref={ele => CategoriesCheckBoxes.current[index] = ele} type="checkbox" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="categories mb-5">
                            <div className="d-flex px-1 rounded bg-white justify-content-between">
                                <p>{t("CATEGORIES")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                            {
                                allSubCategories.map((subCategory, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{i18n.language === 'en' ? subCategory.englishname : subCategory.arabicname}</p>
                                            <input id={subCategory._id} onChange={() => {
                                                setReFilter(!reFilter);
                                                navigate(location.pathname, {});
                                            }} ref={ele => SubCategoryCheckBoxes.current[index] = ele} type="checkbox" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="author mb-5">
                            <div className="d-flex px-1 rounded bg-white justify-content-between">
                                <p>{t("AUTHOR")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                            {
                                allAuthors.map((author, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{author.name}</p>
                                            <input id={author._id} onChange={() => {
                                                setReFilter(!reFilter);
                                                navigate(location.pathname, {});
                                            }} ref={ele => AuthorCheckBoxes.current[index] = ele} type="checkbox" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <div className="publication mb-5">
                            <div className="d-flex px-1 rounded bg-white justify-content-between">
                                <p>{t("Publication")}</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                            {
                                publications.map((publication, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-uppercase">{publication}</p>
                                            <input id={publication} onChange={() => {
                                                setReFilter(!reFilter);
                                                navigate(location.pathname, {});
                                            }} ref={ele => PublicationCheckBoxes.current[index] = ele} type="checkbox" />
                                        </div>
                                    )
                                })
                            }
                        </div> */}
                    </div>
                </aside>
                <div className="inner-container row">
                    {
                        startToFilter ?
                        filteredProducts.slice(pagenumber * 20, (pagenumber + 1) * 20).map((product, index) => {
                                return (
                                    <div key={product.id + `${index}`} className="col-lg-4 p-2 col-md-6 col-12">
                                        <Card key={product._id} discount={Math.round((product.price - product.priceAfterDiscount) / product.price * 100)} id={product._id} newBadge={product.new} image={product.image} title={product.title} price={product.price} />
                                    </div>
                                );
                            })
                        :
                        FetchedProducts.map((product, index) => {
                                return (
                                    <div key={product.id + `${index}`} className="col-lg-4 p-2 col-md-6 col-12">
                                        <Card key={product._id} discount={Math.round((product.price - product.priceAfterDiscount) / product.price * 100)} id={product._id} newBadge={product.new} image={product.image} title={product.title} price={product.price} />
                                    </div>
                                );
                            })
                    }
                    <ul className="pagination d-flex justify-content-center flex-wrap gap-1 px-5 mt-4">
                        { renderPagination() }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ShopPage;