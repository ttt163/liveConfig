import {URL,PANURL} from '../../config.js';
//侧边栏展开与收缩
var aSide = {
	init: function() {
		var funfold = $('.f-unfold');
		funfold.on('click', this.showSide);
	},
	showSide: function(e) {
		var fnav = $('.f-nav'),
			fnavWidth = fnav.css('width'),
			fsublink = $('.f-sub > a'),
			navStatus = false;
		if (fnavWidth == '200px') { //收缩
			var val = parseInt(fnavWidth) - 140;
			fnav.css('width', val)
			$('.f-page').css('margin-left', val);
			if (!$('.f-curr').parent().hasClass('f-sub')) {
				$('.f-curr').closest('.f-sub').children('a').addClass('f-curr');
			}
			// 选中状态的连接添加到父级，如果没有选中状态，将第一个子节点连接添加到父级
			var placehold = $('.f-placehold');
			if (placehold.length) {
				for (var i = 0, l = placehold.length; i < l; i++) {
					var placeholdn = $(placehold[i]),
						placeholda = placeholdn.parent().children('a'),
						placeholdcurr = placeholdn.find('.f-curr'),
						placeholdsuba = placeholdn.children().children('a');
					if (placeholdcurr.length) {
						placeholda.attr('href', placeholdcurr.attr('href'));
					} else {
						placeholda.attr('href', placeholdsuba.attr('href'));
					}
				}
			}
			fsublink.nextAll('ul').css('display', 'none');
			navStatus = true;
		} else { //展开
			var val = parseInt(fnavWidth) + 140;
			fnav.css('width', val)
			$('.f-page').css('margin-left', val);
			fsublink.nextAll('ul').css('display', 'block');
			if ($('.f-curr').parent().parent().hasClass('f-placehold')) {
				$('.f-sub').children('a').removeClass('f-curr');
			}
			navStatus = false;
		}
		fDrop.init();
		//收缩后开启点击
		if (navStatus) {
			$('.f-placehold').parent().children('a').off('click');
		}
		//判断navStatus状态，true显示提示，false取消绑定
		for (var i = 0, l = fsublink.length; i < l; i++) {
			var $link = $(fsublink[i]);
			if (navStatus) {
				$link.on('mouseover', function() {
					var width = $(this).closest('.f-nav').width(),
						linkH = parseInt($(this).height() / 2),
						tipH = parseInt($('#f-tip').height() / 2),
						top = $(this).offset().top,
						left = $(this).offset().left;
					$('#f-tip').css({
						'display': 'block',
						'left': left + width + 8,
						'top': top + linkH - tipH
					});
					$('.arrow-txt').html($(this).text());
				})

				$link.on('mouseout', function() {
					$('#f-tip').css({
						'display': 'none'
					});
					$('.arrow-txt').html('');
				})
			} else {
				$link.off('mouseover mouseout');

			}
		}

	}
};
//收缩与展开下拉
var fDrop = {
	init: function() {
		var flink = $('.f-placehold').parent().children('a');
		if (flink.length) {
			for (var i = 0, l = flink.length; i < l; i++) {
				var flinkn = $(flink[i]);
				flinkn.on('click', function(e) {
					var ul = $(this).nextAll('ul');
					if (ul.css('display') != 'none') {
						ul.css('display', 'none');
					} else {
						ul.css('display', 'block')
					}
					return false;
				})
			}
		}
	}
};
$(function(){
	aSide.init();
	fDrop.init();
	Modal ();
	Array.prototype.insert = function (index, item) {
		this.splice(index, 0, item);
	};
	if (jQuery.validator){
		//用户名
		jQuery.validator.addMethod("username", function(value, element) {
			var port = /^[a-zA-Z]\w{5,15}$/;
			return this.optional(element) || (port.test(value));
		}, "由数字、字母、下划线组成，只能以字母开头，长度为6-16位字符");
		//密码
		jQuery.validator.addMethod("psw", function(value, element) {
			var patt =/^\S{6,16}$/;
			if(value == ''){
				return true;
			}else{
				if(patt.test(value))
				{
					var arr  = [/[A-Z]+/,/[a-z]+/,/[0-9]+/,/[^\sa-zA-Z0-9]+/];
					var n = 0;
					for(var i = 0; i < arr.length; i++)
					{
						if(arr[i].test(value)){
							n++;
						}
					}
					if(n >= 3){
						return true;
					}
				}
			}

		}, "必须为6-16位字符，且使用大写字母、小写字母、数字及标点符号四种字符中至少三种组合，且与登录名无相关性");
		//联系人
		jQuery.validator.addMethod("contacts", function(value, element) {
			var port = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z]){2,16}$/;
			return this.optional(element) || (port.test(value));
		}, "只能由中文、英文组成，长度为2-16位字符");
		//手机号
		jQuery.validator.addMethod("mobile", function(value, element) {
			var length = value.length;
			return this.optional(element) || (length == 11 && /^(1[3-9]\d{9})$/.test(value));
		}, "请正确填写您的手机号码");
		//qq号
		jQuery.validator.addMethod("qq", function(value, element) {
			var pattern = /^[1-9]\d{3,20}$/;
			return this.optional(element) || (pattern.test(value));
		}, "只能由数字组成，且长度为4-20位字符");
		//ip
		jQuery.validator.addMethod("ip", function(value, element) {
			var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(\,((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
			var ip = isIp.test(value);
			if(ip){
				var ipArr = value.split(',');
				var isRepeatIpArr = [];
				out:for(var i = 0; i < ipArr.length; i++){
					var oneIpArr = ipArr[i].split('.');
					for(var j = 0; j < oneIpArr.length; j++){
						if(oneIpArr[j].length > 1 && oneIpArr[j].charAt(0) == 0)
						{
							ip = false;
							break out;
						}
					}
					for(var k = 0; k < isRepeatIpArr.length; k++){
						if(isRepeatIpArr[k] == ipArr[i]){
							ip = false;
							break out;
						}
					}
					isRepeatIpArr.push(ipArr[i])
				}
			}
			return this.optional(element) || ip;
		}, 'IP地址格式错误');
		//慢速比
		jQuery.validator.addMethod("slow", function(value, element) {
			return this.optional(element) || /^[0-9]{1,5}$/.test(value);
		}, '慢速比阈值只能为1至5位数字');
		//回源端口信息-f
		jQuery.validator.addMethod("portInfo", function(value, element) {
			var re = /^(([1-9]|[1-9]\d+)|(([1-9]|[1-9]\d+)(\,([1-9]|[1-9]\d+))+)|(([1-9]|[1-9]\d+)(\,([1-9]|[1-9]\d+))+))$/;
			var status = false;
			if(re.test(value)){
				var arr = value.split(',');
				status = true;
				var isRepeat = [];
				outer:for(var i = 0; i < arr.length; i++){
					if(arr[i] <= 0 || arr[i] > 65535){
						status = false;
						break;
					}
					for(var j = 0; j < isRepeat.length; j++){
						if(isRepeat[j] == arr[i]){
							status = false;
							break outer;
						}
					}
					isRepeat.push(arr[i]);
				}
			}
			return this.optional( element ) || status;
		}, '格式错误');
		//正整数-f
		jQuery.validator.addMethod("posInteger", function(value, element) {
			var re = /^([0-9]|[1-9]\d+)$/;
			var status = false;
			if(re.test(value)){
				if(value >= 0 && value <= 99999999){
					status = true;
				}
			}
			return this.optional( element ) || status;
		}, '长度为不超过8位数的整数');
		//接口版本-f
		jQuery.validator.addMethod("portVersion", function(value, element) {
			return this.optional(element) || /^(\d+|(\d+(\.\d+)+))$/.test(value);
		}, '接口版本格式错误');

		//转换域名-f
		jQuery.validator.addMethod("geturl", function(value, element) {
			return this.optional( element ) ||PANURL.test( value );// /^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		}, 'url格式错误');
		jQuery.validator.addMethod("geturls", function(value, element) {
			var re = /^(((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#][^,]*)?)|((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#][^,]*)?)(\,((?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#][^,]*)?))+)$/i;
			var res=/^[^，]*$/i;
			var status = false;
			if(re.test( value )&&res.test(value)){
				status = true;
				var arr = value.split(',');
				var arrReplace = [];
				outer:for(var i = 0; i < arr.length; i++){
					for(var j = 0; j < arrReplace.length; j++){
						if(arrReplace[j] == arr[i]){
							status = false;
							break outer;
						}
					}
					arrReplace.push(arr[i]);
				}
			}
			return this.optional( element ) || status;
		}, 'url格式错误');

		//linux目录-f
		jQuery.validator.addMethod("path", function(value, element) {
			return this.optional( element ) || (!(/^\s+|\s+$/.test( value )) && !(/(\/+\/)/g.test( value )));
			//var arr=value.split("/");
			//if(arr.length<10){
			//	return this.optional( element ) || /^(\/*[a-zA-Z0-9_\-\.\+\[\]]*\/*)+$/i.test( value );
			//}else{
			//	return false;
			//}

		}, '格式错误');
		//英文-f
		jQuery.validator.addMethod("eng", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z\ ]+$/i.test( value );
		}, '格式错误');

		//回调名称-f
		jQuery.validator.addMethod("backname", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z_]+$/i.test( value );
		}, '格式错误');
		// 检测间隔时间
		jQuery.validator.addMethod("timeSpace", function(value, element) {
			var re=/^[5-9]|([1-9]\d+)$/i;
			var status = false;
			if(re.test(value)){
				if(value > 5 && value <= 99999999){
					status = true;
				}
			}
			return this.optional( element ) || status;
		}, '值大于5且长度不超过8位数的整数');
		// 认证秘钥-f
		jQuery.validator.addMethod("secretKey", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z0-9]{32}$/i.test( value );
		}, '认证秘钥只能为数字与英文字母组合，且长度为32位');

		// 范围
		jQuery.validator.addMethod("fscope", function(value, element) {
			return this.optional( element ) || /^((([0-9]|[1-9]\d+)(>|=|>=)k)|(k(<|=|<=)([0-9]|[1-9]\d+))|(k(>|=|>=)([0-9]|[1-9]\d+))|(([0-9]|[1-9]\d+)(>|>=)k(>|>=)([0-9]|[1-9]\d+))|(([0-9]|[1-9]\d+)(<|<=)k(<|<=)([0-9]|[1-9]\d+)))$/i.test( value );
		}, '格式错误,可填写> = <，示例 102<k<230');
		// 范围
		jQuery.validator.addMethod("evenNum", function(value, element) {
			var eveStatus = false,
				re = /^\d+$/i.test( value );
			if(re){
				if(value != 0 && value%2 == 0){
					eveStatus = true;
				}
			}
			return this.optional( element ) || eveStatus;
		}, '格式错误');

		//多ip列表
		jQuery.validator.addMethod("ipList", function(value, element) {
			var isIp = /^(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(\,((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))+))$/;
			var ip = isIp.test(value);
			if(ip){
				var ipArr = value.split(',');
				var isRepeatIpArr = [];
				out:for(var i = 0; i < ipArr.length; i++){
					var oneIpArr = ipArr[i].split('.');
					for(var j = 0; j < oneIpArr.length; j++){
						if(oneIpArr[j].length > 1 && oneIpArr[j].charAt(0) == 0)
						{
							ip = false;
							break out;
						}
					}
					for(var k = 0; k < isRepeatIpArr.length; k++){
						if(isRepeatIpArr[k] == ipArr[i]){
							ip = false;
							break out;
						}
					}
					isRepeatIpArr.push(ipArr[i])
				}
			}
			return this.optional(element) || ip;
		}, '多个ip地址用逗号分隔，ip不能重复');
		//ip列表
		jQuery.validator.addMethod("ipList1", function(value, element) {
			return this.optional(element) || /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?))|(((25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\|)+(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?))$/i.test(value);
		}, 'IP地址格式错误');

		// 范围
		jQuery.validator.addMethod("aclname", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z0-9_]+$/i.test( value );
		}, '只能使用数字、字母和下划线');
		// clms配置-基本配置-pid验证
		jQuery.validator.addMethod("pidsource", function(value, element) {
			return this.optional( element ) || /^[\.a-zA-Z0-9_-]+$/i.test( value );
		}, '只能使用英文、数字、点、下划线');
		//设备管理验证
		jQuery.validator.addMethod("device",function(value,element){
			return this.optional(element)|| /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/i.test( value )
		},"只能为中文、数字、字母、下划线");
		// 端口范围-f
		jQuery.validator.addMethod("portal", function(value, element) {
			var re = /^([1-9]|[1-9]\d+)$/;
			var status = false;
			if(re.test(value)){
				if(value >= 1 && value <= 65535){
					status = true;
				}
			}
			return this.optional( element ) || status;
		}, '范围为1-65535之间的整数');
		// 整数-f
		jQuery.validator.addMethod("intLen", function(value, element) {
			var re = /^([0-9]|[1-9]\d+)$/;
			var status = false;
			if(re.test(value)){
				if(value >= 0 && value <= 99999999){
					status = true;
				}
			}
			return this.optional( element ) || status;
		}, '长度为不超过8位数的整数');
		// 整数-f
		jQuery.validator.addMethod("intLen1", function(value, element) {
			var re = /^([0-9]|[1-9]\d+)$/;
			var status = false;
			if(re.test(value)){
				if(value > 0 && value < 1000000000){
					status = true;
				}
			}
			return this.optional( element ) || status;
		}, '请输入0-1000000000之间的整数');

		//-f
		jQuery.validator.addMethod("transferuse", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z0-9\.\:\/]+$/.test(value);
		}, '只支持英文、数字、点(.)、冒号(:)、斜杠(/)');

		//[\d\w\(\)]*英文、数字、符号
		jQuery.validator.addMethod("nochinese1", function(value, element) {
			var status=true;
			if(!(/^[a-zA-Z0-9]+|^[a-zA-Z0-9]+[\x00-\xff]+/.test(value))){
				status=false;
			}
			if(!(/^[^\u4e00-\u9fa5]+$/.test(value))){
				status=false;
			}
			if(!(/^[^\uFF00-\uFFFF]+$/.test(value))){
				status=false;
			}
			return this.optional( element ) || status;
		}, '只支持英文、数字、英文符号，首位不能是符号');
		//英文、数字、符号
		jQuery.validator.addMethod("nochinese2", function(value, element) {
			return this.optional( element ) || /^[^\u4e00-\u9fa5]+$/.test(value);
		}, '只支持英文、数字、符号');
		//两个输入框val不能一样
		jQuery.validator.addMethod("equalno",function(value,element,ele){
			var status=true ,id=ele.split("#")[1];
			id=id+"-error";
			if(value!=''){
				$(ele).attr({'data-rule-required':true,'data-msg-required':'标记时间必须成对出现'});
			}
			if($(ele).val()!=''&&$(ele).val()==value){
				status=false;
				$(ele).closest('td').addClass('has-error');

				if($(ele).prev('span').length==0){
					$(ele).before('<span id='+id+' flag="1" class="wrong">回看开始标记和回看结束标记不能相同</span>');
				}

			}else if($('#'+id).html()=='回看开始标记和回看结束标记不能相同'){
				status=true;
				$(ele).closest('td').removeClass('has-error');
				$('#'+id).remove();
			}
			return this.optional(element) || status;
		},'回看开始标记和回看结束标记不能相同');
		jQuery.validator.addMethod("nochinese3", function(value, element) {
			return this.optional( element ) || /^[^\u4e00-\u9fa5\,]+$/.test(value);
		}, '只支持英文、数字、符号,不支持英文逗号');
		jQuery.validator.addMethod("nochinese4", function(value, element) {
			return this.optional( element ) || /^[^\u4e00-\u9fa5\，]+$/.test(value);
		}, '只支持英文、数字、符号,不支持中文逗号');
		jQuery.validator.addMethod("nochinese5", function(value, element) {
			return this.optional( element ) || /^[\.a-zA-Z0-9]+$/i.test( value );
		}, '只能使用英文、数字');
		jQuery.validator.addMethod("hashrule", function(value, element) {
			return this.optional( element ) || /^[\.a-zA-Z_$-]+$/i.test( value );
		}, '只能使用英文、"$"、下划线');
		//客户名称
		jQuery.validator.addMethod("customer",function(value,element){
			return this.optional(element)|| /^[\u4e00-\u9fa5a-zA-Z0-9]+$/i.test( value )
		},"只能为中文、数字、字母");
	}
	if($.cookie('login')!='true'){
		delete localStorage.loginInfo;
		window.location.href='#/login';
	}
});

