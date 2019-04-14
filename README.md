# mobile-use

```js
//防止误点
function tap(el,fn){
    let startPoint = {}
    el.addEventListener('touchstart',(e) => {
        startPoint = {
            x:e.changedTouches[0].pageX,
            y:e.changedTouches[0].pageY
        }
    })
    el.addEventListener('touchend',(e) => {
        let nowPoint = {
            x:e.changedTouches[0].pageX,
            y:e.changedTouches[0].pageY
        }
        if(Math.abs(nowPoint.x - startPoint.x) < 5 && Math.abs(nowPoint.y - startPoint.y) < 5){
            fn && fn.call(el,e)
        }
    })
}

//tab切换应用
tap(navs[i],function(){
    for(var i = 0; i < navs.length; i++){
        navs[i].className = "";
        cons[i].className = "";
    }
    navs[this.index].className = "focus";
    cons[this.index].className = "show";
});

```

## 滑屏操作

```js
(function(){
    let box = document.querySelector('#box')
    css(box,"translateY",0);
    tap(box,function(){
        var y = css(box,"translateY");
        y += 30;
        css(box,"translateY",y)
    });
})()
function transform(el,attr,val){
    if(!el.transform){
        el.transform = {};
    }
    if(val === undefined){
        return el.transform[attr];
    }
    el.transform[attr] = val
    let str = ""
    Object.keys(el.transform).forEach(item => {         
        switch(item){
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skewX":
            case "skewY":
                str += item +"("+el.transform[item]+"deg) ";
                return ;
            case "scale":
            case "scaleX":
            case "scaleY":
                str += item +"("+el.transform[item]+") ";
                return ;
            case "translateX":
            case "translateY":
            case "translateZ":
                str += item +"("+el.transform[item]+"px) ";
                return ;	
        }
    })
    
    el.style.transform = str
}
function css(el,attr,val){
    let transformAttr = ['rotate',"rotateX","rotateY","rotateZ","skewX","skewY","scale","scaleX","scaleY","translateX","translateY","translateZ"]
    let res 
    transformAttr.forEach(item => {
        if(item === attr){
            return res = transform(el,attr,val)
        }
    })
    return res
}
function tap(el,fn){
    var startPoint = {};
    el.addEventListener('touchstart', function(e) {
        startPoint = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }
    });
    el.addEventListener('touchend', function(e) {
        var nowPoint = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
        }
        if(Math.abs(nowPoint.x - startPoint.x) < 5
        &&Math.abs(nowPoint.y - startPoint.y) < 5){
            fn&&fn.call(el,e);
        }
    });
}
```

