实现一个简易的商城微信小程序

## 项目结构

- `pages` 页面
  - `pages/index` 首页
    - 搜索栏
    - 轮播图
    - 分类网格
      - 分类有图标和名称：上衣、裤子、裙子、鞋子、包包、配饰等
      - 点击可进入分类详情页
    - 热门商品（商品列表）
      - 点击可进入商品详情页
  - `pages/product` 商品详情页
    - 商品图片
    - 商品名称
    - 商品价格
    - 商品描述
    - 商品购买数量
    - 商品加入购物车按钮和立即购买按钮
  - `pages/category` 分类页
    - 搜索栏
    - 分类列表（左侧）
    - 商品列表（右侧）
      - 点击可进入商品详情页
  - `pages/cart` 购物车页
  - `pages/order` 订单页
  - `pages/user` 用户页
- `components` 组件
- `utils` 工具类
- `app.js` 小程序逻辑
- `app.json` 小程序公共设置
- `app.wxss` 小程序公共样式表

## 首页设计

首页包含以下元素:

1. 搜索栏: 允许用户输入关键词搜索商品
2. 轮播图: 展示3-5张主要促销活动或热门商品的图片
3. 分类网格: 显示6-8个主要商品分类,每个分类包含图标和名称
4. 热门商品: 展示8-12个热门商品,包括商品图片、名称和价格

所有数据通过mock接口获取,实现了前后端分离的开发模式。

## 分类页设计

分类页面包含以下元素:

1. 搜索栏: 与首页相同
2. 分类列表: 左侧显示所有一级分类
3. 商品列表: 右侧显示选中分类下的商品,包括商品图片、名称和价格

## 数据模拟

使用自定义的mock.js实现数据模拟,主要模拟了以下接口:

- `/api/categories`: 获取商品分类
- `/api/banners`: 获取轮播图数据
- `/api/hot-products`: 获取热门商品
- `/api/category-products`: 获取分类商品列表

这种方法允许前端开发在后端API尚未完成的情况下进行开发和测试。

## 图片资源

所有图片使用Picsum提供的随机图片服务,格式如下:

https://picsum.photos/<width>/<height>?random=<id>

例如:
- 轮播图: https://picsum.photos/750/350?random=1
- 分类图标: https://picsum.photos/60/60?random=2
- 商品图片: https://picsum.photos/200/200?random=3

注意: 在实际项目中,需要将random参数替换为固定值,以确保每次加载相同的图片。

## 开发注意事项

1. 确保在app.js中正确初始化mock数据
2. 所有网络请求都会被mock.js拦截并返回模拟数据
3. 在实际开发中,需要替换mock数据为真实的后端API调用
4. 注意适配不同屏幕尺寸,确保页面在各种设备上都能正常显示
5. 实现下拉刷新和上拉加载更多功能,提高用户体验
6. 添加适当的加载状态和错误处理,增强应用的健壮性

## 新增功能

1. 添加购物车和立即购买弹框
   - 用户可以选择商品规格(SKU)
   - 用户可以调整购买数量
   - 根据用户的操作显示不同的按钮文字("加入购物车"或"立即购买")

2. 商品数据结构更新
   - 添加了 SKU 信息,包括不同电压版本的价格

## 待办事项

- 实现购物车功能
- 完善订单流程
- 添加用户认证和授权
- 优化UI/UX设计

## 如何运行

1. 克隆仓库
2. 使用微信开发者工具打开项目
3. 编译并运行

## 贡献

欢迎提交 Pull Requests 来改进这个项目!

## 许可证

MIT


