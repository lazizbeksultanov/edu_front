import React, {Component} from 'react';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseAction, deleteCourseCategoryAction, getCourseCategoriesAction, getCourseCategoryAction,
    getCoursesAction,
    saveCourseAction, saveCourseCategoryAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import {DeleteIcon, EditIcon} from "../../component/Icons";

class Course extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getCoursesAction({id: id}))
            this.props.dispatch(getCourseCategoriesAction())
            this.props.dispatch(getCourseCategoryAction({id: id}))
        }
    }

    state = {
        showModal: false,
        currentObject: "",
        currentItem: [],
    }

    render() {
        const {currentObject} = this.state;
        const {
            currentItem,
            dispatch,
            showModal,
            deleteModal,
            getItems,
            courseCategories,
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
        const openDeleteModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        //
        const deleteItem = (item) => {
            dispatch(deleteCourseCategoryAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                v.currentCategoryId = this.props.match.params.id;
            }
            if (v.id) {
                dispatch(saveCourseCategoryAction(v))
            } else {
                dispatch(saveCourseAction(v))
            }
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.name}</h3>
                        <Link
                            to={"/admin/courses/list"}
                            className={"text-decoration-none"}>
                            <span className={""}>Kurs bo'limlari</span>
                        </Link>
                    </hgroup>

                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>

                    <div className={"row border-top py-3"}>
                        <div className={"col-md-4"}>
                            {currentItem && currentItem.id ?
                                <div
                                    className={"m-2 px-3 pt-0 pb-3 bg-white rounded w-100 select-student-style"}>
                                    <div className="row">
                                        <div className="col-12">
                                            <hgroup>
                                                <img src="https://image.freepik.com/free-photo/english-lettering-blue-wooden-background_23-2148293461.jpg" alt="" className={"w-100 mb-3 select-student-style_img position-relative"}/>
                                                <small className={"text-secondary"}>Nomi: </small>
                                                <p className={"d-inline"}> {currentItem.name}</p>
                                            </hgroup>
                                            <hgroup>
                                                <small className={"text-secondary"}>Holati: </small>
                                                <p className={"d-inline"}> {currentItem.active ? "Faol" : "Yopiq"}</p>
                                            </hgroup>
                                            <hgroup>
                                                <small className={"text-secondary"}>Tavsif: </small>
                                                <p className={"d-inline"}> {currentItem.description}</p>
                                            </hgroup>
                                        </div>
                                        <div className="button-block position-absolute select-student-style_buttonsGroup">
                                            <Button className="table-icon mr-1" onClick={() => openModal(currentItem)}>
                                                <EditIcon className="button-icon"/>
                                            </Button>
                                            <Button className="table-icon ml-1"
                                                    onClick={() => openDeleteModal(currentItem)}>
                                                <DeleteIcon className="button-icon"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                : ""}
                        </div>
                        <div className={"col-md-8"}>
                            <div className="row">
                                {
                                    getItems && getItems.length > 0 ? getItems.map((item, i) =>
                                            <div className={"m-2 p-3 bg-white rounded courses-style category-courses"}>
                                                <Link to={"/admin/course/select/" + item.id}
                                                      className={"w-100 text-decoration-none "}>
                                                    <h5>{item.name}</h5>
                                                    <p>{item.price} UZS</p>
                                                </Link>
                                            </div>
                                        )
                                        :
                                        <Col>
                                            <h5 className={"text-center"}>
                                                Kurs topilmadi
                                            </h5>
                                        </Col>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={() => openModal("")} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Kurs kategoriyani tahrirlash" : "Yangi kurs qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholer={"nomi"} required/>
                                {currentObject && currentObject.id ? "" :
                                    <>
                                        <AvField className={'form-control'} label={"Kurs bo'limi:"} type="select"
                                                 name="courseCategoryId"
                                                 defaultValue={this.props.match && this.props.match.params && this.props.match.params.id ?
                                                     this.props.match.params.id : "0"}>
                                            <option key={0} value={"0"}>Kurs bo'limi</option>
                                            {courseCategories ? courseCategories.map((item, i) =>
                                                item.category ? "" :
                                                    <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}
                                        </AvField>
                                        <AvField defaultValue={currentObject ? currentObject.price : ""} type={"number"}
                                                 label={"1 ta dars narxi"} name={"price"} className={"form-control"}
                                                 placeholer={""} required/>
                                    </>
                                }
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
        )
            ;
    }
}

Course.propTypes = {};

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
)(Course);
