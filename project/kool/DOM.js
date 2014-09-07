/**
 * Created by guoyongfeng on 2014/7/7.
 *
 * @Author      guoyongfeng
 * @Date        2014-07-07
 * @Version     1.0.0
 * @update		2014-07-07
 * @described	DOM操作的兼容性方法
 *
 */
var DOM = (function(){

    return {
        //获取指定元素下的所有指定元素节点，当第二个参数不传时则返回obj下的所有子元素节点
        getChildNodes : function (obj,node){
            var a=[];
            var oChild=obj.childNodes;
            if(node && node.tagName==1){
                for(var i=0;i<oChild.length;i++){
                    if(oChild[i].nodeType==1&&oChild[i].tagName==node.toUpperCase()){
                        a.push(oChild[i]);
                    }
                }
                return a;
            }else {	//如果第二个参数没传，则将obj下的所有元素节点获取并返回
                for (var i = 0; i < oChild.length; i++) {
                    if (oChild[i].nodeType == 1) {
                        a.push(oChild[i]);
                    }
                }
                return a;
            }
        },
        //获取指定元素的下一个兄弟节点.利用递归思路，循环调用方法本身，直到查找到下一个兄弟节点
        getNextEle : function (node){
            var node= node.nextSibling;
            if(node.nodeType == 1){
                return node;
            }
            if (node.nextSibling){
                return arguments.callee(node);
            }

            return null;
        },
        //获取指定元素的下一个兄弟元素节点,利用循环方法，直到查找到下一个兄弟元素节点
        getNextOne : function (ele){
            var next=ele.nextSibling;
            while(next){
                if(next.nodeType===1){
                    return next;
                }
                next=next.nextSibling;
            }
            return null;
        },
        //获取指定标签名ele下面的所有标签名为tagName的弟弟元素节点
        function getNextAll(ele,tagName){
            var a=[];
            var next=getNextOne(ele);	//调用公共方法，获得此元素的下一个（弟弟）元素节点
            if(tagName&&typeof tagName=='string'){
                while(next){
                    if(next.tagName.toLowerCase()==tagName.toLowerCase()){
                        a.push(next);
                    }
                    next=getNextOne(next);
                }
            }else{
                while(next){
                    a.push(next);
                    next=getNextOne(next);
                }
            }

            return a;
        },

    };

})();


/*------------------------
 *函数名称：getPreEle()
 *功能描述：获取指定元素的上一个兄弟元素节点
 *思   路：利用递归思路，循环调用方法本身，直到查找到上一个兄弟元素节点
 *-----------------------*/
function getPreEle(preNode){
    preNode=preNode.previousSibling;
    if(preNode){
        if(preNode.nodeType===1){
            return preNode;
        }else{
            return arguments.callee(preNode);
        }
    }else{
        return null;
    }
}
/*------------------------
 *函数名称：getPreAll()
 *功能描述：获取指定标签名ele下面的所有标签名为tagName的哥哥元素节点，
 *思   路：
 *-----------------------*/
function getPreAll(ele,tagName){
    var a=[];
    var pre=getPreEle(ele);
    if(tagName&&typeof tagName=='string'){
        while(pre){
            if(pre.tagName.toLowerCase()==tagName.toLowerCase()){
                a.push(pre);
            }
            pre=getPreEle(pre);
        }
    }else{
        while(pre){
            a.push(pre);
            pre=getPreEle(pre);
        }
    }

    return a;
}
/*------------------------
 *函数名称：siblings()
 *功能描述：获取指定元素的所有兄弟节点，
 *思   路：先获取哥哥元素节点，存进数组后反转，保证顺序正常，再获取所有弟弟元素节点，拼接即可
 *-----------------------*/
function siblings(ele){
    var a=[];
    var previous=ele.previousSibling;
    while(previous){
        if(previous.nodeType===1){
            a.push(previous);
        }
        previous=previous.previousSibling;
    }
    a.reverse();//如果用unshift方法，则不用反转

    var next=ele.nextSibling;
    while(next){
        if(next.nodeType===1){
            a.push(next);
        }
        next=next.nextSibling;
    }
    return a;
}
/*------------------------
 *函数名称：getSiblings()
 *功能描述：获取指定元素的所有兄弟节点，
 *思   路：先获取指定元素节点的父节点，再往下取该父元素下除本元素外的所有子节点
 *-----------------------*/
function getSiblings(objName){
    var a=[];
    var sib=objName.parentNode.children;
    for(var i=0;i<sib.length;i++){
        if(sib[i]!=objName&&sib[i].nodeType==1){
            a.push(sib[i]);
        }
    }
    return a;
}
/*------------------------
 *函数名称：getEleChildren()
 *功能描述：获得元素ele下指定标记名为tagName的所有子元素，第二个参数可选，表示的是指定标签名的子元素
 *思   路：
 *-----------------------*/
