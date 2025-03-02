import {Navbar} from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import {Calendar} from "./pages/Calendar";
import {Objects} from "./pages/Objects";
import {Authorization} from "./pages/Authorization";
import {Registration} from "./pages/Registration";

function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={<Authorization/>} />
                <Route path="/home" element={<Calendar/>}/>
                <Route path="/objects" element={<Objects/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>
        </>
    );
}

export default App;

// e7ecef почти белый
// 274c77 темно-синий
// 6096ba синий
// a3cef1 голубой
// 8b8c89 серый
