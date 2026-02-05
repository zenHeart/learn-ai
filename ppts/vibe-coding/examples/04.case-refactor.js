// 重构示例：将重复逻辑提取为工具函数
function capitalizeWords(str) {
  return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

module.exports = { capitalizeWords };
