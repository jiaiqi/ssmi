import Vue from 'vue'
import Router from 'vue-router'
import dzbl from '@/pages/dzbl'
import login from '@/pages/login'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/dzbl'
    },
    {
      path: '/dzbl',
      name: 'dzbl',
      component: dzbl,
      beforeEnter: (to, from, next) => {
        // ...
        let isLogin = sessionStorage.getItem("isLogin")
        if (isLogin) {
          next()
        } else {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: (to, from, next) => {
        sessionStorage.clear()
        next()
      }
    },
    {
      path: '/inHospitalClinicalPathway/:businessId', // 住院诊疗临床路径记录
      name: 'inHospitalClinicalPathway',
      component: () => import('../dialog/inHospitalClinicalPathway.vue'),
    },
    {
      path: '/inHospitalCost/:businessId', // 住院诊疗费用结算
      name: 'inHospitalCost',
      component: () => import('../dialog/inHospitalCost.vue'),
    },
    {
      path: '/inHospitalDiagnoseRecord/:seats/:businessId', //住院诊疗诊断记录
      name: 'inHospitalDiagnoseRecord',
      component: () => import('../dialog/inHospitalDiagnoseRecord.vue'),
    },
    {
      path: '/inHospitalDischargeRecord/:businessId',
      name: 'inHospitalDischargeRecord', // 住院诊疗出院记录
      component: () => import('../dialog/inHospitalDischargeRecord.vue'),
    },
    {
      path: '/inHospitalIndexCost/:businessId',
      name: 'inHospitalIndexCost', // 住院病案首页费用结算
      component: () => import('../dialog/inHospitalIndexCost.vue'),
    },
    {
      path: '/inHospitalIndexDiagnose/:businessId',
      name: 'inHospitalIndexDiagnose', // 住院病案首页诊断记录
      component: () => import('../dialog/inHospitalIndexDiagnose.vue'),
    },
    {
      path: '/inHospitalIndexEvaluation/:businessId',
      name: 'inHospitalIndexEvaluation', // 住院病案首页评估报告
      component: () => import('../dialog/inHospitalIndexEvaluation.vue'),
    },
    {
      path: '/inHospitalIndexOperation/:businessId',
      name: 'inHospitalIndexOperation', // 住院病案首页手术记录
      component: () => import('../dialog/inHospitalIndexOperation.vue'),
    },
    {
      path: '/inHospitalInspectionReport/:seats/:businessId',
      name: 'inHospitalInspectionReport', // 住院诊疗检查报告
      component: () => import('../dialog/inHospitalInspectionReport.vue'),
    },
    {
      path: '/inHospitalMedicalAdvice/:businessId',
      name: 'inHospitalMedicalAdvice', // 住院诊疗医嘱信息
      component: () => import('../dialog/inHospitalMedicalAdvice.vue'),
    },
    {
      path: '/inHospitalOperationNote/:businessId',
      name: 'inHospitalOperationNote', // 住院诊疗手术记录
      component: () => import('../dialog/inHospitalOperationNote.vue'),
    },
    {
      path: '/inHospitalSurveyReport/:seats/:businessId',
      name: 'inHospitalSurveyReport', // 住院诊疗检验报告
      component: () => import('../dialog/inHospitalSurveyReport.vue'),
    },
    {
      path: '/outpatientCost/:timeNum/:businessId',
      name: 'outpatientCost', // 门诊费用记录
      component: () => import('../dialog/outpatientCost.vue'),
    },
    {
      path: '/outpatientDiagnosticRecords/:businessId',
      name: 'outpatientDiagnosticRecords', // 门诊诊断记录
      component: () => import('../dialog/outpatientDiagnosticRecords.vue'),
    },
    {
      path: '/outpatientInspectionReport/:businessId',
      name: 'outpatientInspectionReport', // 门诊检查报告
      component: () => import('../dialog/outpatientInspectionReport.vue'),
    },
    {
      path: '/outpatientMedicalAdvice/:businessId',
      name: 'outpatientMedicalAdvice', // 门诊医嘱
      component: () => import('../dialog/outpatientMedicalAdvice.vue'),
    },
    {
      path: '/outpatientMedicalHistory/:businessId',
      name: 'outpatientMedicalHistory', // 门诊病历
      component: () => import('../dialog/outpatientMedicalHistory.vue'),
    },
    {
      path: '/outpatientOperationNote/:businessId',
      name: 'outpatientOperationNote', // 门诊诊手术记录
      component: () => import('../dialog/outpatientOperationNote.vue'),
    },
    {
      path: '/outpatientSurveyReport/:oddNum/:businessId',
      name: 'outpatientSurveyReport', // 门诊检验报告
      component: () => import('../dialog/outpatientSurveyReport.vue'),
    },

  ]
})
