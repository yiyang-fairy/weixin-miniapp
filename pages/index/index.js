import request from "../../utils/request.js";

const app = getApp();

Page({
  data: {
    banners: [],
    categories: [],
    hotProducts: [],
  },

  onLoad: function () {
    this.fetchBanners();
    this.fetchCategories();
    this.fetchHotProducts();
  },

  fetchBanners: function () {
    request("/api/banners")
      .then((res) => {
        if (res.data) {
          this.setData({ banners: res.data });
        } else {
          console.warn("轮播图数据格式不正确:", res);
        }
      })
      .catch((error) => {
        console.error("获取轮播图数据失败:", error);
      });
  },

  fetchCategories: function () {
    request("/api/categories")
      .then((res) => {
        if (res.data) {
          console.log(res.data, "分类数据");
          // 假设API返回的数据中包含icon字段
          this.setData({ categories: res.data });
        }
      })
      .catch((error) => {
        console.error("获取分类数据失败:", error);
      });
  },

  fetchHotProducts: function () {
    request("/api/hot-products")
      .then((res) => {
        if (res.data) {
          this.setData({ hotProducts: res.data });
        }
      })
      .catch((error) => {
        console.error("获取热门商品数据失败:", error);
      });
  },

  onSearchInput: function (e) {
    // 处理搜索输入
    console.log("搜索关键词:", e.detail.value);
  },

  onCategoryTap: function (e) {
    const categoryId = e.currentTarget.dataset.id;
    const categoryIndex = e.currentTarget.dataset.index;

    console.log("Category tapped:", categoryId, categoryIndex);

    // 将分类信息存储在全局数据中
    app.globalData.selectedCategory = {
      id: categoryId,
      index: categoryIndex,
    };

    console.log("Global data set:", app.globalData.selectedCategory);

    wx.switchTab({
      url: "/pages/category/category",
    });
  },

  onProductTap: function (e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${productId}`,
    });
  },
});
