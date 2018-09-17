import React, {Component} from 'react';

class Header extends Component {
    // hamburgerToggle = () => {
    //     const hamburger = document.querySelector('.hamburger');
    //     if (hamburger.classList.contains('hamburger--elastic')) {
    //         hamburger.classList.remove('hamburger--elastic')
    //         document.querySelector('.menu').classList.add('hide')
    //     } else {
    //         hamburger.classList.add('hamburger--elastic');
    //         document.querySelector('.menu').classList.remove('hide');
    //     }
    // }
    render () {
        return (
            <header id="home">
                <input type="checkbox" id="toggle" name="toggle"/>
                <nav className="menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#bookSearch">Book Search</a></li>
                        <li><a href="#toRead">My To-Read List</a></li>
                        <li><a href="#finished">My Finished Books List</a></li>
                    </ul>
                </nav>
                <label htmlFor="toggle" onClick={this.hamburgerToggle}>
                    <i class="fas fa-bars"></i>
                </label>
                <div className="headerFlex">
                    <h1>Reading List</h1>
                    <p>A place to keep track of all your adventures</p>
                </div>
    
            </header>
        );
    }
};

export default Header;