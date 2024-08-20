import { useDispatch, useSelector } from "react-redux";
import "./Search.css"
import { useTranslation } from "react-i18next";
import { removeProduct, RemoveThenGetCartProducts } from "../../RTK/Slices/ProductCartSlice";
import gsap from "gsap";
import { useEffect, useState } from "react";
import axios from "axios";
import { hideSearchComponent } from "../../RTK/Slices/ComponentsSlice";
import { Link } from "react-router-dom";

function Search(props) {

    const { token } = useSelector(state => state.Authorization);

    const { searchComponent } = useSelector(state => state.Components);
    const { countryCurrency } = useSelector(state => state.SelectCountry);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
      const ScrollY = window.scrollY;
      // console.log(searchComponent);
      if(searchComponent) {
        gsap.to(".search-part", {
          duration: 0.2,
          height: `calc(100dvh - ${props.header_height - ScrollY}px)`
        });
        gsap.to("html", {
          overflow: "hidden"
        })
      } else {
        gsap.to(".search-part", {
          duration: 0.2,
          height: "0"
        });
        gsap.to("html", {
          overflow: "visible"
        })
      }
    }, [searchComponent])

    useEffect(() => {  
      // console.log(props.searchText != "" ? props.searchText : null);    
      axios.get('http://localhost:3500/api/v1/products/', {
        params: {
          'keyword': props.searchText != "" ? props.searchText : -1
        },
        headers: {
          'currency': countryCurrency
        }
      })
      .then(response => {
        // console.log(response);
        setSearchResults(response.data.result);
      })
      // console.log(searchResults.length);
    }, [props.searchText])

    return (
        <div className="search-part">
            <div className="container">
              <div className="d-flex align-items-center my-2 mt-md-0 justify-content-between">
                <p className="text-white">Search</p>
                <button className="d-none d-md-block" onClick={() => {
                  dispatch(hideSearchComponent());
                }}>Close</button>
              </div>
              <div className="inner-container row">
                  {
                    <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th className="w-50" scope="col">{t("Product")}</th>
                        <th scope="col">{t("Price")}</th>
                        <th scope="col">{t("Quantity")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        searchResults?.map(product => {
                          return (
                            <tr key={product._id}>
                              <th>
                                <div className="d-flex align-items-center">
                                    <div className="image-container d-none d-md-block p-2">
                                        <img src={product.image} alt="" />
                                    </div>
                                    <div className="product-text px-2">
                                        {product.title}
                                    </div>
                                </div>
                              </th>
                              <td className="text-center">{countryCurrency} {product.price}</td>
                              <td className="text-center">{product.quantity}</td>
                              <Link onClick={() => {
                                dispatch(hideSearchComponent());
                              }} to={`/single-page/${product._id}`}></Link>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                    {
                      !searchResults.length &&
                      <caption className="text-center">
                          <div className="w-100 px-2">
                            <p className="w-100 text-center no-items py-2 rounded">{t("no items")}</p>
                          </div>
                      </caption>
                    }
                  </table>
                }
              </div>
            </div>
        </div>
    );
}

export default Search;