<template>
  <div class="wrap">
    <div class="main">
      <div class="title">
        <div class="title_left">累计服务次数</div>
        <div class="title_title">社保医疗一卡通融合平台</div>
        <div class="title_right">2018-08-31</div>
      </div>
      <header class="header">
        <div class="top">
          <div class="top_left">
            <div class="logo">
              <img src alt="图标" />
            </div>
            <div class="page_name">电子病历共享</div>
          </div>
          <div class="top_right">
            <span class="btn" @click="toManangerment">管理入口</span>
            <span class="btn">退出</span>
            <span class="btn">当前帐号</span>
          </div>
        </div>
        <div class="top_header">
          <div class="top_header_left">
            <div class="top_header_item">累计运行时间:</div>
            <div class="top_header_item">累计就诊次数:</div>
          </div>
          <div class="top_header_right">
            <div class="top_header_item">电子病历累计数据量:6558455/28</div>
            <div class="top_header_item">电子病历采集最新时间:2019-08-15</div>
          </div>
        </div>
        <div class="time_horizon">
          <div
            class="time_horizon_item btn"
            :class="{ active: checkDataType === 'day' }"
            @click="checkTimeHorizon('day')"
          >本日</div>
          <div
            class="time_horizon_item btn"
            :class="{ active: checkDataType === 'week' }"
            @click="checkTimeHorizon('week')"
          >本周</div>
          <div
            class="time_horizon_item btn"
            :class="{ active: checkDataType === 'month' }"
            @click="checkTimeHorizon('month')"
          >本月</div>
          <div
            class="time_horizon_item btn"
            :class="{ active: checkDataType === 'year' }"
            @click="checkTimeHorizon('year')"
          >本年</div>
          <div class="time_horizon_item btn">自定义时间段</div>
        </div>
      </header>
      <div class="content">
        <div class="content_left col-65">
          <div class="content_left_left xpanel-l-t">
            <div class="item_title_long">各医院电子病历查询次数柱状图（多级） X轴:天对应小时，周和月对应天，年对应月</div>
            <ve-histogram
              height="700px"
              :data="chartData01"
              :settings="chartSetting1"
              :textStyle="legend.textStyle"
              :legend="legend"
            ></ve-histogram>
          </div>
          <div class="content_left_right">
            <div class="content_left_right_item xpanel-l-b">
              <div class="item_title">各医院查询次数分布饼图</div>
              <ve-pie :data="pieData1.hospital" :legend="legend" :settings="pieSetting"></ve-pie>
            </div>
            <div class="content_left_right_item xpanel-l-b">
              <div class="item_title">身份验证成功/失败饼图</div>
              <ve-pie :data="pieData1.card" :legend="legend" :settings="pieSetting"></ve-pie>
            </div>
          </div>
        </div>
        <div class="content_right col-35" ref="hospital_swiper">
          <div class="content_right_content xpanel-l-t">
            <div class="item_title_long">电子病历查询次数柱状图</div>
            <swiper :options="swiperOptionTop" ref="swiperTop">
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
              <swiper-slide class="slide-1">
                <ve-histogram
                  :data="chartData02.hos1"
                  :textStyle="legend.textStyle"
                  :legend="legend"
                ></ve-histogram>
              </swiper-slide>
              <swiper-slide class="slide-2">
                <ve-histogram
                  :data="chartData02.hos2"
                  :textStyle="legend.textStyle"
                  :legend="legend"
                ></ve-histogram>
              </swiper-slide>
              <swiper-slide class="slide-3">
                <ve-histogram
                  :data="chartData02.hos3"
                  :textStyle="legend.textStyle"
                  :legend="legend"
                ></ve-histogram>
              </swiper-slide>
              <swiper-slide class="slide-4">
                <ve-histogram
                  :data="chartData02.hos4"
                  :textStyle="legend.textStyle"
                  :legend="legend"
                ></ve-histogram>
              </swiper-slide>
              <swiper-slide class="slide-5">
                <ve-histogram
                  :data="chartData02.hos5"
                  :textStyle="legend.textStyle"
                  :legend="legend"
                ></ve-histogram>
              </swiper-slide>
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            </swiper>
          </div>
          <div class="content_right_bottom">
            <div class="content_right_bottom_item xpanel-l-b">
              <span>累计就诊次数:56565次</span>
              <span>累计运行时间:3天12小时56分钟</span>
            </div>
            <div class="content_right_bottom_item">
              <div class="content_left_right_item xpanel-l-b" style="height: 260px;">
                <div class="item_title">身份验证成功/失败饼图</div>
                <ve-pie :data="pieData1.card" :settings="pieSetting3" :legend="legend"></ve-pie>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- page2 -->
      <div class="content">
        <div class="content_left col-65">
          <div class="content_left_left xpanel-l-t">
            <div class="item_title_long">整体电子病历采集数量折线图（分记录类型）/显示当前已采集到的数据库数据 天对应小时的不用显示，显示在周</div>
            <ve-line
              height="700px"
              :data="chartData01"
              :settings="chartSetting1"
              :textStyle="legend.textStyle"
              :legend="legend"
            ></ve-line>
          </div>
          <div class="content_left_right">
            <div class="content_left_right_item xpanel-l-b">
              <div class="item_title">各医院采集数量分布饼图</div>
              <ve-pie :data="pieData1.hospital" :legend="legend" :settings="pieSetting"></ve-pie>
            </div>
            <div class="content_left_right_item xpanel-l-b">
              <div class="item_title">各类型记录分布饼图</div>
              <ve-pie :data="pieData1.card" :legend="legend" :settings="pieSetting"></ve-pie>
            </div>
          </div>
        </div>
        <div class="content_right col-35" ref="hospital_swiper">
          <div class="content_right_content xpanel-l-t">
            <div class="item_title_long">电子病历采集数量折线图</div>
            <swiper :options="swiperOptionTop" ref="swiperTop">
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
              <swiper-slide class="slide-1">
                <ve-line :data="chartData02.hos1" :textStyle="legend.textStyle" :legend="legend"></ve-line>
              </swiper-slide>
              <swiper-slide class="slide-2">
                <ve-line :data="chartData02.hos2" :textStyle="legend.textStyle" :legend="legend"></ve-line>
              </swiper-slide>
              <swiper-slide class="slide-3">
                <ve-line :data="chartData02.hos3" :textStyle="legend.textStyle" :legend="legend"></ve-line>
              </swiper-slide>
              <swiper-slide class="slide-4">
                <ve-line :data="chartData02.hos4" :textStyle="legend.textStyle" :legend="legend"></ve-line>
              </swiper-slide>
              <swiper-slide class="slide-5">
                <ve-line :data="chartData02.hos5" :textStyle="legend.textStyle" :legend="legend"></ve-line>
              </swiper-slide>
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            </swiper>
          </div>
          <div class="content_right_bottom">
            <div class="content_right_bottom_item xpanel-l-b">
              <span>累计采集数量:56565次</span>
              <span>累计运行时间:3天12小时56分钟</span>
            </div>
            <div class="content_right_bottom_item">
              <div class="content_left_right_item xpanel-l-b" style="height: 260px;">
                <div class="item_title">各类型记录分布饼图</div>
                <ve-pie :data="pieData1.card" :settings="pieSetting3" :legend="legend"></ve-pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require('moment');
