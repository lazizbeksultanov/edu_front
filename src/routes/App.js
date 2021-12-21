import React from "react";
import {Route, Switch} from "react-router-dom";
import store from "../redux";
import {Provider} from "react-redux";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/adminPages/Dashboard";
import DurationType from "../pages/adminPages/DurationType";
import Reklama from "../pages/adminPages/Reklama"
import Region from "../pages/adminPages/Region";
import Course from "../pages/adminPages/Course";
import CourseCategory from "../pages/adminPages/CourseCategory";
import AddTeacher from "../pages/adminPages/Teacher";
import GeneralSetting from "../pages/adminPages/GeneralSetting";
import Room from "../pages/adminPages/Room";
import Cashback from "../pages/adminPages/Cashback";
import SelectCourse from "../pages/adminPages/SelectCourse";
import Group from "../pages/adminPages/Group";
import Student from "../pages/adminPages/Student";
import PayType from "../pages/adminPages/PayType";
import SelectStudent from "../pages/adminPages/SelectStudent";
import SelectTeacher from "../pages/adminPages/SelectTeacher";
import SelectGroup from "../pages/adminPages/SelectGroup";
import Client from "../pages/adminPages/Client"
import Staff from "../pages/adminPages/Staff";
import Appeal from "../pages/adminPages/Appeal";
import Card from "../pages/card/Card";
import ClientStatus from "../pages/adminPages/ClientStatus";
import Toplam from "../pages/adminPages/Toplam";
import SelectAppeal from "../pages/adminPages/SelectAppeal";
import SelectToplam from "../pages/adminPages/SelectToplam";
import StudentPaymentList from "../pages/adminPages/StudentPaymentList";
import studentPaymentCashbacks from "../pages/adminPages/studentPaymentCashbacks";
import Finance from "../pages/adminPages/TeacherFinance";
import StudentFinance from "../pages/adminPages/StudentFinance";
import Attandance from "../pages/adminPages/Attandance";


const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <PublicRoute exact path="/" component={HomePage}/>
                <PublicRoute exact path="/login" component={Login}/>
                <PrivateRoute exact path="/admin" component={Dashboard}/>
                <PrivateRoute exact path="/admin/attandance" component={Attandance}/>
                <PrivateRoute exact path="/admin/durationType" component={DurationType}/>
                <PrivateRoute exact path="/admin/region" component={Region}/>
                <PrivateRoute exact path="/admin/course/select/:id" component={SelectCourse}/>
                <PrivateRoute exact path="/admin/course/:id" component={Course}/>
                <PrivateRoute exact path="/admin/courses/list" component={CourseCategory}/>
                <PrivateRoute exact path="/admin/courses" component={CourseCategory}/>
                <PrivateRoute exact path="/admin/course" component={CourseCategory}/>
                <PrivateRoute exact path="/admin/groups" component={Group}/>
                <PrivateRoute exact path="/admin/group/:id" component={SelectGroup}/>
                <PrivateRoute exact path="/admin/students" component={Student}/>
                <PrivateRoute exact path="/admin/student/:id" component={SelectStudent}/>
                {/*<PrivateRoute exact path="/admin/courseCategory/:id" component={CourseCategory}/>*/}
                <PrivateRoute exact path="/admin/teachers" component={AddTeacher}/>
                <PrivateRoute exact path="/admin/teacher/:id" component={SelectTeacher}/>
                {/*<PrivateRoute exact path="/admin/reklama" component={Reklama}/>*/}
                <PrivateRoute exact path="/admin/room" component={Room}/>
                <PrivateRoute exact path="/admin/cashback" component={Cashback}/>
                <PrivateRoute exact path="/admin/payType" component={PayType}/>
                <PrivateRoute exact path="/admin/general" component={GeneralSetting}/>
                <PrivateRoute exact path="/admin/studentPayment" component={StudentPaymentList}/>
                <PrivateRoute exact path="/admin/studentPaymentCashbacks" component={studentPaymentCashbacks}/>
                <PrivateRoute exact path="/admin/clients" component={Client}/>
                <PrivateRoute exact path="/admin/staff" component={Staff}/>
                <PrivateRoute exact path="/admin/reklama" component={Reklama}/>
                <PrivateRoute exact path="/admin/appeals" component={Appeal}/>
                <PrivateRoute exact path="/admin/clientStatus" component={ClientStatus}/>/>
                <PrivateRoute exact path="/admin/toplam" component={Toplam}/>/>
                <PrivateRoute exact path="/admin/appeal/:id" component={SelectAppeal}/>/>
                <PrivateRoute exact path="/admin/appeal/toplam/:id" component={SelectToplam}/>/>
                <PrivateRoute exact path="/admin/toplam/:id" component={SelectToplam}/>/>
                <PrivateRoute exact path="/admin/finance" component={Finance} />
                <PrivateRoute exact path="/admin/StudentFinance" component={StudentFinance} />
                <Route component={NotFound}/>
            </Switch>
        </Provider>
    );
}

export default App;