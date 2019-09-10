<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗临床路径记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>姓名</td>
            <td>年龄</td>
            <td>入径日期</td>
            <td>入径诊断</td>
            <td>机构名称</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{item.DE02_01_039_00}}</td>
            <td>{{item.DE02_01_032_00}}</td>
            <td v-if="item.AP05_01_212_00">{{format_date(item.AP05_01_212_00)}}</td>
            <td>{{item.AP05_01_215_02}}</td>
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <!-- <div class="lclj_wrap">
              <div class="header">
                <div class="header_top">
                  <p>住院诊疗临床路径记录</p>
                </div>

                <div class="header_cen">
                  <p>姓名:{{detail.DE02_01_039_00}}</p>
                  <p>病案号:{{detail.DE01_00_004_00}}</p>
                </div>
              </div>
              <div class="content">
                <table>
                  <tr>
                    <td>住院号</td>
                    <td>入径时间</td>
                    <td>出径时间</td>
                    <td>住院病区</td>
                    <td>住院床号</td>
                    <td>住院科室</td>
                    <td>责任护士</td>
                  </tr>
                  <tr>
                    <td>{{detail.DE01_00_014_00}}</td>
                    <td
                      v-if="detail.AP05_01_212_00"
                    >{{detail.AP05_01_212_00.slice(0,4)+'-'+detail.AP05_01_212_00.slice(4,6)+'-'+detail.AP05_01_212_00.slice(6,8)}}</td>
                    <td v-else-if="!detail.AP05_01_212_00"></td>
                    <td
                      v-if="detail.AP05_01_214_00"
                    >{{detail.AP05_01_214_00.slice(0,4)+'-'+detail.AP05_01_214_00.slice(4,6)+'-'+detail.AP05_01_214_00.slice(6,8)}}</td>
                    <td v-else-if="!detail.AP05_01_214_00"></td>
                    <td>{{detail.AP08_10_002_00}}</td>
                    <td>{{detail.AP08_10_001_00}}</td>
                    <td>{{detail.AP08_10_026_11}}</td>
                    <td>{{detail.AP02_01_105_00}}</td>
                  </tr>
                </table>
              </div>
            </div>-->
            <div class="zyzllclj">
              <div class="title"></div>
              <div class="little_title">临床路径</div>
              <div class="bcjl_head">
                <div>姓名: {{ detail.DE02_01_039_00 }}</div>
                <div>性别: {{ detail.AP02_01_102_01 }}</div>
                <div>年龄: {{ detail.DE02_01_032_00 }}</div>
                <div>科室: {{ detail.AP08_10_026_11 }}</div>
                <div>住院号: {{ detail.DE01_00_014_00 }}</div>
              </div>
              <div class="bcjl_content">
                <div class="date_time"></div>
                <!-- <div class="content_title">首次病程记录</div> -->
                <div
                  class="main_content"
                >患者 {{ detail.DE02_01_039_00 }} ，{{ detail.DE02_01_032_00 }} 岁，因 {{ detail.AP05_01_215_02}} 于 {{format_date(detail.AP05_01_212_00)}} 入院</div>
                <div class="main_content">
                  <p>病例特点:</p>
                  <p class="content_text"></p>
                  <p>初步诊断:</p>
                  <p class="content_text">{{ detail.AP05_01_215_02}}</p>
                  <p>诊断依据</p>
                  <p class="content_text"></p>
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
  name: "zyzllcljjl", props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zylclj
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
      }
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
.zyzllclj {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .little_title {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .bcjl_head {
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #333;
    div {
      flex: 1;
      min-width: 150px;
      text-align: left;
    }
  }
  .bcjl_content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 300px;
    .date_time {
      position: absolute;
      left: 20px;
    }
    .content_title {
      width: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 50px;
    }
    .main_content {
      text-align: left;
      p {
        font-weight: 600;
      }
      .content_text {
        min-height: 50px;
        font-weight: 100;
      }
    }
  }
}
.lclj_wrap {
  .header {
    width: 90%;
    box-shadow: none;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
  }
  .header_top {
    font-weight: 700;
    margin-top: 15px;
    font-size: 22px;
    width: 100%;
    text-align: center;
  }
  .content {
    box-sizing: border-box;
    min-height: 200px;
    table {
      margin-bottom: 50px;
    }
  }
}
</style>
