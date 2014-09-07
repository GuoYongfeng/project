/**
 * Created by yongfeng.guo on 2014/6/26.
 */

var $ = function() {};

$.prototype.Events = {
    bind: function(){

    },
    unbind: function(){

    },
    on: function(){

    }
    //包含事件兼容性处理的绑定等方法

};

$.prototype.DOM = {
    getChildNods: function(){

    },
    getNext: function(){

    },
    getNextAll: function(){

    },
    getPrev: function(){

    }
    //20个左右的DOM操作小方法，包含各节点增删改查操作，通过样式取节点，设置样式等

};

$.prototype.ajax = {
    getData: function(){

    },
    parseData: function(){

    },
    getJSONP: function(){

    }

};

$.prototype.cookie = {
    getCookie: function(){

    },
    setCookie: function(){

    }
};

$.prototype.animate = function(){

//tween动画库函数封装
    function animate(ele, json, duration, effect, fnCallBack){
        //对传参effect进行判断，并将获得的方法统一赋值给action方法
        //对传参的判断可以实现js的重载功能。
        var action=null;
        if(typeof effect =="number"){
            //1 buffer,2 flex,3 bounce 4 linear
            switch(effect){
                case 1:
                    action=moveEffect.Exponential.easeOut;
                    break;
                case 2:
                    action=moveEffect.Elastic.easeOut;
                    break;
                case 3:
                    action=moveEffect.Bounce.easeOut;
                    break;
                case 4:
                    action=moveEffect.Linear;
                    break;
                default:
                    break;
            }
        }else if(typeof effect == 'string'){
            switch(effect){
                case 'Exponential':
                    action=moveEffect.Exponential.easeOut;
                    break;
                case 'Elastic':
                    action=moveEffect.Elastic.easeOut;
                    break;
                case 'Bounce':
                    action=moveEffect.Bounce.easeOut;
                    break;
                case 'Linear':
                    action=moveEffect.Linear;
                    break;
                default:
                    break;
            }

        }else if(typeof effect == "function"){
            //参数effect是个函数，则默认为这是回调函数，并采用默认的运动效果
            fnCallback=effect;
        }else if(effect instanceof Array){
            //输入格式：['Expo','easeOut']
            if(effect.length===2){
                action=moveEffect[effect[0]][effect[1]];
            }else if(effect.length==1){
                action=moveEffect.Linear;
            }
        }else{
            action=moveEffect.Exponential.easeOut;
        }

        //获取初试值
        var oBegin={};
        var oChange={};
        for(var attr in json){
            var begin=0, change=0, count=0;
            if(attr == 'opacity'){
                begin=Math.random((parseFloat(getStyle(ele, attr)))*100);
                change=json[attr]-begin;
                if(begin == 'undefined'){
                    ele.style[attr]='alpha(opacity:100)';
                    ele.style.opacity=1;
                }
            }else{
                begin=parseInt(getStyle(ele, attr));
                change=json[attr]-begin;
            }
            //保存
            if(change){
                count++;
                oBegin[attr]=begin;
                oChange[attr]=change;
            }
        }
        //判断所有变量是否到齐
        if(count == 0){
            if(typeof fnCallBack == 'function'){
                fnCallBack.call(ele);
            }else{
                return ;
            }
        }

        //封装运动函数
        var times=0;
        var interval=30;
        move();

        function move(){
            clearInterval(ele.timer);
            times+=interval;

            if(times<=duration){
                for(var attr in json){
                    //var val=times*oChange[attr]/duration+oBegin[attr];
                    var val=action(times, oBegin[attr], oChange[attr], duration);
                    if(attr == 'opacity'){
                        ele.style[attr]=val/100;
                        ele.style.filter="alpha(opacity="+val+")";
                    }else{
                        ele.style[attr]=val+'px';
                    }
                }
                ele.timer=window.setInterval(move, interval);
            }else{
                if(attr == 'opacity'){
                    ele.style[attr]=json[attr]/100;
                    ele.style.filter="alpha(opacity="+json[attr]+")";
                }else{
                    ele.style[attr]=json[attr]+'px';
                }
                //回调函数
                if(typeof fnCallBack == 'function'){
                    fnCallBack.call(ele);
                }

                ele.timer=null;
            }
        }

        //获取css样式的兼容性写法
        function getStyle(obj, attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }else{
                return getComputedStyle(obj, null)[attr];
            }
        }

    }

//思路：当前时间*变化量/持续时间+初始值
    var moveEffect = {
        //1.线性运动
        Linear: function(t,b,c,d){
            return c*t/d + b;
        },
        //2.二次方的缓动（t^2）；
        Quadratic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        },
        //3.三次方的缓动（t^3）
        Cubic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        },
        //4.四次方的缓动（t^4）；
        Quartic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        },
        //5.五次方的缓动（t^5）；
        Quintic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            }
        },
        //6.正弦曲线的缓动sin(t)
        Sinusoidal: {
            easeIn: function(t,b,c,d){
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t,b,c,d){
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }
        },
        //7.指数曲线的缓动（2^t）；
        Exponential: {
            easeIn: function(t,b,c,d){
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t,b,c,d){
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //8.圆形曲线的缓动（sqrt(1-t^2)）；
        Circular: {
            easeIn: function(t,b,c,d){
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            }
        },
        //9.指数衰减的正弦曲线缓动；
        Elastic: {
            easeIn: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
            },
            easeInOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            }
        },
        //10.超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
        Back: {
            easeIn: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            }
        },
        //11.指数衰减的反弹缓动。
        Bounce: {
            easeIn: function(t,b,c,d){
                return c - moveEffect.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return moveEffect.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return moveEffect.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };
};
$.prototype.formValidate  = function(){
    serialize: function(){

    },

}