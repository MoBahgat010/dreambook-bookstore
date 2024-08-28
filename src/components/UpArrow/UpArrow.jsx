import { useEffect, useRef, useState } from "react";
import "./UpArrow.css"
import gsap from "gsap";

function UpArrow() {

    let isScrollChange = useRef(false);
    let ShowUpArrow = useRef(false);
    const ArrowComponent = useRef();

    function HandlePageScroll() {
        const currentLocation = window.scrollY;
        if(currentLocation > 800) {
            if(!ShowUpArrow)
                isScrollChange = true;
            ShowUpArrow = true;
        }
        else {
            if(ShowUpArrow)
                isScrollChange = true;
            ShowUpArrow = false;
        }
        if(isScrollChange) {
            if(ShowUpArrow) {
                gsap.to(".up-arrow", {
                    opacity: 1,
                    duration: 0.5,
                    visibility: "visible",
                    ease: "power2.inOut",
                })
                gsap.set(".up-arrow", {
                    delay: 2,
                    visibility: "visible"
                })
            } else {
                const tl = gsap.timeline();
                tl
                    .to(".up-arrow", {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut",
                    })
                    .to(".up-arrow", {
                        visibility: "hidden",
                    })
            }
            isScrollChange = false;
        }
    }
    
    useEffect(HandlePageScroll, []);
    window.addEventListener("scroll", HandlePageScroll)
    
    function ResetToPageStart() {
        window.scrollTo(0, 0)
    }

    return (
        <button ref={ArrowComponent} onClick={ResetToPageStart} className="up-arrow">
            <i class="fa-solid fa-turn-up"></i>
        </button>
    );
}

export default UpArrow;