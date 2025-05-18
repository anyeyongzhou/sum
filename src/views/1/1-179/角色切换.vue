<template>
  <div class="character-selection">
    <div class="nav">
      <ul>
        <li
          v-for="(character, index) in characters"
          :key="character.id"
          :class="['item', `t${index + 1}`, { on: activeIndex === index }]"
          @click="selectCharacter(index)"
          @mouseenter="showTooltip = index"
          @mouseleave="showTooltip = null"
        >
          <i></i>
          <em></em>
          <span class="tooltip" v-show="showTooltip === index">{{
            character.name
          }}</span>
        </li>
      </ul>
    </div>
    <div class="box">
      <div
        v-for="(character, index) in characters"
        :key="'p' + character.id"
        :class="['p', `p${index + 1}`, { show: activeIndex === index }]"
        ref="characterBoxes"
      >
        <span class="name"></span>
        <img :src="character.image" :alt="character.name" loading="lazy" />
        <div class="desc">{{ character.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import p1Image from "./images/p1.png";
import p2Image from "./images/p2.png";
import p3Image from "./images/p3.png";
import p4Image from "./images/p4.png";
import t1Image from "./images/t1.png";
import t2Image from "./images/t2.png";
import t3Image from "./images/t3.png";
import t4Image from "./images/t4.png";
import t1OnImage from "./images/t1_on.png";
import t2OnImage from "./images/t2_on.png";
import t3OnImage from "./images/t3_on.png";
import t4OnImage from "./images/t4_on.png";
import spriteImage from "./images/sprite.png";
import bgImage from "./images/bg.jpg";

const characters = ref([
  {
    id: 1,
    name: "战士",
    image: p1Image,
    description: "强大的近战战士，拥有高防御和生命值",
    position: { left: "300px" },
  },
  {
    id: 2,
    name: "法师",
    image: p2Image,
    description: "元素魔法大师，擅长范围攻击",
    position: { left: "500px" },
  },
  {
    id: 3,
    name: "刺客",
    image: p3Image,
    description: "暗影中的杀手，高爆发伤害",
    position: { left: "400px" },
  },
  {
    id: 4,
    name: "射手",
    image: p4Image,
    description: "远程物理输出，机动性强",
    position: { left: "450px" },
  },
]);

const activeIndex = ref(0);
const showTooltip = ref(null);
const characterBoxes = ref([]);

const selectCharacter = index => {
  activeIndex.value = index;
};

// 键盘导航
const handleKeyDown = e => {
  if (["ArrowDown", "ArrowRight"].includes(e.key)) {
    activeIndex.value = (activeIndex.value + 1) % characters.value.length;
  } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
    activeIndex.value =
      (activeIndex.value - 1 + characters.value.length) %
      characters.value.length;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
</script>

<style lang="scss" scoped>
.character-selection {
  width: 100%;
  height: 100%;
  background: v-bind("`url(${bgImage}) no-repeat center/cover`");
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  .box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .p {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.8s ease, transform 0.8s ease;
      transform: translateX(5%);

      &.show {
        opacity: 1;
        transform: translateX(0);
      }

      img,
      .name {
        position: absolute;
        bottom: 0;
        transition: all 1s ease 0.3s;
      }

      img {
        height: 90%;
        max-height: 800px;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
      }

      .name {
        width: 300px;
        height: 400px;
        left: 100px;
        bottom: 275px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: v-bind("`url(${spriteImage})`");
      }

      .desc {
        position: absolute;
        left: 100px;
        bottom: 150px;
        width: 300px;
        color: #fff;
        font-size: 18px;
        line-height: 1.6;
        text-shadow: 0 0 5px #000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease 0.5s;
      }

      &.show .desc {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .p1 {
      img {
        left: 300px;
      }
      .name {
        background-position: -274px 0;
      }
    }

    .p2 {
      img {
        left: 500px;
      }
      .name {
        background-position: 0 -421px;
      }
    }

    .p3 {
      img {
        left: 400px;
      }
      .name {
        background-position: -585px 0;
      }
    }

    .p4 {
      img {
        left: 450px;
      }
      .name {
        background-position: 0 0;
      }
    }
  }

  .nav {
    position: absolute;
    width: 129px;
    top: 50%;
    right: 300px;
    transform: translateY(-50%);
    z-index: 2;

    li {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 15px auto;
      cursor: pointer;
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      i,
      em {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        transition: opacity 0.6s ease;
      }

      i {
        opacity: 1;
      }
      em {
        opacity: 0;
      }

      .tooltip {
        position: absolute;
        right: 140px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 8px 15px;
        border-radius: 4px;
        font-size: 16px;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }

      &:hover .tooltip {
        opacity: 1;
        right: 130px;
      }

      &.on {
        width: 129px;
        height: 129px;
        transform: scale(1.1);

        i {
          opacity: 0;
        }
        em {
          opacity: 1;
        }
      }
    }

    .t1 {
      i {
        background-image: v-bind("`url(${t1Image})`");
      }
      em {
        background-image: v-bind("`url(${t1OnImage})`");
      }
    }

    .t2 {
      i {
        background-image: v-bind("`url(${t2Image})`");
      }
      em {
        background-image: v-bind("`url(${t2OnImage})`");
      }
    }

    .t3 {
      i {
        background-image: v-bind("`url(${t3Image})`");
      }
      em {
        background-image: v-bind("`url(${t3OnImage})`");
      }
    }

    .t4 {
      i {
        background-image: v-bind("`url(${t4Image})`");
      }
      em {
        background-image: v-bind("`url(${t4OnImage})`");
      }
    }
  }
}

@media (max-width: 1400px) {
  .character-selection .nav {
    right: 150px;
  }
}

@media (max-width: 1200px) {
  .character-selection {
    min-width: 100%;
  }

  .character-selection .box {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
