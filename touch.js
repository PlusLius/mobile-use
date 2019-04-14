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