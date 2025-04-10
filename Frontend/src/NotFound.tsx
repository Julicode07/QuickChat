export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="mt-2">The page you are looking for does not exist.</p>
            <a href="/" className="mt-4 bg-blue-800 text-white font-bold px-3 py-1 rounded-xl">Go back to Home</a>
        </div>
    );
}