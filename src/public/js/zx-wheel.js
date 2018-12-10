(function(window,document){
    //轮播插件
    function Broadcast(data){
        if(data){
            this.speed = data.speed?data.speed:300;
            this.grid = data.grid?data.grid:1;
            this.step = 0;
            this.state = false;
            this.scale = data.scale?data.scale:2/3;
            this.father = data.father?'.x-broadcast ' + '.' + data.father:'.x-broadcast';
            this.boxPadding = data.boxPadding?data.boxPadding:'0 10px';
        }else{
            this.speed = 300;
            this.grid = 1;
            this.father = '.x-broadcast';
            this.scale = 2/3;
            this.step = 0;
            this.state = false;
            this.boxPadding = "0";
        }
    }
    Broadcast.prototype = {
        //初始化函数
        init:function(){
            //选出x-imgBox
            var selectorImgBox = this.father + ' .x-imgList .x-imgBox';
            //通过轮播放几张图片-grid算出每个box的宽度
            var boxWidth = $(this.father).width()/this.grid;
            //通过比例算出每个box的高度
            var boxHeight = Math.floor(boxWidth * this.scale);
            // 给imgbox的宽赋值
            $(selectorImgBox).width(boxWidth);
            //给包裹x-imgBox加padding
            $(selectorImgBox).css('padding',this.boxPadding);
            // 给imgbox的高赋值
            $(selectorImgBox).height(boxHeight);
            //给父元素的高赋值
            $(this.father).height(boxHeight);
            //如果图片给的数量正好等于grid的数量，那么最后一个box右内边距为0
            //选出包裹imgBox的imgList
            var selectorImgList = this.father + ' .x-imgList';
            /////////////剩下的就开始克隆图片了
            var imgBoxs = $(selectorImgBox);
            //通过循环来计算出imgList的宽度
            var imgListWidth = 0;
            for(var i = 0; i < $(selectorImgBox).length;i++){
                imgListWidth += $(selectorImgBox).eq(i).outerWidth();
            }
            imgListWidth+= $(selectorImgBox).eq(0).outerWidth();
            //给imgList设置宽度
            $(selectorImgList).width(imgListWidth);
        },
        //左边箭头-向右移动
        moveLeft:function(){
            if(!this.state){
                var selectorImgBox = this.father + ' .x-imgList .x-imgBox';
                var selectorImgList = this.father + ' .x-imgList';
                this.step--;
                if(this.step < 0){
                    this.step = $(selectorImgBox).length - 1;
                }
                var step = $(selectorImgBox).width();
                var newElement = $(selectorImgBox).last().clone(true);
                var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                $(selectorImgList).prepend(newElement);
                $(selectorImgList).css('left',(left - step) + 'px');
                $(selectorImgBox).last().remove();
                left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                var _this = this;
                $(selectorImgList).animate({left:(left + step) + 'px'},this.speed,function(){
                    _this.state = false;
                });
                this.state = true;
            }
        },
        //右边箭头-向左移动
        moveRight:function(){
            if(!this.state){
                var selectorImgBox = this.father + ' .x-imgList .x-imgBox';
                var selectorImgList = this.father + ' .x-imgList';
                this.step++;
                if(this.step > $(selectorImgBox).length - 1){
                    this.step = 0;
                }
                var step = $(selectorImgBox).width();
                var newElement = $(selectorImgBox).eq(0).clone(true);
                var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                $(selectorImgList).append(newElement);
                var _this = this;
                $(selectorImgList).animate({left:(left - step) + 'px'},this.speed,function(){
                    _this.state = false;
                    $(selectorImgBox).first().remove();
                    var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                    $(selectorImgList).css('left',(left + step) + 'px');
                });
                this.state = true;
            }
        },
        roundMove:function(index){
            var selectorImgBox = this.father + ' .x-imgList .x-imgBox';
            var selectorImgList = this.father + ' .x-imgList';
            var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
            var distance = index - this.step;
            if(distance < 0 && left == 0){
                if(!this.state){
                    this.step = index;
                    distance = Math.abs(distance);
                    var step = $(selectorImgBox).width();
                    for(var i = 1; i <= distance;i++){
                    var newElement = $(selectorImgBox).eq($(selectorImgBox).length - i).clone(true);
                    $(selectorImgList).prepend(newElement);
                    }
                    var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                    $(selectorImgList).css('left',(left - distance * step) + 'px');
                    for(var i = 1; i <= distance;i++){
                        $(selectorImgBox).last().remove();
                    }
                    left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                    var _this = this;
                    $(selectorImgList).animate({left:(left + distance * step) + 'px'},this.speed,function(){
                        _this.state = false;
                    });
                    this.state = true;
                }
            }else if(distance > 0 && left == 0){
                this.step = index;
                distance = Math.abs(distance);
                var step = $(selectorImgBox).width();
                for(var i = 0; i < distance;i++){
                    var newElement = $(selectorImgBox).eq(i).clone(true);
                    $(selectorImgList).append(newElement);
                }
                var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                var _this = this;
                $(selectorImgList).animate({left:(left - distance * step) + 'px'},this.speed,function(){
                    _this.state = false;
                    for(var i = 0; i < distance;i++){
                        $(selectorImgBox).eq(0).remove();
                    }
                    var left = Math.floor($(selectorImgList).css('left').slice(0,-2));
                    $(selectorImgList).css('left',(left + distance * step) + 'px');
                });
            }else{
                this.step = index;
            }
        }
    }
    window.Broadcast = Broadcast;
})(window,document);

