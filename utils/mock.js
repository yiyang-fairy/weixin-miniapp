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
  "/api/product": [
    {
      id: 1,
      name: "新款智能手机",
      price: 3999,
      image: "https://picsum.photos/200/200?random=1",
      description:
        "这是一款性能强大的智能手机,采用最新的处理器和高清摄像头,为您带来极致的用户体验。支持5G网络,搭载先进的AI技术,让您的生活更智能、更便捷。",
      stock: 100,
      skus: [
        { id: 101, name: "黑色 128GB", price: 3999, stock: 50 },
        { id: 102, name: "白色 128GB", price: 3999, stock: 30 },
        { id: 103, name: "黑色 256GB", price: 4299, stock: 20 },
        { id: 104, name: "白色 256GB", price: 4299, stock: 0 },
      ],
    },
    {
      id: 2,
      name: "高性能笔记本电脑",
      price: 6999,
      image: "https://picsum.photos/200/200?random=2",
      description:
        "这款笔记本电脑配备高性能处理器和独立显卡,适合办公和游戏等多种场景。轻薄机身设计,长续航能力,是您工作和娱乐的理想选择。",
      stock: 50,
      skus: [
        { id: 201, name: "i5 8GB 512GB", price: 6999, stock: 20 },
        { id: 202, name: "i7 16GB 512GB", price: 7999, stock: 15 },
        { id: 203, name: "i7 16GB 1TB", price: 8499, stock: 15 },
      ],
    },
    {
      id: 3,
      name: "无线蓝牙耳机",
      price: 699,
      image: "https://picsum.photos/200/200?random=3",
      description:
        "这款无线蓝牙耳机音质出色,续航时间长,适合各种场景使用。采用先进的降噪技术,让您在嘈杂环境中也能享受清晰的音质。",
      stock: 200,
      skus: [
        { id: 301, name: "黑色", price: 699, stock: 100 },
        { id: 302, name: "白色", price: 699, stock: 100 },
      ],
    },
    {
      id: 4,
      name: "4K高清摄像机",
      price: 2999,
      image: "https://picsum.photos/200/200?random=4",
      description:
        "这款4K高清摄像机能够捕捉精彩瞬间,画质清晰细腻。配备光学防抖功能,即使在运动中也能拍摄稳定画面。适合旅游、vlog拍摄等多种用途。",
      stock: 80,
      skus: [
        { id: 401, name: "标准版", price: 2999, stock: 50 },
        { id: 402, name: "专业版", price: 3499, stock: 30 },
      ],
    },
    {
      id: 5,
      name: "智能手表",
      price: 1599,
      image: "https://picsum.photos/200/200?random=5",
      description:
        "这款智能手表集健康监测、运动追踪、通讯等功能于一体。防水设计,长续航能力,是您日常生活的智能助手。支持多种运动模式,帮助您更好地管理健康。",
      stock: 150,
      skus: [
        { id: 501, name: "运动版 黑色", price: 1599, stock: 50 },
        { id: 502, name: "运动版 白色", price: 1599, stock: 50 },
        { id: 503, name: "时尚版 金色", price: 1799, stock: 30 },
        { id: 504, name: "时尚版 银色", price: 1799, stock: 20 },
      ],
    },
  ],
};

const mock = {
  handle: function (url, method) {
    const matchedUrl = Object.keys(MockData).find((mockUrl) =>
      url.includes(mockUrl)
    );

    // 修改商品详情处理逻辑
    if (url.startsWith("/api/product/")) {
      const productIdMatch = url.match(/id=(\d+)/);
      if (productIdMatch) {
        const productId = parseInt(productIdMatch[1]);
        const product = MockData["/api/product"].find(
          (p) => p.id === productId
        );
        console.log(product, "product");
        return product ? product : null; // 直接返回找到的产品对象，而不是包装在 { data: product } 中
      }
    }
    if (matchedUrl) {
      return MockData[matchedUrl];
    }

    return null;
  },
};

export default mock;
