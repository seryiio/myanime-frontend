import { Outlet } from 'react-router-dom'
import './App.scss'
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header'

function App() {

  return (
    <>
      <Header />
      <div className='flex gap-2 h-[92vh] p-2'>
        <Sidebar />
        <main className='main-content flex-1'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
