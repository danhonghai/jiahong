angular.module('authenticate.controllers', [])
    //认证
    .controller('AuthenticateCtrl', ['$scope','$state','Services','$location', function($scope,$state,Services,$location){

        //获取用户认证状态
        Services.getData("auth/identifyStatus", {}).success(function(data) {
            if (data.code == 0) {
                $scope.auth = data.data;
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });

        //获取用户实名信息(淘宝需要)
 /*       Services.getData("user/getUserMsg", {}).success(function(data){
            if (data.code == 0) {
                console.log(data.data);
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });*/
        //社保。淘宝，学信认证
        $scope.authFun = function(flag){
            var url={
                'social':'social/getSSUrl',
                'taobao':'taobao/TaoBaoIdentify',
                'xuexin':'xuexin/getXXUrl'
            };
            if($scope.auth.identityStatus == 1){
                Services.getData(url[flag], {}).success(function(data){
                    if (data.code == 0) {
                        window.location.href = data.data.url;
                    } else {
                        Services.ionicpopup('提示信息', data.msg);
                    }
                });
            }else{
                Services.ionicpopup('提示信息', "请先进行身份认证");
            }

        };

    }])
    //身份认证
    .controller('IdcardCtrl', ['$scope','$ionicActionSheet','$state','Services','$ionicLoading', function($scope,$ionicActionSheet,$state,Services,$ionicLoading){
        console.log("IdcardCtrl");
        $scope.selectBank = {};//当前选中的开户行
        //查询开户行
        Services.getData("user/getbank",{}).success(function(data){
            if(data.code == 0){
                $scope.bankAll = data.data.list;
            }
        });
        $scope.imgarrs = ["","",""];
        $scope.imgsrcs = ["img/photo.png","img/photo.png","img/photo.png"];
        $scope.show = function(index) {//上传图片
            wx.ready(function(){
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
            });
        };

        $scope.params = {
            imgIdnoBef:'1237378768e7q8e7r8qwesafdasdfasdfaxss111',
            imgIdnoAft:'1237378768e7q8e7r8qwesafdasdfasdfaxss111',
            imgIdnoHand:'1237378768e7q8e7r8qwesafdasdfasdfaxss111',
        };
        //提交信息
        $scope.submit = function(){
            if($scope.selectBank.bank){
                $scope.params.bankId = $scope.selectBank.bank.split(',')[0];
                $scope.params.bankName = $scope.selectBank.bank.split(',')[1];
            }else{
                $scope.params.bankId = $scope.bankAll[0].id;
                $scope.params.bankName = $scope.bankAll[0].bankName;
            }

            console.log($scope.params);
            //获取用户信息
            Services.getData("userIdentity/IdCheck", $scope.params).success(function(data) {
                if (data.code == 0) {
                    $state.go("bankmange");
                } else {
                    Services.ionicpopup('提示信息', data.msg);
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
            Services.getData("user/addemergencycontact", $scope.params).success(function(data) {
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
        $scope.zhimaClick = function(){
            Services.getData("zhima/userForce", {}).success(function(data){
                if (data.code == 0) {
                    window.location.href = data.data;
                } else {
                    Services.ionicpopup('提示信息', data.msg);
                }
            });
            //$state.go('zhimaok');
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
                Services.getData("corparate/getTongdunUrl", {}).success(function(data) {
                    if (data.code == 0) {
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
            Services.getData("corparate/getTongdunUrl",{}).success(function(data){
                if (data.code == 0) {
                    $state.go('zhima');
                }else {
                    Services.ionicpopup('提示信息', data.msg);
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
        Services.getData("social/getSSUrl", {}).success(function(data){
            if (data.code == 0) {debugger;
                window.location.href = data.data;
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });
    }])
    //淘宝认证
    .controller('TaobaoCtrl', ['$scope','Services', function($scope,Services){
        Services.getData("zhima/userForce", {}).success(function(data){
            if (data.code == 0) {
                window.location.href = data.data;
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });
    }])
    //学信网认证
    .controller('XuexinCtrl', ['$scope','Services', function($scope,Services){
        Services.getData("zhima/userForce", {}).success(function(data){
            if (data.code == 0) {
                window.location.href = data.data;
            } else {
                Services.ionicpopup('提示信息', data.msg);
            }
        });
    }])


