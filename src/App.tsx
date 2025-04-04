import {Routes, Route} from 'react-router-dom'
import {CalendarPage} from "./pages/Manager/CalendarPage";
import {ObjectsPage} from "./pages/Manager/ObjectsPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import {UsersPage} from "./pages/Manager/UsersPage";
import {UserPage} from "./pages/Manager/UserPage";
import {CreateBookingPage} from "./pages/Manager/CreateBookingPage";
import {ObjectPage} from "./pages/Manager/ObjectPage";
import {EdemBackState} from "./context/edemback/EdemBackState";
import {MainExecutorPage} from "./pages/Executors/MainExecutorPage";
import {ReportPage} from "./pages/Executors/ReportPage";
import  { RemoveScrollBar }  from  'react-remove-scroll-bar'
import {UserState} from "./context/userContext/UserState";
import {CreateUserPage} from "./pages/Manager/CreateUserPage";
import {RolesPage} from "./pages/Manager/RolesPage";

function App() {


    return (
        <>
            {/*< RemoveScrollBar  />*/}
            <EdemBackState>
                <UserState>
                    <div className="fullscreen-background"></div>
                    <Routes>
                        <Route path="/" element={<AuthorizationPage/>} />
                        <Route path="/home" element={<CalendarPage/>}/>
                        <Route path="/objects" element={<ObjectsPage/>}/>
                        <Route path="/users" element={<UsersPage/>}/>
                        <Route path="/users/:userId" element={<UserPage/>}/>
                        <Route path="/objects/:objectId" element={<ObjectPage/>}/>
                        <Route path="/booking/create" element={<CreateBookingPage/>}/>
                        <Route path="/execut" element={<MainExecutorPage/>}/>
                        <Route path="/execut/report" element={<ReportPage/>}/>
                        <Route path="/users/create" element={<CreateUserPage/>}/>
                        <Route path="/roles" element={<RolesPage/>}/>
                    </Routes>
                </UserState>
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