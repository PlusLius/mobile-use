function transform(el,attr,val){
    if(!el.transform)el.transform = {};
    if(val === undefined)return el.transform[attr];

    el.transform[attr] = val
    let str = ""
    Object.keys(el.transform).forEach((attr) => {
        switch(attr){
            case 'rotate':
            case 'rotateX':
            case 'rotateY':
            case 'rotateZ':
            case 'skewX':
            case 'skewY':
                str +=  `${attr}(${el.transform[attr]}deg)`
                break;
            case 'scale':
            case 'scaleX':
            case 'scaleY':
                str += `${attr}(${el.transform[attr]})`
                break;
            case 'translateX':
            case 'translateY':
            case 'translateZ':
                str += `${attr}(${el.transform[attr]}px)`
                break;
        }
    })
    el.style.transform = str
}

function tap(el,fn){
    let startPoint,lastPoint
    el.addEventListener('touchstart',e => {
        startPoint = {
            x:e.changedTouches[0].pageX,
            y:e.changedTouches[0].pageY
        }
    })
    el.addEventListener('touchend',e => {
        lastPoint = {
            x:e.changedTouches[0].pageX,
            y:e.changedTouches[0].pageY
        }
        if(Math.abs(lastPoint.x - startPoint.x) < 5 && Math.abs(lastPoint.y - startPoint.y) < 5){
            fn && fn.call(el,e)
        }
    })
}

function css(el,attr,val){
    let transformAttr = ["rotate","rotateX","rotateY","rotateZ","skewX","skewY","scale","scaleX","scaleY","translateX","translateY","translateZ"];
    if(transformAttr.includes(attr)){
        return transform(el,attr,val)
    }
    if(val === undefined){
       return parseFloat(getComputedStyle(el)[attr])
    }
    if(attr == 'opacity'){
        el.style[attr] = val
    }else {
        el.style[attr] = val + 'px'
    }
}