import axios from 'axios'
export default {
  methods: {
    checkTimeHorizon(time) {
      this.checkDataType = time;
      if (time === "day") {
        this.getData("by_hour_of_date")
      }
      else if (time === "week") {
        this.getData("by_date_of_week")
      }
      else if (time === "month") {
        this.getData("by_date_of_month")
      } else if (time === "year") {
        this.getData("by_month_of_year")
      }
      // this.chartData01 = this.data01[time];
      // this.pieData1.hospital = this.data02.hos_num_pie[time];
      // this.pieData1.card = this.data02.card_num_pie[time];
      // this.chartData02 = {
      //   hos1: this.hos_bar_data.hos1Data[time],
      //   hos2: this.hos_bar_data.hos2Data[time],
      //   hos3: this.hos_bar_data.hos3Data[time],
      //   hos4: this.hos_bar_data.hos4Data[time],
      //   hos5: this.hos_bar_data.hos5Data[time]
      // };
    },
    toManangerment() {
      let str = window.location.href
      let num = str.indexOf("?");
      str = str.substr(num + 1);
      console.log(str)
      window.location.href = '../../main/index.html?' + str
    },
    getData(groupBy) {
      console.log(groupBy)
      let req = {
        "serviceName": "srvemr_record_count_by_hour_select",
        "colNames": ["*"],
        "condition": [
          {
            "colName": "count_hour",
            "value": "2018-08-31",
            "ruleType": "[like]"
          }
        ],
        "group": [
          {
            "colName": "hospital",
            "type": "by"
          }, {
            "colName": "count_hour",
            "type": groupBy
          }, {
            "colName": "amount",
            "type": "sum"
          }
        ],
        "order": [
          {
            "colName": "count_hour",
            "orderType": "asc"
          }
        ]
      }
      if (groupBy === "by_month_of_year") {
        req.condition = [
          {
            "colName": "count_hour",
            "value": "2018",
            "ruleType": "[like]"
          }
        ]
      } else if (groupBy === 'by_date_of_week') {
        console.log(this.timeHorizon)
        req.condition = [
          {
            "colName": "count_hour",
            "value": this.timeHorizon.week_start,
            "ruleType": "ge"
          },
          {
            "colName": "count_hour",
            "value": this.timeHorizon.week_end,
            "ruleType": "le"
          }
        ]
        req.group = [
          {
            "colName": "hospital",
            "type": "by"
          }, {
            "colName": "count_hour",
            "type": "by_date"
          }, {
            "colName": "amount",
            "type": "sum"
          }
        ]
      } else if (groupBy === 'by_date_of_month') {
        req.condition = [
          {
            "colName": "count_hour",
            "value": this.timeHorizon.month_start,
            "ruleType": "ge"
          },
          {
            "colName": "count_hour",
            "value": this.timeHorizon.month_end,
            "ruleType": "le"
          }
        ]
        req.group = [
          {
            "colName": "hospital",
            "type": "by"
          }, {
            "colName": "count_hour",
            "type": "by_date"
          }, {
            "colName": "amount",
            "type": "sum"
          }
        ]
      }
      let url = this.getServiceUrl("select", req.serviceName, "emr")
      axios({ method: "POST", headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }, url: url, data: req })
        .then(res => {
          if (res.data.resultCode === "0011") {
            this.$router.push({ name: "login" })
          }
          console.log("返回数据", res.data.data)
          let data = res.data.data

          if (groupBy === "by_hour_of_date") {
            let hours = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
            let hos = ["rmyy", "zyyy", "fyyy", "bayy"]
            let rows = []
            // debugger
            for (var key in hours) {
              let dataMap = {}
              rows.push(dataMap)
              dataMap.时间 = hours[key]
              for (var i in hos) {
                for (var item of data) {
                  // console.log(item.hospital, hos[i], hours[key], dateHour)
                  let dateHour = item.count_hour.slice(11) // YYYY-MM-DD hh:mm:ss 截取从h开始后面所有字符（时分秒）
                  if (item.hospital === 'rmyy' && hours[key] === dateHour) {
                    dataMap.市人民医院 = item.amount // 市人民医院:amount
                  } else if (item.hospital === 'zyyy' && hours[key] === dateHour) {
                    dataMap.市中医医院 = item.amount // 市中医医院:amount
                  } else if (item.hospital === 'bayy' && hours[key] === dateHour) {
                    dataMap.博爱医院 = item.amount // 市中医医院:amount
                  } else if (item.hospital === 'fyyy' && hours[key] === dateHour) {
                    dataMap.市妇幼医院 = item.amount // 市妇幼医院:amount
                  }
                }
              }
            }
            let lineData = {
              columns: ['时间', '市人民医院', '市中医医院', '博爱医院', '市妇幼医院'],
              rows: rows
            }
            // this.lineData 
            this.chartData01 = lineData
            console.log(this.chartData01)
          } else if (groupBy === "by_month_of_year") {
            let month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            let hos = ["rmyy", "zyyy", "fyyy", "bayy"]
            let rows = []
            for (var key in month) {
              let dataMap = {}
              rows.push(dataMap)
              dataMap.时间 = month[key]
              for (var i in hos) {
                for (var item of data) {
                  // console.log(item.hospital, hos[i], month[key], dateHour)
                  let dateHour = item.count_hour.slice(5)
                  // console.log(dateHour)
                  if (item.hospital === 'rmyy' && month[key] == dateHour) {
                    dataMap.市人民医院 = item.amount
                  } else if (item.hospital === 'zyyy' && month[key] == dateHour) {
                    dataMap.市中医医院 = item.amount
                  } else if (item.hospital === 'bayy' && month[key] == dateHour) {
                    dataMap.博爱医院 = item.amount
                  } else if (item.hospital === 'fyyy' && month[key] == dateHour) {
                    dataMap.市妇幼医院 = item.amount
                  }
                }
              }
            }
            let lineData = {
              columns: ['时间', '市人民医院', '市中医医院', '博爱医院', '市妇幼医院'],
              rows: rows
            }
            // this.lineData 
            this.chartData01 = lineData
            console.log(this.chartData01)
          } else if (groupBy === "by_date_of_week") {
            let week = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
            let hos = ["rmyy", "zyyy", "fyyy", "bayy"]
            let rows = []
            for (let day in week) {
              let dataMap = {}
              rows.push(dataMap)
              dataMap.时间 = week[day]  // 时间:"周一"
              for (var i in hos) {
                for (var item of data) {
                  console.log(item) // 
                  let dateHour = item.count_hour
                  // console.log(item.hospital, hos[i], week[day], dateHour)
                  // console.log(dateHour)
                  if (item.hospital === 'rmyy') {
                    dataMap.市人民医院 = item.amount
                  } else if (item.hospital === 'zyyy') {
                    dataMap.市中医医院 = item.amount
                  } else if (item.hospital === 'bayy') {
                    dataMap.博爱医院 = item.amount
                  } else if (item.hospital === 'fyyy') {
                    dataMap.市妇幼医院 = item.amount
                  }
                }
              }
              console.log(dataMap)
            }

            let lineData = {
              columns: ['时间', '市人民医院', '市中医医院', '博爱医院', '市妇幼医院'],
              rows: rows
            }
            // this.lineData 
            // this.chartData01 = lineData
            console.log(lineData)

          } else if (groupBy === "by_date_of_month") {

          }
        }).catch(err => {
          console.log(err)
        })
    }
  },

  data() {
    this.pieSetting = {
      radius: 80,
      offsetY: 160
    };
    this.pieSetting3 = {
      radius: 50,
      offsetY: 120
    };
    return {
      timeHorizon: {
        today: "",
        day_of_week: "",
        week_start: "",
        week_end: "",
        month_start: "",
        month_end: ""
      },
      testData: {
        columns: ['counter_hour', '延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'],
        rows: [
          {
            count_hour: '',
            延大附院: '',
            市中医医院: '',
            市人民医院: '',
            市妇幼医院: '',
            宝塔区医院: ''
          }
        ]
      },
      date: null,
      checkDataType: 'day',
      legend: {
        textStyle: {
          color: '#fff'
        }
      },
      chartSetting1: {
        stack: { 用户: ['延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'] }
      },
      swiperOptionTop: {
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        loopedSlides: 5,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            let hospital_name = ['延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'];
            return `<span class="${className} swiper-pagination-bullet-custom">${hospital_name[index]}</span>`;
          }
        }
      },
      chartData01: {},
      pieData1: {
        hospital: {},
        card: {}
      },
      chartData02: {
        hos1: {},
        hos2: {},
        hos3: {},
        hos4: {},
        hos5: {}
      },
      data01: {
        day: {
          columns: ['counter_hour', '延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'],
          rows: [
            { counter_hour: '00:00', 延大附院: 5, 市中医医院: 2, 市人民医院: 1, 市妇幼医院: 0, 宝塔区医院: 0 },
            { counter_hour: '01:00', 延大附院: 3, 市中医医院: 5, 市人民医院: 2, 市妇幼医院: 2, 宝塔区医院: 0 },
            { counter_hour: '02:00', 延大附院: 1, 市中医医院: 0, 市人民医院: 0, 市妇幼医院: 1, 宝塔区医院: 0 },
            { counter_hour: '03:00', 延大附院: 2, 市中医医院: 0, 市人民医院: 1, 市妇幼医院: 0, 宝塔区医院: 1 },
            { counter_hour: '04:00', 延大附院: 2014, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { counter_hour: '05:00', 延大附院: 4975, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { counter_hour: '06:00', 延大附院: 4568, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '07:00', 延大附院: 3065, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '08:00', 延大附院: 2589, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '09:00', 延大附院: 4593, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '10:00', 延大附院: 5547, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '11:00', 延大附院: 714, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '12:00', 延大附院: 6520, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '13:00', 延大附院: 987, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { counter_hour: '14:00', 延大附院: 1982, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { counter_hour: '15:00', 延大附院: 2923, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { counter_hour: '16:00', 延大附院: 2456, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { counter_hour: '17:00', 延大附院: 3792, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { counter_hour: '18:00', 延大附院: 1514, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '19:00', 延大附院: 2436, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '20:00', 延大附院: 4125, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '21:00', 延大附院: 3201, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '22:00', 延大附院: 2514, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { counter_hour: '23:00', 延大附院: 1026, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 }
          ]
        },
        week: {
          columns: ['时间', '延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'],
          rows: [
            { 时间: '周一', 延大附院: 1234, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '周二', 延大附院: 5851, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { 时间: '周三', 延大附院: 4567, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { 时间: '周四', 延大附院: 4521, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { 时间: '周五', 延大附院: 2014, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { 时间: '周六', 延大附院: 4975, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { 时间: '周日', 延大附院: 4568, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 }
          ]
        },
        month: {
          columns: ['时间', '延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'],
          rows: [
            { 时间: '1号', 延大附院: 1234, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '2号', 延大附院: 5851, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { 时间: '3号', 延大附院: 4567, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { 时间: '4号', 延大附院: 4521, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { 时间: '5号', 延大附院: 2014, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { 时间: '6号', 延大附院: 4975, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { 时间: '7号', 延大附院: 4568, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '8号', 延大附院: 3065, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '9号', 延大附院: 2589, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '10号', 延大附院: 4593, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '11号', 延大附院: 5547, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '12号', 延大附院: 714, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '13号', 延大附院: 6520, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '14号', 延大附院: 987, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { 时间: '15号', 延大附院: 1982, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { 时间: '16号', 延大附院: 2923, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { 时间: '17号', 延大附院: 2456, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { 时间: '18号', 延大附院: 3792, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { 时间: '19号', 延大附院: 1514, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '20号', 延大附院: 2436, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '21号', 延大附院: 4125, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '22号', 延大附院: 3201, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '23号', 延大附院: 2514, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '24号', 延大附院: 1026, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '25号', 延大附院: 1234, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '26号', 延大附院: 5851, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { 时间: '27号', 延大附院: 4567, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { 时间: '28号', 延大附院: 4521, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { 时间: '29号', 延大附院: 2014, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { 时间: '30号', 延大附院: 4975, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 }
          ]
        },
        year: {
          columns: ['时间', '延大附院', '市中医医院', '市人民医院', '市妇幼医院', '宝塔区医院'],
          rows: [
            { 时间: '1月', 延大附院: 1234, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '2月', 延大附院: 5851, 市中医医院: 1093, 市人民医院: 1093, 市妇幼医院: 1093, 宝塔区医院: 0.32 },
            { 时间: '3月', 延大附院: 4567, 市中医医院: 3230, 市人民医院: 3230, 市妇幼医院: 3230, 宝塔区医院: 0.26 },
            { 时间: '4月', 延大附院: 4521, 市中医医院: 2623, 市人民医院: 2623, 市妇幼医院: 2623, 宝塔区医院: 0.76 },
            { 时间: '5月', 延大附院: 2014, 市中医医院: 1423, 市人民医院: 1423, 市妇幼医院: 1423, 宝塔区医院: 0.49 },
            { 时间: '6月', 延大附院: 4975, 市中医医院: 3492, 市人民医院: 3492, 市妇幼医院: 3492, 宝塔区医院: 0.323 },
            { 时间: '7月', 延大附院: 4568, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '8月', 延大附院: 3065, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '9月', 延大附院: 2589, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '10月', 延大附院: 4593, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '11月', 延大附院: 5547, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 },
            { 时间: '12月', 延大附院: 714, 市中医医院: 4293, 市人民医院: 4293, 市妇幼医院: 4293, 宝塔区医院: 0.78 }
          ]
        }
      },
      data02: {
        hos_num_pie: {
          day: {
            columns: ['医院', '访问用户'],
            rows: [
              { 医院: '延大附院', 访问用户: 154 },
              { 医院: '市中医医院', 访问用户: 33 },
              { 医院: '市人民医院', 访问用户: 75 },
              { 医院: '市妇幼医院', 访问用户: 27 },
              { 医院: '宝塔区医院', 访问用户: 19 }
            ]
          },
          week: {
            columns: ['医院', '访问用户'],
            rows: [
              { 医院: '延大附院', 访问用户: 515 },
              { 医院: '市中医医院', 访问用户: 365 },
              { 医院: '市人民医院', 访问用户: 245 },
              { 医院: '市妇幼医院', 访问用户: 147 },
              { 医院: '宝塔区医院', 访问用户: 251 }
            ]
          },
          month: {
            columns: ['医院', '访问用户'],
            rows: [
              { 医院: '延大附院', 访问用户: 2564 },
              { 医院: '市中医医院', 访问用户: 1859 },
              { 医院: '市人民医院', 访问用户: 1574 },
              { 医院: '市妇幼医院', 访问用户: 982 },
              { 医院: '宝塔区医院', 访问用户: 1664 }
            ]
          },
          year: {
            columns: ['医院', '访问用户'],
            rows: [
              { 医院: '延大附院', 访问用户: 15789 },
              { 医院: '市中医医院', 访问用户: 12658 },
              { 医院: '市人民医院', 访问用户: 6598 },
              { 医院: '市妇幼医院', 访问用户: 9852 },
              { 医院: '宝塔区医院', 访问用户: 5698 }
            ]
          }
        },
        card_num_pie: {
          day: {
            columns: ['卡类型', '访问用户'],
            rows: [{ 卡类型: '身份证', 访问用户: 235 }, { 卡类型: '社保卡', 访问用户: 123 }, { 卡类型: '就诊卡', 访问用户: 75 }]
          },
          week: {
            columns: ['卡类型', '访问用户'],
            rows: [{ 卡类型: '身份证', 访问用户: 1235 }, { 卡类型: '社保卡', 访问用户: 1123 }, { 卡类型: '就诊卡', 访问用户: 175 }]
          },
          month: {
            columns: ['卡类型', '访问用户'],
            rows: [{ 卡类型: '身份证', 访问用户: 7235 }, { 卡类型: '社保卡', 访问用户: 7123 }, { 卡类型: '就诊卡', 访问用户: 775 }]
          },
          year: {
            columns: ['卡类型', '访问用户'],
            rows: [{ 卡类型: '身份证', 访问用户: 11235 }, { 卡类型: '社保卡', 访问用户: 11123 }, { 卡类型: '就诊卡', 访问用户: 1175 }]
          }
        }
      },
      hos_bar_data: {
        hos1Data: {
          day: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '00:00', 访问次数: 5 },
              { 时间: '01:00', 访问次数: 0 },
              { 时间: '02:00', 访问次数: 4 },
              { 时间: '03:00', 访问次数: 1 },
              { 时间: '04:00', 访问次数: 5 },
              { 时间: '05:00', 访问次数: 2 },
              { 时间: '06:00', 访问次数: 8 },
              { 时间: '07:00', 访问次数: 11 },
              { 时间: '08:00', 访问次数: 2 },
              { 时间: '09:00', 访问次数: 15 },
              { 时间: '10:00', 访问次数: 27 },
              { 时间: '11:00', 访问次数: 10 },
              { 时间: '12:00', 访问次数: 39 },
              { 时间: '13:00', 访问次数: 26 },
              { 时间: '14:00', 访问次数: 15 },
              { 时间: '15:00', 访问次数: 23 },
              { 时间: '16:00', 访问次数: 17 },
              { 时间: '17:00', 访问次数: 28 },
              { 时间: '18:00', 访问次数: 33 },
              { 时间: '19:00', 访问次数: 14 },
              { 时间: '20:00', 访问次数: 25 },
              { 时间: '21:00', 访问次数: 7 },
              { 时间: '22:00', 访问次数: 19 },
              { 时间: '23:00', 访问次数: 23 }
            ]
          },
          week: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '周一', 访问次数: 150 },
              { 时间: '周二', 访问次数: 223 },
              { 时间: '周三', 访问次数: 351 },
              { 时间: '周四', 访问次数: 156 },
              { 时间: '周五', 访问次数: 257 },
              { 时间: '周六', 访问次数: 156 },
              { 时间: '周日', 访问次数: 125 }
            ]
          },
          month: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1号', 访问次数: 100 },
              { 时间: '2号', 访问次数: 154 },
              { 时间: '3号', 访问次数: 224 },
              { 时间: '4号', 访问次数: 123 },
              { 时间: '5号', 访问次数: 142 },
              { 时间: '6号', 访问次数: 56 },
              { 时间: '7号', 访问次数: 17 },
              { 时间: '8号', 访问次数: 250 },
              { 时间: '9号', 访问次数: 145 },
              { 时间: '10号', 访问次数: 154 },
              { 时间: '11号', 访问次数: 128 },
              { 时间: '12号', 访问次数: 66 },
              { 时间: '13号', 访问次数: 88 },
              { 时间: '14号', 访问次数: 174 },
              { 时间: '15号', 访问次数: 169 },
              { 时间: '16号', 访问次数: 104 },
              { 时间: '17号', 访问次数: 2456 },
              { 时间: '18号', 访问次数: 197 },
              { 时间: '19号', 访问次数: 264 },
              { 时间: '20号', 访问次数: 178 },
              { 时间: '21号', 访问次数: 256 },
              { 时间: '22号', 访问次数: 231 },
              { 时间: '23号', 访问次数: 125 },
              { 时间: '24号', 访问次数: 197 },
              { 时间: '25号', 访问次数: 66 },
              { 时间: '26号', 访问次数: 198 },
              { 时间: '27号', 访问次数: 23 },
              { 时间: '28号', 访问次数: 4521 },
              { 时间: '29号', 访问次数: 147 },
              { 时间: '30号', 访问次数: 155 }
            ]
          },
          year: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1月', 访问次数: 12461 },
              { 时间: '2月', 访问次数: 9654 },
              { 时间: '3月', 访问次数: 6956 },
              { 时间: '4月', 访问次数: 15854 },
              { 时间: '5月', 访问次数: 10136 },
              { 时间: '6月', 访问次数: 9456 },
              { 时间: '7月', 访问次数: 11240 },
              { 时间: '8月', 访问次数: 8946 },
              { 时间: '9月', 访问次数: 12364 },
              { 时间: '10月', 访问次数: 9986 },
              { 时间: '11月', 访问次数: 15123 },
              { 时间: '12月', 访问次数: 10298 }
            ]
          }
        },
        hos2Data: {
          day: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '00:00', 访问次数: 11 },
              { 时间: '01:00', 访问次数: 23 },
              { 时间: '02:00', 访问次数: 11 },
              { 时间: '03:00', 访问次数: 2 },
              { 时间: '04:00', 访问次数: 55 },
              { 时间: '05:00', 访问次数: 12 },
              { 时间: '06:00', 访问次数: 51 },
              { 时间: '07:00', 访问次数: 1 },
              { 时间: '08:00', 访问次数: 5 },
              { 时间: '09:00', 访问次数: 45 },
              { 时间: '10:00', 访问次数: 22 },
              { 时间: '11:00', 访问次数: 37 },
              { 时间: '12:00', 访问次数: 2 },
              { 时间: '13:00', 访问次数: 19 },
              { 时间: '14:00', 访问次数: 23 },
              { 时间: '15:00', 访问次数: 29 },
              { 时间: '16:00', 访问次数: 24 },
              { 时间: '17:00', 访问次数: 37 },
              { 时间: '18:00', 访问次数: 15 },
              { 时间: '19:00', 访问次数: 26 },
              { 时间: '20:00', 访问次数: 25 },
              { 时间: '21:00', 访问次数: 32 },
              { 时间: '22:00', 访问次数: 54 },
              { 时间: '23:00', 访问次数: 26 }
            ]
          },
          week: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '周一', 访问次数: 124 },
              { 时间: '周二', 访问次数: 551 },
              { 时间: '周三', 访问次数: 467 },
              { 时间: '周四', 访问次数: 421 },
              { 时间: '周五', 访问次数: 214 },
              { 时间: '周六', 访问次数: 375 },
              { 时间: '周日', 访问次数: 568 }
            ]
          },
          month: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1号', 访问次数: 1234 },
              { 时间: '2号', 访问次数: 851 },
              { 时间: '3号', 访问次数: 567 },
              { 时间: '4号', 访问次数: 521 },
              { 时间: '5号', 访问次数: 1014 },
              { 时间: '6号', 访问次数: 975 },
              { 时间: '7号', 访问次数: 468 },
              { 时间: '8号', 访问次数: 365 },
              { 时间: '9号', 访问次数: 289 },
              { 时间: '10号', 访问次数: 593 },
              { 时间: '11号', 访问次数: 547 },
              { 时间: '12号', 访问次数: 206 },
              { 时间: '13号', 访问次数: 620 },
              { 时间: '14号', 访问次数: 97 },
              { 时间: '15号', 访问次数: 92 },
              { 时间: '16号', 访问次数: 23 },
              { 时间: '17号', 访问次数: 256 },
              { 时间: '18号', 访问次数: 392 },
              { 时间: '19号', 访问次数: 14 },
              { 时间: '20号', 访问次数: 236 },
              { 时间: '21号', 访问次数: 45 },
              { 时间: '22号', 访问次数: 301 },
              { 时间: '23号', 访问次数: 214 },
              { 时间: '24号', 访问次数: 106 },
              { 时间: '25号', 访问次数: 124 },
              { 时间: '26号', 访问次数: 551 },
              { 时间: '27号', 访问次数: 567 },
              { 时间: '28号', 访问次数: 451 },
              { 时间: '29号', 访问次数: 204 },
              { 时间: '30号', 访问次数: 475 }
            ]
          },
          year: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1月', 访问次数: 5234 },
              { 时间: '2月', 访问次数: 7851 },
              { 时间: '3月', 访问次数: 3567 },
              { 时间: '4月', 访问次数: 6521 },
              { 时间: '5月', 访问次数: 3014 },
              { 时间: '6月', 访问次数: 9975 },
              { 时间: '7月', 访问次数: 4568 },
              { 时间: '8月', 访问次数: 6065 },
              { 时间: '9月', 访问次数: 8589 },
              { 时间: '10月', 访问次数: 4593 },
              { 时间: '11月', 访问次数: 5547 },
              { 时间: '12月', 访问次数: 7154 }
            ]
          }
        },
        hos3Data: {
          day: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '00:00', 访问次数: 1 },
              { 时间: '01:00', 访问次数: 5 },
              { 时间: '02:00', 访问次数: 4 },
              { 时间: '03:00', 访问次数: 4 },
              { 时间: '04:00', 访问次数: 2 },
              { 时间: '05:00', 访问次数: 4 },
              { 时间: '06:00', 访问次数: 4 },
              { 时间: '07:00', 访问次数: 3 },
              { 时间: '08:00', 访问次数: 2 },
              { 时间: '09:00', 访问次数: 4 },
              { 时间: '10:00', 访问次数: 5 },
              { 时间: '11:00', 访问次数: 7 },
              { 时间: '12:00', 访问次数: 6 },
              { 时间: '13:00', 访问次数: 9 },
              { 时间: '14:00', 访问次数: 1 },
              { 时间: '15:00', 访问次数: 2 },
              { 时间: '16:00', 访问次数: 2 },
              { 时间: '17:00', 访问次数: 3 },
              { 时间: '18:00', 访问次数: 1 },
              { 时间: '19:00', 访问次数: 2 },
              { 时间: '20:00', 访问次数: 4 },
              { 时间: '21:00', 访问次数: 3 },
              { 时间: '22:00', 访问次数: 2 },
              { 时间: '23:00', 访问次数: 1 }
            ]
          },
          week: {
            columns: ['时间', ' 访问次数'],
            rows: [
              { 时间: '周一', 访问次数: 154 },
              { 时间: '周二', 访问次数: 551 },
              { 时间: '周三', 访问次数: 457 },
              { 时间: '周四', 访问次数: 451 },
              { 时间: '周五', 访问次数: 254 },
              { 时间: '周六', 访问次数: 455 },
              { 时间: '周日', 访问次数: 458 }
            ]
          },
          month: {
            columns: ['时间', ' 访问次数'],
            rows: [
              { 时间: '1号', 访问次数: 234 },
              { 时间: '2号', 访问次数: 851 },
              { 时间: '3号', 访问次数: 567 },
              { 时间: '4号', 访问次数: 521 },
              { 时间: '5号', 访问次数: 14 },
              { 时间: '6号', 访问次数: 975 },
              { 时间: '7号', 访问次数: 568 },
              { 时间: '8号', 访问次数: 65 },
              { 时间: '9号', 访问次数: 589 },
              { 时间: '10号', 访问次数: 593 },
              { 时间: '11号', 访问次数: 547 },
              { 时间: '12号', 访问次数: 14 },
              { 时间: '13号', 访问次数: 520 },
              { 时间: '14号', 访问次数: 87 },
              { 时间: '15号', 访问次数: 982 },
              { 时间: '16号', 访问次数: 923 },
              { 时间: '17号', 访问次数: 456 },
              { 时间: '18号', 访问次数: 792 },
              { 时间: '19号', 访问次数: 514 },
              { 时间: '20号', 访问次数: 436 },
              { 时间: '21号', 访问次数: 125 },
              { 时间: '22号', 访问次数: 201 },
              { 时间: '23号', 访问次数: 514 },
              { 时间: '24号', 访问次数: 26 },
              { 时间: '25号', 访问次数: 234 },
              { 时间: '26号', 访问次数: 851 },
              { 时间: '27号', 访问次数: 567 },
              { 时间: '28号', 访问次数: 521 },
              { 时间: '29号', 访问次数: 14 },
              { 时间: '30号', 访问次数: 975 }
            ]
          },
          year: {
            columns: ['时间', ' 访问次数'],
            rows: [
              { 时间: '1月', 访问次数: 1234 },
              { 时间: '2月', 访问次数: 5251 },
              { 时间: '3月', 访问次数: 4267 },
              { 时间: '4月', 访问次数: 4221 },
              { 时间: '5月', 访问次数: 2214 },
              { 时间: '6月', 访问次数: 4275 },
              { 时间: '7月', 访问次数: 4268 },
              { 时间: '8月', 访问次数: 3265 },
              { 时间: '9月', 访问次数: 2289 },
              { 时间: '10月', 访问次数: 4293 },
              { 时间: '11月', 访问次数: 5247 },
              { 时间: '12月', 访问次数: 724 }
            ]
          }
        },
        hos4Data: {
          day: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '00:00', 访问次数: 1234 },
              { 时间: '01:00', 访问次数: 5851 },
              { 时间: '02:00', 访问次数: 4567 },
              { 时间: '03:00', 访问次数: 4521 },
              { 时间: '04:00', 访问次数: 2014 },
              { 时间: '05:00', 访问次数: 4975 },
              { 时间: '06:00', 访问次数: 4568 },
              { 时间: '07:00', 访问次数: 3065 },
              { 时间: '08:00', 访问次数: 2589 },
              { 时间: '09:00', 访问次数: 4593 },
              { 时间: '10:00', 访问次数: 5547 },
              { 时间: '11:00', 访问次数: 714 },
              { 时间: '12:00', 访问次数: 6520 },
              { 时间: '13:00', 访问次数: 987 },
              { 时间: '14:00', 访问次数: 1982 },
              { 时间: '15:00', 访问次数: 2923 },
              { 时间: '16:00', 访问次数: 2456 },
              { 时间: '17:00', 访问次数: 3792 },
              { 时间: '18:00', 访问次数: 1514 },
              { 时间: '19:00', 访问次数: 2436 },
              { 时间: '20:00', 访问次数: 4125 },
              { 时间: '21:00', 访问次数: 3201 },
              { 时间: '22:00', 访问次数: 2514 },
              { 时间: '23:00', 访问次数: 1026 }
            ]
          },
          week: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '周一', 访问次数: 1234 },
              { 时间: '周二', 访问次数: 5851 },
              { 时间: '周三', 访问次数: 4567 },
              { 时间: '周四', 访问次数: 4521 },
              { 时间: '周五', 访问次数: 2014 },
              { 时间: '周六', 访问次数: 4975 },
              { 时间: '周日', 访问次数: 4568 }
            ]
          },
          month: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1号', 访问次数: 1234 },
              { 时间: '2号', 访问次数: 5851 },
              { 时间: '3号', 访问次数: 4567 },
              { 时间: '4号', 访问次数: 4521 },
              { 时间: '5号', 访问次数: 2014 },
              { 时间: '6号', 访问次数: 4975 },
              { 时间: '7号', 访问次数: 4568 },
              { 时间: '8号', 访问次数: 3065 },
              { 时间: '9号', 访问次数: 2589 },
              { 时间: '10号', 访问次数: 4593 },
              { 时间: '11号', 访问次数: 5547 },
              { 时间: '12号', 访问次数: 714 },
              { 时间: '13号', 访问次数: 6520 },
              { 时间: '14号', 访问次数: 987 },
              { 时间: '15号', 访问次数: 1982 },
              { 时间: '16号', 访问次数: 2923 },
              { 时间: '17号', 访问次数: 2456 },
              { 时间: '18号', 访问次数: 3792 },
              { 时间: '19号', 访问次数: 1514 },
              { 时间: '20号', 访问次数: 2436 },
              { 时间: '21号', 访问次数: 4125 },
              { 时间: '22号', 访问次数: 3201 },
              { 时间: '23号', 访问次数: 2514 },
              { 时间: '24号', 访问次数: 1026 },
              { 时间: '25号', 访问次数: 1234 },
              { 时间: '26号', 访问次数: 5851 },
              { 时间: '27号', 访问次数: 4567 },
              { 时间: '28号', 访问次数: 4521 },
              { 时间: '29号', 访问次数: 2014 },
              { 时间: '30号', 访问次数: 4975 }
            ]
          },
          year: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1月', 访问次数: 1234 },
              { 时间: '2月', 访问次数: 5851 },
              { 时间: '3月', 访问次数: 4567 },
              { 时间: '4月', 访问次数: 4521 },
              { 时间: '5月', 访问次数: 2014 },
              { 时间: '6月', 访问次数: 4975 },
              { 时间: '7月', 访问次数: 4568 },
              { 时间: '8月', 访问次数: 3065 },
              { 时间: '9月', 访问次数: 2589 },
              { 时间: '10月', 访问次数: 4593 },
              { 时间: '11月', 访问次数: 5547 },
              { 时间: '12月', 访问次数: 714 }
            ]
          }
        },
        hos5Data: {
          day: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '00:00', 访问次数: 1234 },
              { 时间: '01:00', 访问次数: 5851 },
              { 时间: '02:00', 访问次数: 4567 },
              { 时间: '03:00', 访问次数: 4521 },
              { 时间: '04:00', 访问次数: 2014 },
              { 时间: '05:00', 访问次数: 4975 },
              { 时间: '06:00', 访问次数: 4568 },
              { 时间: '07:00', 访问次数: 3065 },
              { 时间: '08:00', 访问次数: 2589 },
              { 时间: '09:00', 访问次数: 4593 },
              { 时间: '10:00', 访问次数: 5547 },
              { 时间: '11:00', 访问次数: 714 },
              { 时间: '12:00', 访问次数: 6520 },
              { 时间: '13:00', 访问次数: 987 },
              { 时间: '14:00', 访问次数: 1982 },
              { 时间: '15:00', 访问次数: 2923 },
              { 时间: '16:00', 访问次数: 2456 },
              { 时间: '17:00', 访问次数: 3792 },
              { 时间: '18:00', 访问次数: 1514 },
              { 时间: '19:00', 访问次数: 2436 },
              { 时间: '20:00', 访问次数: 4125 },
              { 时间: '21:00', 访问次数: 3201 },
              { 时间: '22:00', 访问次数: 2514 },
              { 时间: '23:00', 访问次数: 1026 }
            ]
          },
          week: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '周一', 访问次数: 1234 },
              { 时间: '周二', 访问次数: 5851 },
              { 时间: '周三', 访问次数: 4567 },
              { 时间: '周四', 访问次数: 4521 },
              { 时间: '周五', 访问次数: 2014 },
              { 时间: '周六', 访问次数: 4975 },
              { 时间: '周日', 访问次数: 4568 }
            ]
          },
          month: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1号', 访问次数: 1234 },
              { 时间: '2号', 访问次数: 5851 },
              { 时间: '3号', 访问次数: 4567 },
              { 时间: '4号', 访问次数: 4521 },
              { 时间: '5号', 访问次数: 2014 },
              { 时间: '6号', 访问次数: 4975 },
              { 时间: '7号', 访问次数: 4568 },
              { 时间: '8号', 访问次数: 3065 },
              { 时间: '9号', 访问次数: 2589 },
              { 时间: '10号', 访问次数: 4593 },
              { 时间: '11号', 访问次数: 5547 },
              { 时间: '12号', 访问次数: 714 },
              { 时间: '13号', 访问次数: 6520 },
              { 时间: '14号', 访问次数: 987 },
              { 时间: '15号', 访问次数: 1982 },
              { 时间: '16号', 访问次数: 2923 },
              { 时间: '17号', 访问次数: 2456 },
              { 时间: '18号', 访问次数: 3792 },
              { 时间: '19号', 访问次数: 1514 },
              { 时间: '20号', 访问次数: 2436 },
              { 时间: '21号', 访问次数: 4125 },
              { 时间: '22号', 访问次数: 3201 },
              { 时间: '23号', 访问次数: 2514 },
              { 时间: '24号', 访问次数: 1026 },
              { 时间: '25号', 访问次数: 1234 },
              { 时间: '26号', 访问次数: 5851 },
              { 时间: '27号', 访问次数: 4567 },
              { 时间: '28号', 访问次数: 4521 },
              { 时间: '29号', 访问次数: 2014 },
              { 时间: '30号', 访问次数: 4975 }
            ]
          },
          year: {
            columns: ['时间', '访问次数'],
            rows: [
              { 时间: '1月', 访问次数: 1234 },
              { 时间: '2月', 访问次数: 5851 },
              { 时间: '3月', 访问次数: 4567 },
              { 时间: '4月', 访问次数: 4521 },
              { 时间: '5月', 访问次数: 2014 },
              { 时间: '6月', 访问次数: 4975 },
              { 时间: '7月', 访问次数: 4568 },
              { 时间: '8月', 访问次数: 3065 },
              { 时间: '9月', 访问次数: 2589 },
              { 时间: '10月', 访问次数: 4593 },
              { 时间: '11月', 访问次数: 5547 },
              { 时间: '12月', 访问次数: 714 }
            ]
          }
        }
      }
    };
  },
  computed: {
    swiperTop() {
      return this.$refs.swiperTop.swiper;
    }
  },
  created() {
    let date = "2018-8-31"
    let today = moment().format('YYYY-MM-DD') // moment获取本日日期
    let day_of_week = moment(date, 'YYYY-MM-DD').format('E'); // 计算指定日期是这周第几天
    let week_start = moment(date).subtract(day_of_week - 1, 'days').format('YYYY-MM-DD'); // 周一日期
    let week_end = moment(date).add(7 - day_of_week, 'days').format('YYYY-MM-DD'); // 周日日期
    let month_start = moment(date).startOf('month').format('YYYY-MM-DD'); // 本月第一天
    let month_end = moment(date).endOf('month').format('YYYY-MM-DD'); // 本月最后一天
    this.timeHorizon = {
      today: today,
      day_of_week: day_of_week,
      week_start: week_start,
      week_end: week_end,
      month_start: month_start,
      month_end: month_end
    }
    console.log(this.timeHorizon)
  },
  mounted() {
    // setInterval(() => {
    //   this.date = moment().format('YYYY-MM-DD  hh:mm:ss');
    // }, 1000);
    this.getData("by_hour_of_date")

    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiperTop);
    // this.swiper.slideTo(1, 1000, false);
    this.chartData01 = this.data01.day;
    this.pieData1.hospital = this.data02.hos_num_pie.day;
    this.pieData1.card = this.data02.card_num_pie.day;
    this.chartData02 = {
      hos1: this.hos_bar_data.hos1Data['day'],
      hos2: this.hos_bar_data.hos2Data['day'],
      hos3: this.hos_bar_data.hos3Data['day'],
      hos4: this.hos_bar_data.hos4Data['day'],
      hos5: this.hos_bar_data.hos5Data['day']
    };
  }
};
</script>

