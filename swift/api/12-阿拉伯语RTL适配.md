# 阿拉伯语RTL适配
我们正常文字是从左到右，阿拉伯国家文字是从右到左，左右的相互调换，使用系统提供的方法（RTL仅支持iOS9以上）。

## 1.针对全部的UIView 使用镜像功能
```swift
   UISwitch.appearance().semanticContentAttribute = .forceRightToLeft
   UIView.appearance().semanticContentAttribute = .forceRightToLeft
   UISearchBar.appearance().semanticContentAttribute = .forceRightToLeft
   UINavigationBar.appearance().semanticContentAttribute = .forceRightToLeft
   UIScrollView.appearance().semanticContentAttribute = .forceRightToLeft
   UITabBar.appearance().semanticContentAttribute = .forceRightToLeft
```

## 2.针对具体部分View使用
```objc
self.view.semanticContentAttribute = UISemanticContentAttributeForceRightToLeft;
```

## 3.针对xib、storyboard、snpkit/masonry
```markdown
* 如果是xib将`Semantic` 设置为`spatial`
* 如果是 snpkit/masonry 需要将`left/right`替换成`leading/trailing`。 
   使用 left right 或者 frame的情况下都是指定了具体的方向和坐标位置，系统不会进行调整。使用Leading和Trailing系统会自动调整。
```
## 4. 判断当前方向
```objc
[UIApplication sharedApplication].userInterfaceLayoutDirection
[UIView userInterfaceLayoutDirectionForSemanticContentAttribute:view.semanticContentAttribute]
view.effectiveUserInterfaceLayoutDirection
```

## 特殊控件
1. collectionView 解决方案：修改CollectionViewFlowLayout

`flipsHorizontallyInOppositeLayoutDirection`是指开启 一个布尔值，指示水平坐标系是否在适当的时间自动翻转。 这个属性是默认关闭的 如果发生无法反转的话,我们需要这样打开。

`flipsHorizontallyInOppositeLayoutDirection`是readonly的，我们需要自定义layout，并重写getter方法。

2. tableView
header 和 cell 不会改变 textAlignment

## 文字
1. UIEdgeInsets
然而系统却不会自动帮我们将left和right调换。我们需要手动去适配它。
```markdown
   * 在需要的地方判断以下。
   * hook
```

2. TextAlignment（包括AttributeString的textAlignment）
```markdown
​ 方法一 `[[(NSMutableParagraphStyle *)paraStyle setAlignment:NSNaturalTextAlignment];`
​ 方法二：hook
```

3. 双向文字
拉丁语和数字是始终LTR的，开发者需要自己适配。

情景一：固定文字，如Label。（demo）

​我们的解决方式跟苹果推荐的一致，多语言拼接其他LTR字符。

​情景二：文字输入，如TextField

WWDC 2013 Making Your App World-Ready: International Text > Bidirectional Text

```objc
setBaseWritingDirection:forRange:
UITextWritingDirectionNatural
```
苹果不建议修改。

## 交互
1. 滑动返回：
```markdown
   navigation需要单独设置，解决方案是hook了UINavigationController的`initWithNibName:bundle:`，单独设置UINavigationController的view的`semanticContentAttribute`
```
2. UISwipeGestureRecognizer：
hook 了 `UISwipeGestureRecognizer的setDirection:`

## 图片
系统不会为我们自动做处理，大部分图片也不需要处理，只需要手动旋转一下类似箭头的图片即可。

````markdown
* 方法一：系统提供了`- (UIImage *)imageFlippedForRightToLeftLayoutDirection NS_AVAILABLE_IOS(9_0)`; 只有系统语言切换有用，应用内切换不生效，所以自己单独写方法
* 方法二：修改 `xcassets` 中对应图片资源的 `direction`
* 方法三：使用`Localize Resources`
* 方法四：
```objc
- (NSImage *)flipImage:(NSImage *)image{
   NSImage *existingImage = image;
   NSSize existingSize = [existingImage size];
   NSSize newSize = NSMakeSize(existingSize.width, existingSize.height);
   NSImage *flippedImage = [[[NSImage alloc] initWithSize:newSize] autorelease];
 
   [flippedImage lockFocus];
   [[NSGraphicsContext currentContext] setImageInterpolation:NSImageInterpolationHigh];
 
   NSAffineTransform *transform = [NSAffineTransform transform];
   [transform translateXBy:existingSize.width yBy:0];
   [transform scaleXBy:-1 yBy:1];
   [transform concat];
 
   [existingImage drawAtPoint:NSZeroPoint fromRect:NSMakeRect(0, 0, newSize.width, newSize.height) operation:NSCompositeSourceOver fraction:1.0];
 
   [flippedImage unlockFocus];
   return flippedImage;
}
```
````

## 哪些功能不需要适配RTL？
Types of controls and content that should not flip in a right-to-left language are:

Video controls and timeline indicators

Images, unless they communicate a sense of direction, such as arrows

Clocks

Music notes and sheet music（乐谱）

Graphs (x– and y–axes always appear in the same orientation)

## toolbars RTL不生效，怎么办？
```objc
if ([NSApp userInterfaceLayoutDirection] == NSUserInterfaceLayoutDirectionRightToLeft) {
   NSArray *toolbarItems = [[self.toolbar items] copy];
   for (NSToolbarItem *item in toolbarItems) {
       [self.toolbar removeItemAtIndex:toolbarItems.count-1];
       [self.toolbar insertItemWithItemIdentifier:item.itemIdentifier atIndex:0];
   }
}
```

## 要点总结
1. 尽量都使用约束来做UI，且不要用left和right，改用leading和trailing。
2. 文字对齐如果是左右对齐的话，都使用NSNaturalTextAlignment。
3. 多语言遇到拼接字符串的话，要谨慎。其他LTR语言中，如果是拼接字符串，第一个字符是RTL语言，会出现显示问题，应该使用localizedStringWithFormat（使用后，底层会去判断去除该字符之后的字符串的第一个字符）。
4. 如果遇到需要适配排列方向的collectionView，提前自定义layout。
5. 需要镜像的图片使用恰当的方法实现。


## 参考文档
* [iOS 阿拉伯语 RTL适配](https://blog.csdn.net/a657651096/article/details/102805114)
* [RLT官方文档](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/SupportingRight-To-LeftLanguages/SupportingRight-To-LeftLanguages.html)
* [WWDC2015](https://developer.apple.com/videos/play/wwdc2015/222/)
* [WWDC2016](https://developer.apple.com/videos/play/wwdc2016/232/)