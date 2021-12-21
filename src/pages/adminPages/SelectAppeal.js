import React, {Component} from 'react';
import {
    changeAppalTypeAction,
    getAppealListByEnumTypeAction, getAppealListByStatusTypeAction,
    getClientStatusListAction, getClientStatusListForSelectAction, getOneAppeal, getOneToplamAction,
    getRegionsAction, getReklamaAction, getStudentAction,
    getStudentsAction, saveAppealAction,
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation"
import AdminLayout from "../../component/AdminLayout";
import {formatPhoneNumber, formatSelectList} from "../../utils/addFunctions";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import moment from "moment";
import Select from "react-select";
import {Link} from "react-router-dom";

class SelectAppeal extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            dispatch(getOneAppeal({id: id}))
        }
        dispatch(getClientStatusListAction({type: "REQUEST"}))
        dispatch(getRegionsAction())
        dispatch(getReklamaAction())
        dispatch(getAppealListByEnumTypeAction({enumType: "REQUEST", page: 0, size: 20}))
        dispatch({
            type: "updateState",
            payload: {
                currentPage: 'REQUEST'
            }
        })
    }

    state = {
        showModal: false,
        currentObject: "",
        reklamaId: "",
        regionId: "",
        statusTypeId: "",
        newTypeId: "",
        changeLocationType: "",
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
            currentItem,
            dispatch,
            showModal,
            regions,
            deleteModal,
            currentPage,
            clientStatusList,
            reklamas,
            selectItems,
            showChangeModal,
            appealList
        } = this.props
        const {currentObject, reklamaId, regionId, statusTypeId} = this.state

        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const changePage = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    currentPage: item
                }
            })
            dispatch(getAppealListByEnumTypeAction({enumType: item, page: 0, size: 20}))
            dispatch(getClientStatusListAction({type: item}))
        }
        const changeStatusType = (e, v) => {
            if (v === "all")
                dispatch(getAppealListByEnumTypeAction({enumType: currentPage, page: 0, size: 20}))
            else
                dispatch(getAppealListByStatusTypeAction({enumType: currentPage, typeId: v, page: 0, size: 20}))
        }
        const openDeleteModal = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const setClientStatus = (e, v) => {
            this.setState({statusTypeId: e.value})
        }
        const setChangeClientStatus = (e, v) => {
            this.setState({newTypeId: e.value})
        }
        const setClientRekalama = (e, v) => {
            this.setState({reklamaId: e.value})
        }
        const setClientRegion = (e, v) => {
            this.setState({regionId: e.value})
        }
        const saveItem = (e, v) => {
            v.regionId = regionId
            v.reklamaId = reklamaId
            v.clientStatusId = statusTypeId
            v.statusEnum = currentPage
            v.enumType = currentPage
            dispatch(saveAppealAction(v));
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
            openChangeModal(...appealList.filter(item => item.id === data))
            dispatch(getClientStatusListForSelectAction({type: this.state.changeLocationType}))
            // var element = document.getElementById(data);
            // element.classList.remove("appeal-drag");
        }
        const openChangeModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showChangeModal: !showChangeModal
                }
            })
        }
        const saveTransfer = (e, v) => {
            v.id = currentObject.id
            v.clientStatusId = this.state.newTypeId
            v.statusEnum = this.state.changeLocationType
            v.enumType = currentPage
            v.typeId = statusTypeId
            dispatch(changeAppalTypeAction(v))
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>
                            {currentItem.clientStatusConnect
                            && currentItem.clientStatusConnect.client
                            && currentItem.clientStatusConnect.client.fullName
                            }
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
                                                    <small className={"text-secondary"}>FISH: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.fullName
                                                    }</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Tel: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && formatPhoneNumber(currentItem.clientStatusConnect.client.phoneNumber)
                                                    }</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Murojaat vaqti: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.reklama
                                                    && moment(currentItem.clientStatusConnect.client.createdAt).format("DD/MM/yyyy, HH:mm")
                                                    }</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Hududi: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.region
                                                    && currentItem.clientStatusConnect.client.region.name
                                                    }</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Reklama: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.reklama
                                                    && currentItem.clientStatusConnect.client.reklama.name
                                                    }</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Jinsi: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.gender === "MALE" ? "Erkak" : "Ayol"
                                                    }</h6>
                                            </hgroup>

                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Tavsif: </small>
                                                    {currentItem.clientStatusConnect
                                                    && currentItem.clientStatusConnect.client
                                                    && currentItem.clientStatusConnect.client.description
                                                    }</h6>
                                            </hgroup>
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
                                <div className={"col-md-7"}>
                                    <div className="row">
                                        {
                                            currentItem.clientAppealList && currentItem.clientAppealList.length > 0 ? currentItem.clientAppealList.map((item, i) =>
                                                    <div
                                                        className={"m-2 p-3 bg-white rounded courses-style category-courses"}>
                                                        <h5>{item.status + " - " + item.statusName}</h5>
                                                        <p>
                                                            <small className={"text-secondary"}>Vaqti: </small>
                                                            {moment(item.date).format("DD/MM/yyyy, HH:mm")}
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
                            </>
                            : ""}
                    </div>
                </div>
                <Modal id={""} isOpen={showModal} toggle={openModal} className={""} size={"md"}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.fullName : ""}
                                        type={"text"}
                                        errorMessage={"Ismni yozish majburiy"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                        type={"text"}
                                        errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                        validate={{
                                            required: {value: true},
                                            pattern: {value: "^[0-9]+$", errorMessage: "faqat raqam yozing"},
                                            minLength: {value: 9},
                                            maxLength: {value: 9}
                                        }}
                                        label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                        placeholer={"99 1234567"} required/>
                                    Murojaat bo'limi
                                    <Select
                                        placeholder="Bo'limni tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={clientStatusList && clientStatusList.length > 0 && formatSelectList(clientStatusList)}
                                        onChange={setClientStatus}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    Jinsi
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  required
                                                  className={""}
                                                  errorMessage="Birini tanlang!">
                                        <Row>
                                            <Col>
                                                <AvRadio label="Erkak" value="MALE"/>
                                            </Col>
                                            <Col>
                                                <AvRadio label="Ayol" value="FEMALE"/>
                                            </Col>
                                        </Row>
                                    </AvRadioGroup>
                                </Col>
                                <Col>
                                    <AvField
                                        type={"number"}
                                        defaultValue={currentObject && currentObject.age}
                                        label={"Yoshi"} name={"age"} className={"form-control"}
                                    />
                                    Hudud
                                    <Select
                                        placeholder="Hududni tanlang..."
                                        name="regionId"
                                        isSearchable={true}
                                        options={regions && regions.length > 0 && formatSelectList(regions)}
                                        onChange={setClientRegion}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <br/>
                                    Reklama
                                    <Select
                                        placeholder="Reklamani tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={reklamas && reklamas.length > 0 && formatSelectList(reklamas)}
                                        onChange={setClientRekalama}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvField
                                        defaultValue={currentObject ? currentObject.description : ""}
                                        type={"textarea"}
                                        label={"Izoh"} name={"description"} className={"form-control"}/>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
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
                                options={selectItems && selectItems.length > 0 && formatSelectList(clientStatusList)}
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

            </AdminLayout>
        );
    }
}


SelectAppeal.propTypes = {};

export default connect(({
                            app: {
                                currentItem,
                                selectItems,
                                showChangeModal,
                                appealList,
                                clientStatusList,
                                currentPage,
                                regions,
                                loading,
                                reklamas,
                                showModal,
                                deleteModal
                            },
                        }) => ({
        currentItem,
        selectItems,
        showChangeModal,
        appealList,
        clientStatusList,
        regions, currentPage,
        loading, reklamas, showModal, deleteModal
    })
)(SelectAppeal);
