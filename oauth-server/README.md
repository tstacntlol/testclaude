# Decap CMS OAuth Server

This is a simple OAuth server for authenticating Decap CMS with GitHub on static sites like GitHub Pages.

## 🚀 Quick Deployment to Vercel

### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: `Hobby Finder CMS` (or any name you prefer)
   - **Homepage URL**: `https://tstacntlol.github.io/testclaude`
   - **Authorization callback URL**: `https://YOUR-VERCEL-APP.vercel.app/api/callback`
     - ⚠️ You'll update this after deployment - for now use a placeholder
4. Click **"Register application"**
5. **Save the Client ID** (you'll need this)
6. Click **"Generate a new client secret"**
7. **Save the Client Secret** (you'll need this too)

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the oauth-server directory:
   ```bash
   cd oauth-server
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No**
   - Project name? **hobby-finder-oauth** (or any name)
   - Directory? **./oauth-server** (should be already set)
   - Override settings? **No**

6. Add environment variables:
   ```bash
   vercel env add OAUTH_CLIENT_ID
   ```
   Paste your GitHub Client ID when prompted. Select **Production, Preview, and Development**.

   ```bash
   vercel env add OAUTH_CLIENT_SECRET
   ```
   Paste your GitHub Client Secret when prompted. Select **Production, Preview, and Development**.

7. Deploy to production:
   ```bash
   vercel --prod
   ```

8. **Save your deployment URL** (e.g., `https://hobby-finder-oauth.vercel.app`)

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository (connect GitHub if needed)
4. Configure:
   - **Root Directory**: `oauth-server`
   - **Framework Preset**: Other
5. Add Environment Variables:
   - `OAUTH_CLIENT_ID`: Your GitHub Client ID
   - `OAUTH_CLIENT_SECRET`: Your GitHub Client Secret
6. Click **"Deploy"**
7. **Save your deployment URL**

### Step 3: Update GitHub OAuth App

1. Go back to your [GitHub OAuth App settings](https://github.com/settings/developers)
2. Click on your OAuth App
3. Update the **Authorization callback URL** to:
   ```
   https://YOUR-VERCEL-APP.vercel.app/api/callback
   ```
   (Replace `YOUR-VERCEL-APP` with your actual Vercel app URL)
4. Click **"Update application"**

### Step 4: Update Decap CMS Config

1. Open `admin/config.yml` in your repository
2. Update the backend configuration:
   ```yaml
   backend:
     name: github
     repo: tstacntlol/testclaude
     branch: claude/hobby-finder-website-YlMk0
     base_url: https://YOUR-VERCEL-APP.vercel.app
     auth_endpoint: /api/auth
   ```
3. Commit and push the changes
4. Wait for GitHub Pages to rebuild (1-2 minutes)

### Step 5: Test It Out!

1. Navigate to `https://tstacntlol.github.io/testclaude/admin`
2. Click **"Login with GitHub"**
3. You should be redirected to GitHub to authorize
4. After authorizing, you'll be redirected back to the CMS
5. You can now manage your content! 🎉

## 🔧 How It Works

1. User clicks "Login with GitHub" in Decap CMS
2. CMS redirects to `/api/auth` on your Vercel app
3. Vercel redirects to GitHub's OAuth authorization page
4. User authorizes the app
5. GitHub redirects back to `/api/callback` with an auth code
6. Vercel exchanges the code for an access token
7. Token is sent back to the CMS via postMessage
8. CMS uses the token to make authenticated API requests to GitHub

## 🔒 Security Notes

- Never commit your Client Secret to Git
- Use Vercel's environment variables to store secrets
- The OAuth server only handles authentication - it doesn't store any data
- Each deployment gets its own secure environment

## 🐛 Troubleshooting

**"OAuth credentials not configured"**
- Make sure you added the environment variables in Vercel
- Redeploy after adding environment variables

**"Redirect URI mismatch"**
- Make sure the callback URL in GitHub matches your Vercel deployment URL exactly
- Check for trailing slashes - they matter!

**CMS still shows white page**
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check browser console for errors
- Verify the `base_url` in `admin/config.yml` matches your Vercel URL

## 📝 Cost

Vercel's Hobby plan is **free** and includes:
- 100 GB bandwidth per month
- Unlimited API requests
- More than enough for this use case

## 🆘 Need Help?

Check the [Decap CMS documentation](https://decapcms.org/docs/authentication-backends/) for more information.
