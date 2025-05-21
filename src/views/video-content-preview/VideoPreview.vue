<template>
  <div class="video-preview-container">
    <div class="video-grid">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="video-card"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave(index)"
      >
        <div class="thumbnail">
          <img :src="video.thumbnail" :alt="video.title" />
          <div class="duration">{{ formatDuration(video.duration) }}</div>
          <div class="play-button" v-if="hoveredIndex === index">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <path d="M8 5v14l11-7z" fill="white" />
            </svg>
          </div>
        </div>

        <div class="info">
          <h3 class="title">{{ video.title }}</h3>
          <div class="meta">
            <span class="views">{{ formatViews(video.views) }}次观看</span>
            <span class="date">{{ formatDate(video.date) }}</span>
          </div>
          <div class="channel">
            <img :src="video.channelAvatar" :alt="video.channelName" />
            <span>{{ video.channelName }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>视频数量：</label>
        <input
          type="range"
          v-model="videoCount"
          min="4"
          max="12"
          step="4"
          @change="generateVideos"
        />
        <span>{{ videoCount }}个</span>
      </div>

      <div class="control-group">
        <label>布局模式：</label>
        <select v-model="layoutMode" @change="updateLayout">
          <option value="grid">网格</option>
          <option value="list">列表</option>
          <option value="masonry">瀑布流</option>
        </select>
      </div>

      <div class="control-group">
        <label>排序方式：</label>
        <select v-model="sortBy" @change="sortVideos">
          <option value="date">最新发布</option>
          <option value="views">最多观看</option>
          <option value="duration">时长</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const videoCount = ref(8);
const layoutMode = ref("grid");
const sortBy = ref("date");
const hoveredIndex = ref(-1);
const videos = ref([]);

// 生成随机视频数据
function generateVideos() {
  const titles = [
    "2024年最值得期待的新技术",
    "Vue3 高级特性详解",
    "React 18 新特性介绍",
    "TypeScript 最佳实践指南",
    "前端性能优化技巧",
    "微前端架构实践",
    "Web3.0 开发入门",
    "人工智能在Web开发中的应用",
    "响应式设计最佳实践",
    "前端工程化实践",
    "浏览器渲染原理详解",
    "现代CSS技巧分享",
  ];

  const channels = [
    {
      name: "技术前沿",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    {
      name: "前端开发",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    {
      name: "编程课堂",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    {
      name: "科技新知",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    },
  ];

  videos.value = Array.from({ length: videoCount.value }, () => {
    const channel = channels[Math.floor(Math.random() * channels.length)];
    const duration = Math.floor(Math.random() * 3600) + 300; // 5分钟到1小时
    const views = Math.floor(Math.random() * 1000000) + 1000;
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );

    return {
      title: titles[Math.floor(Math.random() * titles.length)],
      thumbnail: `https://picsum.photos/seed/${Math.random()}/400/225`,
      duration,
      views,
      date,
      channelName: channel.name,
      channelAvatar: channel.avatar,
    };
  });

  sortVideos();
}

// 格式化时长
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// 格式化观看次数
function formatViews(views) {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

// 格式化日期
function formatDate(date) {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days === 0) {
    return "今天";
  } else if (days === 1) {
    return "昨天";
  } else if (days < 7) {
    return `${days}天前`;
  } else if (days < 30) {
    return `${Math.floor(days / 7)}周前`;
  } else {
    return `${Math.floor(days / 30)}个月前`;
  }
}

// 处理鼠标悬停
function handleMouseEnter(index) {
  hoveredIndex.value = index;
}

function handleMouseLeave() {
  hoveredIndex.value = -1;
}

// 更新布局
function updateLayout() {
  const container = document.querySelector(".video-grid");
  if (container) {
    container.className = `video-grid ${layoutMode.value}`;
  }
}

// 排序视频
function sortVideos() {
  videos.value.sort((a, b) => {
    switch (sortBy.value) {
      case "date":
        return b.date - a.date;
      case "views":
        return b.views - a.views;
      case "duration":
        return b.duration - a.duration;
      default:
        return 0;
    }
  });
}

// 初始化
onMounted(() => {
  generateVideos();
});
</script>

<style lang="scss" scoped>
.video-preview-container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.video-grid {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;

  &.grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  &.list {
    grid-template-columns: 1fr;

    .video-card {
      display: flex;
      gap: 20px;

      .thumbnail {
        width: 300px;
        flex-shrink: 0;
      }

      .info {
        flex: 1;
      }
    }
  }

  &.masonry {
    columns: 4;
    column-gap: 20px;

    .video-card {
      break-inside: avoid;
      margin-bottom: 20px;
    }
  }
}

.video-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
}

.thumbnail {
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 比例

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 2px 4px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    border-radius: 2px;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;

    svg {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }
  }

  &:hover .play-button {
    opacity: 1;
  }
}

.info {
  padding: 12px;

  .title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: #666;
    margin-bottom: 8px;
  }

  .channel {
    display: flex;
    align-items: center;
    gap: 8px;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    span {
      font-size: 12px;
      color: #666;
    }
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;

  label {
    font-weight: 500;
    color: #333;
  }

  input[type="range"] {
    width: 100%;
  }

  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }
}
</style>
