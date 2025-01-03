import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Header.css"
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import World from "../../assets/world.png"
import logo from "../../assets/logo.png"
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { changeCurrency } from "../../RTK/Slices/SelectedCurrencySlice";
import { ChangeCountry, ChangeCurrency, changeCurrency } from "../../RTK/Slices/SelectedCountrySlice";
import { hideSearchComponent, showComponents, showSearchComponent } from "../../RTK/Slices/ComponentsSlice";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { GetAllWishedProducts } from "../../RTK/Slices/ProductsWishListSlice";
import axios from "axios";
import Search from "../Search/Search";
import { GetAllCartProducts } from "../../RTK/Slices/ProductCartSlice";
import { LogOut, RedirectExecutionAction, RedirectToLoginAction } from "../../RTK/Slices/AuthorizationSlice";
import { GetAllAuthors, GetAllCategories, GetAllSubCategories, setBaseFilter } from "../../RTK/Slices/FetchProductsSlice";

function Header() {

    const { i18n, t } = useTranslation();

    // const { login_token } = useSelector(state => state.Authorization);

    const { SearchBarComponent } = useSelector(state => state.Components);
    const { countryImg, countryName, countryCurrency } = useSelector(state => state.SelectCountry);
    const { allCategories, allSubCategories } = useSelector(state => state.ShopPage);
    // const { logged } = useSelector(state => state.Authorization);
    const { wishproducts } = useSelector(state => state.WishList);
    const { CartProducts } = useSelector(state => state.Cart);
    const { RedirectToLogin } = useSelector(state => state.Authorization);
    const dispatch = useDispatch();
    // const [booksCategory, setBooksCategory] = useState([]);
    // const [stationaryCategory, setStationaryCategory] = useState([]);
    // const [kidsBooksCategory, setKidsBooksCategory] = useState([]);
    // const [learningLanguagesCategory, setLearningLanguagesCategory] = useState([]);
    // const [englishBooksCategory, setEnglishBooksCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [otherCategories, setOthercategories] = useState([]);
    let currencyName = countryCurrency;

    useEffect(() => {   // destroy is not a function is an error due to that useEffect function has to be sync not asnyc
        let AllCategoriesMap = new Map();
        let OtherCategories = [];
        allCategories.forEach(category => {
            AllCategoriesMap.set(category, []);
            allSubCategories.forEach(subcategory => {
                if(subcategory.category._id == category._id)
                    AllCategoriesMap.get(category).push(subcategory);
                })
        })
        AllCategoriesMap = Array.from(AllCategoriesMap);
        if(AllCategoriesMap.length > 3)
            OtherCategories = AllCategoriesMap.splice(3);
        setCategories(AllCategoriesMap);
        setOthercategories(OtherCategories);
    }, [allCategories,  allSubCategories])

    useEffect(() => {
        dispatch(GetAllCategories());
        dispatch(GetAllSubCategories());
        // dispatch(GetAllAuthors());
    }, [countryCurrency, i18n.language])

    const countriesImages = [ 
        {
            countryImg: bahrain,
            currencyName: "BHD",
            countryName: t("Bahrain")
        } , {
            countryImg: kuwait,
            currencyName: "KWD",
            countryName: t("Kuwait")
        } , {
            countryImg: World,
            currencyName: "KWD",
            countryName: t("World")
        } , {
            countryImg: emirates,
            currencyName: "AED",
            countryName: t("UAE")
        } , {
            countryImg: saudiarabia,
            currencyName: "SAR",
            countryName: t("SaudiArabia")
        }    
    ];
    const currencies = [
        {
            currencyName: "BHD",
            countryName: "Bahrain"
        } , {
            currencyName: "KWD",
            countryName: "Kuwait"
        } , {
            currencyName: "AED",
            countryName: "UAE"
        } , {
            currencyName: "SAR",
            countryName: "Saudi Arabia"
        } , {
            currencyName: "USD",
            countryName: "USA"
        } , {
            currencyName: "EUR",
            countryName: "Europe"
        } , {
            countryName: "Oman",
            currencyName: "OMR",
        } , {
            currencyName: "QAR",
            countryName: "Quatar"
        } , {
            currencyName: "GBP",
            countryName: "British"
        }
    ];

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
    const [lastOpenedSubDropDown, setLastOpenedSubDropDown] = useState(0);
    const [searchBarStatus, setSearchBarStatus] = useState(false);
    const [searchBarValue, setSearchBarValue] = useState("");
    const [headerHeight, setHeaderHeight] = useState(0);

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    const subDropDowns = useRef();
    const headerComponenet = useRef();

    function renderCountries() {
        return countriesImages.map((country, index) => {
            if(countryName != country.countryName) {
                return (
                    <li onClick={() => {
                        dispatch(ChangeCountry({ countryImg: country.countryImg, countryName: country.countryName, countryCurrency: country.currencyName }));
                    }} key={index} className="py-1 py-md-2 d-flex align-items-center justify-content-between">
                        <p className="me-2 me-md-0">{t(country.countryName)}</p>
                        <div className="image-container ms-0 ms-md-2 d-flex align-items-center">
                            <img src={country.countryImg} alt={t(country.countryName)} />
                        </div>
                    </li>
                );
            }// } else
            //     dispatch(changeCurrency({ currencyName: country.currencyName, countryName: country.countryName }));
        })
    }

    function renderCurrencies() {
        return currencies.map((currency, index) => {
            if(currency.currencyName != currencyName)
                return (
                    <li key={index} onClick={() => {
                        dispatch(ChangeCurrency(currency.currencyName));
                    }}><p className="fs-6">{currency.countryName} - {currency.currencyName}</p></li>
                );
        })
    }

    function ManipulateSubDropDowns(order) {
        if (isSmallScreen) {
            if(!lastOpenedSubDropDown)
                ShowSubDropDowns(order);
            else if (lastOpenedSubDropDown == order)
                CloseSubDropDowns(order);
            else {
                CloseSubDropDowns(lastOpenedSubDropDown);
                ShowSubDropDowns(order);
            }
        }
    }

    function ShowSubDropDowns(order) {
        gsap.to(`nav.lower-one .container .has-dropdown:nth-child(${order}) ul`, {
            duration: 0.1,
            gridTemplateRows: "1fr"
        })
        setLastOpenedSubDropDown(order);
    }
    
    function CloseSubDropDowns(order) {
        gsap.to(`nav.lower-one .container .has-dropdown:nth-child(${order}) ul`, {
            duration: 0.1,
            gridTemplateRows: "0fr"
        })
        setLastOpenedSubDropDown(0);
    }

    function ManipulateSearchBar() {
        if (isSmallScreen) 
            isSearchBarOpen ? CloseSearchBar() : ShowSearchBar()
    }

    function ManipulateMenuBar() {
        if(isSmallScreen)
            isMenuBarOpen ? CloseMenuBar() : ShowMenuBar()
    }

    function ShowMenuBar() {
        gsap.to("nav.lower-one > .container", {
           padding: "auto" 
        });
        gsap.to("nav.lower-one .container", {
            height: "auto",
            padding: "0.5rem"
        });
        setIsMenuBarOpen(true);
        CloseSearchBar();
    }

    function CloseMenuBar() {
        gsap.to("nav.lower-one > .container", {
            padding: "0" 
         });
         gsap.to("nav.lower-one > .container", {
             height: "0",
             padding: "0"
         });
         setIsMenuBarOpen(false);
    }

    function ShowSearchBar() {
        gsap.to("nav.middle-one .container .search-bar input", {
            duration: 0.5,
            height: "3rem",
            padding: "0.5rem",
            borderWidth: "2px"
        })
        setIsSearchBarOpen(true);
        dispatch(showSearchComponent());
        CloseMenuBar();
    }
    
    function CloseSearchBar() {
        gsap.to("nav.middle-one .container .search-bar input", {
            duration: 0.5,
            height: "0rem",
            padding: "0",
            borderWidth: "0"
        })
        setIsSearchBarOpen(false);
        dispatch(hideSearchComponent());
    }

    useEffect(() => {
        if(isSmallScreen)
            CloseSearchBar();
    }, [SearchBarComponent])

    useEffect(() => {
        setHeaderHeight(headerComponenet.current.getBoundingClientRect().height);
    }, [])

    return (
        <header ref={headerComponenet}>
            <nav className="upper-one navbar navbar-expand">
              <div className="container">
                <div className="collapse navbar-collapse flex-column flex-md-row d-flex justify-content-center justify-content-md-between align-items-center" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item d-flex align-items-center terms pe-1 p-lg-3">
                      <Link onClick={() => {
                        dispatch(hideSearchComponent());
                      }} className="active terms-link text-white" aria-current="page" href="#">{t('Terms and Conditions')}</Link>
                    </li>
                    <li className="nav-item social-media-li">
                        <div className="w-100 h-100 social-media d-flex align-items-center">
                            <div>
                                <Link onClick={() => {
                                    dispatch(hideSearchComponent());
                                }} className="d-block" to={"https://api.whatsapp.com/send/?phone=96551455511&text&type=phone_number&app_absent=0"}>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </Link>
                            </div>
                            <div>
                                <Link onClick={() => {
                                    dispatch(hideSearchComponent());
                                }}>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </Link>
                            </div>
                            <div>
                                <Link onClick={() => {
                                    dispatch(hideSearchComponent());
                                }}>
                                    <i className="fa-brands fa-x-twitter"></i>
                                </Link>
                            </div>
                            <div>
                                <Link onClick={() => {
                                    dispatch(hideSearchComponent());
                                }} className="d-block" to={"https://www.instagram.com/dreambookq8/"}>
                                    <i className="fa-brands fa-instagram"></i>
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="email">
                        <Link onClick={() => {
                            dispatch(hideSearchComponent());
                        }} className="link-li text-light d-flex align-items-center w-100 h-100">
                            <div>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <p>info@dardreambook.com</p>
                        </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav px-0 px-md-1 px-lg-2 text-white d-flex align-items-center">
                    <li className="p-2 currency position-relative">
                        <p className="mb-0 fs-6 me-3">{currencyName}</p>
                        <div className="arrow position-absolute"></div>
                        <ul className="currency-dropdown p-2 position-absolute">
                            { renderCurrencies() }
                        </ul>
                    </li>
                    <li className="language p-2 ">
                        <button style={{backgroundColor: "transparent", border: "none", color: "white"}} onClick={() => {
                            const newLang = i18n.language === 'en' ? 'ar' : 'en';
                            i18n.changeLanguage(newLang);
                            document.documentElement.classList.toggle("arabic-format");
                        }} className="mb-0">{i18n.language === 'en' ? 'EN' : 'عربي'}</button>
                    </li>
                    <li className="login p-2 d-flex align-items-center">
                        {
                            RedirectToLogin ?
                                <Link onClick={() => {
                                    // dispatch(RedirectToLoginAction(true));
                                    // dispatch(RedirectExecutionAction(true));
                                    dispatch(hideSearchComponent());
                                }} to={"login"} className="link-li">{t('Login')}</Link>
                            :
                                <button onClick={() => {
                                    dispatch(LogOut());
                                }}>Logout</button>
                        }
                    </li>
                    <li className="current-country position-relative ps-1 p-lg-2 d-flex align-items-center">
                        <div className="w-75 d-flex align-items-center">
                            <p className="mb-0">{t('Change Country')}</p>
                        </div>
                        <div className="image-container mx-2 w-25 d-flex align-items-center">
                            <img src={countryImg} alt="bahrain" />
                        </div>
                        <ul className="country-dropdown position-absolute">
                            { renderCountries() }
                        </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav className="middle-one navbar navbar-expand bg-white">
                <div className="container d-flex justify-content-md-between justify-content-evenly">
                    <div className="logo-container">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="search-bar">
                        <div className="icon-container" onClick={() => {
                            ManipulateSearchBar();
                        }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input onFocus={() => {
                            dispatch(showSearchComponent());
                        }} onChange={(e) => {                            
                            setSearchBarValue(e.target.value);
                        }} type="text" placeholder={t("Search")} />
                        <div className="menu-container px-2 d-block d-md-none" onClick={() => {
                                ManipulateMenuBar();
                            }}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <div className="icons-container d-flex align-items-center justify-content-center">
                        <Link onClick={() => {
                            dispatch(hideSearchComponent());
                        }} to={"/wishlist"} className="d-block px-2 wishlist position-relative">
                            <i className="fa-regular fa-heart"></i>
                            <div className="position-absolute">{wishproducts?.length == undefined ? 0 : wishproducts.length}</div>
                        </Link>
                        <div onClick={() => {
                            dispatch(showComponents());
                        }} className="px-2 cart position-relative">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className="position-absolute">{CartProducts ? CartProducts.length : 0}</div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="lower-one navbar navbar-expand position-relative">
                <div className="container py-md-0 fw-md-bold d-flex flex-md-row flex-column justify-content-md-evenly align-items-start align-items-md-center">
                    <div className="pt-0 pt-md-2 mb-md-0">
                        <Link onClick={() => {
                            dispatch(hideSearchComponent());
                            isSmallScreen &&
                            CloseMenuBar();
                        }} to={"home"}>{t('Home')}</Link>
                    </div>
                    {
                        categories.map(([category, subCategories], index) => {
                            return (
                                <div key={index} className="has-dropdown mb-md-0 position-relative px-1" onClick={() => ManipulateSubDropDowns(index + 2)}>
                                    <div className="w-100 h-100 d-flex align-items-center">
                                        <Link onClick={(e) => {
                                            e.stopPropagation();
                                            isSmallScreen &&
                                                CloseMenuBar();
                                            dispatch(hideSearchComponent());
                                        }} to={"/shop-page"} state={{data: category._id}} className="mb-0 mx-2">{category.name}</Link>
                                        <i className="fa-solid fa-caret-down"></i>
                                    </div>
                                    <ul ref={subDropDowns} className="px-md-2 m-0">
                                        <div>
                                            {
                                                subCategories.map(subCategory => {
                                                    return (
                                                        <li key={subCategory._id} className="py-2">
                                                            <Link onClick={() => {
                                                                dispatch(hideSearchComponent());
                                                                isSmallScreen &&
                                                                    CloseMenuBar();
                                                            }} to={"/shop-page"} state={{data: subCategory._id}} className="link-tap">
                                                                <p>{i18n.language === 'en' ? subCategory.englishname : subCategory.arabicname}</p>
                                                            </Link> 
                                                        </li>
                                                    );
                                                })
                                            }
                                        </div>
                                    </ul>
                                </div>
                            );
                        })
                    }
                    {
                        otherCategories.length != 0  &&
                        <div className="has-dropdown others mb-md-0 position-relative px-1" onClick={() => ManipulateSubDropDowns(categories.length + 2)}>
                            <div className="w-100 h-100 d-flex align-items-center">
                                <Link onClick={(e) => {
                                    e.stopPropagation();
                                    isSmallScreen &&
                                        CloseMenuBar();
                                    dispatch(hideSearchComponent());
                                }} to={"/shop-page"} className="mb-0 mx-2">{t('More')}</Link>
                                <i className="fa-solid fa-caret-down"></i>
                            </div>
                            <ul ref={subDropDowns} className="px-md-2 m-0">
                                <div>
                                    {
                                        otherCategories.map(([category, subCategories], index) => {
                                            return (
                                                <li key={category._id} className="py-2 position-relative">
                                                    <Link onClick={() => {
                                                        dispatch(hideSearchComponent());
                                                        isSmallScreen &&
                                                            CloseMenuBar();
                                                    }} to={"/shop-page"} state={{data: category._id}} className="link-tap">
                                                        <p>{category.name}</p>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </div>
                            </ul>
                        </div>
                    }
                    <Link onClick={() => {
                        dispatch(hideSearchComponent())
                        isSmallScreen &&
                            CloseMenuBar();
                    }} to={"/about-us"} className="mb-2 mb-md-0 px-1">
                        <p className="mb-0">{t("About Us")}</p>
                    </Link>
                    <Link onClick={() => {
                        dispatch(hideSearchComponent())
                        isSmallScreen &&
                            CloseMenuBar();
                    }} to={"/contact-us"}><p className="mb-0">{t('Contact Us')}</p></Link>
                </div>
                <Search searchText={searchBarValue} header_height={headerHeight} />
            </nav>
        </header>
    );
}

export default Header

/* =============================== Note for drop downs =============================== */
/* divs with className has-dropdown are the divs which can display drop down only */