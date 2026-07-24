// Protects /ops/* behind the mgs_ops_session cookie set by ops-login.
// Public: /ops/login/* only (plus the login function, which is under /.netlify/).
//
// Env: OPS_GATE_TOKEN (must match the cookie value issued on successful login)

const COOKIE_NAME = 'mgs_ops_session';

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Always allow the login UI
  if (path === '/ops/login' || path.startsWith('/ops/login/')) {
    return context.next();
  }

  // Only gate /ops/*
  if (!path.startsWith('/ops/') && path !== '/ops') {
    return context.next();
  }

  const expected = Deno.env.get('OPS_GATE_TOKEN') || '';
  if (!expected) {
    return new Response(
      'Ops gate not configured (OPS_GATE_TOKEN missing). Set env vars in Netlify, then redeploy.',
      { status: 503, headers: { 'content-type': 'text/plain; charset=utf-8' } }
    );
  }

  const cookieVal = context.cookies.get(COOKIE_NAME) || '';
  if (cookieVal === expected) {
    return context.next();
  }

  const next = path + (url.search || '');
  const login = new URL('/ops/login/', url.origin);
  login.searchParams.set('next', next.startsWith('/ops') ? next : '/ops/forms/');
  return Response.redirect(login.toString(), 302);
};

export const config = { path: ['/ops', '/ops/*'] };
