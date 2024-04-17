

import logo from '../assets/SS-logo-theme.png'

const Navbar = () => (
    <>
        <div className='Navbar-container'>
            <div className='Logo'>
                <img src={logo} alt="logo" />
            </div>
            <ul className="Navbar">
                <li><a href="#">HOME</a></li>
                <span className='color'>|</span>
                <li><a href="#">ABOUT US</a></li>
                <span className='color'>|</span>
                <li><a href="#">CONTACT US</a></li>
                <span className='color'>|</span>
                <li><a href="#">MENU</a></li>
            </ul>
        </div>
    </>
);

export default Navbar;
