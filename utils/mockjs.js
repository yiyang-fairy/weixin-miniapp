const Mock = {
  _mocked: {},

  mock: function (url, method, template) {
    this._mocked[url] = { method, template };
  },

  Random: {
    image: () => "https://picsum.photos/300/200",
    ctitle: (min, max) =>
      `标题${Math.floor(Math.random() * (max - min + 1)) + min}`,
    float: (min, max, dmin, dmax) =>
      (Math.random() * (max - min) + min).toFixed(dmax),
  },
};

module.exports = Mock;
