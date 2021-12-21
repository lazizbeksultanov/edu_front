import * as types from "../actionTypes/AppActionTypes";
import * as app from "../../api/AppApi";

import {

    getClientList,
    editClientApi,
    saveClientApi,
    deleteClientApi,

    //Room
    getRoomList,
    editRoomApi,
    saveRoomApi,
    deleteRoomApi,

    // Cashback
    getCashbackList,
    editCashbackApi,
    saveCashbackApi,
    deleteCashbackApi,

    //PayType
    getPayTypeList,
    editPayTypeApi,
    savePayTypeApi,
    deletePayTypeApi,

    //reklama

    getReklamaApi,
    editReklamaApi,
    saveReklamaApi,
    deleteReklamaApi,
    //course
    editCourseApi,
    getCoursesApi,
    saveCourseApi,
    deleteCourseApi,
    //durationType
    editDurationTypeApi,
    getDurationTypesApi,
    saveDurationTypeApi,
    deleteDurationTypeApi,
    //Profession
    editProfessionApi,
    saveProfessionApi,
    deleteProfessionsApi,
    getProfessionApi,
    //region
    getRegionSearchApi,
    editRegionApi,
    getRegionApi,
    saveRegionApi,
    deleteRegionApi,
    //testCategory
    saveTestCategoryApi,
    editTestCategoryApi,
    getTestCategoryApi,
    deleteTestCategoryApi,
    //Course category
    saveCourseCategoryApi,
    getCourseCategoriesApi,
    editCourseCategoryApi,
    deleteCourseCategoryApi,

    //trialContact
    getTrialContactTypesApi,
    editTrialContactTypeApi,
    saveTrialContactTypeApi,
    deleteTrialContactTypeApi,
    //teacher
    getTeacherApi,
    editTeacherApi,
    deleteTeacherApi,
    saveTeacherApi,
    getCourseApi,
    getCourseCategoryApi,
    getStudentsApi,
    editStudentApi,
    saveStudentApi,
    getStudentApi,
    getTeachersApi,
    getGroupsApi,
    getTeachersForSelectApi,
    saveGroupApi,
    getGroupApi,
    editGroupApi,
    deleteGroupApi,
    deleteStudentApi,
    getGroupsForAddApi,
    getGroupsForSelectApi,
    studentAddGroup,
    getGroupStudentsApi,
    getTeacherGroupsApi,
    getStudentPaymentApi,
    getStudentGroupsApi,
    saveStudentPaymentApi,
    changeStudentGroupStatusApi,
    getDebtorsAPI,
    editStudentPaymentApi,
    getClientStatusListApi,
    saveClientStatusApi,
    editClientStatusApi,
    deleteClientStatusApi,
    getReklamaForSelectApi,
    saveAppealApi,
    getAppealListByEnumTypeApi,
    getAppealListByStatusTypeApi,
    changeAppealEnumTypeApi,
    getToplamListApi,
    getToplamListForSelectApi,
    saveToplamApi,
    editToplamApi,
    deleteToplamApi,
    getCourseListForSelectApi,
    getOneAppealApi,
    getToplamApi,
    giveSalaryApi,
    deleteStudentPaymentApi,
    getTeacherSalaryApi,
    getStudentPaymentListApi,
    getStudentPaymentCashbacksApi,
    getTeacherSalaryAppApi,
    deleteTeacherSalaryApi, giveTeacherSalaryApi,
    changeGroupStatusApi,
    changeGroupToArchiveStatusApi,
    changeGroupToActiveStatusApi,
    getAttendanceListAppApi, saveAttendanceAppApi, getStudentByGroupApi,
} from "../../api/AppApi";
import {toast} from "react-toastify";


export const getAttendanceListAction = (payload) => (dispatch) => {
    dispatch({
        api: getAttendanceListAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_ATTENDANCE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data : payload
    })
}
export const getStudentsByGroupAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentByGroupApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENTS_BY_GROUP_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}

