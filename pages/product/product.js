import request from "../../utils/request.js";

Page({
  data: {
    product: null,
    showPopup: false,
    selectedSku: null,
    quantity: 1,
    actionText: "加入购物车",
    activeTab: "intro", // 添加默认激活的标签
  },

  onLoad: function (options) {
    console.log(options, "options");
    const productId = options.id;
    this.getProductDetail(productId);
  },

  getProductDetail: function (productId) {
    request(`/api/product/id=${productId}`, "GET")
      .then((res) => {
        console.log(res, "res");
        this.setData({
          product: res,
        });
      })
      .catch((err) => {
        console.error("获取商品详情失败:", err);
        wx.showToast({
          title: "获取商品信息失败",
          icon: "none",
        });
      });
  },

  selectSku: function (e) {
    const sku = e.currentTarget.dataset.sku;
    this.setData({
      selectedSku: sku,
    });
  },

  showPopup: function (e) {
    const action = e.currentTarget.dataset.action;
    this.setData({
      showPopup: true,
      actionText: action === "addToCart" ? "加入购物车" : "立即购买",
    });
  },

  closePopup: function () {
    this.setData({
      showPopup: false,
      selectedSku: null,
      quantity: 1,
    });
  },

  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab,
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
    const maxStock = this.data.selectedSku
      ? this.data.selectedSku.stock
      : this.data.product.stock;
    if (this.data.quantity < maxStock) {
      this.setData({
        quantity: this.data.quantity + 1,
      });
    }
  },

  updateQuantity: function (e) {
    const value = parseInt(e.detail.value);
    const maxStock = this.data.selectedSku
      ? this.data.selectedSku.stock
      : this.data.product.stock;
    if (value >= 1 && value <= maxStock) {
      this.setData({
        quantity: value,
      });
    }
  },

  confirmAction: function (args) {
    const { product, selectedSku, quantity } = args.detail;

    // 根据 actionText 执行相应的操作
    if (this.data.actionText === "加入购物车") {
      // 执行加入购物车的逻辑
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

      // 调用添加到购物车的API
      request("/api/cart", "POST", cartItem)
        .then((res) => {
          wx.showToast({
            title: "已加入购物车",
            icon: "success",
            duration: 2000,
          });
        })
        .catch((err) => {
          console.error("加入购物车失败:", err);
          wx.showToast({
            title: "加入购物车失败",
            icon: "none",
            duration: 2000,
          });
        });
    } else {
      // 执行立即购买的逻辑
      const orderItem = {
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

      // 将订单信息存储到本地,然后跳转到订单确认页面
      wx.setStorageSync("currentOrder", [orderItem]);
      wx.navigateTo({
        url: "/pages/order/confirm/confirm",
      });
    }
    this.closePopup();
  },
});
