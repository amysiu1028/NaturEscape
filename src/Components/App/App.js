//Next steps:
//1) Look at rest of project
//2) find a way to fix the grid overflow - JAn
//3) Go into park details
//4) Add a way to favorite? add favorites? Or Have options for just Historic Sites, River, Monument, Park, Recreational Area, National Preserve, Memorial,
//deploy your projects!

//1) when searching and only put 1 letter, it doesn't show that one letter. -> it shows all of the words htat inlcude that letter!
// PropTypes has been implemented in all components with props
//async javascript - try to understand async and await more 

//add visited, want to visit section

//then add styling
// App is responsive across mobile, tablet and desktop sizes

//cypress testing
// Be deployed using Vercel, Heroku, Surge, or any other similar service

//lottie?
//parallax?

//README

import '../../index.css'
import { getParkData } from '../../ApiCalls';
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Parks from '../Parks/Parks';
import SearchBar from '../SearchBar/SearchBar';
import { Routes, Route, useNavigate } from 'react-router-dom'
import FilteredParks from '../FilteredParks/FilteredParks';
import SingleParkDetail from '../SingleParkDetail/SingleParkDetail';

function App() {
  const [ parks, setParks ] = useState([])
  const [ filteredParks, setFilteredParks ] = useState([])
  const [ error, setError ] = useState("")
  const [ selectedParkDetail, setSelectedParkDetail] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    getParkData()
    .then(parksData => {
      setParks(parksData.data)
      console.log("parks",parks)
      // setFilteredParks(parks.data) //starts off with all the data first
    })
    .catch(error => {
      setError(error)
    })
  }, [])

  function searchParks(searchInput) {
    //  console.log("single Search input:",searchInput)
    const filterThroughParks = parks.filter((park) => {
      // console.log("park.full.toLowercase()", park.fullName.toLowerCase())
      // console.log("searchInput.toLowerCase()", searchInput.toLowerCase())
        return park.fullName.toLowerCase().includes(searchInput.toLowerCase())
      })
    // const filterThroughParks = parks.filter((park) => {
    //   const parkToLowerCase = park.fullName.toLowerCase()
    //   const searchInputToLowerCase = searchInput.toLowerCase()

    //   const filterByStartingLetter = parkToLowerCase.startsWith(searchInputToLowerCase)
    //   const filterByWordInclusion = parkToLowerCase.includes(searchInputToLowerCase)

    //   return filterByStartingLetter || filterByWordInclusion
    // })
    // console.log("single Search input:",searchInput)
    // const filterThroughParks = parks.filter((park) => {
    //   console.log("park.full.toLowercase()", park.fullName.toLowerCase())
    //   console.log("searchInput.toLowerCase()", searchInput.toLowerCase())
    //   if (park.fullName.toLowerCase().startsWith(searchInput.toLowerCase()) || park.fullName.toLowerCase().startsWith(searchInput.toLowerCase())) {
    //     return park.fullName.toLowerCase().includes(searchInput.toLowerCase())
    //   } 
    // })
    setFilteredParks(filterThroughParks)
  }

  //is there a way to search by starting letter? and by word including, so when I search by the first letter, it'll show me all the ones that start with a? and b, and then if I type

  function selectPark(id) {
    const selectedPark = parks.find((park) => park.id === id)
    setSelectedParkDetail(selectedPark)
  }
  
  return (
    <main className="main-page">
      {/* {console.log("parks in App,",parks)} */}
      <Routes>
        <Route path="/" element={
            <>
              <Header />
              <SearchBar searchParks={searchParks} navigate={navigate}/>
              <Parks parks={parks} selectPark={selectPark} navigate={navigate}/>
            </>
          }
        />
        <Route path='/:filtered' element={
          <>
            <Header />
            <SearchBar searchParks={searchParks} navigate={navigate}/>
            <FilteredParks filteredParks={filteredParks} selectPark={selectPark} navigate={navigate}/>
          </>
        }
        />
        <Route path='/parks/:id' element={<SingleParkDetail selectedParkDetail={selectedParkDetail}
        />} 
        />
      </Routes>
    </main>
  );
}

//  {error ? (<h2>404 Page Not Found: the page you are looking for doesn't exist</h2>

export default App;
