export function getParkData() {
    return (
        fetch('https://developer.nps.gov/api/v1/parks?api_key=KgfnACP2f09gBqEMUsNGRWvjNFxJkQPuXT9kVb0w')
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch data')
            }
            return response.json()
        })
    )
}

//camp ground url that isn't li
//https://developer.nps.gov/api/v1/campgrounds?api_key=KgfnACP2f09gBqEMUsNGRWvjNFxJkQPuXT9kVb0w

//additional apis that have other info:
//https://developer.nps.gov/api/v1/thingstodo?api_key=KgfnACP2f09gBqEMUsNGRWvjNFxJkQPuXT9kVb0w