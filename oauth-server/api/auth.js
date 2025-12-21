// OAuth authentication endpoint for Decap CMS
// This initiates the GitHub OAuth flow

export default function handler(req, res) {
  const { host, provider } = req.query;

  if (provider !== 'github') {
    return res.status(400).json({ error: 'Only GitHub provider is supported' });
  }

  // Get client ID from environment variable
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return res.status(500).json({ error: 'OAuth client ID not configured' });
  }

  // Build the authorization URL
  const authUrl = new URL('https://github.com/login/oauth/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('scope', 'repo,user');
  authUrl.searchParams.append('redirect_uri', `https://${req.headers.host}/api/callback`);

  // Redirect to GitHub for authorization
  res.redirect(authUrl.toString());
}
