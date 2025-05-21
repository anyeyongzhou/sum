<template>
  <div class="video-popup-container">
    <div class="video-list">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="video-item"
        @click="openPopup(video)"
      >
        <div class="thumbnail">
          <img :src="video.thumbnail" :alt="video.title" />
          <div class="duration">{{ formatDuration(video.duration) }}</div>
          <div class="play-icon">
            <svg viewBox="0 0 24 24" width="32" height="32">
              <path d="M8 5v14l11-7z" fill="white" />
            </svg>
          </div>
        </div>
        <div class="info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
        </div>
      </div>
    </div>

    <!-- 视频弹窗 -->
    <div class="popup-overlay" v-if="showPopup" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <h2>{{ currentVideo?.title }}</h2>
          <button class="close-button" @click="closePopup">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>

        <div class="video-player">
          <video
            ref="videoPlayer"
            :src="currentVideo?.videoUrl"
            controls
            autoplay
            @ended="handleVideoEnd"
          ></video>
        </div>

        <div class="video-info">
          <div class="meta">
            <span class="views"
              >{{ formatViews(currentVideo?.views) }}次观看</span
            >
            <span class="date">{{ formatDate(currentVideo?.date) }}</span>
          </div>
          <div class="description">{{ currentVideo?.description }}</div>
          <div class="tags">
            <span
              v-for="(tag, index) in currentVideo?.tags"
              :key="index"
              class="tag"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showPopup = ref(false);
const currentVideo = ref(null);
const videoPlayer = ref(null);
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
  ];

  const descriptions = [
    "探索2024年即将改变开发格局的新技术趋势，包括AI、WebAssembly等前沿技术。",
    "深入理解Vue3的组合式API、响应式系统、Teleport等高级特性。",
    "了解React 18带来的并发渲染、自动批处理等革命性更新。",
    "学习TypeScript在企业级应用中的最佳实践和设计模式。",
    "掌握前端性能优化的关键技巧，提升应用加载速度和运行效率。",
    "探索微前端架构的设计理念和实现方案，构建可扩展的大型应用。",
  ];

  const tags = [
    ["前端", "Vue3", "新技术"],
    ["前端", "React", "框架"],
    ["前端", "TypeScript", "类型系统"],
    ["前端", "性能优化", "最佳实践"],
    ["前端", "架构", "微前端"],
    ["前端", "工程化", "开发效率"],
  ];

  videos.value = titles.map((title, index) => ({
    title,
    description: descriptions[index],
    thumbnail: `https://picsum.photos/seed/${index}/400/225`,
    videoUrl: `https://example.com/videos/${index + 1}.mp4`, // 示例视频URL
    duration: Math.floor(Math.random() * 3600) + 300,
    views: Math.floor(Math.random() * 1000000) + 1000,
    date: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
    tags: tags[index],
  }));
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

// 打开弹窗
function openPopup(video) {
  currentVideo.value = video;
  showPopup.value = true;
  document.body.style.overflow = "hidden";
}

// 关闭弹窗
function closePopup() {
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
  showPopup.value = false;
  currentVideo.value = null;
  document.body.style.overflow = "";
}

// 处理视频结束
function handleVideoEnd() {
  // 可以在这里添加视频结束后的逻辑
}

// 处理ESC键关闭
function handleKeyDown(event) {
  if (event.key === "Escape" && showPopup.value) {
    closePopup();
  }
}

// 初始化
onMounted(() => {
  generateVideos();
  window.addEventListener("keydown", handleKeyDown);
});

// 清理
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss" scoped>
.video-popup-container {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.video-item {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
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

  .play-icon {
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

  &:hover .play-icon {
    opacity: 1;
  }
}

.info {
  padding: 12px;

  h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.popup-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }

  .close-button {
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;

    &:hover {
      color: #333;
    }
  }
}

.video-player {
  width: 100%;
  background-color: black;

  video {
    width: 100%;
    display: block;
  }
}

.video-info {
  padding: 16px;

  .meta {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #666;
  }

  .description {
    margin-bottom: 16px;
    line-height: 1.5;
    color: #333;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag {
      padding: 4px 8px;
      background-color: #f0f0f0;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
