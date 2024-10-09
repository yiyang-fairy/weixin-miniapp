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
      actionText: action === "buyNow" ? "立即购买" : "加入购物车",
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

  confirmAction: function () {
    if (!this.data.selectedSku) {
      wx.showToast({
        title: "请选择规格",
        icon: "none",
      });
      return;
    }

    // 这里可以添加加入购物车或立即购买的逻辑
    console.log("选中的SKU:", this.data.selectedSku);
    console.log("数量:", this.data.quantity);
    console.log("操作:", this.data.actionText);

    this.closePopup();
  },
});
