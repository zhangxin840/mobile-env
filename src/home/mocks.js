var browsers = {
  "meituan": {
    "name": "Meituan"
  },
  "dianping": {
    "name": "Dianping"
  },
  "weichat": {
    "name": "Weichat"
  },
  "qq": {
    "name": "QQ"
  },
  "default": {
    "name": "Default"
  }
};

var devices = {
  "iphone5": {
    "name": "iPhone5",
    "cases": {
      "meituan": {
        "probability": 1,
      },
      "dianping": {
        "probability": 0,
      }
    }
  },
  "iphone6": {
    "name": "iPhone6",
    "cases": {}
  },
  "xiaomi": {
    "name": "XiaoMi",
    "cases": {}
  },
  "huawei": {
    "name": "HuaWei",
    "cases": {}
  },
  "samsung": {
    "name": "Samsung",
    "cases": {}
  }
};

export {
  browsers, devices
}
