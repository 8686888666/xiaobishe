"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: ""
    };
  },
  onLoad(options) {
    if (options && options.url) {
      this.url = decodeURIComponent(options.url);
    }
  },
  onShow() {
  },
  onShareAppMessage: function() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.url
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/webview.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
