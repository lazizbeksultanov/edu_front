import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/StoreUtils";
import {toast} from "react-toastify";

const initState = {
    loading: false,
    durationTypes: [],
    secondPage: false,
    showModal: false,
    showModal1: false,
    showChangeModal: false,
    debtorsModal:false,
    deleteModal: false,
    profession: [],
    regions: [],
    students: [],
    groups: [],
    testCategory: [],
    reklamas: [],
    courseCategories: [],
    searchItems: [],
    getItems: [],
    size: 20,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    parentItems: [],
    readModal: false,
    showAddGroupModal: false,
    changeStatusModal: false,
    spec: [],
    attachmentId: '',
    arr: [{id: 1, values: []}],
    teachers: [],
    teacherDto: [],
    userDto: [],
    specialization: [],
    specializationDto: [],
    currentItem: [],
    studentPayment: [],
    selectGroups: [],
    selectClients: [],
    currentPage: 'REQUEST',
    getClientStatusList: [],
    appealList: [],
    toplamList: [],
    cashbacks : [],
    selectDebtors: [],
    studentPayments :[],
    studentPaymentCashbaks :[],
    teacherSalaryAppApi: [],
    attendanceList : []
};

const reducers = {
    [types.REQUEST_START](state) {
    },
    [types.REQUEST_ERROR](state) {
    },
    [types.REQUEST_SUCCESS](state) {
        state.loading = false
        state.showModal = false
        state.deleteModal = false
        state.changeToArchiveModal = false
        state.changeToActiveModal = false
    },

    [types.REQUEST_GET_DEBTORS_SUCCESS](state, payload) {
            state.selectDebtors = payload.payload.object.object
    },


    [types.REQUEST_GET_CLIENT_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object
    },
    //Client
    [types.REQUEST_GET_CLIENT_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.selectClients = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
    },
    [types.REQUEST_SAVE_CLIENT_SUCCESS](state, payload) {
        state.showModal = false
    },
    // START CLIENT STATUS REDUCERS
    [types.REQUEST_SAVE_CLIENT_STATUS_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_CLIENT_STATUS_LIST_SUCCESS](state, payload) {
        state.clientStatusList = payload.payload.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },
    [types.REQUEST_GET_CLIENT_STATUS_LIST_FOR_SELECT_SUCCESS](state, payload) {
        state.selectItems = payload.payload.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // FINISH CLIENT STATUS REDUCER
    // Room
    [types.REQUEST_GET_ROOM_SUCCESS](state, payload) {
        state.rooms = payload.payload.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },
    [types.REQUEST_SAVE_ROOM_SUCCESS](state, payload) {
        state.showModal = false
    },
    // Cashback
    [types.REQUEST_GET_CASHBACK_SUCCESS](state, payload) {
        state.cashbacks = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },
    [types.REQUEST_SAVE_CASHBACK_SUCCESS](state, payload) {
        state.showModal = false
    },

    // PayType
    [types.REQUEST_GET_PAYTYPE_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.payTypes = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
    },
    [types.REQUEST_SAVE_PAYTYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    // PayType End

    // Duration Type
    [types.REQUEST_SAVE_DURATION_TYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_DURATION_TYPE_SUCCESS](state, payload) {
        state.durationTypes = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // START GROUPS REDUCERS
    [types.REQUEST_SAVE_GROUP_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_GROUP_STUDENTS_SUCCESS](state, payload) {
        state.students = payload.payload.object
    },
    [types.REQUEST_GET_GROUP_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object

    },
    [types.REQUEST_GET_GROUPS_FOR_SELECT_SUCCESS](state, payload) {
        let groupsForSelect = payload.payload.object
        let ketmon = []
        for (let i = 0; i < groupsForSelect.length; i++) {
            ketmon.push({value: groupsForSelect[i].id, label: groupsForSelect[i].name})
        }
        state.getItems = ketmon
    },
    [types.REQUEST_GET_GROUPS_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.groups = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },
    // FINISH GROUPS REDUCERS
    //region
    [types.REQUEST_SAVE_REGION_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_SEARCH_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object)
            state.searchItems = payload.payload.object;
    },

    // Region
    [types.REQUEST_SAVE_REGION_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_SEARCH_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object)
            state.searchItems = payload.payload.object;
    },
    [types.REQUEST_GET_REGION_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.regions = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            let ketmon = []
            for (let i = 0; i < state.regions.length; i++) {
                ketmon.push({value: state.regions[i].id, label: state.regions[i].name})
            }
            state.selectItems = ketmon
        }
    },

    // //teacher
    // [types.REQUEST_GET_TEACHER_SUCCESS](state, payload) {
    //     if (payload && payload.payload && payload.payload.object) {
    //         state.teachers = payload.payload.object.object.sort((a, b) =>
    //             a.id > b.id ? 1 : b.id > a.id ? -1 : 0
    //         );
    //         let ketmon = []
    //         for (let i = 0; i < state.teachers.length; i++) {
    //             ketmon.push({value: state.teachers[i].id, label: state.teachers[i].name})
    //         }
    //         state.selectItems = ketmon
    //     }
    // },
    // [types.REQUEST_SAVE_TEACHER_SUCCESS](state, payload) {
    //     state.showModal = false
    // },

    //specialized
    //reklama
    [types.REQUEST_SAVE_REKLAMA_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_REKLAMA_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.reklamas = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0);
        }
    },
    //testCategory

    // Profession
    [types.REQUEST_SAVE_PROFESSION_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_PROFESSION_SUCCESS](state, payload) {
        state.profession = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Test Cateogry

    [types.REQUEST_SAVE_TEST_CATEGORY_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_TEST_CATEGORY_SUCCESS](state, payload) {
        state.testCategory = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    // Course

    [types.REQUEST_SAVE_COURSE_SUCCESS](state, payload) {
        state.showModal = false;
    },
    [types.REQUEST_GET_COURSES_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.length > 0) {
            state.getItems = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        } else {
            state.getItems = ""
        }


    },
    [types.REQUEST_GET_COURSE_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.currentItem = payload.payload.object
        }

    },

    // Course Cateogry
    [types.REQUEST_SAVE_COURSE_CATEGORY_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_COURSE_CATEGORIES_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.courseCategories = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
        }
    },
    [types.REQUEST_GET_COURSE_CATEGORY_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            state.currentItem = payload.payload.object
        }
    },


    // Trail Contact Type
    [types.REQUEST_SAVE_TRIAL_CONTACT_TYPE_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_TRIAL_CONTACT_TYPE_SUCCESS](state, payload) {
        state.trialContactType = payload.payload.object.object.sort((a, b) =>
            a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
    },

    //// Teacher

    [types.REQUEST_SAVE_TEACHER_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_TEACHER_GROUPS_SUCCESS](state, payload) {
        state.groups = payload.payload.object
    },
    [types.REQUEST_GET_TEACHER_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object
    },
    [types.REQUEST_GET_TEACHERS_FOR_SELECT_SUCCESS](state, payload) {
        let teacherList = payload.payload.object
        let teachersList = []
        for (let i = 0; i < teacherList.length; i++) {
            teachersList.push({id: teacherList[i].uuid, name: teacherList[i].name})
        }
        state.teachers = teachersList
    },
    [types.REQUEST_GET_TEACHERS_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.teachers = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },
    // START STUDENTS REDUCERS
    [types.REQUEST_SAVE_STUDENT_SUCCESS](state, payload) {
        state.showModal = false
    },
    [types.REQUEST_GET_STUDENT_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object
    },
    [types.REQUEST_GET_STUDENTS_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.students = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
        console.clear()
        console.log(payload)
    },
    /// StudentPayment
    [types.REQUEST_GET_STUDENT_PAYMENT_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            console.log(payload)
            state.studentPayment = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },

    [types.REQUEST_SAVE_STUDENT_PAYMENT_LIST_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.studentPayments = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },
    [types.REQUEST_GET_STUDENT_PAYMENT_CASHBACKS_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.studentPaymentCashbaks = payload.payload.object.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },

    // START APPEAL REDUCERS
    [types.REQUEST_SAVE_APPEAL_SUCCESS](state, payload) {
        state.showModal = false
        state.showChangeModal = false
    },
    [types.REQUEST_GET_APPEAL_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object
    },
    [types.REQUEST_GET_APPEAL_LIST_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.appealList = payload.payload.object.object
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },
    // FINISH APPEAL REDUCERS
    // START TOPLAM REDUCERS
    [types.REQUEST_SAVE_TOPLAM_SUCCESS](state, payload) {
        state.showModal = false
        state.showChangeModal = false
    },
    [types.REQUEST_GET_TOPLAM_SUCCESS](state, payload) {
        state.currentItem = payload.payload.object
    },
    [types.REQUEST_GET_TOPLAM_LIST_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object.object) {
            state.toplamList = payload.payload.object.object
            state.page = payload.payload.object.number
            state.size = payload.payload.object.size
            state.totalElements = payload.payload.object.totalElements
            state.totalPages = payload.payload.object.totalPages
        }
    },
    [types.REQUEST_GET_TOPLAM_FOR_SELECT_LIST_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object) {
            let currentToplam = payload.payload.object
            state.toplamList = payload.payload.object
            let toplamList = []
            for (let i = 0; i < currentToplam.length; i++) {
                toplamList.push({
                    id: currentToplam[i].id,
                    name:
                        currentToplam[i].name + " (" + currentToplam[i].courseName + ")"
                })
            }
            state.selectItems = toplamList
        }
    },
    // FINISH TOPLAM REDUCERS

    // START TEACHER SALARY
    [types.REQUEST_GIVE_SALARY_SUCCESS](state, payload) {
        state.showOpenSalaryModal = false;
    },
    [types.REQUEST_SAVE_TEACHER_SALARY_SUCCESS](state, payload) {
        state.showOpenSalaryModal1 = false;
    },
    // FINISH TEACHER SALARY

    [types.REQUEST_SAVE_STUDENT_PAYMENT_SUCCESS](state, payload) {
        state.showModal1 = false;
        state.showPaymentEditModal = false;
        state.showPaymentEditModal1 = false;
        state.showPaymentModal = false;
        state.showModal = false;
    },
    [types.REQUEST_GET_STUDENT_GROUPS_SUCCESS](state, payload) {
        if (payload && payload.payload && payload.payload.object && payload.payload.object) {
            state.studentGroups = payload.payload.object.sort((a, b) =>
                a.id > b.id ? 1 : b.id > a.id ? -1 : 0
            );
            let ketmon = []
            for (let i = 0; i < state.studentGroups.length; i++) {
                ketmon.push({value: state.studentGroups[i].id, label: state.studentGroups[i].name})
            }
            state.selectGroups = ketmon
        }
    },
    [types.REQUEST_GET_LIST_SALARY_SUCCESS](state, payload) {
        state.teacherSalaryAppApi = null
        state.teacherSalaryAppApi = payload.payload.object.object
    },
    [types.REQUEST_GET_STUDENTS_BY_GROUP_SUCCESS](state, payload) {
        state.students = payload.payload.object
    },
    [types.REQUEST_GET_ATTENDANCE_SUCCESS](state, payload) {
        state.attendanceList = payload.payload.object
    },


    // Attachment
    [types.REQUEST_ATTACHMENT_SUCCESS](state, payload) {
        state.attachmentId = payload
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};
export default createReducer(initState, reducers);
