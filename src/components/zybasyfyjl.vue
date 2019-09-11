<template>
  <div class="tab_content">
    <div class="tab_content_title">住院病案首页费用记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>住院号</td>
            <td>医院</td>
            <td>姓名</td>
            <td>住院科室</td>
            <td>支付日期</td>
            <td>机构名称</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE02_01_039_00}}</td>
            <td>{{item.AP08_10_026_11}}</td>
            <td v-if="item.AP07_00_027_00">{{format_date(item.AP07_00_027_00,1)}}</td>
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="fymx_wrap">
              <div class="header">
                <div class="header_top">
                  <h2>住院病案首页费用记录</h2>
                </div>
                <div class="header_cen">
                  <ul>
                    <li>
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
                        住院号:
                        <span>{{detail.DE01_00_014_00}}</span>
                      </p>

                      <p>
                        病案号:
                        <span>{{detail.DE01_00_004_00}}</span>
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
                  <div class="content_top_b">
                    <table>
                      <tr>
                        <td>住院科室</td>
                        <td>费用分类</td>
                        <td>发票编号</td>
                        <td>住院费用</td>
                        <td>支付方式</td>
                        <td>自付金额</td>
                      </tr>
                      <tr>
                        <td>{{detail.AP08_10_026_11}}</td>
                        <td>{{detail.AP07_00_029_00}}</td>
                        <td>{{detail.AP07_00_016_00}}</td>
                        <td>{{detail.DE07_00_010_00}}</td>
                        <td>{{detail.AP07_00_011_02}}</td>
                        <td>{{detail.DE07_00_001_00}}</td>
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
export default {
  name: "zybasyfyjl",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zybasy
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (itme) {
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
  .header_cen ul li {
    overflow: hidden;
    margin-top: 5px;
  }
  .header_cen ul li p {
    float: left;
    margin-right: 5%;
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

.title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
}
</style>
