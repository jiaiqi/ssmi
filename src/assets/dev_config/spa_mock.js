// !!! mock !!!!
let dummy = {
  server_cfg: {
    back_server_protocol: "http",
    // back_server_ip: "10.120.119.37",
    back_server_ip: "192.168.0.192",
    back_server_port: "8101"
    //  开发server_cfg
  },
  dummy:function (){
    if (!top.pathConfig) {
      top.pathConfig = {}
      top.pathConfig.application = "market";  //  开发app
    }
  }
}



export default dummy
// export default function dummy() {

// }
