// 轉換日期 (ISO 8601 to 年/月/日)
export function formatDate2YMD(dateTimeString: number): string {
  const date = new Date(dateTimeString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // 將月份和日期補零成兩位數
  const formattedMonth = String(month).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')

  // 將年、月、日組合成「年/月/日」的格式
  const formattedDate = `${year}/${formattedMonth}/${formattedDay}`

  return formattedDate
}
