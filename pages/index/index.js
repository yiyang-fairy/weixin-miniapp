const app = getApp();

Page({
  data: {
    banners: [],
    categories: [],
    hotProducts: [],
  },

  onLoad: function () {
    this.fetchBanners();
    console.log(this.data.banners, "banners 111111");
    this.fetchCategories();
    this.fetchHotProducts();
  },

  fetchBanners: function () {
    console.log("开始获取轮播图数据");
    wx.request({
      url: "/api/banners",
      success: (res) => {
        console.log("轮播图数据获取成功:", res);
        if (res.data && res.data.data) {
          this.setData({ banners: res.data.data });
        } else {
          console.warn("轮播图数据格式不正确:", res.data);
        }
      },
      fail: (error) => {
        console.error("获取轮播图数据失败:", error);
      },
      complete: () => {
        console.log("轮播图数据请求完成");
      },
    });
  },

  fetchCategories: function () {
    wx.request({
      url: "/api/categories",
      success: (res) => {
        this.setData({ categories: res.data });
      },
    });
  },

  fetchHotProducts: function () {
    wx.request({
      url: "/api/hot-products",
      success: (res) => {
        this.setData({ hotProducts: res.data });
      },
    });
  },

  onSearchInput: function (e) {
    // 处理搜索输入
    console.log("搜索关键词:", e.detail.value);
  },

  onCategoryTap: function (e) {
    const categoryId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/category/category?id=${categoryId}`,
    });
  },

  onProductTap: function (e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${productId}`,
    });
  },
});
