import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/infinite-scrolling-with-tanstack/"> TanStack Query </NavLink>
        <ul>
          <li><NavLink to="/infinite-scrolling-with-tanstack/">Home</NavLink></li>
          <li><NavLink to="/infinite-scrolling-with-tanstack/trad">FetchOld</NavLink></li>
          <li><NavLink to="/infinite-scrolling-with-tanstack/rq">FetchRQ</NavLink></li>
          <li><NavLink to="/infinite-scrolling-with-tanstack/infinite">Infinite- Scroll</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

export default Header