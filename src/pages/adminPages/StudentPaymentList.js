import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
    getStudentPaymentAction, getStudentPaymentListAction, getStudentsAction
} from "../../redux/actions/AppActions";
import {Link} from "react-router-dom";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";

import AdminLayout from "../../component/AdminLayout";
import Pagination from "react-js-pagination";

class StudentPaymentList extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getStudentPaymentListAction({page: 0, size: this.props.size}))

    }
    state = {
        currentObject: ''
    }
    handlePageChange(pageNumber) {
        this.props.dispatch(getStudentPaymentListAction({page: (pageNumber - 1), size: this.props.size}))
    }
    render() {
        const {currentObject} = this.state
        const {studentPayments,dispatch,page,size,totalElements} = this.props
        console.log(studentPayments)
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <Link to={"/admin/students"}>Studentlar</Link>
                    <Table className={"table-style w-75"}>
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Student</td>
                            <td>summa</td>
                            <td>Cash Foiz %</td>
                            <td>Tolov Turi</td>
                            <td>Izoh</td>
                            <td>Tolov vaqti</td>
                        </tr>
                        </thead>
                        <tbody>
                        {studentPayments ? studentPayments.map((item,i)=>
                            <tr key={i+1}>
                                <td>{i+1}</td>
                                <td>
                                    <Link to={"/admin/student/"+ (item && item.student
                                        ? item.student.id : '')}>
                                        {item && item.student && item.student.user ? item.student.user.fullName + " / " +item.student.user.phoneNumber : ''}
                                    </Link>
                                </td>
                                <td>{item.sum +" / " + item.cashSum}</td>
                                <td>{item && item.cashback ? item.cashback.percent + " %" : "0 %"}</td>
                                <td>{item.payType ? item.payType.name : ''}</td>
                                <td>{item.comment}</td>
                                <td>{item.payDate}</td>
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
            </AdminLayout>

        );
    }
}

StudentPaymentList.propTypes = {};


export default connect(({
                            app: {
                                studentPayments,page,size,totalElements
                            },
                        }) => ({
    studentPayments,page,size,totalElements
    })
)(StudentPaymentList);
///