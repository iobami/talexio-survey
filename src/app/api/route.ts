export const dynamic = 'force-dynamic'
export async function GET () {
  const data = { message: 'API entry!' }

  return Response.json({ data })
}
