# Installation Guide for Nisheet Agrawal's Portfolio Website

This guide will help you set up and run the portfolio website on your local machine.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation Steps

1. **Clone or download the repository**

   If you have Git installed, you can clone the repository:
   ```
   git clone <repository-url>
   ```
   
   Alternatively, you can download the ZIP file and extract it.

2. **Navigate to the project directory**

   ```
   cd portfolio_site
   ```

3. **Install dependencies**

   ```
   npm install
   ```

4. **Start the server**

   For production:
   ```
   npm start
   ```

   For development (with auto-reload):
   ```
   npm run dev
   ```

5. **Access the website**

   Open your browser and go to:
   ```
   http://localhost:3000
   ```

## Customization

### Adding Your Profile Picture

1. Add your image to the `images` folder
2. Update the HTML in `index.html` to use your image instead of the placeholder

### Updating Content

- Edit `index.html` to update your personal information, projects, skills, etc.
- Modify `css/styles.css` to change the styling and colors
- Update `js/script.js` to add or modify functionality

## Deployment

To deploy this website to a hosting service:

1. Choose a hosting provider (e.g., Netlify, Vercel, GitHub Pages)
2. Follow their deployment instructions
3. For Node.js-based hosting (like Heroku or Render):
   - Make sure to set the start command to `npm start`
   - Set the PORT environment variable if required by your hosting provider

## Troubleshooting

- If you encounter EADDRINUSE errors, change the port in `server.js`
- For other issues, check the console output for error messages

## License

This project is available for personal use. 