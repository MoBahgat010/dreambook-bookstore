import { useDispatch, useSelector } from "react-redux";
import "./Loader.css"
import { useEffect } from "react";
import gsap from "gsap";
import { resetEmail } from "../../RTK/Slices/NewsEmailSlice";

function Loader() {

    const { Cartloader } = useSelector(state => state.Cart);
    const { ProductsLoader } = useSelector(state => state.ShopPage);
    const { WishListLoader } = useSelector(state => state.WishList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Cartloader || ProductsLoader || WishListLoader) {
            gsap.set("body", {
                overflow: "hidden"
            })
            gsap.set(".loader",{
                opacity: 1,
                visibility: "visible",
            })
        } else {
            const tl = gsap.timeline();
            tl
                .to(".loader",{
                    delay: 0.8,
                    duration: 0.4,
                    opacity: 0,
                })
                .to(".loader",{
                    visibility: "hidden",
                })
                .set("body", {
                    overflow: "visible"
                })
        }
        dispatch(resetEmail());
    }, [Cartloader, ProductsLoader, WishListLoader])

    // useEffect(() => {
    //     if (Cartloader || ProductsLoader) {
    //         gsap.set(".loader",{
    //             opacity: 1,
    //             visibility: "visible",
    //         })
    //     } else {
    //         gsap.set(".loader",{
    //             opacity: 0,
    //             visibility: "hidden",
    //         })
    //     }
    // }, [])

    return(
        <div className="loader">
            <h1 className="text-black">Loading...</h1>
        </div>
    );
}

export default Loader;