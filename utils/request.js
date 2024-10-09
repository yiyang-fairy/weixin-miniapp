import mock from "./mock.js";

const request = (url, method = "GET", data = {}) => {
  return new Promise((resolve, reject) => {
    // 获取模拟数据
    const mockResult = mock.handle(url, method);

    // 模拟网络延迟
    setTimeout(() => {
      if (mockResult) {
        resolve(mockResult);
      } else {
        reject(new Error("未找到匹配的模拟数据"));
      }
    }, 500);
  });
};

export default request;
