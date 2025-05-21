export function useGridLayout(items, cells, nextItemNumber, pulseItems) {
  // 保存布局到本地存储
  const saveLayout = () => {
    const layout = items.map((item) => ({
      position: item.position,
      number: item.number,
      color: item.color,
      shape: item.shape,
    }));

    localStorage.setItem("gridLayout", JSON.stringify(layout));
    alert("布局已保存!");
  };

  // 从本地存储加载布局
  const loadLayout = () => {
    const savedLayout = localStorage.getItem("gridLayout");
    if (savedLayout) {
      // 清空当前布局
      items.length = 0;

      // 加载保存的布局
      const layout = JSON.parse(savedLayout);

      // 找出最大的编号
      let maxNumber = 0;

      layout.forEach((item) => {
        const newItem = {
          id: Date.now() + Math.random(),
          position: item.position,
          number: parseInt(item.number),
          color: item.color,
          shape: item.shape,
        };

        items.push(newItem);
        pulseItems.value.push(newItem.id);

        if (newItem.number > maxNumber) {
          maxNumber = newItem.number;
        }
      });

      // 更新下一个编号
      nextItemNumber.value = maxNumber + 1;

      // 清除动画效果
      setTimeout(() => {
        pulseItems.value = [];
      }, 500);

      alert("布局已加载!");
    } else {
      alert("没有找到保存的布局!");
    }
  };

  return {
    saveLayout,
    loadLayout,
  };
}
