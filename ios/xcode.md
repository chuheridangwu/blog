# Xcode
Xcode是iOS开发必备的开发工具，在项目中，经常会遇到各种配置和路径问题，在这里做一下讲解。

## 配置
xcode常见的一些配置，平时经常遇到找不到库、找不到头文件，可能都是这些配置导致的

* ${SRCROOT}：代表的是项目根目录下
* ${PROJECT_DIR}：代表的是整个项目
* ${PROJECT_FILE_PATH}表示project的当前路径，相当于$(PROJECT_DIR)/$(PROJECT_NAME).xcodeproj
* $(PROJECT_NAME) ： 项目名字
* ${PODS_ROOT}  : 项目使用cocoapods，pod文件目录
* $(inherited)：添加目录的时候写上 “$(inherited)” 就是表示路径自己从frameworks里面读取。 默认的情况下路径配置是不被 Targets 继承的，只有当Targets的设置加入了$(inherited)时才被继承，继承来自更高一级的配置。


## 路径
Framework Search Paths
附加到项目中的framework 的搜索路径。

Library Search Paths
附加到项目中的第三方Library的搜索路径。

Header Search Path
头文件的搜索路径。

User Header Search Paths
只有在Always Search User Paths为Yes时才会被搜索。
