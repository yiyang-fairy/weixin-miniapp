const mock = require("./utils/mock.js");

App({
  onLaunch: function () {
    console.log("小程序启动");
    mock.mockData();
    console.log("Mock 数据初始化完成");
  },
  globalData: {
    userInfo: null,
  },
});
