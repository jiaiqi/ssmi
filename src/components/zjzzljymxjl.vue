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
    <div class="tab_content_title">门诊诊疗检验记录明细</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>就诊流水号</td>
            <td>检验申请单号</td>
            <td>检验时间</td>
            <td>检验报告单号</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_010_00}}</td>
            <td>{{item.AP01_00_022_00}}</td>
            <td v-if="item.DATAGENERATE_DATE">{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td v-if="!item.DATAGENERATE_DATE"></td>
            <td>{{item.AP04_50_057_00}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>

          <el-dialog title :visible.sync="dialogVisible" width="1000px">
            <div class="tab_detail">
              <div class="detail_title">
                <div class="detail_title_block" v-if="info">
                  <span>姓名:{{info.DE02_01_039_00}}</span>
                  <span>性别:{{info.AP02_01_102_01}}</span>
                  <span>年龄:{{info.DE02_01_032_00}}</span>
                </div>
                <div class="detail_title_block">
                  <span>样本号:</span>
                  <span>送检医生:{{info.AP02_01_122_00}}</span>
                  <span>备注:</span>
                </div>
              </div>
              <div class="detail_content">
                <div class="detail_content_title">
                  <div class="title_left">
                    <table>
                      <tr>
                        <td>检验方法</td>
                        <td>项目名称</td>
                        <td>结果</td>
                        <td>单位</td>
                        <td>参考范围</td>
                      </tr>
                      <tr v-for="(item,index) in detail" :key="index">
                        <td>{{item.AP04_50_067_00}}</td>
                        <td>{{item.DE04_30_020_00}}</td>
                        <td>{{item.AP04_30_003_00}}</td>
                        <td>{{item.DE04_30_016_00}}</td>
                        <td>{{item.AP05_10_042_00}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="detail_content_content">
                  <div class="detail_content_right"></div>
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
export default {
  name: "OutpatientInspectionRecordDetails",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      tabsData: [],
      detail: [],
      info: {},
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
      this.tabsData = this.elTabsData.mzjybg
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.info = item
        this.getDetail(item.AP04_50_057_00)
      }

    },
    getDetail(item) {
      let params = {
        serviceName: "DI_ADI_LAREXADET_LIST_select",
        condition: [
          {
            colName: "AP04_50_057_00",
            ruleType: "eq",
            value: item //检验报告单号
          }
        ]
      };
      let url = this.getServiceUrl("select", params.serviceName, "emr");
      this.axios.post(url, params)
        .then(res => {
          this.detail = res.data.data
        })
        .catch(err => {
          console.error(err);
        })
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

    .detail_title {
      display: flex;
      justify-content: space-around;
      padding-bottom: 5px;
      border-bottom: 1px solid #333;
    }
    .detail_title_block {
      width: 25%;
      line-height: 20px;
      display: flex;
      text-align: left;
      flex-direction: column;
    }
  }
}

/* 内容 */
.detail_content_title {
  display: flex;
  width: 100%;
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