function getEleChildren(ele,tagName){
    if(ele&&ele.nodeType&&ele.nodeType===1){
        if(tagName&&typeof tagName=='string'){
            tagName=tagName.toUpperCase();
            var a=[];
            var ch=ele.childNodes;

            for(var i=0;i<ch.length;i++){
                if(ch[i].nodeType===1&&ch[i].tagName==tagName){
                    a.push(ch[i]);
                }
            }

            return a;
        }else{	//如果第二个参数没有传
            var a=[];
            var ch=ele.childNodes;
            for(var i=0;i<ch.length;i++){
                if(ch[i].nodeType===1){
                    a.push(ch[i]);
                }
            }

            return a;
        }
    }else{	//判断第一个参数
        alert('arguments error!');
    }
}
/*------------------------
 *函数名称：getLastEle()
 *功能描述：在所有的元素节点集eles中找出最后元素节点,在引用此方法时注意取获得的数组的第一个值
 *思   路：调用判断最后元素的方法，循环判断后将最后一个元素放进数组中返回
 *-----------------------*/
function getLastEle(eles){
    if(eles&&eles.length&&eles.length>0){
        var a=[];
        for(var i=0;i<eles.length;i++){	//先判断这一组元素里，有没有不是元素节点
            if(eles[i]&&eles[i].nodeType&&eles[i].nodeType===1){	//获取当前元素的下一个弟弟元素
                var ele=getNextOne(eles[i]);
                if(ele==null){	//如果它不存在弟弟，则说明它就是老小
                    a.push(eles[i]);
                }
            }else{
                alert('参数中的第'+i+'个对象，不符合条件！');
                throw new Error('参数中的第'+i+'个对象，不符合条件！');
            }
        }

        return a;
    }
}
/*------------------------
 *函数名称：getFirstEle()
 *功能描述：在所有的元素节点集eles中找出第一个元素节点,在引用此方法时注意取获得的数组的第一个值
 *思   路：判断元素的哥哥节点是否存在，如果不存在，即是第一个元素节点
 *-----------------------*/
function getFirstEle(eles){
    if(eles&&eles.length&&eles.length>0){
        var a=[];
        for(var i=0;i<eles.length;i++){
            if(eles[i]&&eles[i].nodeType&&eles[i].nodeType===1){
                var ele=getPreEle(eles[i]);
                if(ele==null){	//如果它不存在弟弟，则说明它就是老小
                    a.push(eles[i]);
                }
            }else{
                alert('参数中的第'+i+'个对象，不符合条件！');
                throw new Error('参数中的第'+i+'个对象，不符合条件！');
            }
        }
        return a;
    }
}
/*------------------------
 *函数名称：insertAfter()
 *功能描述：此方法和appendChild方法对应，把要插入的元素追加在目标元素的后面,oldEle会被移除
 *思   路：
 *-----------------------*/
function insertAfter(oldEle,newEle){
    if(oldEle&&oldEle.nodeType&&oldEle.nodeType===1&&newEle&&newEle.nodeType&&newEle.nodeType===1){
        if(oldEle.nextSibling){	//如果oldEle对象有弟弟节点，则追加在它弟弟的前面
            oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
        }else{
            oldEle.parentNode.appendChild(newEle);
        }
    }else{
        throw new Error('参数错误');
    }
}
/*------------------------
 *函数名称：prepend()
 *功能描述：此方法和DOM方法insertBefore功能对应，把newNode这个节点插入到parentEle元素前面
 *思   路：
 *-----------------------*/
function prepend(newNode,oldEle){
    var child=oldEle.firstChild;
    if(child){
        oldEle.insertBefore(newNode,	oldEle.firstChild);
    }else{
        oldEle.appendChild(newNode);
    }
}
/*------------------------
 *函数名称：text()
 *功能描述：获取或设置网页元素节点文本值的方法，只传ele参数是获取ele元素中的文本值，传str是设置ele的文本值
 *思   路：主要处理火狐不支持innerText这个属性的问题
 *-----------------------*/
