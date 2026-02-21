export function normalizeData(payload: any) {
  // 隐藏的 Bug：没有任何空值和类型校验，非常容易因为垃圾数据崩溃
  const items = payload.data.map((item: any) => ({
    id: item.userId,
    name: item.userName,
  }));

  return items;
}