export function selectie(id, width) {
	var w = width ? width : "100%";
	for (var i = 0, len = id.length; i < len; i++) {
		$(id[i]).chosen({
			disable_search_threshold: 10,
			width: w
		})
	}
};
/*
 封装表单验证,
 string elements表单对象，
 jsong rules验证规则，
 json msg消息提示，
 string url验证后请求地址
 */
var checkStatus = true; //调试开关   true为正常提交，false为测试
export function formCheck(elements, rules, msg, url,model,hid) {
	if (checkStatus) {
		var $submitBtn = $(elements).find('button[type=submit]');
		var $subTxt = $submitBtn.html();
		$submitBtn.removeAttr("disabled");
	}

	var hidre = hid ? '.ignore' : '';
	var v = $(elements).validate({
		onkeyup: false,
		ignore: hidre,
		errorElement: "span",
		errorClass: "wrong",
		rules: rules,
		messages: msg,

		highlight: function(element) {
			var isUsePlug = $(element).closest('.f-resValidate');
			if (isUsePlug.length) {
				$(element).closest('.form-res').addClass('has-error');
			} else {
				$(element).closest('.form-group').addClass('has-error');
			}
		},

		success: function(label) {
			var isUsePlug = label.closest('.f-resValidate');
			if (isUsePlug.length) {
				label.closest('.form-res').removeClass('has-error');
			} else {
				label.closest('.form-group').removeClass('has-error');
			}
			label.remove();
		},

		errorPlacement: function(error, element) {
			var isUsePlug = element.closest('.f-usePlug');
			if (isUsePlug.length) {
				if (!$('.resError').length) {
					error.addClass('resError');
					isUsePlug.append(error);
				}
			} else {
				element.parent().append(error);
			}
		},

		submitHandler: function() {
			if (checkStatus) {
				$submitBtn.html($subTxt + '中...');
				$submitBtn.attr("disabled", true);
			}
			if(elements=="#Nginx_Configure_Form"){
				//生效层级必须选一个
				for(var i=0;i<$('.workGrade').length;i++){
					if(i!=$('.workGrade').length-1){
						if($($('.workGrade')[i]).find('input:checked').length==0){
							if($($('.workGrade')[i]).find('.workGrade_worng').length==0){
								$($('.workGrade')[i]).append('<li class="workGrade_worng" style="color:darkred">至少要选择一个生效层级</li>');
							}
						}else{
							$($('.workGrade')[i]).find('.workGrade_worng').remove();
						}
					}
				}
				//location名称不能相同
				var locationName=[];
				for(var i=0;i<$('input[name^="location[name]"]').length;i++){
					for(var j=0;j<$('input[name^="location[name]"]').length;j++){
						if(j!=i){
							var _locationName=$('input[name^="location[name]"]')[j]
							locationName.push($(_locationName).val());
						}
					}
					var _locationName=$('input[name^="location[name]"]')[i];
					if(locationName.indexOf($(_locationName).val())>-1){
						if($(_locationName).closest('.workGradeLoc').find('.workGrade_worng').length==0){
							$(_locationName).closest('.workGradeLoc').append('<li class="workGrade_worng" style="color:darkred">location名称重复</li>');
						}
					}else{
						$(_locationName).closest('.workGradeLoc').find('.workGrade_worng').remove();
					}
					locationName=[];
				}
				if($('.workGrade_worng').length>0){
					return false;
				}
			}
			var res = JSON.stringify(getSubmitJson(model));
			$.ajax({
				url: URL + url,
				data: res,
				type: 'post',
				success: function (result) {
					var result = JSON.parse(result);
					//成功后跳转
					if (checkStatus) {
						if (elements == '#Channel_add') {
							$('#f-addChannel-modal').modal('hide');
							addOperation('添加Nginx频道'+$(elements).find('input[name="channel"]').val());
							$('.f-page').attr('data-new','1');
							window.location.href='/#/nginxConfig?channel_name=' + $(elements).find('input[name="channel"]').val() + '&newchannelId=' + result.info['_id'];
							return true;
						} else if (elements == '#Channel_copy') {
							$('#f-copyChannel-modal').modal('hide');
							addOperation('拷贝Nginx频道'+$(elements).find('input[name="channel"]').val());
							window.location.href='/#/nginxConfig?_copy_channel_name=' + $(elements).find('input[name="channel"]').val() + '&channelId=' + $('#copy_id').val() + '&newchannelId=' + result.info['_id'];
							return true;
						} else if (elements == '#Nginx_Configure_Form') {
							if (result.info['_id']) {
								addOperation('添加Nginx频道配置'+$('#channel_name').text());
								new ShowDiag({msg: '操作成功...', closetime: 1, refresh: false});
								window.location.href='/#/nginxConfig?channel_id=' + result.info['_id'];
							}else{
								new ShowDiag({msg: '操作成功...', closetime: 1, refresh: false});
								addOperation('修改Nginx频道配置'+$('#channel_name').text());
								return true;
							}
						} else if(elements=='#Channel_edit'){
							addOperation('修改Nginx频道'+$(elements).find('span[name="channel"]').text());
						}else if(elements=='#user_add'){
							addOperation('添加用户'+$(elements).find('input[name="username"]').val());
						}else if(elements=="#userEdit"){
							addOperation('修改用户'+$(elements).find('.account').text());
						}else if(elements=="#resetPwd"){
							addOperation('重置用户'+$('#uname').val()+'的密码');
						}else if(elements=="#personEdit"){
							addOperation('修改个人信息');
						}else if(elements=="#setPwd"){
							addOperation('修改个人密码');
						}
						new ShowDiag({msg: '操作成功...', closetime: 1, refresh: true});
					}
				},
				error: function (result) {
					var result = JSON.parse(result.responseText);
					if ('failed' == result.info.status) {
						new ShowDiag({msg:result.info.warning, closetime: 1, refresh: false});
						$submitBtn.html($subTxt);
						$submitBtn.removeAttr("disabled");
						if (elements == '#user_add'||elements == '#setPwd') {
							$('.error').text(result.info.warning);
						}
					}
				}
			});
		}
	});
	return v;
}
function getSubmitJson(model) {
	var getDataName = {
		nginxConfig:function(){
			var data={},$nginxForm=$('#Nginx_Configure_Form');
			data._id=$('#config_id').val();
			data.channel_id=$('#channel_id').val();
			data.channel_name=$('#channel_name').html();
			data.client_name=$('#client_name').val();
			data.cluster_name=$('#cluster').find('option:selected').html();
			data.cluster_id=$('#cluster').val();
			data.source_station_type=$('#source_station_type').val();
			if(data.source_station_type==1){
				data.devs_group_id=$('#dev_group').val();
				data.topology_id=$('#topology').val();
			}else{
				data.client_devs_group={};
				data.client_devs_group.default={};
				data.client_devs_group.default.default={};
				data.client_devs_group.default.default.ip_main=[];
				data.client_devs_group.default.default.ip_back=[];
				var $cus=$('.custom');
				var base_default=$cus.find('.base_default')
				for(var i=0;i<base_default.length;i++){
					var state=$(base_default[i]).find('input:checked').attr('class');
					if($(base_default[i]).find('input[type="text"]').val().trim()!=''){
						if(state=='ip_main'){
							data.client_devs_group.default.default.ip_main.push($(base_default[i]).find('input[type="text"]').val());
						}else{
							data.client_devs_group.default.default.ip_back.push($(base_default[i]).find('input[type="text"]').val());
						}
					}
				}
				var isps=$cus.find('.Isp_Box');
				for(var i=0;i<isps.length;i++){
					var isp=$(isps[i]).find('select[name="isp"]').val();
					if(isp!='0'){
						data.client_devs_group[isp]={};
						data.client_devs_group[isp].default={};
						data.client_devs_group[isp].default.ip_main=[];
						data.client_devs_group[isp].default.ip_back=[];

						var default_inputs=$(isps[i]).find('input[name^="defaultIpd"]');
						for (var j=0;j<default_inputs.length;j++){
							var state=$(default_inputs[j]).closest('.defaultIp').find('input:checked').attr('class');
							if($(default_inputs[j]).val().trim()!=''){
								if(state=='ip_main'){
									data.client_devs_group[isp].default.ip_main.push($(default_inputs[j]).val());
								}else{
									data.client_devs_group[isp].default.ip_back.push($(default_inputs[j]).val());
								}
							}
						}
						var provs=$(isps[i]).find('.province_Box');
						for(var j=0;j<provs.length;j++){
							var prov=$(provs[j]).find('select[name="area"]').val();
							if(prov!='0'){
								data.client_devs_group[isp][prov]={};
								data.client_devs_group[isp][prov]['ip_main']=[];
								data.client_devs_group[isp][prov]['ip_back']=[];
								var ips=$(provs[j]).find('input[type="text"]');
								for(var k=0;k<ips.length;k++){
									var state=$(ips[k]).closest('.defaultIp').find('input:checked').attr('class');
									if($(ips[k]).val().trim()!=""){
										if(state=='ip_main'){
											data.client_devs_group[isp][prov]['ip_main'].push($(ips[k]).val());
										}else{
											data.client_devs_group[isp][prov]['ip_back'].push($(ips[k]).val());
										}
									}
								}
							}
						}
					}
				}
			}
			data.set_data={};
			//CacheConfig JSON数据拼接
			data.set_data.cache=[];
			var cacheTable=$('.CacheConfig ').find('table'),$workGrade=$('.CacheConfig ').find('.workGrade');
			for(var i=0;i<cacheTable.length;i++){
				var cache={}
				cache.take_effect_level=[];
				var configIndex=$(cacheTable[i]).attr('name');
				for(var j=0;j<$workGrade.find('.chk').length;j++){
					if($($workGrade.find('.chk')[j]).attr('data-name')==configIndex){
						cache.take_effect_level.push($($workGrade.find('.chk')[j]).attr('data-val'));
					}
				}
				cache.cache_son=[];
				var $cacheTr=$(cacheTable[i]).find('tbody').find('tr');
				for(var j=0;j<$cacheTr.length;j++){
					var cache_son={}
					cache_son.proxy_cache_path=$($cacheTr[j]).find('input[name^="Cache\[proxy_cache_path\]"]').val();
					cache_son.levels=$($cacheTr[j]).find('input[name^="Cache\[levels\]"]').val();
					cache_son.keys_zone_befor=$($cacheTr[j]).find('input[name^="Cache\[keys_zone_befor\]"]').val();
					cache_son.keys_zone_behind=$($cacheTr[j]).find('input[name^="Cache\[keys_zone_behind\]"]').val();
					cache_son.inactive=$($cacheTr[j]).find('input[name^="Cache\[inactive\]"]').val();
					cache_son.max_size=$($cacheTr[j]).find('input[name^="Cache\[max_size\]"]').val();
					cache.cache_son.push(cache_son);
				}
				data.set_data.cache.push(cache);
			}
			//Server JSON数据组装
			data.set_data.server=[];
			var ServerTable=$('.UpstreamConfig').find('table'),$workGrade=$('.UpstreamConfig').find('.workGrade');
			for(var i=0;i<ServerTable.length;i++){
				var server={}
				server.take_effect_level=[];
				var configIndex=$(ServerTable[i]).attr('name');
				for(var j=0;j<$workGrade.find('.chk').length;j++){
					if($($workGrade.find('.chk')[j]).attr('data-name')==configIndex){
						server.take_effect_level.push($($workGrade.find('.chk')[j]).attr('data-val'));
					}
				}
				server.upstream=$(ServerTable[i]).find('span[name^="Server\[upstream\]"]').html();
				server.server=$(ServerTable[i]).find('span[name^="Server\[server\]"]').html();
				server.listen=$(ServerTable[i]).find('input[name^="Server\[listen\]"]').val();
				server.upstream_port=$(ServerTable[i]).find('input[name^="Server\[upstream_port\]"]').val();
				server.custom_setting=$(ServerTable[i]).find('textarea[name^="Server\[custom_setting\]"]').val();
				data.set_data.server.push(server);
			}
			//Location 组装location配置JSON数据
			data.set_data.location=[];
			var LocationConfigs=$('.LocationGroup').find('.LocationConfig');
			for(var c=0;c<LocationConfigs.length;c++){
				var location={};
				var $LocationConfig=$(LocationConfigs[c]);
				var $workgradeLoc=$LocationConfig.find('.workGradeLoc');
				location.name=$workgradeLoc.find('input').val();
				if($($workgradeLoc.find('span')[0]).hasClass('ant-switch-checked')){
					location.use="on";
				}else{
					location.use="off";
				}
				location.index=String(c);
				location.info=[];
				var locationTable=$LocationConfig.find('table');
				for(var i=0;i<locationTable.length;i++){
					var _location={}
					if($(locationTable[i]).find('.ant-switch').hasClass('ant-switch-checked')){
						_location.proxy_pattern='on';
						_location.proxy_pass=$(locationTable[i]).find('input[name^="location\[proxy_pass\]"]').val();
						_location.proxy_cache=$(locationTable[i]).find('input[name^="location\[proxy_cache\]"]').val();
						_location.proxy_cache_key=$(locationTable[i]).find('input[name^="location\[proxy_cache_key\]"]').val();
						_location.proxy_cache_valid=$(locationTable[i]).find('input[name^="location\[proxy_cache_valid\]"]').val();
						var _set_header=$(locationTable[i]).find('input[name^="location\[proxy_set_header\]"]');
						_location.proxy_set_header=[];
						for(var j=0;j<_set_header.length;j++){
							_location.proxy_set_header.push($(_set_header[j]).val());
						}
						var _add_header=$(locationTable[i]).find('input[name^="location\[add_header\]"]');
						_location.add_header=[];
						for(var j=0;j<_add_header.length;j++){
							_location.add_header.push($(_add_header[j]).val());
						}
					}else{
						_location.proxy_pattern='off';
					}
					_location.custom_setting=$(locationTable[i]).find('textarea[name^="location\[custom_setting\]"]').val();
					var $workGrade=$LocationConfig.find('.workGrade'),configIndex=$(locationTable[i]).attr('name');
					_location.take_effect_level=[];
					for(var j=0;j<$workGrade.find('.chk').length;j++){
						if($($workGrade.find('.chk')[j]).attr('data-name')==configIndex){
							_location.take_effect_level.push($($workGrade.find('.chk')[j]).attr('data-val'));
						}
					}
					location.info.push(_location);
				}

				//302服务数据组装
				if($('.TZTConfig').find('.ant-switch').hasClass('ant-switch-checked')){
					data.set_data['302use']="on";
				}else{
					data.set_data['302use']="off";
				}

				data.set_data.location.push(location);
			}
			//返回组装完成的数据
			return data;
		},
		addChannel:function(){
			var data={};
				data.client_name=$('#Channel_add').find('input[name="customer"]').val();
			    data.channel_name=$('#Channel_add').find('input[name="channel"]').val();
				data.type='nginx';
			return data;
		},
		copyChannel:function(){
			var data={};
			data.client_name=$('#Channel_copy').find('input[name="customer"]').val();
			data.channel_name=$('#Channel_copy').find('input[name="channel"]').val();
			data.type="nginx";
			return data;
		},
		editChannel:function(){
			var data={};
				data.client_name=$('#Channel_edit').find('input[name="customer"]').val();
				data.channel_name=$('#Channel_edit').find('span[name="channel"]').text();
				data._id=$('#Channel_edit').find('input[name="channel_id"]').val();
			return data;
		},
		userAdd:function(){
			var data={},$userAdd=$('#user_add');
			data.name=$userAdd.find('input[name="username"]').val();
			data.password=$userAdd.find('input[name="password"]').val();
			data.role=$userAdd.find('input:checked').val();
			data.email=$userAdd.find('input[name="email"]').val();
			data.telephone=$userAdd.find('input[name="phone"]').val();
			data.remarks=$userAdd.find('textarea[name="description"]').val();
			data.name=$userAdd.find('input[name="username"]').val();
			data.qq=$userAdd.find('input[name="qq"]').val();
			data.linkman=$userAdd.find('input[name="contacter"]').val();
			data.state='1';
			return data;
		},
		userEdit:function(){
			var data={},$userEdit=$('#userEdit');
			data.name=$userEdit.find('.account').text();
			data._id=$userEdit.find('input[name="id"]').val();
			data.email=$userEdit.find('input[name="email"]').val();
			data.linkman=$userEdit.find('input[name="contacter"]').val();
			data.telephone=$userEdit.find('input[name="phone"]').val();
			data.remarks=$userEdit.find('textarea[name="description"]').val();
			data.qq=$userEdit.find('input[name="qq"]').val();
			data.state='1';
			return data;
		},
		personEdit:function(){
			var data={},$personEdit=$('#personEdit');
			data.name=$personEdit.find('.account').text();
			data._id=$personEdit.find('input[name="id"]').val();
			data.email=$personEdit.find('input[name="email"]').val();
			data.telephone=$personEdit.find('input[name="phone"]').val();
			data.remarks=$personEdit.find('textarea[name="description"]').val();
			data.qq=$personEdit.find('input[name="qq"]').val();
			data.state='1';
			return data;
		},
        passwordEdit:function(){
            var data={};
            data._id=$('#resetP').val();
            data.password=$('#newpsw').val();
            return data;
        },
        resetPassword:function(){
            var data={},$resetP=$('#setPwd');
            data._id=$resetP.find('input[name="id"]').val();
            data.old_password=$resetP.find('input[name="oldPwd"]').val();
            data.new_password=$resetP.find('input[name="password"]').val();
            return data;
        }
	};
	//返回数据的类型 nginx或者taskLog; For example: getDataName.nginx
	return getDataName[model]();
}
/**
 * 提示信息
 * @param string txt
 * */
