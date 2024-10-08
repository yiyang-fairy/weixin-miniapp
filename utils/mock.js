const Mock = require("./mockjs.js");

const mockData = {
  "/api/banners": {
    data: [
      {
        id: 1,
        imageUrl: "https://picsum.photos/750/350?random=1",
      },
      {
        id: 2,
        imageUrl: "https://picsum.photos/750/350?random=2",
      },
      {
        id: 3,
        imageUrl: "https://picsum.photos/750/350?random=3",
      },
    ],
  },
  "/api/categories": {
    data: Mock.mock({
      "data|6-8": [
        {
          "id|+1": 1,
          "name|1": [
            "上衣",
            "裤子",
            "裙子",
            "鞋子",
            "包包",
            "配饰",
            "内衣",
            "家居",
          ],
          iconUrl: "https://picsum.photos/60/60?random=@id",
        },
      ],
    }),
  },
  "/api/hot-products": {
    data: Mock.mock({
      "data|8-12": [
        {
          "id|+1": 1,
          name: "@ctitle(5,10)",
          "price|50-500.2": 1,
          imageUrl: "https://picsum.photos/200/200?random=@id",
        },
      ],
    }),
  },
};

const mock = {
  mockData: function () {
    // 这个函数现在不需要做任何事情，因为我们直接返回预定义的数据
  },

  handle: function (url, method) {
    const matchedUrl = Object.keys(mockData).find((mockUrl) =>
      url.includes(mockUrl)
    );
    if (matchedUrl) {
      console.log(mockData[matchedUrl], "mockData[matchedUrl]");
      return mockData[matchedUrl];
    }
    return null;
  },
};

module.exports = mock;
