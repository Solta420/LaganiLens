
import Footer from './Components/Footer'
import { Outlet } from 'react-router'

const Root = () => {
    return (

        <div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Root
