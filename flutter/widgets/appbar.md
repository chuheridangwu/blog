# AppBar
AppBar是顶部导航栏的显示控件，相关的参数有:
```markdown
* `Widget? leading`: 左侧的按钮，一般是返回按钮
* `bool? automaticallyImplyLeading`: 是否自动推导左侧按钮
* `Widget? title`: 导航栏标题
* `List<Widget>? actions`: 导航栏右侧按钮，一个数组，可能存在多个
* `Widget? flexibleSpace`: 滚动时改变导航栏高度，通常用于`FlexibleSpaceBar`
* `PreferredSizeWidget? bottom`: 导航栏底部按钮，一般配合`TabBar`使用
* `double? elevation`: 导航栏底部阴影高度
* `Color? shadowColor`: 导航栏底部阴影颜色
* `ShapeBorder? shape`: 导航栏底部阴影形状
* `Color? backgroundColor`: 导航栏背景颜色
* `Color? foregroundColor`: 导航栏内容颜色，文字，图标
* `bool? centerTitle`: 文字是否居中
* `bool excludeHeaderSemantics`: 标题是否被包裹
* `double bottomOpacity`: 应用栏底部的不透明状态
* `double? toolbarHeight`: 导航栏的高度，默认是56
* `double? leadingWidth`: 导航栏左侧按钮的宽度
```