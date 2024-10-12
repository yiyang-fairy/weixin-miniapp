import request from "../../utils/request.js";

const app = getApp();

Page({
  data: {
    categories: [],
    currentCategoryId: null,
    currentScrollId: "",
    showPopup: false,
    selectedProduct: null,
    quantity: 1,
    products: [],
    selectedCategoryIndex: 0,
  },

  onLoad: function () {
    this.fetchCategories();
  },

  onShow: function () {
    if (app.globalData.selectedCategory) {
      this.setData({
        selectedCategoryIndex: app.globalData.selectedCategory.index,
      });

      app.globalData.selectedCategory = null;
    }
  },

  fetchCategories: function () {
    request("/api/categories").then((res) => {
      const categories = res.data;
      this.setData({
        categories,
        currentCategoryId: categories[0].id,
      });
    });
  },

  changeCategory: function (e) {
    const categoryId = parseInt(e.currentTarget.dataset.id);

    this.setData(
      {
        currentCategoryId: categoryId,
        currentScrollId: `category-${categoryId}`,
      },
      () => {
        // 这个回调函数会在数据更新后执行
        console.log(this.data, "this.data after update");
      }
    );
  },

  onProductListScroll: function (e) {
    const query = wx.createSelectorQuery();
    query.selectAll(".category-products").boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      const categories = res[0];
      const scrollTop = res[1].scrollTop;
      const windowHeight = wx.getSystemInfoSync().windowHeight;

      let currentCategory = null;
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const nextCategory = categories[i + 1];

        if (
          category.top - 60 <= scrollTop &&
          (!nextCategory || nextCategory.top - 60 > scrollTop)
        ) {
          currentCategory = category;
          break;
        }
      }

      if (currentCategory) {
        const categoryId = parseInt(currentCategory.id.split("-")[1]);
        if (categoryId !== this.data.currentCategoryId) {
          this.setData({
            currentCategoryId: categoryId,
          });
        }
      }
    });
  },

  navigateToProduct: function (e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/product/product?id=${productId}`,
    });
  },

  showAddToCartPopup: function (e) {
    const product = e.currentTarget.dataset.product;
    this.setData({
      showPopup: true,
      selectedProduct: product,
      quantity: 1,
    });
  },

  hideAddToCartPopup: function () {
    this.setData({
      showPopup: false,
      selectedProduct: null,
      quantity: 1,
    });
  },

  decreaseQuantity: function () {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1,
      });
    }
  },

  increaseQuantity: function () {
    this.setData({
      quantity: this.data.quantity + 1,
    });
  },

  onQuantityInput: function (e) {
    const value = parseInt(e.detail.value);
    if (!isNaN(value) && value > 0) {
      this.setData({
        quantity: value,
      });
    }
  },

  addToCart: function (args) {
    const { product, selectedSku, quantity } = args;
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image,
      quantity: quantity,
      sku: {
        id: selectedSku.id,
        name: selectedSku.name,
        price: selectedSku.price,
      },
    };

    request("/api/cart", "POST", cartItem).then((res) => {
      if (res.success) {
        wx.showToast({
          title: "已加入购物车",
          icon: "success",
          duration: 2000,
        });
        this.hideAddToCartPopup();
      } else {
        wx.showToast({
          title: "加入购物车失败",
          icon: "none",
          duration: 2000,
        });
      }
    });
  },

  showPopup(e) {
    const product = e.currentTarget.dataset.product;
    this.setData({
      showPopup: true,
      selectedProduct: product,
    });
  },

  closePopup() {
    this.setData({ showPopup: false });
  },

  confirmAddToCart(e) {
    const { product, selectedSku, quantity } = e.detail;
    this.addToCart({ product, selectedSku, quantity });
  },
});
