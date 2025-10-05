# 服务器
搞了一台Linux服务器，系统使用的是CentOS 9。在 CentOS 7 中默认的包管理器是yum,在CentOS 8/9	dnf	完全替代 yum（但仍可通过 yum 命令调用 dnf）。刚开第一天一直被人扫描。针对Linux服务器ssh登录的一些安全配置。包括用户管理、SSH安全、防火墙、文件权限、日志审计等。以下是详细的安全配置指南，涵盖关键配置文件和具体优化方法。拥有一台服务器，首先要做的几件事情顺序:

>首先需要限制防火墙只允许特定IP访问，防止IP被扫描。

1. 修改ssh默认端口和配置防火墙访问端口,防火墙配置固定IP访问ssh端口(能避开很大部分的扫描)
2. 本地生成密钥对,上传公钥到服务器,修改ssh配置文件不允许密码登录,只允许秘钥登录，每次修改ssh配置之后需要运行`sudo systemctl restart sshd`重启服务后才能生效
   1. 本地创建密钥对`ssh-keygen -t ed25519 -C "your_email@example.com"`,生成后的密钥对会存储在`~/.ssh/id_ed25519.pub`和`~/.ssh/id_ed25519`
   2. `ssh-copy-id -i ~/.ssh/id_ed25519.pub  -p 22  username@your-server-ip` 上传公钥到服务器
   3. 修改`/etc/ssh/sshd_config`配置文件后,`sudo systemctl restart sshd` 重启ssh服务
3. 安装fail2ban防止暴力破解，修改配置文件`/etc/fail2ban/jail.local`,需要重启Fail2Ban服务。
4. 安装iptables防火墙，添加规则，并启动服务。(这个东西不会用，使用之后老是导致其他服务无法下载)
5. 安装nginx，修改配置文件`/etc/nginx/nginx.conf`，并重启Nginx服务 `sudo systemctl restart nginx`。

> Linux常用命令

| **命令** | **功能** |
|------|------|
| `sudo dnf install fail2ban -y` | 安装fail2ban |
| `sudo dnf install screen -y` | 安装screen |
| `sudo dnf install nodejs -y` | 安装nodejs |
| `npm install pm2 -g` | 安装pm2 |
| `sudo dnf install nginx` | 安装nginx |
| `mv <原文件名> <新文件名称>` | 修改文件名 |
| `rm -f <文件路径>` | 删除文件 |
| `cat <文件路径> \| grep  "搜索内容"` | 查看文件搜索内容 |
| `last` | 查看最近登录记录 |
| `lastb` | 查看最近失败登录记录 |
| `cat /var/log/secure \| grep "Invalid user"` | 查看是否存在大量的Invalid user 字眼，如果存在说明有暴力破解的风险 |


## 一、 ssh

| **命令** | **功能** |
|------|------|
| `ssh -p 22 username@server-ip` | ssh登录，例如 `ssh -p 22 root@101.36.118.32` |
| `ssh-keygen -R "101.36.118.32"` 删除指定端口`ssh-keygen -R "[101.36.118.32]:2222" ` | 如果之前连接过服务器，服务器进行了重装或者其他，需要从 `~/.ssh/known_hosts` 中删除旧密钥，下次连接时会自动接受新密钥 |
| `ssh-copy-id -i ~/.ssh/id_ed25519.pub  -p 22  username@your-server-ip ` | 上传公钥到服务器，用于密钥登录 |
| `sudo systemctl restart sshd` | 重启 sshd 服务 |
| `sudo sshd -t` | 检查ssh配置文件是否有错误 |
| `scp -P <端口> <用户名>@<服务器IP>:<远程文件路径> <本地目标路径>` | 从服务器复制文件到本地**P必须大写** |
| `scp  -r -P 22 /Users/Desktop/dist root@10.37.18.32:/var/www/app` | 从本地复制文件到服务器**P必须大写** |
| `sssh -v -p 2222 root@101.36.118.32` | 检查登录失败原因 |


### 1.1 秘钥登录

