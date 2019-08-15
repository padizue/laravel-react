import React from 'react'
    import { Link } from 'react-router-dom'

    const Header = () => (
        <nav className='navbar navbar-expand-md navbar-light navbar-laravel' style={{
    backgroundColor: '#000',
    color: '#fff',
    marginBottom: '16px'
       }}>
        <div className='container'>
          <Link style={{ color: 'white' }} className='navbar-brand' to='/'>Genres</Link>
          <Link style={{ color: 'white' }} className='navbar-brand' to='/crud-genre'>Manage Genres</Link>
          <Link style={{ color: 'white' }} className='navbar-brand' to='/crud-movie'>Manage Movies</Link>
        </div>
      </nav>
    )

export default Header
