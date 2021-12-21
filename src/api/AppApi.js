import HttpClient from "../utils/HttpClient";
import {api} from './api'


export const getAttendanceListAppApi = (data) => {
    return HttpClient.doGet(api.attendance +"/"+ data)
}
export const saveAttendanceAppApi = (data) => {
    return HttpClient.doPost(api.attendance, data)
}

//client
export const saveClientApi = (data) => {
    return HttpClient.doPost(api.client, data)
}
export const editClientApi = (data) => {
    return HttpClient.doPut(api.client + "/" + data.id, data)
}
export const deleteClientApi = (data) => {
    return HttpClient.doDelete(api.client + "/" + data.id)
}
export const getClientList = () => {
    return HttpClient.doGet(api.client)
}


// Room Start
export const saveRoomApi = (data) => {
    return HttpClient.doPost(api.room, data)
}
export const getRoomList = () => {
    return HttpClient.doGet(api.room)
}
export const editRoomApi = (data) => {
    return HttpClient.doPut(api.room + "/" + data.id, data)
}
export const deleteRoomApi = (data) => {
    return HttpClient.doDelete(api.room + "/" + data)
}
// Room End

// Cashback Start
export const saveCashbackApi = (data) => {
    return HttpClient.doPost(api.cashback, data)
}
export const getCashbackList = () => {
    return HttpClient.doGet(api.cashback)
}
export const editCashbackApi = (data) => {
    return HttpClient.doPut(api.cashback + "/" + data.id, data)
}
export const deleteCashbackApi = (data) => {
    return HttpClient.doDelete(api.cashback + "/" + data)
}
// Cashback End

// PayType
export const savePayTypeApi = (data) => {
    return HttpClient.doPost(api.payType, data)
}
export const getPayTypeList = () => {
    return HttpClient.doGet(api.payType)
}
export const editPayTypeApi = (data) => {
    return HttpClient.doPut(api.payType + "/" + data.id, data)
}
export const deletePayTypeApi = (data) => {
    return HttpClient.doDelete(api.payType + "/" + data)
}
// PayType End


//Reklama

export const saveReklamaApi = (data) => {
    console.log(data)
    return HttpClient.doPost(api.reklama, data)
}
export const editReklamaApi = (data) => {
    return HttpClient.doPut(api.reklama + "/" + data.id, data)
}
export const deleteReklamaApi = (data) => {
    console.log(data)
    return HttpClient.doDelete(api.reklama + "/" + data.id)
}
export const getReklamaApi = () => {
    return HttpClient.doGet(api.reklama)
}
export const getReklamaForSelectApi = () => {
    return HttpClient.doGet(api.reklama + "/select")
}
//START CLIENT STATUS
export const getClientStatusListApi = (data) => {
    if (data && data.type)
        return HttpClient.doGet(api.clientStatus + "/list?type=" + data.type)
}
export const saveClientStatusApi = (data) => {
    return HttpClient.doPost(api.clientStatus, data)
}
export const editClientStatusApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.clientStatus + "/" + data.id, data)
}
export const deleteClientStatusApi = (data) => {
    if (data && data.id)
        return HttpClient.doDelete(api.clientStatus + "/" + data.id)
}
//FINISH CLIENT STATUS
// START DURATION TYPE
export const saveDurationTypeApi = (data) => {
    return HttpClient.doPost(api.durationType, data)
}
export const editDurationTypeApi = (data) => {
    return HttpClient.doPut(api.durationType + "/" + data.id, data)
}
export const getDurationTypesApi = () => {
    return HttpClient.doGet(api.durationType)
}
export const deleteDurationTypeApi = (data) => {
    return HttpClient.doDelete(api.durationType + "/" + data.id)
}
// END DURATION TYPE

// START COURSE API
export const saveCourseApi = (data) => {
    return HttpClient.doPost(api.course, data)
}
export const editCourseApi = (data) => {
    return HttpClient.doPut(api.course + "/" + data.id, data)
}
export const getCoursesApi = (data) => {
    return HttpClient.doGet(api.course + (data && data.id ? "?categoryId=" + data.id : ""))
}
export const getCourseListForSelectApi = () => {
    return HttpClient.doGet(api.course);
}
export const getCourseApi = (data) => {
    return HttpClient.doGet(api.course + (data && data.id ? "/" + data.id : ""))
}
export const deleteCourseApi = (data) => {
    return HttpClient.doDelete(api.course + "/" + data.id)
}
// END COURSE API

