// import React from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function SingleParkDetail({selectedParkDetail}) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    console.log("selectedParkDetail",selectedParkDetail.description);
    // const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
        // Increment currentIndex, reset to 0 if it exceeds the number of images
        setCurrentIndex((prevIndex) =>
            prevIndex === (selectedParkDetail.images.length - 1) ? 0 : prevIndex + 1
        );
        }, 3000); // Adjust the duration (in milliseconds) based on your preference

        // Cleanup the interval on component unmount
        //The cleanup function ensures that the interval is cleared when the component is no longer in use, preventing memory leaks. Adjust the interval duration as needed based on your preferences.
        //clearInterval() function is a built-in JavaScript function that clears a timer set with the setInterval() function. It stops the interval specified by the interval ID, which is returned by setInterval()
        return () => clearInterval(intervalId);
    }, [selectedParkDetail,currentIndex]);

    if (!selectedParkDetail) {
        return(
            <>
                <p>404 Page Not Found: The page you are looking for doesn't exist</p>
                <Link to='/'>
                    <button className='back-to-home'>Back to Homepage</button>
                </Link>
            </>
        )
    }

    function handleDotClick(index) {
        setCurrentIndex(index)
    }

    const displayImages = selectedParkDetail.images.map((image, index) => {
        return (
            <li
            // React requires a unique identifier for each item in the array --helps React efficiently update and re-render components when the list changes.
                key={index}
                //style attribute - used to conditionally set the display property based on whether the current index matches the currentIndex. This controls which image is displayed. If index matches, blocks others from being visible, if doesn't match, doesn't show that?
                style={{display: index === currentIndex ? 'block' : 'none'}}
                >
                <section className='image-info-container'>
                    <h2>{image.title}</h2>
                    <img  
                    className='image-size'      
                    src={image.url} 
                    alt={image.altText}
                    />
                    <p>{image.caption}</p>  
                </section>
            </li>
        )
    })

    const dotIndicators = selectedParkDetail.images && selectedParkDetail.images.map((image,index) => {
        return (<span
            key={index}
            className={`dot ${index === currentIndex ? 'active' :''}`}
            onClick={() => handleDotClick(index)}
        ></span>)
    })

  return (
    <div>
        <div className='singlepark-mainpage'>
            <Link to='/'> 
                <button>Back To Homepage</button>
            </Link>
            <section className='image-slider'>
                <ul>{displayImages}</ul>
                <div className='dot-indicators'>{dotIndicators}</div>
            </section>
            <section>
                <h2>{selectedParkDetail.fullName}</h2>
                <h3>ParkCode: {selectedParkDetail.parkCode}</h3>
                <h4>History:</h4>
                <p>{selectedParkDetail.description}</p>
                <h4>Directions:</h4>
                <p>{selectedParkDetail.directionsInfo}</p>
                <a href={selectedParkDetail.directionsUrl} target="_blank" rel="noopener noreferrer">
                More Information on Directions
                </a>
                <section className='location-container'>
                    <>
                        <h4>Address:</h4>
                        <p>{selectedParkDetail.addresses[0].line2} <br/>
                        {`${selectedParkDetail.addresses[0].city}, ${selectedParkDetail.addresses[0].stateCode} ${selectedParkDetail.addresses[0].postalCode}`}
                        </p>
                    </>
                    <>
                        <h4>Location:</h4>
                        <p>{selectedParkDetail.latLong}</p>
                    </>
                </section>
                <a href={selectedParkDetail.url} target="_blank" rel="noopener noreferrer">
                Click here to navigate to its website
                </a>
                <h3>Operating Hours:</h3>
                <p>{selectedParkDetail.operatingHours.length > 0 ? (<p>selectedParkDetail.operatingHours[0].description</p>) : (<p> There is no information on operating hours. Please <a href={selectedParkDetail.url} target="_blank" rel="noopener noreferrer">
                click here </a> to navigate to their website to view operating hours. Sorry for the inconvenience. </p>)} <br/><br/>
                {selectedParkDetail.weatherInfo}
                </p>
            </section>
        </div>
    </div>
  )
}


//for details page use"
//- activities
//-can filter through for activities OR just favorite
//-directions url
//-designation - national historical parks
// can filter by parks? historical?
// weather info for visit
//url website


//to favorite: we will need the park id!