# 🚀 Deploying to Netlify

This guide will walk you through deploying your Hobby Finder website to Netlify with full CMS functionality.

## ✨ Why Netlify?

- ✅ **Built-in OAuth** - No separate OAuth server needed!
- ✅ **Netlify Identity** - Handles user authentication automatically
- ✅ **Git Gateway** - Seamlessly integrates with your GitHub repo
- ✅ **Automatic deployments** - Push to GitHub = instant deploy
- ✅ **Free tier** - More than enough for this project
- ✅ **Fast global CDN** - Lightning-fast page loads worldwide
- ✅ **Free HTTPS** - Automatic SSL certificates

## 📋 Prerequisites

- GitHub account (you already have this)
- Your repository pushed to GitHub (done ✅)

## 🎯 Step-by-Step Deployment

### Step 1: Sign Up for Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Netlify to access your GitHub account

### Step 2: Import Your Project

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. You may need to authorize Netlify to access your repositories
4. Find and select your repository: **`tstacntlol/testclaude`**
5. Select the branch: **`claude/hobby-finder-website-YlMk0`**

### Step 3: Configure Build Settings

Netlify should auto-detect that this is a static site. Verify these settings:

- **Branch to deploy**: `claude/hobby-finder-website-YlMk0`
- **Build command**: Leave empty (or use `.` if required)
- **Publish directory**: `.` (current directory)

Click **"Deploy site"**

🎉 Your site will start deploying! This takes about 30-60 seconds.

### Step 4: Get Your Site URL

Once deployed, you'll see your site URL. It will look like:
```
https://random-name-123456.netlify.app
```

You can customize this later in **Site settings** → **Domain management** → **Change site name**

### Step 5: Enable Netlify Identity (CRITICAL for CMS)

This is the most important step for the CMS to work!

1. In your Netlify dashboard, go to **Site settings**
2. Click **"Identity"** in the left sidebar
3. Click **"Enable Identity"**
4. Scroll down to **"Registration preferences"**
   - Select **"Invite only"** (recommended for security)
   - This means you control who can access the CMS
5. Scroll down to **"Git Gateway"**
6. Click **"Enable Git Gateway"**
   - This allows the CMS to save changes back to GitHub

### Step 6: Invite Users to the CMS

1. Go to **Identity** tab in your Netlify dashboard
2. Click **"Invite users"**
3. Enter the email address of the person who will manage the site
4. Click **"Send"**
5. They'll receive an email invitation
6. They click the link and set a password

**Important:** The invited user must accept the invitation and create a password before they can use the CMS.

### Step 7: Access the CMS

1. Go to your Netlify site URL: `https://your-site.netlify.app/admin`
2. You'll see a login screen
3. Click **"Login with Netlify Identity"**
4. Enter the email and password you created
5. You're in! 🎉

### Step 8: Test the CMS

1. Click **"Evenementen"** (Events)
2. Click **"New Evenement"**
3. Fill in the event details
4. Click **"Publish"** → **"Publish now"**
5. Wait ~30 seconds for Netlify to rebuild
6. Refresh your main site - your new event should appear!

## 🎨 Customize Your Domain (Optional)

### Option 1: Use a Netlify Subdomain

1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change from `random-name-123456` to something like `hobby-finder`
4. Your site becomes: `https://hobby-finder.netlify.app`

### Option 2: Use Your Own Domain

If you have a custom domain (e.g., `www.hobbyfinder.be`):

1. Go to **Domain management** → **Add custom domain**
2. Enter your domain name
3. Follow Netlify's instructions to:
   - Update your DNS settings
   - Netlify automatically provisions SSL certificate
4. Your site will be available at your custom domain with HTTPS

## 🔐 Security Best Practices

### Recommended Identity Settings:

1. **Registration**: Set to "Invite only"
2. **External providers**: Disable unless needed
3. **Email confirmation**: Enable (on by default)
4. **Autoconfirm**: Disable (requires email verification)

### Invite Only Users Who Need Access:

- Site administrators
- Content managers
- Staff who will add events

Don't share the CMS login publicly!

## 🔄 How Updates Work

### Automatic Deployment Flow:

1. Someone edits content in the CMS
2. CMS commits changes to GitHub
3. Netlify detects the commit
4. Netlify rebuilds the site (30-60 seconds)
5. Changes go live automatically

### Manual Updates (for developers):

1. Push changes to your GitHub repository
2. Netlify auto-deploys within 1 minute
3. Check the **"Deploys"** tab in Netlify to see status

## 📊 Monitoring Your Site

### Deploy Status:

- **Deploys** tab shows all deployments
- Green checkmark = successful
- Red X = failed (check the logs)

### Analytics (Optional):

Netlify offers free analytics:
- Go to **Analytics** tab
- Enable Netlify Analytics ($9/month, optional)

Or use Google Analytics (free):
- Add tracking code to your site

## 🐛 Troubleshooting

### CMS shows "Config Error"
- Check that `admin/config.yml` has `name: git-gateway`
- Make sure Git Gateway is enabled in Netlify Identity settings

### Can't login to CMS
- Verify you've enabled Netlify Identity
- Check that you've accepted the invitation email
- Try resetting password from the login screen

### Changes don't appear on site
- Check **Deploys** tab - wait for deployment to finish
- Hard refresh the page (Ctrl+Shift+R)
- Clear browser cache

### Events not loading
- Open browser console (F12) and check for errors
- Verify event files exist in `content/events/` folder
- Check that events have valid dates and `active: true`

## 💰 Cost Breakdown

### Netlify Free Tier Includes:

- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ 1000 Identity users
- ✅ Instant rollbacks

**Perfect for this project - you won't need to pay anything!**

## 🎓 Next Steps

### After Deployment:

1. ✅ Share the site URL with stakeholders
2. ✅ Invite content managers to the CMS
3. ✅ Add some real events
4. ✅ Test the contact form
5. ✅ Consider adding a custom domain
6. ✅ Set up form handling (Netlify Forms)

### Future Enhancements:

- **Contact Form**: Use Netlify Forms (built-in, free)
- **Analytics**: Add Google Analytics
- **SEO**: Add meta tags for better search visibility
- **Email Notifications**: Set up deployment notifications

## 📞 Getting Help

- **Netlify Docs**: https://docs.netlify.com
- **Netlify Support**: https://answers.netlify.com
- **Decap CMS Docs**: https://decapcms.org/docs

## ✨ Comparison: GitHub Pages vs Netlify

| Feature | GitHub Pages | Netlify |
|---------|--------------|---------|
| **CMS OAuth** | ❌ Needs separate server | ✅ Built-in |
| **Setup Complexity** | 🟡 Medium | 🟢 Easy |
| **Deploy Speed** | 1-2 minutes | 30-60 seconds |
| **Custom Domains** | ✅ Free | ✅ Free |
| **HTTPS** | ✅ Auto | ✅ Auto |
| **Form Handling** | ❌ No | ✅ Built-in |
| **Deploy Previews** | ❌ No | ✅ Yes |
| **Rollbacks** | 🟡 Manual | ✅ One-click |

**Verdict**: Netlify is significantly easier for this use case!

---

🎉 **Congratulations!** You now have a fully functional, accessible website with an easy-to-use CMS, deployed on a fast global CDN, all for free!