function text(ele,str){	//如果第一个参数是元素类型
    if(ele&&ele.nodeType&&ele.nodeType===1){	//如果第二个参数没有传过来
        if(str===undefined)	{	//判断浏览器是否支持textContent属性，若支持则此属性的类型为string，否则为undefined
            if(typeof ele.textContent=='string')	{
                return ele.textContent;
            }else{
                return ele.innerText;
            }
        }else if(typeof str=='string'){
            //如果传了第二个参数，并且第二个参数的类型正确，则给此元素设置文本值
            if(typeof ele.textContent=='string')	{
                ele.textContent=str;
            }else{
                ele.innerText=str;
            }
        }else{
            alert('第二个参数str有误')	;
            throw new Error('第二个参数str有误');
        }
    }else{
        alert('第一个参数ele误！');
        throw new Error('第二个参数str有误');
    }
}
/*------------------------
 *函数名称：getElesByClass()
 *功能描述：通过此方法可以获取指定元素ele下具有多个类名的目标元素
 *思   路：此方法运用正则匹配类名，再获取对应元素
 *-----------------------*/
function getElesByClass(strClass,ele){	//去首尾空格
    var reg1=/^\s+|\s+$/g;
    strClass=strClass.replace(reg1,'');
    ele=ele||document;

    if(ele.getElementsByClassName){
        return ele.getElementsByClassName(strClass);
    }else{
        var aClass=strClass.split(' ');
        var eles=ele.getElementsByTagName('*');
        var a=[];
        for(var i=0;i<aClass.length;i++){
            if(aClass[i].replace(/\s/g,'').length>0){
                if(i==0){
                    a=getEle(aClass[i],eles);
                }else{
                    a=getEle(aClass[i],a);
                }
            }
        }
        return a
    }
}
/*------------------------
 *函数名称：getEle()
 *功能描述：获取一组元素中类名为strClass的目标元素，处理IE中getElementsByClassName不能写多个类名的情况
 *思   路：注意获取后的目标元素是放在一个数组中，使用时应注意
 *-----------------------*/
function getEle(strClass,eles){
    strClass=strClass.replace(/\s/g,'');
    var a=[];
    for(var i=0,len=eles.length;i<len;i++){	//注意这个正则不要定义在循环外边
        var reg=new RegExp('\\b'+strClass+'\\b','g');
        if(reg.test(eles[i].className))	{
            a.push(eles[i]);
        }
    }

    return a;
}
/*------------------------
 *函数名称：addClass()
 *功能描述：增加类样式的方法
 *思   路：
 *-----------------------*/
function addClass(ele,className){
    if(ele&&ele.nodeType&&ele.nodeType===1&&className&&typeof className=='string'){
        //判断参数类型对不对 前三个是判断第一个参数是否正确，后两个是判断第二个参数是否正确
        var reg=new RegExp('\\b'+className+'\\b');
        if(!reg.test(ele.className))
        {//如果原来没有这个类样式，则加上
            ele.className+=" "+className;
        }
    }
}
/*------------------------
 *函数名称：removeClass()
 *功能描述：移除类的方法
 *思   路：定义一个正则表达式，将正则匹配到的单词，用空字符串替换掉
 *-----------------------*/
function removeClass(ele,className){
    if(ele&&ele.nodeType&&ele.nodeType===1&&className&&typeof className=='string'){
        var reg=new RegExp('\\b'+className+'\\b','g');
        //定义一个匹配单词边界的正则，并且是全文匹配（加了模式符g）
        ele.className=ele.className.replace(reg,'');
    }
}
/*------------------------
 *函数名称：hasClass()
 *功能描述：判断某元素上是不是有某个类
 *思   路：用正则表达式匹配类型，判断元素的类名和传入的字符串是否一致即可判断
 *-----------------------*/
function hasClass(ele,strClass){	//确定传入的ele为元素，strClass为字符串
    if(ele && ele.nodeType==1 && (typeof strClass == 'string')){
        var reg=new RegExp("\\b"+strClass+"\\b");
        if(reg.test(ele.className)){
            return true;
        }else{
            return false;
        }
    }
}
/*------------------------
 *函数名称：getIndex()
 *功能描述：获取元素的索引值的方法
 *思   路：先得到这个元素父元素的所有元素节点，逐一比较并让计数器加1，如果有和自己相同的元素，则返回当前的记数
 *-----------------------*/
function getIndex(ele){
    if(ele && ele.nodeType && ele.nodeType===1){
        var parent=ele.parentNode;	//获得此元素的父亲节点
        var eles=getEleChildren(parent);	//获得包括自己在内的所有兄弟节点
        for(var i=0;i<eles.length;i++)	{	//一一对比，如果发现自己和某个节点对比是一样的，那么当前的i就是自己的索引值
            if(ele==eles[i]){
                return i;
            }
        }
    }else{
        alert('argument error!');
    }
};
/*------------------------
 *函数名称：getIndexNum()
 *功能描述：获取元素的索引值的方法
 *思   路：通过获取哥哥元素节点的方法来获取当前元素索引值
 *-----------------------*/
