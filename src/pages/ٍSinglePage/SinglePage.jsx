import "./SinglePage.css"
import TestImage from "../../assets/TestImage.jpg"

function SinglePage() {
    return (
        <section className="single-page py-5">
            <div className="container">
                <div className="inner-container fw-bolder row">
                    <div className="image-container px-2 col-12 col-md-6">
                        <img src={TestImage} alt="" />
                    </div>
                    <div className="data col-12 col-md-6">
                        <h1>the psychology of money</h1>
                        <span>11.000 BHD</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SinglePage;