import Card from "../../components/Card/Card";
import "./ShopPage.css"

function ShopPage () {

    return (
        <div className="shop-page pb-2 pt-4">
            <div className="container  d-flex flex-column-reverse flex-md-row">
                <aside className="filter mt-4 top-5 px-3">
                    <div className="w-100">
                        <div className="department">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>DEPARTEMENTS</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="categories">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>CATEGORIES</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="author">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>AUTHOR</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                        <div className="publication">
                            <div className="d-flex px-1 rounded mb-5 bg-white justify-content-between">
                                <p>Publication</p>
                                <i className="fa-solid fa-angle-down mt-1"></i>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="inner-container row">
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                    <div className="col-lg-4 p-2 col-md-6 col-12">
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopPage;