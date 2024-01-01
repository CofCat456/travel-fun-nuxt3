// 轉換 Map
export function mapToArray(map: any) {
  return Array.from(map, ([key, value]) => ({ label: value, value: key }))
}
