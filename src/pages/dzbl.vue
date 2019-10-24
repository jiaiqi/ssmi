<template>
  <div class="home" @click="hideAccountInfo">
    <header class="heade">
      <div class="header_item">
        <div class="header_img">
          <div class="hospital_name">延安市中医医院</div>
        </div>
        <div class="header_user_info">
          <div class="header_user_info_item">
            患者姓名:
            <span v-if="patientInfo.name">{{ patientInfo.name }}</span>
          </div>
          <div class="header_user_info_item">
            性别:
            <span v-if="patientInfo.sex">{{ patientInfo.sex }}</span>
          </div>
          <div class="header_user_info_item">
            年龄:
            <span v-if="patientInfo.age">{{ patientInfo.age }}</span>
          </div>
          <div class="header_user_info_item">
            身份证号:
            <span v-if="patientInfo.identityCard">{{ patientInfo.identityCard }}</span>
          </div>
        </div>
      </div>
      <div class="header_item">
        <div class="header_btn" @click="readCard()">
          <p class="text">读卡</p>
        </div>
        <div class="account_box" @click.stop="changeAccountVisible">
          <div class="account_info" v-if="showAccount">
            <div class="account_info_item">
              <span class="text">账号:</span>
              <span style="font-weight:600;">{{userInfo.user_no}}</span>
            </div>
            <div class="account_info_item" @click="exit_login">退出登录</div>
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="content_left">
        <div class="content_left_top">
          <!-- <div class="content_left_top_item">
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
          </div>-->
          <div class="content_left_top_item">
            <select class="content_left_top_item_select" v-model="queryCondition.hospital">
              <option class="content_left_top_item_select_option">就诊医院</option>
              <option class="content_left_top_item_select_option" value="zyyy">延安市中医医院</option>
              <option class="content_left_top_item_select_option" value="rmyy">延安市人民医院</option>
              <option class="content_left_top_item_select_option" value="ydfy">延安大学附属医院</option>
              <option class="content_left_top_item_select_option" value="bayy">延安市博爱医院</option>
              <option class="content_left_top_item_select_option" value="fybjyy">延安市妇幼医院</option>
              <option class="content_left_top_item_select_option" value="btqyy">宝塔区医院</option>
            </select>
            <div class="select-btn" @click="querySelector">查询</div>
          </div>
          <!-- <div class="content_left_top_item">
            <select class="content_left_top_item_select" v-model="queryCondition.type">
              <option class="content_left_top_item_select_option">就诊类别</option>
              <option class="content_left_top_item_select_option" value="C0001">门诊</option>
              <option class="content_left_top_item_select_option" value="C0002">住院</option>
            </select>
          </div>-->
          <!-- <div class="content_left_top_item">
            <select
              class="content_left_top_item_select"
              style="width:220px;"
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
          </div>-->
        </div>
        <div class="content_left_bottom">
          <div class="tabs">
            <div class="label">
              <div
                class="tab-pane-label"
                :class="{active: tabsActive == true}"
                @click="checkTabs(0)"
              >
                <span>门急诊诊疗</span>
              </div>
              <div
                class="tab-pane-label"
                :class="{active: tabsActive == false}"
                @click="checkTabs(1)"
              >
                <span>住院诊疗</span>
              </div>
            </div>
            <div class="content2">
              <div class="tab-pane-title">
                <div>记录类型</div>
                <div>数量</div>
              </div>
              <div class="tab-pane" v-if="tabsActive">
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 1}"
                  @click="clickListItem(1,0)"
                >
                  <div class>挂号记录</div>
                  <div class></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 2}"
                  @click="clickListItem(2,0)"
                >
                  <div>病历记录</div>
                  <div class v-if="ghjl&&ghjl.RECORD_INFO_COUNT">{{ghjl.RECORD_INFO_COUNT}}</div>
                  <div class v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 3}"
                  @click="clickListItem(3,0)"
                >
                  <div>诊断记录</div>
                  <div class v-if="ghjl&&ghjl.DIAREC_INFO_COUNT">{{ghjl.DIAREC_INFO_COUNT}}</div>
                  <div class v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 4}"
                  @click="clickListItem(4,0)"
                >
                  <div>医嘱记录</div>
                  <div class v-if="ghjl&&ghjl.DRUREC_INFO_COUNT">{{ghjl.DRUREC_INFO_COUNT}}</div>
                  <div class v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 5}"
                  @click="clickListItem(5,0)"
                >
                  <div>检查报告</div>
                  <div class v-if="ghjl&&ghjl.CLIEXA_INFO_COUNT">{{ghjl.CLIEXA_INFO_COUNT}}</div>
                  <div class v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 6}"
                  @click="clickListItem(6,0)"
                >
                  <div>检验报告</div>
                  <div class v-if="ghjl&&ghjl.LAREXA_INFO_COUNT">{{ghjl.LAREXA_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 7}"
                  @click="clickListItem(7,0)"
                >
                  <div>手术记录</div>
                  <div class v-if="ghjl&&ghjl.OPEREC_INFO_COUNT">{{ghjl.OPEREC_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 8}"
                  @click="clickListItem(8,0)"
                >
                  <div>费用记录</div>
                  <div class v-if="ghjl&&ghjl.EXPSET_INFO_COUNT">{{ghjl.EXPSET_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
              </div>
              <div class="tab-pane" v-if="!tabsActive">
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 1}"
                  @click="clickListItem(1,1)"
                >
                  <div>住院病案首页</div>
                  <div class v-if="ryjl&&ryjl.HAI_APRNOT_COUNT">{{ryjl.HAI_APRNOT_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 2}"
                  @click="clickListItem(2,1)"
                >
                  <div>入院记录</div>
                  <div class></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 3}"
                  @click="clickListItem(3,1)"
                >
                  <div>诊断记录</div>
                  <div class v-if="ryjl&&ryjl.DIAREC_INFO_COUNT">{{ryjl.DIAREC_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 4}"
                  @click="clickListItem(4,1)"
                >
                  <div>医嘱信息</div>
                  <div class v-if="ryjl&&ryjl.DRUREC_INFO_COUNT">{{ryjl.DRUREC_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <!-- <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 5}"
                  @click="clickListItem(5,1)"
                >
                  <div>临床路径记录</div>
                  <div class v-if="ryjl&&ryjl.CPATH_INFO_COUNT">{{ryjl.CPATH_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>-->
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 6}"
                  @click="clickListItem(6,1)"
                >
                  <div>检查报告</div>
                  <div class v-if="ryjl&&ryjl.CLIEXA_INFO_COUNT">{{ryjl.CLIEXA_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 7}"
                  @click="clickListItem(7,1)"
                >
                  <div>检验报告</div>
                  <div class v-if="ryjl&&ryjl.LAREXA_INFO_COUNT">{{ryjl.LAREXA_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 8}"
                  @click="clickListItem(8,1)"
                >
                  <div>手术记录</div>
                  <div class v-if="ryjl&&ryjl.OPEREC_INFO_COUNT">{{ryjl.OPEREC_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 9}"
                  @click="clickListItem(9,1)"
                >
                  <div>出院记录</div>
                  <div class v-if="ryjl&&ryjl.OUTRECORD_INFO_COUNT">{{ryjl.OUTRECORD_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
                <div
                  class="tab-pane-item"
                  :class="{itemsActive: itemsActive == 10}"
                  @click="clickListItem(10,1)"
                >
                  <div>费用结算</div>
                  <div class v-if="ryjl&&ryjl.EXPSET_INFO_COUNT">{{ryjl.EXPSET_INFO_COUNT}}</div>
                  <div v-else></div>
                </div>
              </div>
            </div>
          </div>
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
              v-bind:is="item.content"
              :patientInfo="patientInfo"
              :elTabsData="elTabsData"
              :key="componentsKey"
              @timerPick="getTimePick"
            ></component>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          :visible.sync="dialogVisible"
          width="500px"
          :before-close="handleClose"
          center
          class="read_card_dialog"
        >
          <div class="read_card">
            当前读取到的身份账号为：
            <div class="id_card">
              <el-input
                v-model="inputContext"
                style="width:200px;margin:20px 0 30px 0;"
                placeholder="点击修改身份证号"
              ></el-input>
            </div>
            <div class="id_card">
              <!-- <el-input v-model="id_card" style="width:200px;margin-top:50px;"></el-input> -->
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button ref="sendMsg" @click="readIdCard">读卡</el-button> -->
            <el-button ref="sendMsg" @click="selectCardData">确定</el-button>
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
import moment from 'moment'
export default {
  name: "home",
  components: { InspectionRecord, PatientOverView, hospitalindex, mjzZlbl, mjzZlfymx, mjzZlyz, mjzZlzfyxx, mzsHjl, zjzZlgh, mjzzljcbg, zjzZljymxjl, zjzZlzdjl, zybAsyfyjl, zybAsyjl, zybAsypgbg, zybAsyzd, zyzLcy, zyzLfyjs, zyzLfymxjl, zyzLjcbg, zyzLjymxjl, zyzLlcljjl, zyzLssjl, zyzlyz, zyzLzdjlxx, ryjl },
  data() {
    return {
      // id_card: "610627196001190000",
      id_card: "",
      device_verify: {},
      device_auth_ticket: "",
      inputContext: "",
      oldId: "",
      ghjl: {},
      ryjl: {},
      datePickVal: [],
      loading: false,
      componentsKey: 0,
      tabsActive: true,
      itemsActive: 1,
      userInfo: {
        user_no: ""
      },
      patientInfo: {},
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
      dialogVisible: false,
      queryCondition: {
        startDate: "",
        endDate: "",
        hospital: "就诊医院",
        hospitalName: ""
      },
      personInfo: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      elTabsData: {},
      editableTabs: [],
      editableTabsValue: "",
      showContent: false,
      CardInfo: {},
      from: '',
      showAccount: false,
    };
  },
  mounted() {
    let user = sessionStorage.getItem("current_login_user")
    this.userInfo = JSON.parse(user)
    // alert(JSON.stringify(this.CardInfo))
    let param = this.$route.params.target
    this.from = param
    console.log(param)
  },
  updated() {
  },
  methods: {
    getTimePick(data) {
      // 获取时间区间
      console.log("TCL: getTimePick -> datta", data)
      this.datePickVal = data.datePickVal
      this.queryCondition.startDate = data.datePickVal[0]
      this.queryCondition.endDate = data.datePickVal[1]
      this.clickListItem(data.num, data.type)
    },
    requestMachineNum() {
      let serviceName = "srvdi_electronic_card_cert"
      let url = this.getServiceUrl("select", serviceName, "emr");
      let cardType = "身份证"
      let deviceAuthTicket = ""
    },
    checkTabs(num) {
      if (num === 0) {
        this.tabsActive = true
        this.editableTabsValue = "挂号记录"
        let exists = this.editableTabs.filter(tab => tab.name === "挂号记录").length > 0; // 过滤已存在tab
        if (!exists) {
          this.editableTabs.push({
            title: "挂号记录",
            name: "挂号记录",
            content: "zjzZlgh"
          });
        }
      } else if (num === 1) {
        this.tabsActive = false
        this.editableTabsValue = "住院病案首页"
        let exists = this.editableTabs.filter(tab => tab.name === "住院病案首页").length > 0; // 过滤已存在tab
        if (!exists) {
          this.editableTabs.push({
            title: "住院病案首页",
            name: "住院病案首页",
            content: "hospitalindex"
          });
        }
      }
    },
    clickListItem(num, type) {
      this.itemsActive = num
      let serviceName = ""
      let tab = ""
      let component = ""
      if (type === 0) { // 门急诊
        if (num === 1) {
          tab = "挂号记录"
          serviceName = "DI_ADI_REGISTER_INFO_select"
          component = "zjzZlgh"
        } else if (num === 2) {
          tab = "病历记录"
          serviceName = "DI_ADI_RECORD_INFO_select"
          component = "mjzZlbl"
        } else if (num === 3) {
          tab = "诊断记录"
          serviceName = "DI_ADI_DIAREC_INFO_select"
          component = "zjzZlzdjl"
        } else if (num === 4) {
          tab = "医嘱记录"
          serviceName = "DI_ADI_DRUREC_INFO_select"
          component = "mjzZlyz"
        } else if (num === 5) {
          tab = "检查报告"
          serviceName = "DI_ADI_CLIEXA_INFO_select"
          component = "mjzzljcbg"
        } else if (num === 6) {
          tab = "检验报告"
          serviceName = "DI_ADI_LAREXA_INFO_select"
          component = "zjzZljymxjl"
        } else if (num === 7) {
          tab = "手术记录"
          serviceName = "DI_ADI_OPEREC_INFO_select"
          component = "mzsHjl"
        } else if (num === 8) {
          tab = "费用记录"
          serviceName = "DI_ADI_EXPSET_INFO_select"
          component = "mjzZlfymx"
        }
      } else if (type === 1) { // 住院
        if (num === 1) {
          tab = "住院病案首页"
          serviceName = "DI_HAI_APRNOT_INFO_MR_select"
          component = "hospitalindex"
        } else if (num === 2) {
          tab = "入院记录"
          serviceName = "DI_HDI_INRECORD_INFO_select"
          component = "ryjl"
        } else if (num === 3) {
          tab = "住院诊断记录"
          serviceName = "DI_HDI_DIAREC_INFO_select"
          component = "zyzLzdjlxx"
        } else if (num === 4) {
          tab = "住院医嘱信息"
          serviceName = "DI_HDI_DRUREC_INFO_select"
          component = "zyzlyz"
        } else if (num === 5) {
          tab = "临床路径记录"
          serviceName = "DI_HDI_CPATH_INFO_select"
          component = "zyzLlcljjl"
        } else if (num === 6) {
          tab = "住院检查报告"
          serviceName = "DI_HDI_CLIEXA_INFO_select"
          component = "zyzLjcbg"
        } else if (num === 7) {
          tab = "住院检验报告"
          serviceName = "DI_HDI_LAREXA_INFO_select"
          component = "InspectionRecord"
        } else if (num === 8) {
          tab = "住院手术记录"
          serviceName = "DI_HDI_OPEREC_INFO_select"
          component = "zyzLssjl"
        } else if (num === 9) {
          tab = "出院记录"
          serviceName = "DI_HDI_OUTRECORD_INFO_select"
          component = "zyzLcy"
        } else if (num === 10) {
          tab = "费用结算"
          serviceName = "DI_HDI_EXPSET_INFO_select"
          component = "zyzLfyjs"
        }
      }
      let datas = {
        tab: tab,
        serviceName: serviceName,
        component: component,
        type: type
      }
      this.addTab(datas)
    },
    addTab(data) {
      // 点击列表查询对应记录数据,增加对应tab页
      console.log(data)
      // if (data.type == "0") {
      //   // 根据身份证号查找门急诊记录
      // }
      if (data) {
        let req = {
          serviceName: data.serviceName,
          condition: [
            {
              colName: "CERT_NUMBER",
              ruleType: "eq",
              value: this.id_card
            }
          ]
        };
        if (this.queryCondition.hospitalName) {
          req.condition.push({
            colName: "HOSPITAL_NAME",
            ruleType: "eq",
            value: this.queryCondition.hospital
          })
        }
        if (this.datePickVal.length > 0) {
          req.condition.push({
            colName: "DATAGENERATE_DATE_TS",
            ruleType: "ge",
            value: this.datePickVal[0]
          })
          req.condition.push({
            colName: "DATAGENERATE_DATE_TS",
            ruleType: "le",
            value: this.datePickVal[1]
          })
          this.datePickVal = []
        }

        // console.log("TCL: addTab -> req", req)
        let url = this.getServiceUrl("select", data.serviceName, "emr");
        this.axios({
          method: "POST",
          url: url,
          data: req
        }).then(res => {
          let ser = req.serviceName
          console.log("TCL: addTab -> req", req)
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
        }).catch(err => {
          console.log(err)
        })
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
      this.editableTabs = []
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
      this.dialogVisible = false
      this.inputContext = ""
      window.CardInfo = null
      const oldId = this.id_card
      this.oldId = oldId
      this.id_card = null
      this.LOCAL_ID = ""
      this.readIdCard()
      if (this.from == "web") {
        this.dialogVisible = true;
        console.log(this.dialogVisible)
      } else {
        this.dialogVisible = false;
        console.log(this.dialogVisible)
      }// 控制显示输入身份证的dialog是否需要读卡 true不需要
      this.ghjl = {}
      this.ryjl = {}
    },
    selectCardData() {
      // if (this.oldId != this.id_card) {
      //   this.patientInfo = {}
      //   this.editableTabs.length = 0
      //   this.editableTabsValue = ""
      // }
      if (this.inputContext) {
        this.id_card = this.inputContext
        this.patientInfo.identityCard = this.id_card
        // this.patientInfo.name = window.CardInfo.name
        // this.getData();
        this.getBasicData()
        setTimeout(() => {
          this.dialogVisible = false;
        }, 200);
      } else {
        this.dialogVisible = false
        this.readIdCard()
        if (!this.inputContext) {
          this.$message({
            showClose: true,
            message: '请输入身份证或刷卡',
            type: 'warning'
          });
          this.dialogVisible = false;
        }
        return
      }
    },
    verifyDevice(ticket, card_type, card_no) {
      let serviceName = "srvdi_electronic_card_cert"
      let req = {
        "serviceName": "srvdi_electronic_card_cert",
        "condition": [
          {
            "colName": "device_auth_ticket",
            "ruleType": "eq",
            "value": ticket,
          },
          {
            "colName": "card_type",
            "ruleType": "eq",
            "value": card_type,
          },
          {
            "colName": "card_no",
            "ruleType": "eq",
            "value": card_no,
          }]
      }
      let url = this.getServiceUrl("select", serviceName, "emr");
      this.axios.post(url, req).then(res => {
        if (res.data.data) {
          this.device_verify = {
            cert_auth_ticket: res.data.data[0].cert_auth_ticket, // 卡机票据
            expire_date: res.data.data[0].expire_date // 到期时间
          }
          window.sessionStorage.setItem("cert_auth_ticket", this.device_verify.cert_auth_ticket)
          this.cert_auth_ticket = res.data.data.cert_auth_ticket
        }
      }).catch(err => {
        alert('05' + err)
      })
    },
    readIdCard() {
      this.dialogVisible = false
      this.BtnReadCard();
      /**
       * TODO
       * 增加卡机设备验证
       */
      setTimeout(() => {
        let CardInfo = window.CardInfo
        if (CardInfo) {
          let ticket = CardInfo.bx_auth_ticket
          let card_Type = CardInfo.cardtype
          if (card_Type == '居民身份证') {
            card_Type = '身份证'
          }
          this.patientInfo.name = CardInfo.name
          this.patientInfo.card_type = card_Type
          this.patientInfo.sex = CardInfo.sex
          this.patientInfo.identityCard = CardInfo.id
          let nowYear = moment().format().slice(0, 4)
          let birth = CardInfo.id.toString().slice(6, 14)
          let birth_month = birth.slice(4, 6) // 出生月
          let birth_yeaer = birth.slice(0, 4) // 出生年
          let age = parseInt(nowYear) - parseInt(birth_yeaer)
          this.patientInfo.age = age
          let card_no = CardInfo.id
          this.verifyDevice(ticket, card_Type, card_no)
          this.CardInfo = CardInfo
          this.inputContext = CardInfo.id
          if (this.userInfo) {
            if (this.userInfo.user_no != "" && window.CardInfo.id != null) {
              this.dialogVisible = true;
              this.patientInfo.name = CardInfo.name
              this.patientInfo.identityCard = CardInfo.id
              this.patientInfo.sex = CardInfo.sex
              this.id_card = CardInfo.id
            } else {
              this.$message({
                showClose: true,
                message: '请将身份证或就诊卡放到读卡机上',
                type: 'warning'
              });
            }
          }
          // if (this.oldId != this.id_card) {
          //   this.patientInfo = {}
          //   this.editableTabs.length = 0
          //   this.editableTabsValue = ""
          // } else {
          //   // this.id_card = this.oldId
          // }
        } else {
          if (this.from != "web") {
            this.$message({
              showClose: true,
              message: '请输入身份证或刷卡...',
              type: 'warning'
            });
          }
          // alert("请刷身份证或者社保卡")
        }
        window.CardInfo = null
        localStorage.removeItem("CardInfo")
        // this.getData();
      });
    },
    getBasicData(cond) {
      if (cond) {
        let conds = [
          {
            colName: "CERT_NUMBER",
            ruleType: "eq",
            value: this.id_card
          }]
        if (cond.hospital) {
          conds.push({
            colName: "HOSPITAL_NAME",
            ruleType: "eq",
            value: cond.hospital
          })
        }
        // 查询挂号记录
        let paramsb = {
          "serviceName": "DI_ADI_REGISTER_INFO_SUM_select"
        }
        paramsb['condition'] = conds
        let urlb = this.getServiceUrl("select", paramsb.serviceName, "emr");
        this.axios.post(urlb, paramsb)
          .then(res => {
            let ghjl = res.data.data[0]
            this.ghjl = ghjl
            console.log("挂号记录:", res.data.data)
          })
          .catch(err => {
            console.error(err);
          })
        // 查询入院记录
        let paramsc = {
          "serviceName": "DI_HDI_INRECORD_INFO_SUM_select"
        }
        paramsc['condition'] = conds
        let urlc = this.getServiceUrl("select", paramsc.serviceName, "emr");
        this.axios.post(urlc, paramsc)
          .then(res => {
            let ryjl = res.data.data[0]
            this.ryjl = ryjl
            console.log("入院记录：", this.ryjl)
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        // 获取基本信息、挂号记录统计、入院记录统计
        let params = {
          serviceName: "DI_MPI_REGISTERINFO_select",
          condition: [
            {
              colName: "CERT_NUMBER",
              ruleType: "eq",
              value: this.id_card
            }
          ]
        };
        let url = this.getServiceUrl("select", params.serviceName, "emr");
        this.axios.post(url, params)
          .then(res => {
            let data = res.data.data[0]
            console.log("基本信息:", data);
            if (data.NAME) {
              this.patientInfo.name = data.NAME
            }
            this.patientInfo.sex = data.SEX_NAME
            let birth = data.BIRTHDAY.toString().slice(0, 4)
            birth = new Date(birth).getFullYear();
            let today = new Date().getFullYear();
            let age = today - birth
            this.patientInfo.age = age
            console.log("age:", age)
          })
          .catch(err => {
            console.error(err);
          })
        // 查询挂号记录
        let paramsb = {
          "serviceName": "DI_ADI_REGISTER_INFO_SUM_select",
          "condition": [
            {
              colName: "CERT_NUMBER",
              ruleType: "eq",
              value: this.id_card
            }
          ],
        }
        let urlb = this.getServiceUrl("select", paramsb.serviceName, "emr");
        this.axios.post(urlb, paramsb)
          .then(res => {
            let ghjl = res.data.data[0]
            this.ghjl = ghjl
            console.log("挂号记录:", res.data.data)
          })
          .catch(err => {
            console.error(err);
          })
        // 查询入院记录
        let paramsc = {
          "serviceName": "DI_HDI_INRECORD_INFO_SUM_select",
          "condition": [
            {
              colName: "CERT_NUMBER",
              ruleType: "eq",
              value: this.id_card
            }
          ],
        }
        let urlc = this.getServiceUrl("select", paramsc.serviceName, "emr");
        this.axios.post(urlc, paramsc)
          .then(res => {
            let ryjl = res.data.data[0]
            this.ryjl = ryjl
            console.log("入院记录：", this.ryjl)
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
    BtnReadCard() {
      if (typeof jsObj == "undefined") {
        // alert("jsObj参数未初始化")
        // alert("监测到当前环境非电子病历客户端，请从客户端中进入本页面")
        if (this.from !== "web") {
          this.$message({
            showClose: true,
            message: '监测到当前环境非电子病历客户端，请从客户端中进入本页面',
            type: 'warning'
          });
        } else {
          this.$message({
            showClose: true,
            message: '当前访问环境为浏览器',
            type: 'warning'
          });
        }
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
        hospital: this.queryCondition.hospital
      };
      switch (condition.hospital) {
        case 'zyyy':
          this.queryCondition.hospitalName = '延安市中医医院'
          break;
        case 'fybjyy':
          this.queryCondition.hospitalName = '延安市妇幼保健医院'
          break;
        case 'bayy':
          this.queryCondition.hospitalName = '延安市博爱医院'
          break;
        case 'rmyy':
          this.queryCondition.hospitalName = '延安市人民医院'
          break;
        default:
          this.queryCondition.hospitalName = null
          break;
      }
      if (this.queryCondition.hospital === "就诊医院") {
        condition.hospital = "";
      }
      console.log(condition, this.queryCondition);
      this.getBasicData(condition)
      this.editableTabs = []
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
            this.editableTabsValue = activeName;
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    goHomePage() {
      console.log("返回首页");
      window.location.reload();
    },
    changeAccountVisible() {
      // 显示/隐藏账户信息
      this.showAccount = !this.showAccount
    },
    hideAccountInfo() {
      // 隐藏账户信息
      this.showAccount = false
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
  // min-width: 1361px;
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
  width: 220px;
  height: 37px;
}

.el-tabs--border-card {
  // height: 545px;
  height: 100%;
  width: 100%;
}

.el-tabs--border-card /deep/ .el-tabs__content {
  height: 100%;
  // overflow-y: scroll;
  overflow: visible;
  .el-tab-pane {
    // height: 100%;
    overflow-y: scroll;
    height: 90%;
    margin-right: -50px;
  }
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
  max-width: 100vw;
  min-width: 950px;
  // max-width: 1500px;
  margin: 0 auto;
  max-height: 100vh;
}
.nodata {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* header */
.heade {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  color: #333;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
  .header_item {
    height: 100%;
    display: flex;
    width: auto;
    flex: 1;
    color: #333;
    &:last-child {
      justify-content: space-between;
    }
    .header_img {
      width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border: 1px #666 solid;
      .hospital_name {
        width: 100%;
        font-size: 30px;
        text-align: center;
        font-family: "楷体";
      }
    }
    .account_box {
      cursor: pointer;
      position: relative;
      margin: 0 30px 0 100px;
      height: 60px;
      width: 60px;
      background-image: url("../assets/images/account.png");
      // background-color: #575858;
      background-size: 100%;
      overflow: visible;
      .account_info {
        cursor: default;
        padding-top: 10px;
        border: 1px solid #333;
        width: 120px;
        height: 120px;
        position: absolute;
        bottom: -100px;
        left: -120px;
        background-color: #333;
        border-radius: 5px;
        color: #eee;
        z-index: 999;
        .account_info_item {
          font-size: 16px;
          cursor: pointer;
          // height: 60px;
          text-indent: 16px;
          line-height: 40px;
          &:hover {
            background-color: #409eff;
          }
        }
      }
    }
  }
}

.header_user_info {
  max-width: 500px;
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

// .header_btn:nth-child(2) {
//   border-color: rgba(228, 228, 228, 1);
// }
.header_btn:nth-child(4) {
  border-color: #fff;
  cursor: auto;
}

/* content */
.content {
  /* height: 550px; */
  display: flex;
  min-height: 700px;
  margin-top: 10px;
  height: 90vh;
  box-sizing: border-box;
  .content_left {
    box-sizing: border-box;
    width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 10px;
    float: left;
    .content_left_top {
      margin: 0 auto;
      box-sizing: border-box;
      .content_left_top_item {
        width: 220px;
        margin-bottom: 10px;
        &:first-child {
          background-color: transparent;
          display: flex;
          box-sizing: border-box;
          border: none;
          align-items: center;
          font-size: 12px;
        }
      }
    }
    .content_left_bottom {
      margin: 0 auto;
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      border: 1px solid rgba(228, 228, 228, 1);
      // height: 700px;
      height: 100%;
      .tabs {
        width: 100%;
        display: flex;
        flex-direction: column;
        .label {
          text-align: center;
          display: flex;
          .tab-pane-label {
            flex: 1;
            height: 40px;
            color: #409eff;
            line-height: 40px;
            font-size: 16px;
            border-bottom: 1px solid #e4e4e4;
            &:hover {
              cursor: pointer;
            }
            &:last-child {
              border-left: 1px solid #e4e4e4;
            }
          }
          .active {
            background-color: #409eff;
            color: #fff;
          }
        }
        .content2 {
          display: block;
          .tab-pane-title {
            display: flex;
            div {
              height: 25px;
              line-height: 25px;
              text-align: center;
              font-size: 12px;
              font-weight: 600;
              &:first-child {
                flex: 2;
                text-indent: 20px;
                text-align: left;
              }
              &:last-child {
                flex: 1;
              }
            }
          }
          .tab-pane {
            display: flex;
            flex-direction: column;
            .tab-pane-item {
              height: 30px;
              text-indent: 20px;
              line-height: 30px;
              cursor: pointer;
              font-size: 14px;
              display: flex;
              &:hover {
                color: #409eff;
              }
              div {
                &:first-child {
                  flex: 2;
                }
                &:last-child {
                  flex: 1;
                  text-align: center;
                  text-indent: 0;
                }
              }
            }
            .itemsActive {
              color: #fff;
              background-color: #409eff;
              &:hover {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .content_right {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    height: 100%;
    margin-right: 10px;
    overflow: hidden;
    .read_card_dialog {
      overflow: hidden;
      & /deep/ .el-dialog--center {
        overflow: hidden;
      }
    }
  }
}

select {
  border: none;
}

.text {
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

.read_card {
  min-height: 100px;
  text-align: center;
  overflow: hidden;
  // line-height: 100px;
  font-weight: 600;
  font-size: 20px;
}

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
      color: #409eff;
    }
  }
}
.text {
  margin: 0;
  padding: 0;
}
.title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
}
</style>
