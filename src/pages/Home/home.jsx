import "./home.css";
import { Link } from "react-router-dom";

import SLiderImage0 from "../../assets/SliderImage0.jpg";
import SLiderImage1 from "../../assets/SliderImage1.jpg";
import SLiderImage2 from "../../assets/SliderImage2.jpg";
import OfferPhoto from "../../assets/offer.png"
import ReadingPhoto from "../../assets/reading.png"

import Stationary from "../../assets/stationary.png";
import LearningLanguages from "../../assets/Learning Languages.png";
import EnglishBooks from "../../assets/English Books.png";
import KidsBooks from "../../assets/Kids Books.png";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";
import {
  ClearFilteredProducts,
  FetchNewArrivals,
  GetSpecificCategory,
} from "../../RTK/Slices/FetchProductsSlice";
import { FetchMostSoldProducts } from "../../RTK/Slices/FetchProductsSlice";

function Home() {
  const { FetchedProducts, allCategories, mostSoldProducts, newArrivalProducts } = useSelector(
    (state) => state.ShopPage
  );
  const dispatch = useDispatch();
  const [categoriesProducts, setCategoriesProducts] = useState([]);
  const swiper = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategoriesProducts = async () => {
      const categoriesMapArray = [];

      for (const category of allCategories) {
        try {
          const products = await dispatch(
            GetSpecificCategory(category._id)
          ).unwrap();
          categoriesMapArray.push([category, products]);
        } catch (error) {
          console.error(
            "Failed to fetch products for category:",
            category,
            error
          );
        }
      }

      // Update state with the array of categories and their products
      setCategoriesProducts(categoriesMapArray);
    };

    if (allCategories.length > 0) {
      fetchCategoriesProducts();
    }
    dispatch(FetchMostSoldProducts("limit=10"));
    dispatch(FetchNewArrivals("limit=10"));
  }, [allCategories, i18next.language]);

  function renderPhotos() {
    console.log("hedwuscnj");
    
    return (
      <div className="offer-photo image-container">
        <p>cndipsm</p>
        <img src="../../assets/offer.png" className="" />
      </div>
    );
  }

  return (
    <section className="home">
      <div className="upper">
        <Swiper
          ref={swiper}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="image-container">
              <img src={SLiderImage0} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image-container">
              <img src={SLiderImage1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="image-container">
              <img src={SLiderImage2} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="home-body py-5">
        <div className="container">
          <div className="categories mb-5">
            <div className="options d-flex justify-content-end mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
              <div className="d-flex">
                <div className="p-md-2 p-1">
                  <div className="rounded-pill category-prev py-md-2 py-0 px-md-3 px-2">
                    <i className="text-white fa-solid fa-chevron-left"></i>
                  </div>
                </div>
                <div className="p-md-2 p-1">
                  <div className="rounded-pill category-next py-md-2 py-0 px-md-3 px-2">
                    <i className="text-white fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
                            <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  navigation={{
                    nextEl: ".swiper-next1",
                    prevEl: ".swiper-prev1",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    350: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    994: {
                      slidesPerView: 4,
                    },
                  }}
                  spaceBetween={"10px"}
                  slidesPerView={4}
                  loop={true}
                  className="mySwiper"
                >
                  <SwiperSlide>
                  <Link to={"/shop-page"} state={{data: "Kids Books"}} className="d-block bg-white text-center rounded py-3">
                      <div className="image-container">
                          <img src={KidsBooks} alt="KidsBooks" />
                      </div>
                      <p className="fw-bolder">{t("Kids Books")}</p>
                  </Link>
              </SwiperSlide>
              <SwiperSlide>
                  <Link to={"/shop-page"} state={{data: "Stationary"}} className="d-block bg-white text-center rounded py-3">
                      <div className="image-container">
                          <img src={Stationary} alt="Stationary" />
                      </div>
                      <p className="fw-bolder">{t("Staionary")}</p>
                  </Link>
              </SwiperSlide>
              <SwiperSlide>
                  <Link to={"/shop-page"} state={{data: "Offers and discounts"}} className="d-block bg-white text-center rounded py-3">
                      <div className="image-container">
                          <img src={LearningLanguages} alt="Offers and Discounts" />
                      </div>
                      <p className="fw-bolder">{t("Learning Languages")}</p>
                  </Link>
              </SwiperSlide>
              <SwiperSlide>
                  <Link to={"/shop-page"} state={{data: "Offers and discounts"}} className="d-block bg-white text-center rounded py-3">
                      <div className="image-container">
                          <img src={EnglishBooks} alt="Offers and Discounts" />
                      </div>
                      <p className="fw-bolder">{t("English Books")}</p>
                  </Link>
              </SwiperSlide>
                </Swiper>
          </div>
          <div className="non-categories">
            {FetchedProducts.length != 0 && (
              <div className="new-arrivals">
                <div className="options d-flex justify-content-between mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                  <div className="text d-flex align-items-center">
                    <h3 className="mx-2">{t("New Arrivals")}</h3>
                    <Link
                      to={"/shop-page"}
                      state={{ data: "new_arrivals" }}
                      className="ms-3"
                    >
                      {t("See More")}
                    </Link>
                  </div>
                  <div className="d-flex">
                    <div className="p-md-2 p-1">
                      <div className="rounded-pill swiper-prev1 py-md-2 py-0 px-md-3 px-2">
                        <i className="text-white fa-solid fa-chevron-left"></i>
                      </div>
                    </div>
                    <div className="p-md-2 p-1">
                      <div className="rounded-pill swiper-next1 py-md-2 py-0 px-md-3 px-2">
                        <i className="text-white fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  navigation={{
                    nextEl: ".swiper-next1",
                    prevEl: ".swiper-prev1",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    350: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    994: {
                      slidesPerView: 4,
                    },
                  }}
                  spaceBetween={"10px"}
                  slidesPerView={4}
                  loop={true}
                  className="mySwiper"
                >
                  {newArrivalProducts?.map((product, index) => {
                    return (
                      <SwiperSlide key={product._id + `${index}`}>
                        <Card
                          key={product._id}
                          discount={Math.round(
                            ((product.price - product.priceAfterDiscount) /
                              product.price) *
                              100
                          )}
                          id={product._id}
                          newBadge={false}
                          image={product.image}
                          title={product.title}
                          price={product.price}
                          quantity={product.quantity}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
            <div className="offer-photo image-container">
              <img src={OfferPhoto} />
            </div>
            {mostSoldProducts.length != 0 && (
              <div className="most-sold">
                <div className="options d-flex justify-content-between mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                  <div className="text d-flex align-items-center">
                    <h3 className="mx-2">{t("Most Sold")}</h3>
                    <Link
                      to={"/shop-page"}
                      state={{ data: "most_sold" }}
                      className="ms-3"
                    >
                      { t("See More") }
                    </Link>
                  </div>
                  <div className="d-flex">
                    <div className="p-md-2 p-1">
                      <div className="rounded-pill swiper-prev-sold py-md-2 py-0 px-md-3 px-2">
                        <i className="text-white fa-solid fa-chevron-left"></i>
                      </div>
                    </div>
                    <div className="p-md-2 p-1">
                      <div className="rounded-pill swiper-next-sold py-md-2 py-0 px-md-3 px-2">
                        <i className="text-white fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  navigation={{
                    nextEl: ".swiper-next-sold",
                    prevEl: ".swiper-prev-sold",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    350: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    994: {
                      slidesPerView: 4,
                    },
                  }}
                  spaceBetween={"10px"}
                  slidesPerView={4}
                  loop={true}
                  className="mySwiper"
                >
                  {mostSoldProducts.slice(0, 10).map((product, index) => {
                    return (
                      <SwiperSlide key={product._id + `${index}`}>
                        <Card
                          key={product._id}
                          discount={Math.round(
                            ((product.price - product.priceAfterDiscount) /
                              product.price) *
                              100
                          )}
                          id={product._id}
                          newBadge={false}
                          image={product.image}
                          title={product.title}
                          price={product.price}
                          quantity={product.quantity}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
            <div className="offer-photo image-container">
              <img src={ReadingPhoto} />
            </div>
            {categoriesProducts.map(([category, categoryProducts], index) => {
              return (
                categoryProducts.length > 0 && (
                  <div className={category.name}>
                    <div className="options d-flex justify-content-between mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                      <div className="text d-flex align-items-center">
                        <h3 className="mx-2 text-capitalize">
                          {i18next.language === "en"
                            ? category.englishname
                            : category.arabicname}
                        </h3>
                        <Link
                          to={"/shop-page"}
                          state={{ data: category._id }}
                          className="ms-3"
                        >
                          {t("See More")}
                        </Link>
                      </div>
                      <div className="d-flex">
                        <div className="p-md-2 p-1">
                          <div
                            className={`rounded-pill swiper-button-prev${index} py-md-2 py-0 px-md-3 px-2`}
                          >
                            <i className="text-white fa-solid fa-chevron-left"></i>
                          </div>
                        </div>
                        <div className="p-md-2 p-1">
                          <div
                            className={`rounded-pill swiper-button-next${index} py-md-2 py-0 px-md-3 px-2`}
                          >
                            <i className="text-white fa-solid fa-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Swiper
                      modules={[Autoplay, Pagination, Navigation]}
                      navigation={{
                        nextEl: `.swiper-button-next${index}`,
                        prevEl: `.swiper-button-prev${index}`,
                      }}
                      breakpoints={{
                        0: {
                          slidesPerView: 1,
                        },
                        350: {
                          slidesPerView: 2,
                        },
                        768: {
                          slidesPerView: 3,
                        },
                        994: {
                          slidesPerView: 4,
                        },
                      }}
                      spaceBetween={"10px"}
                      slidesPerView={4}
                      loop={true}
                      className="mySwiper"
                    >
                      {categoryProducts.slice(0, 15).map((product, index) => {
                        return (
                          <SwiperSlide key={product._id + `${index}`}>
                            <Card
                              key={product._id}
                              discount={Math.round(
                                ((product.price - product.priceAfterDiscount) /
                                  product.price) *
                                  100
                              )}
                              id={product._id}
                              newBadge={false}
                              image={product.image}
                              title={product.title}
                              price={product.price}
                              quantity={product.quantity}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
