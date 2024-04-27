"use strict";
const common_vendor = require("../../common/vendor.js");
const siteinfo = require("../../siteinfo.js");
const _sfc_main = {
  data() {
    return {
      url: siteinfo.siteinfo.fileBasePath,
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
      this.getData();
    },
    //得到数据
    async getData(param) {
      let http_url = "collects_List";
      let http_data = {
        mid: common_vendor.index.getStorageSync("mid")
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
    },
    //删除
    async del(item) {
      let thiz = this;
      common_vendor.index.showModal({
        title: "提示",
        content: "确认删除吗？",
        success: function(res) {
          if (res.confirm) {
            let http_data = {
              id: item.id
            };
            thiz.$http.get("collects_Del", http_data);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "none"
            });
            thiz.getData();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //详情
    async goview(item) {
      common_vendor.index.navigateTo({
        url: "/pages/pro/proView?id=" + item.pid
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: $data.url + item.by2,
        b: common_vendor.t(item.by1),
        c: common_vendor.t(item.cdate),
        d: common_vendor.o(($event) => $options.goview(item)),
        e: common_vendor.o(($event) => $options.del(item))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2cd11138"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/sc.vue"]]);
wx.createPage(MiniProgramPage);
