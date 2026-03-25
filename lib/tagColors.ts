// 标签颜色配置
// 使用预定义的颜色调色板，基于标签名称哈希分配颜色

interface TagColor {
  bg: string;
  text: string;
  border?: string;
}

// 预定义的标签颜色调色板
const TAG_COLORS: TagColor[] = [
  { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },    // 紫色
  { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },          // 蓝色
  { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' }, // 绿色
  { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },       // 琥珀色
  { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },          // 玫瑰色
  { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },          // 青色
  { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },    // 橙色
  { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },          // 粉色
  { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },          // 蓝绿色
  { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },    // 靛蓝色
  { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-200' },          // 青柠色
  { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200' },             // 天蓝色
];

// 简单的字符串哈希函数
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// 根据标签名称获取颜色
export function getTagColor(tag: string): TagColor {
  const hash = hashString(tag);
  const index = hash % TAG_COLORS.length;
  return TAG_COLORS[index];
}

// 获取标签的完整样式类名
export function getTagClassName(tag: string): string {
  const color = getTagColor(tag);
  return `px-2 py-1 text-xs ${color.bg} ${color.text} rounded`;
}