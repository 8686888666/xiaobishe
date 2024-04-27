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
      await this.getLyList();
    },
    //留言列表
    async getLyList() {
      let param = {
        mid: common_vendor.index.getStorageSync("mid")
      };
      let res = await this.$http.post("board_List", param, {}, "json");
      this.list = res.data;
    },
    //删除留言
    async deleteinf(id) {
      console.log(id);
      let res = await common_vendor.index.showModal({
        title: "提示",
        content: "确定删除吗？"
      });
      if (!res.confirm) {
        return;
      }
      let param = {
        boardid: id
      };
      await this.$http.post("board_Del", param, {}, "json");
      common_vendor.index.showToast({
        title: "删除成功",
        icon: "none"
      });
      this.getLyList();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.addtime),
        b: common_vendor.o(($event) => $options.deleteinf(item.boardid)),
        c: common_vendor.t(item.bdetail),
        d: item.answer != null
      }, item.answer != null ? {
        e: common_vendor.t(item.answer)
      } : {});
    }),
    b: common_vendor.o((...args) => _ctx.navigateTo && _ctx.navigateTo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b8a231a2"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/ly.vue"]]);
wx.createPage(MiniProgramPage);
