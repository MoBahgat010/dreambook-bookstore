import "./home.css"
import { Link } from "react-router-dom";

import TestImage from "../../assets/CaroudelImage.jpeg"
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
import { useRef, useState } from "react";
import Card from "../../components/Card/Card";

function Home() {

    const swiper = useState(null);

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
                            <img src={TestImage} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="image-container">
                            <img src={TestImage} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="image-container">
                            <img src={TestImage} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="home-body py-5">
                <div className="container">
                    <div className="categories mb-5">
                        <div className="options d-flex justify-content-end mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                            <div className="p-md-2 p-1">
                                <div className="rounded-pill swiper-button-prev py-md-2 py-0 px-md-3 px-2">
                                    <i className="text-white fa-solid fa-chevron-left"></i>
                                </div>
                            </div>
                            <div className="p-md-2 p-1">
                                <div className="rounded-pill swiper-button-next py-md-2 py-0 px-md-3 px-2">
                                    <i className="text-white fa-solid fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
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
                                    <p className="fw-bolder">Kids Books</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={Stationary} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">Stationary</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={Offers} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">Offers and discounts</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={LearningLanguages} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">Learning Languages</p>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to={"/shop-page"} className="d-block bg-white text-center rounded py-3">
                                    <div className="image-container">
                                        <img src={EnglishBooks} alt="KidsBooks" />
                                    </div>
                                    <p className="fw-bolder">English Books</p>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="non-categories mb-5">
                        <div className="options d-flex justify-content-end mb-2 mb-md-4 pe-lg-5 pe-md-4 pe-sm-3 pe-2">
                            <div className="text me-auto d-flex align-items-center">
                                <h3>New Arrivals</h3>
                                <Link className="ms-3">See More</Link>
                            </div>
                            <div className="d-flex">
                                <div className="p-md-2 p-1">
                                    <div className="rounded-pill swiper-button-prev py-md-2 py-0 px-md-3 px-2">
                                        <i className="text-white fa-solid fa-chevron-left"></i>
                                    </div>
                                </div>
                                <div className="p-md-2 p-1">
                                    <div className="rounded-pill swiper-button-next py-md-2 py-0 px-md-3 px-2">
                                        <i className="text-white fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
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