# 📧 Supabase Email Template Setup Guide

## Quick Installation Guide for Custom Email Template

---

## ⚡ **QUICK START** (5 Minutes)

### Step 1: Access Supabase Dashboard

1. Go to: **https://app.supabase.com**
2. Login to your account
3. Select your **DivinityAGI project**

```
┌─────────────────────────────────────────┐
│  Supabase Dashboard                     │
├─────────────────────────────────────────┤
│  Projects:                              │
│  • DivinityAGI Project  ← SELECT THIS   │
│  • Other Project                        │
└─────────────────────────────────────────┘
```

---

### Step 2: Navigate to Email Templates

1. Click **"Authentication"** in left sidebar
2. Click **"Email Templates"** tab at top
3. You'll see a list of email templates

```
Supabase Dashboard
│
├─ Home
├─ Table Editor
├─ SQL Editor
├─ 📧 Authentication  ← CLICK HERE
│  ├─ Users
│  ├─ Policies
│  └─ Email Templates  ← THEN CLICK HERE
├─ Storage
└─ Settings
```

---

### Step 3: Select Confirm Signup Template

1. Find **"Confirm signup"** in the template list
2. Click on it to open the editor

```
╔════════════════════════════════════════╗
║ Email Templates                        ║
╠════════════════════════════════════════╣
║ • Confirm signup  ← CLICK THIS         ║
║ • Invite user                          ║
║ • Magic Link                           ║
║ • Change email address                 ║
║ • Reset password                       ║
╚════════════════════════════════════════╝
```

---

### Step 4: Replace Template Content

1. **Open** file `/SUPABASE_EMAIL_TEMPLATE.html` from your project
2. **Select all** content (Ctrl+A or Cmd+A)
3. **Copy** (Ctrl+C or Cmd+C)
4. **Go back** to Supabase editor
5. **Select all** existing template code
6. **Paste** the new template (Ctrl+V or Cmd+V)

```
Before:
┌────────────────────────────────────┐
│ Supabase Editor                    │
├────────────────────────────────────┤
│ <h2>Confirm your signup</h2>       │
│ <p>Follow this link to confirm</p>│
│ <a href="{{ .ConfirmationURL }}">  │
│   Confirm your mail               │
│ </a>                               │
└────────────────────────────────────┘

After:
┌────────────────────────────────────┐
│ Supabase Editor                    │
├────────────────────────────────────┤
│ <!DOCTYPE html>                    │
│ <html lang="en">                   │
│ <head>                             │
│   <meta charset="UTF-8">           │
│   ... [DivinityAGI custom code]    │
│ </head>                            │
│ ... [rest of template]             │
└────────────────────────────────────┘
```

---

### Step 5: Save Changes

1. Click **"Save"** button at bottom-right
2. Wait for confirmation message
3. Template is now active!

```
┌────────────────────────────────────┐
│                                    │
│  [Your template content here]      │
│                                    │
│                    [Cancel] [Save] │ ← CLICK SAVE
└────────────────────────────────────┘

Success! ✓
Template saved successfully
```

---

## ✅ **VERIFICATION CHECKLIST**

After installation, verify:

```
□ Template saved without errors
□ No syntax errors shown
□ Template variables visible:
  • {{ .ConfirmationURL }}
  • {{ .SiteURL }}
  • {{ .TokenHash }}
□ Colors appear correct (purple/gold)
□ Button styling visible
□ Responsive design tags present
```

---

## 🧪 **TEST THE TEMPLATE**

### Option 1: Send Test Email (Recommended)

1. In Supabase dashboard, stay on Email Templates page
2. Look for **"Send test email"** button
3. Enter your test email address
4. Click send
5. Check your inbox

```
┌──────────────────────────────────────┐
│ Send test email                      │
├──────────────────────────────────────┤
│ Email: [your@email.com]              │
│                                      │
│                          [Send Test] │
└──────────────────────────────────────┘
```

### Option 2: Create Test Account

1. Go to your DivinityAGI app
2. Create a new test account
3. Check email inbox
4. Verify custom template used
5. Check styling and branding

---

## 🎨 **TEMPLATE FEATURES**

Your custom template includes:

