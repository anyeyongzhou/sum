<template>
  <div class="menu-container">
    <ul class="list">
      <li
        v-for="(chapter, chapterIndex) in menuData"
        :key="'chapter-' + chapterIndex"
      >
        <p class="title" @click="toggleMenu($event, chapterIndex)">
          {{ chapter.name }} <i class="icon"></i>
        </p>
        <ul class="submenu1" v-show="chapter.expanded">
          <li
            v-for="(unit, unitIndex) in chapter.units"
            :key="'unit-' + unitIndex"
          >
            <p v-if="!unit.counts" @click="noAction">{{ unit.name }}</p>
            <template v-else>
              <p
                class="title"
                @click="toggleMenu($event, chapterIndex, unitIndex)"
              >
                {{ unit.name }} <i class="icon"></i>
              </p>
              <ul class="submenu2" v-show="unit.expanded">
                <li
                  v-for="(count, countIndex) in unit.counts"
                  :key="'count-' + countIndex"
                >
                  <p @click="noAction">{{ count }}</p>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const menuData = ref([
  {
    name: "chapter1",
    expanded: false,
    units: [
      { name: "unit1" },
      { name: "unit2" },
      {
        name: "unit3",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
      {
        name: "unit4",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
    ],
  },
  {
    name: "chapter2",
    expanded: false,
    units: [
      { name: "unit1" },
      { name: "unit2" },
      {
        name: "unit3",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
      {
        name: "unit4",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
    ],
  },
  {
    name: "chapter3",
    expanded: false,
    units: [
      { name: "unit1" },
      { name: "unit2" },
      {
        name: "unit3",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
      {
        name: "unit4",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
    ],
  },
  {
    name: "chapter4",
    expanded: false,
    units: [
      { name: "unit1" },
      { name: "unit2" },
      {
        name: "unit3",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
      {
        name: "unit4",
        expanded: false,
        counts: ["count1", "count2", "count3"],
      },
    ],
  },
]);

const toggleMenu = (event, chapterIndex, unitIndex = null) => {
  event.stopPropagation();

  if (unitIndex === null) {
    // Toggle chapter
    menuData.value.forEach((chapter, index) => {
      if (index === chapterIndex) {
        chapter.expanded = !chapter.expanded;
      } else {
        chapter.expanded = false;
        // Also collapse all units in other chapters
        chapter.units.forEach(unit => {
          if (unit.counts) unit.expanded = false;
        });
      }
    });
  } else {
    // Toggle unit
    menuData.value[chapterIndex].units.forEach((unit, index) => {
      if (unit.counts) {
        if (index === unitIndex) {
          unit.expanded = !unit.expanded;
        } else {
          unit.expanded = false;
        }
      }
    });
  }
};

const noAction = event => {
  event.stopPropagation();
  // Do nothing for non-expandable items
};
</script>

<style lang="scss">
@font-face {
  font-family: "newFont";
  src: url("./SingleMalta.ttf");
}

.menu-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(#fff, #333);
  font-family: "newFont";
  display: flex;
  justify-content: center;
  padding-top: 50px;

  .list {
    width: 300px;
    background: #333;
    border-radius: 8px;

    p {
      position: relative;
      color: deepskyblue;
      cursor: pointer;
      padding: 20px;
      border-bottom: 1px solid #fff;
      font-size: 20px;
      margin: 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    li:last-of-type p {
      border-bottom: 0;
    }

    .icon {
      position: absolute;
      top: 16px;
      right: 16px;
      transition: all 0.4s;

      &::before {
        content: "+";
      }
    }

    /* Submenu styles */
    .submenu1 {
      background: #666;

      p {
        font-size: 18px;
        padding: 15px 15px 15px 30px;
      }
    }

    .submenu2 {
      background: #aaa;

      p {
        font-size: 16px;
        padding: 10px 10px 10px 40px;
      }
    }

    /* Active state styles */
    .active > .title {
      color: orange;

      .icon::before {
        content: "-";
      }

      .icon {
        transform: rotateZ(180deg);
      }
    }
  }
}
</style>
