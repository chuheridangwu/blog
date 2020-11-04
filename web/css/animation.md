# css动画

## 变形动画 transform
平移、旋转、缩放、倾斜

动画可以组合可以使用
```css
.box{
    transform: rotateY(40deg) perspective(100px); 
}
```

origin的用法

* 一个值：必须是`<length>`，`<percentage>`，或 left, center, right, top, bottom关键字中的一个。
* 两个值：其中一个必须是`<length>`，`<percentage>`，或left, center, right关键字中的一个。另一个必须是`<length>`，`<percentage>`，或top, center, bottom关键字中的一个。
* 三个值：前两个值和只有两个值时的用法相同。第三个值必须是`<length>`。它始终代表Z轴偏移量。


### translate 平移
平移动画不会影响它在文档流的位置
```css
.box{
    transform: translate(100px,100px);
}

.box{
    transform: translateX(100px);
}

.box{
    transform: translateY(-100px);
}

/* 自身宽高的100% */
.box{
    transform: translate(100%,100%);
}
```


### rotate 旋转

```css
/* 顺时针旋转90度 */
.box{
    transform: rotate(90deg);
}

/* 旋转180度 */
.box{
    transform: rotate(0.5turn);
}

/* origin 旋转时自身的点 */
.box{
    transform-origin: 0 0;
    transform: rotate(360deg);
}
```

### scale 缩放

```css
/* 自身当前的位置进行缩放*/
.box{
    transform: scale(2);
}

/* 缩放宽和高*/
.box{
    transform: scale(3,0.5);
}

/* 以origin的点为 */
.box{
    transform-origin: left top;
    transform: scale(2);
}
```

### skew 倾斜

```css
/* 倾斜30度*/
.box{
    transform: skew(30deg)
}

/* 根据Y值倾斜50度 */
.box{
    transform: skewY(30deg)
}

/* 同时倾斜宽和高 */
.box{
    transform: skew(30deg,20deg);
}
```

## 过渡动画 transition
* transition-property  
* transition-duration
* transition-timing-function
* transition-delay

如果想要使用对应的动画，需要先设置动画属性`transition-property`，再设置动画时间`transition-duration`

```css
transition属性一起写: 属性 时间 动画效果 延迟时间,属性 时间 动画效果 延迟时间;
.box{
    transition: margin 3s, width 2s;
}
```

box-shadow: 水平偏移 垂直偏移 模糊度 ; // 快速设置阴影只需要设置这三个
box-shadow: 水平偏移 垂直偏移 模糊度 阴影扩展 阴影颜色 内外阴影;

## 动画 animation

**如果是移动动画，需要标签是绝对定位或者相对定位**

### 动画属性

属性 | 描述 | CSS版本
------- | ------- | -------
@keyframes | 规定动画名称。 | 3
animation | 所有动画属性的简写属性，除了 animation-play-state 属性。 | 3
animation-name | 规定 @keyframes 动画的名称。 | 3
animation-duration | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。 | 3
animation-timing-function | 规定动画的速度曲线。默认是 "ease"。 | 3
animation-delay | 规定动画何时开始。默认是 0。 | 3
animation-iteration-count | 规定动画被播放的次数。默认是 1。 | 3
animation-direction | 规定动画是否在下一周期逆向地播放。默认是 "normal"。 | 3
animation-play-state | 规定动画是否正在运行或暂停。默认是 "running"。 | 3
animation-fill-mode | 规定对象动画时间之外的状态。

### 单次动画
```css
.animation{
    width: 120px;
    height: 40px;
    background-color: red;
    animation: rotate 10s linear 0s 3;
    margin: 100px auto;
}

@keyframes rotate {
    form{
        transform: rotate(10deg);
    }

    to{
        transform: rotate(50deg);
    }
}
```

### 动画组
动画组根据百分比来实现动画组的

```css
@keyframes myfirst{
    0%   {background: red;}
    25%  {background: yellow;}
    50%  {background: blue;}
    100% {background: green;}
}
```