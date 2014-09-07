
var ADDR = (function(_win,$){
	var	location = _win.location,
	_URL = 'http://credit.wan.liebao.cn/api/',
	INPUTS = ['realname', 'mobile', 'address'],
	NULL_LINK = '', 
	isOk = true,
	userObj = null,
	tipinfo = null,
	regexps = {
        regName : /^([A-Za-z0-9]|[\u4E00-\u9FA5]){2,16}$/i,//�û���ʵ����
        regmobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//�ֻ�
        regtel : /^(0\d{2,3})([1-9]\d{6,7})$/,//��� + �̻�
        regmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,//����
        regqq : /^[1-9]\d{4,12}$/ //qq��ʽ
    },
	queryString = function(name){
	    var name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]") || '';
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	goodsid = queryString('item'),
	//�û�������Ϣ
	userInpt = function(){
		return { 
			'realname' : $('#realname').val(),//�ջ���
			'mobile' : $('#mobile').val(),
			'tel' : $('#areanum').val() + $('#tel').val(),
			'address' : $('#address').val(),
			'mail' : $('#mail').val(),
			'qq' : $('#qq').val(),
			'remark' : $('#remark').val()
		};
	},
	//������blur�¼��ж�
	blurEvent = function(curInput){ 
		var $curInput = $(curInput),
		val = $.trim($curInput.val() || ''),
		curId = $curInput.attr('id'),
		regInput = 'reg' + curId;
		$msg_dd = $curInput.parent();
		$msg_txt = $msg_dd.next('.msgtxt');

        //validate form 
        if (curId == 'mail' || curId == 'qq') {
                if (!regexps[regInput].test(val)) {
                    $msg_dd.addClass('error');
                    $msg_txt.addClass('errortxt').html('��ʽ��������������');
                    return;
                } else {
                    $msg_txt.html('');
                }
            } else if (curId == 'realname') {
                if (!regexps['regName'].test(val)) {
                    $msg_dd.addClass('error');
                    $msg_txt.addClass('errortxt');
                    isOk = false;
                    return;
                } else {
                    isOk = true;
                }
            } else if (curId == 'mobile') {
                if (!regexps['regmobile'].test(val)) {
                    $msg_dd.addClass('error');
                    $msg_txt.addClass('errortxt');
                    isOk = false;
                    return;
                } else {
                    isOk = true;
                }
            } else if (curId == 'areanum' || curId == 'tel') {
                var valTemp = $('#areanum').val() + $('#tel').val();
                if (!regexps['regtel'].test(valTemp)) {
                    $msg_dd.addClass('error');
                    $msg_txt.addClass('errortxt');
                    //isOk = false;
                    return;
                }
            } else if (curId == 'address') {
                //var valTemp = $('#areanum').val() + $('#tel').val();
                if ($("#address").val().length <= 0) {
                    $msg_dd.addClass('error');
                    $msg_txt.addClass('errortxt');
                    isOk = false;
                    return;
                }
            }

            if (!val) {
                $msg_dd.removeClass('ok').addClass('error');
                $msg_txt.addClass('errortxt');
                return false;
            }

	        $msg_dd.removeClass('error').addClass('ok');
	        $msg_txt.removeClass('errortxt');
	},

	//blur�¼���˳��ִ��
	blurCheck = function(that){
		var $cur = $(that[0]);
		$cur.on('blur', blurEvent($cur[0]));
	},
	domRender = function(){
	},
	//������������ʾ(userObj����ַ�ύ��Ϣ��һ�ʱ����Ϣ��ʾ��)
    //url = location.href,
    content = location.href.match(/(\w+)\-(\w+)/i),
	poptxt = function(userObj){		
		//goodsname���ɹ��һ������ʾ������Ʒ��ƣ�
		var userObj = userObj || {},
		showname = $('#goodsname').text(),
		pnum = $( "#sign-point" ).text(),
		msg = userObj.msg || '';
		return  tipinfo = { 
			'tit' : '��ܰ��ʾ',
			'con' : '',
			'addrtit' : '��Ϣȷ��',
			'addrcon' : (['<p class="tit">�һ�'+content[1]+'��Ҫ���'+content[2]+'���</p><div class="tl">',
							'<p><span>�ջ��ˣ�</span>' + (userObj.realname || '') + '</p>',
							'<p><span>�ֻ���룺</span>' + (userObj.mobile || '') + '</p>',
							'<p><span>�̶��绰��</span>' + (userObj.tel || '') + '</p>',
							'<p><span>��ϸ��ַ��</span>' + (userObj.address || '') + '</p>',
							'<p><span>���䣺</span>' + (userObj.mail || '') + '</p>',
							'<p><span>qq��</span>' + (userObj.qq || '') + '</p></div>'
						].join('')),
			'conexok_real' : msg,
			'conexok' : (userObj.exchangeOk || ''),
			'conno_credit' : '<p class="tit">�һ�ʧ��</p><p class="con">��ǰ�Ļ��Ϊ��' + pnum + '<br/>���ź���Ļ�ֲ����һ�����Ʒ</p>',
			'conno_goods' : '<p class="tit">�һ�ʧ��</p><p class="con">���ź�����Ʒ�Ѷһ��꣬�����ڴ��´λ</p>',
			'con_service' : '<p class="tit">�һ�ʧ��</p><p>�һ���̳��?����ϵ�ͷ���Ա</p>'
		};
	},
	//���¼����û�������Ϣ����ȷ�����һ������еİ�ť�¼���
	bindEvent = function(){
		$('dd input').on('blur',function(){
			var that = $(this);
			blurCheck(that);
		});
        $('dd textarea').on('blur',function(){
            var that = $(this);
            blurCheck(that);
        });
		$('#btnok').unbind('click').bind('click',function(e){ 
			e.preventDefault();
			//���ÿ��input��ֵ�Ƿ���ȷ

			for (var i = 0, len = INPUTS.length; i < len; i++) {
	            var $cur = $('#' + INPUTS[i]);
	            if ($cur.length > 0) {
	                $cur.on('blur', blurEvent($('#' + [INPUTS[i]])));
	            }
	        }

			if(isOk){ 
				userInpt = { 
					'realname' : $('#realname').val(),
					'mobile' : $('#mobile').val(),
					'tel' : $('#areanum').val() + $('#tel').val(),
					'address' : $('#address').val(),
					'mail' : $('#mail').val(),
					'qq' : $('#qq').val(),
					'remark' : $('#remark').val()
                    //'str' : location.href

				};
				poptxt(userInpt);
				_bAPP.popHtml({
					'tit' : tipinfo['addrtit'],
					'con' : tipinfo['addrcon'],
					'url' : NULL_LINK,
					'urlb' : NULL_LINK,
					'btntxt' : 'ȷ�϶һ�',
					'btntxtb' : 'ȡ��һ�'
				});
				$(".btns>.btn-orange","#winpop").addClass("btn-real");
                //.btns>.btn-real
				$(".btns>.btn-yellow","#winpop").addClass("close");
				bindEvent();
				//DETAIL.bindEvent();

			}
		});
		$('.btns>.btn-real','#winpop').unbind('click').bind('click',function(e){
			e.preventDefault();
			var that = $(this),
			dataObj = { 
				goods_id : goodsid,
				name : userInpt.realname,//       *����
				mobile : userInpt.mobile,//     *�ֻ�
				address : userInpt.address,//    *��ַ
				qq : userInpt.qq,//             QQ
				email : userInpt.mail,//        ����
				remark : userInpt.remark,//     ��ע
				phone : userInpt.tel//       �绰����
			};
			$.ajax({
				url : _URL + 'exchange',
				type : 'POST',
				data : dataObj,
				async : false,
				dataType : 'jsonp',
				success : function(jsonex) {
					var jsonex = jsonex || {},
					code = jsonex.code || 0,
					data = jsonex.data || {},
					msg = {'msg' : (jsonex.msg || '')};
					//���һ��ɹ��������һ��ɹ��Ի�����ʾ�һ��룬�û���ֱ�ӽ�����Ϸ
                    var srvTxt = "*�ͷ�����3��������������ȷ����Ϣ���뱣���ֻ�ͨ<br>*��Ʒ����ȷ�Ϻ�7���������ڷ����������ĵȺ�";
					if(code == 1){ 
						poptxt(msg);
						_bAPP.popHtml({
							'tit' : '�һ���ʾ',
							'con' : '<div class="tit">' + tipinfo.conexok_real + '</div><div class="con tl lh20">' + srvTxt + '</div>',
							'url' : '/record.html?item=2',
							'urlb' : 'http://wan.liebao.cn/action/redirect_kf.php?gid=0&sid=0',
							'btntxt' : '�һ���¼',
							'btntxtb' : '���߿ͷ�'
						});
                        $(".btns>.btn-orange","#winpop").removeClass("btn-exchange btn-real");
                        $(".btns>.close","#winpop").removeClass("close");
                        $('.btns>a','#winpop').unbind('click');
                        $(".tabcon>.item").addClass("virtal");
                        _bAPP.myCredit();
					}else if(code == -22){//��ֲ���
						_bAPP.popHtml({
								'tit' : '�һ���ʾ',
								'con' : tipinfo.conno_credit,
								'url' : '/actlist.html',
								'urlb' : '',
								'btntxt' : 'ȥ������',
								'btntxtb' : '����ҳ��'
							});

					}else if(code == -23){ //��Ʒ����
						_bAPP.popHtml({
							'tit' : '�һ���ʾ',
							'con' : tipinfo.conno_goods,
							'url' : _SRVURL,
							'urlb' : '',
							'btntxt' : '��ϵ�ͷ�',
							'btntxtb' : '����ҳ��'
						});
					}else{ //�������
						_bAPP.popHtml({
							'tit' : '�һ���ʾ',
							'con' : tipinfo.con_service,
							'url' : '',
							'urlb' : '',
							'btntxt' : '',
							'btntxtb' : '����ҳ��'
						});


					}

                    $(".btns>.btn-orange","#winpop").removeClass("btn-real");
                    $(".btns>.close","#winpop").removeClass("close");
                    //$('.btns>a','#winpop').unbind('click');
                    //$(".tabcon>.item").addClass("virtal");

                    _bAPP.myCredit();
				}
			});
		});
	};

	return {
		init : function(){
			domRender();
			bindEvent();
		}	
	};
})(window,jQuery);
$(function(){
	ADDR.init();
});


	