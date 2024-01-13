import PropTypes from 'prop-types';
import '../../index.scss'
import { Link } from 'react-router-dom'

export default function SinglePark({fullName, addressLine, city, stateCode, postalCode, image, altImageText, imageCaption, imageTitle, selectPark, id, navigate}) {
  
    return (
      <Link to={`/parks/${fullName}`}>
      <button data-test='main-park-button' type='button' className='main-info-container' onClick={() => {
        selectPark(id);
        navigate(`/parks/${id}`);
      }}>
        <h2>{fullName}</h2>
        <div className="pic-text-container"> 
          <img data-test='mainpage-image' className='main-image-size'  
          src={image} alt={altImageText}/>

          <p data-test='mainpage-text' className='main-image-text-container'><strong>{imageTitle}:</strong> <br/> {imageCaption} <br/> 
          Address: {addressLine} <br/> 
          {`${city}, ${stateCode} ${postalCode}`}</p>
        </div>
      </button>
      </Link>
  )
}

SinglePark.propTypes = {
  fullName: PropTypes.string.isRequired,
  addressLine: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  stateCode: PropTypes.string.isRequired,
  postalCode: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  altImageText: PropTypes.string.isRequired,
  imageCaption: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  selectPark: PropTypes.func.isRequired, 
  navigate: PropTypes.func.isRequired
}