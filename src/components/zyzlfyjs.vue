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
    <div class="tab_content_title">住院诊疗费用结算</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>姓名</td>
            <td>住院科室</td>
            <td>结算日期</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{item.DE02_01_039_00}}</td>
            <td>{{item.AP08_10_026_11}}</td>
            <td v-if="item.AP07_00_027_00">{{format_date(item.AP07_00_027_00)}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="fymx_wrap">
              <div class="header">
                <div class="header_top">
                  <h2>住院诊疗费用结算</h2>
                </div>
                <div class="header_cen">
                  <ul>
                    <li>
                      <p>
                        住院号:
                        <span>{{detail.DE01_00_014_00}}</span>
                      </p>
                      <p>
                        姓名:
                        <span>{{detail.DE02_01_039_00}}</span>
                      </p>
                      <p>
                        性别:
                        <span>{{detail.AP02_01_102_01}}</span>
                      </p>
                      <p>
                        年龄:
                        <span>{{detail.DE02_01_032_00}}</span>岁
                      </p>
                    </li>
                    <li>
                      <p>
                        就诊卡号:
                        <span></span>
                      </p>
                      <p>
                        职业:
                        <span></span>
                      </p>
                      <p>
                        工作单位:
                        <span></span>
                      </p>
                      <p>
                        家庭地址:
                        <span></span>
                      </p>
                      <p>
                        家庭电话:
                        <span></span>
                      </p>
                    </li>
                    <li>
                      <p>
                        联系人姓名:
                        <span></span>
                      </p>
                      <p>
                        联系人关系:
                        <span></span>
                      </p>
                      <p>
                        联系人电话:
                        <span></span>
                      </p>
                      <p>
                        入院日期:
                        <span></span>
                      </p>
                      <p>
                        出院日期:
                        <span></span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content">
                <div class="content_top">
                  <div class="content_top_t">
                    <p>结账分类费用</p>
                  </div>
                  <div class="content_top_b" style="margin-bottom:20px;">
                    <table>
                      <tr>
                        <td>时间</td>
                        <td>收费科室</td>
                        <!-- <td>项目代码</td> -->
                        <td>项目名称</td>
                        <td>数量</td>
                        <td>金额（元）</td>
                      </tr>
                      <tr v-for="(item,index) in datalist" :key="index">
                        <td>{{format_date(item.AP07_00_027_00)}}</td>
                        <td>{{item.AP08_10_055_02}}</td>
                        <!-- <td>{{item.AP06_00_290_01}}</td> -->
                        <td>{{item.AP07_00_018_00}}</td>
                        <td>{{item.AP07_00_021_00}}</td>
                        <td>{{item.AP07_00_022_00}}</td>
                      </tr>
                    </table>
                  </div>
                  <div class="content_top_b">
                    <table>
                      <tr>
                        <td>医保范围总额</td>
                        <td>医保范围外个人自费</td>
                        <td>医保基金支付</td>
                        <td>医保自负部分</td>
                        <td>支付方式</td>
                        <td>总费用</td>
                      </tr>
                      <tr>
                        <td>{{detail.AP07_00_044_00}}</td>
                        <td>{{detail.DE07_00_001_00}}</td>
                        <td>{{detail.AP07_00_044_01}}</td>
                        <td>{{detail.AP07_00_044_02}}</td>
                        <td>{{detail.AP07_00_011_01}}</td>
                        <td>{{detail.AP07_00_003_00}}</td>
                      </tr>
                    </table>
                  </div>
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
import axios from 'axios'
export default {
  name: "zyzlfyjs",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: [],
      datalist: [],
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
      this.tabsData = this.elTabsData.zyfyjl
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
      }
      let req = {
        serviceName: "DI_HDI_EXPSET_LIST_select",
        LOCAL_ID: this.detail.LOCAL_ID
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      axios({
        method: "POST",
        url: url,
        data: req,
        headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
      }).then(res => {
        this.datalist = res.data.data;
      }).catch(err => {
        console.log(err);
      });
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
        num: 10,
        type: 1
      }
      this.$emit('timerPick', data)
    },
    getDataList() {

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

.detail_title_block {
  width: 25%;
  line-height: 20px;
  display: flex;
  text-align: left;
  flex-direction: column;
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

.fymx_wrap {
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  .header_top {
    text-align: center;
    margin: 15px 0;
  }
  .header_cen {
    width: 85%;
    margin: 0 auto;
  }
  .header_cen ul li {
    overflow: hidden;
    margin-top: 5px;
  }
  .header_cen ul li p {
    min-width: 150px;
    text-align: left;
    margin: 0;
    line-height: 25px;
    float: left;
    // margin-right: 5%;
    padding: 0;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content_top_t {
    overflow: hidden;
  }
  .content_top_t p {
    text-align: center;
  }
  .content_top_b {
    overflow: hidden;
  }

  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
    border-left: none;
  }
  table {
    border-collapse: collapse;
    width: 22%;
  }
  td {
    padding: 2px 5px;
  }
  .content_top_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_bot_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_top_b table {
    margin: 0 auto;
  }
  .content_bot_b table {
    width: 49%;
    margin: 0 auto;
  }
  .content_bot_top,
  .content_top_t {
    margin-bottom: 5px;
  }
}
</style>
