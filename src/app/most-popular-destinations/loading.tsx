export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="h-8 bg-gray-200 rounded w-80 mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="absolute top-2 left-2 bg-gray-300 w-8 h-6 rounded animate-pulse"></div>
            </div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
              <div className="flex items-center mb-2">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}