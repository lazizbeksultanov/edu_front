    import React, {Component} from 'react';
import {
    deleteProfessionAction,
    getProfessionAction,
    saveProfessionAction
} from "../../redux/actions/AppActions";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";

class Professions extends Component {
    componentDidMount() {
        this.props.dispatch(getProfessionAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, profession} = this.props;
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
            dispatch(saveProfessionAction(v))
        }
        const openDeleteModal = (item) => {
            console.log(item)
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }

        const deleteItem = (item) => {
            dispatch(deleteProfessionAction(item.id))
        }
        return (
            <div>
                <div className="container">
                    <h1>Profession</h1>
                    <Button color={"success"} onClick={openModal} className={"mb-2"}>Add new Profession</Button>
                    <Table>
                        <thead className={"bg-dark text-white"}>
                        <tr>
                            <th>No</th>
                            <th>Nomi</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {profession ? profession.map((item,k) =>
                            <tr key={k}>
                                <td>{k + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <input type="checkbox" checked={item.active}/>
                                </td>
                                <td>
                                    <Button color={"warning"} onClick={() => openModal(item)}
                                            className={"mx-1"}>Edit</Button>
                                    <Button color={"danger"} onClick={() => openDeleteModal(item)}>Delete</Button>
                                </td>
                            </tr>
                        ) : ''}
                        </tbody>
                    </Table>
                    <Modal isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject ? "Edit" : "Add"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Name"} name={"name"} className={"form-control"}
                                             placeholer={"name"} required/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} name={"active"}/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={openModal}>Cancel</Button>
                                <Button color="primary">Add</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>

                    <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                        <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                     charCode="X">Delete</ModalHeader>
                        <ModalBody>
                            Rostdan ham o'chirasizmi
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Cancel</Button>
                            <Button color="danger" onClick={() => deleteItem(currentObject)}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

Professions.propTypes = {};

export default connect(({
                            app: {loading, durationTypes, showModal, deleteModal,profession},
                        }) => ({
        loading, durationTypes, showModal, deleteModal,profession
    })
)(Professions);
///asssss