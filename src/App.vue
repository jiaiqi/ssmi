<template>
  <div id="app">
    <router-view v-if="ready"></router-view>
  </div>
</template>

<script>
import momentLib from "moment";
import extjs from "./assets/dev_config/extjs.js";
import dummy from "./assets/dev_config/spa_mock.js";

export default {
  name: "App",

  data() {
    return {
      ready: false
    };
  },

  methods: {
    getExtjsCondition() {
      let path = this.$route.path;
      let tokens = path.split("/").filter(i => !!i);
      let pageType = tokens[0];
      let pageParam = tokens[1];
      if (path.startsWith("/procdetail") || path.startsWith("/startproc")) {
        pageType = "proc";
      }

      let pageTypes = ["list", "add", "detail", "update", "proc", "listproc"];
      if (pageTypes.includes(pageType)) {
        return [
          {
            colName: "page_type",
            ruleType: "eq",
            value: pageType
          },
          {
            colName: "page_param",
            ruleType: "eq",
            value: pageParam
          }
        ];
      }

      return null;
    },

    loadExtJs() {
      let condition = this.getExtjsCondition();
      if (!condition) {
        console.info("disable extjs");
        this.ready = true;
      } else {
        this.select("srvsys_page_extjs_select", condition).then(resp => {
          try {
            if (resp.data && resp.data.data && resp.data.data.length > 0) {
              let moment = momentLib;
              eval(resp.data.data[0].extjs);
            }
          } finally {
            // note: always last statement
            console.info("set ready = true");
            this.ready = true;
          }
        });
      }
    },

    // 开发调试extjs
    testExtJs() {
      // !!! mock test code !!!!
      new Promise(resolve => setTimeout(resolve, 200)).then(() => {
        console.info("extjs ajax request come back:");

        extjs.bind(this)();

        // note: always last statement
        console.info("set ready = true");
        this.ready = true;
      });
    }
  },

  beforeMount: function () {
    dummy.dummy();
    window.debugExtjs ? this.testExtJs() : this.loadExtJs();
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  background-color: rgba(238, 238, 238, 1);
}
.el-tabs__nav-scroll .el-tabs__nav /deep/ #tab-患者总览 span {
  display: none !important;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-timeline-item__wrapper {
  padding-left: 15px !important;
}
.el-dialog {
  max-height: 80vh;
  overflow-y: scroll;
}
.read_card_dialog{
  overflow: hidden!important;
}
.nodata {
  width: 100%;
  height: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-tabs--border-card /deep/ .el-tabs__content {
  height: 100%;
  /* overflow: visible; */
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
