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
