import React, { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const Start = () => {

  const user = useContext(UserDataContext);
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(./assets/photo.jpg)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src='https://imgs.search.brave.com/dM7ayL6GDeUdg0B9CD0crlUFx0UiJNfkV76vRd3YMGc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzMzLzIvdWJlci1s/b2dvLXBuZ19zZWVr/bG9nby0zMzg4NzIu/cG5n'></img>
        <div className='bg-white py-5 pb-7 px-5'>
          <h2 className='text-3xl font-bold'>Get Started with UBER</h2>
          <Link to="/userLogin" className='flex justify-center items-center w-full bg-black text-white py-3 rounded mt-3'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start
