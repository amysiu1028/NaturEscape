import '../../index.scss'
import './Header.scss'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
      <div className='header-container'>
        <Link to='/'>
            <img className='logo' data-test='logo' src={logo} alt='Logo states NatureEscape'></img>
        </Link>
        {/* try to italicize */}
        <h2 className='welcome-message' data-test='welcome-message'>Embark on your journey of self-discovery</h2>
      </div>
    )
  }
  
  