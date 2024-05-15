# electron中使用Puppeteer

Puppeteer 提供了两个版本，[Puppeteer](https://www.npmjs.com/package/puppeteer) 和 [Puppeteer-core](https://www.npmjs.com/package/puppeteer-core)


##  Puppeteer 和 Puppeteer-core 的区别：

1. **Chromium 的下载**：
   - `puppeteer`：在安装过程中会自动下载一个特定版本的 Chromium，确保与 Puppeteer 的 API 兼容。
   - `puppeteer-core`：不会在安装时自动下载 Chromium，需要用户自己提供浏览器的可执行路径或连接到远程浏览器。

2. **环境变量**：
   - `puppeteer`：支持多个以 `PUPPETEER_` 开头的环境变量，允许用户调整 Puppeteer 的行为，如自定义 Chromium 下载路径等。
   - `puppeteer-core`：忽略所有以 `PUPPETEER_` 开头的环境变量，因为它不自动下载 Chromium，也不依赖这些变量来指定下载或缓存行为。

3. **使用场景**：
   - `puppeteer`：适合大多数最终用户，作为一个产品，它自动化了多个工作流程，并使用合理的默认值。
   - `puppeteer-core`：适合开发者构建基于 DevTools 协议的其他产品或库，或者当用户需要连接到远程浏览器或自己管理浏览器时使用。

4. **编程接口**：
   - `puppeteer`：提供了一个高级 API 来控制浏览器，简化了用户的使用过程。
   - `puppeteer-core`：作为一个库，完全通过其编程接口驱动，没有默认值，提供了更多的灵活性和控制。

5. **自定义安装**：
   - `puppeteer`：通常不需要用户指定浏览器的可执行路径，除非有特殊的定制需求。
   - `puppeteer-core`：需要用户在使用时显式指定 `executablePath`，指向已安装的浏览器，或者使用 `puppeteer.connect([options])` 连接到远程浏览器实例。

####  puppeteer遇到的问题
使用`puppeteer`给用户安装时会遇到找不到 Chromium 的问题，这是因为国内网络无法下载 Chromium，通过切换源的方式进行解决

在项目根目录中创建.npmrc文件，在文件中配置：
```
# puppeteer19以下版本
PUPPETEER_DOWNLOAD_HOST = https://cdn.npmmirror.com/binaries

# puppeteer20以上的版本
PUPPETEER_DOWNLOAD_BASE_URL = https://cdn.npmmirror.com/binaries/chrome-for-testing
```
然后删除node_modules重新下载即可

`console.log(puppeteer.executablePath())`:打印默认的Chromuim的位置


#### puppeteer-core 遇到的问题
`puppeteer-core`：需要用户在使用时显式指定 `executablePath`。
```javascript
 let browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    defaultViewport:{
      width: 2500,  // 浏览器窗口的宽度
      height: 1600, // 浏览器窗口的高度
    },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // 设置无头模式下的视口大小
      '--window-size=2500,1600',
    ],
  });
```

如果是Mac电脑，安装路径通常是`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

如果是Window用户，由于Window系统不同(也分32位和64位),用户也可以选择自定义的安装路径，就很容易出错。先使用[chrome-paths](https://www.npmjs.com/package/chrome-paths)库返回路径，再通过fs模块判断Chrome文件是否存在，如果存在则返回路径，否则返回false。让用户手动输入Chrome的安装路径。

```javascript
import fs from 'fs'

const isExist = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
```

获取谷歌浏览器安装地址方式，在浏览器输入：`chrome://version/` ,可执行文件路径就是Chrome的安装路径

>如果遇到puppeteer-core在launch方法卡住问题，检测使用的Chrome版本，是否与puppeteer-core要求的版本一致，如果一致，则正常，否则需要更新谷歌浏览器

## .npmrc 文件 是什么
`.npmrc` 文件是 Node Package Manager（npm）的配置文件，用于自定义 npm 的行为。它可以放在项目的根目录下，也可以放在用户的主目录下，或者放在 npm 的安装目录下。`.npmrc` 文件可以包含多种配置选项，这些选项可以覆盖 npm 默认的设置。

以下是 `.npmrc` 文件的一些常见用途：

1. **配置默认的 npm 仓库**：如果你使用私有的 npm 仓库或者想要使用特定的公共仓库，可以通过 `.npmrc` 文件来指定。

   ```txt
   registry=https://registry.npmjs.org/
   ```

2. **设置访问 npm 仓库的认证信息**：对于私有仓库，你可能需要提供认证信息。

   ```txt
   //registry.npmjs.org/:_authToken=secret_token
   ```

3. **配置缓存目录**：改变 npm 缓存的默认位置。

   ```txt
   cache=/path/to/npm-cache
   ```

4. **配置全局安装的包的存放位置**：指定全局模块安装的目录。

   ```txt
    prefix=/usr/local/
   ```

5. **配置默认的包版本**：当你安装一个包而没有指定版本时，npm 会默认安装最新版。通过 `.npmrc` 文件，你可以设置默认的版本。

   ```txt
   save-exact=true
   ```

6. **配置日志级别**：改变 npm 的日志输出级别。

   ```txt
   loglevel=verbose
   ```

7. **配置用户信息**：自动填写 `npm publish` 或 `npm adduser` 时的信息。

   ```txt
   email=your_email@example.com
   init-author-name="Your Name"
   init-author-url="https://yourwebsite.com"
   ```

8. **使用不同的 package.json 文件**：如果你希望使用一个非标准位置的 `package.json` 文件。

   ```txt
   package-lock=false
   ```

9. **配置二进制文件的保存路径**：指定二进制文件存放的目录。

   ```txt
   bin-links=true
   ```

10. **代理设置**：如果你处于一个需要通过代理服务器访问外部网络的环境中，可以在 `.npmrc` 文件中设置代理。

    ```txt
     proxy=http://proxy.example.com:8080
     https-proxy=http://proxy.example.com:8080
    ```

`.npmrc` 文件非常灵活，可以根据项目或个人的需求进行各种配置。在团队协作或者持续集成（CI）的环境中，正确配置 `.npmrc` 文件可以简化开发流程和自动化脚本。

## 参考文档
* [解决puppeteer下载失败 Failed to download Chromium r51541](https://blog.csdn.net/weixin_56307657/article/details/134963129)
* [electron-build+vue+puppeteer 开发环境Chromium无法启动的问题](https://blog.csdn.net/wol555c/article/details/130962227)
* [puppeteer对应的Chrome版本](https://pptr.dev/supported-browsers)