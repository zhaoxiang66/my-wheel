import '../public/js/zx-wheel';
import '../public/scss/reset.scss';
import '../public/scss/zx-wheel.scss';
import '../scss/轮播.scss';
import '../assets/js/iconfont.js';
import { equal } from 'assert';
$(function(){
    console.log("欢迎来到轮播界面");
    var myBroadcast = new Broadcast(
        {
            speed : 300,
            grid : 1,
            scale : 2/3,
            step : 0,
            state : false,
            boxPadding : "0"
        }
    )
    //初始化轮播
    myBroadcast.init();
    function run(){
        myBroadcast.moveRight();
        $('.lunbo .imgBox .round li').eq(myBroadcast.step).addClass('active').siblings().removeClass('active');
    }
    var timer;
    timer = setInterval(run,4000);
    //点击小圆点事件
    $('.lunbo .imgBox .round li').on('click',function(){
        var index = $(this).index();
        myBroadcast.roundMove(index);
        $(this).addClass('active').siblings().removeClass('active');
    })
    //右拉箭头事件
    $('.lunbo .imgBox .right').on('click',function(){
        var index = $(this).index();
        myBroadcast.moveRight();
        $('.lunbo .imgBox .round li').eq(myBroadcast.step).addClass('active').siblings().removeClass('active');
    })
    //左拉箭头事件
    $('.lunbo .imgBox .left').on('click',function(){
        var index = $(this).index();
        myBroadcast.moveLeft();
        $('.lunbo .imgBox .round li').eq(myBroadcast.step).addClass('active').siblings().removeClass('active');
    })
    //给最外边imgbox加鼠标进入，清除定时器
    $('.lunbo .imgBox').on('mouseenter',function(){
        clearInterval(timer);
    })
    //给最外边imgbox加鼠标移出，加上定时器
    $('.lunbo .imgBox').on('mouseleave',function(){
        timer = setInterval(run,4000);
    })
})
