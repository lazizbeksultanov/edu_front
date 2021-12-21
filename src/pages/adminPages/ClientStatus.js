import React, {Component} from 'react';
import {
    deleteClientStatusAction,
    deleteReklamaAction,
    getClientStatusListAction,
    getReklamaAction, saveClientStatusAction,
    saveReklamaAction
} from "../../redux/actions/AppActions";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvRadio, AvRadioGroup} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class ClientStatus extends Component {
    componentDidMount() {
        this.props.dispatch(getClientStatusListAction({type: "all"}))
    }

    state = {
        showModal: false,
        currentObject: "",
        selectReklama: [],
        selectParentReklama: "",
        parentReklamaDisable: false
    }

    render() {
        const {dispatch, showModal, deleteModal, clientStatusList} = this.props
        const {currentObject} = this.state

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
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id)
                v.id = currentObject.id
            dispatch(saveClientStatusAction(v))
        }
        const deleteNumber = (item) => {
            dispatch(deleteClientStatusAction(item))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>Murojaat bo'limlari</h3>
                    </hgroup>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className="table-style">
                        <thead className={""}>
                        <tr>
                            <th>№</th>
                            <th>Nomi</th>
                            <th>Bo'lim</th>
                            <th>Holat</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientStatusList && clientStatusList.length > 0 ? clientStatusList.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.clientStatusEnum &&
                                item.clientStatusEnum === "REQUEST" ? "So'rov" :
                                    item.clientStatusEnum === "WAITING" ? "Kutish" :
                                        item.clientStatusEnum === "COLLECTION" ? "To'plam" : ""
                                }</td>
                                <td><input type="checkbox" checked={item.active}/></td>
                                <td><Button color={"white"} onClick={() => openModal(item)}
                                            className={"mx-1"}>
                                    <EditIcon className={"text-white"}/>
                                </Button>
                                    <Button color={"white"} onClick={() => openDeleteModal(item)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        ) : "Ma'lumot topilmadi"}
                        </tbody>
                    </Table>
                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Bo'limni tahrirlash" : "Yangi bo'lim qo`shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholder={"nomi"} required/>
                                    <AvField defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} type="checkbox" name={"active"}/>
                                    <AvRadioGroup name="clientStatusEnum"
                                                  defaultValue={currentObject ? currentObject.clientStatusEnum : ""}
                                                  label="Bo'lim turi" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="So'rov" value="REQUEST"/>
                                        <AvRadio label="Kutish" value="WAITING"/>
                                    </AvRadioGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                                <Button color="primary">Saqlash</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>

                    <Modal isOpen={deleteModal} toggle={openDeleteModal} className={""}>
                        <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")} charCode="X"
                        >O`chirish</ModalHeader>
                        <ModalBody>Rostdan ham ushbu elementni o'chirishni istaysizmi?</ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Cancel</Button>
                            <Button color="light" onClick={() => deleteNumber(currentObject)}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}


ClientStatus.propTypes = {};

export default connect(({
                            app: {clientStatusList, loading, reklamas, showModal, deleteModal},
                        }) => ({
        clientStatusList, loading, reklamas, showModal, deleteModal
    })
)(ClientStatus);
