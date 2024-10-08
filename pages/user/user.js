Page({
  data: {
    userInfo: null,
  },
  onLoad: function () {
    this.getUserInfo();
  },
  getUserInfo: function () {
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
        });
      },
    });
  },
  navigateTo: function (e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: `/pages/${page}/${page}`,
    });
  },
});