export const saveAttendanceAction = (data) => (dispatch) => {
    console.log(data)
    dispatch({
        api: saveAttendanceAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getAttendanceListAction(data.groupId))
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}

export const getDebtorsAction = () => (dispatch) => {
    dispatch({
        api: getDebtorsAPI,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_DEBTORS_SUCCESS,
            types.REQUEST_ERROR
        ]
    })
}

export const getClientAction = (data) => (dispatch) => {
    console.log(data);
    dispatch({
        api: getClientList,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_CLIENT_SUCCESS,
            types.REQUEST_ERROR
        ]
    })

}
export const saveClientAction = (data) => (dispatch) => {
    console.log(data.id);
    dispatch({
        api: (data.id ? editClientApi : saveClientApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_CLIENT_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getClientAction())
    }).catch((err) => {
        toast.error("Xatolik!!App actionni qara")
    })
}
export const deleteClientAction = (data) => (dispatch) => {
    dispatch({
        api: deleteClientApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Malumot O`chirildi")
        dispatch(getClientAction())
    }).catch((err) => {
        toast.error("Xatolik.Delete")
    })
}


// Start Room

export const getRoomListAction = () => (dispatch) => {
    dispatch({
        api: getRoomList,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_ROOM_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}

export const saveRoomAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editRoomApi : saveRoomApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_ROOM_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getRoomListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}

export const deleteRoomAction = (data) => (dispatch) => {
    dispatch({
        api: deleteRoomApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_ROOM_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success("Malumot ochirildi")
        dispatch(getRoomListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
};

// End Room


// Start Cashback

export const getCashbackListAction = () => (dispatch) => {
    dispatch({
        api: getCashbackList,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_CASHBACK_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}

export const saveCashbackAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editCashbackApi : saveCashbackApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_CASHBACK_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getCashbackListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}

export const deleteCashbackAction = (data) => (dispatch) => {
    dispatch({
        api: deleteCashbackApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_CASHBACK_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                cashback: null
            }
        })
        toast.success("Malumot ochirildi")
        dispatch(getCashbackListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
};

// End Cashback

// PayType
export const getPayTypeListAction = () => (dispatch) => {
    dispatch({
        api: getPayTypeList,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_PAYTYPE_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const savePayTypeAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editPayTypeApi : savePayTypeApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_PAYTYPE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getPayTypeListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const deletePayTypeAction = (data) => (dispatch) => {
    dispatch({
        api: deletePayTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_PAYTYPE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                room: null
            }
        })
        toast.success("Malumot ochirildi")
        dispatch(getPayTypeListAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
};
// PayType End
// START CLIENT STATUS
export const getClientStatusListAction = (data) => (dispatch) => {
    dispatch({
        api: getClientStatusListApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_CLIENT_STATUS_LIST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}
export const getClientStatusListForSelectAction = (data) => (dispatch) => {
    dispatch({
        api: getClientStatusListApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_CLIENT_STATUS_LIST_FOR_SELECT_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}
export const saveClientStatusAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editClientStatusApi : saveClientStatusApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_CLIENT_STATUS_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(() => {
        dispatch(getClientStatusListAction({type: "all"}));
    })
}
export const deleteClientStatusAction = (data) => (dispatch) => {
    dispatch({
        api: deleteClientStatusApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(() => {
        toast.success("Ma'lumot o'chirildi!")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        dispatch(getClientStatusListAction({type: "all"}));
    })
}
// FINISH CLIENT STATUS
//Reklmaa
export const getReklamaAction = () => (dispatch) => {
    dispatch({
        api: getReklamaApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_REKLAMA_SUCCESS,
            types.REQUEST_ERROR
        ]
    })
}
export const getReklamaListForSelectAction = () => (dispatch) => {
    dispatch({
        api: getReklamaForSelectApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_REKLAMA_SUCCESS,
            types.REQUEST_ERROR
        ]
    })
}
export const saveReklamaAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editReklamaApi : saveReklamaApi),
        types: [
            types.REQUEST_SAVE_REKLAMA_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getReklamaAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const deleteReklamaAction = (data) => (dispatch) => {
    dispatch({
        api: deleteReklamaApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Malumot o`chirildi")
        dispatch(getReklamaAction())
    }).catch((err) => {
        toast.error("O`chirishda xatolik")
    })
}

