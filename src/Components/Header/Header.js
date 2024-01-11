import '../../index.scss'
import './Header.scss'
import logo2 from '../../images/logo.png'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
      <div className='header-container'>
        <Link to='/'>
            <img className='logo' src={logo2} alt='Logo states NatureEscape'></img>
        </Link>
        {/* try to italicize */}
        <h2 className='welcome-message'>Welcome to your self exploration</h2>
      </div>
    )
  }
  
  