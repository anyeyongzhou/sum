import { App, DirectiveBinding } from "vue";

/*
 * 定义自定义指令
 *
 * <span v-tooltip-ellipsis="text">{{ text }}</span>
 */
const vTooltipEllipsis = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const text = binding.value;
    const tooltipText = document.createElement("span");
    tooltipText.textContent = text;
    tooltipText.style.position = "absolute";
    tooltipText.style.left = "0";
    tooltipText.style.top = "0px";
    tooltipText.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    tooltipText.style.color = "white";
    tooltipText.style.padding = "0px 10px";
    tooltipText.style.borderRadius = "4px";
    tooltipText.style.whiteSpace = "nowrap";
    tooltipText.style.zIndex = "1000";
    tooltipText.style.opacity = "0";
    tooltipText.style.transition = "opacity 0.2s ease-in-out";

    el.appendChild(tooltipText);

    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";

    // 检测 span 的宽度
    const originalWidth = el.offsetWidth;
    el.style.width = "auto"; // 临时取消宽度限制
    const textWidth = el.offsetWidth;
    el.style.width = `${originalWidth}px`; // 恢复原始宽度

    // 设置初始状态
    if (textWidth > originalWidth) {
      el.style.textOverflow = "ellipsis";
      el.style.textDecoration = "line-through"; // 可以根据需要设置样式
    } else {
      el.style.textOverflow = "clip";
      el.style.textDecoration = "none";
    }

    el.addEventListener("mouseenter", () => {
      tooltipText.style.opacity = "1";
    });

    el.addEventListener("mouseleave", () => {
      tooltipText.style.opacity = "0";
    });
  },
  unmounted(el: HTMLElement) {
    const tooltipText = el.querySelector("span");
    if (tooltipText) {
      el.removeChild(tooltipText);
    }
  },
};

export function setTooltipEllipsis(app: App) {
  app.directive("tooltip-ellipsis", vTooltipEllipsis);
}
