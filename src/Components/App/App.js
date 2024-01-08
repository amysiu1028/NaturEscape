//Next steps:
//1) Look at rest of project
//2) find a way to fix the grid overflow - JAn
//3) Go into park details
//4) Add a way to favorite? add favorites? Or Have options for just Historic Sites, River, Monument, Park, Recreational Area, National Preserve, Memorial,
//deploy your projects!
//DEBUG:
//1) when searching and only put 1 letter, it doesn't show that one letter.
//2) Also should I sort it by alphabetical?
//3) DEBUG: when I click "Big Hole National Battlefield", there's an error for description

import '../index.css'
import { getParkData } from '../ApiCalls';
import { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Parks from '../Parks/Parks';
// import SearchBar from '../SearchBar/SearchBar';
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
    const filterThroughParks = parks.filter((park) => {
      return park.fullName.toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredParks(filterThroughParks)
  }

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
        <Route path='/:filtered' element={<FilteredParks filteredParks={filteredParks} selectPark={selectPark} navigate={navigate}/>}
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
