# MORENT - Car Rental Platform

A modern car rental website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚗 Browse available cars
- 🔍 Search functionality
- ❤️ Favorite cars
- 📅 Rental booking form
- 🎨 Modern, responsive design
- 🚀 Fast performance with Next.js
- 🛠️ Built-in API routes

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd carrental
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

The project includes several API routes for managing data:

### Cars API

- `GET /api/cars` - Get all cars
- `GET /api/cars/[id]` - Get a specific car
- `GET /api/cars/search?q=<query>` - Search cars
- `POST /api/cars` - Add a new car

### Rentals API

- `GET /api/rentals` - Get all rentals
- `POST /api/rentals` - Create a new rental

### Favorites API

- `GET /api/favorites` - Get favorite cars
- `POST /api/favorites` - Add a car to favorites
- `DELETE /api/favorites` - Remove a car from favorites

## Project Structure

```
carrental/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── RentalForm.tsx
│   │   ├── CarCard.tsx
│   │   ├── CarList.tsx
│   │   └── Footer.tsx
│   ├── data/             # Mock data
│   │   └── cars.ts
│   └── types/            # TypeScript types
│       └── car.ts
├── public/               # Static assets
│   └── cars/            # Car images
└── package.json
```

## Features Implemented

### Homepage

- Hero section with promotional banners
- Pick-up and drop-off rental form
- Popular cars section
- Recommended cars section
- Responsive design for all screen sizes

### Components

- **Header:** Logo, search bar, notifications, and user profile
- **Hero Section:** Two promotional banners with CTA buttons
- **Rental Form:** Pick-up and drop-off location/date/time selectors
- **Car Cards:** Display car information with specs and pricing
- **Footer:** Company info and navigation links

### API Routes

- RESTful API endpoints for cars, rentals, and favorites
- In-memory data storage (can be replaced with a database)
- Search and filtering capabilities

## Customization

### Adding New Cars

Edit `src/data/cars.ts` to add new cars to the inventory:

```typescript
{
  id: '13',
  name: 'Tesla Model 3',
  type: 'Electric',
  brand: 'Tesla',
  fuel: 'Electric',
  transmission: 'Automatic',
  capacity: 5,
  price: 120.00,
  image: '/cars/placeholder.svg',
  isFavorite: false
}
```

### Styling

- Tailwind CSS classes are used throughout
- Global styles in `src/app/globals.css`
- Component-specific styles inline with Tailwind

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with one click

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Environment Variables

No environment variables are required for basic functionality. For production, you may want to add:

- `DATABASE_URL` - For database connection
- `NEXT_PUBLIC_API_URL` - For API endpoint configuration

## Future Enhancements

- [ ] User authentication
- [ ] Database integration
- [ ] Payment processing
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Real car images
- [ ] Advanced filtering options
- [ ] User reviews and ratings

## License

This project is open source and available under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
# Car-booking
