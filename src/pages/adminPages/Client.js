import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    deleteClientAction,
    getClientAction,
    getRegionsAction,
    saveClientAction
} from "../../redux/actions/AppActions";
import AdminLayout from "../../component/AdminLayout";
import {Modal, Button, ModalBody, ModalFooter, Table, ModalHeader} from "reactstrap";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";

class Client extends Component {

    componentDidMount() {
        this.props.dispatch(getClientAction())
        this.props.dispatch(getRegionsAction())
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }


    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, regions, selectClients, deleteModal} = this.props;
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            let ClientDto;
            ClientDto = {
                id : currentObject.id,
                fullName: v.fullName,
                phoneNumber: v.phoneNumber,
                description: v.description,
                age: v.age,
                regionId: v.regionId,
                gender: v.gender
            }
            dispatch(saveClientAction(ClientDto))
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
            dispatch(deleteClientAction(item))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathName}>
                <div className={"flex-column container"}>
                    <h1>Client</h1>
                    <div>
                        <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                    </div>
                    <Table className={"table-style"}>
                        <thead className={""}>
                        <tr className={"text-center"}>
                            <th>№</th>
                            <th>To`liq ismi</th>
                            <th>Yoshi</th>
                            <th>Yashash hududi</th>
                            <th>Telefon raqami</th>
                            <th>Clietn Haqida qisqacha</th>
                            <th>Jinsi</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectClients ? selectClients.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.fullName}</td>
                                <td>{item.age}</td>
                                <td>{item.region ? item.region.name : ''}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.description}</td>
                                <td>{item.gender}</td>
                                <td><Button className="table-icon" onClick={() => openModal(item)}><EditIcon/></Button>
                                </td>
                                <td><Button className="table-icon"
                                            onClick={() => openDeleteModal(item)}><DeleteIcon/></Button></td>
                            </tr>
                        ) : ''}
                        </tbody>
                    </Table>
                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Client malumotlarini tahrirlash" : "Client qoshish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.fullName : ''} type={"text"}
                                        label={"Mijoz FISH"} id={"fullName"} name={"fullName"}
                                        className={"form-control"}
                                        placeholder="FISh" autofocus required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.age : ''} type={"number"}
                                        label={"Mijozning yoshi"} id={"age"} name={"age"} className={"form-control"}
                                        palceholeder={"yosh"} autofocus required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.phoneNumber : ''} type={"number"}
                                        errorMessage="telefon raqam uzunligi 12 ta bo'lishi shart"
                                        validate={{
                                            required: {value: true},
                                            pattern: {value: "^[0-9]+$"},
                                            minLength: {value: 9},
                                            maxLength: {value: 12}
                                        }}
                                        label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                        palceholeder={"998991234567"} autofocus required/>
                                    <AvField
                                        defaultValue={currentObject && currentObject.region ? currentObject.region.id : '0'}
                                        type={"select"}
                                        label={"Mijoz yashash manzili"} name={"regionId"}
                                        className={"form-control"}
                                        palceholeder={"Manzilni tanlang"} autofocus required>
                                        <option key={0} value={"0"}>Hududni tanlang</option>
                                        {regions ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvField
                                        defaultValue={currentObject && currentObject.description ? currentObject.description : ''}
                                        type={"text"}
                                        label={"Izoh"} name={"description"} className={"form-controller"}
                                    />
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  label="Jins" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color={"primary"}>Saqlash</Button>
                                <Button color={"secondary"} onClick={openModal}>Bekor qilish</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>


                    <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                        <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")} charCode={"X"}>
                            <ModalBody>
                                Clientni o`chirasimi?
                            </ModalBody>
                            <ModalFooter>
                                <Button color={"secondary"} onClick={() => openDeleteModal("")}>Yo`q</Button>
                                <Button color={"light"} onClick={() => deleteItem(currentObject)}>Ha</Button>
                            </ModalFooter>
                        </ModalHeader>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}

Client.propTypes = {};

export default connect(
    ({
         app: {selectClients, showModal, deleteModal, regions, currentItem},
     }) => ({selectClients, deleteModal, showModal, regions, currentItem})
)(Client);
