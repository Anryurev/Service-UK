import {Routes, Route} from 'react-router-dom'
import {CalendarPage} from "./pages/CalendarPage";
import {ObjectsPage} from "./pages/ObjectsPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {UsersPage} from "./pages/UsersPage";

function App() {


    return (
        <>
            <div className="vh-100" style={ {background: "#e7ecef"} } >
                <Routes>
                        <Route path="/" element={<AuthorizationPage/>} />
                        <Route path="/home" element={<CalendarPage/>}/>
                        <Route path="/objects" element={<ObjectsPage/>}/>
                        <Route path="/users" element={<UsersPage/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

// e7ecef почти белый
// 274c77 темно-синий
// 6096ba синий
// a3cef1 голубой
// 8b8c89 серый