// START REGION TYPE
export const saveRegionApi = (data) => {
    return HttpClient.doPost(api.region, data)
}
export const editRegionApi = (data) => {
    return HttpClient.doPut(api.region + "/" + data.id, data)
}
export const getRegionApi = () => {
    return HttpClient.doGet(api.region)
}
export const getRegionSearchApi = (data) => {
    return HttpClient.doGet(api.region + "/search?key=" + data.key)
}
export const deleteRegionApi = (data) => {
    return HttpClient.doDelete(api.region + "/" + data.id)
}
// END REGION
// START GROUP API
export const getGroupsApi = (data) => {
    return HttpClient.doGet(api.group + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}
export const getGroupsForSelectApi = () => {
    return HttpClient.doGet(api.group + "/select")
}
export const getGroupApi = (data) => {
    return HttpClient.doGet(api.group + (data && data.id ? "/" + data.id : ""))
}
export const getGroupStudentsApi = (data) => {
    return HttpClient.doGet(api.student + "/groupStudent/" + (data && data.id))
}
export const saveGroupApi = (data) => {
    return HttpClient.doPost(api.group, data)
}
export const changeStudentGroupStatusApi = (data) => {
    return HttpClient.doPatch(api.student + "/changeGroupStatus", data)
}
export const changeGroupToArchiveStatusApi = (data) => {
    return HttpClient.doPatch(api.group + "/changeToArchiveStatus", data)
}
export const changeGroupToActiveStatusApi = (data) => {
    return HttpClient.doPatch(api.group + "/changeToActiveStatus", data)
}
export const editGroupApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.group + "/" + data.id, data)
    else return null
}
export const deleteGroupApi = (data) => {
    return HttpClient.doDelete(api.group + "/" + data.id)
}
// FINISH GROUP API
//// For Profession

export const saveProfessionApi = (data) => {
    return HttpClient.doPost(api.profession, data)
}
export const editProfessionApi = (data) => {
    return HttpClient.doPut(api.profession + "/" + data.id, data)
}
export const getProfessionApi = () => {
    return HttpClient.doGet(api.profession + "/")
}
export const deleteProfessionsApi = (data) => {
    return HttpClient.doDelete(api.profession + "/" + data)
}


/// For Category Api
export const saveTestCategoryApi = (data) => {
    return HttpClient.doPost(api.testCategory, data)
}
export const editTestCategoryApi = (data) => {
    return HttpClient.doPut(api.testCategory + "/" + data.id, data)
}
export const getTestCategoryApi = () => {
    return HttpClient.doGet(api.testCategory + "/")
}
export const deleteTestCategoryApi = (data) => {
    return HttpClient.doDelete(api.testCategory + "/" + data)
}

// For Course Category

export const saveCourseCategoryApi = (data) => {
    return HttpClient.doPost(api.courseCategory, data)
}
export const editCourseCategoryApi = (data) => {
    return HttpClient.doPut(api.courseCategory + "/" + data.id, data)
}
export const getCourseCategoriesApi = (data) => {
    return HttpClient.doGet(api.courseCategory + (data && data.id ? "?id=" + data.id : ""))
}
export const getCourseCategoryApi = (data) => {
    return HttpClient.doGet(api.courseCategory + (data && data.id ? "/" + data.id : ""))
}
export const deleteCourseCategoryApi = (data) => {
    return HttpClient.doDelete(api.courseCategory + "/" + data.id)
}

// Start Trial Contact Type
export const saveTrialContactTypeApi = (data) => {
    return HttpClient.doPost(api.trialContactType, data)
}
export const editTrialContactTypeApi = (data) => {
    return HttpClient.doPut(api.trialContactType + "/" + data.id, data)
}
export const getTrialContactTypesApi = () => {
    return HttpClient.doGet(api.trialContactType)
}
export const deleteTrialContactTypeApi = (data) => {
    return HttpClient.doDelete(api.trialContactType + "/" + data.id)
}

// End Trial Contact Type

// Attachment CRUD Start
export const uploadFileAppApi = (data) => {
    return HttpClient.doPost(api.addAttachment, data);
};

export const getFileAppApi = (data) => {
    return HttpClient.doGet(api.getAttachment + "/" + data);
};
// Attachment CRUD End


// START STUDENT API
export const getDebtorsAPI = (data) => {
    return HttpClient.doGet(api.debtors)
}
export const saveStudentApi = (data) => {
    return HttpClient.doPost(api.student, data)
}
export const editStudentApi = (data) => {
    return HttpClient.doPut(api.student + "/" + data.id, data)
}
export const getStudentsApi = (data) => {
    return HttpClient.doGet(api.student + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}
export const getStudentByGroupApi = (data) => {
    return HttpClient.doGet(api.student + "/groupStudent/" + data)
}
export const getStudentApi = (data) => {
    return HttpClient.doGet(api.student + "/" + data.id)
}
export const deleteStudentApi = (data) => {
    return HttpClient.doDelete(api.student + "/" + data.id)
}
export const studentAddGroup = (data) => {
    return HttpClient.doPost(api.group + "/addStudent", data)
}
export const getStudentPaymentApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/" + data)
}
export const getStudentGroupsApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/studentGroup/" + data)
}

