// <template>
//     <el-table
//     :data="tableData"
//     border
//     style="width: 100%">
//     <el-table-column
//         prop=""
//         label="地址"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="姓名"
//         width="120">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="性别"
//         width="120">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="地址"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="联系电话"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="图片"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="附件"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="部门"
//         width="200">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="创建日期"
//         width="150">
//     </el-table-column>
//     <el-table-column
//         prop=""
//         label="创建用户"
//         width="150">
//     </el-table-column>
//     <el-table-column
//         fixed="right"
//         label="操作"
//         width="100">
//     <template slot-scope="scope">
//         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
//         <el-button type="text" size="small">编辑</el-button>
//     </template>
//     </el-table-column>
// </el-table>

// </template>

// <script>

//     export default {
//     data() {
//         return {
//             tableData: [
//                 {
//                     date: '2016-05-03',
//                     name: '王小虎',
//                     province: '上海',
//                     city: '普陀区',
//                     address: '上海市普陀区金沙江路 1518 弄',
//                     zip: 200333
//                 }, 
//             ]
//         }
//     },

//     methods: {
//         getData() {  
//             let req = {
//                 colNames: ["*"],
//                 condition: [],
//                 order: [],
//                 page: {pageNo: 1, rownumber: 10},
//                 serviceName: "srvggcs_table_test_one_select"
//             }        
//             axios.post(
//                 'http://192.168.0.194:8101/ggfw/select/srvggcs_table_test_one_select',req, 
//                 { headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") } }
//             ).then(res => {
//                 console.log(res)
//             }).catch(err => {
//                 console.log(err)
//             })
//         },

//         handleClick(row) {
//         console.log(row);
//         }
//     },
//     mounted(){
//         this.getData()
//     }

    
// }

// </script>

// <style>

// </style>