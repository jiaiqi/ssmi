<template>
  <div class="tab_content">
    <div class="tab_content_title">门急诊诊疗手术记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>就诊流水号</td>
            <td>手术开始时间</td>
            <td>手术结束时间</td>
            <td>手术级别</td>
            <td>愈合等级</td>
            <td>机构名称</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{ item.DE01_00_010_00}}</td>
            <td v-if="item.AP06_00_393_00">{{format_date(item.AP06_00_393_00,1)}}</td>
            <td v-else-if="!item.AP06_00_393_00"></td>
            <td v-if="item.AP06_00_394_00">{{format_date(item.AP06_00_394_00,1)}}</td>
            <td v-else-if="!item.AP06_00_394_00"></td>
            <td>{{ item.AP06_00_367_00 }}</td>
            <td>{{ item.AP05_01_054_00 }}</td>
            <td>{{ item.ORGANIZATION_NAME }}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>

          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="tab_detail">
              <div class="title">门急诊诊疗手术记录</div>
              <div class="detail_title_header">
                <div class="detail_title_headerone">
                  <span>科别:</span>
                  <span>姓名: {{ detail.DE02_01_039_00 }}</span>
                  <span>性别: {{ detail.AP02_01_102_01 }}</span>
                  <span>年龄: {{ detail.DE02_01_032_00 }} 岁</span>
                </div>
                <div class="detail_title_headertwo">
                  <!-- <span class="span11">床号: {{ detail.AP02_01_102_01 }}</span> -->
                  <span class="span22">门诊号:</span>
                  <!-- <span class="span33">住院号:</span> -->
                </div>
                <!-- <span>医师:{{ detail.AP02_01_039_37 }}</span> -->
                <!-- <span>床号:</span>
                            <span
                              v-if="detail.DE06_00_095_00"
                            >就诊时间: {{ detail.DE06_00_095_00.slice(0,4)+'-'+detail.DE06_00_095_00.slice(4,6)+'-'+detail.DE06_00_095_00.slice(6,8) }}</span>
                <span>医院:{{detail.HOSPITAL_NAME}}</span>-->
              </div>
              <p>手术前诊断:</p>
              <p>手术后诊断:</p>
              <p>手术名称: {{ detail.DE06_00_094_00 }}</p>
              <div class="detail_title_dif">
                <p>手术日期: {{format_date(detail.DE06_00_095_00,1)}}</p>
                <p>手术历时:</p>
              </div>
              <div class="detail_title_dif">
                <p>手术者: {{ detail.AP02_01_039_37 }}</p>
                <p>助手:</p>
                <p>护士:</p>
              </div>
              <p>麻醉者: {{ detail.AP02_01_039_76 }}</p>
              <p>体位:</p>
              <p>手术经过: {{ detail.AP06_00_302_00 }}</p>
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
  name: "OutpatientOperationNote",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: [],
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.mzssjl
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) { this.detail = item; }

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
    text-align: center;
    color: #7f7f7f;
  }
}

/* 详情 */
.tab_detail {
  box-sizing: border-box;
  margin: 0 auto;
  min-height: 500px;
  background-color: #fff;
  max-width: 1000px;
  text-align: left;
  min-height: 100vh;
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
</style>