// FINISH STUDENT API

// START STUDENT PAYMENT API
export const saveStudentPaymentApi = (data) => {
    return HttpClient.doPost(api.studentPayment + "/" + data.studentId, data)
}
export const editStudentPaymentApi = (data) => {
    return HttpClient.doPut(api.studentPayment + "/" + data.id, data)
}
export const deleteStudentPaymentApi = (data) => {
    return HttpClient.doDelete(api.studentPayment + "/" + data.id)
}

export const getStudentPaymentListApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/list" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}
export const getStudentPaymentCashbacksApi = (data) => {
    return HttpClient.doGet(api.studentPayment + "/paymentCashbacks" + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}

// FINISH STUDENT PAYMENT API

// START TEACHER API
export const saveTeacherApi = (data) => {
    return HttpClient.doPost(api.teacher, data)
}
export const editTeacherApi = (data) => {
    return HttpClient.doPut(api.teacher + "/" + data.id, data)
}

export const getTeachersApi = (data) => {
    return HttpClient.doGet(api.teacher + (data && data.page != null && data.size ? "?page=" + data.page
        + "&size=" + data.size : ""))
}
export const getTeachersForSelectApi = () => {
    return HttpClient.doGet(api.teacher + "/select")
}
export const getTeacherApi = (data) => {
    return HttpClient.doGet(api.teacher + "/" + (data && data.id))
}
export const getTeacherGroupsApi = (data) => {
    return HttpClient.doGet(api.teacher + "/getGroups/" + (data && data.id))
}
export const deleteTeacherApi = (data) => {
    return HttpClient.doDelete(api.teacher + "/" + data.id)
}

// FINISH TEACHER API

export const editStudentStatusApi = (data) => {
    return HttpClient.doDelete(api.student + "/" + data.id, data)
}

// START APPEAL API
export const saveAppealApi = (data) => {
    return HttpClient.doPost(api.appeal, data)
}
export const changeAppealEnumTypeApi = (data) => {
    if (data && data.id)
        return HttpClient.doPut(api.appeal + "/changeType/" + data.id, data)
}
export const getAppealListByEnumTypeApi = (data) => {
    return HttpClient.doGet(api.appeal + "?enumType=" + data.enumType + "&page=" + data.page + "&size=" + data.size)
}
export const getOneAppealApi = (data) => {
    return HttpClient.doGet(api.appeal + "/" + data.id)
}
export const getAppealListByStatusTypeApi = (data) => {
    return HttpClient.doGet(api.appeal + "?enumType=" + data.enumType + "&typeId=" + data.typeId + "&page=" + data.page + "&size=" + data.size)
}
// FINISH APPEAL API

// START TOPLAM API
export const saveToplamApi = (data) => {
    return HttpClient.doPost(api.toplam, data)
}
export const editToplamApi = (data) => {
    return HttpClient.doGet(api.toplam + "/" + data.id, data)
}
export const getToplamListApi = (data) => {
    return HttpClient.doGet(api.toplam + "?page=" + data.page + "&size=" + data.size)
}
export const getToplamApi = (data) => {
    return HttpClient.doGet(api.toplam + "/" + data.id)
}
export const deleteToplamApi = (data) => {
    return HttpClient.doDelete(api.toplam + "/" + data.id)
}
export const getToplamListForSelectApi = () => {
    return HttpClient.doGet(api.toplam + "/select")
}
// FINISH TOPLAM API

// START TEACHER SALARY
export const giveSalaryApi = (data) => {
    return HttpClient.doPost(api.teacherSalary, data)
}
export const giveTeacherSalaryApi = (data) => {
    return HttpClient.doPost(api.salary + "/" +data.teacherId, data)
}
export const getTeacherSalaryApi = (data) => {
    return HttpClient.doGet(api.teacherSalary + "/" +data.id + "?page=" + data.page + "&size=" + data.size)
}
export const editTeacherSalaryApi = (data) => {
    return HttpClient.doPut(api.teacherSalary + "/" + data.id, data)
}

export const deleteTeacherSalaryApi = (data) => {
    return HttpClient.doDelete(api.teacherSalary + "/" + data);
}
export const getTeacherSalaryAppApi = () => {
    return HttpClient.doGet(api.teacherSalaryApi)
}
// FINISH TEACHER SALARY