Page({
  data: {
    categories: [],
    currentCategory: null,
    products: [],
  },
  onLoad: function () {
    this.fetchCategories();
  },
  fetchCategories: function () {
    wx.request({
      url: "/api/categories",
      success: (res) => {
        this.setData({
          categories: res.data.categories,
          currentCategory: res.data.categories[0],
        });
        this.fetchProducts(res.data.categories[0].id);
      },
    });
  },
  fetchProducts: function (categoryId) {
    wx.request({
      url: `/api/products?categoryId=${categoryId}`,
      success: (res) => {
        this.setData({
          products: res.data.products,
        });
      },
    });
  },
  changeCategory: function (e) {
    const categoryId = e.currentTarget.dataset.id;
    const category = this.data.categories.find((c) => c.id === categoryId);
    this.setData({
      currentCategory: category,
    });
    this.fetchProducts(categoryId);
  },
});
