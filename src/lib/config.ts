const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''

const config = {
  baseUrl,
  GOOGLE_SHEET_URL: 'https://script.google.com/macros/s/AKfycby1eP-eB7IvHRedyDOti_vRI-zyypVNVRwuzFJOubJlUEAv83QMf4NLvbiyL5S_g3MmAA/exec',
  pagination: { PageNumber: '1', PageSize: '10' },
  tokenKey: 'str-weer-tkey',
  tourKey: 'str-tour-poiu'
}

export default config
