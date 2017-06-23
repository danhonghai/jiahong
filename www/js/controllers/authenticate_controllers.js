angular.module('authenticate.controllers', [])
    .controller('AuthenticateCtrl', ['$scope', function($scope){
        console.log("AuthenticateCtrl");
    }])
    .controller('IdcardCtrl', ['$scope','$ionicActionSheet', function($scope,$ionicActionSheet){
        console.log("IdcardCtrl");
        // 点击按钮触发，或一些其他的触发条件
        $scope.show = function() {
            // 显示操作表
            $ionicActionSheet.show({
                buttons: [
                    { text: '拍照' },
                    { text: '从相册选择' },
                ],
                cancelText: '取消',
                buttonClicked: function(index) {
                    return true;
                }
            });
        };
    }])
    .controller('BankmangeCtrl', ['$scope', function($scope){
        console.log("BankmangeCtrl");
    }])
    .controller('ContactmanCtrl', ['$scope', function($scope){
        console.log("ContactmanCtrl");
    }])
    .controller('ZhimaCtrl', ['$scope', function($scope){
        console.log("ZhimaCtrl");
    }])
    .controller('MobileserviceCtrl', ['$scope', function($scope){
        console.log("MobileserviceCtrl");
    }])
    .controller('CarinfoCtrl', ['$scope', function($scope){
        console.log("CarinfoCtrl");
    }])
    .controller('SocialCtrl', ['$scope', function($scope){
        console.log("SocialCtrl");
    }])


