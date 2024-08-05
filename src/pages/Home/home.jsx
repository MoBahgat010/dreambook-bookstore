import "./home.css"
import { Link } from "react-router-dom";

import SLiderImage0 from "../../assets/SliderImage0.jpg"
import SLiderImage1 from "../../assets/SliderImage1.jpg"
import SLiderImage2 from "../../assets/SliderImage2.jpg"
import Stationary from "../../assets/stationary.png"
import Offers from "../../assets/offers and discounts.png"
import LearningLanguages from "../../assets/Learning Languages.png"
import EnglishBooks from "../../assets/English Books.png"
import KidsBooks from "../../assets/Kids Books.png"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import { useTranslation } from "react-i18next";
import axios from "axios";


function Home() {
    
    

    const swiper = useState(null);
    const { t } = useTranslation();

    return (
        <section className="home">
            <div className="upper">
                <Swiper ref={swiper}
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
                    loop= {true}
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
                            <div className="p-md-2 p-1">
                                <div className="rounded-pill swiper-button-prev0 py-md-2 py-0 px-md-3 px-2">
                                    <i className="text-white fa-solid fa-chevron-left"></i>
                                </div>
                            </div>
                            <div className="p-md-2 p-1">
                                <div className="rounded-pill swiper-button-next0 py-md-2 py-0 px-md-3 px-2">
                                    <i className="text-white fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next0',
                                prevEl: '.swiper-button-prev0',
                            }}
                            breakpoints={{
                                0:{
                                    slidesPerView: 1,
                                },
                                350: {
                                    slidesPerView: 2,
                                },
                                576: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 4,
                                }
                            }}
                            spaceBetween={"10px"}
                            slidesPerView={4}
                            loop= {true}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={KidsBooks} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">{t("Kids Books")}</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={Stationary} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">{t("Staionary")}</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={Offers} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">{t("Offers and discounts")}</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={LearningLanguages} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">{t("Learning Languages")}</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={EnglishBooks} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">{t("English Books")}</p>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="non-categories mb-5">
                        <div className="options d-flex justify-content-between mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                            <div className="text d-flex align-items-center">
                                <h3 className="mx-2">{t("New Arrivals")}</h3>
                                <Link className="ms-3">{t("See More")}</Link>
                            </div>
                            <div className="d-flex">
                                <div className="p-md-2 p-1">
                                    <div className="rounded-pill swiper-button-prev1 py-md-2 py-0 px-md-3 px-2">
                                        <i className="text-white fa-solid fa-chevron-left"></i>
                                    </div>
                                </div>
                                <div className="p-md-2 p-1">
                                    <div className="rounded-pill swiper-button-next1 py-md-2 py-0 px-md-3 px-2">
                                        <i className="text-white fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next1',
                                prevEl: '.swiper-button-prev1',
                            }}
                            breakpoints={{
                                0:{
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
                                }
                            }}
                            spaceBetween={"10px"}
                            slidesPerView={4}
                            loop= {true}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <Card />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card />
                            </SwiperSlide>
                            <SwiperSlide>
                                <Card />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;