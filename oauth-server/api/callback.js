// OAuth callback endpoint for Decap CMS
// This handles the response from GitHub and exchanges the code for a token

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send('OAuth credentials not configured');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).send(`OAuth error: ${data.error_description || data.error}`);
    }

    // Return HTML that posts the token back to the CMS window
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorization Success</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .message {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .success {
      color: #28a745;
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="message">
    <div class="success">✓</div>
    <h1>Authorization Successful!</h1>
    <p>You can close this window and return to the CMS.</p>
  </div>
  <script>
    // Post the token to the parent window (Decap CMS)
    (function() {
      function receiveMessage(e) {
        console.log("Received message:", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify(data)}',
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      // Send the auth success message
      console.log("Sending message to opener");
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify(data)}',
        window.location.origin
      );

      // Close window after 2 seconds
      setTimeout(function() {
        window.close();
      }, 2000);
    })();
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).send('Internal server error during authentication');
  }
}
