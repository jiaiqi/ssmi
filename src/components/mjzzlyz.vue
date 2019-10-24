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
    <div class="tab_content_title">门急诊诊疗医嘱</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>就诊流水号</td>
            <td>医嘱项目类别</td>
            <td>医嘱项目</td>
            <td>药物剂型</td>
            <td>使用方法</td>
            <td>开具时间</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_010_00}}</td>
            <td>{{item.AP06_00_276_00}}</td>
            <td>{{item.AP06_00_278_00}}</td>
            <td>{{item.AP06_00_313_00}}</td>
            <td>{{item.AP06_00_265_00}}</td>
            <td v-if="item.AP06_00_195_00">{{format_date(item.AP06_00_195_00)}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="yz_wrap">
              <div class="header">
                <div class="header_top">
                  <h3>门急诊诊疗医嘱</h3>
                </div>
                <div class="header_bot">
                  <ul>
                    <li>
                      姓名:
                      <span>{{detail.DE02_01_039_00}}</span>
                    </li>
                    <li>
                      性别:
                      <span>{{detail.AP02_01_102_01}}</span>
                    </li>
                    <li>
                      年龄:
                      <span>{{detail.DE02_01_032_00}}</span>
                    </li>
                    <li>
                      科室:
                      <span>{{detail.DE08_10_026_00}}</span>
                    </li>
                    <li>
                      留观号:
                      <span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content">
                <table>
                  <tr>
                    <td>列数</td>
                    <td colspan="2">开始时间</td>
                    <td colspan="2">临时医嘱</td>
                    <td>医师签名</td>
                    <td>执行时间</td>
                    <td>护士签名</td>
                    <td>嘱托</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>{{format_date(detail.AP06_00_200_00)}}</td>
                    <td>{{format_date(detail.AP06_00_200_00,2)}}</td>
                    <td>{{detail.AP06_00_278_00}}</td>
                    <td class="five">{{detail.AP06_00_265_00}}</td>
                    <!-- <td></td>
                    <td></td>-->
                    <td>{{ detail.AP02_01_039_72 }}</td>
                    <td>{{format_date(detail.AP06_00_200_00,1)}}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div class="bottom">
                <p>
                  医师签名:
                  <span>{{detail.AP02_01_039_72}}</span>
                </p>
                <p>
                  护士签名:
                  <span></span>
                </p>
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
export default {
  name: "OutPatientMedicalAdvice",
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
      this.tabsData = this.elTabsData.mzyz;
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
        num: 4,
        type: 0
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

.yz_wrap {
  * {
    padding: 0;
    margin: 0;
  }
  ul,
  li {
    list-style: none;
  }
  .header {
    width: 90%;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .header_top {
    margin: 0 auto;
    overflow: hidden;
    width: 40%;
    text-align: center;
    margin-bottom: 20px;
  }
  .header_bot ul {
    overflow: hidden;
  }
  .header_bot ul li {
    margin-right: 4%;
    float: left;
  }
  .header_bot ul li:first-child {
    margin-left: 3%;
  }
  .content {
    width: 100%;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
  }
  td {
    padding: 2px 5px;
  }
  .five {
    width: 50px;
  }
  .bottom {
    margin-top: 30px;
    overflow: hidden;
  }
  .bottom p {
    float: left;
  }
  .bottom p:first-child {
    margin-right: 5%;
  }
}
</style>
