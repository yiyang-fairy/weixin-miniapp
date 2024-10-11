Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    product: {
      type: Object,
      value: {},
    },
    actionText: {
      type: String,
      value: "加入购物车",
    },
  },

  data: {
    selectedSku: null,
    quantity: 1,
  },

  methods: {
    onClose() {
      this.setData({ show: false });
      this.triggerEvent("close");
    },

    stopPropagation() {
      // 阻止事件冒泡
    },

    onSkuSelect(e) {
      // 改名为 onSkuSelect
      const selectedSku = e.currentTarget.dataset.sku;
      console.log(selectedSku, "selectedSku");
      this.setData({ selectedSku });
    },

    onDecrease() {
      // 保持 onDecrease 不变
      if (this.data.quantity > 1) {
        this.setData({ quantity: this.data.quantity - 1 });
      }
    },

    onIncrease() {
      // 改名为 onIncrease
      this.setData({ quantity: this.data.quantity + 1 });
    },

    onQuantityInput(e) {
      // 改名为 onQuantityInput
      const quantity = parseInt(e.detail.value);
      if (!isNaN(quantity) && quantity > 0) {
        this.setData({ quantity });
      }
    },

    onConfirm() {
      if (
        !this.data.selectedSku &&
        this.properties.product.skus &&
        this.properties.product.skus.length > 0
      ) {
        wx.showToast({
          title: "请选择规格",
          icon: "none",
        });
        return;
      }

      console.log(this.data.selectedSku, "this.data.selectedSku");
      const a = this.data.selectedSku;
      this.triggerEvent("confirm", {
        product: this.properties.product,
        selectedSku: this.data.selectedSku,
        quantity: this.data.quantity,
      });

      this.onClose();
    },
  },
});