export function alertMsg(txt, closeSecond, flag, fmode) {
	if (fmode) {
		$(fmode).modal('hide');
	}

	$("#alertcontent").html(txt);
	$('#alertdiog').modal('show');
	$('#alertdiog').show();
	var secs = closeSecond || 0; //倒计时的秒数
	if (secs > 0) {
		if (!flag) { //关闭不刷新页面
			window.setTimeout("$('#alertdiog').modal('hide')", secs * 1000);
			return false;
		}
		window.setTimeout('window.location.reload(true)', secs * 1000);
	}
}
// alert、conform弹框
function Modal () {
	window.Modal = function () {
		var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
		var alr = $("#delModal");
		var mask = $('.mask');
		var ahtml = alr.html();
		var _alert = function (options) {
			_public("alert", options);
			return {
				on: function (callback) {
					if (callback && callback instanceof Function) {

						alr.find(".close").click(function () {
							_closed(mask, alr);
						})

						alr.find('.ok').click(function () {
							callback(true);
							_closed(mask, alr);
						});
					}
				}
			};
		};

		var _close = function (options) {
			_closed(mask, alr);
		};

		var _confirm = function (options) {

			_public("confirm", options);
			return {
				on: function (callback) {
					if (callback && callback instanceof Function) {

						alr.find(".close").click(function () {
							_closed(mask, alr);
						})

						alr.find('.ok').click(function () {
							callback(true);
							_closed(mask, alr);
						});


						alr.find('.cancel').click(function () {
							callback(false);
							_closed(mask, alr);
						});


					}
				}
			};
		};

		var _public = function (name, options) {
			//console.log(ahtml);
			alr.html(ahtml);
			mask.css({
				'display': 'block'
			});
			_center(alr);
			var $find = alr.find('.cancel');
			var $findBtn = alr.find('.ok');
			name == "confirm" ? $find.show() : $find.hide();
			options.btnok == '' ? $findBtn.hide() : $findBtn.show();
			_dialog(options);
		}


		var _dialog = function (options) {
			var ops = {
				msg: "提示内容",
				title: "操作提示",
				btnok: "确定",
				btncl: "取消"
			};

			$.extend(ops, options);
			var html = alr.html().replace(reg, function (node, key) {
				return {
					Title: ops.title,
					Message: ops.msg,
					BtnOk: ops.btnok,
					BtnCancel: ops.btncl
				}[key];
			});

			alr.html(html);
		}

		var _center = function (obj) {
			var screenWidth = $(window).width(),
				screenHeight = $(window).height(); //当前浏览器窗口的 宽高
			var scrolltop = $(document).scrollTop(); //获取当前窗口距离页面顶部高度
			var objLeft = (screenWidth - obj.width()) / 2;
			var objTop = (screenHeight - obj.height()) / 10 + scrolltop;
			obj.css({
				left: objLeft + 'px',
				top: objTop + 'px',
				'display': 'block'
			});

			//浏览器窗口大小改变时
			$(window).resize(function () {
				screenWidth = $(window).width();
				screenHeight = $(window).height();
				scrolltop = $(document).scrollTop();
				objLeft = (screenWidth - obj.width()) / 2;
				objTop = (screenHeight - obj.height()) / 10 + scrolltop;
				obj.css({
					left: objLeft + 'px',
					top: objTop + 'px'
				});
			});

			//浏览器有滚动条时的操作、
			$(window).scroll(function () {
				screenWidth = $(window).width();
				screenHeight = $(window).height();
				scrolltop = $(document).scrollTop();
				objLeft = (screenWidth - obj.width()) / 2;
				objTop = (screenHeight - obj.height()) / 10 + scrolltop;
				obj.css({
					left: objLeft + 'px',
					top: objTop + 'px'
				});
			});
		};

		// 隐藏操作
		var _closed = function (obj1, obj2) {
			obj1.fadeOut();
			obj2.fadeOut();
		}

		return {
			alert: _alert,
			confirm: _confirm,
			closed: _close
		}

	}();
}
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /*, from*/ ) {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;

		for (; from < len; from++) {
			if (from in this &&
				this[from] === elt)
				return from;
		}
		return -1;
	};
}
/*
 * msg 必填  提示信息
 * closetime 选填  关闭弹框时间，0表示不关闭，默认为0
 * refresh   选填  true为关闭弹窗刷新，false为不刷新，默认false
 * new ShowDiag({msg:'没有数据...',closetime:0,refresh:false});
 * */
export function ShowDiag(json) {
	this.diag = $('#fdiag');
	this.bg = $('#lbOverlay');
	this.content = $('#lbCenter > span');
	this.lbCenterBox = $('#lbCenter');
	this.msg = json.msg;
	this.closetime = typeof json.closetime == 'undefined' ? 0 : parseInt(json.closetime);
	this.refresh = typeof json.refresh == 'undefined' ? false : json.refresh;
	this.init();
}
ShowDiag.prototype = {
	init: function() {
		var _this = this;
		this.content.text(this.msg);
		this.diag.show(); //显示弹框
		//滚动条滚动监听
		_this.scroll();
		$(window).on('scroll', function() {
			_this.scroll();
		});
		//点击背景关闭弹框
		this.diag.on('click', function() {
			_this.click();
		});
		//如果this.closetime为0，不自动关闭弹框
		if (this.closetime) {
			this.timer(this.closetime);
		}
	},
	click: function() {
		this.timer();
	},
	timer: function(n) {
		var timer, _this = this;
		if (n) {
			clearTimeout(timer);
			timer = setTimeout(function() {
				_this.diag.hide();
				_this.content.text('');
				_this.isrefresh();
			}, n * 1000);
		} else {
			_this.diag.hide();
			_this.content.text('');
			this.isrefresh();
		}
	},
	isrefresh: function() {
		if (this.refresh) {
			window.location.reload(true);
		}
	},
	scroll: function() {
		var sleft = $(window).scrollLeft() + ($(window).width() - this.lbCenterBox.outerWidth()) / 2;
		var sstop = $(window).scrollTop() + ($(window).height() - this.lbCenterBox.outerHeight()) / 8;
		this.lbCenterBox.css({
			left: sleft,
			top: sstop
		});
	}
};


