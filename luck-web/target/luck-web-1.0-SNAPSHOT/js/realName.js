function checkRealName() {
	//真实姓名不能为空
	//真实姓名只支持中文

	//获取用户输入的真实姓名
	var realName = $.trim($("#realName").val());

	if("" == realName) {
		showError("realName","请输入真实姓名");
		return false;
	} else if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(realName)) {
		showError("realName","真实姓名只支持中文");
		return false;
	} else {
		showSuccess("realName");
	}
	return true;
}


//验证身份证号码
function checkIdCard() {
	//获取用户输入身份证号码
	var idCard = $.trim($("#idCard").val());
	var replayIdCard = $.trim($("#replayIdCard").val());

	if("" == idCard) {
		showError("idCard","请输入身份证号码");
		return false;
	} else if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
		showError("idCard","请输入正确的身份证号码");
		return false;
	} else if (!(idCard.length == 15 || idCard.length == 18)) {
        showError("idCard","请输入正确的身份证号码");
        return false;
	} else {
		showSuccess("idCard");
	}

	if ("" != idCard && "" != replayIdCard && replayIdCard == idCard) {
        showSuccess("idCard");
	} else {
		showError("replayIdCard","请输入身份证号码");
		return false;
	}

	return true;
}

//验证确认身份证号码
function checkIdCardEqu() {
    //获取用户输入身份证号码
    var idCard = $.trim($("#idCard").val());
    var replayIdCard = $.trim($("#replayIdCard").val());

    if (!checkIdCard()) {
    	hideError("replayIdCard");
	}

	if("" == idCard) {
    	showError("idCard","请输入身份证号码");
    	return false;
	} else if("" == replayIdCard) {
    	showError("replayIdCard","请再次输入身份证号码");
    	return false;
	} else if(replayIdCard != idCard) {
    	showError("replayIdCard","两次输入不一致");
    	return false;
	} else {
    	showSuccess("replayIdCard");
	}

	return true;
}

//验证图形验证码
function checkCaptcha() {
    //验证图形验证码不能为空
    //验证是否一致

    //获取图形验证码
    var captcha = $.trim($("#captcha").val());
    var flag = true;

    if ("" == captcha) {
        showError("captcha","请输入图形验证码");
        return false;
    } else {
        //发送ajax请求
        $.ajax({
            url:"loan/checkCaptcha",
            type:"post",
            data:"captcha="+captcha,
            async:false,
            success:function (jsonObject) {
                if(jsonObject.errorMessage == "ok"){
                    flag = true;
                    showSuccess("captcha");
                } else {
                    flag = false;
                    showError("captcha",jsonObject.errorMessage);
                }
            },
            error:function () {
                flag = false;
                showError("captcha","系统繁忙，请稍后重试...");
            }
        });
    }

    if(!flag) {
        return false;
    }

    return true;
}


//实名认证
function verifyRealName() {

	//获取表单内容
	var realName = $.trim($("#realName").val());
	var idCard = $.trim($("#idCard").val());
	var replayIdCard = $.trim($("#replayIdCard").val());

	if(checkRealName() && checkIdCard() && checkIdCardEqu() && checkCaptcha()) {
		$.ajax({
			url:"loan/verifyRealName",
			type:"post",
			data:{
				"realName":realName,
				"idCard":idCard,
				"replayIdCard":replayIdCard
			},
			success:function (jsonObject) {
				if (jsonObject.errorMessage == "ok") {
					//实名认证成功
					window.location.href = "index";
				} else {
					//实名认证失败
					showError("captcha",jsonObject.errorMessage);
				}
            },
			error:function () {
                showError("captcha","系统繁忙，请稍后重试...");
            }
		});
	}
}


//错误提示
function showError(id,msg) {
	$("#"+id+"Ok").hide();
	$("#"+id+"Err").html("<i></i><p>"+msg+"</p>");
	$("#"+id+"Err").show();
	$("#"+id).addClass("input-red");
}

//错误隐藏
function hideError(id) {
	$("#"+id+"Err").hide();
	$("#"+id+"Err").html("");
	$("#"+id).removeClass("input-red");
}

//成功
function showSuccess(id) {
	$("#"+id+"Err").hide();
	$("#"+id+"Err").html("");
	$("#"+id+"Ok").show();
	$("#"+id).removeClass("input-red");
}


//同意实名认证协议
$(function() {
	$("#agree").click(function(){
		var ischeck = document.getElementById("agree").checked;
		if (ischeck) {
			$("#btnRegist").attr("disabled", false);
			$("#btnRegist").removeClass("fail");
		} else {
			$("#btnRegist").attr("disabled","disabled");
			$("#btnRegist").addClass("fail");
		}
	});
});
//打开注册协议弹层
function alertBox(maskid,bosid){
	$("#"+maskid).show();
	$("#"+bosid).show();
}
//关闭注册协议弹层
function closeBox(maskid,bosid){
	$("#"+maskid).hide();
	$("#"+bosid).hide();
}