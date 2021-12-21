import React, {Component} from 'react';
import {
    Button,
    Col,
    CustomInput,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Nav,
    NavItem,
    NavLink,
    Row, TabContent,
    Table, TabPane
} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteCourseAction, deleteGroupAction, deleteTeacherAction, deleteTeacherSalaryAction, editTeacherSalaryListAction,
    getPayTypeListAction,
    getRegionsAction, getStudentPaymentAction,

    getTeacherAction, getTeacherGroupAction, getTeacherGroupsAction, getTeacherSalaryListAction, giveSalaryAction,
    saveCourseAction,
    saveStudentAction, saveStudentPaymentAction, saveTeacherAction, saveTeacherSalaryAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";
import Select from "react-select";

class SelectTeacher extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getTeacherAction({id: id}))
            this.props.dispatch(getTeacherGroupsAction({id: id}))
        }
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getPayTypeListAction())
    }

    state = {
        showModal: false,
        showPaymentModal: false,
        currentObject: "",
        currentItem: "",
        showOpenSalaryModal: false,
        showOpenSalaryModal1: false,
        activeTab : "1"

    }

    render() {
        const {currentObject,activeTab} = this.state;
        const {
            groups,
            history,
            payTypes,
            showOpenSalaryModal,
            showOpenSalaryModal1,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            regions,
            teacherSalary,
            teacherSalaryList,
            showEditSalaryModal,
            deleteSalaryModal
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

        const openSalaryEditModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: 'updateState',
                payload: {
                    showEditSalaryModal: !showEditSalaryModal,
                    currentObject: item
                }
            })
            console.log(currentObject)
        }

        const openSalaryModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showOpenSalaryModal: !showOpenSalaryModal
                }
            })
        }
        const openSalaryModal1 = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showOpenSalaryModal1: !showOpenSalaryModal1
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
            dispatch(deleteTeacherAction({...item, history: history}))
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id && currentObject.userDto) {
                v.id = currentObject.id
                let teacherDto;
                teacherDto = {userDto: ""}
                teacherDto.userDto = {
                    id: currentObject.userDto.id,
                    fullName: v.fullName,
                    gender: v.gender,
                    phoneNumber: v.phoneNumber,
                    regionId: v.regionId,
                    description: v.description,
                    birthDate: moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString(),
                }
                teacherDto.id = currentObject.id
                dispatch(saveTeacherAction(teacherDto))
            }

        }
        const saveSalary = (e, v) => {
            if (currentObject) {
                v.teacherId = currentObject.id;
                v.amountDate = moment(v.amountDate).format('YYYY/MM/DD').toString()
                dispatch(giveSalaryAction(v));
            }
        }
        const saveSalaryItem = (e, v) => {
            if (currentObject) {
                if (currentObject.salary !== null){
                    if(v.percent === ""){
                        v.percent = currentObject.percent
                    }
                }
                console.log(currentObject)
                v.teacherId = currentObject.id
                dispatch(saveTeacherSalaryAction(v));
            }
        }

        const toggle = tab => {

            if (activeTab !== tab)
                this.setState({activeTab: tab})
            if (tab === "2") {
                if (this.props.match && this.props.match.params && this.props.match.params.id) {
                    dispatch(getTeacherSalaryListAction({
                        id: this.props.match.params.id,
                        page:0,
                        size:20
                    }))
                }
            }
        }

        const openDeleteSalaryModal = (item) => {
            this.setState({currentItem : item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteSalaryModal: !deleteSalaryModal
                }
            })
        }

        const editSalary = (e,v) => {
            v.teacherId = currentItem.id
            console.log(v)
            this.props.dispatch(editTeacherSalaryListAction(v))
        }

        const deleteSalary = () => {
            this.props.dispatch(deleteTeacherSalaryAction({
                id:this.state.currentItem,
                teacher:currentItem
            }))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.userDto && currentItem.userDto.fullName} </h3>
                        <Link
                            to={"/admin/teachers"}
                            className={"text-decoration-none"}>
                        <span
                            className={""}> O'qituvchilar</span>
                        </Link>
                    </hgroup>

                    <div className="row">
                        {currentItem.id && currentItem.id ?
                            <>
                                <div className="d-block col-12">
                                    <Nav tabs>
                                        <NavItem className={""}>
                                            <NavLink
                                                onClick={() => {
                                                    toggle('1');
                                                }}
                                            >
                                                Profil
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                onClick={() => {
                                                    toggle('2');
                                                }}
                                            >
                                                To'lovlar
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <div className={"row"}>
                                                <div className={"m-2 p-3 bg-white rounded col-md-4 col-10 col-8 select-student-style"}>
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <hgroup>
                                                                <small className={"text-secondary"}>FISH: </small>
                                                                <p className={"d-inline"}> {currentItem.userDto && currentItem.userDto.fullName}</p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Telefon raqam: </small>
                                                                <p className={"d-inline"}> {formatPhoneNumber(currentItem.userDto && currentItem.userDto.phoneNumber)} </p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Tug'ilgan sana: </small>
                                                                <p className={"d-inline"}> {moment(currentItem.userDto && currentItem.birthDate).format("DD-MM-yyyy")}</p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Manzil: </small>
                                                                <p className={"d-inline"}>{currentItem.userDto && currentItem.userDto.region && currentItem.userDto.region.name}</p>
                                                            </hgroup>

                                                            <hgroup>
                                                                <small className={"text-secondary"}>Manzil: </small>
                                                                <p className={"d-inline"}>{currentItem.userDto && currentItem.userDto.gender}</p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Tavsif: </small>
                                                                <p className={"d-inline"}> {currentItem.userDto && currentItem.userDto.description}</p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Maosh :  </small>
                                                                <p className={"d-inline"}> {currentItem.salary}{currentItem.salary ? (currentItem.percent ? " %" : " so'm") : ''}</p>
                                                            </hgroup>
                                                            <hgroup>
                                                                <small className={"text-secondary"}>Balance: </small>
                                                                <p className={"d-inline"}> {currentItem.balance}</p>
                                                                <div className="button-block">
                                                                    <Button className="table-icon px-2"
                                                                            onClick={() => openSalaryModal(currentItem)}
                                                                    >
                                                                        <span className="icon icon-wallet bg-primary "/>
                                                                    </Button>
                                                                    <Button className="table-icon px-2"
                                                                            onClick={() => openSalaryModal1(currentItem)}
                                                                    >
                                                                        <span className="icon icon-wallet bg-primary "/>
                                                                    </Button>
                                                                </div>
                                                            </hgroup>


                                                        </div>
                                                        <div className="col-4 button-block">
                                                            <Button className="table-icon"
                                                                    onClick={() => openModal(currentItem)}>
                                                                <EditIcon className="button-icon"/>
                                                            </Button>
                                                            <Button className="table-icon"
                                                                    onClick={() => openDeleteModal(currentItem)}>
                                                                <DeleteIcon className="button-icon"/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"col-md-6"}>
                                                    <h4>Guruhlar</h4>
                                                    <div className={" ml-2 bg-white student-group-block"}>
                                                        {groups && groups.length > 0 ? groups.map((item, i) =>
                                                                <Row key={i} className={"p-2"}>
                                                                    <Col md={3} className={"text-center"}>
                                                    <span
                                                        className={"group-name"}> {item.name}</span>
                                                                    </Col>
                                                                    <Col md={4}>
                                                    <span
                                                        className={"text-left"}>{item.course && item.course.name}</span>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <p className={"text-secondary"}>{item.startTime + " - " + item.finishTime}</p>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <span
                                                                            className={"text-secondary"}>{item.weekdays && item.weekdays.map(i =>
                                                                            <span> {i.weekdayName && i.weekdayName.length > 3 && i.weekdayName.charAt(0).toUpperCase() + i.weekdayName.substring(1, 3).toLowerCase()}, </span>)}
                                                                        </span>
                                                                    </Col>
                                                                </Row>
                                                        ) : "Guruhlar topilmadi"}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabPane>

                                        {/*  START TAB PANE  */}

                                        <TabPane tabId="2">
                                            <Table>
                                                <thead>
                                                <tr>
                                                    <td>#</td>
                                                    <td>Miqdor</td>
                                                    <td>To'lov turi</td>
                                                    <td>Izoh</td>
                                                    <td>To'langan vaqti</td>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {teacherSalaryList ? teacherSalaryList.map((item, i) =>
                                                    <tr key={i + 1}>
                                                        <td>{i + 1}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.payType ? item.payType.name : ''}</td>
                                                        <td>{item.description}</td>
                                                        <td>{moment(item.payDate).format('LLL').toString()}</td>
                                                        <td>
                                                            <Button className="table-icon" onClick={() => openSalaryEditModal(item)}>
                                                                <EditIcon/>
                                                            </Button>
                                                            <Button className="table-icon" onClick={() => openDeleteSalaryModal(item.id)}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ) : 'Malumot topilmadi'}
                                                </tbody>
                                            </Table>
                                        </TabPane>

                                    {/*  END TAB PANE  */}

                                    </TabContent>
                                </div>
                            </>
                            : ""}
                    </div>
                </div>

                {/*MODAL EDIT*/}

                <Modal id={"allModalStyle"} isOpen={showEditSalaryModal} toggle={openSalaryEditModal} className={""}>
                        <ModalHeader isOpen={showEditSalaryModal} toggle={openSalaryEditModal}  charCode={"X"}>
                            Tahrirlash
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvForm method={"post"} onValidSubmit={editSalary}>
                                    <AvField name={"id"} type={"hidden"} defaultValue={currentObject ? currentObject.id : ''}/>
                                    <AvField name={"amount"} type={"text"} defaultValue={currentObject ? currentObject.amount : ''}/>
                                    <AvField name={"payTypeId"} type={"select"}>
                                        {payTypes ? payTypes.map((item, i) =>
                                        <option value={item.id}>
                                            {item.name}
                                        </option>) : ''}
                                    </AvField>
                                    <AvField name={"description"} type={"text"} defaultValue={currentObject ? currentObject.description : ''}/>
                                    {/*<AvField name={"payDate"} type={"date"}/>*/}
                                    <AvField
                                        type={"date"}
                                        defaultValue={currentObject && currentObject.payDate ? moment(currentObject.amountDate).format('YYYY-MM-DD')
                                            : ""}
                                        label={"Pul yechilgan sana"} name={"amountDate"} className={"form-control"}
                                        required/>

                                    <ModalFooter>
                                        <Button color={"secondary"} onClick={openSalaryEditModal}>Bekor qilish</Button>
                                        <Button color={"primary"} type={"submit"}>Saqlash</Button>
                                    </ModalFooter>
                                </AvForm>
                            </div>
                        </ModalBody>
                </Modal>


                {/*MODAL DELETE*/}

                <Modal isOpen={deleteSalaryModal} toggle={openDeleteSalaryModal} className={""}>
                    <ModalHeader toggle={openDeleteSalaryModal}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Rostdan ham ushbu elementni o'chirishni istaysizmi?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={openDeleteSalaryModal}>Yo'q</Button>
                        <Button color="light" onClick={deleteSalary}>Ha</Button>
                    </ModalFooter>
                </Modal>


                <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Tahrirlash" : "Yangi o'qituvchi qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

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

                <Modal id={"allModalStyle"} isOpen={showOpenSalaryModal} toggle={() => openSalaryModal("")}
                       className={""}>
                    <AvForm className={""} onValidSubmit={saveSalary}>
                        <ModalHeader isOpen={showOpenSalaryModal} toggle={openSalaryModal} charCode="X">
                            {currentObject ? "Oylik yechish" : ""}
                        </ModalHeader>
                        <ModalBody>
                            <AvField
                                defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.fullName : ""}
                                type={"text"}
                                label={"FISH"} name={"fullName"} className={"form-control"}
                                placeholer={"nomi"} required disabled/>
                            <div className={"w-100 modal-form"}>
                                <AvField
                                    // defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                    type={"number"}
                                    label={"So'm"} name={"amount"} className={"form-control"}
                                    placeholer={""} required/>
                                <AvRadioGroup name="payTypeId"
                                    // defaultValue={currentObject ? currentObject.gender : ""}
                                              label="" required className="pay-form-style d-block"
                                              errorMessage="Birini tanlang!">
                                    {payTypes ? payTypes.map((item, i) =>
                                        <AvRadio key={i} className="d-block" label={item.name} value={item.id}/>
                                    ) : ""}
                                </AvRadioGroup>
                                <AvField
                                    type={"date"}
                                    defaultValue={currentObject && currentObject.amountDate ? moment(currentObject.amountDate).format('YYYY-MM-DD')
                                        : ""}
                                    label={"Pul yechilgan sana"} name={"amountDate"} className={"form-control"}
                                    required/>
                                <AvField
                                    defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.description : ""}
                                    type={"textarea"}
                                    label={"Izoh"} name={"description"} className={"form-control"}/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openSalaryModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal id={""} isOpen={showOpenSalaryModal1} toggle={() => openSalaryModal1("")}
                       className={""}>
                    <AvForm onValidSubmit={saveSalaryItem}>
                        <ModalHeader isOpen={showOpenSalaryModal1} toggle={openSalaryModal1} charCode="x">
                            <h5>Oylik</h5>
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col md={7} className={"pr-0"}>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.salary  : ""}
                                        type={"number"} name={"salary"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                </Col>
                                {console.log(currentObject)}
                                <Col md={5} className={"pl-0"}>
                                    <AvField type="select" name="percent">
                                        {currentObject.salary === null ?
                                            <option>Tanlang</option>
                                            :
                                            <option value={currentObject.percent} selected>{currentObject && currentObject.percent ? "Foiz %"  : "Sum "}</option>
                                        }
                                        {currentObject.salary === null ?
                                            <>
                                                <option value={true}>Foiz %</option>
                                                <option value={false}>Oyiga So'm</option>
                                            </>
                                            :
                                            currentObject && currentObject.percent ?
                                                <option value={false}>Oyiga So'm</option>
                                                :
                                                <option value={true}>Foiz %</option>
                                        }
                                    </AvField>
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button color="secondary" onClick={() => openSalaryModal1("")}>Yo'q</Button>
                                <Button color="light" type={"submit"}>Ha</Button>
                            </ModalFooter>
                        </ModalBody>
                    </AvForm>
                </Modal>
            </AdminLayout>
        );
    }
}

SelectTeacher.propTypes = {};

export default connect(({
                            app: {
                                groups,
                                payTypes,
                                currentItem,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                regions,
                                durationTypes,
                                getItems,
                                readModal,
                                showOpenSalaryModal,
                                showOpenSalaryModal1,
                                teacherSalary,
                                teacherSalaryList,
                                showEditSalaryModal,
                                deleteSalaryModal
                            },
                        }) => ({
        groups,
        payTypes,
        currentItem,
        loading,
        durationTypes,
        showModal,
        deleteModal,
        parentItems,
        regions,
        getItems,
        readModal,
        showOpenSalaryModal,
        showOpenSalaryModal1,
        teacherSalary,
    teacherSalaryList,
    showEditSalaryModal,
    deleteSalaryModal
    })
)(SelectTeacher);
