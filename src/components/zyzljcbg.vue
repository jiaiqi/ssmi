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
    <div class="tab_content_title">住院诊疗检查报告</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>报告单名称</td>
            <td>检查日期</td>
            <td>检查项目</td>
            <!-- <td>科室</td> -->
            <!-- <td>检查结论</td> -->
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{ item.AP04_50_056_00 }}</td>
            <td v-if="item.AP06_00_048_03">{{format_date(item.AP06_00_048_03)}}</td>
            <td>{{ item.DE04_30_020_00 }}</td>
            <!-- <td>{{ item.AP04_30_060_00 }}</td> -->
            <!-- <td class="ellipsis">{{item.AP04_30_046_00}}</td> -->
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <!-- <inspection-report></inspection-report> -->
            <div class="wrap_jcbg">
              <div class="header">
                <div class="header_top">
                  <h1>{{detail.AP04_50_076_02}}</h1>
                  <h3>住院检查报告单</h3>
                </div>
                <div class="header_cen">
                  <p>
                    <span>影像号:</span>
                    <span></span>
                  </p>
                </div>
                <div class="header_bot">
                  <ul>
                    <li>
                      <p>
                        <span>姓名:</span>
                        <span>{{ detail.DE02_01_039_00 }}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>性别:</span>
                        <span>{{ detail.AP02_01_102_01 }}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>年龄:</span>
                        <span>{{ detail.DE02_01_032_00 }}岁</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>检查号:</span>
                        <span>{{ detail.AP04_50_057_00 }}</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>科室:</span>
                        <span>{{ detail.AP04_30_060_00 }}</span>
                      </p>
                    </li>

                    <li>
                      <p>
                        <span
                          v-if="detail.AP06_00_048_03"
                        >检查时间:{{format_date(detail.AP06_00_048_03)}}</span>
                      </p>
                    </li>
                    <li>
                      <p></p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content">
                <div class="content_top">
                  <div class="inspect">
                    <p>检查项目:</p>
                    <p>{{ detail.DE04_30_020_00 }}</p>
                  </div>
                  <div class="inspect">
                    <p>检查方法:</p>
                    <p>{{ detail.AP04_30_061_00 }}</p>
                  </div>
                  <div class="inspect">
                    <p>检查结论:</p>
                    <p>{{ detail.AP04_30_046_00 }}</p>
                    <p></p>
                  </div>
                  <div class="inspect">
                    <p>疾病诊断名称:</p>
                    <p>{{detail.DE05_01_025_00}}</p>
                  </div>
                </div>
              </div>

              <div class="foot">
                <div class="foot_top">
                  <p>
                    <span>诊断医师:</span>
                    <span>{{ detail.AP02_01_039_19 }}</span>
                  </p>
                  <p>
                    <span>审核医师:</span>
                    <span>{{ detail.AP02_01_039_19 }}</span>
                  </p>
                  <p>
                    <span>审核时间:</span>
                    <span></span>
                  </p>
                </div>
                <div class="foot_bot">
                  <p>仅供参考</p>
                </div>
              </div>
            </div>
          </el-dialog>
        </tbody>
      </table>
      <div class="nodata" v-else>暂无数据......</div>
    </div>
  </div>
</template>

<script>
import InspectionReport from "../dialog/inHospitalInspectionReport";

export default {
  name: "zyzljcbg",
  // components: { InspectionReport },
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
      this.tabsData = this.elTabsData.zyjcbg;
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
        num: 6,
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
  .tab_content_title {
    font-family: "Arial Negreta", "Arial Normal", "Arial";
    font-weight: 700;
    height: 60px;
    line-height: 60px;
    font-style: normal;
    font-size: 16px;
    color: #7f7f7f;
  }
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
p {
  padding: 0;
  margin: 0;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text {
  margin: 0;
  padding: 0;
}

.wrap_jcbg {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    box-shadow: none;
    display: flex;
    flex-direction: column;
  }
  .header_top {
    text-align: center;
  }
  .header_top h1 {
    margin: 15px 0;
  }
  .header_cen {
    text-align: right;
  }
  .header_cen p {
    margin-right: 5%;
    margin-top: 15px;
  }
  .header_bot {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 95%;
    margin: 0 auto;
  }
  .header_bot ul {
    overflow: hidden;
    list-style: none;
    margin: 0 auto;
  }
  .header_bot ul li {
    float: left;
    width: 25%;
    line-height: 30px;
    height: 30px;
  }
  .header_bot p {
    float: left;
    width: 100%;
    display: flex;
    margin-left: 1%;
  }
  .content {
    width: 95%;
    margin: 0 auto;
  }

  .content_top {
    width: 100%;
    margin-top: 20px;
    margin-left: 15px;
  }
  .inspect {
    margin: 15px 0;
    overflow: hidden;
    text-align: left;
  }
  .inspect p {
    text-indent: 30px;
    margin-top: 10px;
  }
  .inspect p:first-child {
    font-weight: 700;
    text-indent: 0;
    margin-top: 0;
  }

  .inspect:nth-child(1) p {
    float: left;
    text-indent: 0;
    margin-top: 0;
  }
  .inspect:nth-child(3) {
    min-height: 100px;
  }
  .opinion {
    margin-top: 30px;
    min-height: 200px;
    text-align: left;
  }
  .opinion p {
    font-weight: 700;
  }
  .opinion ul {
    list-style-type: decimal;
    margin-left: 3%;
  }
  .foot {
    width: 95%;
    margin: 0 auto;
  }
  .foot_top {
    overflow: hidden;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  .foot_top p {
    float: left;
    width: 30%;
    margin-left: 3%;
  }
  .foot_bot {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
