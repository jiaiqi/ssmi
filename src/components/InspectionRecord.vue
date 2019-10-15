<template>
  <div>
    <div class="tab_content">
      <div class="tab_content_title">住院检验报告</div>
      <div class="tab_content_main">
        <!-- <el-table :data="tabsData" border style="width: 100%">
          <el-table-column prop="ORGANIZATION_NAME" label="医院"></el-table-column>
          <el-table-column prop="DE01_00_014_00" label="住院号" width="180"></el-table-column>
          <el-table-column prop="AP06_00_048_02" label="检验时间"></el-table-column>
          <el-table-column prop="AP04_50_057_00" label="检验报告单号"></el-table-column>
          <el-table-column prop="DATAGENERATE_DATE" label="数据产生时间"></el-table-column>
          <el-table-column prop="handle" label="操作"></el-table-column>
        </el-table>-->
        <table v-if="tabsData&&tabsData.length>0">
          <tbody>
            <tr>
              <td>医院</td>
              <td>住院号</td>
              <td>检验报告单号</td>
              <td>检验时间</td>
              <td>检验报告名称</td>
              <td>数据产生时间</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item, index) in tabsData" :key="index">
              <td>{{item.ORGANIZATION_NAME}}</td>
              <td>{{item.DE01_00_014_00}}</td>
              <td>{{item.AP04_50_057_00}}</td>
              <td v-if="!item.AP06_00_048_02"></td>
              <td v-if="item.AP06_00_048_02">{{format_date(item.AP06_00_048_02)}}</td>
              <td>{{item.AP04_50_056_00}}</td>
              <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
              <td class="handle" @click="changeDialogVisible(item)">详情</td>
            </tr>
          </tbody>
        </table>
        <div class="nodata" v-else>暂无数据......</div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1000px">
      <div class="tab_detail">
        <div class="detail_title">
          <div class="detail_title_block">
            <span>姓名:{{detail.DE02_01_039_00}}</span>
            <span>性别:{{detail.AP02_01_102_01}}</span>
            <span>年龄:{{detail.DE02_01_032_00}}</span>
          </div>
          <div class="detail_title_block">
            <span>病人ID:</span>
            <span>科室:{{detail.AP08_10_059_02}}</span>
            <span>床号:{{detail.AP08_10_001_00}}</span>
          </div>
          <div class="detail_title_block">
            <span>标本种类:{{detail.AP04_50_054_00}}</span>
            <span>核收日期:{{format_date(detail.AP09_00_074_00)}}</span>
            <span>诊断:{{detail.DE05_01_025_00}}</span>
          </div>
          <div class="detail_title_block">
            <span>样本号:</span>
            <span>送检医生:{{detail.AP02_01_122_00}}</span>
            <span>备注:</span>
          </div>
        </div>
        <div class="detail_content">
          <div class="detail_content_title">
            <div class="title_left">
              <span>序号</span>
              <span>项目名称</span>
              <span>结果</span>
              <span>参考范围</span>
            </div>
            <!-- <div class="title_right">
              <span>序号</span>
              <span>项目名称</span>
              <span>结果</span>
              <span>单位</span>
              <span>参考范围</span>
            </div>-->
          </div>
          <div class="detail_content_content">
            <div class="detail_content_left">
              <div class="content_detail_item" v-for="(item,index) in this.detailData" :key="index">
                <div class>{{item.AP01_00_102_00}}</div>
                <div class>{{item.DE04_30_020_00}}</div>
                <div class>{{item.AP04_30_003_00}}</div>
                <div class>{{item.AP05_10_042_00}}</div>
              </div>
            </div>
            <!-- <div class="detail_content_right">
              <div class="content_detail_item">
                <div class></div>
                <div class></div>
                <div class></div>
                <div class></div>
                <div class></div>
              </div>
            </div>-->
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'InspectionRecord',
  data() {
    return {
      dialogVisible: false,
      detail: {},
      detailData: [],
      tabsData: []
    }
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zyjybg
    }, 300);
  },
  mounted() {

  },
  props: ["tabData", "elTabsData"],
  methods: {
    getData() {
      let req = {
        serviceName: "DI_HDI_LAREXADET_LIST_select",
        condition: [
          {
            colName: "AP01_00_024_00",
            value: this.detail.AP01_00_024_00,
            ruleType: "eq"
          }
        ]
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      axios({
        method: "POST",
        headers: {
          bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket")
        },
        url: url,
        data: req
      }).then(res => {
        console.log('res', res.data.data)
        this.detailData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    changeDialogVisible(item) {
      this.dialogVisible = true;
      this.detail = item;
      this.getData()
    },

  },

}
</script>

<style lang="scss" scoped>
.tab_content {
  .tab_content_title {
    font-weight: 700;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #7f7f7f;
    text-align: center;
  }
  .tab_content_main {
    table {
      border-spacing: 0px;
      width: 80%;
      margin: 0 auto;
      border-collapse: collapse;
      td {
        min-width: 100px;
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
.nodata {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 详情 */
.tab_detail {
  box-sizing: border-box;
  width: 900px;
  margin: 0 auto;
  min-height: 500px;
  .detail_title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
    .detail_title_block {
      width: 25%;
      line-height: 20px;
      display: flex;
      flex-direction: column;
    }
  }
  .detail_content_title {
    display: flex;
    width: 100%;
    .title_left {
      flex: 1;
      border-right: 1px #333 solid;
      border-left: 1px #333 solid;
      // border-top: 1px #333 solid;
      border-bottom: 1px #333 solid;
      display: flex;
      justify-content: space-around;
      span {
        flex: 0.8;
        text-align: left;
        text-indent: 20px;
        &:first-child {
          text-align: left;
          flex: 0.3;
        }
        &:nth-child(2) {
          text-align: left;
          flex: 1.5;
        }
      }
    }
    .title_right {
      border-top: 1px #333 solid;
      border-bottom: 1px #333 solid;
      display: flex;
      justify-content: space-around;
      flex: 1;
    }
  }
  .detail_content_content {
    width: 100%;
    // min-height: 300px;
    display: flex;
    justify-content: space-between;
    .detail_content_left {
      border-right: 1px #333 solid;
      border-left: 1px #333 solid;
      width: 100%;
      .content_detail_item {
        display: flex;
        border-bottom: 1px solid #333;
        div {
          flex: 0.8;
          text-align: left;
          text-indent: 20px;
          min-height: 35px;
          line-height: 35px;
          &:first-child {
            text-indent: 30px;
            text-align: left;
            flex: 0.3;
          }
          &:nth-child(2) {
            text-indent: 20px;
            text-align: left;
            flex: 1.5;
          }
        }
      }
    }
    .detail_content_right {
      width: 50%;
      .content_detail_item {
        display: flex;
        border-bottom: 1px solid #333;
        div {
          flex: 1;
          min-height: 35px;
        }
      }
    }
  }
}
</style>