1. 在客户端生成密钥对
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"  # 推荐 Ed25519
# 或
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  # RSA 4096-bit
```
生成的密钥会存放在：
* 公钥 (Public Key): `~/.ssh/id_ed25519.pub`
* 私钥 (Private Key):`~/.ssh/id_ed25519`
2. 上传公钥到服务器
```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub  -p 2222  root@101.36.118.32 
# 如果没有 ssh-copy-id，可以手动上传：
cat ~/.ssh/id_ed25519.pub | ssh username@your-server-ip "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
3. 修改 SSH 配置文件 `/etc/ssh/sshd_config`内容只允许秘钥登录
```bash
Port 2222                     # 修改默认 SSH 端口（22 → 2222）
PasswordAuthentication no     # 禁止密码登录
PermitEmptyPasswords no       # 禁止空密码
PubkeyAuthentication yes       #启用公钥认证
PermitRootLogin prohibit-password  #允许密钥登录 root，同时杜绝密码爆破风险
X11Forwarding no              # 禁用 X11 转发（防入侵）
MaxAuthTries 3                # 最多允许 3 次身份验证失败
ClientAliveInterval 300       # 5分钟无活动自动断开
ClientAliveCountMax 2         # 允许 2 次超时
AllowUsers your_username      # 仅允许指定用户 SSH 登录
```
>配置好之后需要重启`sudo systemctl restart sshd`,防止重启之后登录不了。

### 1.2 保持长连接
为了避免在 SSH 会话中因为网络中断或超时而断开连接，我们可以配置 SSH 客户端保持长连接。
1. 编辑 `~/.ssh/config` 文件（如果不存在则创建）
```bash
Host *
    ServerAliveInterval 60  # 每 60 秒发送一次心跳包
    ServerAliveCountMax 30  # 允许 30 次心跳包失败后断开连接
    TCPKeepAlive yes          # 启用 TCP 保活

```
2. 重启 SSH 客户端
```bash
ssh -p 2222 root@101.36.118.32
```

### 1.3 本机使用快速登录
需要在本机的 `~/.ssh/config` 中添加以下配置
```bash
Host server-b
    HostName B的IP
    Port 2222
    User yourname
    IdentityFile ~/.ssh/id_ed25519  # ~代表用户目录
    IdentitiesOnly yes           # 强制只用指定密钥
    UserKnownHostsFile ~/.ssh/known_hosts
```
修改完成后运行 `ssh server-b` 即可代替之前的 `ssh -p 2222 username@server-ip` 连接。


## 二、安装Fail2Ban
如果 仅开放 SSH + 严格使用密钥登录 + 修改默认端口，理论上可以忽略 Fail2Ban,如果有web服务，还是建议开启Fail2Ban。
```bash
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm #安装 EPEL 仓库
sudo dnf repolist | grep epel  # 验证 EPEL 是否安装成功

sudo dnf install fail2ban #安装
sudo systemctl enable --now fail2ban #启动并设置为开机自启动
```

在启用fail2ban之前或之后，你可能需要配置它以适应你的特定需求。fail2ban的配置文件通常位于`/etc/fail2ban/jail.conf`。需要创建`/etc/fail2ban/jail.local`文件并进行编辑进行自定义规则和设置。例如:
```bash
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 1h
findtime = 600
```

保存后重启 Fail2Ban：
```bash
sudo fail2ban-server -t && sudo systemctl restart fail2ban #重启服务
```


### 2.1 Fail2Ban启动的命令

| **命令** | **功能** |
|------|------|
| `sudo systemctl start fail2ban` | 开启 fail2ban 服务 |
| `sudo systemctl enable --now fail2ban` | **立即启动** 并设置为开机自启 |
| `sudo systemctl enable fail2ban` | 开机自启动 |
| `sudo systemctl stop fail2ban` | 停止 fail2ban 服务 |
| `sudo systemctl restart fail2ban` | 重启 fail2ban（修改配置后常用） |
| `sudo systemctl disable fail2ban` | 禁用 开机自启动 |
| `sudo systemctl status fail2ban` | 查看服务状态（是否运行、有无错误） |

### 2.2 Fail2Ban其他的一些命令
| **命令** | **功能** |
|----------|---------|
| `sudo fail2ban-client banned` | 查看所有监狱封禁的 IP |
| `sudo fail2ban-client status` | 查看fail2ban的状态 |
| `sudo fail2ban-client status sshd` | 查看 `sshd` 监狱被封 IP |
| `sudo grep -E "Ban\|Unban" /var/log/fail2ban.log` | 手动查看封禁记录 |
| `sudo fail2ban-client set sshd unbanip 1.2.3.4` | 手动解封 IP |
| `sudo fail2ban-server -t` | 测试 fail2ban 配置文件是否有错误 |

