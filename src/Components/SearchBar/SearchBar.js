import './SearchBar.scss'
import '../../index.scss'

import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react'
// import { useState, useEffect, useRef } from 'react'
import Scroll from "../Scoll/Scroll";
import search from '../../images/search.png'

export default function SearchBar({searchParks, navigate}) {
    const [ searchInput, setSearchInput ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    // const navigate = useNavigate()
      //to implemenet a search bar 
  //create a functional component called searchBar
    function navigateHistory() {
      if (searchInput === '' || searchInput === ' ') {
        setErrorMessage('Please fill out search input.')
      } else {
        setErrorMessage('')
        searchParks(searchInput)
        navigate(`/${searchInput}`)
      }
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
          <button className='search-img-background' type="button" onClick={() => navigateHistory()} >
            <img src={search} alt='Search Icon'></img>
          </button>
      </form>
      {errorMessage && <h2 className='error-message'>{errorMessage}</h2>}
        <Scroll/>
     </div>
  )
}

SearchBar.propTypes = {
  searchParks: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}