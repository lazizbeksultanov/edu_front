import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Nav, NavItem, NavLink, TabContent, Table, TabPane} from "reactstrap";
import {
    getStudentAction,
    getStudentPaymentAction, getStudentPaymentListAction, getStudentsAction, getTeacherSalaryAppAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";

class TeacherFinance extends Component {

    handlePageChange(pageNumber) {
        console.clear()
        this.props.dispatch(getStudentsAction({page: (pageNumber - 1), size: this.props.size}))
    }

    componentDidMount() {
        console.clear()
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getStudentAction({id: id}))
        }
        this.props.dispatch(getStudentPaymentListAction({page: 0, size: this.props.size}))
        this.props.dispatch(getTeacherSalaryAppAction())
    }

    state = {
        showModal: false,
        showPaymentModal: false,
        showModal1: false,
        showPaymentEditModal: false,
        currentObject: '',
        addGroup: "",
        activeTab: "1",
        percentOfCash: "",
        sumOfCash: "",
        cashBackSumm : 0,
    }

    render() {

        const {currentObject, activeTab,} = this.state;
        const {
            dispatch,studentPayments,page,size,totalElements, teacherSalaryAppApi
        } = this.props;
        console.log(studentPayments)


        const toggle = tab => {
            if (activeTab !== tab)
                this.setState({activeTab: tab})
            if (tab === "2") {
                if (this.props.match && this.props.match.params && this.props.match.params.id) {
                    dispatch(getStudentPaymentAction(this.props.match.params.id))
                }
            }
        }
        function showHide() {
            var element = document.getElementById("filtrMenu");
            element.classList.toggle("hide");
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className="container">
                    <h3>Moliya</h3>
                    <h5 className="mb-3" onClick={showHide}>Filtr</h5>
                    <div id="filtrMenu">
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <input type="date" className="form-control"/>
                            </div>
                            <div className="col-md-3">
                                <input type="date" className="form-control"/>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary">Filtrlash</button>
                            </div>
                        </div>
                    </div>
                    <Nav tabs>
                        <NavItem className={""}>
                            <NavLink
                                onClick={() => {
                                    toggle('1');
                                }}
                            >
                                Barchasi
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    toggle('2');
                                }}
                            >
                                To'lovlar
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-75"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>O'qituvchi</td>
                                            <td>Summa</td>
                                            <td>Tolov Turi</td>
                                            <td>Izoh</td>
                                            <td>Tolov vaqti</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {console.log(teacherSalaryAppApi)}
                                        {teacherSalaryAppApi ? teacherSalaryAppApi.map((item,i)=>
                                            <tr key={i+1}>
                                                <td>{i+1}</td>
                                                <td>
                                                    <Link to={"/admin/teacher/"+ (item  && item.teacherId ? item.teacherId:'')}>
                                                        {item  ? item.teacherName: ''}
                                                    </Link>
                                                </td>
                                                <td>{item && item.amount ? item.amount : ""}</td>
                                                <td>{item.payType ? item.payType.name : ''}</td>
                                                <td>{item.description}</td>
                                                <td>{item.amountDate}</td>
                                            </tr>
                                        ) : 'Malumot topilmadi'}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        activePage={page + 1}
                                        itemsCountPerPage={size}
                                        totalItemsCount={totalElements}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </TabPane>
                        {/*<TabPane tabId="2">*/}
                        {/*    <div>*/}
                        {/*        <div className={"flex-column container"}>*/}
                        {/*            <Table className={"table-style w-100"}>*/}
                        {/*                <thead>*/}
                        {/*                <tr>*/}
                        {/*                    <td>#</td>*/}
                        {/*                    <td>Student</td>*/}
                        {/*                    <td>Summa</td>*/}
                        {/*                    <td>Cash Foiz %</td>*/}
                        {/*                    <td>Tolov Turi</td>*/}
                        {/*                    <td>Izoh</td>*/}
                        {/*                    <td>Tolov vaqti</td>*/}
                        {/*                </tr>*/}
                        {/*                </thead>*/}
                        {/*                <tbody>*/}
                        {/*                {console.log(studentPayments)}*/}
                        {/*                {studentPayments ? studentPayments.map((item,i)=>*/}
                        {/*                    <tr key={i+1}>*/}
                        {/*                        <td>{i+1}</td>*/}
                        {/*                        <td>*/}
                        {/*                            <Link to={"/admin/student/"+ (item && item.student && item.student.user ? item.student.user.id:'')}>*/}
                        {/*                                {item && item.student && item.student.user ? item.student.user.fullName + " / " +item.student.user.phoneNumber : ''}*/}
                        {/*                            </Link>*/}
                        {/*                        </td>*/}
                        {/*                        <td>{item.sum +" / " + item.cashSum}</td>*/}
                        {/*                        <td>{item && item.cashback ? item.cashback.percent + " %" : ""}</td>*/}
                        {/*                        <td>{item.payType ? item.payType.name : ''}</td>*/}
                        {/*                        <td>{item.comment}</td>*/}
                        {/*                        <td>{item.payDate}</td>*/}
                        {/*                    </tr>*/}
                        {/*                ) : 'Malumot topilmadi'}*/}
                        {/*                </tbody>*/}
                        {/*            </Table>*/}
                        {/*            <Pagination*/}
                        {/*                activePage={page + 1}*/}
                        {/*                itemsCountPerPage={size}*/}
                        {/*                totalItemsCount={totalElements}*/}
                        {/*                pageRangeDisplayed={5}*/}
                        {/*                onChange={this.handlePageChange.bind(this)} itemClass="page-item"*/}
                        {/*                linkClass="page-link"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</TabPane>*/}
                    </TabContent>
                </div>
            </AdminLayout>
        );
    }
}

TeacherFinance.propTypes = {};

export default connect(({
                            app: {
                                studentPayments,
                                page,size,totalElements,teacherSalaryAppApi

                            },
                        }) => ({
        studentPayments,page,size,totalElements,teacherSalaryAppApi
    })
)(TeacherFinance);
