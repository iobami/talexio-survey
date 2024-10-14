const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

const config = {
  baseUrl,
  pagination: { PageNumber: '1', PageSize: '10' },
  tokenKey: 'str-weer-tkey',
  tourKey: 'str-tour-poiu'
}

export default config
