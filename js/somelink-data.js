const websites = [
	{
		id: 1,
		name: "GitHub",
		icon: "./img/website-icon/github.png",
		url: "https://github.com",
		description: "面向开源及私有软件项目的托管平台，全球最大的代码托管平台和开发者社区。",
		detail: "GitHub是一个通过Git进行版本控制的软件源代码托管服务平台，由GitHub公司开发。除了Git代码仓库托管及基本的Web管理界面以外，还提供了订阅、讨论组、文本渲染、在线文件编辑器等功能。它被程序员广泛用于托管各种开源项目，促进了开源协作文化的发展。"
	},
	{
		id: 2,
		name: "GD音乐台",
		icon: "./img/website-icon/gdmusic.ico",
		url: "https://music.gdstudio.xyz",
		description: "由GD-Studio基于开源项目深度开发的音乐聚合平台。",
		detail: "GD音乐台是基于开源项目Meting、MKOnlineMusicPlayer深度开发的网页端应用，可能是全网音质最高，音乐源最齐全的音乐聚合平台，旨在给用户提供更便捷、更HiFi的使用体验。<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 15px;'>其实有安卓版的，但是很难用<em>（小声）</em></span>"
	},
	{
		id: 3,
		name: "MC百科",
		icon: "./img/website-icon/mcmod.ico",
		url: "https://mcmod.cn",
		description: "最大的Minecraft中文百科",
		detail: "MC百科 (mcmod.cn) 的目标是为玩家提供更好的环境进行MOD学习和研究，并接纳、培养更多硬核玩家。提供Minecraft(我的世界)MOD(模组)物品资料介绍、教程攻略与MOD下载，致力于提高玩家的游戏体验。"
	},
	{
		id: 4,
		name: "腾讯元宝",
		icon: "./img/website-icon/tencentyuanbao.png",
		url: "https://yuanbao.tencent.com",
		description: "腾讯的有着deepseek和混元大模型两个AI的网页端应用。",
		detail: "腾讯的有着deepseek和混元大模型两个AI的网页端应用。<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 15px;'>本网页的很多东西就是其中的deepseek写的<em>（小声）</em></span>"
	},
	{
		id: 5,
		name: "刘明野的工具箱",
		icon: "./img/website-icon/liumingyetools.png",
		url: "https://tools.liumingye.cn",
		description: "一些在线实用小工具。",
		detail: "一些在线实用小工具。<br>其实曾经的My Free MP3就是他家的，可惜已经关了……（但是可以用GD音乐台来代替）<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 15px;'>本网页背景其实来自于他家的bing图api<em>（小声）</em></span>"
	},
	{
		id: 6,
		name: "Github文件代理加速",
		icon: "./img/website-icon/GithubProxy.png",
		url: "https://github.akams.cn",
		description: "整理了大量GitHub文件加速链接，可以智能选择延迟最低的使用。",
		detail: "该站点整理聚合了大量GitHub文件加速链接，可以智能选择延迟最低的使用。（国内用户福音）"
	},
	{
		id: 7,
		name: "伴奏音乐",
		icon: "./img/website-icon/banzouyinyue.png",
		url: "https://pan.huang1111.cn/s/GlZBiW",
		description: "我自己整理的一些伴奏音乐，使用网盘分享",
		detail: "我自己整理的一些伴奏音乐，不定期更新，如果你有好的音乐的话，可以在github上提issues。<br>还有一份蓝奏云版（两个网盘的内容是一样的），链接：<a href='https://www.lanzn.com/b00hqkddhi' target=_blank>https://www.lanzn.com/b00hqkddhi</a>，密码：66<br><b>免责声明：</b><br>资源来自网络，仅限学习参考，严禁传播或商用。您必须在下载后的24个小时之内，从您的电脑中彻底删除上述内容。如果您喜欢该，请支持正版，得到更好的正版服务。"
	},
	{
		id: 8,
		name: "<font color=#BD2D30>W3</font>school",
		icon: "./img/website-icon/w3school.png",
		url: "https://w3school.com.cn",
		description: "因特网上完全免费的、非盈利性的、最大的WEB开发者资源",
		detail: "<b>全球最大的WEB技术资源</b><br>W3School是因特网上最大的WEB开发者资源，其中包括全面的教程、完善的参考手册以及庞大的代码库。<br>W3School每月接受上百万人次的用户访问，并产生数千万的页面浏览量。<hr width=100%></hr><b>完全免费</b><br>W3School把提供高品质的WEB技术资源作为自身的使命。<br>W3School将为用户提供永久免费的内容和服务。<hr width=100%></hr><b>非盈利</b><br>W3School不以盈利为目的，尽管维持 W3School正常运营的费用非常可观。<br>W3School的运营费用主要来自两方面：赢科的无私投入，以及少量的广告收入。<br>W3School一直将全部资金用于网站内容的开发以及服务器硬件的升级和维护。<hr width=100%></hr><b>坚持不懈的更新和升级</b><br>W3School一直在对内容进行更新和完善，并适时地推出重要的升级版本。<br>W3School将紧随WEB技术的飞速发展，为广大用户提供最新鲜的内容和服务。"
	},
	{
		id: 9,
		name: "<font color=#00E4FF>图形方格纸 </font><font size=2.5 color=#00E4FF>MyGraphPaper</font>",
		icon: "./img/website-icon/myparagraphpaper.png",
		url: "https://www.mygraphpaper.com/index.php?lang=zh-hans",
		description: "自定义程度极高纸张纹样制作网站",
		detail: "该站点允许自定义纸张大小、方向以及上面的纹样，并且自定义程度极高，还有预设可以选择，并且可以直接输出PDF进行打印<br>（图标来源：<a href='https://www.tboxn.com'>T<font size=2.5>BOX导航</font></a>）"
	},
	{
		id: 10,
		name: "IconPark",
		icon: "./img/website-icon/iconpark.png",
		url: "https://iconpark.oceanengine.com/official",
		description: "开源的免费可商用矢量图标下载平台",
		detail: "字节跳动旗下的开源的、免费的、可商用的、高质量的、非常全的矢量图标平台，并且支持批量下载svg<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 15px;'>吐槽：都四五年了还是beta版呢，并且还不适配手机视图<em>（小声）</em></span>"
	},
	{
		id: 11,
		name: "Image Extractor",
		icon: "./img/website-icon/imageextractor.png",
		url: "https://extract.pics",
		description: "网页上的图片获取器",
		detail: "<mark><b>注意：该网站不支持中文，请使用翻译器</b></mark><br><b>Find Every Image</b><br>We use many different methods and strategies to find all relevant images on an website. This includes background images, dynamically loaded or embedded images and SVG elements.<hr width=100%></hr><b>Automatic Image Analysis</b><br>Every discovered image is analysed to find its dimensions, type, size and name. With more advanced features to come in the future.<hr width=100%></hr><b>Useful Tools</b><br>View all images in a grid or list, search for specific ones by name, filter by type and sort by width, height and other properties to find exactly what you are looking for.<hr width=100%></hr><b>Easy Download</b><br>Download invididual images or select the ones you want and download them all at once. Alternatively, you can also only copy the URLs to the clipboard."
	},
	{
		id: 12,
		name: "五弹幕",
		icon: "./img/website-icon/5dm.png",
		url: "https://5dm.me",
		description: "干净的追番弹幕网站",
		detail: "干净无广告免登录的追番弹幕网站<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 15px;'>吐槽：注册要花40元买邀请码……<em>（小声）</em></span>"
	},
	{
		id: 13,
		name: "<font color=#E48D21>猜盐</font>（原炒饭小测验）",
		icon: "./img/website-icon/xiaoce.png",
		url: "https://xiaoce.fun",
		description: "免登录小测验平台，做题也可以很快乐",
		detail: "<mark>（使用http协议和https协议访问均可）</mark><br>免登录小测验平台（之前的ai猜病就是他家的小程序）"
	}
	]