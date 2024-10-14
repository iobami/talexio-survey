const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

const config = {
  baseUrl,
  GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/al8tVMs335cJfR3bSwvkAGaUl8U1Atb2KNFpLyxstdpFmGkshYNYIPpi5IeiGaDbKw/exec',
  pagination: { PageNumber: '1', PageSize: '10' },
  tokenKey: 'str-weer-tkey',
  tourKey: 'str-tour-poiu'
}

export default config
