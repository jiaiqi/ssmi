<template>
  <div class="tab_content">
    <div class="timecheck">
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
      <button @click="timerPick">筛选</button>
    </div>
    <div class="tab_content_title">住院诊疗手术记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>手术申请单号</td>
            <td>手术日期</td>
            <td>手术名称</td>
            <!-- <td>愈合等级</td> -->
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{ item.AP01_00_024_00}}</td>
            <td v-if="item.DE06_00_095_00">{{format_date(item.DE06_00_095_00)}}</td>
            <td v-else-if="!item.DE06_00_095_00"></td>
            <td>{{ item.DE06_00_094_00 }}</td>
            <!-- <td>{{ item.AP05_01_054_00 }}</td> -->
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <!-- <operation-note></operation-note> -->
            <div class="tab_detail">
              <div class="title">住院诊疗手术记录</div>
              <div class="detail_title_header">
                <div class="detail_title_headerone">
                  <span>科别:</span>
                  <span>姓名:{{detail.DE02_01_039_00}}</span>
                  <span>性别:{{detail.AP02_01_102_01}}</span>
                  <span>年龄:{{detail.DE02_01_032_00}}</span>
                </div>
                <div class="detail_title_headertwo"></div>
              </div>
              <p>
                <strong>手术前诊断:</strong>
                &nbsp;&nbsp;{{ detail.AP05_01_115_00}}
              </p>
              <p>
                <strong>手术后诊断:</strong>
                &nbsp;&nbsp;{{ detail.AP05_01_117_00}}
              </p>
              <p>
                <strong>手术名称:</strong>
                &nbsp;&nbsp;{{detail.DE06_00_094_00}}
              </p>
              <div class="detail_title_dif1">
                <p>
                  <strong>手术日期:</strong>
                  &nbsp;&nbsp;{{format_date(detail.DE06_00_095_00)}}
                </p>
              </div>
              <div class="detail_title_dif2">
                <p>
                  <strong>手术者:</strong>
                  &nbsp;&nbsp;{{detail.AP02_01_039_37}}
                </p>
                <p class="detail_title_dif2_two">
                  <strong>助手:</strong>
                  &nbsp;&nbsp;{{detail.AP02_01_039_75}}
                </p>
                <p class="detail_title_dif2_three">
                  <strong>护士:</strong>
                </p>
              </div>
              <p>
                <strong>麻醉者:</strong>
                &nbsp;&nbsp;{{detail.AP02_01_039_76}}
              </p>
              <p>
                <strong>体位:</strong>
              </p>
              <p>
                <strong>手术经过:</strong>
                &nbsp;&nbsp;{{detail.AP06_00_302_00}}
              </p>
            </div>
            <!-- <div class="tab_detail">
              <div class="detail_title">
                <span>住院病区:{{ detail.AP08_10_002_00 }}</span>
                <span>住院科室:{{ detail.AP08_10_026_11 }}</span>
                <span>住院床号:{{ detail.AP08_10_026_11 }}</span>
                <span
                  v-if="detail.AP06_00_189_00"
                >手术操作时间: {{ detail.AP06_00_189_00.slice(0,4)+'-'+detail.AP06_00_189_00.slice(4,6)+'-'+detail.AP06_00_189_00.slice(6,8) }}</span>
                <span>病案号:{{ detail.AP08_10_001_00 }}</span>
              </div>
              <div class="detail">
                <div class="detail_left">
                  <p
                    v-if="detail.AP06_00_393_00"
                  >手术开始时间:{{ detail.AP06_00_393_00.slice(0,4)+'-'+detail.AP06_00_393_00.slice(4,6)+'-'+detail.AP06_00_393_00.slice(6,8) }}</p>
                  <p
                    v-if="detail.AP06_00_394_00"
                  >手术结束时间:{{ detail.AP06_00_394_00.slice(0,4)+'-'+detail.AP06_00_394_00.slice(4,6)+'-'+detail.AP06_00_394_00.slice(6,8) }}</p>
                  <p>麻醉执行科室:{{ detail.AP08_10_054_02 }}</p>
                  <p>麻醉医师:{{ detail.AP02_01_039_76 }}</p>
                  <p>助手1:{{ detail.AP02_01_039_75 }}</p>
                  <p>助手2:{{ detail.AP02_01_039_78 }}</p>
                </div>
                <div class="detail_rig">
                  <p>手术/操作-名称:{{ detail.DE06_00_094_00 }}</p>
                  <p>手术操作部位:{{ detail.AP06_00_006_01 }}</p>
                  <p>麻醉-方法:{{ detail.DE06_00_074_00 }}</p>
                  <p>手术后情况:{{ detail.AP05_10_071_00 }}</p>
                  <p>手术经过:{{ detail.AP06_00_302_00 }}</p>
                </div>
              </div>
            </div>-->
          </el-dialog>
        </tbody>
      </table>
      <div class="nodata" v-else>暂无数据......</div>
    </div>
  </div>
