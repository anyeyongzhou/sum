<template>
  <div class="unread-container">
    <div class="message-list">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
        :class="{ unread: message.unread }"
        @click="markAsRead(index)"
      >
        <div class="avatar">
          <img :src="message.avatar" :alt="message.name" />
          <div class="status" :class="message.status"></div>
        </div>

        <div class="content">
          <div class="header">
            <span class="name">{{ message.name }}</span>
            <span class="time">{{ message.time }}</span>
          </div>
          <div class="preview">{{ message.preview }}</div>
        </div>

        <div class="badge" v-if="message.unread">
          <span class="count" v-if="message.count > 1">{{
            message.count
          }}</span>
          <div class="dot" v-else></div>
        </div>
      </div>
    </div>

    <div class="controls">
      <div class="control-group">
        <label>消息数量：</label>
        <input type="range" v-model="messageCount" min="1" max="10" step="1" />
        <span>{{ messageCount }}条</span>
      </div>

      <div class="control-group">
        <label>未读比例：</label>
        <input type="range" v-model="unreadRatio" min="0" max="100" step="10" />
        <span>{{ unreadRatio }}%</span>
      </div>

      <div class="buttons">
        <button @click="generateMessages">生成消息</button>
        <button @click="markAllAsRead">全部已读</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const messageCount = ref(5);
const unreadRatio = ref(50);
const messages = ref([]);

// 生成随机消息
function generateMessages() {
  const names = [
    "张三",
    "李四",
    "王五",
    "赵六",
    "钱七",
    "孙八",
    "周九",
    "吴十",
  ];
  const statuses = ["online", "offline", "away"];
  const previews = [
    "你好，最近怎么样？",
    "项目进展如何？",
    "周末有空一起吃饭吗？",
    "这个功能需要修改一下",
    "请查看最新的设计稿",
    "会议时间改到下午3点",
    "文档已经更新完成",
    "代码审查通过了",
  ];

  messages.value = Array.from({ length: messageCount.value }, () => {
    const unread = Math.random() * 100 < unreadRatio.value;
    const count = unread ? Math.floor(Math.random() * 5) + 1 : 0;

    return {
      name: names[Math.floor(Math.random() * names.length)],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      time: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      preview: previews[Math.floor(Math.random() * previews.length)],
      unread,
      count,
    };
  });
}

// 标记单条消息为已读
function markAsRead(index) {
  if (messages.value[index].unread) {
    messages.value[index].unread = false;
    messages.value[index].count = 0;
  }
}

// 标记所有消息为已读
function markAllAsRead() {
  messages.value.forEach(message => {
    message.unread = false;
    message.count = 0;
  });
}

// 初始化消息
generateMessages();
</script>

<style lang="scss" scoped>
.unread-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &.unread {
    background-color: #e3f2fd;

    .name {
      font-weight: 600;
    }

    .preview {
      color: #1976d2;
    }
  }
}

.avatar {
  position: relative;
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }

  .status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;

    &.online {
      background-color: #4caf50;
    }

    &.offline {
      background-color: #9e9e9e;
    }

    &.away {
      background-color: #ff9800;
    }
  }
}

.content {
  flex: 1;
  min-width: 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .name {
      font-weight: 500;
      color: #333;
    }

    .time {
      font-size: 12px;
      color: #666;
    }
  }

  .preview {
    font-size: 14px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: #f44336;
  color: white;
  font-size: 12px;
  font-weight: 600;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #f44336;
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
}

.buttons {
  display: flex;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
