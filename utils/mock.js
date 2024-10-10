const cartItems = []; // 在文件顶部定义cartItems数组

// 辅助函数：从数组中随机选择n个元素
function getRandomElements(array, n) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const MockData = {
  "/api/banners": {
    data: [
      { id: 1, imageUrl: "https://picsum.photos/750/350?random=1" },
      { id: 2, imageUrl: "https://picsum.photos/750/350?random=2" },
      { id: 3, imageUrl: "https://picsum.photos/750/350?random=3" },
    ],
  },
  "/api/categories": {
    data: [
      {
        id: 1,
        name: "上装",
        icon: "https://picsum.photos/60/60?random=1",
        products: [
          {
            id: 101,
            name: "T恤",
            price: 59,
            image: "https://picsum.photos/200/200?random=101",
            description: "舒适透气的T恤，适合日常穿着。",
            stock: 100,
            sales: 50,
            skus: [
              { id: 1011, name: "白色 M", price: 59, stock: 30 },
              { id: 1012, name: "白色 L", price: 59, stock: 40 },
              { id: 1013, name: "黑色 M", price: 59, stock: 20 },
              { id: 1014, name: "黑色 L", price: 59, stock: 10 },
            ],
          },
          {
            id: 102,
            name: "衬衫",
            price: 99,
            image: "https://picsum.photos/200/200?random=102",
            description: "正式场合必备的衬衫，多种颜色可选。",
            stock: 80,
            sales: 30,
            skus: [
              { id: 1021, name: "白色 M", price: 99, stock: 20 },
              { id: 1022, name: "白色 L", price: 99, stock: 30 },
              { id: 1023, name: "蓝色 M", price: 99, stock: 15 },
              { id: 1024, name: "蓝色 L", price: 99, stock: 15 },
            ],
          },
          {
            id: 103,
            name: "卫衣",
            price: 129,
            image: "https://picsum.photos/200/200?random=103",
            description: "保暖舒适的卫衣，适合秋冬季节。",
            stock: 120,
            sales: 40,
            skus: [
              { id: 1031, name: "灰色 M", price: 129, stock: 40 },
              { id: 1032, name: "灰色 L", price: 129, stock: 30 },
              { id: 1033, name: "黑色 M", price: 129, stock: 30 },
              { id: 1034, name: "黑色 L", price: 129, stock: 20 },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "裤装",
        icon: "https://picsum.photos/60/60?random=2",
        products: [
          {
            id: 201,
            name: "牛仔裤",
            price: 129,
            image: "https://picsum.photos/200/200?random=201",
            description: "经典牛仔裤，耐穿又时尚。",
            stock: 150,
            sales: 80,
            skus: [
              { id: 2011, name: "浅蓝 28", price: 129, stock: 40 },
              { id: 2012, name: "浅蓝 30", price: 129, stock: 50 },
              { id: 2013, name: "深蓝 28", price: 129, stock: 30 },
              { id: 2014, name: "深蓝 30", price: 129, stock: 30 },
            ],
          },
          {
            id: 202,
            name: "休闲裤",
            price: 89,
            image: "https://picsum.photos/200/200?random=202",
            description: "舒适的休闲裤，适合各种场合。",
            stock: 120,
            sales: 60,
            skus: [
              { id: 2021, name: "卡其 M", price: 89, stock: 30 },
              { id: 2022, name: "卡其 L", price: 89, stock: 40 },
              { id: 2023, name: "黑色 M", price: 89, stock: 25 },
              { id: 2024, name: "黑色 L", price: 89, stock: 25 },
            ],
          },
          {
            id: 203,
            name: "运动裤",
            price: 79,
            image: "https://picsum.photos/200/200?random=203",
            description: "轻便透气的运动裤，适合运动和休闲。",
            stock: 100,
            sales: 45,
            skus: [
              { id: 2031, name: "灰色 M", price: 79, stock: 25 },
              { id: 2032, name: "灰色 L", price: 79, stock: 25 },
              { id: 2033, name: "黑色 M", price: 79, stock: 25 },
              { id: 2034, name: "黑色 L", price: 79, stock: 25 },
            ],
          },
        ],
      },
      {
        id: 3,
        name: "鞋子",
        icon: "https://picsum.photos/60/60?random=3",
        products: [
          {
            id: 301,
            name: "运动鞋",
            price: 199,
            image: "https://picsum.photos/200/200?random=301",
            description: "轻便舒适的运动鞋，适合日常运动和休闲。",
            stock: 200,
            sales: 100,
            skus: [
              { id: 3011, name: "白色 39", price: 199, stock: 50 },
              { id: 3012, name: "白色 40", price: 199, stock: 50 },
              { id: 3013, name: "黑色 39", price: 199, stock: 50 },
              { id: 3014, name: "黑色 40", price: 199, stock: 50 },
            ],
          },
          {
            id: 302,
            name: "皮鞋",
            price: 299,
            image: "https://picsum.photos/200/200?random=302",
            description: "正装皮鞋，适合正式场合。",
            stock: 100,
            sales: 30,
            skus: [
              { id: 3021, name: "黑色 39", price: 299, stock: 25 },
              { id: 3022, name: "黑色 40", price: 299, stock: 25 },
              { id: 3023, name: "棕色 39", price: 299, stock: 25 },
              { id: 3024, name: "棕色 40", price: 299, stock: 25 },
            ],
          },
          {
            id: 303,
            name: "凉鞋",
            price: 99,
            image: "https://picsum.photos/200/200?random=303",
            description: "夏季必备凉鞋，清凉舒适。",
            stock: 150,
            sales: 70,
            skus: [
              { id: 3031, name: "白色 38", price: 99, stock: 40 },
              { id: 3032, name: "白色 39", price: 99, stock: 40 },
              { id: 3033, name: "黑色 38", price: 99, stock: 35 },
              { id: 3034, name: "黑色 39", price: 99, stock: 35 },
            ],
          },
        ],
      },
      {
        id: 4,
        name: "配饰",
        icon: "https://picsum.photos/60/60?random=4",
        products: [
          {
            id: 401,
            name: "手表",
            price: 599,
            image: "https://picsum.photos/200/200?random=401",
            description: "精致时尚的手表，彰显个人品味。",
            stock: 80,
            sales: 20,
            skus: [
              { id: 4011, name: "黑色", price: 599, stock: 40 },
              { id: 4012, name: "银色", price: 599, stock: 40 },
            ],
          },
          {
            id: 402,
            name: "墨镜",
            price: 199,
            image: "https://picsum.photos/200/200?random=402",
            description: "时尚墨镜，防晒必备。",
            stock: 120,
            sales: 50,
            skus: [
              { id: 4021, name: "黑色", price: 199, stock: 60 },
              { id: 4022, name: "棕色", price: 199, stock: 60 },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "包包",
        icon: "https://picsum.photos/60/60?random=5",
        products: [
          {
            id: 501,
            name: "手提包",
            price: 399,
            image: "https://picsum.photos/200/200?random=501",
            description: "时尚手提包，容量大，适合日常使用。",
            stock: 100,
            sales: 40,
            skus: [
              { id: 5011, name: "黑色", price: 399, stock: 50 },
              { id: 5012, name: "棕色", price: 399, stock: 50 },
            ],
          },
          {
            id: 502,
            name: "双肩包",
            price: 299,
            image: "https://picsum.photos/200/200?random=502",
            description: "轻便实用的双肩包，适合旅行和日常使用。",
            stock: 150,
            sales: 70,
            skus: [
              { id: 5021, name: "黑色", price: 299, stock: 75 },
              { id: 5022, name: "蓝色", price: 299, stock: 75 },
            ],
          },
        ],
      },
      {
        id: 6,
        name: "运动",
        icon: "https://picsum.photos/60/60?random=6",
        products: [
          {
            id: 601,
            name: "瑜伽垫",
            price: 99,
            image: "https://picsum.photos/200/200?random=601",
            description: "高品质瑜伽垫，防滑耐用。",
            stock: 200,
            sales: 100,
            skus: [
              { id: 6011, name: "紫色", price: 99, stock: 100 },
              { id: 6012, name: "蓝色", price: 99, stock: 100 },
            ],
          },
          {
            id: 602,
            name: "哑铃",
            price: 129,
            image: "https://picsum.photos/200/200?random=602",
            description: "家庭健身必备哑铃，多种重量可选。",
            stock: 150,
            sales: 60,
            skus: [
              { id: 6021, name: "5kg", price: 129, stock: 50 },
              { id: 6022, name: "10kg", price: 159, stock: 50 },
              { id: 6023, name: "15kg", price: 189, stock: 50 },
            ],
          },
        ],
      },
      {
        id: 7,
        name: "美妆",
        icon: "https://picsum.photos/60/60?random=7",
        products: [
          {
            id: 701,
            name: "口红",
            price: 199,
            image: "https://picsum.photos/200/200?random=701",
            description: "持久显色的口红，多种色号可选。",
            stock: 300,
            sales: 150,
            skus: [
              { id: 7011, name: "正红色", price: 199, stock: 100 },
              { id: 7012, name: "豆沙色", price: 199, stock: 100 },
              { id: 7013, name: "珊瑚色", price: 199, stock: 100 },
            ],
          },
          {
            id: 702,
            name: "粉底液",
            price: 259,
            image: "https://picsum.photos/200/200?random=702",
            description: "轻薄持久的粉底液，自然遮瑕。",
            stock: 200,
            sales: 80,
            skus: [
              { id: 7021, name: "象牙白", price: 259, stock: 70 },
              { id: 7022, name: "自然色", price: 259, stock: 70 },
              { id: 7023, name: "暖肤色", price: 259, stock: 60 },
            ],
          },
        ],
      },
      {
        id: 8,
        name: "家居",
        icon: "https://picsum.photos/60/60?random=8",
        products: [
          {
            id: 801,
            name: "床上四件套",
            price: 299,
            image: "https://picsum.photos/200/200?random=801",
            description: "柔软舒适的床上四件套，多种花色可选。",
            stock: 100,
            sales: 30,
            skus: [
              { id: 8011, name: "蓝色条纹 1.5m", price: 299, stock: 25 },
              { id: 8012, name: "蓝色条纹 1.8m", price: 329, stock: 25 },
              { id: 8013, name: "粉色碎花 1.5m", price: 299, stock: 25 },
              { id: 8014, name: "粉色碎花 1.8m", price: 329, stock: 25 },
            ],
          },
          {
            id: 802,
            name: "抱枕",
            price: 59,
            image: "https://picsum.photos/200/200?random=802",
            description: "柔软舒适的抱枕，装饰居家必备。",
            stock: 200,
            sales: 100,
            skus: [
              { id: 8021, name: "蓝色 45x45cm", price: 59, stock: 50 },
              { id: 8023, name: "灰色 45x45cm", price: 59, stock: 50 },
              { id: 8024, name: "米色 45x45cm", price: 59, stock: 50 },
            ],
          },
        ],
      },
    ],
  },
  "/api/cart": {
    GET: () => {
      return { cartItems: cartItems };
    },
    POST: (params) => {
      const newItem = params;
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === newItem.id && item.skuName === newItem.skuName
      );
      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        cartItems.push(newItem);
      }
      return { success: true, message: "商品已添加到购物车" };
    },
  },
};

// 将所有分类的产品合并到一个数组中
MockData["/api/product"] = MockData["/api/categories"].data.reduce(
  (acc, category) => {
    return acc.concat(category.products);
  },
  []
);

// 从所有产品中随机选择5个作为热门产品
MockData["/api/hot-products"] = {
  data: getRandomElements(MockData["/api/product"], 5),
};

const mock = {
  handle: function (url, method, params) {
    const matchedUrl = Object.keys(MockData).find((mockUrl) =>
      url.includes(mockUrl)
    );
    // 处理商品详情
    if (url.startsWith("/api/product/")) {
      const productIdMatch = url.match(/id=(\d+)/);
      if (productIdMatch) {
        const productId = parseInt(productIdMatch[1]);
        const product = MockData["/api/product"].find(
          (p) => p.id === productId
        );
        return product ? product : null;
      }
    }
    if (matchedUrl) {
      if (
        typeof MockData[matchedUrl] === "object" &&
        MockData[matchedUrl][method]
      ) {
        return MockData[matchedUrl][method](params);
      }
      return MockData[matchedUrl];
    }

    return null;
  },
};

export default mock;

export function getCategories() {
  return MockData["/api/categories"].data;
}