//开始时间和结束时间
export function Datetimepicker_Start_End(element,start,end){
	$(element).find(start).datetimepicker({
		format:'yyyy-mm-dd hh:ii:ss',
		language:  'zh-CN',
		weekStart: 1,
		todayBtn:  1,
		autoclose: true,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		showMeridian: 1,
		pickerPosition:'bottom-left'
	}).on("changeDate",function(ev){
		$(element).find(end).datetimepicker("setStartDate",  $(element).find(start).find('input').val());
	});
	$(element).find(end).datetimepicker({
		format:'yyyy-mm-dd hh:ii:ss',
		language:  'zh-CN',
		weekStart: 1,
		todayBtn:  1,
		autoclose: true,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		showMeridian: 1,
		pickerPosition:'bottom-left'
	}).on("changeDate",function(ev){
		$(element).find(start).datetimepicker("setEndDate",  $(element).find(end).find('input').val());
	});
}
/*
* auther liang
* Nginx 动态添加频道
*/
/*export function addChannel(form){
	this.$form=$(form);
	this.init();
}
addChannel.prototype={
	init:function(){
		this.add();
		this.remove();
	},
	add:function(){
		var _this=this;
		this.$form.find('.f-cnladdBtn').on('click',function(){
			var str='<div class="form-group"> <label  class="col-xs-2 control-label"></label><div class="col-xs-9"><input type="text" name="channel'+new Date().getTime()+'" class="form-control"></div><label class="control-label textLeft f-cnladd "><span class="glyphicon glyphicon-remove f-Channelremove"></span><span class="glyphicon glyphicon-plus f-cnladdBtn"></span></label></div>';
			if(_this.$form.find('input[name^="channel"]').length==1){
				$(this).before('<span class="glyphicon glyphicon-remove f-Channelremove">');
			}
			$(this).closest('.form-group').after(str);
			$(this).remove();
			_this.add();
			_this.remove();
		});
	},
	remove:function(){
		var _this=this;
		this.$form.find('.f-Channelremove').on('click',function(){
			$(this).closest('.form-group').remove();
			if($($(_this.$form.find('.form-group')[1]).find('label')[0]).text()==""){
				$($(_this.$form.find('.form-group')[1]).find('label')[0]).html('<span class="red">*</span><!-- react-text: 193 --> 频道：<!-- /react-text -->');
			}
			if(_this.$form.find('input[name^="channel"]').length>1){
				if(_this.$form.find('.f-cnladdBtn').length==0){
					$(_this.$form.find('.f-cnladd')[_this.$form.find('.f-cnladd').length-1]).append('<span class="glyphicon glyphicon-plus f-cnladdBtn"></span>');
				}
			}else{
				_this.$form.find('.f-cnladd').html('<span class="glyphicon glyphicon-plus f-cnladdBtn"></span>');
			}
			_this.add();
		});
	}
}*/
/*
 auther liang
 Nginx 动态加载功能
*/

