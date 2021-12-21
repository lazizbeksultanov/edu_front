import React, {Component} from 'react';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseAction, getCourseAction, getCourseCategoriesAction,
    getCoursesAction,
    getDurationTypesAction, saveCourseAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon, ShowIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";

class SelectCourse extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getCourseAction({id: id}))
        }
        this.props.dispatch(getCourseCategoriesAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            courseCategories,
        } = this.props;
        const openModal = (item) => {
            if (item && item.id) {
                this.setState({currentObject: item})
                dispatch({
                    type: "updateState",
                    payload: {
                        showModal: !showModal
                    }
                })
            } else {
                if (showModal) {
                    dispatch({
                        type: "updateState",
                        payload: {
                            showModal: false
                        }
                    })
                }
            }
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
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                dispatch(deleteCourseAction({...item, history: history, courseCategoryId: id}))
            }
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
                dispatch(saveCourseAction(v))
            }
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.name} </h3>
                        <Link
                            to={"/admin/course/" + (currentItem && currentItem.courseCategory && currentItem.courseCategory.id)}
                            className={"text-decoration-none"}>
                        <span
                            className={""}> {currentItem && currentItem.courseCategory && currentItem.courseCategory.name} kurslari</span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem && currentItem.id ?
                            <div className={"m-2 p-3 bg-white rounded col-md-4 col-10"}>
                                <div className="row">
                                    <div className="col-8">
                                        <hgroup>
                                            <small className={"text-secondary"}>Nomi</small>
                                            <h5>{currentItem.name}</h5>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Kategoriyasi</small>
                                            <h6>{currentItem.courseCategory ? currentItem.courseCategory.name : ""} </h6>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tavsif</small>
                                            <h6>{currentItem.description} </h6>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>1 ta Dars Narxi</small>
                                            <h6>{currentItem.price} UZS</h6>
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
                            : ""}
                    </div>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={() => openModal("")} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholer={"nomi"} required/>
                                <AvField className={'form-control'} label={"Kurs bo'limi:"} type="select"
                                         name="courseCategoryId"
                                         defaultValue={currentObject && currentObject.courseCategory ? currentObject.courseCategory.id : "0"}>
                                    <option key={0} value={"0"}>Kurs bo'limi</option>
                                    {courseCategories ? courseCategories.map((item, i) =>
                                        item.category ? "" :
                                            <option key={i} value={item.id}>{item.name}</option>
                                    ) : ""}
                                </AvField>
                                <AvField defaultValue={currentObject ? currentObject.price : ""} type={"number"}
                                         label={"Narxi"} name={"price"} className={"form-control"}
                                         placeholer={""} required/>
                                <AvField type="text"
                                         defaultValue={currentObject ? currentObject.description : false}
                                         label={"Description"} name={"description"} placeholder={"izoh"}/>
                                <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                         label={"Active"} name={"active"}/>
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

            </AdminLayout>
        );
    }
}

SelectCourse.propTypes = {};

export default connect(({
                            app: {
                                currentItem,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                courseCategories,
                                durationTypes,
                                getItems,
                                readModal
                            },
                        }) => ({
        currentItem,
        loading, durationTypes, showModal, deleteModal, parentItems, courseCategories, getItems, readModal
    })
)(SelectCourse);
