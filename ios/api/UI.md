# UI控件

## UILabel的文字渐变
自定义一个UILabel，重写`drawRect`方法,在当前方法中使用渐变
```objc
- (void)drawRect:(CGRect)rect{
    [super drawRect:rect];
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    // 获取文字mask
    [self.text drawInRect:self.bounds withAttributes:@{NSFontAttributeName : self.font}];
    CGImageRef textMask = CGBitmapContextCreateImage(context);

    // 清空画布
    CGContextClearRect(context, rect);

    // 设置蒙层
    CGContextTranslateCTM(context, 0.0, self.bounds.size.height);
    CGContextScaleCTM(context, 1.0, -1.0);
    CGContextClipToMask(context, rect, textMask);

    // 绘制渐变
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    // 渐变的距离 0 - 1
    CGFloat locations[] = {0, 1};
    // 颜色矩阵
    CGFloat colors[] = {1.0,0.0,0.0,1.0,
                        0.0,1.0,0.0,1.0};
    CGGradientRef gradient = CGGradientCreateWithColorComponents(colorSpace, colors, locations, 2);
    CGPoint start = CGPointMake(0, 0);
    CGPoint end = CGPointMake(0, self.bounds.size.height);
    CGContextDrawLinearGradient(context, gradient, start, end, kCGGradientDrawsBeforeStartLocation);

    // 释放
    CGColorSpaceRelease(colorSpace);
    CGGradientRelease(gradient);
    CGImageRelease(textMask);
}
```