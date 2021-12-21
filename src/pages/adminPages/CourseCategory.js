import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseCategoryAction,
    getCourseCategoriesAction, getCoursesAction,
    saveCourseCategoryAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";

class CourseCategory extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match.path === "/admin/courses")
            this.props.history.push("/admin/courses/list")
        // if (this.props.match && this.props.match.params && this.props.match.params.id)
        //     id = this.props.match.params.id;
        this.props.dispatch(getCourseCategoriesAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {history, dispatch, showModal, deleteModal, loading, courseCategories} = this.props;
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
            dispatch(deleteCourseCategoryAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            if (v.courseCategoryId === "0") {
                v.courseCategoryId = null
            }
            dispatch(saveCourseCategoryAction(v))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h4>Kurs kategoriyalar</h4>
                    <div align={"right"}>
                        <Button onClick={openModal} className={"mb-3 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <div className={"row border-top py-3"}>
                        {
                            courseCategories ? courseCategories.map((item, i) =>
                                    <div key={i} className={"m-2 p-3 bg-white course-category"}>
                                        <Link to={"/admin/course/" + item.id}
                                              className={"w-100 text-decoration-none "}>
                                            <img src="https://image.freepik.com/free-photo/english-lettering-blue-wooden-background_23-2148293461.jpg" alt="" className={"w-100 mb-3"}/>
                                            <h5>{item.name}</h5>
                                            <p>{item.description}</p>
                                        </Link>
                                    </div>
                                )
                                : ""
                        }
                    </div>


                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={() => openModal("")} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
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
                </div>
            </AdminLayout>
        );
    }
}

CourseCategory
    .propTypes = {};

export default connect(
    ({
         app: {loading, courseCategories, showModal, deleteModal}
         ,
     }
    ) =>
        ({
            loading, courseCategories, showModal, deleteModal
        })
)
(CourseCategory);
