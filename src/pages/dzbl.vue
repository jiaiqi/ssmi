<template>
  <div class="home">
    <header class="heade">
      <div class="header_item">
        <div class="header_img"></div>
        <div class="header_user_info">
          <div class="header_user_info_item">
            患者姓名：
            <span v-if="patientInfo.name">{{ patientInfo.name }}</span>
          </div>
          <div class="header_user_info_item">
            性别：
            <span v-if="patientInfo.gender">{{ patientInfo.gender }}</span>
          </div>
          <div class="header_user_info_item">
            年龄：
            <span v-if="patientInfo.age">{{ patientInfo.age }}</span>
          </div>
          <div class="header_user_info_item">
            身份证号：
            <span v-if="patientInfo.identityCard">{{ patientInfo.identityCard }}</span>
          </div>
        </div>
      </div>
      <div class="header_item">
        <div class="header_btn" @click="readCard()">
          <p class="text">重新</p>
          <p class="text">读卡</p>
        </div>
        <div class="header_btn" @click="goHomePage()">
          <p class="text">返回</p>
          <p class="text">首页</p>
        </div>
        <!-- <div class="header_btn">
          <p class="text">医生</p>
          <p class="text">服务</p>
        </div>-->
        <div class="header_btn" v-if="userInfo.user_no">
          <p class="text">
            账号:
            <span style="font-weight:600;">{{userInfo.user_no}}</span>
          </p>
        </div>
        <div class="header_btn" @click="exit_login">
          <p class="text">退出</p>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="content_left">
        <div class="content_left_top">
          <div class="content_left_top_item">
            <div class="block">
              <el-date-picker
                v-model="datePickVal"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="content_left_top_item">
            <select class="content_left_top_item_select" v-model="queryCondition.hospital">
              <option class="content_left_top_item_select_option">就诊医院</option>
              <option class="content_left_top_item_select_option" value="延安市中医医院">延安市中医医院</option>
              <option class="content_left_top_item_select_option" value="延安市宝塔区人民医院">延安市宝塔区人民医院</option>
              <option class="content_left_top_item_select_option" value="延安市延安大学附属医院">延安市延安大学附属医院</option>
              <option class="content_left_top_item_select_option" value="延安市博爱医院">延安市博爱医院</option>
              <option class="content_left_top_item_select_option" value="延安市博爱医院">延安市博爱医院</option>
              <option class="content_left_top_item_select_option" value="rmyy">延安市人民医院</option>
            </select>
          </div>
          <div class="content_left_top_item">
            <select class="content_left_top_item_select" v-model="queryCondition.type">
              <option class="content_left_top_item_select_option">就诊类别</option>
              <option class="content_left_top_item_select_option" value="C0001">门诊</option>
              <option class="content_left_top_item_select_option" value="C0002">住院</option>
            </select>
          </div>
          <div class="content_left_top_item">
            <select
              class="content_left_top_item_select"
              style="width:230px;"
              v-model="queryCondition.department"
            >
              <option class="content_left_top_item_select_option">就诊科室</option>
              <option class="content_left_top_item_select_option" value="A05">妇产科</option>
              <option class="content_left_top_item_select_option" value="A07">儿科</option>
              <option class="content_left_top_item_select_option" value="A12">口腔科</option>
              <option class="content_left_top_item_select_option" value="A03.01">呼吸内科</option>
              <option class="content_left_top_item_select_option" value="A20">急诊医学科</option>
              <option class="content_left_top_item_select_option" value="A03.02">消化内科</option>
              <option class="content_left_top_item_select_option" value="A03.03">神经内科</option>
              <option class="content_left_top_item_select_option" value="A03.04">心血管内科</option>
              <option class="content_left_top_item_select_option" value="A19">肿瘤科</option>
            </select>
            <div class="select-btn" @click="querySelector">查询</div>
          </div>
        </div>
        <div class="content_left_bottom">
          <el-timeline style="padding-inline-start: 10px;padding-top:10px;padding-left:10px;">
            <el-timeline-item
              v-for="(item, index) in timeLineData"
              :key="index"
              :icon="item.icon"
              :type="item.type"
              :color="item.color"
              :size="item.size"
              placement="top"
              :timestamp="item.dateTime"
            >
              <el-tree :data="item.data" :props="defaultProps" @node-click="addTab"></el-tree>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="content_right" v-loading="loading">
        <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab">
          <div class="close-all" @click="closeAll">关闭所有</div>
          <el-tab-pane
            v-for="(item,index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
            closable
          >
            <component
              :tabData="RigData"
              v-bind:is="item.content"
              :patientInfo="patientInfo"
              :elTabsData="elTabsData"
              :key="componentsKey"
            ></component>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          title
          :visible.sync="dialogVisible"
          width="500px"
          :before-close="handleClose"
          center
        >
          <div class="read_card">
            在下方输入身份证号
            <div class="id_card">
              <el-input v-model="id_card" style="width:200px;margin:20px 0 30px 0;"></el-input>
            </div>
            {{dialogText}}
            <div class="id_card">
              <!-- <el-input v-model="id_card" style="width:200px;margin-top:50px;"></el-input> -->
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button ref="sendMsg" @click="closeReadCard()">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import PatientOverView from "../components/hzzl"
import mjzZlbl from "../components/mjzzlbl";
import mjzZlfymx from "../components/mjzzlfymx";
import mjzZlyz from "../components/mjzzlyz";
import mjzZlzfyxx from "../components/mjzzlzfyxx";
import mzsHjl from "../components/mzshjl";
import zjzZlgh from "../components/zjzzlgh";
import mjzzljcbg from "../components/mjzzljcbg";
import zjzZljymxjl from "../components/zjzzljymxjl";
import zjzZlzdjl from "../components/zjzzlzdjl";
import zybAsyfyjl from "../components/zybasyfyjl";
import zybAsyjl from "../components/zybasyjl";
import zybAsypgbg from "../components/zybasypgbg";
import zybAsyzd from "../components/zybasyzd";
import zyzLcy from "../components/zyzlcy";
import zyzLfyjs from "../components/zyzlfyjs";
import zyzLfymxjl from "../components/zyzlfymxjl";
import zyzLjcbg from "../components/zyzljcbg";
import zyzLjymxjl from "../components/zyzljymxjl";
import zyzLlcljjl from "../components/zyzllcljjl";
import zyzLssjl from "../components/zyzlssjl";
import zyzlyz from "../components/zyzlyz";
import zyzLzdjlxx from "../components/zyzlzdjlxx";
import ryjl from '../components/ryjl'
import hospitalindex from '../components/inHospitalIndex'
import InspectionRecord from '../components/InspectionRecord'
// import axios from "axios";
import moment from 'moment'
export default {
  name: "home",
  components: { InspectionRecord, PatientOverView, hospitalindex, mjzZlbl, mjzZlfymx, mjzZlyz, mjzZlzfyxx, mzsHjl, zjzZlgh, mjzzljcbg, zjzZljymxjl, zjzZlzdjl, zybAsyfyjl, zybAsyjl, zybAsypgbg, zybAsyzd, zyzLcy, zyzLfyjs, zyzLfymxjl, zyzLjcbg, zyzLjymxjl, zyzLlcljjl, zyzLssjl, zyzlyz, zyzLzdjlxx, ryjl },
  data() {
    return {
      id_card: "612200194101051123",
      datePickVal: "",
      loading: false,
      userName: '',
      detail: "",
      componentsKey: 0,
      userInfo: {},
      timeLineData: [],
      patientInfo: {},
      dialogText: "点击确定按钮读卡",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dialogVisible: true,
      queryCondition: {
        startDate: "",
        endDate: "",
        hospital: "就诊医院",
        type: "就诊类别",
        department: "就诊科室"
      },
      personInfo: {},
      activities: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      RigData: [],
      elTabsData: {},
      editableTabs: [{
        title: "患者总览",
        name: "患者总览",
        content: PatientOverView
      }],
      editableTabsValue: "患者总览",
      tabIndex: 1,
      testData: [],
      showContent: false,
      needData: [],
      tabData: [],
    };
  },
  mounted() {
    let user = sessionStorage.getItem("current_login_user")
    this.userInfo = JSON.parse(user)
    window.ReadCommCardRet = (para) => {
      // alert("收到读卡返回信息： " + para);
      localStorage.setItem("CardInfo", para)
      let CardInfo = JSON.parse(para)
      window.CardInfo = CardInfo
      // alert("当前身份证号：" + CardInfo.id)

    }
    // let userInfo = sessionStorage.getItem("current_login_user")
    // userInfo = localStorage.getItem("current_login_user")
    // if (userInfo) {
    //   this.userInfo = JSON.parse(userInfo)
    // }
  },
  methods: {
    alertCardInfo() {
      // let CardInfo = JSON.stringify(window.CardInfo)
      let CardInfo = localStorage.getItem("CardInfo")
      alert(CardInfo)
    },
    addTab(data) {
      console.log(data)
      if (data.serviceName && data.BUSINESS_ID) {
        let req = {
          serviceName: data.serviceName,
          condition: [
            {
              colName: "BUSINESS_ID",
              ruleType: "eq",
              value: data.BUSINESS_ID
            },
            {
              colName: "HOSPITAL_NAME",
              ruleType: "eq",
              value: data.HOSPITAL_NAME
            }
          ]
        };
        let url = this.getServiceUrl("select", data.serviceName, "emr");
        this.axios({
          method: "POST",
          url: url,
          data: req,
          headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
        }).then(res => {
          let ser = req.serviceName
          if (ser === "DI_ADI_REGISTER_INFO_select") {
            ser = "mzghjl"
          } else if (ser === "DI_ADI_RECORD_INFO_select") {
            ser = "mzbl"
          } else if (ser === "DI_ADI_DIAREC_INFO_select") {
            ser = "mzzdjl"
          } else if (ser === "DI_ADI_DRUREC_INFO_select") {
            ser = "mzyz"
          } else if (ser === "DI_ADI_CLIEXA_INFO_select") {
            ser = "mzjcbg"
          } else if (ser === "DI_ADI_LAREXA_INFO_select") {
            ser = "mzjybg"
          } else if (ser === "DI_ADI_OPEREC_INFO_select") {
            ser = "mzssjl"
          } else if (ser === "DI_ADI_EXPSET_INFO_select") {
            ser = "mzfyjl"
          } else if (ser === "DI_HAI_APRNOT_INFO_MR_select") {
            ser = "zybasy"
          } else if (ser === "DI_HDI_INRECORD_INFO_select") {
            ser = "zyryjl"
          } else if (ser === "DI_HDI_DIAREC_INFO_select") {
            ser = "zyzdjl"
          } else if (ser === "DI_HDI_DRUREC_INFO_select") {
            ser = "zyyzxx"
          } else if (ser === "DI_HDI_CPATH_INFO_select") {
            ser = "zylclj"
          } else if (ser === "DI_HDI_CLIEXA_INFO_select") {
            ser = "zyjcbg"
          } else if (ser === "DI_HDI_LAREXA_INFO_select") {
            ser = "zyjybg"
          } else if (ser === "DI_HDI_OPEREC_INFO_select") {
            ser = "zyssjl"
          } else if (ser === "DI_HDI_OUTRECORD_INFO_select") {
            ser = "zycyjl"
          } else if (ser === "DI_HDI_EXPSET_INFO_select") {
            ser = "zyfyjl"
          }
          this.elTabsData[ser] = res.data.data
          this.RigData = res.data.data;
          // console.log("selectedtabData", this.elTabsData);
        }).catch(err => {
          console.log(err);
        });
        let exists = this.editableTabs.filter(tab => tab.name === data.tab).length > 0; // 过滤已存在tab
        if (!exists) {
          this.editableTabs.push({
            title: data.tab,
            name: data.tab,
            content: data.component
          });
        }
        this.editableTabsValue = data.tab;
        this.dataState = !this.dataState

      } else if (data.tab == "入院记录") {
        let exists = this.editableTabs.filter(tab => tab.name === data.tab).length > 0; // 过滤已存在tab,
        if (!exists) { // 若当前点击item对应的tab页不存在，则创建（push）对应的tab页
          this.editableTabs.push({
            title: data.tab,
            name: data.tab,
            content: data.component,
            serviceName: data.serviceName
          });

        }
        this.editableTabsValue = data.tab;
        this.dataState = !this.dataState
      }
      ++this.componentsKey
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    exit_login() {
      localStorage.setItem("current_login_user", "")
      this.$router.push({ name: "login" })
    },
    closeAll() {
      this.editableTabsValue = '患者总览'
      this.editableTabs = this.editableTabs.slice(0, 1)
    },
    initData(cod) {
      this.timeLineData = [];
      let req = {
        serviceName: "srvdi_electronic_medical_record_select",
        condition: [
          {
            colName: "HOSPITAL_NAME",
            value: "",
            ruleType: "eq"
          },
          {
            colName: "BUSINESS_ACTIVE_TYPE",
            value: "",
            ruleType: "eq"
          },
          {
            colName: "type",
            value: "",
            ruleType: "eq"
          },
          {
            colName: "CERT_NUMBER",
            value: this.id_card,
            ruleType: "eq"
          }
        ]
      };
      if (cod) {
        if (cod.hospital) {
          req.condition[0].value = cod.hospital;
        }
        if (cod.type) {
          req.condition[1].value = cod.type;
        }
        if (cod.department) {
          req.condition[2].colName = "DE08_10_025_00";
          req.condition[2].value = cod.department;
        }
      }
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      this.axios({
        method: "POST",
        headers: {
          bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket")
        },
        url: url,
        data: req
      })
        .then(res => {
          let data = res.data.data;
          if (!data.length > 0) {
            this.loading = true
          }
          if (data && data.length > 0) {
            this.loading = false
            let arr = []
            data.map(item => {
              let timeLineData = {}
              timeLineData.data = []
              timeLineData.dateTime = item.dateTime
              timeLineData.size = "large"
              timeLineData.type = "primary"
              item.data.map(item2 => {
                let label = item2.data.label
                if (item2.data.typeCode === "C0001") {
                  let count = {
                    "病历": item2.data.RECORD_INFO_COUNT,
                    "诊断记录": item2.data.DIAREC_INFO_COUNT,
                    "检查报告": item2.data.CLIEXA_INFO_COUNT,
                    "医嘱": item2.data.DRUREC_INFO_COUNT,
                    "费用记录": item2.data.EXPSET_INFO_COUNT,
                    "检验报告": item2.data.LAREXA_INFO_COUNT,
                    "手术记录": item2.data.OPEREC_INFO_COUNT,
                  }
                  timeLineData.data.push(
                    {
                      label: label,
                      children: [
                        {
                          label: "挂号记录",
                          tab: "挂号记录",
                          serviceName: "DI_ADI_REGISTER_INFO_select",
                          component: "zjzZlgh",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "病历" + "(" + count.病历 + ")",
                          tab: "病历",
                          serviceName: "DI_ADI_RECORD_INFO_select",
                          component: "mjzZlbl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "诊断记录" + "(" + count.诊断记录 + ")",
                          tab: "诊断记录",
                          serviceName: "DI_ADI_DIAREC_INFO_select",
                          component: "zjzZlzdjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "医嘱" + "(" + count.医嘱 + ")",
                          tab: "医嘱",
                          serviceName: "DI_ADI_DRUREC_INFO_select",
                          component: "mjzZlyz",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "检查报告" + "(" + count.检查报告 + ")",
                          tab: "门诊检查报告",
                          serviceName: "DI_ADI_CLIEXA_INFO_select",
                          component: "mjzzljcbg",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "检验报告" + "(" + count.检验报告 + ")",
                          tab: "检验报告",
                          serviceName: "DI_ADI_LAREXA_INFO_select",
                          component: "zjzZljymxjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "手术记录" + "(" + count.手术记录 + ")",
                          tab: "门诊手术记录",
                          serviceName: "DI_ADI_OPEREC_INFO_select",
                          component: "mzsHjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "费用记录",
                          tab: "费用记录",
                          serviceName: "DI_ADI_EXPSET_INFO_select",
                          component: "mjzZlfymx",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        }
                      ]

                    }
                  )
                }
                else if (item2.data.typeCode === "C0002") {
                  let count = {
                    "住院病案首页": item2.data.APRNOT_INFO_MR_COUNT,
                    "检验报告": item2.data.LAREXA_INFO_COUNT,
                    "费用记录": item2.data.EXPSET_INFO_COUNT,
                    "临床路径记录": item2.data.CPATH_INFO_COUNT,
                    "住院检查报告": item2.data.CLIEXA_INFO_COUNT,
                    "出院记录": item2.data.OUTRECORD_INFO_COUNT,
                    "手术记录": item2.data.OPEREC_INFO_COUNT,
                    "医嘱": item2.data.DRUREC_INFO_COUNT,
                    "诊断记录": item2.data.DIAREC_INFO_COUNT,
                  }
                  timeLineData.data.push(
                    {
                      label: label,
                      children: [
                        {
                          label: "住院病案首页",
                          tab: "住院病案首页",
                          serviceName: "DI_HAI_APRNOT_INFO_MR_select",
                          component: "hospitalindex",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "入院记录",
                          tab: "入院记录",
                          serviceName: "DI_HDI_INRECORD_INFO_select",
                          component: "ryjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "诊断记录" + "(" + count.诊断记录 + ")",
                          tab: "住院诊断记录",
                          serviceName: "DI_HDI_DIAREC_INFO_select",
                          component: "zyzLzdjlxx",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "医嘱信息" + "(" + count.医嘱 + ")",
                          tab: "住院医嘱信息",
                          serviceName: "DI_HDI_DRUREC_INFO_select",
                          component: "zyzlyz",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "临床路径记录表" + "(" + count.临床路径记录 + ")",
                          tab: "临床路径记录表",
                          serviceName: "DI_HDI_CPATH_INFO_select",
                          component: "zyzLlcljjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "检查报告表" + "(" + count.住院检查报告 + ")",
                          tab: "住院检查报告",
                          serviceName: "DI_HDI_CLIEXA_INFO_select",
                          component: "zyzLjcbg",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "检验报告" + "(" + count.检验报告 + ")",
                          tab: "住院检验报告",
                          serviceName: "DI_HDI_LAREXA_INFO_select",
                          component: "InspectionRecord",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "手术记录" + "(" + count.手术记录 + ")",
                          tab: "住院手术记录",
                          serviceName: "DI_HDI_OPEREC_INFO_select",
                          component: "zyzLssjl",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "出院记录" + "(" + count.出院记录 + ")",
                          tab: "出院记录",
                          serviceName: "DI_HDI_OUTRECORD_INFO_select",
                          component: "zyzLcy",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        },
                        {
                          label: "费用结算",
                          tab: "住院费用结算",
                          serviceName: "DI_HDI_EXPSET_INFO_select",
                          component: "zyzLfyjs",
                          BUSINESS_ID: item2.data.BUSINESS_ID,
                          HOSPITAL_NAME: item2.data.HOSPITAL_NAME
                        }
                      ]

                    }
                  )
                }
              })
              arr.push(timeLineData)
            })
            this.timeLineData = arr
            // console.log("timeLineData", this.timeLineData);
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    toManangerment() {
      let str = window.location.href;
      let num = str.indexOf("?");
      str = str.substr(num + 1);
      window.location.href = "../../main/index.html";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(err => {
          console.log(err);
        });
    },
    readCard() {
      this.editableTabsValue = "患者总览";
      this.patientInfo = {};
      this.timeLineData = [];
      this.dialogVisible = true;
    },
    closeReadCard() {
      this.BtnReadCard();
      if (window.CardInfo) {
        if (this.userInfo.user_no && window.CardInfo.id) {
          this.dialogText = "当前读取到的身份证号为：\n" + window.CardInfo.id
          setTimeout(() => {
            this.dialogText = "点击确定按钮读卡"
          }, 3000);
        }
        else {
          this.dialogText = "没有读取到身份证信息"
          setTimeout(() => {
            this.dialogText = "点击确定按钮读卡"
          }, 3000);
          return
        }
      }
      // else {
      //   this.dialogText = "没有读取到身份证信息"
      //   setTimeout(() => {
      //     this.dialogText = "点击确定按钮读卡"
      //   }, 3000);
      //   // return
      // }
      setTimeout(() => {
        this.dialogVisible = false;
        this.getData();
        this.initData();
      }, 2000);
      // alert("即将展示身份证号为：" + this.id_card + "的患者的病历信息")
    },
    getData() {
      this.patientInfo = {
        name: "",
        gender: "",
        age: "",
        identityCard: this.id_card,
        profession: "",
        familyAddress: "",
        contact: "",
        LOCAL_ID: ""
      };
      // 根据身份证号查找证件信息及LOCAL_ID
      let req = {
        serviceName: "DI_MPI_CERT_REGISTERINFO_select",
        condition: [
          {
            colName: "CERT_NUMBER",
            ruleType: "eq",
            value: this.id_card
          }
        ]
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      this.axios({
        method: "POST",
        headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") },
        url: url,
        data: req
      }).then(res => {
        if (res.data.resultCode === "0011") {
          this.$router.push({ name: "login" });
          console.log(res.data.resultCode);
        }
        if (res.data.data[0]) {
          this.patientInfo.LOCAL_ID = res.data.data[0].LOCAL_ID
          // 根据localid查找基本信息
          let req2 = {
            hisVer: true,
            "serviceName": "DI_MPI_REGISTERINFO_select",
            "condition": [
              {
                "colName": "LOCAL_ID",
                "ruleType": "eq",
                "value": this.patientInfo.LOCAL_ID
              }
            ],
          };
          let url2 = this.getServiceUrl("select", req2.serviceName, "emr");
          this.axios({
            method: "POST",
            headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") },
            url: url2,
            data: req2
          }).then(res => {
            let data = res.data.data[0]
            console.log("基本信息：", data);
            this.patientInfo.name = data.NAME
            this.patientInfo.gender = data.SEX_NAME
            let birth = data.BIRTHDAY.toString().slice(0, 4)
            birth = new Date(birth).getFullYear();
            let today = new Date().getFullYear();
            let age = today - birth
            this.patientInfo.age = age
            console.log(age)
          }).catch(err => {
            console.log(err);
          });
          // // 根据local_id 查找居住信息
          // let req3 = {
          //   hisVer: true,
          //   "serviceName": "DI_MPI_ADDRESS_select",
          //   "condition": [
          //     {
          //       "colName": "LOCAL_ID",
          //       "ruleType": "eq",
          //       "value": this.patientInfo.LOCAL_ID
          //     }
          //   ],
          // };
          // let url3 = this.getServiceUrl("select", req3.serviceName, "emr");
          // this.axios({
          //   method: "POST",
          //   url: url3,
          //   data: req3
          // }).then(res3 => {
          //   // console.log(res3)
          //   let data = res.data.data[0]
          //   this.patientInfo.detailAddress = data.DETAIL
          // }).catch(err3 => {
          //   console.log(err3)
          // })
        }

      }).catch(err => {
        console.log(err);
      });
    },
    goHomePage() {
      console.log("返回首页");
      window.location.reload();
    },
    ReadCommCardRet(para) {
      alert("收到读卡返回信息 " + para);
    },
    BtnReadCard() {
      this.dialogText = "读卡中..."
      setTimeout(() => {
        this.dialogText = "点击确定按钮读卡"
      }, 3000);
      if (typeof jsObj == "undefined") {
        // alert("jsObj参数未初始化")
        this.dialogText = "jsObj参数未初始化"
        return;
      }
      jsObj.ReadCommCard();
      // this.dialogVisible = false;
    },
    BtnClickArgs() {
      if (typeof jsObj == "undefined") {
        alert("jsObj参数未初始化")
        return;
      }
      jsObj.ShowTestArg("xxx");
    },
    querySelector() {
      let condition = {
        hospital: this.queryCondition.hospital,
        type: this.queryCondition.type,
        department: this.queryCondition.department
      };
      if (this.queryCondition.hospital === "就诊医院") {
        condition.hospital = "";
      }
      if (this.queryCondition.type === "就诊类别") {
        condition.type = "";
      }
      if (this.queryCondition.department === "就诊科室") {
        condition.department = "";
      }
      this.timeLineData = [];
      this.initData(condition);
      console.log(condition);
    },
    removeTab(targetName) {
      // console.log("关闭标签页" + targetName);
      if (targetName === "患者总览") {
        alert("不可关闭！")
        return
      }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
            this.editableTabsValue = activeName;
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  created() {
    this.readCard();
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  background-color: rgba(238, 238, 238, 1);
  background-image: none;
  position: relative;
  left: 0;
  width: 100%;
  min-width: 1361px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.el-timeline-item .el-timeline-item__wrapper {
  padding-left: 15px !important;
}

.el-timeline-item__timestamp {
  padding-left: 10px;
}

.el-date-editor.el-input__inner {
  width: 240px;
}

.el-date-editor--daterange.el-input__inner {
  width: 240px;
}

.el-select {
  display: block;
  width: 100%;
}

.el-select .el-input__inner {
  width: 100%;
  height: 32px;
  display: block;
  box-sizing: border-box;
}

.el-timeline-item {
  text-align: left;
}

.el-timeline-item__timestamp {
  padding-left: 10px;
}

.block .el-date-editor.el-input__inner {
  width: 325px;
  height: 37px;
}

.el-tabs--border-card {
  // height: 545px;
  height: 100%;
}

.el-tabs--border-card /deep/ .el-tabs__content {
  overflow: visible;
}

.el-timeline-item__wrapper .el-timeline-item__timestamp {
  color: #575858;
  line-height: 1;
  font-weight: 600;
  font-size: 14px;
}

.el-tree-node__content .el-tree-node__label {
  font-size: 13px;
}
.el-timeline-item__wrapper {
  position: relative;
  padding-left: 15px !important;
  top: -3px;
  .el-tree-node__content {
    padding-left: 0 !important;
  }
}
.el-tabs__nav-scroll .el-tabs__nav /deep/#tab-患者总览 span {
  display: none !important;
}
.home {
  width: 1500px;
  margin: 0 auto;
}
/* header */
.heade {
  width: 100%;
  margin: 0 auto;
  display: flex;
  // height: 80px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  color: #333;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}

.header_item {
  height: 100%;
  display: flex;
  width: auto;
  color: #333;
}

.header_img {
  width: 240px;
  display: block;
  box-sizing: border-box;
  border: 1px #666 solid;
}

.header_user_info {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
}

.header_user_info .header_user_info_item {
  font-weight: 600;
  font-size: 14px;
  min-width: 30%;
  height: 30px;
  line-height: 30px;
}

.header_user_info .user {
  font-weight: 100;
  font-size: 14px;
}

.header_btn {
  width: 116px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: inherit;
  background-color: rgba(238, 238, 238, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(41, 179, 231, 1);
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.header_btn:nth-child(2) {
  border-color: rgba(228, 228, 228, 1);
}

/* content */

.content {
  /* height: 550px; */
  height: 700px;
  margin-top: 10px;
  box-sizing: border-box;
}

.content_left {
  box-sizing: border-box;
  width: 325px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  float: left;
}

.content_left_top {
  margin: 0 auto;
  box-sizing: border-box;
}

select {
  border: none;
}

.content_left_top_item {
  width: 325px;
  margin-bottom: 10px;
}

.content_left_top_item:first-child {
  background-color: transparent;
  display: flex;
  box-sizing: border-box;
  border: none;
  align-items: center;
  font-size: 12px;
}

.content_left_top_item:first-child .text {
  padding: 5px;
  box-sizing: border-box;
}

.content_left_top_item:last-child {
  display: flex;
  background-color: transparent;
  justify-content: space-between;
}

.select-btn {
  width: 83px;
  height: 32px;
  line-height: 37px;
  box-sizing: border-box;
  border: 1px solid rgba(127, 127, 127, 1);
  border-radius: 5px;
  box-shadow: none;
  font-size: 12px;
  color: #7f7f7f;
  cursor: pointer;
  text-align: center;
}

.content_left_top_item_select {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  color: #7f7f7f;
  font-size: 12px;
}

.content_left_top_item_date {
  display: inline-block;
  box-sizing: border-box;
  width: 109px;
  height: 37px;
  border-color: rgba(238, 238, 238, 1);
  background-color: #fff;
  border-color: transparent;
}

.content_left_bottom {
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #fff;
  width: 325px;
  border: 1px solid rgba(228, 228, 228, 1);
  height: 500px;
  overflow-y: auto;
}

.content_right {
  box-sizing: border-box;
  width: 1155px;
  float: left;
  height: 100%;
}

.read_card {
  min-height: 100px;
  text-align: center;
  // line-height: 100px;
  font-weight: 600;
  font-size: 20px;
}
// .close {
//   display: none;
// }
.close-all {
  position: absolute;
  top: -40px;
  right: 0px;
  cursor: pointer;
  font-size: 14px;
  height: 38px;
  font-weight: 600;
  line-height: 38px;
  width: 80px;
  text-align: center;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  border: 1px solid #eee;
  z-index: 999;
}
table {
  width: 80%;
  border-spacing: 0px;
  border-collapse: collapse;
  margin: 0 auto;
  td {
    min-width: 30px;
    height: 30px;
    text-align: center;
    padding: 0 10px;
    white-space: nowrap;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    color: #7f7f7f;
    &.handle {
      cursor: pointer;
      color: blue;
    }
  }
}
.text {
  margin: 0;
  padding: 0;
}
html {
  width: 100%;
  height: 100%;
  background-color: rgba(238, 238, 238, 1);
}
.title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
}
</style>
