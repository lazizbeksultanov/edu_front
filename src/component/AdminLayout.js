import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './adminLayout.scss'
import '../pages/universal.scss'
import {LogoIcon, LogoMiniIcon, ToggleIcon} from "./Icons";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {config} from "../utils/config";

class AdminLayout extends Component {
    render() {
        const {currentUser, addMenu, addMenu1, menuHidden, dispatch} = this.props;
        const changeMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    menuHidden: !menuHidden
                }
            })
        }
        const secondMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    addMenu: !addMenu,
                }
            })
        }
        const thirdMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    addMenu1: !addMenu1,
                }
            })
        }
        return (
            <div className={"admin-layout-page"}>
                <div className={"main-layout"}>
                    <div
                        className={menuHidden ? "main-layout-left main-layout-left-hidden" : "main-layout-left"}>
                        <div className="main-link-div">
                            <Link to="/admin" className={
                                this.props.pathname === "/admin" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-dashboard"/>
                                <div className="main-link">
                                    Dashboard
                                </div>
                            </Link>

                            <Link to="/admin/attandance" className={
                                this.props.pathname === "/admin/attandance" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-dashboard"/>
                                <div className="main-link">
                                    Davomat
                                </div>
                            </Link>

                            <Link to="/admin/students" className={
                                this.props.pathname === "/admin/students" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-customer"/>
                                <div className="main-link">
                                    Talabalar
                                </div>
                            </Link>
                            <Link to="/admin/appeals" className={
                                this.props.pathname === "/admin/appeals" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-customer"/>
                                <div className="main-link">
                                    Murojaatlar
                                </div>
                            </Link>
                            <Link to="/admin/courses/list" className={
                                this.props.pathname && this.props.pathname.startsWith("/admin/course") ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-time"/>
                                <div className="main-link">
                                    Kurslar
                                </div>
                            </Link>
                            <Link to="/admin/groups" className={
                                this.props.pathname === "/admin/groups" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Guruhlar
                                </div>
                            </Link>
                            <Link to="/admin/teachers" className={
                                this.props.pathname === "/admin/teachers" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    O'qituvchilar
                                </div>
                            </Link>
                            <Link to="#" onClick={thirdMenu} className={
                                this.props.pathname === "/admin/finance" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Moliya
                                </div>
                            </Link>
                            <Link to="#" onClick={secondMenu} className={
                                this.props.pathname === "/admin/room" ||
                                this.props.pathname === "/admin/payType" ||
                                this.props.pathname === "/admin/region"
                                    ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-setting"/>
                                <div className="main-link">
                                    Sozlamalar
                                </div>
                            </Link>
                        </div>
                    </div>
                    {addMenu}
                    <div
                        className={"additional-menu " + (addMenu ? menuHidden ? " additional-menu-small" : " open-add-menu" : " additional-menu-hidden")} onClick={addMenu}>
                        <div className="main-link-div">
                            <Link to="/admin/room" className={
                                this.props.pathname === "/admin/room" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Xonalar
                                </div>
                            </Link>
                            <Link to="/admin/reklama" className={
                                this.props.pathname === "/admin/reklama" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Reklama turlari
                                </div>
                            </Link>
                            <Link to="/admin/clientStatus" className={
                                this.props.pathname === "/admin/clientStatus" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Murojaat bo'limlari
                                </div>
                            </Link>
                            <Link to="/admin/toplam" className={
                                this.props.pathname === "/admin/toplam" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    To'plam
                                </div>
                            </Link>
                            <Link to="/admin/cashback" className={
                                this.props.pathname === "/admin/cashback" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-payment"/>
                                <div className="main-link">
                                    Cashback
                                </div>
                            </Link>
                            <Link to="/admin/payType" className={
                                this.props.pathname === "/admin/payType" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-payment"/>
                                <div className="main-link">
                                    To'lov turlari
                                </div>
                            </Link>
                            <Link to="/admin/region" className={
                                this.props.pathname === "/admin/region" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-globus"/>
                                <Link to="/admin/region"
                                      className="main-link">
                                    Hududlar
                                </Link>
                            </Link>
                            <Link to="/admin/staff" className={
                                this.props.pathname === "/admin/staff" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <Link to="/admin/staff"
                                      className="main-link">
                                    Xodimlar
                                </Link>
                            </Link>
                            <Link to="/admin/staff" className={
                                this.props.pathname === "/admin/studentPaymentList" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <Link to="/admin/studentPayment"
                                      className="main-link">
                                    StudentPaymentlar
                                </Link>
                            </Link>
                            <Link to="/admin/staff" className={
                                this.props.pathname === "/admin/studentPaymentCashbacks" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <Link to="/admin/studentPaymentCashbacks"
                                      className="main-link">
                                    StudentPayment Cashbacklar
                                </Link>
                            </Link>
                        </div>
                    </div>
                    <div className={"additional-menu " + (addMenu1 ? menuHidden ? " additional-menu-small" : " open-add-menu" : " additional-menu-hidden")} onClick={addMenu1}>
                        <div className={"main-link-div"}>
                            <Link to="/admin/StudentFinance" className={
                                this.props.pathname === "/admin/" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Student Moliya
                                </div>
                            </Link>
                            <Link to="/admin/finance" className={
                                this.props.pathname === "/admin/reklama" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Teacher Moliya
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="main-layout-right">
                        {this.props.children}
                    </div>
                    <Row className={"top-menu mx-0 my-auto"}>
                        <div
                            className={"top-menu-left mx-auto" + (menuHidden ? " top-menu-left-hidden" : " top-menu-left-visible")}>
                            {menuHidden ?
                                <LogoMiniIcon/>
                                :
                                <LogoIcon/>}
                        </div>
                        <div className={"top-menu-toggle text-left"}>
                            <Button className={"toggle-button"} onClick={changeMenu}>
                                <ToggleIcon/>
                            </Button>
                        </div>
                        <Col className={"top-menu-right ml-auto text-right my-auto"}>
                            <div className="about-user my-auto">
                                <div className={"avatar" + (currentUser && currentUser.photoId ? "" : " no-avatar")}>
                                    <img
                                        src={currentUser.photoId ? config.BASE_URL + "/attachment/" + currentUser.photoId : "/assets/img/avatar.png"}
                                        alt=""/>
                                </div>
                                <div className="name-title my-auto">
                                    {currentUser ? currentUser.fullName : ""}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect(
    ({
         app: {
             isOpenGeneral,
             isOpenUser,
             isOpenPages,
             isOpen,
             openCol,
             loading,
             isFilter,
             filters,
             search,
             notifications
         }
         ,
         auth: {addMenu, addMenu1, menuHidden, isAdmin, isSuperAdmin, currentUser}
     }
    ) =>
        ({
            addMenu,
            addMenu1,
            menuHidden,
            isOpenGeneral,
            isOpenPages,
            isAdmin,
            currentUser,
            isOpenUser,
            isOpen,
            isSuperAdmin,
            openCol,
            loading,
            isFilter,
            filters,
            search,
            notifications
        })
)
(AdminLayout);
