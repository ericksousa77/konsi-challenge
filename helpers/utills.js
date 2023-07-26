export const getSrcFromFrame = htmlString => {
  const pattern = /<frame src="(.*?)" frameborder="0">/

  const match = htmlString.match(pattern)

  if (!match) {
    console.log('URL não encontrada.')
  }

  const url = match[1]

  return url
}

export const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
