import PropTypes from 'prop-types';
import '../../index.scss'
import SinglePark from '../SinglePark/SinglePark'

export default function Parks({parks, selectPark, navigate}) {
    const displayParks = parks.map((park) => {
        return (
            <SinglePark 
                fullName={park.fullName}
                addressLine={park.addresses[0].line1}
                city={park.addresses[0].city}
                stateCode={park.addresses[0].stateCode}
                postalCode={park.addresses[0].postalCode}
                countryCode={park.addresses[0].countryCode}
                image={park.images[0].url}
                altImageText={park.images[0].altText || 'Sorry there is no description for this image'}
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
    <div data-test='all-parks'>
      <div data-test='parks-container' className='parks-container'>
        {displayParks}
      </div>
    </div>
  )
}


Parks.propTypes = {
  parks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string,
      fullName: PropTypes.string.isRequired,
      parkCode: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      addresses: PropTypes.arrayOf( 
         PropTypes.shape({
           city: PropTypes.string.isRequired,
           stateCode: PropTypes.string.isRequired,
           postalCode: PropTypes.string.isRequired,
           countryCode: PropTypes.string.isRequired,
       })).isRequired,
      images: PropTypes.arrayOf( 
        PropTypes.shape({
          altImageText: PropTypes.string,
          imageCaption: PropTypes.string,
          imageTitle: PropTypes.string,
      }))
    })),
  selectPark: PropTypes.func,
  navigate: PropTypes.func.isRequired
}

Parks.defaultProps = {
  images: PropTypes.arrayOf( 
    PropTypes.shape({
      altImageText: undefined,
      imageCaption: undefined,
      imageTitle: undefined,
  })),
  selectPark: undefined
};