### 2.3 查看 Fail2Ban 规则的 SSH 端口
安装fail2ban 后，可能会导致 iptables 策略被覆盖，导致无法访问。解决方法：
1. 检查 fail2ban 配置文件 `/etc/fail2ban/jail.local` 是否有 `ignoreip` 配置项，将服务器 IP 添加到忽略列表中。
2. 检查 iptables 规则是否有冲突，例如是否有规则直接拒绝所有流量。
3. 重启 fail2ban 服务 `sudo systemctl restart fail2ban`。
>如果要修改ssh端口，注意fail2ban的配置文件，需要修改`port`为新的端口。并且不要跟以前的端口冲突。
```bash
sudo grep -r "port" /etc/fail2ban/jail.d/  # 查看自定义规则
sudo grep "port" /etc/fail2ban/jail.local  # 用户自定义配置（如果有）
sudo grep "port" /etc/fail2ban/jail.conf   # 主配置文件
```

## 三、iptables
iptables 是 Linux 系统上最经典的防火墙工具，用于管理内核级网络包过滤规则。它可以控制进出系统的网络流量，实现访问控制、端口转发、NAT（网络地址转换）、防DDoS攻击等功能。iptables的一些命令

| **命令** | **作用** |
|----------|---------|
| `sudo yum install iptables-services` | **安装 iptables 服务** |
| `sudo systemctl start iptables` | 启动 iptables 服务 |
| `sudo systemctl enable iptables` | 开机自启动 |
| `sudo systemctl stop iptables` | 停止 iptables 服务 |
| `sudo iptables -F` | 清空所有规则 |
| `sudo service iptables save` (CentOS) | 重启之后依然能保存规则  |
| `sudo iptables -L -n`         | 列出所有规则                |
| `sudo iptables -S`            | 查看规则（简洁版）          |
| `sudo iptables -L -n -v`      | 显示流量匹配次数            |
| `sudo dmesg \| grep DROP`     | 检查内核丢弃的包            |
| `sudo iptables -L -n \| grep f2b`     | 检查 Fail2Ban 和 iptables 是否冲突  |
| `sudo iptables -L INPUT -n -v \| grep -E "DROP\|REJECT"`   | 查看封禁 IP |
| `sudo iptables -A INPUT -s 104.214.168.224 -j DROP`   | 指定IP封禁 |

>开启iptables设置规则之后，一定要保存，否则重启之后规则会丢失。导致某些端口无法访问，比如修改了默认的22端口，没有保存之后,重启就无法登录了。

### 3.1 允许/拒绝特定端口
```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT # 允许 SSH（22端口）访问
sudo iptables -A INPUT -p tcp --dport 80 -j DROP # 拒绝 HTTP（80端口）访问
```
* -A INPUT：在 INPUT 链末尾添加规则。-I 在链开头添加规则
* -p tcp：协议（TCP/UDP/ICMP）
* --dport 22：目标端口
* -j ACCEPT/DROP：动作（允许/拒绝）

### 3.2 配置规则
如果服务器已明确开放部分端口（如80、443、22），可以优化规则，不监控这些端口，减少误判：
```bash
# 先放行已知安全端口
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT   # SSH
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # HTTP
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # HTTPS

# 仅对 非开放端口 启用扫描防护
sudo iptables -I INPUT -p tcp --dport 1:21 -j DROP                   # 封禁低端口
sudo iptables -I INPUT -p tcp --dport 23:79 -j DROP                  # 封禁Telnet等
sudo iptables -I INPUT -p tcp --dport 81:442 -j DROP                 # 封禁其他HTTP备用端口
sudo iptables -I INPUT -p tcp --dport 444:65535 -m recent --name portscan --set  # 监控剩余端口
sudo iptables -I INPUT -p tcp --dport 444:65535 -m recent --name portscan --update --seconds 60 --hitcount 3 -j DROP
```

> 设置规则后一定要记得保存，否则重启之后规则会丢失。

### 3.3 删除规则
| **命令** | **作用** |
|----------|---------|
| `sudo iptables -L INPUT --line-numbers` |  查看规则（带行号）|
| `sudo iptables -D INPUT 行号`    |  删除指定行号规则  |
| `sudo iptables -D INPUT -s IP -j DROP`  | 按条件删除规则 |

