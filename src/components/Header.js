import React from 'react';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

const Header = () => {
    scroller.scrollTo('myScrollToElement', {
        duration: 1500,
        delay: 100,
        smooth: true,
        containerId: 'ContainerElementID'
    });
    return (
        <header>
            <input type="checkbox" id="toggle" name="toggle"/>
            <nav>
                <ul>
                    <li><Link activeClass="active" to="bookSearch">Book Search</Link></li>
                    <li><Link activeClass="active" to="toRead">My To-Read List</Link></li>
                    <li><Link activeClass="active" to="finished">My Finished Books List</Link></li>
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