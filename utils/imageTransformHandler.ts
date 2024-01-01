// 轉換照片格式
export function imageTransformHandler(file: any) {
  if (!file)
    return null

  const formData = new FormData()
  formData.append('file-to-upload', file)
  return formData
}
