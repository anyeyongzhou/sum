// 定义压缩函数
export default function compressImage(file, maxWidth, maxHeight, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 加载图片
    img.src = URL.createObjectURL(file);
    img.onload = function () {
      let targetWidth = img.width;
      let targetHeight = img.height;

      // 根据最大宽度和最大高度计算目标尺寸
      if (targetWidth > maxWidth) {
        targetWidth = maxWidth;
        targetHeight = (targetWidth / img.width) * img.height;
      }
      if (targetHeight > maxHeight) {
        targetHeight = maxHeight;
        targetWidth = (targetHeight / img.height) * img.width;
      }

      // 设置canvas尺寸
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 绘制压缩后的图片
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // 将canvas转换为Blob对象
      canvas.toBlob(
        blob => {
          resolve(blob);
        },
        file.type || "image/jpeg",
        quality
      );
    };

    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
  });
}
