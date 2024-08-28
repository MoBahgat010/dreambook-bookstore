import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import "./ShopPage.css"
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
import i18n from "../../i18n";
import gsap from "gsap";

function ShopPage () {

    const { FetchedProducts } = useSelector(state => state.ShopPage); 
    const { i18n, t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const [pagenumber, setPagenumber] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [reFilter, setReFilter] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [publications, setPublications] = useState([]);
    const [authors, setAuthors] = useState([]);

    const CategoriesCheckBoxes = useRef([]);
    const SubCategoryCheckBoxes = useRef([]);
    const PublicationCheckBoxes = useRef([]);
    const AuthorCheckBoxes = useRef([]);

    function SetShopPage() {
        // let Departements = [t("Learning Languages"), t("Offers and discounts")];
        // let Categories = [t("English Books"), t("Kids Books")];
        let Categories = [];
        let SubCategories = [];
        let Publications = [];
        let Authors = [];
        const currentLangauge = i18n.language;
        console.log(currentLangauge);
        if(currentLangauge === 'en') {
            FetchedProducts.forEach(product => {
                if(!Categories.includes(product.category.englishname))
                    Categories.push(product.category.englishname);
                if(!SubCategories.includes(product.Subcategory.englishname))
                    SubCategories.push(product.Subcategory.englishname);
                if(!Publications.includes(product.publication))
                    Publications.push(product.publication);
                if(!Authors.includes(product.author.name))
                    Authors.push(product.author.name);
            });
        }
        else if(currentLangauge === 'ar') {
            FetchedProducts.forEach(product => {
                console.log(product);
                if(!Categories.includes(product.category.arabicname))
                    Categories.push(product.category.arabicname);
                if(!SubCategories.includes(product.Subcategory.arabicname))
                    SubCategories.push(product.Subcategory.arabicname);
                if(!Publications.includes(product.publication))
                    Publications.push(product.publication);
                if(!Authors.includes(product.author.name))
                    Authors.push(product.author.name);
            });    
        }
        Categories.sort();
        SubCategories.sort();
        Publications.sort();
        Authors.sort();
        setCategories(Categories);
        setSubCategories(SubCategories);
        setPublications(Publications);
        setAuthors(Authors);
        setFilteredProducts(FetchedProducts);
    }

    useEffect(() => {
        SetShopPage();
    }, [FetchedProducts, i18next.language])

    useEffect(() => {
        const currentLangauge = i18next.language;
        console.log(currentLangauge);
        let FilteredProducts = [];
        if(currentLangauge === 'en') {
            FilteredProducts = FetchedProducts.filter(product => {
                for(let i in CategoriesCheckBoxes.current) {
                    if(CategoriesCheckBoxes.current[i].id === "Offers and discounts" && CategoriesCheckBoxes.current[i].checked && Boolean(product.discount))
                        return true;
                    else if(CategoriesCheckBoxes.current[i].checked && product.category.englishname == categories[i])
                        return true;
                }
                for(let i in SubCategoryCheckBoxes.current)
                    if(SubCategoryCheckBoxes.current[i].checked && product.Subcategory.englishname == subCategories[i])
                        return true;
                for(let i in PublicationCheckBoxes.current)
                    if(PublicationCheckBoxes.current[i].checked && product.publication == publications[i])
                        return true;
                for(let i in AuthorCheckBoxes.current)
                    if(AuthorCheckBoxes.current[i].checked && product.author.name == authors[i])
                        return true;
                return false;
            })
        }
        else if(currentLangauge === 'ar') {
            FilteredProducts = FetchedProducts.filter(product => {
                for(let i in CategoriesCheckBoxes.current) 
                    if(CategoriesCheckBoxes.current[i].checked && product.category.arabicname == categories[i])
                        return true;
                for(let i in SubCategoryCheckBoxes.current)
                    if(SubCategoryCheckBoxes.current[i].checked && product.Subcategory.arabicname == subCategories[i])
                        return true;
                for(let i in PublicationCheckBoxes.current)
                    if(PublicationCheckBoxes.current[i].checked && product.publication == publications[i])
                        return true;
                for(let i in AuthorCheckBoxes.current)
                    if(AuthorCheckBoxes.current[i].checked && product.author.name == authors[i])
                        return true;
                return false;
            })
        }
        if(!FilteredProducts.length) {
            for(let i in CategoriesCheckBoxes.current) 
                if(CategoriesCheckBoxes.current[i].checked) {
                    setFilteredProducts(FilteredProducts);
                    return;
                }
            for(let i in SubCategoryCheckBoxes.current)
                if(SubCategoryCheckBoxes.current[i].checked) {
                    setFilteredProducts(FilteredProducts);
                    return;
                }
            for(let i in PublicationCheckBoxes.current)
                if(PublicationCheckBoxes.current[i].checked) {
                    setFilteredProducts(FilteredProducts);
                    return;
                }
            for(let i in AuthorCheckBoxes.current)
                if(AuthorCheckBoxes.current[i].checked) {
                    setFilteredProducts(FilteredProducts);
                    return;
                }
            setFilteredProducts(FetchedProducts);
        }
        else
            setFilteredProducts(FilteredProducts);
        setPagenumber(0);
    }, [reFilter, subCategories, categories])
    
    useEffect(() => {
        // console.log(location.state);
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
            setReFilter(!reFilter);
        }
    }, [location.state?.data, categories, subCategories, i18next.language])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pagenumber])

    function renderPagination() {
        const paginationnumber = Math.ceil(filteredProducts.length / 6.0)
        console.log("paginationnumber");
        console.log(paginationnumber);
        return (
            Array(paginationnumber).fill().map((_, index) => {
                return <li className={index == pagenumber && "active-pagination"} onClick={() => {
                    setPagenumber(index)
                }}>{index + 1}</li>
            })
        );
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
                                categories?.map((category, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{t(category)}</p>
                                            <input id={category} onChange={() => {
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
                                subCategories.map((subCategory, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{subCategory}</p>
                                            <input id={subCategory} onChange={() => {
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
                                authors.map((author, index) => {
                                    return (
                                        <div key={index} className="d-flex justify-content-between align-items-center mt-2 px-2">
                                            <p className="text-capitalize">{author}</p>
                                            <input id={author} onChange={() => {
                                                setReFilter(!reFilter);
                                                navigate(location.pathname, {});
                                            }} ref={ele => AuthorCheckBoxes.current[index] = ele} type="checkbox" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="publication mb-5">
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
                        </div>
                    </div>
                </aside>
                <div className="inner-container row">
                    {
                        filteredProducts.slice(pagenumber * 6, (pagenumber + 1) * 6).map((product, index) => {
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