</template>

<script>
// import OperationNote from "../dialog/InHospitalOperationNote";
export default {
  name: "zyzlssjl",
  // components: {
  //   OperationNote
  // },
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: [],
      datePickVal: [],
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
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zyssjl;
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
      }
    },
    timerPick() {
      let datePickVal = []
      console.log(this.datePickVal)
      this.datePickVal.forEach(date => {
        datePickVal.push(this.moment(date).format('YYYY-MM-DD HH:mm:ss'))
      })
      // datePickVal = this.datePickVal
      let data = { // type:0门急诊1住院
        datePickVal: datePickVal,
        num: 8,
        type: 1
      }
      this.$emit('timerPick', data)
    }
  }
};
</script>


<style lang="scss" scoped>
.tab_content {
  width: 100%;
  height: 100%;
  text-align: center;
}

.tab_content_title {
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  height: 60px;
  line-height: 60px;
  font-style: normal;
  font-size: 16px;
  color: #7f7f7f;
}

/* 详情 */
.tab_detail {
  box-sizing: border-box;
  // width: 900px;
  margin: 0 auto;
  min-height: 500px;
  text-align: left;
  p {
    margin-left: 2%;
  }
}

.detail_title {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
}

.detail {
  display: flex;
  justify-content: space-between;
  .detail_left {
    width: 45%;
    min-height: 530px;
    text-align: left;
    border-right: 1px solid black;
    p {
      margin-left: 5%;
    }
  }
  .detail_rig {
    width: 45%;
    text-align: left;
    margin-right: 2%;
    p {
      margin-right: 5%;
    }
  }
}

.read_card {
  min-height: 100px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
/* 内容 */
.detail_content_title {
  display: flex;
  width: 100%;
}

.title_left {
  flex: 1;

  display: flex;
  justify-content: space-around;
  table,
  tr,
  td {
    border: 1px solid #333;
    margin-top: 15px;
  }
  table {
    width: 100%;
  }
}

.title_right {
  display: flex;
  justify-content: space-around;
  flex: 1;
}

.detail_content_content {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-between;
}

.detail_content_left {
  border-right: 1px #333 solid;
  height: 300px;
  width: 50%;
}

.detail_content_right {
  height: 300px;
  width: 50%;
}

table {
  width: 80%;
  border-spacing: 0px;
  border-collapse: collapse;
  margin: 0 auto;
}

table td {
  min-width: 30px;
  height: 30px;
  text-align: center;
  padding: 0 10px;
  white-space: nowrap;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #7f7f7f;
}

td.handle {
  cursor: pointer;
  color: #409eff;
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
.detail_title_header {
  width: 100%;
}
.detail_title_headerone {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
}
.detail_title_headertwo > .span11 {
  margin-left: 100px;
}
.detail_title_headertwo > .span22 {
  margin-left: 190px;
}
.detail_title_headertwo > .span33 {
  margin-left: 420px;
}
.detail_title_dif {
  width: 100%;
  display: block;
}
.detail_title_dif:nth-of-type(2) {
  margin-left: 200px;
}
</style>
