// ========== 工具函数 ==========
const getToday = () => new Date().toISOString().split('T')[0];

const cleanCache = () => {
  const cache = JSON.parse(localStorage.getItem('bingImageCache') || '{"images":[]}');
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 保留一周内的缓存 + 至少一张备用
  const validCache = cache.images.filter(entry => new Date(entry.date) >= oneWeekAgo);
  if (validCache.length === 0 && cache.images.length > 0) {
    validCache.push(cache.images.sort((a, b) => new Date(b.date) - new Date(a.date))[0]);
  }

  cache.images = validCache;
  localStorage.setItem('bingImageCache', JSON.stringify(cache));
};

// ========== 核心逻辑 ==========
const fetchBingImageUrl = async () => {
  try {
    // 发起请求（需目标接口允许跨域）
    const response = await fetch('https://tool.liumingye.cn/bingimg/img.php');

    // 302 重定向时，response.url 为最终图片地址
    if (response.redirected) {
      return response.url;
    }

    throw new Error('未发生重定向');
  } catch (error) {
    console.error('获取图片失败:', error);
    return null;
  }
};

const applyBackground = (url) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${url})`;
  };
  img.onerror = () => {
    console.warn('图片加载失败，尝试备用缓存');
    const cache = JSON.parse(localStorage.getItem('bingImageCache') || '{"images":[]}');
    if (cache.images.length > 0) {
      applyBackground(cache.images[0].url);
    }
  };
};

const setBackground = async () => {
  const cache = JSON.parse(localStorage.getItem('bingImageCache') || '{"images":[]}');
  const today = getToday();
  const todayEntry = cache.images.find(entry => entry.date.startsWith(today));

  // 使用今日缓存
  if (todayEntry) {
    applyBackground(todayEntry.url);
    return;
  }

  // 获取新图片
  const newUrl = await fetchBingImageUrl();
  if (!newUrl) {
    if (cache.images.length > 0) {
      applyBackground(cache.images[0].url);
    }
    return;
  }

  // 更新缓存
  cache.images.push({ url: newUrl, date: new Date().toISOString() });
  localStorage.setItem('bingImageCache', JSON.stringify(cache));
  cleanCache(); // 清理旧缓存
  applyBackground(newUrl);
};

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', setBackground);