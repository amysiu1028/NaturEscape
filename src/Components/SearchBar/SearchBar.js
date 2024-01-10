
import { useState } from 'react'

export default function SearchBar({searchParks, navigate}) {
    const [ searchInput, setSearchInput ] = useState("")
    // const navigate = useNavigate()
      //to implemenet a search bar 
  //create a functional component called searchBar

    function navigateHistory() {
        searchParks(searchInput)
        navigate(`/${searchInput}`)
    }

  return (
    <form>
        <input
        type="text"
        placeholder="Enter Name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        {/* do an onClick for submit and on function for search to find
        have to do conditional because if none then display, no parks under this name */}
        {/* <Link to={`/${searchInput}`}> */}
            {/* Use button onClick to trigger the search and navigation */}
        <button type="button" onClick={() => navigateHistory()} >Search</button>
        {/* </Link> */}
    </form>
  )
}

