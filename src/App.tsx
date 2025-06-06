import {Routes, Route} from 'react-router-dom'
import {CalendarPage} from "./pages/Operator/Calendar/CalendarPage";
import {ObjectsPage} from "./pages/Manager/Objects/ObjectsPage";
import {AuthorizationPage} from "./pages/AuthorizationPage";
import {WorkersPage} from "./pages/Manager/Workers/WorkersPage";
import {WorkerPage} from "./pages/Manager/Workers/WorkerPage";
import {CreateBookingPage} from "./pages/Operator/CreateBookingPage";
import {ObjectPage} from "./pages/Manager/Objects/ObjectPage";
import {EdemBackState} from "./context/edemback/EdemBackState";
import {MainExecutorPage} from "./pages/Executors/MainExecutorPage";
import {CreateReportPage} from "./pages/Executors/CreateReportPage";
import {WorkerState} from "./context/workerContext/WorkerState";
import {CreateWorkerPage} from "./pages/Manager/Workers/CreateWorkerPage";
import {RolesPage} from "./pages/Manager/Roles/RolesPage";
import {OfficesPage} from "./pages/Manager/Offices/OfficesPage";
import {OfficePage} from "./pages/Manager/Offices/OfficePage";
import {CreateObjectPage} from "./pages/Manager/Objects/CreateObjectPage";
import {CreateOfficePage} from "./pages/Manager/Offices/CreateOfficePage";
import {CreateRolePage} from "./pages/Manager/Roles/CreateRolePage";
import {EditObjectPage} from "./pages/Manager/Objects/EditObjectPage";
import {EditWorkerPage} from "./pages/Manager/Workers/EditWorkerPage";
import {CalendarAdminPage} from "./pages/Administrator/CalendarAdminPage";
import {RequestDescriptionPage} from "./pages/Administrator/Request/RequestDescriptionPage";
import {RequestExecutPage} from "./pages/Administrator/Request/RequestExecutPage";
import {RequestObjectPage} from "./pages/Administrator/Request/RequestObjectPage";
import {RequestPage} from "./pages/Administrator/Request/RequestPage";
import {BookingDatePage} from "./pages/Operator/BookingDatePage";
import {WorksPage} from "./pages/Manager/Works/WorksPage";
import {CreateWorkPage} from "./pages/Manager/Works/CreateWorkPage";
import {RolePage} from "./pages/Manager/Roles/RolePage";
import {EditRolePage} from "./pages/Manager/Roles/EditRolePage";
import {WorkPage} from "./pages/Manager/Works/WorkPage";
import {EditWorkPage} from "./pages/Manager/Works/EditWorkPage";
import {EditBookingPage} from "./pages/Operator/EditBookingPage";
import {RequestsPage} from "./pages/Administrator/Request/RequestsPage";
import {CreateRequestExecutPage} from "./pages/Executors/CreateRequestExecutPage";
import {SendLinkPage} from "./pages/RecoverPassword/SendLinkPage";
import {ResetPasswordPage} from "./pages/RecoverPassword/ResetPasswordPage";
import {ReportsPage} from "./pages/Administrator/ReportsPage";
import ReportPage from "./pages/Administrator/ReportPage";

function App() {
    return (
        <>
            {/*< RemoveScrollBar  />*/}
            <EdemBackState>
                <WorkerState>
                    <div className="fullscreen-background"></div>
                        <Routes>
                            <Route path="/" element={<AuthorizationPage/>} />
                            <Route path="/home" element={<CalendarPage/>}/>
                            <Route path="/objects" element={<ObjectsPage/>}/>
                            <Route path="/workers" element={<WorkersPage/>}/>
                            <Route path="/workers/:workerId" element={<WorkerPage/>}/>
                            <Route path="/objects/:objectId" element={<ObjectPage/>}/>
                            <Route path="/booking/create" element={<CreateBookingPage/>}/>
                            <Route path="/booking/:bookingId" element={<EditBookingPage/>}/>
                            <Route path="/execut" element={<MainExecutorPage/>}/>
                            <Route path="/execut/report/:requestId" element={<CreateReportPage/>}/>
                            <Route path="/execut/request" element={<CreateRequestExecutPage/>}/>
                            <Route path="/workers/create" element={<CreateWorkerPage/>}/>
                            <Route path="/objects/create" element={<CreateObjectPage/>}/>
                            <Route path="/offices/create" element={<CreateOfficePage/>}/>
                            <Route path="/roles/create" element={<CreateRolePage/>}/>
                            <Route path="/roles" element={<RolesPage/>}/>
                            <Route path="/roles/:roleId" element={<RolePage/>}/>
                            <Route path="/offices" element={<OfficesPage/>}/>
                            <Route path="/offices/:officeId" element={<OfficePage/>}/>
                            <Route path="/object/:objectId" element={<EditObjectPage/>}/>
                            <Route path="/worker/:workerId" element={<EditWorkerPage/>}/>
                            <Route path="/role/:roleId" element={<EditRolePage/>}/>
                            <Route path="/calendar" element={<CalendarAdminPage/>}/>
                            <Route path="/requests" element={<RequestsPage/>}/>
                            <Route path="/request/object" element={<RequestObjectPage/>}/>
                            <Route path="/request/:requestId" element={<RequestPage/>}/>
                            <Route path="/request/execut" element={<RequestExecutPage/>}/>
                            <Route path="/request/description" element={<RequestDescriptionPage/>}/>
                            <Route path="/reports" element={<ReportsPage/>}/>
                            <Route path="/reports/:reportId" element={<ReportPage/>}/>
                            <Route path="/bookings/:date" element={<BookingDatePage/>}/>
                            <Route path="/works" element={<WorksPage/>}/>
                            <Route path="/works/create" element={<CreateWorkPage/>}/>
                            <Route path="/works/:workId" element={<WorkPage/>}/>
                            <Route path="/work/:workId" element={<EditWorkPage/>}/>
                            <Route path="/recover-password" element={<SendLinkPage/>}/>
                            <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                        </Routes>
                </WorkerState>
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