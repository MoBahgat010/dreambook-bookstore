import { useTranslation } from "react-i18next";
import Card from "../../components/Card/Card";
import "./ShopPage.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import i18next from "i18next";
import i18n from "../../i18n";
import gsap from "gsap";
import {
  ClearFilteredProducts,
  FetchMostSoldProducts,
  FetchNewArrivals,
  FetchProducts,
  GetSpecificCategory,
  GetSpecificSubCategory,
  PrepareFilteredProducts,
  SetFilterStatus,
} from "../../RTK/Slices/FetchProductsSlice";
import Spinner from "../../components/Spinner/Spinner";

function ShopPage() {

  const PAGINATION_THRESHOLD = 20;

  const {
    FetchedProducts,
    filteredProducts,
    allCategories,
    allSubCategories,
    totalPages,
    startToFilter,
    allAuthors,
    shopPageSpinner,
  } = useSelector((state) => state.ShopPage);
  const { countryName, countryCurrency } = useSelector(
    (state) => state.SelectCountry
  );
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pagenumber, setPagenumber] = useState(0);
  const [reFilter, setReFilter] = useState(true);
  // const [categories, setCategories] = useState([]);
  // const [subCategories, setSubCategories] = useState([]);

  const CategoriesCheckBoxes = useRef([]);
  const SubCategoryCheckBoxes = useRef([]);
  const NewArrivalsCheckBox = useRef([]);
  const MostSoldCheckBox = useRef([]);

  const PublicationCheckBoxes = useRef([]);
  const AuthorCheckBoxes = useRef([]);

  useEffect(() => {
    if (startToFilter) dispatch(FetchProducts(pagenumber + 1));
  }, [pagenumber]);

  async function FilterProducts() {
    dispatch(ClearFilteredProducts());    
    dispatch(SetFilterStatus(true));
    let flag = false;
    for (let i in CategoriesCheckBoxes.current) {
      if (CategoriesCheckBoxes.current[i].checked) {
        flag = true;
        await dispatch(GetSpecificCategory(CategoriesCheckBoxes.current[i].id)).unwrap();
      }
    }
    for (let i in SubCategoryCheckBoxes.current) {
      if (SubCategoryCheckBoxes.current[i].checked) {
        flag = true;
        await dispatch(GetSpecificSubCategory(SubCategoryCheckBoxes.current[i].id)).unwrap();
      }
    }
    if(NewArrivalsCheckBox.current.checked) {
      await dispatch(FetchNewArrivals()).unwrap();
      dispatch(PrepareFilteredProducts());
      flag = true;
    }
    if(MostSoldCheckBox.current.checked) {
      console.log("Making solds");
      
      await dispatch(FetchMostSoldProducts()).unwrap();
      dispatch(PrepareFilteredProducts());
      flag = true;
    }
    console.log("Flag:", flag);
    dispatch(SetFilterStatus(flag));
    setPagenumber(0);
  }

  useEffect(() => {
    for (let i in CategoriesCheckBoxes.current)
      CategoriesCheckBoxes.current[i].checked = false;
    for (let i in SubCategoryCheckBoxes.current)
      SubCategoryCheckBoxes.current[i].checked = false;
  }, [i18next.language, countryCurrency, countryName]);

  useEffect(() => {
    FilterProducts();
  }, [reFilter, allCategories, allSubCategories]);

  useEffect(() => {
    if(location.state?.data === "new_arrivals" && location.state?.data != "") {      
      NewArrivalsCheckBox.current.checked = true;
    }
    if(location.state?.data === "most_sold" && location.state?.data != "") {   
      MostSoldCheckBox.current.checked = true;
    }
    if (location.state?.data && location.state?.data != "") {
      for (let i in CategoriesCheckBoxes.current) {
        if (CategoriesCheckBoxes.current[i].id == location.state?.data) {
          CategoriesCheckBoxes.current[i].checked = true;
          break;
        }
      }
      for (let i in SubCategoryCheckBoxes.current) {
        if (SubCategoryCheckBoxes.current[i].id == location.state?.data) {
          SubCategoryCheckBoxes.current[i].checked = true;
          break;
        }
      }
      navigate(location.pathname, {});
      FilterProducts();
    }
  }, [location.state?.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagenumber]);

  function renderPagination() {
    return startToFilter
      ? Array(
          Math.ceil(
            filteredProducts.length > 0 ? filteredProducts.length / PAGINATION_THRESHOLD : 1
          )
        )
          .fill()
          .map((_, index) => {
            return (
              <li
                className={index == pagenumber && "active-pagination"}
                onClick={() => {
                  setPagenumber(index);
                }}
              >
                {index + 1}
              </li>
            );
          })
      : Array(totalPages)
          .fill()
          .map((_, index) => {
            return (
              <li
                className={index == pagenumber && "active-pagination"}
                onClick={() => {
                  setPagenumber(index);
                }}
              >
                {index + 1}
              </li>
            );
          });
  }

  return (
    <div className="shop-page pb-2 pt-4">
      <div className="container d-flex flex-column-reverse align-items-center align-items-md-start flex-md-row">
        <aside className="filter mt-4 top-5 px-3">
          <div className="w-100">
            <div className="new-arrivals d-flex justify-content-between align-items-center my-2 px-2">
              <p className="text-capitalize">
                { t("New Arrivals") }
              </p>
              <input
                onChange={() => {
                  setReFilter(!reFilter);
                  navigate(location.pathname, {});
                }}
                ref={NewArrivalsCheckBox}
                type="checkbox"
              />
            </div>
            <div className="most-sold d-flex justify-content-between align-items-center my-2 px-2">
              <p className="text-capitalize">
                { t("Most Sold") }
              </p>
              <input
                onChange={() => {
                  setReFilter(!reFilter);
                  navigate(location.pathname, {});
                }}
                ref={MostSoldCheckBox}
                type="checkbox"
              />
            </div>
            <div className="department mb-5">
              <div className="d-flex px-1 rounded bg-white justify-content-between">
                <p>{t("DEPARTEMENTS")}</p>
                <i className="fa-solid fa-angle-down mt-1"></i>
              </div>
              {allCategories?.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 px-2"
                  >
                    <p className="text-capitalize">
                      {/* {t(category.name)} */}
                      {i18n.language === "en"
                        ? category.englishname
                        : category.arabicname}
                    </p>
                    <input
                      id={category._id}
                      onChange={() => {
                        setReFilter(!reFilter);
                        navigate(location.pathname, {});
                      }}
                      ref={(ele) => (CategoriesCheckBoxes.current[index] = ele)}
                      type="checkbox"
                    />
                  </div>
                );
              })}
            </div>
            <div className="categories mb-5">
              <div className="d-flex px-1 rounded bg-white justify-content-between">
                <p>{t("CATEGORIES")}</p>
                <i className="fa-solid fa-angle-down mt-1"></i>
              </div>
              {allSubCategories.map((subCategory, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 px-2"
                  >
                    <p className="text-capitalize">
                      {i18n.language === "en"
                        ? subCategory.englishname
                        : subCategory.arabicname}
                    </p>
                    <input
                      id={subCategory._id}
                      onChange={() => {
                        setReFilter(!reFilter);
                        navigate(location.pathname, {});
                      }}
                      ref={(ele) =>
                        (SubCategoryCheckBoxes.current[index] = ele)
                      }
                      type="checkbox"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
        <div className="inner-container row">
          {startToFilter
            ? shopPageSpinner ? <Spinner /> : filteredProducts
                .slice(pagenumber * PAGINATION_THRESHOLD, (pagenumber + 1) * PAGINATION_THRESHOLD)
                .map((product, index) => {
                  return (
                    <div
                      key={product.id + `${index}`}
                      className="col-lg-4 p-2 col-md-6 col-12"
                    >
                      <Card
                        key={product._id}
                        discount={Math.round(
                          ((product.price - product.priceAfterDiscount) /
                            product.price) *
                            100
                        )}
                        id={product._id}
                        newBadge={product.newBadge ?? false}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        quantity={product.quantity}
                      />
                    </div>
                  );
                })
            : FetchedProducts.map((product, index) => {
                return (
                  <div
                    key={product.id + `${index}`}
                    className="col-lg-4 p-2 col-md-6 col-12"
                  >
                    <Card
                      key={product._id}
                      discount={Math.round(
                        ((product.price - product.priceAfterDiscount) /
                          product.price) *
                          100
                      )}
                      id={product._id}
                      newBadge={product.newBadge ?? false}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                      quantity={product.quantity}
                    />
                  </div>
                );
              })}
          <ul className="pagination d-flex justify-content-center flex-wrap gap-1 px-5 mt-4">
            {renderPagination()}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