// START DURATION TYPE
//  Duration Type
export const getDurationTypesAction = () => (dispatch) => {
    dispatch({
        api: getDurationTypesApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_DURATION_TYPE_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const deleteDurationTypeAction = (data) => (dispatch) => {
    dispatch({
        api: deleteDurationTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getDurationTypesAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const saveDurationTypeAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editDurationTypeApi : saveDurationTypeApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_DURATION_TYPE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getDurationTypesAction())
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
// END DURATION TYPE
// START COURSE
export const getCoursesAction = (data) => (dispatch) => {
    dispatch({
        api: getCoursesApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_COURSES_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const getCourseListForSelectAction = (data) => (dispatch) => {
    dispatch({
        api: getCourseListForSelectApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_COURSES_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const getCourseAction = (data) => (dispatch) => {
    dispatch({
        api: getCourseApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_COURSE_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const deleteCourseAction = (data) => (dispatch) => {
    dispatch({
        api: deleteCourseApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        data.history.go(-1)
        if (data && data.courseCategoryId) {
            dispatch(getCourseCategoriesAction())
            dispatch(getCoursesAction({id: data.courseCategoryId}))
            dispatch(getCourseCategoryAction({id: data.courseCategoryId}))
        }
    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
    })
}
export const saveCourseAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editCourseApi : saveCourseApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_COURSE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        if (data && data.id)
            dispatch(getCourseAction({id: data.id}))
        dispatch(getCoursesAction({id: data.currentCategoryId}))
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
// END COURSE TYPE
// START REGION ACTIONS
export const getRegionsAction = () => (dispatch) => {
    dispatch({
        api: getRegionApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_REGION_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const deleteRegionAction = (data) => (dispatch) => {
    dispatch({
        api: deleteRegionApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getRegionsAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const saveRegionAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editRegionApi : saveRegionApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_REGION_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getRegionsAction())
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const searchRegionAction = (data) => (dispatch) => {
    dispatch({
        api: getRegionSearchApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SEARCH_REGION_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
// FINISH REGION ACTIONS

// START GROUP ACTIONS
export const getGroupsAction = (data) => (dispatch) => {
    dispatch({
        api: getGroupsApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_GROUPS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getGroupsForSelectAction = (data) => (dispatch) => {
    dispatch({
        api: getGroupsForSelectApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_GROUPS_FOR_SELECT_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getGroupAction = (data) => (dispatch) => {
    dispatch({
        api: getGroupApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_GROUP_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getGroupStudentsAction = (data) => (dispatch) => {
    dispatch({
        api: getGroupStudentsApi,
        types: [

            types.REQUEST_START,
            types.REQUEST_GET_GROUP_STUDENTS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const deleteGroupAction = (data) => (dispatch) => {
    dispatch({
        api: deleteGroupApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        if (data && data.id) {
            data.history.go(-1)
        }
        dispatch(getGroupsAction({page: 0, size: 20}))
        dispatch(getRoomListAction())
        dispatch(getCoursesAction())
        dispatch(getTeachersForSelectAction())
    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
    })
}
export const saveGroupAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editGroupApi : saveGroupApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_GROUP_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        if (data && data.id) {
            dispatch(getGroupAction({id: data.id}))
            dispatch(getRoomListAction())
            dispatch(getCoursesAction())
            dispatch(getTeachersForSelectAction())
        } else {
            dispatch(getGroupsAction())
        }
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}

export const changeGroupStatusToArchiveAction = (data) => (dispatch) => {
    dispatch({
        api: changeGroupToArchiveStatusApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                changeModal: false
            }
        })
        toast.success(res.payload.message)
        if (data && data.groupId) {
            dispatch(getGroupAction({id: data.groupId}))
        }
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}

export const changeGroupStatusToActiveAction = (data) => (dispatch) => {
    dispatch({
        api: changeGroupToActiveStatusApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                changeModal: false
            }
        })
        toast.success(res.payload.message)
        if (data && data.groupId) {
            dispatch(getGroupAction({id: data.groupId}))
        }
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const changeStudentGroupStatusAction = (data) => (dispatch) => {
    dispatch({
        api: changeStudentGroupStatusApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                changeStatusModal: false
            }
        })
        toast.success(res.payload.message)
        if (data && data.groupId) {
            dispatch(getGroupAction({id: data.groupId}))
            dispatch(getGroupStudentsAction({id: data.groupId}))
            dispatch(getRoomListAction())
            dispatch(getCoursesAction())
            dispatch(getTeachersForSelectAction())
        }
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const searchGroupAction = (data) => (dispatch) => {
    dispatch({
        api: getRegionSearchApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SEARCH_REGION_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
//TEST CATEGORY
export const getTestCategoryAction = () => (dispatch) => {
    dispatch({
        api: getTestCategoryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TEST_CATEGORY_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const deleteTestCategoryAction = (data) => (dispatch) => {
    dispatch({
        api: deleteTestCategoryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getTestCategoryAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const saveTestCategoryAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editTestCategoryApi : saveTestCategoryApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_TEST_CATEGORY_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getTestCategoryAction())
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}


//  Profession
export const getProfessionAction = () => (dispatch) => {
    dispatch({
        api: getProfessionApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_PROFESSION_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const saveProfessionAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editProfessionApi : saveProfessionApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_DURATION_TYPE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getProfessionAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const deleteProfessionAction = (data) => (dispatch) => {
    dispatch({
        api: deleteProfessionsApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getProfessionAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}

//  Course Category
export const getCourseCategoryAction = (data) => (dispatch) => {
    dispatch({
        api: getCourseCategoryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_COURSE_CATEGORY_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const getCourseCategoriesAction = (data) => (dispatch) => {
    dispatch({
        api: getCourseCategoriesApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_COURSE_CATEGORIES_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const deleteCourseCategoryAction = (data) => (dispatch) => {
    dispatch({
        api: deleteCourseCategoryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getCourseCategoriesAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const saveCourseCategoryAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editCourseCategoryApi : saveCourseCategoryApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_COURSE_CATEGORY_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        if (data && data.id) {
            dispatch(getCoursesAction({id: data.id}))
            dispatch(getCourseCategoryAction({id: data.id}))
        }
        dispatch(getCourseCategoriesAction())
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}

// START TRIAL CONTACT TYPE
export const getTrialContactTypesAction = () => (dispatch) => {
    dispatch({
        api: getTrialContactTypesApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TRIAL_CONTACT_TYPE_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const deleteTrialContactTypeAction = (data) => (dispatch) => {
    dispatch({
        api: deleteTrialContactTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
                trialContactType: ''
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        dispatch(getTrialContactTypesAction())
    }).catch((err) => {
        toast.error("Xatolik")
    })
}
export const saveTrialContactTypeAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editTrialContactTypeApi : saveTrialContactTypeApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_TRIAL_CONTACT_TYPE_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getTrialContactTypesAction())
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
// END TRIAL CONTACT TYPE

// Attachment Action Start
export const uploadFileAction = (payload) => async (dispatch) => {
    if (!payload || !(payload.type.substring(0, payload.type.indexOf("/")) === "image")) {
        toast.error("File must be img")
        return "";
    }
    let obj = new FormData();
    obj.append("file", payload)

    dispatch({
        api: app.uploadFileAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: obj

    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: res.payload
            }
        })
    }).catch(err => err)
}
// Attachment Action End

// START STUDENT ACTION
export const getStudentsAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentsApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENTS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getStudentAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENT_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const saveStudentAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editStudentApi : saveStudentApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_STUDENT_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getStudentsAction())
        dispatch(getStudentAction({id: data.id}))
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const deleteStudentAction = (data) => (dispatch) => {
    dispatch({
        api: deleteStudentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        if (data && data.history) {
            data.history.go(-1)
        }
        dispatch(getStudentsAction())
        dispatch(getRegionsAction())

    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
    })
}
export const studentAddGroupAction = (data) => (dispatch) => {
    dispatch({
        api: studentAddGroup,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                showAddGroupModal: false,
            }
        })
        toast.success("Talaba guruhga qo'shildi!")
        dispatch(getStudentAction(data.student))
    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                showAddGroupModal: false,
            }
        })
    })
}


// FINISH STUDENT ACTION
// START TEACHER ACTION

export const getTeachersAction = (data) => (dispatch) => {
    dispatch({
        api: getTeachersApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TEACHERS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getTeachersForSelectAction = () => (dispatch) => {
    dispatch({
        api: getTeachersForSelectApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TEACHERS_FOR_SELECT_SUCCESS,
            types.REQUEST_ERROR,
        ]
    })
}
export const getTeacherAction = (data) => (dispatch) => {
    dispatch({
        api: getTeacherApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TEACHER_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const getTeacherGroupsAction = (data) => (dispatch) => {
    dispatch({
        api: getTeacherGroupsApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TEACHER_GROUPS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const saveTeacherAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editTeacherApi : saveTeacherApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_TEACHER_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        if (data && data.id) {
            dispatch(getTeacherAction({id: data.id}))
            dispatch(getRegionsAction())
            dispatch(getPayTypeListAction())
        }
        dispatch(getTeachersAction({page: 0, size: 20}))
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const deleteTeacherAction = (data) => (dispatch) => {
    dispatch({
        api: deleteTeacherApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        if (data && data.history) {
            data.history.go(-1)
        }
        dispatch(getTeachersAction())
    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
    })
}


// START STUDENT PAYMENT ACTIONS
export const getStudentPaymentAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentPaymentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENT_PAYMENT_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}
export const getStudentGroupAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentGroupsApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENT_GROUPS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data: data
    })
}

export const saveStudentPaymentAction = (data) => (dispatch) => {
    dispatch({
        api: (data.id ? editStudentPaymentApi : saveStudentPaymentApi),
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_STUDENT_PAYMENT_SUCCESS,
            types.REQUEST_ERROR
        ],
        data: data
    }).then((res) => {
        toast.success(res.payload.message)
        dispatch(getStudentGroupAction(data.studentId))
        dispatch(getStudentAction({id: data.studentId}))
    }).catch((err) => {
        toast.error("Xatolik!")
    })
}
export const deleteStudentPaymentAction = (data) => (dispatch) => {
    dispatch({
        api: deleteStudentPaymentApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then((res) => {
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
        toast.success("Ma'lumot o'chirildi!")
        if (data && data.history) {
            data.history.go(-1)
        }
        dispatch(getStudentPaymentAction())

    }).catch((err) => {
        toast.error("Xatolik")
        dispatch({
            type: "updateState",
            payload: {
                deleteModal: false,
            }
        })
    })
}

export const getStudentPaymentListAction= (data) => (dispatch) => {
    dispatch({
        api: getStudentPaymentListApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_STUDENT_PAYMENT_LIST_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getStudentPaymentCashbacksAction = (data) => (dispatch) => {
    dispatch({
        api: getStudentPaymentCashbacksApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_STUDENT_PAYMENT_CASHBACKS_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}



// FINISH STUDENT PAYMENT ACTIONS

// START APPEAL ACTIONS
export const saveAppealAction = (data) => (dispatch) => {
    dispatch({
        api: saveAppealApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_APPEAL_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    }).then((res) => {
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
        if (data && data.enumType)
            if (data.typeId)
                dispatch(getAppealListByStatusTypeAction({
                    enumType: data.enumType,
                    typeId: data.typeId,
                    page: 0,
                    size: 20
                }))
            else
                dispatch(getAppealListByEnumTypeAction({enumType: data.enumType, page: 0, size: 20}))

    })
}
export const changeAppalTypeAction = (data) => (dispatch) => {
    dispatch({
        api: changeAppealEnumTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_APPEAL_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    }).then((res) => {
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
        if (data && data.enumType)
            if (data.typeId)
                dispatch(getAppealListByStatusTypeAction({
                    enumType: data.enumType,
                    typeId: data.typeId,
                    page: 0,
                    size: 20
                }))
            else
                dispatch(getAppealListByEnumTypeAction({enumType: data.enumType, page: 0, size: 20}))
    })
}
export const changeAppalTypeByToplamAction = (data) => (dispatch) => {
    dispatch({
        api: changeAppealEnumTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_APPEAL_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    }).then((res) => {
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
        dispatch(getOneToplamAction({id: data.toplamId}))


    })
}
export const getAppealListByEnumTypeAction = (data) => (dispatch) => {
    dispatch({
        api: getAppealListByEnumTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_APPEAL_LIST_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getOneAppeal = (data) => (dispatch) => {
    dispatch({
        api: getOneAppealApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_APPEAL_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
export const getAppealListByStatusTypeAction = (data) => (dispatch) => {
    dispatch({
        api: getAppealListByStatusTypeApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_APPEAL_LIST_SUCCESS,
            types.REQUEST_ERROR,
        ],
        data
    })
}
// FINISH APPEAL ACTIONS

// START TOPLAM ACTIONS
export const getToplamListAction = (data) => (dispatch) => {
    dispatch({
        api: getToplamListApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TOPLAM_LIST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}
export const getOneToplamAction = (data) => (dispatch) => {
    dispatch({
        api: getToplamApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TOPLAM_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}
export const saveToplamAction = (data) => (dispatch) => {
    dispatch({
        api: data.id ? editToplamApi : saveToplamApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_TOPLAM_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(res => {
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
        dispatch(getToplamListAction({page: 0, size: 20}));
    })
}
export const deleteToplamAction = (data) => (dispatch) => {
    dispatch({
        api: deleteToplamApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(res => {
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
        dispatch({
            type: "updateState",
            payload: {
                showDeleteModal: false
            }
        })
        dispatch(getToplamListAction({page: 0, size: 20}));
    })
}
export const getToplamListForSelectAction = (data) => (dispatch) => {
    dispatch({
        api: getToplamListForSelectApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_TOPLAM_FOR_SELECT_LIST_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}

// FINISH TOPLAM ACTIONS

// START TEACHER SALARY
export const giveSalaryAction = (data) => (dispatch) => {
    dispatch({
        api: giveSalaryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GIVE_SALARY_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(res => {
        dispatch(getTeacherAction({id: data.teacherId}))
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
    })
}
export const saveTeacherSalaryAction = (data) => (dispatch) => {
    dispatch({
        api: giveTeacherSalaryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SAVE_TEACHER_SALARY_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    }).then(res => {
        dispatch(getTeacherAction({id: data.teacherId}))
        if (res && res.payload && res.payload.message)
            toast.success(res.payload.message)
    })
}
export const getTeacherSalaryListAction = (data) => (dispatch) => {
    dispatch({
        api: getTeacherSalaryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_LIST_SALARY_SUCCESS,
            types.REQUEST_ERROR
        ],
        data
    })
}
export const editTeacherSalaryListAction = (payload) => (dispatch) => {
    dispatch({
        api: app.editTeacherSalaryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        dispatch(getTeacherSalaryListAction({
            id : payload.teacherId,
            page:0,
            size:20
        }))

        toast.success(res.payload.message)
        dispatch({
            type: {
                showEditSalaryModal: false
            }
        })
    }).catch(err => {
        toast.error("Xato")
    })
}

export const deleteTeacherSalaryAction = (payload) => (dispatch) => {
    dispatch({
        api: deleteTeacherSalaryApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_SUCCESS,
            types.REQUEST_ERROR

        ],
        data: payload.id
    }).then(res => {
        console.log(res)

        dispatch(getTeacherSalaryListAction({
            id : payload.teacher.id,
            page:0,
            size:20
        }))

        dispatch({
            type: "updateState",
            payload: {
                deleteSalaryModal: false
            }
        })
        toast.success("OK")

    }).catch(err => {
        toast.error("Xato")
    })
}
export const getTeacherSalaryAppAction = () => (dispatch) => {
    dispatch({
        api: getTeacherSalaryAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_GET_LIST_SALARY_SUCCESS,
            types.REQUEST_ERROR
        ]
    })
}
// FINISH TEACHER SALARY