"use strict";
const common_vendor = require("../../common/vendor.js");
const siteinfo = require("../../siteinfo.js");
const _sfc_main = {
  data() {
    return {
      list: [],
      total: 0,
      msg: "",
      url: siteinfo.siteinfo.fileBasePath
    };
  },
  onShow() {
    this.getCartTotal();
    this.init();
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
  },
  methods: {
    async init() {
      this.getData();
    },
    //得到数据
    async getData(param) {
      let http_url = "product_List";
      let http_data = {
        f: 1,
        pid: this.globalOption.id,
        mid: common_vendor.index.getStorageSync("mid")
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
      this.msg = hot.msg;
    },
    //加入购物车
    addcart() {
      let thiz = this;
      if (thiz.list[0].pstock <= 0) {
        common_vendor.index.showToast({
          title: "库存不足",
          icon: "none"
        });
        return;
      }
      let cart = common_vendor.index.getStorageSync("cart") || [];
      let index = cart.findIndex((item) => {
        return item.pid == thiz.globalOption.id;
      });
      if (index == -1) {
        cart.push({
          pid: thiz.globalOption.id,
          number: 1,
          title: thiz.list[0].pname,
          img: thiz.list[0].pimage,
          price: thiz.list[0].pprice,
          selected: 1
        });
      } else {
        cart[index].number++;
      }
      common_vendor.index.setStorageSync("cart", cart);
      this.getCartTotal();
      common_vendor.index.showToast({
        title: "加入购物车成功",
        icon: "none"
      });
    },
    //购物车菜品数量
    getCartTotal() {
      let cart = common_vendor.index.getStorageSync("cart") || [];
      let total = 0;
      cart.forEach((item) => {
        total += item.number;
      });
      this.total = total;
    },
    //收藏
    addfav() {
      let http_url = "collects_Add";
      let http_data = {
        pid: this.globalOption.id,
        mid: common_vendor.index.getStorageSync("mid")
      };
      let http_header = {};
      this.$http.get(http_url, http_data, http_header, "json");
      this.getData();
      common_vendor.index.showToast({
        title: "收藏成功",
        icon: "none"
      });
    },
    //跳转购物车
    gocart() {
      common_vendor.index.switchTab({
        url: "/pages/pro/cart"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: $data.url + item.pimage,
        b: common_vendor.t(item.pname),
        c: common_vendor.t(item.pspec),
        d: common_vendor.t(item.pprice),
        e: common_vendor.t(item.pstock),
        f: common_vendor.t(item.by1),
        g: item.pintro
      }, $data.msg == "0" ? {
        h: common_vendor.o((...args) => $options.addfav && $options.addfav(...args))
      } : {}, $data.msg == "1" ? {} : {});
    }),
    b: common_vendor.t($data.total),
    c: common_vendor.o((...args) => $options.gocart && $options.gocart(...args)),
    d: $data.msg == "0",
    e: $data.msg == "1",
    f: common_vendor.o((...args) => $options.addcart && $options.addcart(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-80d4ed2a"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/pro/proView.vue"]]);
wx.createPage(MiniProgramPage);
