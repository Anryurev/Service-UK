import {Routes, Route} from 'react-router-dom'
import {CalendarPage} from "./pages/Operator/Calendar/CalendarPage";
import {ObjectsPage} from "./pages/Manager/Objects/ObjectsPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import {UsersPage} from "./pages/Manager/Users/UsersPage";
import {UserPage} from "./pages/Manager/Users/UserPage";
import {CreateBookingPage} from "./pages/Operator/CreateBookingPage";
import {ObjectPage} from "./pages/Manager/Objects/ObjectPage";
import {EdemBackState} from "./context/edemback/EdemBackState";
import {MainExecutorPage} from "./pages/Executors/MainExecutorPage";
import {ReportPage} from "./pages/Executors/ReportPage";
import  { RemoveScrollBar }  from  'react-remove-scroll-bar'
import {Userstate} from "./context/userContext/UserState";
import {CreateUserPage} from "./pages/Manager/Users/CreateUserPage";
import {RolesPage} from "./pages/Manager/Roles/RolesPage";
import {OfficesPage} from "./pages/Manager/Offices/OfficesPage";
import {OfficePage} from "./pages/Manager/Offices/OfficePage";
import {CreateObjectPage} from "./pages/Manager/Objects/CreateObjectPage";
import {CreateOfficePage} from "./pages/Manager/Offices/CreateOfficePage";
import {CreateRolePage} from "./pages/Manager/Roles/CreateRolePage";
import {EditObjectPage} from "./pages/Manager/Objects/EditObjectPage";
import {EditUserPage} from "./pages/Manager/Users/EditUserPage";
import {CalendarAdminPage} from "./pages/Administrator/CalendarAdminPage";
import {RequestDescriptionPage} from "./pages/Administrator/RequestDescriptionPage";
import {RequestExecutPage} from "./pages/Administrator/RequestExecutPage";
import {RequestObjectPage} from "./pages/Administrator/RequestObjectPage";
import {RequestPage} from "./pages/Administrator/RequestPage";
import {RequestContext} from "./context/requestContext/RequestContext";
import {RequestState} from "./context/requestContext/RequestState";
import {BookingDatePage} from "./pages/Operator/BookingDatePage";

function App() {


    return (
        <>
            {/*< RemoveScrollBar  />*/}
            <EdemBackState>
                <Userstate>
                    <RequestState>
                    <div className="fullscreen-background"></div>
                        <Routes>
                            <Route path="/" element={<AuthorizationPage/>} />
                            <Route path="/home" element={<CalendarPage/>}/>
                            <Route path="/objects" element={<ObjectsPage/>}/>
                            <Route path="/Users" element={<UsersPage/>}/>
                            <Route path="/Users/:userId" element={<UserPage/>}/>
                            <Route path="/objects/:objectId" element={<ObjectPage/>}/>
                            <Route path="/booking/create" element={<CreateBookingPage/>}/>
                            <Route path="/execut" element={<MainExecutorPage/>}/>
                            <Route path="/execut/report" element={<ReportPage/>}/>
                            <Route path="/Users/create" element={<CreateUserPage/>}/>
                            <Route path="/objects/create" element={<CreateObjectPage/>}/>
                            <Route path="/offices/create" element={<CreateOfficePage/>}/>
                            <Route path="/roles/create" element={<CreateRolePage/>}/>
                            <Route path="/roles" element={<RolesPage/>}/>
                            <Route path="/offices" element={<OfficesPage/>}/>
                            <Route path="/offices/:officeId" element={<OfficePage/>}/>
                            <Route path="/object/:objectId" element={<EditObjectPage/>}/>
                            <Route path="/user/:userId" element={<EditUserPage/>}/>
                            <Route path="/calendar" element={<CalendarAdminPage/>}/>
                            <Route path="/request/object" element={<RequestObjectPage/>}/>
                            <Route path="/request/:requestId" element={<RequestPage/>}/>
                            <Route path="/request/execut" element={<RequestExecutPage/>}/>
                            <Route path="/request/description" element={<RequestDescriptionPage/>}/>
                            <Route path="/bookings/:date" element={<BookingDatePage/>}/>
                        </Routes>
                    </RequestState>
                </Userstate>
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