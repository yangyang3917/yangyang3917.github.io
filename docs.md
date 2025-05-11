# 文档

## 1.渐变文本
### 用法
#### ①先在html的head部分引入渐变文本css（位于根目录/css/jianbianwenben.css）：
`<link rel="stylesheet" href="css/jianbianwenben.css">`
#### ②在html代码中调用渐变文本css：
`<p class="jianbianwenben" style="--color-start: #ff0000; --color-end: #f031ba; --font-size: 30px; --font-weight: medium;">文本</p>`

可以使用**style=""**来自定义渐变起始颜色（变量名为**“--color- start”**，默认为#ff6b6b）、终止颜色（变量名为**“--color-end”**，默认为#4ecdc4）、字号（变量名为**“--font-size”**，默认为25px）和字重（变量名为**“--font-weight”**，默认为Light）
### 附件
**字重对照表**

| 字重          | 对应中文 |
| ------------ | ------- |
| Bold         | 粗体     |
| BoldItalic   | 粗体斜体 |
| Italic       | 斜体    |
| Light        | 细体    |
| LightItalic  | 斜细体   |
| Medium       | 中等    |
| MediumItalic | 中等斜体 |
| Regular      | 标准    |

### 另：链接文本中的用法
若想在链接文本（点击文本后打开链接）上添加渐变颜色，只需这样写即可

`<a href="链接" target="_blank" class="jianbianwenben" style="--color-start: #26ff00; --color-end: #ffff01;">文本</a>`

## 2.通知系统
### 用法
#### ①先在html的head部分引入通知系统css（位于根目录/css/notifications.css）：
`<link rel="stylesheet" href="css/notifications.css">`
#### ②在html中添加`<script>`标签来定义通知函数（同时也引入通知管理器js，路径在根目录/js/notificationManager.js）：
```
    <script type="module">
   import NotificationManager from './js/notificationManager.js';

        window.[通知函数名] = () => {
            NotificationManager.getInstance().add(
                'success',*//通知类型，可用值：success（绿底）、warn（黄底）、error（红底）和info（蓝底）*
                '文件上传成功',*//通知标题（加粗）*
                '耗时 2.3 秒，大小 15.6 MB',*//通知内容*
                {
                    enterDuration: 300,*// 进入动画时间（单位：ms）*
                    exitDuration: 500,*// 退出动画时间（单位：ms）*
                    displayDuration: 4500 *// 显示时间（单位：ms）*
                }
            );
        };
	</script>
```
#### ③在代码中直接调用[通知函数名]，如点击按钮通知则为：
`<button onclick="[通知函数名()]"按钮显示的文字></button>`

## 3.背景
### 关于
背景是调用的刘明野的工具箱的每日Bing图的api实现一天一更新的
### 用法
#### ①先在html的head部分引入背景css（位于根目录/css/background.css）：
`<link rel="stylesheet" href="css/background.css">`
#### ②再在html的body部分引入背景js（位于根目录/js/background.js）：
`<script src="js/background.js" defer></script>`
#### ③在访问网页时等待加载即可（只有每天第一次访问才需要联网获取）