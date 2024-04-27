"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: []
    };
  },
  onShow() {
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
      await this.getData();
    },
    async getData(param) {
      let http_url = "orders_List";
      let http_data = {
        mid: common_vendor.index.getStorageSync("mid")
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
    },
    goview(item) {
      common_vendor.index.navigateTo({
        url: "/pages/my/odView?id=" + item.oid
      });
    },
    async queren(item) {
      let thiz = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定配送完成了吗？",
        success: async function(res) {
          if (res.confirm) {
            let http_url = "orders_Edit";
            let http_data = {
              oid: item.oid,
              ostatus: "已完成"
            };
            let http_header = {};
            await thiz.$http.get(
              http_url,
              http_data,
              http_header,
              "json"
            );
            common_vendor.index.showToast({
              title: "确认收货成功",
              icon: "none",
              duration: 2e3
            });
            thiz.getData();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.oid),
        b: common_vendor.t(item.uname),
        c: common_vendor.t(item.oamount),
        d: common_vendor.t(item.ostatus),
        e: common_vendor.t(item.osubtime),
        f: common_vendor.o(($event) => $options.goview(item)),
        g: item.ostatus == "配送中"
      }, item.ostatus == "配送中" ? {
        h: common_vendor.o(($event) => $options.queren(item))
      } : {});
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6caf19f2"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/od.vue"]]);
wx.createPage(MiniProgramPage);