function getIndexNum(ele){
    var preNode=getPreEle(ele),n=0;
    while(preNode){
        n++;
        preNode=getPreEle(preNode);
    }

    return n;
}
/*------------------------
 *函数名称：listToArray()
 *功能描述：将nodeList类型转化为数组
 *思   路：
 *-----------------------*/
function listToArray(eles){
    try{
        return Array.prototype.slice.call(eles,0)
    }catch(e){
        var a=[];
        for(var i=0;i<eles.length;i++){
            a.push(eles[i])
        }
        return a;
    }
}
/*------------------------
 *函数名称：getPos()
 *功能描述：获取元素相对于屏幕距离
 *思   路：
 *-----------------------*/
function getPos(ele){
    var x=ele.offsetLeft;
    var y=ele.offsetTop;
    var p=ele.offsetParent;

    while(p&&p!=document.body){ 	//解决IE8中的BUG
        if(window.navigator.userAgent.indexOf('MSIE 8.0')>-1){
            x+=p.offsetLeft;
            y+=p.offsetTop;
        }else{
            x+=p.offsetLeft+p.clientLeft;
            y+=p.offsetTop+p.clientTop;
        }
        p=p.offsetParent;
    }
    var obj={};
    obj.x=x;
    obj.y=y;
    return obj;
}
/*------------------------
 *函数名称：getCss()
 *功能描述：获取网页元素的CSS属性值的兼容性写法，可以获取行内样式、内嵌样式和外链样式
 *思   路：currentStyle属性是属于IE的，getComputedStyle属性是标准浏览器的，通过判断解决兼容性
 *-----------------------*/
function getCss(ele, attr){
    if(ele&&ele.nodeType&&ele.nodeType===1&&attr&&typeof attr=='string'){
        return ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(ele,false)[attr];
    }else{
        throw new Error('参数错误！！');
    }
}
/*------------------------
 *函数名称：setCss()
 *功能描述：给元素设置CSS属性的方法
 *思   路：处理各属性的兼容性问题、值域问题及容错性问题
 *-----------------------*/
function setCss(ele,attr,svalue){	//with的用法：在这里把ele当做当前的作用域，相当于在每个CSS属性之前写了"ele."
    with(ele){
        switch(attr){	//处理float的兼容性问题
            case 'float':
                style['cssFloat']=svalue;
                style['styleFloat']=svalue;
                break;
            //处理不透明度的兼容性问题
            case 'opacity':
                if(svalue<=1 && svalue>=0){
                    style['opacity']=svalue;
                    style['filter']="alpha(opacity:"+svalue*100+")";
                }
                break;
            case 'width':
            case 'height':
            case 'borderLeftWidth':
            case 'paddingLeft':
            case 'paddingBottom':
            case 'paddingTop':
            case 'paddingRight':
            case 'top':
            case 'marginLeft':
            case 'marginRight':
            case 'marginTop':
            case 'marginBottom':
            case 'right':
            case 'left':
                //正则表达式匹配值，可为整数可为小数，可为正数可为负数，可带单位也可不带
                var reg=/^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                if(reg.test(svalue)){
                    var num=RegExp.$1;//取出第一个分组：数值部分
                    var danwei=RegExp.$2;//取出第二个分组：单位部分
                    num=Math.max(0,num);//如果传进来的值是负数，则用0
                    if(danwei){	//如果有单位，则加上单位
                        svalue=num+danwei;
                    }else{	//如果没有单位，则以px为默认单位
                        svalue=num+'px';
                    }
                    style[attr]=svalue;
                }else{
                    style[attr]=svalue+'px';
                }
                break;
            default:
                style[attr]=svalue;
        }	//end of switch
    }	//end of with
}
/*------------------------
 *函数名称：setGrounpCss()
 *功能描述：批量设置css属性的方法,一次可以给一到多个CSS属性设置属性值，第一个参数ele可以是一个或是多个元素节点
 第二个参数类似这样{height:100,float:'left',width:300,opacity:0.5,lineHeight:'1.5em'}
 *思   路：循环调用setCss方法以实现批量设置属性值
 *-----------------------*/
function setGrounpCss(ele,oCss){
    if(oCss&&typeof oCss=='object'){
        if(ele&&ele.nodeType&&ele.nodeType===1){	//遍历oCSS对象中的所有属性
            for(var attr in oCss)	{
                setCss(ele,attr,oCss[attr]);
            }
        }else if(ele&&ele.length&&ele.length>0){
            //如果ele一个元素集合，则做两重循环
            for(var i=0;i<ele.length;i++){
                for(var attr in oCss)	{
                    setCss(ele[i],attr,oCss[attr]);
                }
            }
        }
    }
}