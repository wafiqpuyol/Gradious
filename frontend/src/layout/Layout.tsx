import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {/* Hero */}
            {/* search bar */}
            <div className='container mx-auto py-10 flex-1'><Outlet /></div>
            {/* footer */}
        </div>
    )
}

export default Layout