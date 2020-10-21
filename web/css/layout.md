# CSS 布局
布局有三种方式： 常规流、浮动、绝对定位

## 常规流
常规流中包含 行级、块级、表格布局、Flexbox、Grid布局

### 行级元素
质保函行级盒子的容器会创建一个IFC
IFC内的排版规则
* 盒子在一行内水平摆放
* 一行放不下时，换行显示
* text-align 决定一行内盒子的水平对齐
* vertical-align 决定一个盒子在行内的垂直对齐
* 避开浮动(float)元素

### Flexible Box
控制盒子的 摆放流向、摆放顺序、盒子的宽度和高度、水平和垂直方向的对齐、是否允许折行
```css
/* 生成一个块级的Flex容器 */
display: flex ;
/* 生成一个行级的Flex容器 */
display: inline-flex;
/* 控制摆放方向 */
flex-direction:row;
/* 允许换行 */
flex-wrap:wrap;

/* 剩余空间时的伸展能力 */
flex-grow:
/* 剩余空间不足时的收缩能力 */
flex-shrink:
/* 没有伸展或者收缩时的基础长度 */
flex-basis:

/* 主轴方向的排序，主轴：空间排列方向 */
justify-content: start;

/* 侧轴方向 */
align-items: center;

/* 针对单个元素的对齐方式 */
align-self: flex-end;

/* 设置行的内容 */
align-content: center;

/* 单个元素使用，第几个元素 */
order:1;
```

### Grid布局
```css
/* 生成一个块级的Grid容器 */
display: grid ;

```

## 浮动



## 绝对定位