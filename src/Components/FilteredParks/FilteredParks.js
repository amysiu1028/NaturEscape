import '../../index.css'
import SinglePark from "../SinglePark/SinglePark"
import { Link } from 'react-router-dom'

export default function FilteredParks({filteredParks, selectPark, navigate}) {
    console.log("filteredParks with A",filteredParks)
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
      {!displayFilteredParks.length ? (<> <h2>There are no parks with this name</h2>
        <Link to='/'> 
            <button>Back To Homepage</button>
        </Link>
      </>) : (<div className='parks-container'>
        <Link to='/'> 
            <button>Back To Homepage</button>
          </Link>
          {displayFilteredParks}
          </div>
        )}
    </div>
  )
}
