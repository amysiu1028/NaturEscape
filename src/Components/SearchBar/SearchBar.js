import './SearchBar.scss'
import '../../index.scss'

import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react'
// import { useState, useEffect, useRef } from 'react'
import Scroll from "../Scoll/Scroll";
import search from '../../images/search.png'

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
    <div className='search-scroll-container'>
      <form className='input-search-container'>
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
          <button type="button" onClick={() => navigateHistory()} >
            <img src={search} alt='Search Icon'></img>
          </button>
      </form>
        <Scroll/>
     </div>
  )
}

SearchBar.propTypes = {
  searchParks: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}