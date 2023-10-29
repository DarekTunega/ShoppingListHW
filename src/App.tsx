import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListDetail from './Routes/ListDetail'
import Layout from './Components/Layout'
import { UserProvider } from './Providers/UserProvider'
import MainPage from './Routes/MainPage'

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Layout />
                <div>
                    <Routes>
                        <Route path='/' Component={MainPage} />
                        <Route path='/listDetail/:id' Component={ListDetail} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
