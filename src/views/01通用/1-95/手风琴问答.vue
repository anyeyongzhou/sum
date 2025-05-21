<template>
  <div class="faq-accordion">
    <h2>Frequently Asked Questions</h2>
    <div class="accordion">
      <div
        class="box"
        v-for="(item, index) in faqItems"
        :key="index"
        :class="{ 'is-active': item.isExpanded }"
      >
        <button class="btn" @click="toggleAccordion(index)">
          <span class="title">{{ item.question }}</span>
          <span class="icon"></span>
        </button>
        <div class="content">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const faqItems = ref([
  {
    question: "Deserunt, alias similique?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate at quae alias quos itaque. Magnam tempora adipisci pariatur numquam, harum porro delectus voluptate mollitia velit officiis illo. Deserunt, alias similique?",
    isExpanded: false,
  },
  {
    question: "Magnam tempora adipisci pariatur numquam!",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate at quae alias quos itaque. Magnam tempora adipisci pariatur numquam, harum porro delectus voluptate mollitia velit officiis illo. Deserunt, alias similique?",
    isExpanded: false,
  },
  {
    question: "Quaerat doloremque officia ipsam sit atque asperiores a.",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate at quae alias quos itaque. Magnam tempora adipisci pariatur numquam, harum porro delectus voluptate mollitia velit officiis illo. Deserunt, alias similique?",
    isExpanded: false,
  },
  {
    question:
      "Tempora adipisci pariatur numquam, harum porro delectus voluptate!",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate at quae alias quos itaque. Magnam tempora adipisci pariatur numquam, harum porro delectus voluptate mollitia velit officiis illo. Deserunt, alias similique?",
    isExpanded: false,
  },
  {
    question: "Dolor sit amet consectetur adipisicing elit. Eum, nobis!",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate at quae alias quos itaque. Magnam tempora adipisci pariatur numquam, harum porro delectus voluptate mollitia velit officiis illo. Deserunt, alias similique?",
    isExpanded: false,
  },
]);

const toggleAccordion = index => {
  // Close all items first
  faqItems.value.forEach((item, i) => {
    item.isExpanded = i === index ? !item.isExpanded : false;
  });
};
</script>

<style lang="scss">
:root {
  --fontColor: #4d5974;
  --boxBottomBd: #e5e5e5;
  --btnColor: #7288a2;
  --btnHoverColor: #03b5d2;
}

.faq-accordion {
  width: 48rem;
  padding: 4rem;
  margin: 0 auto;
  color: var(--fontColor);

  h2 {
    text-align: center;
  }

  .accordion {
    .box {
      border-bottom: 1px solid var(--boxBottomBd);

      &.is-active {
        .btn {
          color: var(--btnHoverColor);
          border-bottom: 1px solid;

          .icon::after {
            width: 0;
          }
        }

        .content {
          height: auto;
          max-height: 20em; /* Adjust based on your content */
        }
      }

      .btn {
        width: 100%;
        text-align: left;
        padding: 1em 0;
        color: var(--btnColor);
        font-size: 1.15rem;
        border: none;
        background: none;
        outline: none;
        cursor: pointer;
        position: relative;
        transition: color 0.3s ease;

        &:hover {
          color: var(--btnHoverColor);
        }

        .title {
          padding: 1em 0;
          display: inline-block;
        }

        .icon {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid;
          border-radius: 11px;
          position: absolute;
          right: 0;
          top: 18px;
          transition: all 0.3s ease;

          &::before,
          &::after {
            content: "";
            position: absolute;
            background-color: currentColor;
            transition: all 0.3s ease;
          }

          &::before {
            width: 10px;
            height: 2px;
            left: 5px;
            top: 9px;
          }

          &::after {
            width: 2px;
            height: 10px;
            top: 5px;
            left: 9px;
          }
        }
      }

      .content {
        height: 0;
        overflow: hidden;
        transition: height 0.5s ease;

        p {
          font-weight: 300;
          margin: 2em 0;
        }
      }
    }
  }
}
</style>
