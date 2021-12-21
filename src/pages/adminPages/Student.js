import React, {Component} from 'react';
import {ModalHeader, Modal, Button, ModalBody, Table, ModalFooter} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteStudentAction, getDebtorsAction,
    getRegionsAction, getStudentsAction,
    saveStudentAction,
    uploadFileAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import moment from 'moment';
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {formatPhoneNumber} from "../../utils/addFunctions";


class Student extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getStudentsAction({page: 0, size: this.props.size}))
        this.props.dispatch(getDebtorsAction({page: 0, size: 20}))
    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        specs: '',
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getStudentsAction({page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {currentObject} = this.state;
        const {
            page,
            size,
            totalElements,
            students,
            dispatch,
            showModal,
            deleteModal,
            regions, selectDebtors
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
        const openFiltrDebtors = (item) => {
            this.setState({currentObject: item})
            this.setState({secondPage: !this.state.secondPage})
            // dispatch({
            //     type: 'updateState',
            //     payload:{
            //         secondPage: !this.state.secondPage
            //     }
            // })
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
            dispatch(deleteStudentAction(item))
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
            let studentDto;
            studentDto = {
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                parentPhone: v.parentPhone,
                avatarId: v.attachmentId,
                regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString(),
            }
            dispatch(saveStudentAction(studentDto))
        }
        const uploadImg = (e) => {
            this.props.dispatch(uploadFileAction(e.target.files[0]))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                {this.state.secondPage ?
                    <div className={"flex-column container"}>
                        <h1>Talablar</h1>
                        <div align={"right"}><Button color={"success"} onClick={openModal}
                                                     className={"mb-2 add-button px-4"}>Yangisini qo'shish</Button>
                        </div>
                        <Button color={"primary w-100"} onClick={openFiltrDebtors}>Qarzdorlar</Button>
                        <div>
                            <br/>
                            <Link to={"/admin/studentPayment"}>StudentPaymentlar</Link>
                        </div>
                        <br/>
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
                            {
                                students ? students.map((item, i) =>
                                    <tr key={i} className={"table-tr"}>
                                        <td>{i + 1}</td>
                                        <td><Link className={"text-dark"}
                                                  to={"/admin/student/" + (item.id)}>{item.fullName}</Link>
                                        </td>
                                        <td>
                                            {item.phoneNumber && item.phoneNumber.length === 9 ? formatPhoneNumber(item.phoneNumber) : item.phoneNumber}
                                        </td>
                                        <td>
                                            <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                                <DeleteIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                ) : ''
                            }
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
                                    {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
                                </ModalHeader>
                                <ModalBody>
                                    <div className={"w-100 modal-form"}>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.fullName : ""}
                                            type={"text"}
                                            label={"FISH"} name={"fullName"} className={"form-control"}
                                            placeholer={"nomi"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.parentPhone : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Ota-onasining telefon Raqami"} name={"parentPhone"}
                                            className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            type={"date"}
                                            defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                                : ""}
                                            label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                            required/>
                                        <AvField className={'form-control'} label={'Hudud:'} type="select"
                                                 name="regionId"
                                                 defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                            <option key={0} value={"0"}>Ota hududni tanlang</option>
                                            {regions ? regions.map((item, i) =>
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}
                                        </AvField>
                                        <AvRadioGroup name="gender"
                                                      defaultValue={currentObject ? currentObject.gender : ""}
                                                      label="Jins" required
                                                      errorMessage="Birini tanlang!">
                                            <AvRadio label="Erkak" value="MALE"/>
                                            <AvRadio label="Ayol" value="FEMALE"/>
                                        </AvRadioGroup>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.description : ""}
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
                    :
                    <div className={"flex-column container"}>
                        <h1>Qazdorlar</h1>
                        <Button color={"primary mt-5 w-100"} onClick={openFiltrDebtors}>Talabalar</Button>
                        <Table className={"table-style w-75"}>
                            <thead className={""}>
                            <tr className={""}>
                                <th>No</th>
                                <th>IsmI</th>
                                <th>Telefon</th>
                                <th>Uy Telefon</th>
                                <th>Manzil</th>
                                <th>Qarzi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectDebtors ? selectDebtors.map((item, i) =>
                                <tr key={i} className={"table-tr"}>
                                    <td>{i + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.parentPhone}</td>
                                    <td>{item.region ? item.region.name : ''}</td>
                                    <td>{item.balans}</td>
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
                                    {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
                                </ModalHeader>
                                <ModalBody>
                                    <div className={"w-100 modal-form"}>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.fullName : ""}
                                            type={"text"}
                                            label={"FISH"} name={"fullName"} className={"form-control"}
                                            placeholer={"nomi"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.parentPhone : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Ota-onasining telefon Raqami"} name={"parentPhone"}
                                            className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            type={"date"}
                                            defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                                : ""}
                                            label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                            required/>
                                        <AvField className={'form-control'} label={'Hudud:'} type="select"
                                                 name="regionId"
                                                 defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                            <option key={0} value={"0"}>Ota hududni tanlang</option>
                                            {regions ? regions.map((item, i) =>
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}
                                        </AvField>
                                        <AvRadioGroup name="gender"
                                                      defaultValue={currentObject ? currentObject.gender : ""}
                                                      label="Jins" required
                                                      errorMessage="Birini tanlang!">
                                            <AvRadio label="Erkak" value="MALE"/>
                                            <AvRadio label="Ayol" value="FEMALE"/>
                                        </AvRadioGroup>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.description : ""}
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

                        <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                            <AvForm className={""} onValidSubmit={saveItem}>
                                <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                    {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
                                </ModalHeader>
                                <ModalBody>
                                    <div className={"w-100 modal-form"}>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.fullName : ""}
                                            type={"text"}
                                            label={"FISH"} name={"fullName"} className={"form-control"}
                                            placeholer={"nomi"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.parentPhone : ""}
                                            type={"number"}
                                            errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                            validate={{
                                                required: {value: true},
                                                pattern: {value: "^[0-9]+$"},
                                                minLength: {value: 9},
                                                maxLength: {value: 9}
                                            }}
                                            label={"Ota-onasining telefon Raqami"} name={"parentPhone"}
                                            className={"form-control"}
                                            placeholer={"991234567"} required/>
                                        <AvField
                                            type={"date"}
                                            defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                                : ""}
                                            label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                            required/>
                                        <AvField className={'form-control'} label={'Hudud:'} type="select"
                                                 name="regionId"
                                                 defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                            <option key={0} value={"0"}>Ota hududni tanlang</option>
                                            {regions ? regions.map((item, i) =>
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}
                                        </AvField>
                                        <AvRadioGroup name="gender"
                                                      defaultValue={currentObject ? currentObject.gender : ""}
                                                      label="Jins" required
                                                      errorMessage="Birini tanlang!">
                                            <AvRadio label="Erkak" value="MALE"/>
                                            <AvRadio label="Ayol" value="FEMALE"/>
                                        </AvRadioGroup>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.description : ""}
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
                }
            </AdminLayout>
        );
    }

}

Student.propTypes = {}

;

export default connect((
    {
        app: {
            page,
            size,
            totalElements,
            students,
            loading,
            courseCategories,
            showModal,
            specializationDto,
            deleteModal,
            selectDebtors,
            selectItems,
            spec,
            selectItemsFromSpec,
            regions,
            attachmentId,
            teachers,
            readModal,
            teacherDto,
        }
        ,
    }
    ) => (
        {
            page,
            size,
            selectDebtors,
            totalElements,
            students,
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
        }
    )
)(Student);
