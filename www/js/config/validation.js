'use strict';
angular.module('starter').config(['$validationProvider', function($validationProvider) {
  var expression = {
    phone: /^[1][3456789][0-9]{9}$/,
    QQ:/^[1-9][0-9]{4,9}$/,
    password:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    idCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    bankCard:/^(\d{16}|\d{19})$/,
    repassword: function(value, scope, element, attrs) {
      return value === attrs.value;
    },
    required: function(value) {
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '输入有误'
    },
    password: {
      success: '',
      error: '密码为6到16为数字字母组合'
    },
    repassword: {
      success: '',
      error: '两次密码不一致'
    },
    QQ: {
      success: '',
      error: '输入有误'
    },
    idCard: {
      success: '',
      error: '输入有误'
    },
    bankCard: {
      success: '',
      error: '输入有误'
    },
    required: {
      success: '',
      error: '必填项'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
