import './Scroll.scss'
import {  useRef, useEffect } from 'react'
import lottie from "lottie-web";

function Scroll() {

const scrolldown = useRef(null); 
    useEffect(() => {
        lottie.loadAnimation({
            animationData: require('../../scrolldown.json'),
            autoplay: true,
            container: scrolldown.current,
            loop: true,
            renderer: 'svg'
        })
    }, [])

  return (
    <div className='form-scroll-container'>
        {/* <div className="text-scroll-container"> */}
            <h2 className='scroll-down'>SCROLL DOWN</h2>
            <div ref={scrolldown} id="scroll-container"></div>
        {/* </div> */}
    </div>
  )
}

export default Scroll