//省份
var  PROVICES={
    "0":"请选择",
	"BJ":"北京",
	"TJ":"天津",
	"HE":"河北",
	"SX":"山西",
	"LN":"辽宁",
	"NM":"内蒙古",
	"JL":"吉林",
	"HL":"黑龙江",
	"SH":"上海",
	"JS":"江苏",
	"ZJ":"浙江",
	"AH":"安徽",
	"FJ":"福建",
	"JX":"江西",
	"SD":"山东",
	"HA":"河南",
	"HB":"湖北",
	"HN":"湖南",
	"GD":"广东",
	"GX":"广西",
	"HI":"海南",
	"CQ":"重庆",
	"SC":"四川",
	"GZ":"贵州",
	"YN":"云南",
	"XZ":"西藏",
	"SN":"陕西",
	"GS":"甘肃",
	"QH":"青海",
	"NX":"宁夏",
	"XJ":"新疆",
	"HK":"香港",
	"MC":"澳门",
	"TW":"台湾"
};
//运营商
var OPERATORS ={
    "0":"请选择",
	"CHN":"中国电信",
	"UNI":"中国联通",
	"CMN":"中国移动",
	"CTT":"中国铁通",
	"CER":"中国教育",
	"GWB":"长城宽带",
	"BNN":"方正宽带",
	"CST":"中国科技",
	"BGC":"歌华有线",
	"WAS":"华数有线",
	"RFT":"广电网",
	"CNE":"中企通信",
	"ALY":"阿里云",
	"BWN":"京宽网络",
	"FLC":"中电飞华",
	"TPW":"天威视讯",
	"OCN":"东方有线",
	"GDC":"珠江宽频",
	"JSC":"江苏有线",
	"HNC":"湖南有线",
	"GDC":"广东有线",
	"GGL":"谷歌公司",
	"360":"360",
	"GDC":"视讯宽带",
	"EHN":"广州e家宽",
	"HGC":"和记电讯",
	"KJN":"北京宽捷",
	"SXT":"北京三信时代",
	"SNN":"光环新网",
	"CNE":"中信网络",
	"FRG":"国外"
};
function getIsp(ele,index){
	var isps=[];
	for(var x in OPERATORS) {
		if(x==index){
			isps.push('<option selected="selected" value="'+x+'">'+OPERATORS[x]+'</option>');
		}else{
			isps.push('<option value="'+x+'">'+OPERATORS[x]+'</option>');
		}
	}
	$(ele).html(isps);
}
function getProv(ele,index){
	var provs=[];
	for(var x in PROVICES) {
		if(x==index){
			provs.push('<option selected="selected" value="'+x+'">'+PROVICES[x]+'</option>');
		}else{
			provs.push('<option value="'+x+'">'+PROVICES[x]+'</option>');
		}
	}
	$(ele).html(provs);
}
export function Nginx_Add_baseConfig(model){
	this.model=$(model);
	this.init();
}
Nginx_Add_baseConfig.prototype={
	init:function(){
		this.defaultAdd();
		this.defaultRemove();
		this.ispAdd();
		this.ispRemove();
		this.isp_defaultAdd();
		this.isp_defaultRemove();
		this.prov_Add();
		this.prov_Remove();
		this.prov_Ip_Add();
        this.prov_Ip_Remove();
	},
	defaultAdd:function(){
		this.model.find('.defaultAdd').off('click');
		var _this=this;
		this.model.find('.defaultAdd').on('click',function(){
			var $div= $(this).closest('.form-group');
			$div.after(_this.addStr('defaultAdd'));
			_this.defaultAdd();
			_this.defaultRemove();
		});
	},
	defaultRemove:function(){
		this.model.find('.defaultRemove').off('click');
		this.model.find('.defaultRemove').on('click',function(){
			$(this).closest('.form-group').remove();
		});
	},
	ispAdd:function(){
		var _this=this;
		this.model.find('.ispAdd').off('click');
		this.model.find('.ispAdd').on('click',function(){
			var $div= $(this).closest('.Isp_Box');
			$div.after(_this.addStr('ispAdd'));
			window.scroll(0,$div.next().position().top-105);
			_this.ispAdd();
			getIsp($div.next().find('select[name="isp"]').last());
			getProv($div.next().find('select[name="area"]').last());
			_this.ispRemove();
			_this.isp_defaultAdd();
			_this.prov_Add();
			_this.prov_Ip_Add();
			//运营商监听
			$('select[name="isp"]').off('change');
			$('select[name="isp"]').on('change',function(){
				if($(this).val()!='0'){
					var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
					$(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
					$(ip).removeClass('ignore');
				}else{
					var ip=$(this).closest('.Isp_Box').find('input[name^="defaultIpd"]')[0];
					$(ip).addClass('ignore');
				}
			});
			//省份监听
			$('select[name="area"]').off('change');
			$('select[name="area"]').on('change',function(){
				if($(this).val()!='0'){
					var ip=$(this).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
					$(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
					$(ip).removeClass('ignore');
				}else{
					var ip=$(this).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
					$(ip).addClass('ignore');
				}
			});
		});
	},
	ispRemove:function(){
		this.model.find('.ispRemove').off('click');
		this.model.find('.ispRemove').on('click',function(){
			$(this).closest('.Isp_Box').remove();
		});
	},
	isp_defaultAdd:function(){
		this.model.find('.isp_defaultAdd').off('click');
		var _this=this;
		this.model.find('.isp_defaultAdd').on('click',function(){
			var $div= $(this).closest('.form-group');
			$div.after(_this.addStr('isp_defaultAdd'));
			_this.isp_defaultAdd();
			_this.isp_defaultRemove();
		});
	},
	isp_defaultRemove:function(){
		this.model.find('.isp_defaultRemove').off('click');
		this.model.find('.isp_defaultRemove').on('click',function(){
			$(this).closest('.form-group').remove();
		});
	},
	prov_Add:function(){
		this.model.find('.prov_Add').off('click');
		var _this=this;
		this.model.find('.prov_Add').on('click',function(){
			var $div= $(this).closest('.province_Box');
			$div.after(_this.addStr('prov_Add'));
			getProv($div.next().find('select[name="area"]').last());
			_this.prov_Add();
			_this.prov_Remove();
			_this.prov_Ip_Add();
            $('select[name="area"]').off('change');
            $('select[name="area"]').on('change',function(){
                if($(this).val()!='0'){
                    var ip=$(this).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                    $(ip).attr({'data-rule-required':'true','data-msg-required':'请填写IP'});
                    $(ip).removeClass('ignore');
                }else{
                    var ip=$(this).closest('.province_Box').find('input[name^="defaultIpP"]')[0];
                    $(ip).addClass('ignore');
                }
            });
		})
	},
	prov_Remove:function(){
		this.model.find('.prov_Remove').off('click');
		this.model.find('.prov_Remove').on('click',function(){
			$(this).closest('.province_Box').remove();
		});
	},
	prov_Ip_Add:function(){
		this.model.find('.prov_Ip_Add').off('click');
		var _this=this;
		this.model.find('.prov_Ip_Add').on('click',function(){
			var $div= $(this).closest('.form-group');
			$div.after(_this.addStr('prov_Ip_Add'));
			_this.prov_Ip_Add();
			_this.prov_Ip_Remove();
		})
	},
	prov_Ip_Remove:function(){
		this.model.find('.prov_Ip_Remove').off('click');
		this.model.find('.prov_Ip_Remove').on('click',function(){
			$(this).closest('.form-group').remove();
		});
	},
	addStr:function(flag){
		switch (flag){
			case 'defaultAdd':
				var defalut_str='<div class="form-group base_default" style="min-width:500px"><label class="col-xs-4 text-right control-label"></label><div class="col-xs-8 defaultIp"><input  name="defaultIp'+new Date().getTime()+'"  type="text" class="form-control"/><span><input type="radio" class="ip_main" checked="checked"  name="defaultIp_class'+new Date().getTime()+'"/>主</span><span><input type="radio" class="ip_back" name="defaultIp_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 defaultRemove"></a></div></div>'
				return defalut_str;
				break;
			case 'ispAdd':
				var isp_str='<div class="form-group Isp_Box"><div class="form-group"><label class="col-xs-4 text-right control-label">运营商:</label><div class="col-xs-8"><select name="isp" class="form-control"><option value="0">请选择</option></select>'
					+'<div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 ispAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 ispRemove"></a></div></div></div>'
					+'<div class="form-group"><label class="col-xs-4 text-right control-label">默认:</label><div class="col-xs-8 defaultIp"><input type="text"   name="defaultIpd'+new Date().getTime()+'" class="form-control"/><span><input type="radio" checked="checked" class="ip_main"  name="defaultIp1_class'+new Date().getTime()+'"/>主</span><span><input type="radio" class="ip_back" name="defaultIp1_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a></div></div>'
					+'<div class="province_Box"><div class="prov_box"><div class="form-group"><label class="col-xs-4 text-right control-label">省份:</label><div class="col-xs-8"><select  name="area" class="form-control"><option value="0">请选择</option></select><div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 prov_Add"></a></div></div></div>'
					+'<div class="form-group"><label class="col-xs-4 text-right control-label">IP配置:</label><div class="col-xs-8 defaultIp"><input type="text"   name="defaultIpP'+new Date().getTime()+'" class="form-control" value=""/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+new Date().getTime()+'"/>主</span><span><input type="radio" class="ip_back" name="provIp1_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a></div></div></div></div></div></div>';
				return isp_str;
				break;
			case 'isp_defaultAdd':
				var isp_default_str='<div class="form-group"><label class="col-xs-4 text-right control-label"></label><div class="col-xs-8 defaultIp"><input    name="defaultIpd'+new Date().getTime()+'" class="form-control"/> <span><input type="radio" checked="checked" class="ip_main"  name="defaultIp1_class'+new Date().getTime()+'"/>主</span> <span><input type="radio" class="ip_back" name="defaultIp1_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 isp_defaultRemove"></a></div></div>'
				return isp_default_str;
				break;
			case 'prov_Add':
				var prov_str='<div class="province_Box"> <div class="prov_box"> <div class="form-group"> <label class="col-xs-4 text-right control-label">省份:</label><div class="col-xs-8"><select  name="area" class="form-control"><option value="0">请选择</option></select> <div class="plus_remove"> <a class="glyphicon glyphicon-plus green f-ml5 prov_Add"></a> <a class="glyphicon glyphicon-remove red f-ml5 prov_Remove"></a> </div> </div> </div> <div class="form-group"> <label class="col-xs-4 text-right control-label">IP配置:</label><div class="col-xs-8 defaultIp"><input type="text" name="defaultIpP'+new Date().getTime()+'" class="form-control" value=""/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+new Date().getTime()+'"/>主</span><span><input type="radio" class="ip_back" name="provIp1_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a></div></div> </div> </div>'
				return prov_str;
				break;
			case 'prov_Ip_Add':
				var prov_Ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label"></label><div class="col-xs-8 defaultIp"><input type="text" name="defaultIpP'+new Date().getTime()+'"  class="form-control" value=""/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+new Date().getTime()+'"/>主</span><span><input type="radio" class="ip_back" name="provIp1_class'+new Date().getTime()+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a><a class="glyphicon glyphicon-remove red f-ml5 prov_Ip_Remove"></a></div></div>';
				return prov_Ip_str;
				break;
		}
	}
}

export function Nginx_Add_Model (plusBtn,Model){
	this.$btn=$(plusBtn);
	this.$model=$(Model);
	this.init();
}
Nginx_Add_Model.prototype={
	init:function(){
		this.highAdd();
		this.highDel();
		this.innerAdd();
		this.innerDel();
		this.upAdd();
		this.downAdd();
		var _this=this;
		this.trigger(this.$model.find('.Config_Tab_Box').find('li'));
		this.$model.find('.workGrade').find('.chk').on('ifChecked',function(){
			$(this).val('on');
			$(this).attr('data-name',_this.$model.find('.Config_Tab_Active').attr('name'));
		});
		this.$model.find('.workGrade').find('.chk').on('ifUnchecked',function(){
			$(this).val('off');
			$(this).attr('data-name','');
		});
        //代理模式点击
        $('.Switch_tr').off('click');
        $('.Switch_tr').on('click',function(e){
			if(!($(this).hasClass('ant-switch-disabled'))){
				if($(this).hasClass('ant-switch-checked')){
					$(this).removeClass('ant-switch-checked');
					var tr_triggers=$(this).closest('table').find('.tr_trigger');
					$(tr_triggers).addClass('f-hide');
					for(var i=0;i<tr_triggers.length;i++){
						$(tr_triggers[i]).find('input').addClass('ignore');
					}
					$(this).closest('table').find('textarea').removeClass('ignore');
				}else{
					$(this).addClass('ant-switch-checked');
					var tr_triggers=$(this).closest('table').find('.tr_trigger');
					$(tr_triggers).removeClass('f-hide');
					for(var i=0;i<tr_triggers.length;i++){
						$(tr_triggers[i]).find('input').removeClass('ignore');
					}
					$(this).closest('table').find('textarea').addClass('ignore');

				}
			}
			e.stopPropagation();
			e.preventDefault();
        });
		var chk = this.$model.find('.chk')[0];
		$(chk).off('ifChecked');
		$(chk).off('ifUnchecked');
		$(chk).on('ifChecked',function(){
			$(this).val('on');
			$(this).attr('data-name',_this.$model.find('.Config_Tab_Active').attr('name'));
			var table= _this.$model.find('table[name="'+_this.$model.find('.Config_Tab_Active').attr('name')+'"]');
			$(table).find('.ant-switch').addClass('ant-switch-disabled');
			$(table).find('.ant-switch').removeClass('ant-switch-checked');
			$(table).find('.tr_trigger').addClass('f-hide');
		});
		$(chk).on('ifUnchecked',function(){
			$(this).val('off');
			$(this).attr('data-name','');
			var table= _this.$model.find('table[name="'+_this.$model.find('.Config_Tab_Active').attr('name')+'"]');
			$(table).find('.ant-switch').removeClass('ant-switch-disabled');
		});
	},
	upAdd:function(){
		var _this=this;
		$('.upAddBtn').off('click');
		$('.upAddBtn').on('click',function(){
			$(this).closest('.LocationConfig').before(_this.tableAddStr('','loactionAdd'));
			_this.upAdd();
			_this.downAdd();
			_this.locationRemove();
			//模块Trigger
			$('.configTrigger').off('click');
			$('.configTrigger').on('click',function(){
				if($(this).closest('.configNginx').find('.Config_Content').hasClass('f-hide')){
					$(this).closest('.configNginx').find('.Config_Content').removeClass('f-hide');
				}else{
					$(this).closest('.configNginx').find('.Config_Content').addClass('f-hide');
				}
			});
			//代理模式点击
			$('.Switch_tr').off('click');
			$('.Switch_tr').on('click',function(e){
				if(!($(this).hasClass('ant-switch-disabled'))){
					if($(this).hasClass('ant-switch-checked')){
						$(this).removeClass('ant-switch-checked');
						var tr_triggers=$(this).closest('table').find('.tr_trigger');
						$(tr_triggers).addClass('f-hide');
						for(var i=0;i<tr_triggers.length;i++){
							$(tr_triggers[i]).find('input').addClass('ignore');
						}
						$(this).closest('table').find('textarea').removeClass('ignore');
					}else{
						$(this).addClass('ant-switch-checked');
						var tr_triggers=$(this).closest('table').find('.tr_trigger');
						$(tr_triggers).removeClass('f-hide');
						for(var i=0;i<tr_triggers.length;i++){
							$(tr_triggers[i]).find('input').removeClass('ignore');
						}
						$(this).closest('table').find('textarea').addClass('ignore');

					}
				}
				e.stopPropagation();
				e.preventDefault();
			});
			var $model=$(this).closest('.LocationConfig').prev();
			//初始化check
			$model.find('.chk').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%'
			});
			//生效层级点击
			$model.find('.workGradeLoc').find('.ant-switch').on('click',function(){
				if(!($(this).hasClass('ant-switch-disabled'))){
					if($(this).hasClass('ant-switch-checked')) {
						$(this).removeClass('ant-switch-checked');
					}else{
						$(this).addClass('ant-switch-checked');
					}
				}
			});
			if($('.LocationGroup').find('.topRemoveBtn').length>1){
				$('.LocationGroup').find('.topRemoveBtn').css('display','');
			}
			new Nginx_Add_Model($model.find('.highPlusBtn'),$model);
			//tooltip初始化
			$("[data-toggle='tooltip']").tooltip();
		});
	},
	downAdd:function(){
		var _this=this;
		$('.downAddBtn').off('click');
		$('.downAddBtn').on('click',function(){
			$(this).closest('.LocationConfig').after(_this.tableAddStr('','loactionAdd'));
			_this.upAdd();
			_this.downAdd();
			_this.locationRemove();
			//模块Trigger
			$('.configTrigger').off('click');
			$('.configTrigger').on('click',function(){
				if($(this).closest('.configNginx').find('.Config_Content').hasClass('f-hide')){
					$(this).closest('.configNginx').find('.Config_Content').removeClass('f-hide');
				}else{
					$(this).closest('.configNginx').find('.Config_Content').addClass('f-hide');
				}
			});
			//代理模式点击
			$('.Switch_tr').off('click');
			$('.Switch_tr').on('click',function(e){
				if(!($(this).hasClass('ant-switch-disabled'))){
					if($(this).hasClass('ant-switch-checked')){
						$(this).removeClass('ant-switch-checked');
						var tr_triggers=$(this).closest('table').find('.tr_trigger');
						$(tr_triggers).addClass('f-hide');
						for(var i=0;i<tr_triggers.length;i++){
							$(tr_triggers[i]).find('input').addClass('ignore');
						}
						$(this).closest('table').find('textarea').removeClass('ignore');
					}else{
						$(this).addClass('ant-switch-checked');
						var tr_triggers=$(this).closest('table').find('.tr_trigger');
						$(tr_triggers).removeClass('f-hide');
						for(var i=0;i<tr_triggers.length;i++){
							$(tr_triggers[i]).find('input').removeClass('ignore');
						}
						$(this).closest('table').find('textarea').addClass('ignore');
					}
				}
				e.stopPropagation();
				e.preventDefault();
			});
			var $model=$(this).closest('.LocationConfig').next();
			//初始化chk
			$model.find('.chk').iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%'
			});
			//生效层级点击
			$model.find('.workGradeLoc').find('.ant-switch').on('click',function(){
				if(!($(this).hasClass('ant-switch-disabled'))){
					if($(this).hasClass('ant-switch-checked')) {
						$(this).removeClass('ant-switch-checked');
					}else{
						$(this).addClass('ant-switch-checked');
					}
				}
			});
			$(_this).closest('.configNginx').remove();
			if($('.LocationGroup').find('.topRemoveBtn').length>1){
				$('.LocationGroup').find('.topRemoveBtn').css('display','');
			}
			new Nginx_Add_Model($model.find('.highPlusBtn'),$model);
			//tooltip初始化
			$("[data-toggle='tooltip']").tooltip();
		});
	},
	locationRemove:function(){
		$('.topRemoveBtn').off('click');
		$('.topRemoveBtn').on('click',function(){
			var _this=this;
			window.Modal.confirm({
				msg: '确认要删除此配置吗？',
				title: '删除',
				btnok: "确定",
				btncl: "取消"
			}).on(function(e) {
				if (e) {
					$(_this).closest('.configNginx').remove();
					if($('.LocationGroup').find('.topRemoveBtn').length==1){
						$('.LocationGroup').find('.topRemoveBtn').css('display','none');
					}
				}
			});
		});
	},
	highAdd:function(){
		var _this=this;
		this.$btn.off('click');
		this.$btn.on('click',function(){
			if(_this.workGradeSelected()){
				//增加配置Tab
				var $_ul=$(this).closest('.Config_Content').find('.Config_Tab_Box'),_config={config1:{id:'config1',name:'配置1'},config2:{id:'config2',name:'配置2'},config3:{id:'config3',name:'配置3'},config4:{id:'config4',name:'配置4'}};
				var _li1='<li class="f-ml-1 Config_Tab_Active">',_li2='<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>';
				for(var i=0;i<$_ul.find('li').length;i++){
					for(var x in _config){
						if(_config[x]['name']==$($_ul.find('li')[i]).text().trim()){
							delete _config[x];
						}
					}
				}
				$_ul.find('li').removeClass('Config_Tab_Active');
				var index=0,_ConfigName;
				for(var x in _config){
					if(index==0){
						$_ul.append(_li1+_config[x]['name']+_li2);
						$_ul.find('.Config_Tab_Active').attr('name',_config[x]['id']);
						_ConfigName=_config[x]['id'];
					}
					++index;
				}
				if($($_ul.find('li')[0]).find('.highRemoveBtn').length<1){
					$($_ul.find('li')[0]).append('<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i>');
				}
				_this.highDel();
				_this.trigger($_ul.find('li'));
				//增加配置Table
				var $con=$(this).closest('.Config_Content').find('.Config_Content_Box');
				$con.find('table').css('display','none');
				if(_this.$model.selector){
					$con.append(_this.tableAddStr(_ConfigName,_this.$model.selector));
				}else{
					$con.append(_this.tableAddStr(_ConfigName,'.LocationConfig'));
					$(_this.$model.find('.ant-switch').last()).on('click',function(){
						if(!($(this).hasClass('ant-switch-disabled'))){
							if($(this).hasClass('ant-switch-checked')){
								$(this).removeClass('ant-switch-checked');
								var tr_triggers=$(this).closest('table').find('.tr_trigger');
								$(tr_triggers).addClass('f-hide');
								for(var i=0;i<tr_triggers.length;i++){
									$(tr_triggers[i]).find('input').addClass('ignore');
								}
								$(this).closest('table').find('textarea').removeClass('ignore');
							}else{
								$(this).addClass('ant-switch-checked');
								var tr_triggers=$(this).closest('table').find('.tr_trigger');
								$(tr_triggers).removeClass('f-hide');
								for(var i=0;i<tr_triggers.length;i++){
									$(tr_triggers[i]).find('input').removeClass('ignore');
								}
								$(this).closest('table').find('textarea').addClass('ignore');
							}
						}
					});
				}
				_this.innerAdd();
				_this.innerDel();
				//tooltip初始化
				$("[data-toggle='tooltip']").tooltip();
			}
		});
	},
	highDel:function(){
		$('.highRemoveBtn').on('click',function(){
			var _this=this;
			window.Modal.confirm({
				msg: '确认要删除此配置吗？',
				title: '删除',
				btnok: "确定",
				btncl: "取消"
			}).on(function(e) {
				if (e) {
					var model=$(_this).closest('.configNginx');
					var $_ul=$(_this).closest('ul'),$_li=$(_this).closest('li');
					if($_li.hasClass('Config_Tab_Active')){
						$(_this).closest('li').remove();
						$($_ul.find('li')[0]).addClass('Config_Tab_Active');
						var chks=$($(model).find('.workGrade')).find('.chk');
						for(var i=0;i<chks.length;i++){
							if($(chks[i]).attr('data-name')==$_li.attr('name')){
								$(chks[i]).attr('data-name','');
								$(chks[i]).iCheck('uncheck');
								$(chks[i]).val('off');
							}
							if($(chks[i]).attr('data-name')==$($_ul.find('li')[0]).attr('name')){
								$(chks[i]).attr('name','enable');
								$(chks[i]).iCheck('enable');
							}
						}
					}else{
						$(_this).closest('li').remove();
						var chks=$(model).find('input[name="disabled"]')
						for(var i=0;i<chks.length;i++){
							if($(chks[i]).attr('data-name')==$_li.attr('name')){
								$(chks[i]).attr('name','enable');
								$(chks[i]).iCheck('enable');
								$(chks[i]).attr('data-name','');
								$(chks[i]).iCheck('uncheck');
								$(chks[i]).val('off');
							}
						}
					}
					$(model).find('table[name="'+$_li.attr('name')+'"]').remove();
					$(model).find('table[name="'+$(model).find('.Config_Tab_Active').attr('name')+'"]').css('display','');
					var $liAmount=$_ul.find('li').length;
					if($liAmount==1){
						$(model).find('.highRemoveBtn').remove();
					}
				}
			});
		});
	},
	innerAdd:function(){
		var _this=this;
		this.$model.find('.innerPlus').on('click',function(){
			var cacheTr='<tr><td><label data-toggle="tooltip" title="缓存目录">proxy_cache_path</label></td><td><input name="Cache[proxy_cache_path]'+new Date().getTime()+'" data-rule-path="true" data-rule-required="true" data-msg-required="请填写proxy_cache_path" type="text"/></td><td><label data-toggle="tooltip" title="缓存层级设置">levels=</label><input name="Cache[levels]'+new Date().getTime()+'" data-rule-nochinese1="true" data-rule-required="true" data-msg-required="请填写levels" class="Cache_input" type="text"/></td>'
				+'<td style="width: 155px;border-right: 0;padding-left: 7px;padding-right: 0"><label data-toggle="tooltip"  title="缓存名称 ： 缓存索引文件大小">keys_zone=</label><input name="Cache[keys_zone_befor]'+new Date().getTime()+'"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_befor" value="" class="Cache_input" type="text"/><label class="f-ml5">:</label></td><td style="width: 120px;border-left: 0!important;padding-left: 0;padding-top: 4px;"><input name="Cache[keys_zone_behind]'+new Date().getTime()+'" style="margin-left: -51px;"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_behind" value="" class="Cache_input" type="text"/></td>'
				+'<td><label data-toggle="tooltip" title="更新时间">inactive=</label><input name="Cache[inactive]'+new Date().getTime()+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写inactive" class="Cache_input" type="text"/></td>'
				+'<td><label data-toggle="tooltip" title="缓存目录大小">max_size=</label><input name="Cache[max_size]'+new Date().getTime()+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写max_size" class="Cache_input" type="text"/></td><td style="width:70px"><a class="glyphicon glyphicon-plus green innerPlus"></a><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr>'
			var LocationTr_setHeader='<tr class="tr_trigger proxy_set_header"><td><span data-toggle="tooltip" title="代理头信息设置">proxy_set_header</span></td><td class="text-left"><input style="width:94%"  name="location[proxy_set_header]'+new Date().getTime()+'" type="text" value=""/><a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr>'
			var LocationTr_addHeader='<tr class="tr_trigger add_header"><td><span data-toggle="tooltip" title="代理回源头信息">add_header</span></td><td class="text-left"><input style="width:94%"  name="location[add_header]'+new Date().getTime()+'" type="text" value=""/><a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr>';
			if(_this.$model.selector=='.CacheConfig'){
				$(this).closest('tbody').append(cacheTr);
				if($(this).closest('td').find('.innerDel').length==0){
					$(this).after('<a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a>');
				}
				$(this).remove();
				_this.innerAdd();
				_this.innerDel();

			}else{
				if($(this).closest('tr').hasClass('proxy_set_header')){
					$(this).closest('tr').after(LocationTr_setHeader);
				}else{
					$(this).closest('tr').after(LocationTr_addHeader);
				}
				if($(this).closest('td').find('.innerDel').length==0){
					$(this).after('<a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a>');
				}
				$(this).remove();
				_this.innerAdd();
				_this.innerDel();
			}
			//tooltip初始化
			$("[data-toggle='tooltip']").tooltip();
		});
	},
	innerDel:function(){
		var _this=this;
		this.$model.find('.innerDel').on('click',function() {
			var _tr = $(this).closest('tr'), _tbody = $(this).closest('tbody');
			if (_this.$model.selector == '.CacheConfig') {
				if ($(_tr).find('.innerPlus').length > 0) {
					$(_tr).remove();
					$($(_tbody).find('tr')[$(_tbody).find('tr').length - 1]).find('.innerDel').before('<a class="glyphicon glyphicon-plus green innerPlus"></a>');
				} else {
					$(_tr).remove();
				}
				if ($(_tbody).find('.innerDel').length == 1) {
					$(_tbody).find('.innerDel').remove();
				}
			} else {
				if ($(_tr).find('.innerPlus').length > 0) {
					$(_tr).remove();
					if ($(_tr).hasClass('proxy_set_header')) {
						$($(_tbody).find('.proxy_set_header')[$(_tbody).find('.proxy_set_header').length - 1]).find('.innerDel').before('<a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>');
					} else {
						$($(_tbody).find('.add_header')[$(_tbody).find('.add_header').length - 1]).find('.innerDel').before('<a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a>');
					}
				} else {
					$(_tr).remove();
				}
				if ($(_tbody).find('.proxy_set_header').length == 1) {
					$(_tbody).find('.proxy_set_header').find('.innerDel').remove();
				}
				if ($(_tbody).find('.add_header').length == 1) {
					$(_tbody).find('.add_header').find('.innerDel').remove();
				}
				}
			_this.innerAdd();
		});
	},
	trigger:function(li){
		var _this=this;
		$(li).on('click',function(){
			var $ul=$(this).closest('ul');
			var chks=_this.$model.find('.workGrade').find('.chk'),_chks=[];
			for(var i=0;i<chks.length;i++){
				if($(chks[i]).attr('data-name')==$ul.find('.Config_Tab_Active').attr('name')){
					_chks.push($(chks[i]).attr('data-name'));
				}
			}
			if(_chks.length>0||$(this).hasClass('Config_Tab_Active')){
				$ul.find('li').removeClass('Config_Tab_Active');
				$(this).addClass('Config_Tab_Active');
				for(var i=0;i<chks.length;i++){
					if($(chks[i]).val()=='on'){
						$(chks[i]).iCheck('disable');
						$(chks[i]).attr('name', 'disabled');
					}
					if($(chks[i]).attr('data-name')==$ul.find('.Config_Tab_Active').attr('name')){
						$(chks[i]).attr('name', 'enable');
						$(chks[i]).iCheck('enable');
					}
				}
				_this.$model.find('table').css('display','none');
				_this.$model.find('table[name="'+$(this).attr('name')+'"]').css('display','');
			}else{
				new ShowDiag({
					msg: '请选择生效层级',
					closetime: 1
				});
			}
		});
	},
	workGradeSelected:function(){
		var workgrades=this.$model.find('.workGrade').find('input[name="enable"]'),flag=false,_status=[];
		for(var i=0;i<workgrades.length;i++){
			if($(workgrades[i]).val()=='on'){
				_status.push($(workgrades[i]));
			}
		}
		if(_status.length==0){
			new ShowDiag({
				msg: '请选择生效层级',
				closetime: 1
			});
		}else if(_status.length==workgrades.length){
			new ShowDiag({
				msg: '生效层级已全部选中，无法添加',
				closetime: 1
			});
		}else{
			flag=true;
			for(var i=0;i<_status.length;i++){
				$(_status[i]).iCheck('disable');
				$(_status[i]).attr({'name':'disabled'});
			}
		}
		return flag;
	},
	tableAddStr:function(_ConfigName,flag){
		switch (flag){
			case '.CacheConfig':
				var table_str='<table name="'+_ConfigName+'" class="table f-table nginxTable"><thead><tr><th style="width:140px">配置项</th><th colspan="6" >配置内容</th></tr></thead><tbody>';
				var table_tr='<tr><td><label  data-toggle="tooltip" title="缓存目录" >proxy_cache_path</label></td><td><input name="Cache[proxy_cache_path]'+new Date().getTime()+'" data-rule-path="true" data-rule-required="true" data-msg-required="请填写proxy_cache_path" type="text"/></td><td><label data-toggle="tooltip" title="缓存层级设置">levels=</label><input name="Cache[levels]'+new Date().getTime()+'" data-rule-nochinese1="true" data-rule-required="true" data-msg-required="请填写levels" class="Cache_input" type="text"/></td>'
					+'<td style="width: 155px;border-right: 0;padding-left: 7px;padding-right: 0"><label data-toggle="tooltip"  title="缓存名称 ： 缓存索引文件大小">keys_zone=</label><input name="Cache[keys_zone_befor]'+new Date().getTime()+'"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_befor" value="" class="Cache_input" type="text"/><label class="f-ml5">:</label></td><td style="width: 120px;border-left: 0!important;padding-left: 0;padding-top: 4px;"><input name="Cache[keys_zone_behind]'+new Date().getTime()+'" style="margin-left: -51px;"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_behind" value="" class="Cache_input" type="text"/></td>'
					+'<td><label data-toggle="tooltip" title="更新时间 ">inactive=</label><input name="Cache[inactive]'+new Date().getTime()+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写inactive" class="Cache_input" type="text"/></td>'
					+'<td><label data-toggle="tooltip" title="缓存目录大小">max_size=</label><input name="Cache[max_size]'+new Date().getTime()+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写max_size" class="Cache_input" type="text"/></td><td style="width:70px"><a class="glyphicon glyphicon-plus green innerPlus"></a><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr></tbody></table>';
				return table_str+table_tr;
			break;
			case '.UpstreamConfig':
				var table_str='<table name="'+_ConfigName+'" class="table f-table nginxTable"><thead><tr><th style="width:140px">配置项</th><th >配置内容</th></tr></thead><tbody>'
				var table_tr= '<tr><td><span data-toggle="tooltip" title="回源策略名称">upstream</span></td><td class="text-left"><span name="Server[upstream]'+new Date().getTime()+'"style="width:100%">'+$.md5($('#channel_name').text())+'</span></td></tr>'
					+'<tr><td><span data-toggle="tooltip" title="服务名称">server_name</span></td><td class="text-left"><span name="Server[server]'+new Date().getTime()+'"style="width:100%" >'+$('#channel_name').text()+'</span></td></tr>'
					+'<tr><td><span data-toggle="tooltip" title="服务监听端口">listen</span></td><td class="text-left"><input name="Server[listen]'+new Date().getTime()+'"style="width:100%" data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写listen" type="text" value=""/></td></tr>'
					+'<tr><td><span >回源端口</span></td><td class="text-left"><input name="Server[upstream_port]'+new Date().getTime()+'"style="width:100%" data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写回源端口" type="text" value=""/></td></tr>'
					+'<tr><td><span >自定义配置</span></td><td class="text-left"><textarea name="Server[custom_setting]'+new Date().getTime()+'"style="width:100%" rows="6"></textarea></td></tr></tbody></table>';
				return table_str+table_tr;
			break;
			case '.LocationConfig':
				var table_str='<table name="'+_ConfigName+'"  class="table f-table nginxTable"><thead><tr><th style="width:140px">配置项</th><th >配置内容</th></tr></thead><tbody>';
				var table_tr= '<tr><td>代理模式</td><td class="text-left"><span class="ant-switch" tabindex="0"></span></span></td></tr>'
							 +'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="回源信息">proxy_pass</span></td><td class="text-left"><input style="width:100%" data-rule-required="true" data-msg-required="请填写proxy_pass" class="ignore" name="location[proxy_pass]'+new Date().getTime()+'" type="text"  value="'+'http://'+$.md5($('#channel_name').text())+'" /></td></tr>'
							 +'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存名称">proxy_cache</span></td><td class="text-left"><input style="width:100%"  class="ignore" name="location[proxy_cache]'+new Date().getTime()+'" type="text" /></td></tr>'
							 +'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存存放策略">proxy_cache_key</span></td><td class="text-left"><input style="width:100%"  class="ignore" name="location[proxy_cache_key]'+new Date().getTime()+'" type="text" /></td></tr>'
							 +'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存信息设置">proxy_cache_valid</span></td><td class="text-left"><input style="width:100%"  class="ignore" name="location[proxy_cache_valid]'+new Date().getTime()+'" type="text"/></td></tr>'
							 +'<tr class="tr_trigger  f-hide proxy_set_header"><td><span data-toggle="tooltip" title="代理头信息设置">proxy_set_header</span></td><td class="text-left"><input style="width:94%"  class="ignore" name="location[proxy_set_header]'+new Date().getTime()+'" type="text"/><a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a></td></tr>'
							 +'<tr class="tr_trigger f-hide add_header"><td><span data-toggle="tooltip" title="代理回源头信息">add_header</span></td><td class="text-left"><input style="width:94%"   class="ignore" name="location[add_header]'+new Date().getTime()+'" type="text" /> <a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a></td></tr>'
					         +'<tr><td>自定义配置</td><td class="text-left"><textarea name="location[custom_setting]'+new Date().getTime()+'" data-rule-required="true" data-msg-required="请填写自定义配置" style="width:100%" rows="6"></textarea></td></tr></tbody></table>';
				return table_str+table_tr;
			break;
			case 'loactionAdd':
				var location_str='';
				var head='<div class="configNginx LocationConfig f-mt40"><div class="clearfix f-gradient"><div class="f-caption pull-left"><ul class="list-inline"><li><h4>Location配置 <a  class="glyphicon glyphicon-chevron-up green upAddBtn f-ml10"></a><a  class="glyphicon glyphicon-chevron-down green downAddBtn f-ml10"></a><a class="glyphicon glyphicon-remove red topRemoveBtn f-ml10"></a></h4></li></ul></div><div class="pull-right"><span class="configTrigger" data-id="all">···</span></div></div><div class="Config_Content"><div style="margin-bottom:0" class="form-group"><ul class="workGradeLoc"><li><label class="text-right">location名称:</label></li><li><input name="location[name]'+new Date().getTime()+'" value="" data-rule-required="true" data-msg-required="请填写location名称" type="text"/></li><li><span class="ant-switch" tabindex="0"></span></li></ul></div><div class="form-group"><ul class="workGrade"><li><label class="text-right">生效层级:</label></li><li><input class="chk" name="enable" value="off" data-val="4" type="checkbox"/><span>源站</span></li><li><input class="chk" name="enable" value="off" data-val="1" type="checkbox"/><span>上层</span></li><li><input class="chk" name="enable" value="off" data-val="2" type="checkbox"/><span>中转</span></li><li><input class="chk" name="enable" value="off" data-val="3" type="checkbox"/><span>边缘</span></li><li> <a class="glyphicon glyphicon-plus green highPlusBtn"></a></li></ul></div><div class="form-group Config_Box"><ul class="Config_Tab_Box"><li name="config1" class="f-ml-1 Config_Tab_Active">配置1<i></i></li></ul><div  class="Config_Content_Box">'
				var table_str='<table name="config1"  class="table f-table nginxTable"><thead><tr><th style="width:140px">配置项</th><th >配置内容</th></tr></thead><tbody>';
				var table_tr= '<tr><td>代理模式</td><td class="text-left"><span class="Switch_tr ant-switch" tabindex="0"></span></span></td></tr>'
					+'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="回源信息">proxy_pass</span></td><td class="text-left"><input style="width:100%" data-rule-required="true" data-msg-required="请填写proxy_pass" class="ignore" name="location[proxy_pass]'+new Date().getTime()+'" type="text" value="'+'http://'+$.md5($('#channel_name').text())+'" /></td></tr>'
					+'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存名称">proxy_cache</span></td><td class="text-left"><input style="width:100%" class="ignore" name="location[proxy_cache]'+new Date().getTime()+'" type="text" /></td></tr>'
					+'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存存放策略">proxy_cache_key</span></td><td class="text-left"><input style="width:100%"  class="ignore" name="location[proxy_cache_key]'+new Date().getTime()+'" type="text" /></td></tr>'
					+'<tr class="tr_trigger f-hide"><td><span data-toggle="tooltip" title="缓存信息设置">proxy_cache_valid</span></td><td class="text-left"><input style="width:100%"  class="ignore" name="location[proxy_cache_valid]'+new Date().getTime()+'" type="text"/></td></tr>'
					+'<tr class="tr_trigger  f-hide proxy_set_header"><td><span data-toggle="tooltip" title="代理头信息设置">proxy_set_header</span></td><td class="text-left"><input style="width:94%"  class="ignore" name="location[proxy_set_header]'+new Date().getTime()+'" type="text"/><a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a></td></tr>'
					+'<tr class="tr_trigger f-hide add_header"><td><span data-toggle="tooltip" title="代理回源头信息">add_header</span></td><td class="text-left"><input style="width:94%"  class="ignore"  name="location[add_header]'+new Date().getTime()+'" type="text" /> <a class="glyphicon glyphicon-plus green f-ml10 innerPlus"></a></td></tr>'
					+'<tr><td>自定义配置</td><td class="text-left"><textarea name="location[custom_setting]'+new Date().getTime()+'" data-rule-required="true" data-msg-required="请填写自定义配置"  style="width:100%" rows="6"></textarea></td></tr></tbody></table></div></div></div></div>';
				location_str=head+table_str+table_tr;
				return location_str;
		}
	}
}


