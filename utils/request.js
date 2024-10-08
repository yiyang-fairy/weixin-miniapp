import mock from "./mock.js";

const request = (url, method = "GET", data = {}) => {
  return new Promise((resolve, reject) => {
    const response = mock.handle(url, method);
    if (response) {
      setTimeout(() => {
        resolve(response);
      }, 100); // 模拟网络延迟
    } else {
      console.warn(`未找到匹配的 mock 数据: ${url}`);
      reject(new Error("未找到匹配的 mock 数据"));
    }
  });
};

export default request;
