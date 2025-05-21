// composables/useScrollPosition.ts
import { onMounted, onBeforeUnmount } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useScrollStore } from "/@/stores/scrollStore";

export function useScrollPosition(key: string) {
  const scrollStore = useScrollStore();
  let scrollTimer: ReturnType<typeof setTimeout> | null = null;

  const saveScroll = (container: HTMLElement) => {
    scrollStore.savePosition(key, container.scrollTop);
  };

  const restoreScroll = (container: HTMLElement) => {
    container.scrollTop = scrollStore.getPosition(key);
  };

  const handleScroll = (container: HTMLElement) => {
    if (scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => saveScroll(container), 100);
  };

  const setupScrollListener = (container: HTMLElement) => {
    container.addEventListener("scroll", () => handleScroll(container));
    return () =>
      container.removeEventListener("scroll", () => handleScroll(container));
  };

  onMounted(() => {
    const container = document.querySelector(".home") as HTMLElement;
    if (container) {
      const cleanup = setupScrollListener(container);
      setTimeout(() => restoreScroll(container), 50);
      onBeforeUnmount(cleanup);
    }
  });

  onBeforeRouteLeave(() => {
    const container = document.querySelector(".home") as HTMLElement;
    if (container) saveScroll(container);
  });

  return {
    saveLastClicked: (path: string) => scrollStore.saveLastClicked(key, path),
    getLastClicked: () => scrollStore.getLastClicked(key),
  };
}
