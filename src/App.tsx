import { Outlet } from 'react-router-dom'
import './App.scss'
import Sidebar from './components/sidebar/Sidebar'
import BottomNavBar from './components/bottomNavBar/BottomNavBar'
import Header from './components/header/Header'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [openSidebar, setOpenSidebar] = useState(false);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }
  return (
    <>
      <div className='content'>
        <header className="flex justify-between items-center w-full h-max px-4 py-2 text-white">
          <Header />
        </header>
        <div className='content__main'>
          <aside id='aside' className={openSidebar ? 'aside close' : 'aside'}>
            <button onClick={toggleSidebar}>
              {
                openSidebar ?
                  <FontAwesomeIcon icon={faCircleRight} size="lg" /> :
                  <FontAwesomeIcon icon={faCircleLeft} size="lg" />
              }
            </button>
            <Sidebar />
          </aside>
          <main className='main-content'>
            <Outlet />
          </main>
        </div>
      </div>
      <div className='sticky bottom-0 left-0 w-full h-max  block lg:hidden bg-[var(--bg-container)] z-[996]'>
        <BottomNavBar />
      </div>
    </>
  )
}

export default App
