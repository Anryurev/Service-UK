import {Routes, Route} from 'react-router-dom'
import {CalendarPage} from "./pages/CalendarPage";
import {ObjectsPage} from "./pages/ObjectsPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import {UsersPage} from "./pages/UsersPage";
import {UserPage} from "./pages/UserPage";
import {CreateBookingPage} from "./pages/CreateBookingPage";
import {ObjectPage} from "./pages/ObjectPage";
import {EdemBackState} from "./context/edemback/EdemBackState";

function App() {


    return (
        <>
            <EdemBackState>
                <div className="vh-100" style={ {background: "#e7ecef"} } >
                    <Routes>
                        <Route path="/" element={<AuthorizationPage/>} />
                        <Route path="/home" element={<CalendarPage/>}/>
                        <Route path="/objects" element={<ObjectsPage/>}/>
                        <Route path="/users" element={<UsersPage/>}/>
                        <Route path="/users/:userId" element={<UserPage/>}/>
                        <Route path="/objects/:objectId" element={<ObjectPage/>}/>
                        <Route path="/booking/create" element={<CreateBookingPage/>}/>
                    </Routes>
                </div>
            </EdemBackState>
        </>
    );
}

export default App;

// e7ecef почти белый
// 274c77 темно-синий
// 6096ba синий
// a3cef1 голубой
// 8b8c89 серый
