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
  },
  methods: {
    async init() {
      this.getUserInfo();
    },
    //得到用户信息
    async getUserInfo() {
      let params = {
        uid: common_vendor.index.getStorageSync("mid")
      };
      let res = await this.$http.get("members_List", params);
      this.list = res.data;
    },
    //退出登录
    async tuichu() {
      let res = await common_vendor.index.showModal({
        title: "提示",
        content: "确定退出登录吗？"
      });
      if (!res.confirm) {
        return;
      }
      common_vendor.index.removeStorageSync("mid");
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _component_diy_navbar = common_vendor.resolveComponent("diy-navbar");
  _component_diy_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      isFixed: true,
      bgColor: ""
    }),
    b: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.uavatar,
        b: common_vendor.t(item.unickname),
        c: common_vendor.t(item.uphone)
      };
    }),
    c: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    d: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    e: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args)),
    f: common_vendor.o((...args) => $options.tuichu && $options.tuichu(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f97bc692"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
