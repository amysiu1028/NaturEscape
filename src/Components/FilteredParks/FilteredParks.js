import PropTypes from 'prop-types';
import '../../index.scss'
import SinglePark from "../SinglePark/SinglePark"
import { Link } from 'react-router-dom'

export default function FilteredParks({filteredParks, selectPark, navigate}) {
    console.log("filteredParks",filteredParks)
    const displayFilteredParks = filteredParks.map((park) => {
        return (
            <SinglePark
                fullName={park.fullName}
                addressLine={park.addresses[0].line1}
                city={park.addresses[0].city}
                stateCode={park.addresses[0].stateCode}
                postalCode={park.addresses[0].postalCode}
                countryCode={park.addresses[0].countryCode}
                image={park.images[0].url}
                altImageText={park.images[0].altText}
                imageCaption={park.images[0].caption}
                imageTitle={park.images[0].title}
                id={park.id}
                key={park.id}
                selectPark={selectPark}
                navigate={navigate}
            />
        )
    })
  return (
    <div>
      {!displayFilteredParks.length ? (<div className='message-container'> <Link to='/'> 
            <button className='back-to-home-button'>Back To Homepage</button>
        </Link>
        <h2>There are no parks with this name</h2>
      </div>) : (
      <div className='filtered-button-container'>
        <Link to='/'> 
            <button className='back-to-home-button'>Back To Homepage</button>
        </Link>
        <div className='content-container'>
            <div>
              <div className='filtered-parks-container'>
                {displayFilteredParks}
              </div>
            </div>
        </div>
      </div>
        )}
    </div>
  )
}

FilteredParks.propTypes = {
  filteredParks: PropTypes.arrayOf(
    PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    parkCode: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    addressLine: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    stateCode: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    altImageText: PropTypes.string.isRequired,
    imageCaption: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    selectPark: PropTypes.string.isRequired
  })).isRequired,
  selectPark: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}