## 四、 Nginx
Nginx 是一个高性能的 HTTP 和反向代理服务器，用于优化静态和动态网站。Nginx 的主要功能有：
* 反向代理：将客户端请求转发到后端服务器，如 Web 应用、数据库等。
* 负载均衡：将流量分发到多个后端服务器，实现高可用性和性能优化。
* 缓存：缓存静态内容，减少后端服务器的负载，提高响应速度。
* 安全：提供 SSL/TLS 加密、IP 过滤、HTTP 头安全等功能，保护网站和用户数据的安全。
  
| **命令** | **作用** |
|----------|---------|
| `sudo dnf install nginx` | 安装 nginx |
| `sudo systemctl start nginx` | 启动 nginx 服务 |
| `sudo systemctl stop nginx` | 停止 nginx 服务 |
| `sudo systemctl restart nginx` | 重启 nginx 服务 |
| `sudo systemctl enable nginx` | 开机自启动 |
| `sudo systemctl disable nginx` | 取消开机自启动 |
| `sudo systemctl status nginx` | 查看 nginx 服务状态 |
| `sudo systemctl reload nginx` | 平滑重载配置（不中断连接） |
| `sudo journalctl -u nginx` | 查看完整日志（排错必备） |
| `sudo nginx -t` | 测试 nginx 配置文件是否正确 |
| `sudo chown -R nginx:nginx /var/www/dist` | 给予文件夹权限 |
| `sudo nginx -s reload` | 重新加载 Nginx 配置 |
| `sudo tail -f /var/log/nginx/error.log` | 查看错误日志 |
| `sudo cat /var/www/www/index.html` | 测试文件是否存在 |


### 4.1 配置 Nginx
修改`/etc/nginx/nginx.conf`文件，vue打包的项目不能放到根目录中，nginx没有权限读取根目录文件。
使用`sudo chown -R nginx:nginx /var/www/dist`给予文件夹权限。
```bash
http {
    server_tokens off;  #禁用服务器版本号显示
    ...
}

server {
    listen       80;
    listen       [::]:80;
    server_name  _;
    root         /var/www/dist; #vue 打包的目录

    # ✅ 默认行为：优先查找真实文件，否则返回 404
    location / {
        try_files $uri $uri/ =404;
    }
    
    location / {
        autoindex off;  # 禁止目录列表
    } 

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    error_page 404 /404.html;
        location = /404.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

打包好的vue项目，将编辑后的文件传到服务端
```shell
scp  -r -P 2222 /Users/sky/Desktop/dist root@101.36.118.32:/var/www/app
```

| **用途**               | **路径（Linux APT/YUM）**       | **路径（源码安装）**        |
|-----------------------|-------------------------------|---------------------------|
| 主配置文件             | `/etc/nginx/nginx.conf`        | `/usr/local/nginx/conf/nginx.conf` |
| 站点配置目录            | `/etc/nginx/sites-available/`  | `/usr/local/nginx/conf/sites-enabled/` |
| 默认网站根目录         | `/var/www/html`                | `/usr/local/nginx/html`             |
| 日志文件              | `/var/log/nginx/access.log`    | `/usr/local/nginx/logs/access.log`  |


重新加载 Nginx：
```bash
# 测试配置并重启nginx
sudo nginx -t  && sudo systemctl reload nginx
```

### 4.2 安全防护
这个方法是利用「非猜测性目录名」作为基础安全措施（Security through obscurity），虽然不能作为唯一的安全手段，但可以增加偶然访问的难度。下面是具体实现示例：

1. 准备步骤：先给你的部署目录起一个随机复杂名称，例如
```bash
# 生成随机字符串作为目录名（32位字母数字）
RANDOM_DIR=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)
echo "你的秘密目录名为: $RANDOM_DIR"

