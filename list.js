"use strict";
const common_vendor = require("../../common/vendor.js");
const siteinfo = require("../../siteinfo.js");
const _sfc_main = {
  data() {
    return {
      tabsDatas: [],
      tabsLeft: 0,
      tabsWidth: 0,
      tabsItemWidth: 0,
      tabsIndex: 0,
      list: [],
      cid: 0,
      k: "",
      url: siteinfo.siteinfo.fileBasePath
    };
  },
  onShow() {
    this.k = common_vendor.index.getStorageSync("k") == null ? "" : common_vendor.index.getStorageSync("k");
    common_vendor.index.removeStorageSync("k");
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
      await this.getTypes();
      await this.getData();
    },
    //得到类别
    async getTypes() {
      let http_url = "category_List";
      let http_data = {};
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.tabsDatas = hot.data;
    },
    //得到数据
    async getData(param) {
      let http_url = "product_List";
      let http_data = {
        cid: this.cid,
        condition: " and pname like '%" + this.k + "%' and pstatus='上架' "
      };
      let http_header = {};
      let hot = await this.$http.get(http_url, http_data, http_header, "json");
      this.list = hot.data;
      this.k = "";
    },
    changeTabs(evt) {
      let { index } = evt.currentTarget.dataset;
      if (index == this.tabsIndex)
        return;
      this.setData({
        tabsIndex: index,
        cid: this.tabsDatas[index].cid
      });
      this.getData();
    },
    navigateTo2(item) {
      common_vendor.index.navigateTo({
        url: "/pages/pro/proView?id=" + item.pid
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabsDatas, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: common_vendor.n(item.icon)
      } : {}, {
        c: common_vendor.t(item.cname),
        d: common_vendor.n(index == $data.tabsIndex ? "  cur text-green " : ""),
        e: index,
        f: common_vendor.o((...args) => $options.changeTabs && $options.changeTabs(...args), index),
        g: index
      });
    }),
    b: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: $data.url + item.pimage,
        b: common_vendor.t(item.pname),
        c: common_vendor.t(item.pprice),
        d: index,
        e: index,
        f: common_vendor.o(($event) => $options.navigateTo2(item), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c02f323"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/pro/list.vue"]]);
wx.createPage(MiniProgramPage);
