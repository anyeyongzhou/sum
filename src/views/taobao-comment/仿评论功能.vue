<template>
  <div class="comment-gallery">
    <div class="comment-text">{{ comment }}</div>
    <div class="photo-box">
      <ul class="photos">
        <li
          v-for="(item, index) in images"
          :key="index"
          :class="{ 'tm-current': currentIndex === index }"
          @click="handleImageClick(index)"
        >
          <img :src="item" :alt="'图片' + (index + 1)" />
          <span></span>
        </li>
      </ul>
      <div
        class="photo-view"
        :style="{
          width: previewSize.width + 'px',
          height: previewSize.height + 'px',
        }"
      >
        <img
          :src="currentImage"
          :style="{ transform: previewSize.width ? 'scale(0.96)' : 'none' }"
          @click="closePreview"
        />
        <a href="javascript:void(0)" class="nav-left" @click="handlePrev">
          <i class="nav-icon">&lt;</i>
        </a>
        <a href="javascript:void(0)" class="nav-right" @click="handleNext">
          <i class="nav-icon">&gt;</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import img1 from "./img/pic1.jpg";
import img2 from "./img/pic2.jpg";
import img3 from "./img/pic3.jpg";
import img4 from "./img/pic4.jpg";
import img5 from "./img/pic5.jpg";
import img6 from "./img/pic6.jpg";
import img7 from "./img/pic7.jpg";

const props = defineProps({
  comment: {
    type: String,
    default:
      "装好了之后挺牢固的，如果上面的麻绳能再缠厚实点就更好了，感觉就裹了一层，如果猫抓的多的话应该很快就会破了，打算过段时间自己买点麻绳再缠点",
  },
  images: {
    type: Array,
    default: () => [img1, img2, img3, img4, img5, img6, img7],
  },
});

const currentIndex = ref(-1);
const previewSize = ref({ width: 0, height: 0 });

const currentImage = computed(() => {
  return currentIndex.value >= 0 ? props.images[currentIndex.value] : "";
});

const handleImageClick = index => {
  if (currentIndex.value === index) {
    closePreview();
  } else {
    currentIndex.value = index;
    loadImage(props.images[index]);
  }
};

const loadImage = src => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    previewSize.value = {
      width: img.width,
      height: img.height,
    };
  };
};

const closePreview = () => {
  currentIndex.value = -1;
  previewSize.value = { width: 0, height: 0 };
};

const handlePrev = () => {
  if (currentIndex.value > 0) {
    handleImageClick(currentIndex.value - 1);
  }
};

const handleNext = () => {
  if (currentIndex.value < props.images.length - 1) {
    handleImageClick(currentIndex.value + 1);
  }
};
</script>

<style lang="scss" scoped>
.comment-gallery {
  width: 70%;
  margin: 100px auto;
  border: 1px solid #cecece;
  background-color: #fff;
}

.comment-text {
  width: 90%;
  color: #333;
  margin: 20px auto;
  padding: 10px;
  line-height: 1.5;
}

.photo-box {
  width: 90%;
  margin: 10px auto;
}

.photos {
  height: 45px;
  display: flex;
  gap: 12px;

  li {
    width: 40px;
    height: 40px;
    border: 2px solid #f2f2f2;
    padding: 2px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #f23d6a;
    }

    &.tm-current {
      border: 2px solid #f23d6a;
      border-radius: 2px;

      span {
        opacity: 1;
        bottom: -12px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      width: 0;
      height: 0;
      border: 6px dashed transparent;
      border-top: 6px solid #f23d6a;
      position: absolute;
      left: 15px;
      opacity: 0;
      bottom: -8px;
      transition: all 0.3s ease;
    }
  }
}

.photo-view {
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  background-color: #f2f2f2;
  transition: all 100ms ease-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .nav-left,
  .nav-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  .nav-left {
    left: 10px;
  }

  .nav-right {
    right: 10px;
  }

  .nav-icon {
    font-size: 24px;
    color: #f23d6a;
  }
}
</style>
