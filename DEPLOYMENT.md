# Deployment Guide for Your Portfolio Website

This guide provides instructions for deploying your portfolio website to various hosting platforms.

## Option 1: Deploy to Netlify (Recommended)

Netlify offers free hosting for static websites with a simple deployment process:

1. Create a free account on [Netlify](https://www.netlify.com/)

2. Deploy your site using one of these methods:

   ### Method A: Drag and Drop (Quickest)
   
   - Go to the Netlify dashboard
   - Simply drag and drop your entire `portfolio_site` folder onto the Netlify dashboard where it says "Drag and drop your site folder here"
   - Wait for the upload and deployment to complete (usually takes less than a minute)
   - Your site will be live at a random URL like `https://random-name-123456.netlify.app`
   
   ### Method B: Connect to GitHub (Recommended for ongoing updates)
   
   - Push your portfolio site to a GitHub repository
   - In Netlify dashboard, click "New site from Git"
   - Select GitHub and authorize Netlify
   - Select your repository
   - Set build command to blank (or `npm run build` if you add a build step later)
   - Set publish directory to `.` (the root directory)
   - Click "Deploy site"

3. Configure your custom domain (optional):
   
   - In the Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Follow the instructions to connect your domain

## Option 2: Deploy to GitHub Pages

GitHub Pages is another free option for hosting static websites:

1. Create a GitHub repository named `username.github.io` (replace "username" with your GitHub username)

2. Push your portfolio site to this repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

3. Your site will be available at `https://username.github.io`

## Option 3: Deploy to Vercel

Vercel is another excellent platform for static site hosting:

1. Create an account on [Vercel](https://vercel.com/)

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the prompts to deploy your site

## Updating Your Deployed Website

After making changes to your website:

- **For Netlify (drag and drop)**: Simply drag and drop your folder again
- **For Netlify (GitHub)**: Push changes to your GitHub repository, and Netlify will automatically redeploy
- **For GitHub Pages**: Push changes to your repository
- **For Vercel**: Run `vercel` again or push to the connected repository

## Troubleshooting

- If your images or links aren't working, make sure all paths are relative
- Check that all file names match exactly (case-sensitive)
- For server-side functionality (like the contact form), you'll need to use a service like Netlify Forms or a third-party form service 