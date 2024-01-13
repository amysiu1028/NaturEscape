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
import Scroll from '../Scroll/Scroll';

function App() {
  const [ parks, setParks ] = useState([])
  const [ filteredParks, setFilteredParks ] = useState([])
  const [ error, setError ] = useState("")

  const [ selectedParkDetail, setSelectedParkDetail] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    getParkData()
    .then(parksData => {
      setParks(parksData.data)
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
    <div ref={background} id="animation-container"></div>
      {error ? 
        (<div data-test='error-message' className='server-message-container' >
          <h2>Server is down, please try again later.</h2> 
        </div>) : (
        <Routes>
          <Route path="/" element={
              <div className='wrap-header-search'>
                  <Header />
                  <p className='welcome-message' data-test='mainpage-scroll-message'>Scroll down below to click onto your next destination</p>
                  <SearchBar searchParks={searchParks} navigate={navigate}/>
                  <div className='content-container'>
                  <Parks parks={parks} selectPark={selectPark} navigate={navigate}/>
                </div>
              </div>
            }/>
          <Route path='/:filtered' element={
            <div className='wrap-header-search'h>
                  <Header />
                  {/* <SearchBar searchParks={searchParks} navigate={navigate}/> */}
                  <p data-test='filtered-scroll-message' className='welcome-message'>Scroll down below to view and click onto your searched destination</p>
                  <div className='scroll-on-filteredpage'>
                  <Scroll/>
                  </div>
              <div>
                <FilteredParks filteredParks={filteredParks} selectPark={selectPark} navigate={navigate} />
              </div>
            </div>
          }/>
          <Route path='/parks/:fullName' element={
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
