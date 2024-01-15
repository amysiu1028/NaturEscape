import './SearchBar.scss'
import '../../index.scss'

import PropTypes from 'prop-types';
import { useState } from 'react'
import Scroll from "../Scroll/Scroll";
import search from '../../images/search.png'

export default function SearchBar({searchParks, navigate}) {
    const [ searchInput, setSearchInput ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    function navigateHistory(event) {
      if (searchInput === '' || searchInput === ' ') {
        if  (event.key === 'Enter' || event.keyCode === 13 || event.type === "click") {
          setErrorMessage('Please fill out search input.')
        }
      } else {
        if (event.key === 'Enter' || event.keyCode === 13 || event.type === "click") {
          setErrorMessage('')
          searchParks(searchInput)
          navigate(`/${searchInput}`)
        }
      }
    }

  return (
    <div className='search-scroll-container'>
      <form className='input-search-container'>
          <input
          data-test='search-input'
          type="text"
          placeholder="Enter Destination Name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button tabIndex='0' data-test='search-button' className='search-img-background' type="button" onClick={(event) => navigateHistory(event)} >
            <img data-test='search-icon' src={search} alt='Search Icon'></img>
          </button>
      </form>
      {errorMessage && <h2 data-test='search-error-message' className='error-message'>{errorMessage}</h2>}
        <Scroll/>
     </div>
  )
}

SearchBar.propTypes = {
  searchParks: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}