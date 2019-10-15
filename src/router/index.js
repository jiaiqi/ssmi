import Vue from 'vue'
import Router from 'vue-router'
import dzbl from '@/pages/dzbl'
import login from '@/pages/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/dzbl'
    },
    {
      path: '/dzbl',
      name: 'dzbl',
      component: dzbl,
      beforeEnter: (to, from, next) => {
        // ...
        let isLogin = sessionStorage.getItem("isLogin")
        if(isLogin){
          next()
        }else{
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter:(to, from, next) => {
        sessionStorage.clear()
        next()
      }
    },
    {
      path: '/inHospitalClinicalPathway/:businessId',
      name: 'inHospitalClinicalPathway',
      component: () => import('../dialog/inHospitalClinicalPathway.vue'),
    },
    {
      path: '/inHospitalCost/:businessId',
      name: 'inHospitalCost',
      component: () => import('../dialog/inHospitalCost.vue'),
    },
    {
      path: '/inHospitalDiagnoseRecord/:businessId',
      name: 'inHospitalDiagnoseRecord',
      component: () => import('../dialog/inHospitalDiagnoseRecord.vue'),
    },
    {
      path: '/inHospitalDischargeRecord/:businessId',
      name: 'inHospitalDischargeRecord',
      component: () => import('../dialog/inHospitalDischargeRecord.vue'),
    },
    {
      path: '/inHospitalIndexCost/:businessId',
      name: 'inHospitalIndexCost',
      component: () => import('../dialog/inHospitalIndexCost.vue'),
    },
    {
      path: '/inHospitalIndexDiagnose/:businessId',
      name: 'inHospitalIndexDiagnose',
      component: () => import('../dialog/inHospitalIndexDiagnose.vue'),
    },
    {
      path: '/inHospitalIndexEvaluation/:businessId',
      name: 'inHospitalIndexEvaluation',
      component: () => import('../dialog/inHospitalIndexEvaluation.vue'),
    },
    {
      path: '/inHospitalIndexOperation/:businessId',
      name: 'inHospitalIndexOperation',
      component: () => import('../dialog/inHospitalIndexOperation.vue'),
    },
    {
      path: '/inHospitalInspectionReport/:businessId',
      name: 'inHospitalInspectionReport',
      component: () => import('../dialog/inHospitalInspectionReport.vue'),
    },
    {
      path: '/inHospitalMedicalAdvice/:businessId',
      name: 'inHospitalMedicalAdvice',
      component: () => import('../dialog/inHospitalMedicalAdvice.vue'),
    },
    {
      path: '/inHospitalOperationNote/:businessId',
      name: 'inHospitalOperationNote',
      component: () => import('../dialog/inHospitalOperationNote.vue'),
    },
    {
      path: '/inHospitalSurveyReport/:businessId',
      name: 'inHospitalSurveyReport',
      component: () => import('../dialog/inHospitalSurveyReport.vue'),
    },
    {
      path: '/outpatientCost/:businessId',
      name: 'outpatientCost',
      component: () => import('../dialog/outpatientCost.vue'),
    },
    {
      path: '/outpatientDiagnosticRecords/:businessId',
      name: 'outpatientDiagnosticRecords',
      component: () => import('../dialog/outpatientDiagnosticRecords.vue'),
    },
    {
      path: '/outpatientInspectionReport/:businessId',
      name: 'outpatientInspectionReport',
      component: () => import('../dialog/outpatientInspectionReport.vue'),
    },
    {
      path: '/outpatientMedicalAdvice/:businessId',
      name: 'outpatientMedicalAdvice',
      component: () => import('../dialog/outpatientMedicalAdvice.vue'),
    },
    {
      path: '/outpatientMedicalHistory/:businessId',
      name: 'outpatientMedicalHistory',
      component: () => import('../dialog/outpatientMedicalHistory.vue'),
    },
    {
      path: '/outpatientOperationNote/:businessId',
      name: 'outpatientOperationNote',
      component: () => import('../dialog/outpatientOperationNote.vue'),
    },
    {
      path: '/outpatientOperationNote/:businessId',
      name: 'outpatientOperationNote',
      component: () => import('../dialog/outpatientOperationNote.vue'),
    },

  ]
})
