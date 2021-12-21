import React, {Component} from 'react';
import {
    changeAppalTypeAction, changeAppalTypeByToplamAction,
    deleteReklamaAction,
    getAppealListByEnumTypeAction, getClientStatusListForSelectAction,
    getCourseListForSelectAction,
    getCoursesAction,
    getOneAppeal,
    getOneToplamAction,
    getReklamaAction,
    getTeachersForSelectAction,
    getToplamListAction, getToplamListForSelectAction,
    saveReklamaAction,
    saveToplamAction
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvCheckbox, AvCheckboxGroup} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import Pagination from "react-js-pagination";
import {formatPhoneNumber, formatSelectList} from "../../utils/addFunctions";
import Select from "react-select";
import {Link} from "react-router-dom";
import moment from "moment";


class Toplam extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            dispatch(getOneToplamAction({id: id}))
        }
        dispatch(getTeachersForSelectAction())
        dispatch(getCourseListForSelectAction())
    }

    state = {
        courseId: "",
        teacherId: "",
        reklamaId: "",
        regionId: "",
        statusTypeId: "",
        newTypeId: "",
        object: '',
        changeLocationType: "",
        currentObject: "",
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getAppealListByEnumTypeAction({
            enumType: "REQUEST",
            page: (pageNumber - 1),
            size: this.props.size
        }))
    }

    render() {
        const {
            currentItem, showChangeModal, selectItems, currentPage, statusTypeId,
            dispatch, showModal, deleteModal, reklamas, toplamList, size,
            teachers, getItems
        } = this.props
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
        const saveToplam = (e, v) => {
            v.teacherId = this.state.teacherId
            v.courseId = this.state.courseId
            if (v.courseId && v.teacherId)
                dispatch(saveToplamAction(v))
        }
        const deleteNumber = (item) => {
        }
        const setToplamCourse = (e, v) => {
            this.setState({courseId: e.value})
        }
        const setToplamTeacher = (e, v) => {
            this.setState({teacherId: e.value})
        }
        const allowDrop = (e) => {
            e.preventDefault();
            this.setState({changeLocationType: e.target.id})
        }

        const drag = (e) => {
            this.setState({object: e.target.id})
            e.dataTransfer.setData("text", e.target.id);
            // if (window.getComputedStyle(document.getElementById(e.target.id)).cursor == 'pointer')
            // var element = document.getElementById(e.target.id);
            // element.classList.add("appeal-drag");
        }

        const drop = (e) => {
            e.preventDefault();
            let data = e.dataTransfer.getData("text");
            if (currentItem && currentItem.clientDtos) {
                console.log(currentItem.clientDtos, "clie");
                console.log(data, "data");
                openChangeModal(...currentItem.clientDtos.filter(item => item.id === data))
                if (this.state.changeLocationType === "COLLECTION") {
                    dispatch(getToplamListForSelectAction())
                } else {
                    dispatch(getClientStatusListForSelectAction({type: this.state.changeLocationType}))
                }
            }
            // var element = document.getElementById(data);
            // element.classList.remove("appeal-drag");
        }
        const openChangeModal = (item) => {
            console.log(item);
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showChangeModal: !showChangeModal
                }
            })
        }
        const setChangeClientStatus = (e, v) => {
            this.setState({newTypeId: e.value})
        }
        const saveTransfer = (e, v) => {
            e.preventDefault();
            console.log(currentObject);
            if (currentObject && currentObject.id) {
                if (this.props.match && this.props.match.params && this.props.match.params.id) {
                    v.id = currentObject.id
                    v.clientStatusId = this.state.newTypeId
                    v.statusEnum = this.state.changeLocationType
                    v.enumType = currentPage
                    v.typeId = statusTypeId
                    v.toplamId = this.props.match.params.id;
                    dispatch(changeAppalTypeByToplamAction(v))
                    e.preventDefault()
                }
            } else {
                toast.warn("Xatolik!")
            }
        }


        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>
                            {currentItem && currentItem.name}
                        </h3>
                        <Link to={"/admin/appeals"}
                              className={"text-decoration-none"}>
                        <span
                            className={""}>Murojaatlar
                        </span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem ?
                            <>
                                <div className={"m-2 p-3 bg-white rounded col-md-4 col-10 align-self-start"}>
                                    <div className="row">
                                        <div className="col-8">
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Nomi: </small>
                                                    {currentItem.name}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Kurs: </small>
                                                    {currentItem.courseName}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>O'qitvchi: </small>
                                                    {currentItem.teacherName}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Dars kunlari: </small>
                                                    {currentItem.weekdays && currentItem.weekdays.length > 0 && currentItem.weekdays.map((week, l) =>
                                                        <span key={l}>{week}, </span>)} - {currentItem.time}
                                                </h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Holati: </small>
                                                    {currentItem.active ? "Ochiq" : "Yopilgan"}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Murojaatlar soni: </small>
                                                    {currentItem.soni}</h6>
                                            </hgroup>
                                            <div className="button-block">
                                                <Button className="table-icon px-2 border rounded-circle">
                                                    <span className="icon icon-wallet bg-primary "/>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <Button className="table-icon" onClick={() => openModal(currentItem)}>
                                                <EditIcon/>
                                            </Button>
                                            <Button className="table-icon" onClick={() => openDeleteModal(currentItem)}>
                                                <DeleteIcon/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className={"col-md-4 col-10"}>
                                    <div className="row">
                                        {
                                            currentItem.clientDtos && currentItem.clientDtos.length > 0 ? currentItem.clientDtos.map((client, i) =>
                                                    <div
                                                        className={"m-2 p-2 pb-0 bg-white rounded courses-style category-courses w-100"}
                                                        key={i}
                                                        id={client.id}
                                                        draggable={true}
                                                        onDragStart={drag}>
                                                        <h5 draggable={false}>{i + 1}.
                                                            <Link to={"/admin/appeal/" + client.id} draggable={false}
                                                                  className={"text-decoration-none text-dark"}>
                                                                {" " + client.fullName + " / " + formatPhoneNumber(client.phoneNumber)}
                                                            </Link>
                                                        </h5>
                                                        <p draggable={false}>
                                                            <small draggable={false}
                                                                   className={"text-secondary"}>Vaqti: </small>
                                                            {moment(client.date).format("DD/MM/yyyy, HH:mm")}
                                                        </p>
                                                    </div>
                                                )
                                                :
                                                <Col>
                                                    <h5 className={"text-center"}>
                                                    </h5>
                                                </Col>
                                        }
                                    </div>
                                </div>
                                <div className={"col-md-3 ml-auto col-10"}>
                                    <button
                                        id={"REQUEST"}
                                        onDrop={drop} onDragOver={allowDrop}
                                        className={"btn btn-block appeal-button bg-white border-primary rounded shadow"}>So'rovlar
                                    </button>
                                    <button
                                        id={"WAITING"}
                                        onDrop={drop} onDragOver={allowDrop}
                                        className={"btn btn-block appeal-button bg-white border-primary rounded shadow"}>Kutish
                                    </button>
                                    <button
                                        id={"COLLECTION"}
                                        onDrop={drop} onDragOver={allowDrop}
                                        className={"btn btn-block appeal-button bg-white border-primary rounded shadow"}>To'plam
                                    </button>
                                </div>

                            </>
                            : ""}
                    </div>


                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveToplam}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "To'plamni tahrirlash" : "Yangi to'plam qo`shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholder={"nomi"} required/>
                                    <Select
                                        placeholder="Kursni tanlang..."
                                        name="courseId"
                                        isSearchable={true}
                                        options={getItems && getItems.length > 0 && formatSelectList(getItems)}
                                        onChange={setToplamCourse}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvCheckboxGroup inline name="weekdays" label="Dars kunlari" required>
                                        <AvCheckbox label="Dush" value="MONDAY"/>
                                        <AvCheckbox label="Sesh" value="TUESDAY"/>
                                        <AvCheckbox label="Chor" value="WEDNESDAY"/>
                                        <AvCheckbox label="Pay" value="THURSDAY"/>
                                        <AvCheckbox label="Ju" value="FRIDAY"/>
                                        <AvCheckbox label="Shan" value="SATURDAY"/>
                                        <AvCheckbox label="Yak" value="SUNDAY"/>
                                    </AvCheckboxGroup>
                                    <Select
                                        placeholder="O'qituvchini tanlang..."
                                        name="teacherId"
                                        isSearchable={true}
                                        options={teachers && teachers.length > 0 && formatSelectList(teachers)}
                                        onChange={setToplamTeacher}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvField type="time"
                                             defaultValue={currentObject ? currentObject.startTime : false}
                                             label={"Boshlanish vaqti"} name={"time"}/>
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

                    <Modal id={""} isOpen={showChangeModal} toggle={openChangeModal} className={""} size={"md"}>
                        <AvForm className={""} onValidSubmit={saveTransfer}>
                            <ModalHeader isOpen={showChangeModal} toggle={openChangeModal} charCode="X">
                                Bo'limni o'zgartirish
                            </ModalHeader>
                            <ModalBody>
                                <Select
                                    placeholder="Bo'limni tanlang..."
                                    name="groupId"
                                    isSearchable={true}
                                    options={selectItems && selectItems.length > 0 && formatSelectList(selectItems)}
                                    onChange={setChangeClientStatus}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={openChangeModal}>Bekor qilish</Button>
                                <Button color="primary">O'tkazish</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>

                </div>
            </AdminLayout>
        );
    }
}


Toplam.propTypes = {};

export default connect(({
                            app: {
                                currentPage, statusTypeId,
                                selectItems,
                                showChangeModal,
                                currentItem,
                                getItems,
                                teachers,
                                toplamList,
                                loading, reklamas, showModal, deleteModal
                            },
                        }) => ({
        currentPage, statusTypeId,
        selectItems,
        showChangeModal,
        currentItem,
        getItems,
        teachers,
        toplamList,
        loading, reklamas, showModal, deleteModal
    })
)(Toplam);
