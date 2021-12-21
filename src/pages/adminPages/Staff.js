import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminLayout from "../../component/AdminLayout";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import moment from "moment";
import {connect} from "react-redux";
import {saveCourseAction, saveCourseCategoryAction} from "../../redux/actions/AppActions";

class Staff extends Component {
    state = {
        showModal: false,
        showPaymentModal: false,
        currentObject: "",
        addGroup: "",
        activeTab: "1",
    }

    render() {
        const {currentObject, activeTab, showPaymentModal, addGroup} = this.state;
        const {
            getItems,
            selectItems,
            showAddGroupModal,
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            regions,
            payTypes, studentPayment, selectGroups
        } = this.props;
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
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>Xodimlar</h3>
                    </hgroup>
                    <div align={"right"}>
                        <Button color={"success"}
                                onClick={openModal}
                                className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <div className={"row border-top py-3"}>
                    </div>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            Xodimni qo'shish
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField
                                    defaultValue={currentObject ? currentObject.fullName : ""}
                                    disabled={showPaymentModal}
                                    type={"text"}
                                    label={"FISH"} name={"fullName"} className={"form-control"}
                                    placeholer={"nomi"} required/>
                                <AvField
                                    defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                    type={"number"}
                                    label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                    placeholer={"nomi"} required/>
                                <AvField
                                    type={"date"}
                                    defaultValue={currentObject ? moment(currentObject.birthDate).format('YYYY-MM-DD')
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
                                              label="Jins" required className=""
                                              errorMessage="Birini tanlang!">
                                    <AvRadio className="" label="Erkak" value="MALE"/>
                                    <AvRadio className="" label="Ayol" value="FEMALE"/>
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

            </AdminLayout>
        );
    }
}

Staff.propTypes = {};

export default connect(({
                            app: {
                                selectItems,
                                showAddGroupModal,
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
                                studentPayment,
                                selectGroups
                            },
                        }) => ({
        selectItems,
        showAddGroupModal,
        payTypes,
        currentItem,
        loading, durationTypes, showModal, deleteModal, parentItems, regions, getItems, readModal, studentPayment,
        selectGroups
    })
)(Staff);
