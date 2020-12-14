# KVO的本质
KVO的全称是`Key-Value Observing`，俗称“键值监听”，可以用于监听某个对象属性值的改变

## KVO的基础使用
创建两个Preson类对象，对其中一个age属性进行监听，另外一个进行监听，发现同样是更改他们属性的值，只有p1的age值被监听了，而p2的age没有被监听。当age的值被改变的时候同样都是调用的setAge:方法。唯一的原因就是他们的实例对象被动了手脚，我们直接打印它的isa，发现p1的isa指向的是NSKVONotifying_Person类对象

NSKVONotifying_Person是Runtime动态创建的一个类,是Person的子类，NSKVONotifying_Person的superclass指向 Person


