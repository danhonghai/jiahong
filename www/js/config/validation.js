'use strict';
angular.module('starter').config(['$validationProvider', function($validationProvider) {
  var expression = {
    phone: /^[1][3456789][0-9]{9}$/,
    QQ:/^[1-9][0-9]{4,9}$/,
    required: function(value) {
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '手机号码不规范'
    },
    QQ: {
      success: '',
      error: 'QQ号码不规范'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
