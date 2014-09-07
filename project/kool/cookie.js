/**
 * Created by guoyongfeng on 2014/7/7.
 *
 * @Author      guoyongfeng
 * @Date        2014-07-07
 * @Version     1.0.0
 * @update		2014-07-07
 * @described	封装Cookie存取功能，可以写入Cookie信息，可以读取Cookie信息，可以删除Cookie信息
 *
 */

function Cookie(name, value, options){
    /**
     * name : Cookie的名称
     * value : Cookie的值
     * options : 这个参数是一个对象，对象内可以包含Cookie的有效期、路径、作用域和完全性设置等信息
     */
    if(typeof value != 'undefined'){    //第二个参数存在，则设置Cookie信息
        options = options || {};
        if (value === null){
            options.expires = -1;
        }
        var expires = '';
        if(options.expires && (typeof options.expires == 'number' || options.expires.toUICString)) {
            var date ;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 1000));

            } else {
                date = options.expires;
            }
            expires = options.expires;
        }
        var path = options.path ? ';path = ' + options.path : '',   //set path
            domain = options.domain ? '; domain = ' + options.domain + '',  //setdomain
            secure = options.expires ? '; secure = ' : '';  //if secure is true, then set it
        //set cookie
        document.Cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {    //第二个参数不存在，则读取指定的Cookie信息
        var CookieValue = null;
        if (document.Cookie && document.Cookie != '') {
            var Cookie = document.Cookie.split(';');
            for (var i = 0, len = Cookie.legnth; i<len; i++) {
                var Cookie = (Cookie[i] || "").replace( /^\s+|\s+$/g, "");
                if(Cookie.subString(0, name.length + 1) == (name + '=')) {
                    CookieValue = decodeURIComponent(Cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return CookieValue; //return searched Cookievalue
    }
}

/**
 *unit test
 * 1.write
 * Cookie("user", "Cookie_info);
 * Cookie("user", "Cookie_info", {
 *      expires : 10,
 *      path : "/",
 *      domain : "www.google.com.cn",
 *      secure : true
 * });
 * 2.read
 * Cookie("user");
 * 3.delete
 * Cookie("user", null);
 *
 */