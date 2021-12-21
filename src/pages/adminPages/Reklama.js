import React, {Component} from 'react';
import {deleteReklamaAction, getReklamaAction, saveReklamaAction} from "../../redux/actions/AppActions";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class Reklama extends Component {
    componentDidMount() {
        this.props.dispatch(getReklamaAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        selectReklama: [],
        selectParentReklama: "",
        parentReklamaDisable: false
    }

    render() {
        const {dispatch, showModal, deleteModal, reklamas, selectItems} = this.props
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
        const saveNumber = (e, v) => {
            if (v.reklamaId === "0") {
                v.reklamaId = ""
            }
            if (v.reklamaId)
                v.reklamaId = parseInt(v.reklamaId)
            if (currentObject) {
                v.id = currentObject.id
                //Numberni tahrirlayotganda o`zini tanlamaslik uchun
                if (v.id && v.reklamaId && v.id === v.reklamaId) {
                    toast.error("Xatolik")
                    console.log(e)
                    console.log(v)
                } else {

                    dispatch(saveReklamaAction(v))
                }
            }
        }
        const parentReklama = (e, v) => {
            if (e && e.value) {
                this.setState({selectParentReklama: e.value})
            }
        }
        const deleteNumber = (item) => {
            console.log(item);
            dispatch(deleteReklamaAction(item))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>Reklama</h3>
                    </hgroup>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className="table-style w-100">
                        <thead className={""}>
                        <tr>
                            <th>№</th>
                            <th>Izoh</th>
                            <th>Holat</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reklamas && reklamas.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
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
                        )}
                        </tbody>
                    </Table>
                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveNumber}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Reklamani tahrirlash" : "Yangi reklama qo`shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholder={"nomi"} required/>
                                    <AvField defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} type="checkbox" name={"active"}/>

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


Reklama.propTypes = {};

export default connect(({
                            app: {loading, reklamas, showModal, deleteModal},
                        }) => ({
        loading, reklamas, showModal, deleteModal
    })
)(Reklama);
