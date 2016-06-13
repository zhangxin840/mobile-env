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
    "ratio": 5
  },
  "uc": {
    "name": "UC",
    "ratio": 4
  },
  "default": {
    "name": "原生",
    "ratio": 3
  },
  "others": {
    "name": "Others",
    "ratio": 1
  }
};

var devices = {
  "iphone5": {
    "name": "iPhone5",
    "ratio": 20
  },
  "iphone6": {
    "name": "iPhone6",
    "ratio": 30
  },
  "iphone4": {
    "name": "iPhone4",
    "ratio": 10
  },
  "xiaomi": {
    "name": "小米",
    "ratio": 9
  },
  "vivo": {
    "name": "VIVO",
    "ratio": 7
  },
  "oppo": {
    "name": "OPPO",
    "ratio": 6
  },
  "huawei": {
    "name": "华为",
    "ratio": 8
  },
  "samsung": {
    "name": "Samsung",
    "ratio": 2
  },
  "others": {
    "name": "Others",
    "ratio": 1
  }
};

var tableData = {};

var init = function (caseData) {
  var i, j;

  for (i in devices) {
    tableData[i] = {}

    for (j in browsers) {
      tableData[i][j] = {
        "probability": -1
      };
    }
  }
};

init();

export {
  browsers, devices, tableData
}
