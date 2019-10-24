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
    <div class="tab_content_title">入院记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>姓名</td>
            <!-- <td>职业类别</td> -->
            <!-- <td>籍贯</td> -->
            <td>住院入住科室</td>
            <td>入院日期</td>
            <td>住院症状</td>
            <!-- <td>住院医师</td> -->
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{ item.DE02_01_039_00 }}</td>
            <!-- <td>{{ item.AP02_01_103_00 }}</td> -->
            <!-- <td>{{ item.AP02_01_099_00 }}</td> -->
            <td>{{ item.AP08_10_026_01 }}</td>
            <td>{{format_date(item.DE06_00_092_00)}}</td>
            <td>{{ item.AP04_01_008_00 }}</td>
            <!-- <td>{{ item.AP02_01_039_50 }}</td> -->
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="nodata" v-else>暂无数据......</div>
    </div>
    <el-dialog title :visible.sync="dialogVisible" width="1000px">
      <div class="table_content">
        <div class="main_title"></div>
        <div class="header">
          <div class="header_item">住院科室:{{detail.AP08_10_026_01}}</div>
          <div class="header_item">
            <div class="header_item_top">入院记录</div>
            <div class="header_item_bottom"></div>
          </div>
          <div class="header_item">
            <div class="header_item_item">
              <span class="item_title">住院号:{{detail.DE01_00_014_00}}</span>
              <span class="item_text"></span>
            </div>
            <div class="header_item_item">
              <span class="item_title">影像号:</span>
              <span class="item_text"></span>
            </div>
            <div class="header_item_item">
              <span class="item_title">床 号:{{detail.AP08_10_001_00}}</span>
              <span class="item_text"></span>
            </div>
          </div>
        </div>
        <div class="top">
          <table class="table">
            <tr class="row">
              <td>姓名:</td>
              <td colspan="2">{{detail.DE02_01_039_00}}</td>
              <td>性别:</td>
              <td>{{detail.AP02_01_102_01}}</td>
              <td>年龄:</td>
              <td>{{detail.DE02_01_032_00}}</td>
              <td>婚姻:</td>
              <td>{{detail.AP02_01_006_00}}</td>
              <td>职业:</td>
              <td>{{detail.AP02_01_103_00}}</td>
            </tr>
            <tr>
              <td>籍贯:</td>
              <td colspan="4">{{detail.AP02_01_099_00}}</td>
              <td>住址:</td>
              <td colspan="5">{{detail.AP02_01_009_00}}</td>
            </tr>
            <tr>
              <td colspan="2">住院日期:</td>
              <td colspan="4" v-if="!detail.DE06_00_092_00"></td>
              <td colspan="4" v-if="detail.DE06_00_092_00">{{format_date(detail.DE06_00_092_00)}}</td>
              <!-- <td>出院:</td>
              <td colspan="2" v-if="detail.AP04_01_011_00">{{format_date(detail.AP04_01_011_00)}}</td>
              <td colspan="2" v-if="!detail.AP04_01_011_00"></td>-->
              <!-- <td colspan="5">住院天数 天</td> -->
              <td colspan="5"></td>
            </tr>
          </table>
          <div class="content">
            <div class="content_top">病史叙述者:{{detail.AP02_01_039_15}}</div>
            <div class="nth_record">
              <div class="nth_record_title">第 次入院记录</div>
              <div class="nth_record_content">
                <div class="content_item_title">主诉:</div>
                <div class="content_item_detail">{{detail.DE04_01_119_00}}</div>
                <div class="content_item_title">现病史:</div>
                <div class="content_item_detail">{{detail.DE02_10_071_00}}</div>
              </div>
            </div>
            <div class="nth_record">
              <div class="nth_record_title">体格检查</div>
              <div class="nth_record_content">
                <div class="content_item_title">住院后治疗及检查情况:</div>
                <div class="content_item_detail"></div>
                <div class="content_item_title">出院诊断:</div>
                <div class="content_item_detail"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BeHospitalizedRecord", props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: [],
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
      this.tabsData = this.elTabsData.zyryjl
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
        num: 2,
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
  .tab_content_title {
    font-size: 18px;
    font-weight: 600;
    color: #7f7f7f;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .tab_content_main {
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
  }
}
.text {
  margin: 0;
  padding: 0;
}

.main_title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}
.header {
  width: 100%;
  display: flex;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 3px solid #333;
}
.header_item {
  display: flex;
  flex: 1;
  text-align: left;
  flex-direction: column;
  justify-content: flex-end;
}
.header_item:nth-child(2) {
  text-align: center;
}
.header_item:nth-child(3) {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.header_item_top {
  font-size: 24px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
}
.header_item_item {
  display: flex;
}
.item_title {
  display: inline-block;
  letter-spacing: 3px;
  min-width: 150px;
}
.top {
  width: 100%;
  box-sizing: border-box;
}
/**table**/
.table {
  width: 100%;
  box-sizing: border-box;
  border-collapse: collapse;
}
.table .row {
  box-sizing: border-box;
}
.table td {
  border: 1px solid #333;
  box-sizing: border-box;
  text-indent: 10px;
}
/** content**/
.content {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 3px solid #333;
}
.content_top {
  text-align: right;
  height: 30px;
  line-height: 30px;
}
.nth_record_title {
  text-align: left;
  height: 25px;
  line-height: 25px;
}
.content_item_title {
  text-align: left;
  text-indent: 32px;
  font-weight: 600;
}
.content_item_detail {
  text-indent: 32px;
}
</style>
