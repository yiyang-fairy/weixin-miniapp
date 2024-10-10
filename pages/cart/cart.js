import request from "../../utils/request.js";

Page({
  data: {
    cartItems: [],
    totalPrice: 0,
    allSelected: false,
    selectedCount: 0,
  },

  onShow: function () {
    this.fetchCartItems();
  },

  fetchCartItems: function () {
    request("/api/cart", "GET")
      .then((res) => {
        if (res && res.cartItems) {
          const cartItems = res.cartItems.map((item) => ({
            ...item,
            selected: false,
          }));
          this.setData({
            cartItems: cartItems,
          });
          this.calculateTotal();
        } else {
          console.error("购物车数据格式不正确:", res);
        }
      })
      .catch((err) => {
        console.error("获取购物车数据失败:", err);
        wx.showToast({
          title: "获取购物车数据失败",
          icon: "none",
        });
      });
  },

  calculateTotal: function () {
    let total = 0;
    let selectedCount = 0;
    this.data.cartItems.forEach((item) => {
      if (item.selected && item.price && item.quantity) {
        total += item.price * item.quantity;
        selectedCount += item.quantity;
      }
    });
    this.setData({
      totalPrice: total.toFixed(2),
      selectedCount: selectedCount,
    });
  },

  changeQuantity: function (e) {
    const { id, type } = e.currentTarget.dataset;
    const cartItems = this.data.cartItems.map((item) => {
      if (item.id === id) {
        item.quantity =
          type === "increase"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);
      }
      return item;
    });
    this.setData({ cartItems });
    this.calculateTotal();
    // 这里可以添加更新后端购物车数据的逻辑
  },

  toggleSelect: function (e) {
    const { id } = e.currentTarget.dataset;
    const cartItems = this.data.cartItems.map((item) => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    this.setData({ cartItems });
    this.calculateTotal();
    this.updateAllSelected();
  },

  toggleSelectAll: function () {
    const allSelected = !this.data.allSelected;
    const cartItems = this.data.cartItems.map((item) => ({
      ...item,
      selected: allSelected,
    }));
    this.setData({
      allSelected: allSelected,
      cartItems: cartItems,
    });
    this.calculateTotal();
  },

  updateAllSelected: function () {
    const allSelected = this.data.cartItems.every((item) => item.selected);
    this.setData({ allSelected });
  },

  checkout: function () {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: "请选择要结算的商品",
        icon: "none",
      });
      return;
    }
    wx.showToast({
      title: "结算功能待实现",
      icon: "none",
    });
  },
});
