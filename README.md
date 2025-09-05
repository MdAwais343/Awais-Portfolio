# Muhammad Awais - Portfolio Website

A modern, responsive portfolio website built with React and Node.js, showcasing professional experience, projects, and skills.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Smooth scrolling, hover effects, and animations
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Filterable project gallery with detailed information
- **Skills Visualization**: Interactive skill bars and progress indicators
- **Experience Timeline**: Professional experience displayed in an attractive timeline
- **SEO Optimized**: Meta tags, Open Graph, and proper HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Custom CSS with CSS variables and modern layouts
- **React Icons** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Main styles
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── server/                 # Node.js backend
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── package.json            # Root package.json
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start only the backend server
- `npm run client` - Start only the React frontend
- `npm run build` - Build the React app for production
- `npm run install-all` - Install dependencies for all packages

## 📧 Contact Form Setup

To enable the contact form functionality:

1. **Gmail Setup**:
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use the App Password in your `.env` file

2. **Alternative Email Services**:
   - Modify the email configuration in `server/index.js`
   - Update the nodemailer transporter configuration

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `client/src/components/Hero.js` - Hero section content
- `client/src/components/About.js` - About section content
- `server/index.js` - Projects, skills, experience, and education data

### Styling
- Modify `client/src/App.css` for global styles
- Update component-specific CSS files in `client/src/components/`
- Customize CSS variables in the `:root` selector for theme colors

### Social Links
Update social media links in:
- `client/src/components/Navbar.js`
- `client/src/components/Hero.js`
- `client/src/components/Contact.js`
- `client/src/components/Footer.js`

## 📱 Responsive Design

The website is fully responsive and includes:
- Mobile-first design approach
- Breakpoints for tablets and mobile devices
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🔧 Deployment

### Frontend (React)
```bash
cd client
npm run build
```
Deploy the `build` folder to your hosting service.

### Backend (Node.js)
```bash
cd server
npm start
```
Deploy to services like:
- Heroku
- Vercel
- DigitalOcean
- AWS

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, feel free to reach out:
- Email: muhammad.awais@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

**Made with ❤️ by Muhammad Awais**
