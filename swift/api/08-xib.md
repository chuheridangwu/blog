# Storyboard
本章主要记录可视化编程的一些问题，以及如何解决这些问题。附带可视化编程的一些技巧。


xib的一些技巧：
Xib设置类时如果从当前控件切换到`File’s Owner`，需要将以前的连线去掉。
* [Xib文件使用（二）——关联变量](https://blog.csdn.net/xunyn/article/details/8521194)
* [Xib的使用：设置File‘s Owner的Class和view的Class的区别](https://blog.csdn.net/az44yao/article/details/110836006?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1.pc_relevant_default&utm_relevant_index=1)

## 添加自定义颜色
选择自定义颜色`Custom`，在第二个选项"颜色滑块"中选择`RGB Sliders`，在底部可以输入十六进制颜色
![](../imgs/ios_xib_2.png 'size:100')

## 在xib中添加自定义属性
`@IBDesignable`和`@IBInspectable`是iOS8的新特性，可以实时渲染在`interface builder`上，直接对值进行修改视能实时发生变化。`layer.borderWidth、borderColor、cornerRadius`这些属性在xib上是不能直接设置的，@IBDesignable和@IBInspectable利用运行时机制，可以把这些属性映射到xib上，同时还可以映射自定义的属性。

## XIB创建TableViewCell
```oc
// 创建cell
[_tableView registerNib:[UINib nibWithNibName:@"PersonMessageCell" bundle:nil] forCellReuseIdentifier:@"PersonMessageCell"];

// 使用
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    PersonMessageCell *cell = [tableView dequeueReusableCellWithIdentifier:@"PersonMessageCell"];
    return cell;
}
```

## UIScrollView
在Xib中使用UIScrollView的时候，需要注意在iOS11之后，UIScrollView增加了`framelayoutGuide`和`contentLayoutGuide`。

```markdown
* `framelayoutGuide:` 框架布局指南，就是指框架本身，这里的框架就是UIScrollView
* `contentLayoutGuide:` 内容布局指南，滚动视图内容的布局指南，指的UIScrollView里面的布局
```
iOS11以上以下步骤进行添加：
```markdown
1. xib中添加scrollview，添加对父控件约束
2. ScrollView内部添加UIView，设置四周边距跟`contentLayoutGuide`相等，设置完成后，修改比例为1
3. 设置UIView的宽或者高跟`framelayoutGuide`相等，设置好之后会报错，先给View对应的宽或者高一个固定值，防止报错
4. 如果是宽相等，纵向滑动，如果是高相等，横向滑动。 
```


如果是 iOS11 以下在XIB中使用UIScrollView按照以下的步骤:

```markdown
1. xib中添加scrollview，添加对父控件约束
2. scrollview取消 Content Layout Guides 按钮，取消后，不再使用 framelayoutGuide 和 contentLayoutGuide
3. scrollview内部添加UIView，设置四周边距，如果上下滑动设置跟scrollview等宽，这个时候还会报错，不管它
4. 在UIview上 设置 我们想要添加的控件，注意要设置顶部跟底部跟UIview的约束
5. 注意CongtentView的宽度，设置跟ScrollView的宽度一致，
6. 删除ContentView约束上的固定宽高约束
```

在利用xib绘制UIScrollerView时，全屏时页面总是出现偏移一个状态栏高度。设置`Content Insets`为`Never`或者代码中设置:
```objc
if (@available(iOS 11.0, *)){
    [[UIScrollView appearance] setContentInsetAdjustmentBehavior:UIScrollViewContentInsetAdjustmentNever];
    [UITableView appearance].estimatedRowHeight = 0;
    [UITableView appearance].estimatedSectionHeaderHeight = 0;
    [UITableView appearance].estimatedSectionFooterHeight = 0;
}
```

>⚠️注意这里有个坑: 在iOS16的系统中，也就是iPhone14的设备。在拥有系统导航栏的时候，UIViewController的高度是整体屏幕的高度，在iOS16之前的设备上，UIViewController的高度是 `屏幕高度 - 导航栏高度 - 状态栏高度`。

* [Xcode11 在Xib中进行UIScrollView布局](https://juejin.cn/post/6844904042452238344)


## 遇到的问题
1. 在使用xib编程，给对应的View设置圆角时，`遇到只有左边是圆角，右边不显示圆角的情况`，这是因为你在设置圆角的时候，**View的宽度还是你在xib中使用模拟器的宽度，并不是它真实屏幕的宽度。**


## 在Xcode，手机iOS15中，遇到过的适配问题
1. Must translate autoresizing mask into constraints to have _setHostsLayoutEngine:YES Xcode 13

仅在 iOS 15 上的 Xcode 13.0 也发生了同样的事情，需要将cell视图设置为Layout: `Autoresizing Mask `，如下图：
![](../imgs/xib/ios_xib_1.png)


2. 仅在 iOS 15 上的 Xcode 13.0 ，使用stacke时，需要注意它默认是有背景的。


## 修改比例约束
```objc
// self.logoAspect 是比例约束
//修改图片宽度比
[NSLayoutConstraint deactivateConstraints:@[self.logoAspect]];
self.logoAspect = [NSLayoutConstraint constraintWithItem:self.logoImageView attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:self.logoImageView attribute:NSLayoutAttributeHeight multiplier:1.0 constant:0];
[NSLayoutConstraint activateConstraints:@[self.logoAspect]];
```

## 修改约束
```objc
_heightConstraint.constant = 12;
```

## UIButton 技巧
UIButton的常见布局左边是按钮，右边是文字,我们经常会遇到右边是按钮，左边是文字的情况，可以通过给分类添加方法的方式解决，也可以在Xib右侧面板选中`Semantic`属性选择`Right-To-Left`的方式来解决，这样就文字在左边，图片在右边
```markdown
* Unspecified: 视图的默认值，当从左到右和从右到左的布局进行切换时，视图被翻转。
* Playback: 表示播放控制的视图，如播放，倒带或快进按钮或播放头清洗器。在从左到右和从右到左的布局之间切换时，这些视图不会翻转。
* Force Left-To_Right: 始终使用从左到右布局显示的视图。
* Force Right-To-Left: 始终使用从右到左的布局显示的视图。
```

文字和图片的间隔技巧，有时候我们需要一些选中按钮，图片和文字之间是有间隔的，我们又不想给Button宽度，希望它自适应。我们可以通过以下操作达成目标
```markdown
1. 给出按钮居中和侧边的间距，不设置宽度，可以设置高度扩大按钮的点击范围
2. 在Xib中设置按钮的`Image Insets`右侧的间距，比如我们设置距离文字的间距是`5`
3. 在`viewDidLayoutSubviews`或者`layoutSubviews`方法中设置Button的宽度是原来的`宽度 + 间距`，**注意同样需要修改x的值**。这样就可以达成我们的目标，
    ```swift
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        selBtn.mj_x -= 10
        selBtn.mj_w += 10
    }
    ```
```