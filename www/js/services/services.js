angular.module('services', [])
    .service('Services', ['$http', '$rootScope','$ionicLoading', '$ionicPopup', '$state', '$filter', '$q', function($http,$rootScope,$ionicLoading,$ionicPopup,$state,$filter,$q){
        return {
            //请求数据遮罩层
            ionicLoading: function(){
                $ionicLoading.show({
                    template: '请稍后...',
                    hideOnStateChange:true,  //切换视图隐藏
                    duration:15000  //后台长时间没响应，15秒后自动隐藏
                });
            },
            //获取当前时间
            getNowTime: function(){
                var date = new Date();
                var seperator1 = "";
                var seperator2 = "";
                var month = date.getMonth() +1;
                var strDate = date.getDate();
                if(month >= 1 && month <= 9){
                    month = "0" + month;
                }
                if(strDate >= 0 && strDate <= 9){
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + date.getHours() + seperator2 + date.getMinutes() + seperator2  + date.getSeconds();
                return currentdate;
            },
            //获取服务器时间
            getServerTime: function(day, backfun){
                $http.post("http://192.168.5.17:8080/eps/getSystemTime.htm").success(function(data){
                    var begintime = $filter('date')(data.time,'yyyy-MM-dd');
                    var endtime = $filter('date')(data.time+86400000*day,'yyyy-MM-dd');
                    backfun(begintime + '_' + endtime);
                });
            },
            //主要数据接口
            getData:function(functionId,params){
                var data = {
                    "reqHead": {
                        "functionId": functionId,
                        "terminalType": "3",
                        "terminalId": "",
                        "transTime": this.getNowTime(),
                        "version": "1.0.0",
                        "clientIp": ""
                    },
                    "body": params
                };
                var  d = $q.defer();
                var promise = d.promise;
                $http({
                    method: 'GET',
                    url: $rootScope.baseUrl,
                    data: angular.toJson(data),
                    dataType:"json",
                }).then(function successCallback(response) {
                        d.resolve(response.data);
                    }, function errorCallback(error) {
                        d.reject(error);
                });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                };
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                };
                return d.promise;
            },
            //弹出提示框
            ionicpopup: function(title, template) {
                $ionicPopup.alert({
                    title: title,
                    template: template
                });
            }
        }
    }])
