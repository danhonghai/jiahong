angular.module('authenticate.controllers', [])
    //认证
    .controller('AuthenticateCtrl', ['$scope','$state','Services','$ionicLoading', function($scope,$state,Services,$ionicLoading){
        $scope.$on('$ionicView.beforeEnter',function(){
            if(!sessionStorage.token || sessionStorage.token == 'null'){
                $state.go('login');
            };
        });
        $scope.auth = [
        {"lable":"IDCARD_REALNAME","status":0,"className":"no_auth","text":"未认证"},
        {"lable":"BANK_CARD_AUTH","status":0,"className":"no_auth","text":"未认证"},
        {"lable":"EMERGENCY_CONTACT","status":0,"className":"no_auth","text":"未认证"},
        {"lable":"ZHIMA_AUTH","status":0,"className":"no_auth","text":"未认证"},
        {"lable":"PHONENUM_INFO","status":0,"className":"no_auth","text":"未认证"},
        {"lable":"IDCARD_REALNAME","status":0,"className":"no_auth","text":"未认证"}
        ]
        //获取用户认证状态
        Services.ionicLoading();
        Services.getData("auth/authinfo", {}).success(function(data) {
            $ionicLoading.hide();
            if (data.code == 0) {
                var list = data.data.list? data.data.list : [];
                for(var i=0; i<list.length; i++){
                    for(var j = 0; j<$scope.auth.length; j++){
                          if(list[i].itemLable == $scope.auth[j].lable && list[i].status == 1){
                              $scope.auth[j].status = 1;
                              $scope.auth[j].className = "is_auth";
                              $scope.auth[j].text = "已认证";
                          }
                    }
                }
                console.log($scope.auth);
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });

        $scope.authClick = function(status,url){
            if(status == 0){//未认证
                $state.go(url);
            }
        }

    }])
    //身份认证
    .controller('IdcardCtrl', ['$scope','$ionicActionSheet','$state','Services','$ionicLoading', function($scope,$ionicActionSheet,$state,Services,$ionicLoading){
        console.log("IdcardCtrl");
        $scope.imgarrs = ["","",""];
        $scope.imgsrcs = ["img/photo.png","img/photo.png","img/photo.png"];
        $scope.show = function(index) {//上传图片
            /*wx.ready(function(){
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        $.each(localIds,function(i,n){
                            $scope.imgsrcs[index] = n;
                            $scope.$apply();
                        })
                        wx.uploadImage({
                            localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                var serverId = res.serverId; // 返回图片的服务器端ID
                                alert(serverId);
                                $scope.imgarrs[index] = serverId;
                                $scope.imgarrs.push(serverId);
                                // var serverIddata = {
                                //           serverId:serverId,
                                //           userId:angular.fromJson(sessionStorage.userInfo).data.id
                                //         }
                                //     Services.getcodeService("user/uplod", serverIddata, function(data) {
                                //         alert(data)
                                // })
                            }
                        });
                    }
                });
            });*/
        };
        $scope.params = {};
        //提交信息
        $scope.submit = function(){
            //获取用户信息
            Services.getData("A001", $scope.params).success(function(data) {
                $ionicLoading.hide();
                console.log($scope.params);
                if (data.respHead.respCode == "000000") {
                    $state.go("bankmange");
                } else {
                    Services.ionicpopup('提示信息', data.respHead.respMsg);
                }
            });
        };
    }])
    //人脸识别
    .controller('BankmangeCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
        console.log("BankmangeCtrl");
        $scope.faceModalOk = function(){
            $ionicPopup.show({
              title:'<span class="font-size24 modalTitle">识别成功</span>',
              scope: $scope,
              buttons: [{
                  text: "下一步",
                  type:'button-light cff804a',
                  onTap: function(e) {
                      $state.go('contactman');
                  }
              }]
            });
        };
        $scope.faceModelFair = function(){
            $ionicPopup.show({
                title:'<span class="font-size24 modalTitle">识别失败</span><p class="cs9">请严格按照提示进行人脸识别</p>',
                scope: $scope,
                buttons: [{
                    text: "重新识别",
                    type:'button-light cff804a',
                    onTap: function(e) {

                    }
                }]
            });
        };
        $scope.faceRecognition = function(){
            $scope.faceModalOk();
        };
    }])
    //紧急联系人
    .controller('ContactmanCtrl',['$scope', '$state','Services','$ionicLoading', function($scope,$state,Services,$ionicLoading){
        console.log("ContactmanCtrl");
        $scope.params = {};
        //提交信息
        $scope.submit = function(){
            //获取用户信息
            Services.ionicLoading();
            Services.getData("user/addemergencycontact", $scope.params).success(function(data) {
                $ionicLoading.hide();
                if (data.code == 0) {
                    $state.go("mobileservice");
                } else {
                    Services.ionicpopup('提示信息', data.msg);
                }
            });
        };
    }])
    //芝麻信用
    .controller('ZhimaCtrl', ['$scope','$state', function($scope,$state){
        console.log("ZhimaCtrl");
        $scope.zhimaClick = function(){
            $state.go('zhimaok');
        }
    }])
    //手机运营商
    .controller('MobileserviceCtrl', ['$scope', '$state','Services','$ionicLoading','$rootScope', function($scope,$state,Services,$ionicLoading,$rootScope){
        console.log("MobileserviceCtrl");
        $scope.params = {};
        //获取手机验证码
        $scope.getphoneCode = function() {
            var codeparams = {
                mobileNo: $scope.params.phone
            }
            if ($scope.params.phone) {
                Services.ionicLoading();
                Services.getData("A001", codeparams).success(function(data) {
                    $ionicLoading.hide();
                    if (data.respHead.respCode == "000000") {
                        $rootScope.timer(60, "#sendButton_service");
                        //Services.ionicpopup('发送成功', "验证码发送成功！");
                    } else {
                        Services.ionicpopup('发送失败', "验证码发送失败，请重试！");
                    }
                });
            } else {
                Services.ionicpopup('发送失败', "请输入手机号");
            }
        };
        //提交信息
        $scope.submit = function(){
            console.log($scope.params);
            Services.ionicLoading();
            Services.getData("A001",$scope.params).success(function(data){
                $ionicLoading.hide();
                if (data.respHead.respCode == "000000") {
                    $state.go('zhima');
                }else {
                    Services.ionicpopup('提示信息', data.respHead.respMsg);
                }

            });
        };
    }])
    //车辆认证
    .controller('CarinfoCtrl', ['$scope', function($scope){
        console.log("CarinfoCtrl");
    }])
    //社保认证
    .controller('SocialCtrl', ['$scope', function($scope){
        console.log("SocialCtrl");
    }])


