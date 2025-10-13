// GET /api/boom  -> 用于模拟 500
export async function GET() {
  return new Response(JSON.stringify({ message: 'Something exploded' }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
}
