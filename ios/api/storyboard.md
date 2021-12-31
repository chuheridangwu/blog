# Storyboard
本章主要记录可视化编程的一些问题，以及如何解决这些问题。附带可视化编程的一些技巧。

## 添加自定义颜色
选择自定义颜色`Custom`，在第二个选项"颜色滑块"中选择`RGB Sliders`，在底部可以输入十六进制颜色
![](../imgs/ios_img_56.jpg 'size:100')

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

## 遇到的问题
1. 在使用xib编程，给对应的View设置圆角时，`遇到只有左边是圆角，右边不显示圆角的情况`，这是因为你在设置圆角的时候，**View的宽度还是你在xib中使用模拟器的宽度，并不是它真实屏幕的宽度。**
