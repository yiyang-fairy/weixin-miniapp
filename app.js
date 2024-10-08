const mock = require("./utils/mock.js");
mock.mockData();

App({
  onLaunch: function () {
    console.log("小程序启动");

    // 初始化 mock 数据
    mock.mockData();

    // 拦截微信请求，使用 mock 数据
    wx.request = (options) => {
      const response = mock.handle(options.url, options.method);
      if (response) {
        setTimeout(() => {
          options.success(response);
        }, 100); // 模拟网络延迟
      } else {
        console.warn("未找到匹配的 mock 数据:", options.url);
      }
    };
  },
  globalData: {
    userInfo: null,
  },
});
