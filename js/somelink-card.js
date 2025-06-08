// DOM元素
const websitesContainer = document.getElementById('websitesContainer');
const detailContainer = document.getElementById('detailContainer');
const detailIcon = document.getElementById('detailIcon');
const detailTitle = document.getElementById('detailTitle');
const detailContent = document.getElementById('detailContent');
const backButton = document.getElementById('backButton');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// 初始渲染网站卡片
renderWebsites(websites);

// 渲染网站卡片函数
function renderWebsites(data) {
		websitesContainer.innerHTML = '';
		data.forEach(site => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
				<div class="card-top">
				<div class="card-icon" style="--card-icon: url('${site.icon}');"></div>
				</div>
				<div class="card-body" data-id="${site.id}">
				<h3 class="card-title">${site.name}</h3>
				<p class="card-description">${site.description}</p>
				</div>
				<div class="card-footer">
				<a href="${site.url}" target="_blank" class="card-btn">访问网站</a>
				</div>
		`;
		websitesContainer.appendChild(card);
		});
	
	// 添加点击事件监听
	document.querySelectorAll('.card-body').forEach(item => {
		item.addEventListener('click', function() {
			const id = parseInt(this.getAttribute('data-id'));
			showDetail(id);
		});
	});
}

// 显示网站详情
function showDetail(id) {
const site = websites.find(s => s.id === id);
if (!site) return;

// 更新详情内容
detailIcon.style.backgroundImage = `url('${site.icon}')`;
detailTitle.textContent = site.name;
detailContent.innerHTML = `
<p><strong>网站地址：</strong><a href="${site.url}" target="_blank">${site.url}</a></p>
<p>${site.detail}</p>
`;

// 设置访问按钮链接
document.getElementById('visitButton').href = site.url;

// 切换视图
websitesContainer.style.display = 'none';
detailContainer.style.display = 'block';
}

// 返回按钮事件
backButton.addEventListener('click', function() {
	websitesContainer.style.display = 'grid';
	detailContainer.style.display = 'none';
});

// 搜索功能
searchButton.addEventListener('click', searchWebsites);
searchInput.addEventListener('keyup', function(e) {
	if (e.key === 'Enter') searchWebsites();
});

function searchWebsites() {
	const query = searchInput.value.toLowerCase().trim();
	if (!query) {
		renderWebsites(websites);
		return;
	}
	
	const results = websites.filter(site => 
		site.name.toLowerCase().includes(query) || 
		site.description.toLowerCase().includes(query)
	);
	
	renderWebsites(results);
}