import React, {Component} from 'react';
import {
    changeAppalTypeAction,
    getAppealListByEnumTypeAction, getAppealListByStatusTypeAction,
    getClientStatusListAction, getClientStatusListForSelectAction,
    getRegionsAction, getReklamaAction, getToplamListForSelectAction,
    saveAppealAction,
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation"
import AdminLayout from "../../component/AdminLayout";
import Pagination from "react-js-pagination";
import {formatPhoneNumber, formatSelectList} from "../../utils/addFunctions";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import Select from "react-select";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

class Appeal extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
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
        object: '',
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
            size,
            page,
            totalElements,
            dispatch,
            showModal,
            regions,
            deleteModal,
            currentPage,
            clientStatusList,
            reklamas,
            selectItems,
            showChangeModal,
            appealList, toplamList
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
            if (item === "COLLECTION") {
                dispatch(getToplamListForSelectAction())
            } else {
                dispatch(getAppealListByEnumTypeAction({enumType: item, page: 0, size: 20}))
                dispatch(getClientStatusListAction({type: item}))
            }
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
            console.log(e.target.id);
            console.log(e);
            // if (window.getComputedStyle(document.getElementById(e.target.id)).cursor == 'pointer')
            // var element = document.getElementById(e.target.id);
            // element.classList.add("appeal-drag");
        }

        const drop = (e) => {
            e.preventDefault();
            let data = e.dataTransfer.getData("text");
            console.log(appealList, "royhat");
            console.log(data, "data");
            openChangeModal(...appealList.filter(item => item.id === data))
            if (this.state.changeLocationType === "COLLECTION") {
                dispatch(getToplamListForSelectAction())
            } else {
                dispatch(getClientStatusListForSelectAction({type: this.state.changeLocationType}))
            }
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
            e.preventDefault();
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
                v.clientStatusId = this.state.newTypeId
                v.statusEnum = this.state.changeLocationType
                v.enumType = currentPage
                v.typeId = statusTypeId
                dispatch(changeAppalTypeAction(v))
                e.preventDefault()
            }
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>Murojaatlar</h3>
                    </hgroup>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className={"row"}>
                                <div className="col-md-3">
                                    <AvForm>
                                        <AvField type="select" name="selectSize"
                                                 onChange={changeStatusType}
                                                 defaultValue={size}
                                        >
                                            <option value="all">Barchasi</option>
                                            {clientStatusList && clientStatusList.length > 0 &&
                                            clientStatusList.map((item, i) =>
                                                <option value={item.id}>{item.name}</option>
                                            )}
                                        </AvField>
                                    </AvForm>
                                </div>
                                <div className="col-md-3">
                                    <AvForm>
                                        <AvField type="search" name="searchWord"
                                                 placeholder="Qidirish"
                                            // onChange={changeSize}
                                            // defaultValue={size}
                                        />
                                    </AvForm>
                                </div>
                            </div>
                            {currentPage === "COLLECTION" ?
                                <div className="row border-top pt-3">
                                    {toplamList && toplamList.length > 0 ? toplamList.map((toplam, k) =>
                                            <div className={"m-2 p-3 bg-white rounded courses-style category-courses"}>
                                                <h5>
                                                    <Link to={"/admin/appeal/toplam/" + toplam.id}
                                                          className={"text-decoration-none"}>
                                                        {toplam.name + " "}
                                                    </Link>
                                                    - {toplam.courseName + " "}
                                                    - {toplam.time}
                                                </h5>
                                                <small
                                                    className={" text-secondary"}>
                                                    Ustoz: <span
                                                    className={"text-dark"}>{toplam.teacherName}</span>
                                                </small>
                                                <br/>
                                                <small
                                                    className={" text-secondary"}>Dars
                                                    kunlari:
                                                    <span
                                                        className={"text-dark"}> {toplam.weekdays && toplam.weekdays.length > 0 && toplam.weekdays.map((week) =>
                                                        <span>{week}, </span>)}</span>
                                                </small>
                                                <small
                                                    className={"d-block text-secondary"}>
                                                    Murojaatlar: <span
                                                    className={"text-dark"}>{toplam.soni}</span>
                                                </small>
                                            </div>
                                        )
                                        : "Top'lamlar mavjud emas"}
                                </div>
                                :
                                <Table className={"table-style w-100"}>
                                    <thead className={""}>
                                    <tr className={""}>
                                        <th>No</th>
                                        <th>Ism</th>
                                        <th>Telefon</th>
                                        <th>Bo'lim</th>
                                        <th>Amal</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {appealList && appealList.length > 0 ? appealList.map((item, i) =>
                                        <tr key={i} id={item.id} className={"table-tr"} draggable={true}
                                            onDragStart={drag}>
                                            <td draggable={false}>{i + 1}</td>
                                            <td draggable={false}>
                                                <Link to={"/admin/appeal/" + item.id} draggable={false}
                                                      className={"text-decoration-none text-dark"}>
                                                    {item.fullName}
                                                </Link>
                                            </td>
                                            <td draggable={false}>{formatPhoneNumber(item.phoneNumber)}</td>
                                            <td draggable={false}>{item.statusName}</td>
                                            <td draggable={false}>
                                                <Button className="table-icon"
                                                        draggable={false}
                                                        onClick={() => openModal(item)}
                                                >
                                                    <EditIcon/>
                                                </Button>
                                                <Button className="table-icon"
                                                        draggable={false}
                                                    // onClick={() => openDeleteModal(item)}
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : "Murojaat mavjud emas"}
                                    </tbody>
                                </Table>
                            }
                            <Pagination
                                activePage={page + 1}
                                itemsCountPerPage={size}
                                totalItemsCount={totalElements}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                linkClass="page-link"
                            />
                        </Col>
                        <Col md={3}>
                            <button
                                id={"REQUEST"}
                                onDrop={drop} onDragOver={allowDrop}
                                onClick={() => changePage("REQUEST")}
                                className={"btn btn-block appeal-button" + (currentPage === "REQUEST" ? " appeal-button-active" : "")}>So'rovlar
                            </button>
                            <button
                                id={"WAITING"}
                                onDrop={drop} onDragOver={allowDrop}
                                onClick={() => changePage("WAITING")}
                                className={"btn btn-block appeal-button" + (currentPage === "WAITING" ? " appeal-button-active" : "")}>Kutish
                            </button>
                            <button
                                id={"COLLECTION"}
                                onDrop={drop} onDragOver={allowDrop}
                                onClick={() => changePage("COLLECTION")}
                                className={"btn btn-block appeal-button " + (currentPage === "COLLECTION" ? " appeal-button-active" : "")}>To'plam
                            </button>
                        </Col>
                    </Row>
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

            </AdminLayout>
        );
    }
}


Appeal.propTypes = {};

export default connect(({
                            app: {
                                toplamList,
                                selectItems,
                                showChangeModal,
                                size,
                                page,
                                totalElements,
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
        toplamList,
        selectItems,
        showChangeModal,
        size,
        page,
        totalElements,
        appealList,
        clientStatusList,
        regions, currentPage,
        loading, reklamas, showModal, deleteModal
    })
)(Appeal);
