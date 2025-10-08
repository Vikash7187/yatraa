# Yatraa - Travel Website

A modern and responsive travel website built with React and Material-UI.

## Features

- 🌟 Modern and responsive design
- 🎨 Beautiful UI components using Material-UI
- 🎠 Interactive carousels for packages and testimonials
- 📱 Mobile-friendly navigation
- 🔍 Advanced search functionality
- 💫 Smooth animations and transitions

## Tech Stack

- React
- Material-UI
- React Slick (for carousels)
- Framer Motion (for animations)
- Vite (for build tooling)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yatraa.git
cd yatraa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Project Structure

```
src/
  ├── components/
  │   ├── Header/
  │   ├── Hero/
  │   ├── Destinations/
  │   ├── Packages/
  │   ├── Features/
  │   ├── Testimonials/
  │   └── Footer/
  ├── App.jsx
  ├── main.jsx
  └── index.css
```

## Deployment

### Vercel Deployment (Recommended)

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the following environment variables in Vercel:
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `VITE_API_BASE_URL`: Your backend API URL
4. Deploy!

For detailed instructions, see [VERCEL_DEPLOYMENT_FIXED.md](VERCEL_DEPLOYMENT_FIXED.md)

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Locally preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Material-UI Icons](https://mui.com/material-ui/material-icons/)