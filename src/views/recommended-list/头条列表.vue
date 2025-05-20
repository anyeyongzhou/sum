<template>
  <div class="wrapper">
    <ul class="list-wrapper">
      <li v-for="(item, index) in listData" :key="index" class="item">
        <div class="left-img">
          <img
            :src="item.img_url"
            :alt="item.title"
            @mouseover="handleImageHover"
            @mouseout="handleImageOut"
          />
        </div>
        <div class="right-content">
          <div class="content-title">
            <a :href="item.title_link" target="_blank">{{ item.title }}</a>
          </div>
          <div class="banners">
            <span :class="'type-' + item.banners.type">
              {{ item.banners.type_name }}
            </span>
            <span class="img-wrapper">
              <img
                class="banner-img"
                :src="item.banners.img_url"
                :alt="item.banners.avatar"
              />
            </span>
            <span>{{ item.banners.avatar }}</span>
            <span>·</span>
            <span>{{ item.banners.coments }}评论</span>
            <span>·</span>
            <span>{{ formatTime(item.banners.timer) }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 模拟数据
const listData = ref([
  {
    img_url: new URL("./img/1.jpg", import.meta.url).href,
    title: "太治愈！武汉64岁奶奶患癌14年奇迹般好了，7岁孙女功不可没……",
    title_link: "https://www.toutiao.com/group/6766880179110281742/",
    banners: {
      type_name: "健康",
      type: "other",
      img_url: new URL("./img/avatar1.jpg", import.meta.url).href,
      avatar: "中国经济网",
      coments: 347,
      timer: 1575614207182,
    },
  },
  {
    img_url: new URL("./img/2.jpg", import.meta.url).href,
    title: "全网最年轻帅气的爷爷火了，抱小孙女看楼盘张罗嫁妆",
    title_link: "https://www.toutiao.com/group/6767156048642966029/",
    banners: {
      type_name: "房产",
      type: "other",
      img_url: new URL("./img/avatar2.jpg", import.meta.url).href,
      avatar: "文水电视台",
      coments: 9,
      timer: 1575614207182,
    },
  },
  {
    img_url: new URL("./img/3.jpg", import.meta.url).href,
    title: "如果孩子平时有这四种表现，说明内心很自卑，父母别不当回事",
    title_link: "https://www.toutiao.com/group/6758592335791014408/",
    banners: {
      type_name: "育儿",
      type: "other",
      img_url: new URL("./img/avatar3.jpg", import.meta.url).href,
      avatar: "光明网",
      coments: 34,
      timer: 1575614207182,
    },
  },
  {
    img_url: new URL("./img/4.jpg", import.meta.url).href,
    title: "3分钟黑掉阿里的黑客男孩，马云给500万年薪，现状如何？",
    title_link: "https://www.toutiao.com/group/6735195117839188227/",
    banners: {
      type_name: "科技",
      type: "technology",
      img_url: new URL("./img/avatar4.jpg", import.meta.url).href,
      avatar: "悟空问答",
      coments: 2292,
      timer: 1575614207182,
    },
  },
  {
    img_url: new URL("./img/5.jpg", import.meta.url).href,
    title: "坐地铁回母校，捐出了100000000",
    title_link: "https://www.toutiao.com/group/6767111641575195147/",
    banners: {
      type_name: "教育",
      type: "other",
      img_url: new URL("./img/avatar5.jpg", import.meta.url).href,
      avatar: "中国经济网",
      coments: 347,
      timer: 1575614207182,
    },
  },
]);

// 格式化时间
const formatTime = timestamp => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return days + "天前";
  if (hours > 0) return hours + "小时前";
  if (minutes > 0) return minutes + "分钟前";
  return "刚刚";
};

// 图片悬停效果
const handleImageHover = e => {
  e.target.style.transform = "scale(1.1, 1.1)";
};

const handleImageOut = e => {
  e.target.style.transform = "scale(1, 1)";
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 660px;
  margin: 50px auto;
}

.list-wrapper {
  width: 100%;
}

.item {
  padding: 10px 0;
  width: 100%;
  font-size: 0;
  border-bottom: 1px solid #222;
}

.left-img {
  width: 156px;
  margin-right: 10px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}

.left-img > img {
  width: 100%;
  transition: transform 0.5s;
}

.right-content {
  width: 494px;
  display: inline-block;
  font-size: 12px;
  vertical-align: middle;
}

.content-title {
  font-size: 20px;
  color: #222;
  font-weight: 700;
  margin-bottom: 10px;
}

.content-title a {
  color: #222;
  text-decoration: none;
}

.content-title a:hover {
  color: #406599;
}

.content-title a:visited {
  color: #999;
}

.banners {
  font-size: 0;
}

.banner-img {
  width: 18px;
}

.banners > span {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  margin-right: 3px;
}

.type-other,
.type-technology {
  border: 1px solid #87a5b5;
  color: #87a5b5;
  padding: 2px;
}

.img-wrapper {
  width: 18px;
  height: 18px;
  border-radius: 9px;
  overflow: hidden;
}
</style>
