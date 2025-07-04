# 枚举
Flutter中常用的枚举，统计到一起，需要的时候直接搜索本文件。

BoxFit，填充相关的枚举：
```dart
enum BoxFit {
  fill, /// 通过扭曲源的纵横比来填充目标框。网络图片 https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg
  contain,  /// 尽可能大，同时仍然包含完全在目标框
  cover,  /// 尽可能小，同时仍然覆盖整个目标框。如果图片过大会超过父部件,要实际剪辑内容，如果是在FittedBox中使用`clipBehavior: Clip.hardEdge`对超出内容进行裁剪
  fitWidth, /// 确保显示源的全宽，高度等比缩放
  fitHeight,    /// 确保显示源的全高，等宽缩放
  none, /// 在目标框内对齐源（默认为居中）,显示源文件大小
  scaleDown,    /// 在目标框内对齐源（默认情况下，居中），如果必要，缩小源以确保内容适合
}
```


Clip 裁剪小部件内容相关的枚举:
```dart
enum Clip {
  none, /// 没有裁剪
  hardEdge, /// 这是最快的剪辑，但保真度较低
  antiAlias,    /// 比[hardEdge]慢一点，但边缘平滑
  antiAliasWithSaveLayer,   /// 很慢，基本不用，分配有离屏缓冲
}
```

Stack 内部约束的枚举
```dart
enum StackFit {
  loose, /// 从其父级传递到堆栈的约束被放松。
  expand, /// 从其父级传递到堆栈的约束被收紧到
  passthrough,  /// 从其父级传递到堆栈的约束未经修改地传递到下面的子级
}
```

TextField 限制字符的字数超出时的限制
```dart
enum MaxLengthEnforcement {
  none, /// 默认不管，输入字数可能会超过
  enforced, /// 保持不超过最大字数
  truncateAfterCompositionEnds, // 用户可以继续输入，但是不会显示
}
```