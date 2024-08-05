import { useDispatch, useSelector } from "react-redux";
import "./Loader.css"
import { useEffect } from "react";
import gsap from "gsap";

function Loader() {

    const { Cartloader } = useSelector(state => state.Cart);
    const { ProductsLoader } = useSelector(state => state.ShopPage);
    const { WishListLoader } = useSelector(state => state.WishList);
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("Cartloader", Cartloader);
        // console.log("ProductsLoader", ProductsLoader);
        // console.log("WishListLoader", WishListLoader);
        
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
                    duration: 0.75,
                    opacity: 0,
                })
                .to(".loader",{
                    visibility: "hidden",
                })
            gsap.set("body", {
                overflow: "visible"
            })
        }
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