<style lang="scss" scoped>
* {
  overflow: hidden;
  color: rgba(255, 255, 255, 1);
}
.swiper-pagination-bullets /deep/ .swiper-pagination-bullet {
  width: 100px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  opacity: 1;
}
.swiper-pagination-bullets /deep/ .swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  top: 0;
  left: 0;
  width: 100%;
}
.active {
  background-color: rgba(255, 0, 0, 0.5);
}
.xpanel-l-t {
  background-image: url("../assets/images/panel-l-t.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.xpanel-l-b {
  background-image: url("../assets/images/panel-l-b.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.item_title {
  height: 30px;
  line-height: 30px;
  // font-size: 14px;
  // font-weight: 600;
  text-align: left;
  text-indent: 20px;
  background-image: url("../assets/images/title-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.item_title_long {
  height: 40px;
  line-height: 40px;
  // font-size: 14px;
  // font-weight: 600;
  text-indent: 34px;
  text-align: left;
  background-image: url("../assets/images/title-bg-long.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 40px;
  height: 40px;
  .title_left {
    flex: 1;
    text-align: left;
  }
  .title_title {
    font-size: 25px;
    color: coral;
    text-align: center;
    flex: 1;
  }
  .title_right {
    text-align: right;
    flex: 1;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  min-width: 1500px;
  background: #0b0f34;
  .main {
    background: url("../assets/images/wrapper-big-bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .header {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      margin: 0px 50px;
      height: 50px;
      .top_left {
        display: flex;
        width: 15%;
        line-height: 40px;
      }
      .top_right {
        display: flex;
        align-items: center;
        .btn {
          cursor: pointer;
          display: inline-block;
          height: 30px;
          width: 80px;
          line-height: 30px;
          &:nth-child(2) {
            width: 50px;
          }
          &:hover {
            background-color: rgba(255, 0, 0, 0.5);
          }
        }
      }
    }
    .top_header {
      display: flex;
      height: 50px;
      justify-content: space-between;
      box-sizing: border-box;
      margin: 0 50px;
      .top_header_left,
      .top_header_right {
        display: flex;
        width: 35%;
      }
      .top_header_item {
        width: auto;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        flex: 1;
        text-align: left;
        text-indent: 20px;
        &:first-child {
          margin-right: 20px;
        }
      }
    }
    .time_horizon {
      display: flex;
      box-sizing: border-box;
      margin: 5px 50px;
      .time_horizon_item {
        cursor: pointer;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:last-child {
          width: 150px;
          border-right: none;
        }
        &:hover {
          background-color: rgba(255, 0, 0, 0.5);
        }
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: 730px;
    margin: 0px 30px 15px;
    box-sizing: border-box;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 80px;
      margin-top: 40px;
    }
    .content_left {
      height: 100%;
      box-sizing: border-box;
      margin-right: 10px;
      display: flex;
      .content_left_left {
        box-sizing: border-box;
        width: 70%;
        margin: 0px 0px;
      }
      .content_left_right {
        margin: 0px 0px 0px 10px;
        width: 30%;
        display: flex;
        flex-direction: column;
        .content_left_right_item {
          overflow: hidden;
          &:first-child {
            margin-bottom: 10px;
          }
        }
      }
    }
    .content_right {
      position: relative;
      height: 100%;
      box-sizing: border-box;
      margin-left: 0px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 0px;
      .content_right_top {
        height: 30px;
        line-height: 30px;
        margin-bottom: 5px;
        text-align: left;
        text-indent: 20px;
        .swiper-slide {
          height: 100%;
          opacity: 0.4;
        }
        .swiper-slide-active {
          opacity: 1;
        }
      }
      .content_right_content {
        flex: 1;
        margin-bottom: 5px;
        .swiper-container {
          padding-top: 50px;
          height: 100%;
          position: relative;
        }
      }
      .content_right_bottom {
        height: 260px;
        display: flex;
        justify-content: space-between;
        .content_right_bottom_item {
          width: 49%;
          margin: 0px 0px 0px 0px;
          font-size: 14px;
          &:first-child {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            height: 150px;
            text-indent: 50px;
          }
        }
      }
    }
  }
}
.carousel-demo4 {
  position: relative;
  .h-carousel-pagination {
    margin-top: 10px;
    height: 100px;
    .h-carousel-pagination-item {
      float: left;
      width: 25%;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100px;
        opacity: 0.5;
        transition: 0.3s;
      }
      &.active,
      &:hover {
        > img {
          opacity: 1;
        }
      }
    }
  }
}
.col-65 {
  width: 65%;
}
.col-35 {
  width: 35%;
}
</style>
