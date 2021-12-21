import React, {Component} from 'react';
import {
    getPayTypeListAction,
    savePayTypeAction,
    deletePayTypeAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class PayType extends Component {

    componentDidMount() {
        this.props.dispatch(getPayTypeListAction())
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, payTypes} = this.props;
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
            this.setState({currentObject: item.id, showDeleteModal: !this.state.showDeleteModal})
        }
        const deleteItem = () => {
            dispatch(deletePayTypeAction(currentObject))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
            }
            dispatch(savePayTypeAction(v))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>To'lova turlari</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className={"table-style"}>
                        <thead>
                        <tr className={"text-center"}>
                            <th>№</th>
                            <th>Nomi</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payTypes ? payTypes.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td><input type="checkbox" id={item.name} checked={item.active}/></td>
                                <td>
                                    <Button className="table-icon" onClick={() => openModal(item)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        ) : ''}
                        </tbody>
                    </Table>

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject ? "To'lova turini tahrirlash" : "Yangi to'lov turi qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Holati"} name={"active"}/>
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
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Yo'q</Button>
                            <Button color="light" onClick={() => deleteItem(currentObject)}>Ha</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}

PayType.propTypes = {}
export default connect(({
                            app: {loading, payTypes, showModal, deleteModal, selectItems},
                        }) => ({
        loading, payTypes, showModal, deleteModal, selectItems
    })
)(PayType);