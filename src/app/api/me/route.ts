// GET /api/me  —— 简单模拟：有 Authorization 就返回 profile，否则 401
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  // 这里不校验 token 内容，真实项目按需校验
  return Response.json({ id: 'u_1', email: 'demo@starlab.dev', name: 'Star Demo' });
}
