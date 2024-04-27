"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        bdetail: ""
      }
    };
  },
  onShow() {
    this.setCurrentPage(this);
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
    this.init();
  },
  methods: {
    async init() {
      await this.initResetform();
    },
    initResetform() {
      this.initform = JSON.stringify(this.form);
    },
    resetForm() {
      this.form = JSON.parse(this.initform);
    },
    async submitForm(e) {
      this.validateForm = this.Validate({
        bdetail: {
          required: {
            message: "不能为空哟"
          }
        }
      });
      if (!this.validateForm.checkForm(e)) {
        let data = this.validateForm.errorList[0];
        this.showToast(data.msg, "none");
        return false;
      } else {
        let param = e.detail.value;
        let url = "board_Add";
        param.mid = common_vendor.index.getStorageSync("mid");
        let header = {};
        await this.$http.post(url, param, header, "json");
        common_vendor.index.showToast({
          title: "提交成功，请等待管理员的回复！",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 1e3);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.bdetail,
    b: common_vendor.o(($event) => $data.form.bdetail = $event.detail.value),
    c: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d06bd022"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/lyAdd.vue"]]);
wx.createPage(MiniProgramPage);
