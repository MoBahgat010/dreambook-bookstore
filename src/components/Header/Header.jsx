import { Link } from "react-router-dom";
import "./Header.css"
import bahrain from "../../assets/bahrain.png"
import emirates from "../../assets/emirates.png"
import kuwait from "../../assets/kuwait.png"
import saudiarabia from "../../assets/saudiarabia.png"
import World from "../../assets/world.png"
import logo from "../../assets/logo.png"
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "../../RTK/Slices/SelectedCurrencySlice";
import { changeCountry } from "../../RTK/Slices/SelectedCountrySlice";

function Header() {

    const { countryImg, countryName } = useSelector(state => state.SelectCountry);
    const { currencyName } = useSelector(state => state.SelectedCurrency);
    const { wishproducts } = useSelector(state => state.WishList);
    const dispatch = useDispatch();
    const countriesImages = [ 
        {
            countryImg: bahrain,
            countryName: "Bahrain"
        } , {
            countryImg: kuwait,
            countryName: "Kuwait"
        } , {
            countryImg: World,
            countryName: "World"
        } , {
            countryImg: emirates,
            countryName: "UAE"
        } , {
            countryImg: saudiarabia,
            countryName: "Saudi Arabia"
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

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    const subDropDowns = useRef();

    function renderCountries() {
        return countriesImages.map((country, index) => {
            if(countryName != country.countryName) {
                return (
                    <li onClick={() => {
                        dispatch(changeCountry({ countryImg: country.countryImg, countryName: country.countryName }));
                    }} key={index} className="py-1 py-md-2 d-flex justify-content-between">
                        <p>{country.countryName}</p>
                        <div className="image-container ms-0 ms-md-2 d-flex align-items-center">
                            <img src={country.countryImg} alt="bahrain" />
                        </div>
                    </li>
                );
            }
        })
    }

    function renderCurrencies() {
        return currencies.map((currency, index) => {
            if(currency.currencyName != currencyName)
                return (
                    <li onClick={() => {
                        dispatch(changeCurrency({ currencyName: currency.currencyName, countryName: currency.countryName }));
                    }}><p className="fs-6">{currency.countryName} - {currency.currencyName}</p></li>
                );
        })
    }

    function ManipulateSubDropDowns(order) {
        if (isSmallScreen) {
            if(lastOpenedSubDropDown == order)
                CloseSubDropDowns(lastOpenedSubDropDown);
            else
                ShowSubDropDowns(order);
        }
    }

    function ShowSubDropDowns(order) {
        if(lastOpenedSubDropDown)
            CloseSubDropDowns(lastOpenedSubDropDown);
        console.log("opopop");
        // gsap.to(`nav.lower-one .container .has-dropdown ul`, {
        //     height: "auto",
        //     duration: 0.1,
        //     padding: "0.5rem"
        // })
        subDropDowns.current.classList.toggle("drop-down-active");
        subDropDowns.current.classList.toggle("drop-down-deactive");
        setLastOpenedSubDropDown(order);
    }

    function CloseSubDropDowns(order) {
        // gsap.to(`nav.lower-one .container .has-dropdown ul`, {
        //     height: "0",
        //     duration: 0.1,
        //     padding: "0"
        // })
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
        gsap.to("nav.lower-one", {
           padding: "auto" 
        });
        gsap.to("nav.lower-one .container", {
            height: "auto",
            padding: "0.5rem"
        });
        setIsMenuBarOpen(true);
    }

    function CloseMenuBar() {
        gsap.to("nav.lower-one", {
            padding: "0" 
         });
         gsap.to("nav.lower-one .container", {
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
    }
    
    function CloseSearchBar() {
        gsap.to("nav.middle-one .container .search-bar input", {
            duration: 0.5,
            height: "0rem",
            padding: "0",
            borderWidth: "0"
        })
        setIsSearchBarOpen(false);
    }

    return (
        <header className="position-sticky top-0">
            <nav className="upper-one navbar navbar-expand">
              <div className="container">
                <div className="collapse navbar-collapse flex-column flex-md-row d-flex justify-content-center align-items-center" id="navbarSupportedContent">
                  <ul className="navbar-nav me-0 me-md-auto">
                    <li className="nav-item d-flex align-items-center terms pr-1 p-md-2 p-lg-3">
                      <Link className="active text-white" aria-current="page" href="#">Terms and conditions</Link>
                    </li>
                    <li className="nav-item social-media-li">
                        <div className="w-100 h-100 social-media d-flex align-items-center">
                            <div>
                                <div>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-x-twitter"></i>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="fa-brands fa-instagram"></i>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="email">
                        <Link className="link-li pl-1 pl-md-2 pl-lg-3 text-light d-flex align-items-center w-100 h-100">
                            <div>
                                <i className="fa-regular fa-envelope"></i>
                            </div>
                            <p>Info@darkalemat.com</p>
                        </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav text-white d-flex align-items-center">
                    <li className="p-2 currency position-relative">
                        <p className="mb-0 fs-6 me-3">{currencyName}</p>
                        <div className="arrow position-absolute"></div>
                        <ul className="currency-dropdown p-2 position-absolute">
                            { renderCurrencies() }
                        </ul>
                    </li>
                    <li className="language p-2 ">
                        <p className="mb-0">EN</p>
                    </li>
                    <li className="login p-2 d-flex align-items-center">
                        <Link className="link-li">Login</Link>
                    </li>
                    <li className="current-country position-relative p-2 d-flex align-items-center">
                        <p className="mb-0">Change Country</p>
                        <div className="image-container ms-2 d-flex align-items-center">
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
                <div className="container d-flex justify-content-between">
                    <div className="logo-container">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="search-bar">
                        <div className="icon-container" onClick={() => {
                            ManipulateSearchBar();
                        }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <input type="text" placeholder="Search" />
                        <div className="menu-container px-2 d-block d-md-none" onClick={() => {
                                ManipulateMenuBar();
                            }}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <div className="icons-container pe-4 d-flex align-items-center justify-content-center">
                        <div className="px-2 wishlist position-relative">
                            <Link to={"/wishlist"} className="fa-regular fa-heart"></Link>
                            <div className="position-absolute">{wishproducts.length}</div>
                        </div   >
                        <div className="px-2 cart position-relative">
                            <i className="fa-solid fa-cart-shopping"></i>
                            <div className="position-absolute">0</div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="lower-one navbar navbar-expand">
                <div className="container fw--md-bold d-flex flex-md-row flex-column justify-content-md-evenly align-items-start align-items-md-center">
                    <div className="mb-2 mb-md-0">
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div className="has-dropdown mb-2 mb-md-0 position-relative px-1" onClick={() => {
                        ManipulateSubDropDowns(2);
                    }}>
                        <div className="w-100 h-100 d-flex align-items-center">
                            <Link to={"/shop-page"} className="mb-0 me-2">Books</Link>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <ul ref={subDropDowns} className="pt-md-2 px-md-2 m-0">
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>Oliver Twist</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>A Tale Of Two Cities</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>Robinson Crusoe</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>David Copperfield</p>
                                </Link> 
                            </li>
                        </ul>
                    </div>
                    <div className="has-dropdown mb-2 mb-md-0 px-1">
                        <div className="w-100 h-100 d-flex align-items-center">
                            <Link to={"/shop-page"} className="mb-0 me-2">Staionary</Link>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <ul ref={subDropDowns} className="pt-md-2 px-md-2 m-0">
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>Oliver Twist</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>A Tale Of Two Cities</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>Robinson Crusoe</p>
                                </Link> 
                            </li>
                            <li className="py-2">
                                <Link to={"/shop-page"} className="link-tap">
                                    <p>David Copperfield</p>
                                </Link> 
                            </li>
                        </ul>
                    </div>
                    <div className="mb-2 mb-md-0 px-1">
                        <p className="mb-0">Offers and discounts</p>
                    </div>
                    <div className="mb-2 mb-md-0 px-1 d-flex justify-content-center align-items-center">
                        <Link to={"/shop-page"} className="mb-0 me-2">English Books</Link>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="mb-2 mb-md-0 px-1 d-flex justify-content-center align-items-center">
                        <Link to={"/shop-page"} className="mb-0 me-2">Kids Books</Link>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="mb-2 mb-md-0 px-1 d-flex justify-content-center align-items-center">
                        <Link to={"/shop-page"} className="mb-0 me-2">Learning Languages</Link>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="mb-2 mb-md-0 px-1">
                        <p className="mb-0">About Us</p>
                    </div>
                    <div><p className="mb-0">Contact Us</p></div>
                </div>
            </nav>
        </header>
    );
}

export default Header