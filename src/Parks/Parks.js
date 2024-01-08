//for details page use"
//- description
//- activities
//-can filter through for activities OR just favorite
//-directions Info
//-directions url
//-designation - national historical parks
// can filter by parks? historical?
// weather info for visit
//url website

//to favorite: we will need the park id!

import '../index.css'
import SinglePark from '../SinglePark/SinglePark'

export default function Parks({parks, selectPark, navigate}) {
    // console.log("parks",parks)
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
    <div className='parks-container'>
      {displayParks}
    </div>
  )
}