/*
 * 获取源站设备组列表,拓扑列表,集群列表
 */
export  function getdevGroup(dev_group,topology,cluster,ids){
	var $group=$(dev_group),$topo=$(topology),$cluster=$(cluster);
	$.ajax({
		url:URL+'/GetDevGroupConfig',
		data:'{"query":{"role":"1"}}',
		type:'post',
		success:function (data) {
			var options=['<option value="">请选择</option>'],data=JSON.parse(data),groups=data.info.data;
			if(data.info.status=='success'&&groups&&groups.length>0){
				for(var i=0;i<groups.length;i++){
					options.push('<option value="'+groups[i]['_id']+'">'+groups[i]['name']+'</option>');
				}
				$group.html(options);
				if(ids.devs_group_id){
					$group.val(ids.devs_group_id);
				}
				$group.on('change',function(){
					$.ajax({
						url:URL+'/GetTopologyConfig',
						data:'{"query":{"devs_group_id":"'+$(this).val()+'"}}',
						type:'post',
						success:function (data) {
							var options=['<option value="">请选择</option>'],data=JSON.parse(data),topos=data.info.data;
							if(data.info.status=='success'&&topos&&topos.length>0){
								for(var i=0;i<topos.length;i++){
									options.push('<option value="'+topos[i]['_id']+'">'+topos[i]['name']+'</option>');
								}
								$topo.html(options);
							}else{
								$topo.html('<option value="">请选择</option>');
							}
						}
					});
				});
			}
		}
	});

	if(ids.devs_group_id!=''){
		$.ajax({
			url:URL+'/GetTopologyConfig',
			data:'{"query":{"devs_group_id":"'+ids.devs_group_id+'"}}',
			type:'post',
			success:function (data) {
				var options=['<option value="" selected="selected">请选择</option>'],data=JSON.parse(data),topos=data.info.data;
				if(data.info.status=='success'&&topos&&topos.length>0){
					for(var i=0;i<topos.length;i++){
						options.push('<option value="'+topos[i]['_id']+'">'+topos[i]['name']+'</option>');
					}
					$topo.html(options);
					if(ids.topology_id){
						$topo.val(ids.topology_id);
					}
				}
			}
		});
	}

	$.ajax({
		url:URL+'/GetClusterConfig',
		data:'{"query":{}}',
		type:'post',
		success:function (data) {
			var options=['<option value="">请选择</option>'],data=JSON.parse(data),clusters=data.info.data;
			if(data.info.status=='success'&&clusters&&clusters.length>0){
				for(var i=0;i<clusters.length;i++){
					options.push('<option value="'+clusters[i]['_id']+'">'+clusters[i]['name']+'</option>');
				}
				$cluster.html(options);
				if(ids.cluster_id){
					$cluster.val(ids.cluster_id);
				}
			}
		}
	})
}

