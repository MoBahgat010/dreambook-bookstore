import "./home.css"
import { Link } from "react-router-dom";

import TestImage from "../../assets/CaroudelImage.jpeg"
import Stationary from "../../assets/stationary.png"
import Offers from "../../assets/offers and discounts.png"
import LearningLanguages from "../../assets/Learning Languages.png"
import EnglishBooks from "../../assets/English Books.png"
import KidsBooks from "../../assets/Kids Books.png"

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Home() {

    const swiper = useSwiper();

    return (
        <section className="home">
            <div className="upper">
                <Swiper
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
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
            <div className="home-body bg-body-tertiary py-5">
                <div className="container">
                <Swiper
                    spaceBetween={"10px"}
                    slidesPerView={4}
                    navigation={true}
                    loop= {true}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link className="d-block bg-white text-center rounded py-3">
                            <div className="image-container">
                                <img src={KidsBooks} alt="KidsBooks" />
                            </div>
                            <p className="fw-bolder">Kids Books</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link className="bg-white text-center rounded py-3">
                            <div className="image-container">
                                <img src={Stationary} alt="KidsBooks" />
                            </div>
                            <p className="fw-bolder">Stationary</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link className="bg-white text-center rounded py-3">
                            <div className="image-container">
                                <img src={Offers} alt="KidsBooks" />
                            </div>
                            <p className="fw-bolder">Offers and discounts</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link className="bg-white text-center rounded py-3">
                            <div className="image-container">
                                <img src={LearningLanguages} alt="KidsBooks" />
                            </div>
                            <p className="fw-bolder">Learning Languages</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link className="bg-white text-center rounded py-3">
                            <div className="image-container">
                                <img src={EnglishBooks} alt="KidsBooks" />
                            </div>
                            <p className="fw-bolder">English Books</p>
                        </Link>
                    </SwiperSlide>
                    <button onClick={() => {
                        swiper.slideNext();
                    }}>Next</button>
                    <button onClick={() => {
                        swiper.slidePrev();
                    }}>Prev</button>
                </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Home;