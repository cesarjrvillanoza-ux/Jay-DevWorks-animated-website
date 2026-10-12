export async function verifyTurnstile(secret, token, ip, fetchImpl = fetch) {
  if (!secret || !token || typeof token !== 'string' || token.length > 2048) {
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', token);
    if (ip) {
      params.append('remoteip', ip);
    }

    const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data && data.success === true;
  } catch (err) {
    return false;
  }
}
