import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {deleteDurationTypeAction, getDurationTypesAction, saveDurationTypeAction} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import AdminLayout from "../../component/AdminLayout";

class DurationType extends Component {
    componentDidMount() {
        this.props.dispatch(getDurationTypesAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, durationTypes} = this.props;
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const openDeleteModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const deleteItem = (item) => {
            dispatch(deleteDurationTypeAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            dispatch(saveDurationTypeAction(v))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Vaqt turlari</h1>
                    <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                    <Table>
                        <thead className={"bg-dark text-white"}>
                        <tr>
                            <th>No</th>
                            <th>Nomi</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {durationTypes ? durationTypes.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td><input type="checkbox" checked={item.active}/></td>
                                <td>
                                    <Button color={"warning"} onClick={() => openModal(item)}
                                            className={"mx-1"}>Tahrirlash</Button>
                                    <Button color={"danger"} onClick={() => openDeleteModal(item)}>O'chirish</Button>
                                </td>
                            </tr>
                        ) : ""}
                        </tbody>
                    </Table>

                    <Modal isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Tahrirlash" : "Qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} name={"active"}/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                                <Button color="primary">Saqlash</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>

                    <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                        <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            Rostdan ham ushbu elementni o'chirishni istaysizmi?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Bekor qilish</Button>
                            <Button color="danger" onClick={() => deleteItem(currentObject)}>O'chirish</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}

DurationType.propTypes = {};

export default connect(({
                            app: {loading, durationTypes, showModal, deleteModal},
                        }) => ({
        loading, durationTypes, showModal, deleteModal
    })
)(DurationType);
