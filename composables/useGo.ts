export function useGo() {
  // TODO: 替換網址
  const goProduct = async (id: string) => {
    await navigateTo(`http://localhost:3000/product/${id}`, {
      open: {
        target: '_blank',
      },
    })
  }

  return {
    goProduct,
  }
}
