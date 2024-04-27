"use strict";
const siteinfo = require("../../siteinfo.js");
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: siteinfo.siteinfo.fileBasePath,
      list: [],
      list2: []
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
      this.getData();
    },
    async getData(param) {
      let http_url = "orders_List";
      let http_data = {
        f: 2,
        oid: this.globalOption.id
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
      this.list2 = hot.data2;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.oid),
        b: common_vendor.t(item.uname),
        c: common_vendor.t(item.uphone),
        d: common_vendor.t(item.uaddress),
        e: common_vendor.t(item.oremark),
        f: common_vendor.t(item.oamount),
        g: common_vendor.t(item.ostatus),
        h: common_vendor.t(item.osbtime)
      };
    }),
    b: common_vendor.f($data.list2, (item, index, i0) => {
      return {
        a: $data.url + item.by2,
        b: common_vendor.t(item.by1),
        c: common_vendor.t(item.opprice),
        d: common_vendor.t(item.opnum)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d6b203cf"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/odView.vue"]]);
wx.createPage(MiniProgramPage);
