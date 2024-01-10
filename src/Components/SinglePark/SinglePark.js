/// import './SinglePark.css'
import '../../index.css'
import { Link } from 'react-router-dom'

export default function SinglePark({fullName, addressLine, city, stateCode, postalCode, image, altImageText, imageCaption, imageTitle, selectPark, id, navigate}) {

    return (
    <Link to={`/parks/${id}`}>
    <button type='button' className='main-info-container' onClick={() => {
      selectPark(id);
      navigate(`/parks/${id}`);
      }}>
        <h2>{fullName}</h2>
        <img 
        className='main-image-size' 
        src={image} alt={altImageText}
        ></img>

        <p>{imageTitle}: {imageCaption}</p>
        <p>Address: {addressLine} <br/> 
        {`${city}, ${stateCode} ${postalCode}`}</p>
    </button>
    </Link>
  )
}