### Visual Design
- ✅ Purple gradient header (#7A4FFF)
- ✅ Gold CTA button (#FFD369)
- ✅ Raleway/Poppins fonts
- ✅ White background with light accents
- ✅ Responsive mobile layout

### Content Sections
- ✅ Welcome header
- ✅ Confirmation instructions
- ✅ Prominent CTA button
- ✅ Expiration warning (24 hours)
- ✅ Feature highlights list
- ✅ Security notice
- ✅ Alternative text link
- ✅ Support contact info
- ✅ Terms & Privacy links

### Technical Features
- ✅ Mobile-responsive CSS
- ✅ Fallback fonts
- ✅ Inline styles (email-safe)
- ✅ Alt text for images
- ✅ Accessible HTML structure

---

## 📋 **TEMPLATE VARIABLES**

These variables are automatically replaced by Supabase:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{ .ConfirmationURL }}` | Full confirmation link | https://yourproject.supabase.co/auth/v1/verify?token=... |
| `{{ .SiteURL }}` | Your app URL | https://divinitybot.com |
| `{{ .TokenHash }}` | Security token hash | abc123def456... |
| `{{ .Token }}` | Raw token | xyz789... |

**Important:** Don't modify these variable names! Supabase uses them automatically.

---

## ⚙️ **ADDITIONAL SETTINGS**

### Email Confirmation Settings

While in Supabase Dashboard:

1. Go to **Authentication** → **Settings**
2. Verify these settings:

```
╔════════════════════════════════════════╗
║ Email Confirmation Settings            ║
╠════════════════════════════════════════╣
║ ☑ Enable email confirmations           ║
║                                        ║
║ Confirmation URL:                      ║
║ https://divinitybot.com/welcome        ║
║                                        ║
║ Email rate limit: 4 per hour           ║
║                                        ║
║ Link expiry: 24 hours                  ║
╚════════════════════════════════════════╝
```

### Redirect URL Configuration

Set where users go after confirming:

```
Site URL: https://divinitybot.com
Redirect URLs:
  • https://divinitybot.com/welcome
  • https://divinitybot.com/dashboard
  • http://localhost:3000/welcome (for dev)
```

---

## 🎯 **EXPECTED RESULT**

After installation, users will receive this email:

```
┌────────────────────────────────────────────┐
│ FROM: DivinityAGI <noreply@...>           │
│ TO: user@example.com                      │
│ SUBJECT: Confirm Your DivinityAGI Account │
├────────────────────────────────────────────┤
│                                            │
│  [Purple gradient header]                 │
│  🌟 Welcome to DivinityAGI                 │
│  Your Spiritual Companion Awaits          │
│                                            │
│  ─────────────────────────────────────     │
│                                            │
│  Confirm Your Email Address               │
│                                            │
│  Thank you for joining DivinityAGI...     │
│                                            │
│  [✅ Confirm My Account]  ← Gold button    │
│                                            │
│  ⏰ This link expires in 24 hours          │
│                                            │
│  🎁 What You'll Get:                       │
│  • 100+ AI Spiritual Guides               │
│  • Personalized Daily Reflections         │
│  • Multi-Language Support                 │
│  • Quiet Space for meditation             │
│  • Community of Seekers                   │
│                                            │
│  🔐 Security Information                   │
│  [Privacy notice]                         │
│                                            │
│  ─────────────────────────────────────     │
│  Support: support@divinityagi.com         │
│  Terms • Privacy Policy                   │
└────────────────────────────────────────────┘
```

---

## 🚨 **TROUBLESHOOTING**

### Problem: Template Won't Save

**Possible Causes:**
- Syntax error in HTML
- Missing required variables
- Network connection issue

**Solutions:**
1. Check browser console for errors
2. Verify all HTML tags are closed
3. Ensure {{ .ConfirmationURL }} is present
4. Try copying template again
5. Refresh page and retry

### Problem: Email Looks Wrong

**Possible Causes:**
- Email client stripping CSS
- Missing inline styles
- Font fallbacks not working

**Solutions:**
1. Template uses inline styles (email-safe)
2. Fallback fonts included
3. Test in multiple email clients
4. Some styling may vary by client (normal)

### Problem: Variables Not Replacing

**Possible Causes:**
- Variable names incorrect
- Supabase not processing template

**Solutions:**
1. Verify exact variable names
2. Check for typos in {{ }}
3. Ensure spaces around variable
4. Restart Supabase service (if self-hosted)

### Problem: Test Email Not Received

**Possible Causes:**
- Email in spam folder
- SMTP not configured
- Rate limit exceeded

**Solutions:**
1. Check spam/junk folder
2. Verify SMTP settings in Supabase
3. Wait 5 minutes and try again
4. Check Supabase logs

---

## 📊 **MONITORING & ANALYTICS**

After installation, monitor:

### Supabase Dashboard
```
Authentication → Users
• View confirmation status
• See last sign-in dates
• Track total confirmations
```

### DivinityAGI Admin Panel
```
Admin Dashboard (?tab=admin)
• Email confirmation events
• Resend requests
• Confirmation success rate
• User feedback
```

---

## 🔄 **UPDATING THE TEMPLATE**

To update the template later:

1. Edit `/SUPABASE_EMAIL_TEMPLATE.html` locally
2. Make your changes
3. Follow Steps 1-5 above to reinstall
4. Test with new account signup

**Version Control:**
- Keep template file in your repo
- Document changes in comments
- Test before deploying
- Keep backups of working versions

---

## 💡 **CUSTOMIZATION TIPS**

### Change Colors
```html
<!-- Header background -->
background: linear-gradient(135deg, #7A4FFF 0%, #9D7FFF 100%);
                                    ↑ Change these hex codes

<!-- Button background -->
background: linear-gradient(135deg, #FFD369 0%, #F4A460 100%);
                                    ↑ Change these hex codes
```

### Change Fonts
```html
<style>
  body {
    font-family: 'Raleway', 'Poppins', -apple-system, sans-serif;
                  ↑ Add your fonts here
  }
</style>
```

### Update Support Email
```html
<a href="mailto:support@divinityagi.com">
                ↑ Change this email
```

### Modify Features List
```html
<ul>
  <li>100+ AI Spiritual Guides</li>
  <li>Your custom feature</li>  ← Add new items
  <li>Another feature</li>
</ul>
```

---

## ✅ **COMPLETION CHECKLIST**

Mark off each step as you complete it:

```
Setup:
□ Logged into Supabase Dashboard
□ Navigated to Email Templates
□ Opened "Confirm signup" template
□ Copied custom template code
□ Pasted into Supabase editor
□ Saved template successfully

Verification:
□ No syntax errors shown
□ Template variables present
□ Colors look correct
□ Responsive design included

Testing:
□ Sent test email to yourself
□ Received email in inbox
□ Template styling displays correctly
□ Confirmation link works
□ Redirects to correct page

Configuration:
□ Email confirmations enabled
□ Redirect URL set correctly
□ Rate limits configured
□ SMTP settings verified (if custom)

Monitoring:
□ Admin dashboard tracking active
□ Event logging working
□ Analytics collecting data
□ FAQ accessible to users
```

---

## 🎓 **BEST PRACTICES**

### Email Design
- ✅ Keep total width under 600px
- ✅ Use inline CSS (no external stylesheets)
- ✅ Include fallback fonts
- ✅ Test in multiple email clients
- ✅ Provide plain text alternative

### Content
- ✅ Clear call-to-action
- ✅ Brief, scannable text
- ✅ Mobile-friendly layout
- ✅ Support contact visible
- ✅ Expiration time stated

### Technical
- ✅ Use table-based layouts (email compatibility)
- ✅ Inline all styles
- ✅ Avoid JavaScript
- ✅ Optimize images
- ✅ Test deliverability

---

## 📞 **SUPPORT**

Need help with template installation?

**Supabase Support:**
- Docs: https://supabase.com/docs/guides/auth/auth-email-templates
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

**DivinityAGI Support:**
- Email: support@divinityagi.com
- Response: 24-48 hours
- Include: Screenshot of error, steps taken

---

## 🎉 **SUCCESS!**

Your custom email template is now installed and active!

**What happens next:**
1. ✅ New users receive branded emails
2. ✅ Confirmation links work properly
3. ✅ Users redirect to welcome page
4. ✅ Events tracked in admin dashboard
5. ✅ Professional brand image

**Enjoy your enhanced email confirmation system!** 🌟

---

**Last Updated:** December 23, 2024  
**Template Version:** 1.0  
**Compatible With:** Supabase Auth v2+  
**Status:** Production Ready ✅