# 创建目录并移动Vue打包文件
sudo mkdir -p /var/www/$RANDOM_DIR
sudo mv dist/* /var/www/$RANDOM_DIR/
```
2. Nginx 配置示例
```bash
server {
    listen 80;
    server_name your-domain.com;

    # 只有知道完整路径的人才能访问
    location /4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/ {
        alias /var/www/4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/;
        try_files $uri $uri/ /4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/index.html;
    }

    # 静态资源路由 (/assets/ 自动映射到 /4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/assets/)
    location /assets/ {
        alias /var/www/4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/assets/;
        access_log off;
        expires 7d;
    }

    # 其他路径返回404
    location / {
        autoindex off; # 禁止目录列表
        return 404;
    }

    #反向代理，如果 Nginx 在 80 代理 3000，确保 proxy_set_header 传递正确
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. 配套安全强化（建议组合使用）
```bash
# 拦截版本控制目录
location ~ /\.(git|svn|hg) { 
    deny all; 
}

# 拦截敏感文件
location ~* \.(env|sql|bak|htaccess|conf|ini|log)$ { 
    deny all; 
}

# 实际项目的访问目录
https://your-domain.com/4n9xKcF2qW7zPbY8VrTd3mSs5GhJkLpN/

# 测试配置并重启
sudo nginx -t && sudo systemctl restart nginx

``` 

4. 自动化更新脚本示例,定期更换目录名可增强安全性
```bash
#!/bin/bash
NEW_DIR=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)
sudo mv /var/www/current /var/www/$NEW_DIR
sed -i "s|location /.*/|location /$NEW_DIR/|" /etc/nginx/sites-enabled/yoursite
sudo systemctl reload nginx
```

### 4.3 反向代理
如果 Nginx 在 80 代理 3000，确保 proxy_set_header 传递正确：
```bash
# API反向代理到Node.js服务
location /api/ {
    proxy_pass http://127.0.0.1:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
}
```
前端进行访问时，API基础URL为 `/api/` ，需要修改为使用相对路径或环境变量，以适应服务器环境：
```javascript
// 修改前
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 修改后
const apiClient = axios.create({
  baseURL: '/api', // 使用相对路径，由Nginx转发
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```
>nginx访问出现错误时，请检查nginx的配置文件，确保正确配置了反向代理。并且根据错误日志`sudo tail -f /var/log/nginx/error.log`查看错误信息进行排查。

## 五、开启服务

### 5.1 screen
screen 是一个 Linux 终端复用工具，可以创建一个“虚拟终端会话”，即使你退出 SSH，它仍然会保持运行。
1. 安装 screen
```bash
sudo dnf install screen -y
```
2. 启动服务
```bash
screen -S myexpress node server.js # -S myexpress 表示给这个会话取一个名字（比如 myexpress），便于后续恢复（screen -r myexpress）。
```

如果要退出 screen 会话而不终止后台进程，按 `Ctrl + A`，再按 `D` 退出会话（但服务仍在后台运行）。这样不会终止 node server.js，只是让你回到原来的终端。
要恢复会话，使用 `screen -r myexpress`。

如何彻底停止这个后台服务？
1. 先恢复会话：`screen -r myexpress`
2. 然后按 `Ctrl + C` 终止 `node server.js`。
3. 再输入 `exit` 退出 screen 会话。

### 5.2 pm2
PM2 是一个 `Node.js` 进程管理器`（Process Manager）`，用于 高效管理、监控和守护 `Node.js` 应用（或其他脚本语言，如 Python、Ruby）。它提供了 进程守护、负载均衡、日志管理、监控 等功能，让 Node.js 应用在生产环境中更稳定、可靠。
1. 安装 pm2
```bash
npm install -g pm2         # 安装 pm2
pm2 start server.js --name my-express  # 启动并命名进程
pm2 logs                   # 查看日志
```
2. 配置开机启动
```bash
pm2 save                   # 保存进程列表
pm2 startup                # 设置开机自启
pm2 list                   # 查看运行的进程
```
3. 停止服务
```bash
pm2 stop my-express         # 停止服务
pm2 delete my-express       # 删除服务
pm2 restart app_name   # 重启
```

##  六、 定时开关机 <有些云主机不支持开机>
使用 cron（周期性定时任务）来设置定时开关机。适用于每天/每周固定时间开关机。
1. 编辑 cron 任务
```bash
crontab -e
```
2. 添加定时任务
```INI
# 每天凌晨2点关机 (分钟 小时 日 月 星期)
0 2 * * * /sbin/shutdown -h now
# 每天凌晨3点重启
0 3 * * * /sbin/shutdown -r now
# 每周一+周三 5:30关机
30 5 * * 1,3 /sbin/shutdown -h now
# 每月 1 号 5:30 关机
30 5 1 * * /sbin/shutdown -h now
```
3. 检查定时任务
```bash
crontab -l
```