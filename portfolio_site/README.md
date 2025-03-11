# Nisheet Agrawal Portfolio Website

A modern, responsive portfolio website showcasing Nisheet Agrawal's skills, experience, and projects as a Data Scientist & Business Analyst.

## Features

- Modern, responsive design with animations and interactive elements
- Project showcase with detailed descriptions and results
- Experience timeline
- Skills section with progress bars
- Contact information and form
- Optimized for all devices

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS Grid, Flexbox, and animations)
- JavaScript (ES6+)
- Node.js (for local development server)

## Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd portfolio_website/portfolio_site
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3001`

## Deployment Options

### Option 1: Netlify Deployment

1. Create a Netlify account at [netlify.com](https://www.netlify.com/)

2. Connect your GitHub repository to Netlify

3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `./`

4. Deploy your site

### Option 2: Heroku Deployment

1. Create a Heroku account at [heroku.com](https://www.heroku.com/)

2. Install the Heroku CLI and log in:
   ```
   npm install -g heroku
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create nisheet-portfolio
   ```

4. Deploy to Heroku:
   ```
   git push heroku main
   ```

### Option 3: GitHub Pages

1. Go to your GitHub repository settings

2. Scroll down to the GitHub Pages section

3. Select the branch you want to deploy (usually `main` or `master`)

4. Set the folder to `/` (root)

5. Click Save

## Customization

- Edit `index.html` to update content
- Modify `css/styles.css` to change styling
- Update `js/script.js` for behavior changes
- Replace images in the `images` directory

## License

MIT License

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/) 