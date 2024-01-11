//Next steps:
//write if nothing is entered in input then display, please enter, something in input (searchBar component)


//style details page
//RQ! make it responsive!!!

//cypress testing



//colors
//fix the search bar
//style error pages!

//README
// Be deployed using Vercel, Heroku, Surge, or any other similar service

//Need HELP:
//= why does it not scroll down sometimes



//Extra: 
//add location search feature
//add visited, want to visit section vs favorite?
//when click search, can write, there are parks.length number of searches for 'this input'

//issues:

//When done:
//research and ask about CSS - how to get better:
//scroll-container:     left: 65%;   transform: translateX(-50%);
//// Using left: 50% sets the left edge of the element to the middle of its containing element, and transform: translateX(-50%) then shifts the element horizontally by half of its own width in the reverse direction. This combination effectively centers the element horizontally.
//async javascript - try to understand async and await more 

import '../../index.scss'
import lottie from "lottie-web";
import { getParkData } from '../../ApiCalls';
import { useState, useEffect, useRef } from 'react'
import Header from '../Header/Header';
import Parks from '../Parks/Parks';
import SearchBar from '../SearchBar/SearchBar';
import { Routes, Route, useNavigate } from 'react-router-dom'
import FilteredParks from '../FilteredParks/FilteredParks';
import SingleParkDetail from '../SingleParkDetail/SingleParkDetail';
import NotFound from '../NotFound/NotFound';
import Scroll from '../Scoll/Scroll';

function App() {
  const [ parks, setParks ] = useState([])
  const [ filteredParks, setFilteredParks ] = useState([])
  const [ error, setError ] = useState("")

  // in many cases, it's often better to initialize state with null rather than an empty string ("") or an empty object ({}) if you want to represent an absence of data or an uninitialized state. 
  const [ selectedParkDetail, setSelectedParkDetail] = useState(null)
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

  const background = useRef(null); 
  useEffect(() => {
      lottie.loadAnimation({
          animationData: require('../../naturebackground.json'),
          autoplay: true,
          container: background.current,
          loop: true,
          renderer: 'svg'
      })
  }, [])

  function searchParks(searchInput) {
    //  console.log("single Search input:",searchInput)
    const filterThroughParks = parks.filter((park) => {
      // console.log("park.full.toLowercase()", park.fullName.toLowerCase())
      // console.log("searchInput.toLowerCase()", searchInput.toLowerCase())
        return park.fullName.toLowerCase().includes(searchInput.toLowerCase())
      })
    // })
    setFilteredParks(filterThroughParks)
  }

  //is there a way to search by starting letter? and by word including, so when I search by the first letter, it'll show me all the ones that start with a? and b, and then if I type

  function selectPark(id) {
    const selectedPark = parks.find((park) => park.id === id)
    setSelectedParkDetail(selectedPark)
  }
  
  console.log("selectedParkDetail in App",selectedParkDetail)
 
  return (
    <main className="main-page">
    <div ref={background} id="animation-container"></div>
    
      {error ? <div className='server-message-container' >
        <h2>Server is down, please try again later</h2> 
      </div> : (
        <Routes>
          <Route path="/" element={
              <div className='wrap-header-search'>
                  <Header />
                  <SearchBar searchParks={searchParks} navigate={navigate}/>
                <div className='content-container'>
                  <Parks parks={parks} selectPark={selectPark} navigate={navigate}/>
                </div>
              </div>
            }
          />
          <Route path='/:filtered' element={
            <div>
                  <Header />
                  {/* <SearchBar searchParks={searchParks} navigate={navigate}/> */}
                  <Scroll/>
              <div>
                <FilteredParks filteredParks={filteredParks} selectPark={selectPark} navigate={navigate} />
              </div>
            </div>
          }
          />
          <Route path='/parks/:id' element={
          <>
            <Header/>
            <SingleParkDetail selectedParkDetail={selectedParkDetail}/>
          </>
        }/>
          <Route path='/parks/*' element={<NotFound/>}/>
        </Routes>
      )}
    </main>
  );
}


export default App;
