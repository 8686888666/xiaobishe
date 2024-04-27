"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onShow() {
    this.setCurrentPage(this);
  },
  methods: {
    async init() {
      await this.initResetform();
    },
    getUserInfo2() {
      console.log("getUserInfo");
      common_vendor.index.getUserProfile({
        desc: "获取用户相关信息",
        success: async (res) => {
          let param = {
            unickname: res.userInfo.nickName,
            uavatar: res.userInfo.avatarUrl
          };
          let url = "members_Add";
          let header = {};
          try {
            let res2 = await this.$http.post(url, param, header, "json");
            common_vendor.index.setStorageSync("mid", res2);
            this.showToast("登录成功", "success");
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          } catch (error) {
            console.error(error);
            this.showToast("登录失败", "error");
          }
        },
        fail: (error) => {
          console.error(error);
          this.showToast("获取用户信息失败", "error");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.getUserInfo2 && $options.getUserInfo2(...args)),
    b: common_vendor.o((...args) => _ctx.submitForm && _ctx.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
