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
      let http_url = "notice_List";
      let http_data = {
        nid: this.globalOption.id
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ntitle),
        b: common_vendor.t(item.npubtime),
        c: item.ncontent,
        d: index,
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a3fb6b14"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/gg/View.vue"]]);
wx.createPage(MiniProgramPage);
