#!/bin/bash

# Create the directory structure
mkdir -p images/projects_fixed

# Copy the images with simpler filenames
cp "images/projects/Chatbot/Screenshot 2025-03-10 at 3.01.11 PM.png" images/projects_fixed/chatbot.png
cp "images/projects/Brick and mortar/WhatsApp Image 2025-03-10 at 14.53.54.jpeg" images/projects_fixed/business360.jpeg
cp "images/projects/Brick and mortar/WhatsApp Image 2025-03-10 at 14.54.33.jpeg" images/projects_fixed/business360_detail1.jpeg
cp "images/projects/Brick and mortar/WhatsApp Image 2025-03-10 at 14.55.48.jpeg" images/projects_fixed/business360_detail2.jpeg
cp "images/projects/Brick and mortar/WhatsApp Image 2025-03-10 at 14.55.07.jpeg" images/projects_fixed/sales_insights.jpeg
cp "images/projects/P&L report/Screenshot 2025-03-10 at 2.30.01 PM.png" images/projects_fixed/pl_report.png
cp "images/projects/Real Estate Price prediction/Screenshot 2025-03-10 at 2.45.05 PM.png" images/projects_fixed/realestate.png
cp "images/projects/Brewdog/Screenshot 2025-03-10 at 2.50.03 PM.png" images/projects_fixed/brewdog.png

echo "Images copied successfully!" 