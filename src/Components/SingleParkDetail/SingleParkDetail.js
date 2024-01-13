// import React from 'react'
import PropTypes from 'prop-types';
import '../../index.scss'
import './SingleParkDetail.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function SingleParkDetail({selectedParkDetail}) {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    
    useEffect(() => {
        if (selectedParkDetail) {
            const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                return prevIndex === (selectedParkDetail.images.length - 1) ? 0 : prevIndex + 1
                });
            }, 8000); 
            return () => clearInterval(intervalId);
        }
    }, [selectedParkDetail]);

    function handleDotClick(index) {
        setCurrentIndex(index)
    }

    if (!selectedParkDetail) {
        return(
            <div className='message-container'>
                <p>404 Page Not Found: The page you are looking for doesn't exist.</p>
                <Link to='/'>
                <button className='back-to-home-button'>Back to Homepage</button>
                </Link>
            </div>
        )
    }

    const displayImages = selectedParkDetail.images.map((image, index) => {
        return (
            <li key={index} style={{display: index === currentIndex ? 'block' : 'none'}}>
                <section className='image-info-container'>
                    <div data-test='all-slider-info'>
                        <h2>{image.title}</h2>
                        <img data-test='slider-images'
                        className='image-size'      
                        src={image.url} 
                        alt={image.altText}
                        />
                        <p>{image.caption}</p>  
                    </div>
                </section>
            </li>
        )
    })

    const dotIndicators = selectedParkDetail.images && selectedParkDetail.images.map((image,index) => {
        return (<button
            key={index}
            className={`dot ${index === currentIndex ? 'active' :''}`}
            onClick={() => handleDotClick(index)}
        ></button>)
    })

  return (
    <div className='single-park-detail-page'>
        <div className='singlepark-mainpage'>
            <section className='image-slider'>
                <ul>{displayImages}</ul>
                <div className='dot-indicators'>{dotIndicators}</div>
            </section>
            <section className='park-detail-text-container'>
                <h2>{selectedParkDetail.fullName}</h2>
                <h3>ParkCode: {selectedParkDetail.parkCode}</h3>
                <h4>History:</h4>
                <p>{selectedParkDetail.description}</p>
                <h4>Directions:</h4>
                <p>{selectedParkDetail.directionsInfo}</p>
                <a data-test='directions-link' href={selectedParkDetail.directionsUrl} target="_blank" rel="noopener noreferrer">
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
                        <h4>Location: </h4>
                        <p>{selectedParkDetail.latLong}</p>
                    </>
                </section>
                <a href={selectedParkDetail.url} target="_blank" rel="noopener noreferrer">
                Click here to navigate to its website
                </a>
                <h4>Operating Hours & Weather Information:</h4>
                <p>{selectedParkDetail.operatingHours.length > 0 ? (<p>{selectedParkDetail.operatingHours[0].description}</p>) : (<p> There is no information on operating hours. Please <a href={selectedParkDetail.url} target="_blank" rel="noopener noreferrer">
                click here </a> to navigate to their website to view operating hours. Sorry for the inconvenience. </p>)}
                {selectedParkDetail.weatherInfo}
                </p>
            </section>
        </div>
        <Link to='/'> 
                <button className='parkdetail-back-to-home-button' >Back To Homepage</button>
        </Link>
    </div>
  )
}

SingleParkDetail.propTypes = {
    selectedParkDetail: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        parkCode: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        directionsInfo: PropTypes.string.isRequired,
        directionsUrl: PropTypes.string.isRequired,
        operatingHours: PropTypes.array.isRequired,
        addresses: PropTypes.arrayOf(
          PropTypes.shape({
            postalCode: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            countryCode: PropTypes.string.isRequired
          })).isRequired,
        latLong: PropTypes.string.isRequired,
        weatherInfo: PropTypes.string.isRequired,
      })
  }

SingleParkDetail.defaultProps = {
    selectedParkDetail: null,
  };