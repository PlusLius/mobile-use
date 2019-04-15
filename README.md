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

## 轮播图

```js
//使用swiper
~(function(){
    const wrap = document.querySelector('.wrap')
    const list = document.querySelector('.list')
    const imgW = wrap.clientWidth
    const imgs = list.children
    const navs = Array.from(document.querySelectorAl('.nav a'))
    let timer = null
    let pos = 0;
    //使用轮播图
    swiper({
        wrap:wrap,
        dir:"x",
        start(){
            clearInterval(timer);
            list.style.transition = 'none'
            let x = css(list,'translateX')
            pos = Math.round(Math.abs(x / imgW))
            if(pos == 0){
                pos = imgs.length / 2
            } else if (pos == imgs.length - 1){
                pos = imgs.length / 2 -1
            }
            let target = (-pos * imgW)
            css(list,'translateX',target)
        },
        end(){
            let x = css(list,'translateX')
            pos = Math.round(Math.abs(x/imgW))
            let target = -pos * imgW
            list.style.transition = '.3s'
            css(list,'translateX',target)
            navs.forEach(a => {
                a.className = ""
            })
            navs[pos%navs.length].className = "focus"
            auto();
        }
    })
    //自动轮播
    auto();
    function auto(){
        timer = setInterval(() => {
            if(pos == imgs.length -1){
                pos = imgs.length / 2 -1
                list.style.transition = "none";
                css(list,"translateX",-pos*imgW);
            }
            pos ++
            setTimeout(() => {
                list.style.transition = '.3s'
                css(list,"translateX",-pos*imgW);
            },50)
            navs.forEach(a => a.className = "")
            navs[pos % navs.length].className = 'focus'
        },3000)
    }
})()

function swiper(options){
    const wrap = options.wrap
    const scroll = wrap.children[0]
    const dir = options.dir
    const dirTranslate = {
        x:'translateX',
        y:'translateY'
    }
    const isDir = {
        x:false,
        y:false
    }
    let isFirst = true
    let startPoint = {}
    let startEl = {}
    let lastPoint = {}
    let target = {}
    let dis = {}
    let nowPoint = {}
    css(scroll,'translateX',0)
    css(scroll,'translateY',0)
    css(scroll,'translateZ',0)
    wrap.addEventListener('touchstart',e => {
        options.start && options.start.call(wrap,e)
        const touch = e.changedTouches[0]
        startPoint = {
            x:touch.pageX,
            y:touch.pageY
        }
        startEl = {
            x:css(scroll,'translateX'),
            y:css(scroll,'translateY')
        }
    })
    wrap.addEventListener('touchmove',e => {
        const touch = e.changedTouches[0]
        nowPoint = {
            x:touch.pageX,
            y:touch.pageY
        }

        if(lastPoint.x == nowPoint.x
        &&lastPoint.y == nowPoint.y){//上一次坐标 和 这次坐标完全一致，我就不做任何处理
            return;
        }

        dist = {
            x: (nowPoint.x - startPoint.x),
            y: (nowPoint.y - startPoint.y)
        }

        if(isFirst){
            isFirst = false;
            if(Math.abs(dist.x) > Math.abs(dist.y)){
                isDir.x = true
            } else {
                isDir.y = true
            }
        }
        
        target = {
            x:startEl.x + dist.x,
            y:startEl.y + dist.y
        }

        if(isDir[dir]){
            css(scroll,dirTranslate[dir],target[dir])
            e.preventDefault();
        }

        lastPoint.x = nowPoint.x;
        lastPoint.y = nowPoint.y;
        
    })
    wrap.addEventListener('touchend',e => {
        options.end && options.end.call(wrap,e)
        isFirst = true;
        isDir = { 
            x: false,
            y: false
        }
    })
}
```

## 添加动画

```js
function startMove(options){
    //16.7毫秒是屏幕的渲染频率，requestAnimationFrame每秒渲染60帧
    let t = 0 //当前执行次数
    const b = {} //起始位置
    const c = {} //结束位置
    const d = Math.ceil(options.time / 16.7) //执行总次数

    cancelAnimationFrame(options.el.timer)

    Object.keys(options.target).forEach(props => {
        b[props] = css(options.el,props)
        c[props] = options.target[props] - b[props]
    })

    options.el.timer = requestAnimationFrame(move)

    function move(){
        if(t > d) {
            cancelAnimationFrame(options.el.timer)
        }else{
            t++ //每次执行一帧
            Object.keys(options.target).forEach(props => {
                    let val = Tween[options.type](t,b[props],c[props],d)
                    css(options.el,props,val)
            })
            options.el.timer = requestAnimationFrame(move)
        }
    }

}
~(function(){
    const box = document.querySelector('.box')
    css(box,'translateX',0)
    css(box,'translateY',0)

    startMove({
        el:box,
        type:'backBoth', 
        time:500,
        target:{
            translateX:300,
            translateY:400
        }
    })
})()

```