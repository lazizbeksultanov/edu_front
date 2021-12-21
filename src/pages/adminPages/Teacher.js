import React, {Component} from 'react';
import {ModalHeader, Modal, Button, Col, ModalBody, Row, Table, ModalFooter} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteTeacherAction,
    getCourseCategoriesAction,
    getRegionsAction, getStudentsAction,
    getTeacherAction, getTeachersAction,
    saveTeacherAction,
    uploadFileAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {CloseIcon, DeleteIcon, EditIcon, ShowIcon} from "../../component/Icons";
import Select from "react-select";
import AdminLayout from "../../component/AdminLayout";
import moment from "moment";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";

class Teacher extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getTeachersAction({page: 0, size: this.props.size}))

    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        specs: '',
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getTeachersAction({page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {currentObject} = this.state;
        const {
            page,
            size,
            totalElements,
            totalPages,
            dispatch,
            attachmentId,
            secondPage,
            showModal,
            deleteModal,
            teachers,
            regions
        } = this.props;
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const openDeleteModal = (item) =>    {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const deleteItem = (item) => {
            dispatch(deleteTeacherAction(item))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const multiChange = (e, v) => {
            let specList = []
            for (let i = 0; i < e.length; i++) {
                specList.push(e[i].value)
            }
            this.setState({specs: specList})
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
                console.clear();
            }
            let teacherDto;
            teacherDto = {userDto: ""}
            teacherDto.userDto = {
                id: v.id,
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                avatarId: attachmentId,
                regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString(),
            }
            teacherDto.id = currentObject.id
            dispatch(saveTeacherAction(teacherDto))
        }
        const uploadImg = (e) => {
            this.props.dispatch(uploadFileAction(e.target.files[0]))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>O'qituvchilar</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Table className={"table-style w-75"}>
                        <thead className={""}>
                        <tr className={""}>
                            <th>No</th>
                            <th>Ism</th>
                            <th>Telefon</th>
                            <th colSpan="2">Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {teachers ? teachers.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>
                                    <Link className={"text-dark"} to={"/admin/teacher/" + (item.id)}>
                                        {item.userDto && item.userDto.fullName}
                                    </Link>
                                </td>
                                <td>{item.userDto && item.userDto.phoneNumber}</td>
                                <td>
                                    <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        ) : ''}
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
                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Tahrirlash" : "Yangi o'qituvchi qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField
                                        defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.fullName : ""}
                                        type={"text"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.phoneNumber : ""}
                                        type={"text"}
                                        label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        type={"date"}
                                        defaultValue={currentObject.userDto && currentObject.userDto.birthDate ? moment(currentObject.userDto.birthDate).format('YYYY-MM-DD')
                                            : ""}
                                        label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                        required/>
                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject && currentObject.userDto && currentObject.userDto.region ? currentObject.userDto.region.id : "0"}>
                                        <option key={0} value={"0"}>Ota hududni tanlang</option>
                                        {regions ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.gender : ""}
                                                  label="Jins" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                    <AvField
                                        defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.description : ""}
                                        type={"textarea"}
                                        label={"Izoh"} name={"description"} className={"form-control"}/>
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

Teacher.propTypes = {};

export default connect((
    {
        app: {
            page,
            size,
            totalElements,
            totalPages,
            loading,
            courseCategories,
            showModal,
            specializationDto,
            secondPage,
            deleteModal,
            selectItems,
            spec,
            selectItemsFromSpec,
            regions,
            attachmentId,
            teachers,
            readModal,
            teacherDto
        },
    }) => ({
        page,
        size,
        totalElements,
        totalPages,
        secondPage,
        specializationDto,
        loading,
        courseCategories,
        showModal,
        deleteModal,
        selectItems,
        spec,
        selectItemsFromSpec,
        regions,
        attachmentId,
        readModal,
        teachers,
        teacherDto
    })
)(Teacher);