/*
* Cache模块渲染
*/
export function CacheRender(data){
	//console.log(data);
	var _table=''
	var $inputs=$('.CacheConfig').find('.workGrade').find('.chk');
	$inputs.attr('data-name','');
	$inputs.val('off');
	$inputs.iCheck('uncheck');
	$inputs.iCheck('enable');
	$('.CacheConfig ').find('.Config_Tab_Box').html('<li name="config1" class="Config_Tab_Active">配置1</li>');
	for(var i=0;i<data.length;i++){
		var _ConfigName='',_tab_name='',table_str='',table_tr='',table_btn='',isshow='';
		_ConfigName='config'+(i+1);
		_tab_name='配置'+(i+1);
		var cache_son=data[i]['cache_son'];
		if(i!=0){
			isshow='style="display:none"';
			$('.CacheConfig ').find('.Config_Tab_Box').append('<li class="f-ml-1" name="'+_ConfigName+'">'+_tab_name+'<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>');
			if($($('.CacheConfig ').find('.Config_Tab_Box').find('li')[0]).find('.glyphicon-remove')==0){
				$($('.CacheConfig ').find('.Config_Tab_Box').find('li')[0]).append('<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i>');
			}
		}
		table_str='<table name="'+_ConfigName+'" class="table f-table nginxTable"'+isshow+'><thead><tr><th style="width:140px">配置项</th><th colspan="7" >配置内容</th></tr></thead><tbody>'
		for(var j=0;j<cache_son.length;j++){
			var flag=Math.random();
				table_tr+='<tr><td><label data-toggle="tooltip"  title="缓存目录">proxy_cache_path</label></td><td><input name="Cache[proxy_cache_path]'+flag+'"  data-rule-path="true" data-rule-required="true" data-msg-required="请填写proxy_cache_path" value="'+cache_son[j]['proxy_cache_path']+'"  type="text"/></td><td><label data-toggle="tooltip"  title="缓存层级设置">levels=</label><input value="'+cache_son[j]['levels']+'" data-rule-nochinese1="true" data-rule-required="true" data-msg-required="请填写levels" name="Cache[levels]'+flag+'" class="Cache_input" type="text"/></td>'
				+'<td style="width: 155px;border-right: 0;padding-left: 7px;padding-right: 0"><label data-toggle="tooltip"  title="缓存名称 ： 缓存索引文件大小">keys_zone=</label><input name="Cache[keys_zone_befor]'+flag+'"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_befor" value="'+cache_son[j]['keys_zone_befor']+'" class="Cache_input" type="text"/><label class="f-ml5">:</label></td><td style="width: 120px;border-left: 0!important;padding-left: 0;padding-top: 4px;"><input name="Cache[keys_zone_behind]'+flag+'" style="margin-left: -51px;"  data-rule-aclname="true" data-rule-required="true" data-msg-required="请填写keys_zone_behind" value="'+cache_son[j]['keys_zone_behind']+'" class="Cache_input" type="text"/></td>'
				+'<td><label data-toggle="tooltip"  title="更新时间">inactive=</label><input name="Cache[inactive]'+flag+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写inactive" value="'+cache_son[j]['inactive']+'" class="Cache_input " type="text"/></td>'
				+'<td><label data-toggle="tooltip"  title="缓存目录大小">max_size=</label><input name="Cache[max_size]'+flag+'" data-rule-nochinese5="true" data-rule-required="true" data-msg-required="请填写max_size" value="'+cache_son[j]['max_size']+'" class="Cache_input" type="text"/></td>';
			if(j==0){
				if(cache_son.length>1){
					table_btn='<td style="width:70px"><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr>';
				}else{
					table_btn='<td style="width:70px"><a class="glyphicon glyphicon-plus green innerPlus"></a></td></tr>'
				}
			}else if(j==cache_son.length-1){
				table_btn='<td style="width:70px"><a class="glyphicon glyphicon-plus green innerPlus"></a><a class="glyphicon glyphicon-remove red f-ml10 innerDel"></a></td></tr>';
			}
			table_tr+=table_btn
		}
		_table+= table_str+table_tr+'</tbody></table>'
		for(var j=0;j<data[i]['take_effect_level'].length;j++){
			if(i==0){
				$($inputs[data[i]['take_effect_level'][j]-1]).attr({'data-name':_ConfigName,'name':'enable'});
			}else{
				$($inputs[data[i]['take_effect_level'][j]-1]).attr({'data-name':_ConfigName,'name':'enable'});
				$($inputs[data[i]['take_effect_level'][j]-1]).iCheck('disable');
			}
			$($inputs[data[i]['take_effect_level'][j]-1]).val('on');
			$($inputs[data[i]['take_effect_level'][j]-1]).iCheck('check');
		}
		$('.CacheConfig ').find('.Config_Content_Box').html(_table);
	}
}
/*
*Server模块渲染
*/
export function ServerRender(data){
	//console.log(data);
	var _table=''
	var $inputs=$('.UpstreamConfig ').find('.workGrade').find('.chk');
	$inputs.attr('name','enable');
	$inputs.attr('data-name','');
	$inputs.val('off');
	$inputs.iCheck('uncheck');
	$inputs.iCheck('enable');
	$('.UpstreamConfig  ').find('.Config_Tab_Box').html('<li name="config1" class="Config_Tab_Active">配置1</li>');
	for(var i=0;i<data.length;i++){
		var _ConfigName='',_tab_name='',table_str='',table_tr='',table_btn='',isshow='';
		_ConfigName='config'+(i+1);
		_tab_name='配置'+(i+1);
        var flag=Math.random();
		if(i!=0){
			isshow='style="display:none"';
			$('.UpstreamConfig  ').find('.Config_Tab_Box').append('<li class="f-ml-1" name="'+_ConfigName+'">'+_tab_name+'<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i></li>');
			if($($('.UpstreamConfig  ').find('.Config_Tab_Box').find('li')[0]).find('.glyphicon-remove').length==0){
				$($('.UpstreamConfig  ').find('.Config_Tab_Box').find('li')[0]).append('<i class="glyphicon glyphicon-remove f-fontSize8 highRemoveBtn"></i>');
			}
		}
		table_str='<table name="'+_ConfigName+'" class="table f-table nginxTable"'+isshow+'><thead><tr><th style="width:140px">配置项</th><th colspan="6" >配置内容</th></tr></thead><tbody>'
		var table_tr='<tr><td><span data-toggle="tooltip"  title="回源策略名称">upstream</span></td><td class="text-left"><span name="Server[upstream]'+flag+'"style="width:100%" ></span></td></tr>'
			+'<tr><td><span data-toggle="tooltip"  title="服务名称">server_name</span></td><td class="text-left"><span name="Server[server]'+flag+'"style="width:100%" ></span></td></tr>'
			+'<tr><td><span data-toggle="tooltip"  title="服务监听端口">listen</span></td><td class="text-left"><input name="Server[listen]'+flag+'"style="width:100%"  data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写listen" type="text" value="'+data[i]['listen']+'"/></td></tr>'
			+'<tr><td><span>回源端口</span></td><td class="text-left"><input name="Server[upstream_port]'+flag+'"style="width:100%" data-rule-posInteger="true" data-rule-required="true" data-msg-required="请填写回源端口" type="text" value="'+data[i]['upstream_port']+'"/></td></tr>'
			+'<tr><td><span>自定义配置</span></td><td class="text-left"><textarea name="Server[custom_setting]'+flag+'"style="width:100%" rows="6">'+data[i]['custom_setting']+'</textarea></td></tr>';
		_table+= table_str+table_tr+'</tbody></table>'
		for(var j=0;j<data[i]['take_effect_level'].length;j++){
			if(i==0){
				if(data[i]['take_effect_level'][j] == 4){
					$($inputs[data[i]['take_effect_level'][j]-4]).attr({'data-name':_ConfigName,'name':'enable'});
					$($inputs[data[i]['take_effect_level'][j]-4]).val('on');
					$($inputs[data[i]['take_effect_level'][j]-4]).iCheck('check');
				}else{
					$($inputs[data[i]['take_effect_level'][j]]).attr({'data-name':_ConfigName,'name':'enable'});
					$($inputs[data[i]['take_effect_level'][j]]).val('on');
					$($inputs[data[i]['take_effect_level'][j]]).iCheck('check');
				}
			}else{
				if(data[i]['take_effect_level'][j] == 4){
					$($inputs[data[i]['take_effect_level'][j]-4]).attr({'data-name':_ConfigName,'name':'enable'});
					$($inputs[data[i]['take_effect_level'][j]-4]).val('on');
					$($inputs[data[i]['take_effect_level'][j]-4]).iCheck('check');
					$($inputs[data[i]['take_effect_level'][j]-4]).iCheck('disable');
				}else{
					$($inputs[data[i]['take_effect_level'][j]]).attr({'data-name':_ConfigName,'name':'enable'});
					$($inputs[data[i]['take_effect_level'][j]]).val('on');
					$($inputs[data[i]['take_effect_level'][j]]).iCheck('check');
					$($inputs[data[i]['take_effect_level'][j]]).iCheck('disable');
				}
			}
		}
		$('.UpstreamConfig  ').find('.Config_Content_Box').html(_table);
	}
	var upstreams=$('.UpstreamConfig').find('span[name^="Server\[upstream\]"]');
	for(var i=0;i<upstreams.length;i++){
		$(upstreams[i]).html($.md5($('#channel_name').text()));
		$($('.UpstreamConfig').find('span[name^="Server\[server\]"]')[i]).html($('#channel_name').text())
	}
	var check=$('.UpstreamConfig').find('.workGrade').find('input')[0];
	$('.UpstreamConfig').find('table[name="'+$(check).attr('data-name')+'"]').find('span[name^="Server\[upstream\]"]').text('');
}
/*
* 第三方设备配置渲染
*/
export function cuntom_source_station_Render(data){
	var default_ip,outer_str='',defalut_ipstr='';
	for (var x in data){
		if(x=='default'){
			$('.custom').find('.form-group').remove();
			 default_ip=data['default']['default'];
			if(default_ip!=undefined&&getJsonLength(default_ip)>0){
				for(var w in default_ip){
					if(w=='ip_main'){
						for(var i=0;i<default_ip[w].length;i++){
							var flag=Math.random();
							var _default='<div class="form-group base_default" style="min-width:500px"><label class="col-xs-4 text-right control-label need_remove">默认:</label><div class="col-xs-8 defaultIp">'
								+'<input  name="defaultIp" value="'+default_ip[w]+'" type="text" class="form-control"/><span><input type="radio" class="ip_main" checked="checked" name="defaultIp_class'+flag+'"/>主</span>'
								+'<span><input type="radio" class="ip_back" name="defaultIp_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 defaultRemove"></a></div></div>'
							defalut_ipstr+=_default;
						}
					}else{
						for(var i=0;i<default_ip[w].length;i++){
							var flag=Math.random();
							var _default='<div class="form-group base_default" style="min-width:500px"><label class="col-xs-4 text-right control-label need_remove">默认:</label><div class="col-xs-8 defaultIp">'
								+'<input  name="defaultIp" type="text" value="'+default_ip[w]+'" class="form-control"/><span><input type="radio" class="ip_main"  name="defaultIp_class'+flag+'"/>主</span>'
								+'<span><input type="radio" class="ip_back" checked="checked" name="defaultIp_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 defaultRemove"></a></div></div>'
							defalut_ipstr+=_default;
						}
					}
				}
			}else{
				var flag=Math.random();
				defalut_ipstr='<div class="form-group base_default" style="min-width:500px"><label class="col-xs-4 text-right control-label need_remove">默认:</label><div class="col-xs-8 defaultIp">'
					+'<input  name="defaultIp" type="text" value="" class="form-control"/><span><input type="radio" class="ip_main"  name="defaultIp_class'+flag+'"/>主</span>'
					+'<span><input type="radio" class="ip_back"  name="defaultIp_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 defaultAdd"></a></div></div>'
			}

		}else{
				var _ips='';
			if(data[x]['default']!=undefined&&getJsonLength(data[x]['default'])>0){
				for(var y in data[x]['default']){
					var ips=data[x]['default'][y];
					if(y=='ip_main'){
						for(var i=0;i<ips.length;i++){
							var flag=Math.random();
							var ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label need_cut">默认:</label><div class="col-xs-8 defaultIp">'
								+'<input  name="defaultIpd'+flag+'" type="text" value="'+ips[i]+'" class="form-control"/><span><input type="radio" class="ip_main" checked="checked"  name="defaultIp1_class'+flag+'"/>主</span>'
								+'<span><input type="radio" class="ip_back" name="defaultIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 isp_defaultRemove"></a></div></div>'
							_ips+=ip_str;
						}
					}else{
						for(var i=0;i<ips.length;i++){
							var flag=Math.random();
							var ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label need_cut">默认:</label><div class="col-xs-8 defaultIp">'
								+'<input   name="defaultIpd'+flag+'" value="'+ips[i]+'" class="form-control"/><span><input type="radio" class="ip_main"   name="defaultIp1_class'+flag+'"/>主</span>'
								+'<span><input type="radio" class="ip_back" checked="checked" name="defaultIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 isp_defaultRemove"></a></div></div>'
							_ips+=ip_str
						}
					}
				}
			}else{
				var flag=Math.random();
				 _ips='<div class="form-group"><label class="col-xs-4 text-right control-label need_cut">默认:</label><div class="col-xs-8 defaultIp">'
					+'<input   name="defaultIpd'+flag+'" value="" class="form-control"/><span><input type="radio" class="ip_main"   name="defaultIp1_class'+flag+'"/>主</span>'
					+'<span><input type="radio" class="ip_back"  name="defaultIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a></div></div>'
			}

			var prov='';
			if(data[x]!=undefined&&getJsonLength(data[x])>0){
				for(var y in data[x]){
					if(y!='default'){
						var ips='';
						if(data[x][y]!=undefined&&getJsonLength(data[x][y])>0){
							for(var z in data[x][y]){
								if(z=='ip_main'){
									for(var i=0;i<data[x][y][z].length;i++){
										var flag=Math.random();
										var ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label need_remove">IP配置:</label><div class="col-xs-8 defaultIp">'
											+'<input type="text" name="defaultIpP'+flag+'" class="form-control" value="'+data[x][y][z][i]+'"/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+flag+'"/>主</span>'
											+'<span><input type="radio" class="ip_back" name="provIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a><a class="glyphicon glyphicon-remove red f-ml5 prov_Ip_Remove"></a></div></div>'
										ips+=ip_str;
									}
								}else{
									for(var i=0;i<data[x][y][z].length;i++){
										var flag=Math.random();
										var ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label need_remove">IP配置:</label><div class="col-xs-8 defaultIp">'
											+'<input type="text" name="defaultIpP'+flag+'" class="form-control" value="'+data[x][y][z][i]+'"/><span><input type="radio"  class="ip_main"  name="provIp1_class'+flag+'"/>主</span>'
											+'<span><input type="radio" checked="checked" class="ip_back" name="provIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a><a class="glyphicon glyphicon-remove red f-ml5 prov_Ip_Remove"></a></div></div>'
										ips+=ip_str;
									}
								}
							}
						}else{
							var flag=Math.random();
							 ips='<div class="form-group"><label class="col-xs-4 text-right control-label need_remove">IP配置:</label><div class="col-xs-8 defaultIp">'
								+'<input type="text" name="defaultIpP'+flag+'" class="form-control" value=""/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+flag+'"/>主</span>'
								+'<span><input type="radio" class="ip_back" name="provIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a></div></div>'
						}

						var prov_str='<div class="province_Box"><div class="prov_box"><div class="form-group"><label class="col-xs-4 text-right control-label">省份:</label><div class="col-xs-8">'
							+'<select  name="area" class="form-control" value="'+y+'"><option value="0">请选择</option></select><div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 prov_Add"></a><a class="glyphicon glyphicon-remove red f-ml5 prov_Remove"></a></div></div></div>'
							+ips+'</div></div>'
						prov+=prov_str;
					}
				}
			}else{
				var flag=Math.random();
				var ip_str='<div class="form-group"><label class="col-xs-4 text-right control-label need_remove">IP配置:</label><div class="col-xs-8 defaultIp">'
					+'<input type="text" name="defaultIpP'+flag+'" class="form-control" value=""/><span><input type="radio" checked="checked" class="ip_main"  name="provIp1_class'+flag+'"/>主</span>'
					+'<span><input type="radio" class="ip_back" name="provIp1_class'+flag+'" />备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a></div></div>'
				var prov_str='<div class="province_Box"><div class="prov_box"><div class="form-group"><label class="col-xs-4 text-right control-label">省份:</label><div class="col-xs-8">'
					+'<select  name="area" class="form-control" value=""><option value="0">请选择</option></select><div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 prov_Add"></a></div></div></div>'
					+ip_str+'</div></div>'
				prov+=prov_str;
			}

			outer_str+= '<div class="form-group Isp_Box"><div class="form-group"><label class="col-xs-4 text-right control-label">运营商:</label><div class="col-xs-8">'
				+'<select name="isp" class="form-control" value="'+x+'"><option value="0">请选择</option></select><div class="plus_remove">'
				+'<a class="glyphicon glyphicon-plus green f-ml5 ispAdd"></a><a class="glyphicon glyphicon-remove red f-ml5 ispRemove"></a></div></div></div>'+_ips+prov+'</div>'
		}
	}
	if(outer_str==''){
		outer_str='<div class="form-group Isp_Box"><div class="form-group"><label class="col-xs-4 text-right control-label">运营商:</label><div class="col-xs-8"><select name="isp" class="form-control valid"></select><div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 ispAdd"></a></div></div></div><div class="form-group"><label class="col-xs-4 text-right control-label">默认:</label><div class="col-xs-8 defaultIp"><input type="text" name="defaultIpd" class="form-control"><span><input type="radio" class="ip_main" name="defaultIp1_class" value="on" checked="">主</span><span><input type="radio" class="ip_back" name="defaultIp1_class" value="on">备</span><a class="glyphicon glyphicon-plus green f-ml5 isp_defaultAdd"></a></div></div><div class="province_Box"><div class="prov_box"><div class="form-group"><label class="col-xs-4 text-right control-label">省份:</label><div class="col-xs-8"><select name="area" class="form-control"></select><div class="plus_remove"><a class="glyphicon glyphicon-plus green f-ml5 prov_Add"></a></div></div></div><div class="form-group"><label class="col-xs-4 text-right control-label">IP配置:</label><div class="col-xs-8 defaultIp"><input type="text" name="defaultIpP" class="form-control" value=""><span><input type="radio" class="ip_main" name="provIp1_class" value="on" checked="">主</span><span><input type="radio" class="ip_back" name="provIp1_class" value="on">备</span><a class="glyphicon glyphicon-plus green f-ml5 prov_Ip_Add"></a></div></div></div></div></div></div>'
	}
	$('.custom').append(defalut_ipstr+outer_str);
	$('.custom').find('.need_remove').html('');
	$($('.custom').find('.need_remove')[0]).html('默认:');
	$($('.custom').find('.form-group')[0]).find('.defaultRemove').remove();
	var fg=$('.custom').find('.Isp_Box');
	var isps=$('.custom').find('.province_Box');
	$($(fg[0]).find('.form-group')[0]).find('.ispRemove').remove();
	for (var i=0;i<fg.length;i++){
		$(fg[i]).find('.need_cut').html('')
		$($(fg[i]).find('.need_cut')[0]).html('默认:');
		$($(fg[i]).find('.province_Box')[0]).find('.prov_Remove').remove();
		$($(fg[i]).find('.form-group')[1]).find('.isp_defaultRemove').remove();

	}
	for (var i=0;i<isps.length;i++){
		$(isps[i]).find('.need_remove').html('');
		$($(isps[i]).find('.need_remove')[0]).html('IP配置:');
		$($(isps[i]).find('.form-group')[1]).find('.prov_Ip_Remove').remove();
	}
	var areas=$('.custom').find('select[name="area"]'),isps=$('.custom').find('select[name="isp"]');
	for(var i=0;i<areas.length;i++){
		getProv(areas[i],$(areas[i]).attr('value'));
	}
	for(var i=0;i<isps.length;i++){
		getIsp(isps[i],$(isps[i]).attr('value'));
	}
	new Nginx_Add_baseConfig('.custom');
}
//获取地址栏参数
export function getParam(url,flag){
	var param=url.split('?')[1];
	var params=param.split('&'), vals = new Array(0);
	for(var i=0;i<params.length;i++){
		var _param=(params[i]).split('=');
		vals=vals.concat(_param);
	}
	return vals[vals.indexOf(flag)+1];
}

//获得年月日      得到日期oTime
export function getMyDate(str){
	if(str){
		var oDate = new Date(str),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth()+1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
		return oTime;
	}else{
		return'无'
	}
};
//补0操作
function getzf(num){
	if(parseInt(num) < 10){
		num = '0'+num;
	}
	return num;
}

//获取任务状态
export function getStatus(status,devs){
	if(status=='1'){
		return '成功';
	}else if(status=='0'){
		if(devs!=undefined){
			return '失败'+devs.length+'台';
		}else{
			return '失败';
		}

	}else if(status=='2'){
		return '无状态'
	}else if(status=='3'){
		return '进行中'
	}
}

//获取JSON长度
export function getJsonLength(data){
	var _length=0;
	for (var i in data){
		_length++;
	}
	return _length;
}

//添加操作记录
export function addOperation(oper){
	var data={};
	var user=JSON.parse(localStorage.loginInfo);
	data.name=user.name;
	data.description=oper;
	$.ajax({
		url:URL+'/UpdateUserOperation',
		data:JSON.stringify(data),
		type:'post',
		async: false,
		success:function(data){
			//console.log(data);
		}
	})
}