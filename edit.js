"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        uname: "",
        usex: "",
        age: "",
        uphone: "",
        uaddress: ""
      },
      initform: "",
      usex: "",
      usexLabel: "",
      usexDatas: [
        {
          label: "男",
          value: "男",
          checked: true
        },
        {
          label: "女",
          value: "女",
          checked: false
        }
      ]
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
      this.getUserInfo();
    },
    //得到用户信息
    async getUserInfo() {
      let params = {
        uid: common_vendor.index.getStorageSync("mid")
      };
      let res = await this.$http.get("members_List", params);
      this.form = res.data[0];
      this.usex = this.form.usex;
      this.usexLabel = this.form.usex;
      let usexDatas = this.usexDatas;
      let usexLabel = this.usexLabel;
      for (var i = 0, len = usexDatas.length; i < len; ++i) {
        usexDatas[i].checked = usexDatas[i].value == this.usex;
        if (usexDatas[i].checked) {
          usexLabel = usexDatas[i].label;
        }
      }
      this.usex = this.usex;
      this.usexLabel = usexLabel;
      this.usexDatas = usexDatas;
    },
    initResetform() {
      this.initform = JSON.stringify(this.form);
    },
    resetForm() {
      this.form = JSON.parse(this.initform);
    },
    async submitForm(e) {
      this.validateForm = this.Validate({
        uname: {
          required: {
            message: "请输入姓名"
          }
        },
        usex: {
          required: {
            message: "请选择性别"
          }
        },
        age: {
          required: {
            message: "请输入年龄"
          }
        },
        uphone: {
          required: {
            message: "请输入手机号码"
          }
        },
        uaddress: {
          required: {
            message: "请输入收货地址"
          }
        }
      });
      if (!this.validateForm.checkForm(e)) {
        let data = this.validateForm.errorList[0];
        this.showToast(data.msg, "none");
        return false;
      } else {
        let param = e.detail.value;
        let url = "members_Edit";
        param.uid = common_vendor.index.getStorageSync("mid");
        let header = {};
        await this.$http.post(url, param, header, "json");
        this.showToast("保存成功", "none", 1500);
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/index"
          });
        }, 1500);
      }
    },
    changeUsex(evt) {
      let usex = evt.detail.value;
      let usexDatas = this.usexDatas;
      let usexLabel = this.usexLabel;
      for (var i = 0, len = usexDatas.length; i < len; ++i) {
        usexDatas[i].checked = usexDatas[i].value == usex;
        if (usexDatas[i].checked) {
          usexLabel = usexDatas[i].label;
        }
      }
      this.usex = usex;
      this.usexLabel = usexLabel;
      this.usexDatas = usexDatas;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.uname,
    b: common_vendor.o(($event) => $data.form.uname = $event.detail.value),
    c: common_vendor.f($data.usexDatas, (radioitem, radioindex, i0) => {
      return {
        a: radioitem.value,
        b: radioitem.checked,
        c: common_vendor.n(radioitem.checked ? "checked" : ""),
        d: common_vendor.t(radioitem.label)
      };
    }),
    d: common_vendor.o((...args) => $options.changeUsex && $options.changeUsex(...args)),
    e: $data.usexLabel,
    f: _ctx.ageFocus,
    g: $data.form.age,
    h: common_vendor.o(($event) => $data.form.age = $event.detail.value),
    i: _ctx.uphoneFocus,
    j: $data.form.uphone,
    k: common_vendor.o(($event) => $data.form.uphone = $event.detail.value),
    l: _ctx.uaddressFocus,
    m: $data.form.uaddress,
    n: common_vendor.o(($event) => $data.form.uaddress = $event.detail.value),
    o: common_vendor.o((...args) => $options.submitForm && $options.submitForm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d4d01944"], ["__file", "I:/product/B3144TakeawayOrdering/TakeawayOrdering_uni/pages/my/edit.vue"]]);
wx.createPage(MiniProgramPage);
