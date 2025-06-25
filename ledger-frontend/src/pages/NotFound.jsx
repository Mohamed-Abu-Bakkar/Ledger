export default function NotFound() {
const hi= 'hil';
  console.log('NotFound component rendered');
  console.log('API base URL:', import.meta.env.VITE_API_BASE_URL);
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-100 min-w-screen ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl">Page Not Found</p>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
      </div>
    </div>
  );

}

