# Runloop
知道了什么是Runloop、Runloop的内部结构和Mode的切换。现在我们来学习Runloop的调用流程以及从源码上分析Runloop的调用流程，最后讲Runloop在程序内的应用。

## Runloop的调用流程
01. 通知Observers：进入Loop
02. 通知Observers：即将处理Timers
03. 通知Observers：即将处理Sources
04. 处理Blocks
05. 处理Source0（可能会再次处理Blocks）
06. 如果存在Source1，就跳转到第8步
07. 通知Observers：开始休眠（等待消息唤醒）
08. 通知Observers：结束休眠（被某个消息唤醒）
    1. 处理Timer
    2. 处理GCD Async To Main Queue
    3. 处理Source1
09. 处理Blocks
10. 根据前面的执行结果，决定如何操作
    01.  回到第02步
    02.  退出Loop
11. 通知Observers：退出Loop

使用图片展示Runloop的调用流程，图片来源于小码哥的MJ老师，点击进入[小码哥官网](http://www.520it.com/)
![](./../imgs/ios_img_42.jpg)

## 通过源码分析Runloop
该怎么找Runloop的入口呢？在上一章中，我们通过打印堆栈信息查看是否是 Source0 处理点击事件，在堆栈事件中，有一个`__CFRunLoopRun`函数，在Runloop运行之前调用的是`CFRunLoopRunSpecific`函数，可以确定`CFRunLoopRunSpecific`函数是Runloop的入口。

我们通过源码分析Runloop的具体实现，代码片段来自`CF-1153.18`，代码经过删减，只显示主逻辑：
```c
SInt32 CFRunLoopRunSpecific(CFRunLoopRef rl, CFStringRef modeName, CFTimeInterval seconds, Boolean returnAfterSourceHandled) {   
    // 通知Observers: 进入Runloop
    __CFRunLoopDoObservers(rl, currentMode, kCFRunLoopEntry);
    
    // Runloop中具体要做的事情
    __CFRunLoopRun(rl, currentMode, seconds, returnAfterSourceHandled, previousMode);
	
    // 通知Observers: 退出Runloop
    __CFRunLoopDoObservers(rl, currentMode, kCFRunLoopExit);

    return result;
}
```
通过源码我们知道`__CFRunLoopRun()`函数中是Runloop的具体实现，分析一下`__CFRunLoopRun()`函数:
```c
static int32_t __CFRunLoopRun(CFRunLoopRef rl, CFRunLoopModeRef rlm, CFTimeInterval seconds, Boolean stopAfterHandle, CFRunLoopModeRef previousMode) {

    int32_t retVal = 0;
    do {
        // 通知Observers: 即将处理Timers
        __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeTimers);
        
        // 通知Observers: 即将处理Sources
        __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeSources);

        // 处理Blocks
        __CFRunLoopDoBlocks(rl, rlm);

        // 处理Sources0
        if (__CFRunLoopDoSources0(rl, rlm, stopAfterHandle)) {
            // 处理Blocks
            __CFRunLoopDoBlocks(rl, rlm);
        }

        //判断有没有Source1，如果有，跳转到 handle_msg
        if (__CFRunLoopServiceMachPort(dispatchPort, &msg, sizeof(msg_buffer), &livePort, 0, &voucherState, NULL)) {
            goto handle_msg;
        }

        //通知Observers: 即将休眠
        __CFRunLoopDoObservers(rl, rlm, kCFRunLoopBeforeWaiting);
        __CFRunLoopSetSleeping(rl);

        // 等待别的消息唤醒当前线程
        __CFRunLoopServiceMachPort(waitSet, &msg, sizeof(msg_buffer), &livePort, poll ? 0 : TIMEOUT_INFINITY, &voucherState, &voucherCopy);

        // user callouts now OK again
        __CFRunLoopUnsetSleeping(rl);
        //通知Observers: 结束休眠
        __CFRunLoopDoObservers(rl, rlm, kCFRunLoopAfterWaiting);

    handle_msg:;
        if (被Timers唤醒) {
            // 处理Timers
            __CFRunLoopDoTimers(rl, rlm, mach_absolute_time());
        }else if (被 GCD 唤醒) {
            // 处理GCD
            __CFRUNLOOP_IS_SERVICING_THE_MAIN_DISPATCH_QUEUE__(msg);
        } else { // 被Sources1唤醒
            // 处理Sources1
            __CFRunLoopDoSource1(rl, rlm, rls, msg, msg->msgh_size, &reply) || sourceHandledThisLoop;
        }
        
        // 处理Blocks
        __CFRunLoopDoBlocks(rl, rlm);
        
        // 设置返回值
        if (sourceHandledThisLoop && stopAfterHandle) {
            retVal = kCFRunLoopRunHandledSource;
            } else if (timeout_context->termTSR < mach_absolute_time()) {
                retVal = kCFRunLoopRunTimedOut;
        } else if (__CFRunLoopIsStopped(rl)) {
                __CFRunLoopUnsetStopped(rl);
            retVal = kCFRunLoopRunStopped;
        } else if (rlm->_stopped) {
            rlm->_stopped = false;
            retVal = kCFRunLoopRunStopped;
        } else if (__CFRunLoopModeIsEmpty(rl, rlm, previousMode)) {
            retVal = kCFRunLoopRunFinished;
        }

    } while (0 == retVal);

    return retVal;
}
```
通过源码我们看到，Runloop的本质就是在循环中不停的处理`Source`、`Timers`和`Blocks`,当没有事情处理时，进入休眠状态。有事情处理时会唤醒当前Runloop对象继续处理事件。

## Runloop在程序中的应用

