Page({
  data: {
    cartItems: [],
    totalPrice: 0,
  },
  onShow: function () {
    this.fetchCartItems();
  },
  fetchCartItems: function () {
    wx.request({
      url: "/api/cart",
      success: (res) => {
        this.setData({
          cartItems: res.data.cartItems,
        });
        this.calculateTotal();
      },
    });
  },
  calculateTotal: function () {
    let total = 0;
    this.data.cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    this.setData({
      totalPrice: total.toFixed(2),
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
  },
  checkout: function () {
    wx.showToast({
      title: "结算功能待实现",
      icon: "none",
    });
  },
});
