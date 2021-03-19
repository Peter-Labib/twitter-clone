import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='nav mb-4'>
            <NavLink className='nav-link' activeClassName='active' to='/' exact>Home</NavLink>
            <NavLink className='nav-link' activeClassName='active' to='/new'>New Tweet</NavLink>
        </nav>
    )
}

export default Nav
