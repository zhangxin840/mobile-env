var browsers = {
  "meituan": {
    "name": "美团",
    "ratio": 50
  },
  "dianping": {
    "name": "点评",
    "ratio": 30
  },
  "weichat": {
    "name": "微信",
    "ratio": 20
  },
  "qq": {
    "name": "QQ",
    "ratio": 10
  },
  "default": {
    "name": "原生",
    "ratio": 5
  }
};

var devices = {
  "iphone5": {
    "name": "iPhone5",
    "ratio": 50
  },
  "iphone6": {
    "name": "iPhone6",
    "ratio": 30
  },
  "xiaomi": {
    "name": "小米",
    "ratio": 10
  },
  "huawei": {
    "name": "华为",
    "ratio": 5
  },
  "samsung": {
    "name": "Samsung",
    "ratio": 3
  }
};

var rows = {};

var init = function () {
  var key, key2;
  var cases;

  for (key in devices) {
    cases = {}

    for (key2 in browsers) {
      cases[key2] = {
        "probability": -1
      }
    }

    rows[key] = {
      "name": devices[key].name,
      "cases": cases
    }
  }
};

init();

export {
  browsers, devices, rows
}
