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
		detail: "腾讯的有着deepseek和混元大模型两个AI的网页端应用。<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 20px;'>本网页的很多东西就是其中的deepseek写的<em>（小声）</em></span>"
	},
	{
		id: 5,
		name: "刘明野的工具箱",
		icon: "./img/website-icon/liumingyetools.png",
		url: "https://tools.liumingye.cn",
		description: "一些在线实用小工具。",
		detail: "一些在线实用小工具。<br>其实曾经的My Free MP3就是他家的，可惜已经关了……（但是可以用GD音乐台来代替）<br><span onclick='notification_ClickSmallText()' title='戳我试试' class='jianbianwenben' style='--color-start: #abbcbd2f; --color-end: #abbcbd2f; --font-size: 20px;'>本网页背景其实来自于他家的bing图api<em>（小声）</em></span>"
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
		detail: "我自己整理的一些伴奏音乐，不定期更新，如果你有好的音乐的话，可以在github上提issues。<br>还有一份蓝奏云版（两个网盘的内容是一样的），链接：<a href='https://www.lanzn.com/b00hqkddhi' target=_blank>https://www.lanzn.com/b00hqkddhi</a>，密码：66<br><b>免责声明：</b><br>资源来自网络，仅限学习参考，严禁下载、传播或商用。"
	}
	]