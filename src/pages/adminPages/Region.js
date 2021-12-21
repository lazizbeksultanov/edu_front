import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteRegionAction,
    getRegionsAction,
    saveRegionAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class Region extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        selectRegion: [],
        selectParentRegion: "",
        parentRegionDisable: false
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, regions, selectItems} = this.props;

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
            dispatch(deleteRegionAction(item))
        }
        const parentRegion = (e, v) => {
            if (e && e.value) {
                this.setState({selectParentRegion: e.value})
            }
        }
        const saveItem = (e, v) => {
            if (v.regionId === "0") {
                v.regionId = ""
            }
            if (v.regionId)
                v.regionId = parseInt(v.regionId)
            //pastdage commentga tegma
            // if (this.state.selectParentRegion)
            //     v.regionId = parseInt(this.state.selectParentRegion)
            if (currentObject) {
                v.id = currentObject.id
            }
            // item ni tahrirlayotganda o'zini tanlab qo'ymaslik uchun
            if (v.id && v.regionId && v.id === v.regionId) {
                toast.error("Xatolik");
            } else {
                dispatch(saveRegionAction(v))
            }
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Hudud</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className={"table-style"}>
                        <thead className={""}>
                        <tr className={"text-center"}>
                            <th>No</th>
                            <th>Nomi</th>
                            <th>Ota hudud</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {regions.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.region ? item.region.name : "-------"}</td>
                                <td>
                                    <input type="checkbox" checked={item.active}/>
                                </td>
                                <td>
                                    <Button className="table-icon" onClick={() => openModal(item)}>
                                        <EditIcon/>
                                    </Button>
                                    <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Tahrirlash" : "Qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Holati"} name={"active"}/>
                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject && currentObject.regionId ? currentObject.regionId : "0"}>
                                        <option key={0} value={"0"}>Ota hududni tanlang</option>
                                        {regions ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    {/*<Select*/}
                                    {/*    defaultValue={currentObject && currentObject.region && currentObject.region.id}*/}
                                    {/*    placeholder="Hududni tanlang..."*/}
                                    {/*    name="regionId"*/}
                                    {/*    isSearchable={true}*/}
                                    {/*    options={selectItems}*/}
                                    {/*    onChange={parentRegion}*/}
                                    {/*    className="basic-multi-select"*/}
                                    {/*    classNamePrefix="select"*/}
                                    {/*/>*/}
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

Region.propTypes = {};

export default connect(({
                            app: {loading, regions, showModal, deleteModal, selectItems},
                        }) => ({
        loading, regions, showModal, deleteModal, selectItems
    })
)(Region);
