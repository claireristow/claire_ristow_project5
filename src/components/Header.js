import React from 'react';

const Header = () => {
    return (
        <header>
            <input type="checkbox" id="toggle" name="toggle"/>
            <nav>
                <ul>
                    <li><a>Book Search</a></li>
                    <li><a>My To-Read List</a></li>
                    <li><a>My Finished Books List</a></li>
                </ul>
            </nav>
            <label htmlFor="toggle"><i className="fa fa-bars"></i></label>
            <div className="headerFlex">
                <h1>Reading List</h1>
                <p>A place to keep track of all your adventures</p>
            </div>

        </header>
    )
}

export default Header;