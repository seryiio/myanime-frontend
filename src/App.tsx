import { Outlet } from 'react-router-dom'
import './App.scss'
import Sidebar from './components/sidebar/Sidebar'
import BottomNavBar from './components/bottomNavBar/BottomNavBar'

function App() {

  return (
    <>
      <div className='relative top-0 left-0 w-full h-screen flex gap-2 p-2'>
        <Sidebar />
        <main className='main-content flex-1'>
          <Outlet />
        </main>
      </div>
      <div className='sticky bottom-0 left-0 w-full h-max  block lg:hidden bg-[var(--bg-container)] z-[996]'>
        <BottomNavBar />
      </div>
    </>
  )
}

export default App
