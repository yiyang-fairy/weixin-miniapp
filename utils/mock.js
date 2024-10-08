const Mock = require("./mockjs.js");

const mockData = {
  "/api/categories": {
    "categories|10": [
      {
        "id|+1": 1,
        name: "@ctitle(2, 4)",
        icon: "https://picsum.photos/80/80?random=@id",
      },
    ],
  },
  "/api/ad-banner": {
    adBanner: {
      id: 1,
      image: "https://picsum.photos/750/300?random=1",
    },
  },
  "/api/hot-products": {
    "hotProducts|4": [
      {
        "id|+1": 1,
        name: "@ctitle(5, 10)",
        price: "@float(50, 1000, 2, 2)",
        image: "https://picsum.photos/300/300?random=@id",
      },
    ],
  },
};

const mock = {
  mockData: function () {
    Object.keys(mockData).forEach((url) => {
      Mock.mock(url, "get", mockData[url]);
    });
  },

  handle: function (url, method) {
    for (const mockUrl in mockData) {
      if (url.includes(mockUrl)) {
        return Mock.mock(mockData[mockUrl]);
      }
    }
    return null;
  },
};

Mock.mock("/api/banners", "get", {
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
});

Mock.mock("/api/categories", "get", {
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
});

Mock.mock("/api/hot-products", "get", {
  "data|8-12": [
    {
      "id|+1": 1,
      name: "@ctitle(5,10)",
      "price|50-500.2": 1,
      imageUrl: "https://picsum.photos/200/200?random=@id",
    },
  ],
});

Mock.mock(/\/api\/category-products/, "get", {
  "data|10-20": [
    {
      "id|+1": 1,
      name: "@ctitle(5,10)",
      "price|50-500.2": 1,
      imageUrl: "https://picsum.photos/200/200?random=@id",
    },
  ],
});

module.exports = mock;
