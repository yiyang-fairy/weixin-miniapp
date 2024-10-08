const MockData = {
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
    data: [
      { id: 1, name: "手机", icon: "icon-phone" },
      { id: 2, name: "电脑", icon: "icon-laptop" },
      { id: 3, name: "相机", icon: "icon-camera" },
      { id: 4, name: "耳机", icon: "icon-headphones" },
      { id: 5, name: "智能家居", icon: "icon-smart-home" },
      { id: 6, name: "配件", icon: "icon-accessories" },
      { id: 7, name: "游戏机", icon: "icon-gamepad" },
      { id: 8, name: "更多", icon: "icon-more" },
    ],
  },
  "/api/hot-products": {
    data: [
      {
        id: 1,
        name: "新款智能手机",
        price: 3999,
        image: "https://picsum.photos/200/200?random=1",
        sales: 1000,
      },
      {
        id: 2,
        name: "高性能笔记本电脑",
        price: 6999,
        image: "https://picsum.photos/200/200?random=2",
        sales: 500,
      },
      {
        id: 3,
        name: "无线蓝牙耳机",
        price: 999,
        image: "https://picsum.photos/200/200?random=3",
        sales: 2000,
      },
      {
        id: 4,
        name: "4K高清摄像机",
        price: 2999,
        image: "https://picsum.photos/200/200?random=4",
        sales: 300,
      },
      {
        id: 5,
        name: "智能手表",
        price: 1599,
        image: "https://picsum.photos/200/200?random=5",
        sales: 800,
      },
    ],
  },
};
const mock = {
  handle: function (url, method) {
    const matchedUrl = Object.keys(MockData).find((mockUrl) =>
      url.includes(mockUrl)
    );
    if (matchedUrl) {
      console.log(MockData[matchedUrl], "mockData[matchedUrl]");
      return MockData[matchedUrl];
    }
    return null;
  },
};

export default mock;
