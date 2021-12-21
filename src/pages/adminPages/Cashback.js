import React, {Component} from 'react';
import {
    getRoomListAction,
    saveRoomAction,
    deleteRoomAction, getCashbackListAction, deleteCashbackAction, saveCashbackAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class Cashback extends Component {

    componentDidMount() {
        this.props.dispatch(getCashbackListAction())
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }



    render() {

        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, cashbacks} = this.props;
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
            this.setState(
                {
                    currentObject: item.id,
                    showDeleteModal: !this.state.showDeleteModal
                })
        }
        const deleteItem = () => {
            dispatch(deleteCashbackAction(currentObject))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
            }
            console.log(v);
            dispatch(saveCashbackAction(v))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Cashback</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={() => openModal('add')} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className={"table-style"}>
                        <thead className={""}>
                        <tr className={"text-center"}>
                            <th>№</th>
                            <th>Min summa</th>
                            <th>Cashback</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cashbacks ? cashbacks.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.price}</td>
                                <td>{item.percent}</td>
                                <td><input type="checkbox" checked={item.active}/></td>
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
                                {currentObject ? "Cashbackni tahrirlash" : "Yangi cashback qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.price : ""} type={"number"}
                                             label={"Min narx"} id={'name'} name={"price"} className={"form-control"}
                                             placeholer={"min narx"} autofocus required/>
                                    <AvField defaultValue={currentObject ? currentObject.percent : ""} type={"number"}
                                             label={"%"} id={'percent'} name={"percent"} className={"form-control"}
                                             placeholer={"cashback"} autofocus required/>
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

                    <Modal isOpen={this.state.showDeleteModal} toggle={() => openDeleteModal("")} className={""}>
                        <ModalHeader isOpen={this.state.showDeleteModal} toggle={() => openDeleteModal("")}
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

Cashback.propTypes = {}
export default connect(({
                            app: {loading, cashbacks, showModal, deleteModal, selectItems},
                        }) => ({
        loading, cashbacks, showModal, deleteModal, selectItems
    })
)(Cashback);