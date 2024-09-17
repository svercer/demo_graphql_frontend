import './App.css'
import Home from "@/pages/Home.tsx";
import {Routes, Route} from 'react-router-dom'
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import Books from "@/pages/Books.tsx";
import Users from "@/pages/Users";
import Show from "@/pages/Users/Show.tsx";


function App() {

    return (
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Route
                path='/users'
                element={<Users />}
            />
            <Route
                path='/users/:id'
                element={<Show />}
            />
            <Route
                path='/books'
                element={<Books />}
            />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default App
