import React, {Component} from 'react';
import {
    deleteReklamaAction, getAppealListByEnumTypeAction, getCourseListForSelectAction, getCoursesAction,
    getReklamaAction, getTeachersForSelectAction,
    getToplamListAction,
    saveReklamaAction, saveToplamAction
} from "../../redux/actions/AppActions";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvCheckbox, AvCheckboxGroup} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import Pagination from "react-js-pagination";
import {formatSelectList} from "../../utils/addFunctions";
import Select from "react-select";


class Toplam extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(getToplamListAction({page: 0, size: this.props.size}));
        dispatch(getTeachersForSelectAction())
        dispatch(getCourseListForSelectAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        courseId: "",
        teacherId: "",
        selectReklama: [],
        selectParentReklama: "",
        parentReklamaDisable: false
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
            dispatch, showModal, deleteModal, reklamas, toplamList, size,
            page,
            totalElements, selectItems, teachers, getItems
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
            console.log(v);
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

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>To'plamlar</h3>
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
                            <th>Nomi</th>
                            <th>Kursi</th>
                            <th>O'qituvchi</th>
                            <th>Vaqti</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {toplamList && toplamList.map((item, i) =>
                            <tr key={i} className={"table-tr"}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.courseName}</td>
                                <td>{item.teacherName}</td>
                                <td>
                                    {item.weekdays && item.weekdays.length > 0 && item.weekdays.map((week) =>
                                        <span>{week}, </span>)}
                                    <br/>{item.time}
                                </td>
                                <td><input type="checkbox" checked={item.active}/></td>
                                <td>
                                    <Button color={"white"} onClick={() => openDeleteModal(item)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        )}
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
                </div>
            </AdminLayout>
        );
    }
}


Toplam.propTypes = {};

export default connect(({
                            app: {
                                getItems,
                                teachers,
                                toplamList,
                                size,
                                page,
                                totalElements, loading, reklamas, showModal, deleteModal
                            },
                        }) => ({
        getItems,
        teachers,
        toplamList,
        size,
        page,
        totalElements,
        loading, reklamas, showModal, deleteModal
    })
)(Toplam);
