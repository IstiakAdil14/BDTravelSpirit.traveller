import dynamic from 'next/dynamic';

const TravelWithBestTourOperators = dynamic(() => import('./TravelWithBestTourOperatorsClient'), {
  loading: () => <div className="py-20 bg-gradient-to-br from-blue-50 to-white animate-pulse">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-80 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 bg-gray-200 rounded w-16"></div>
              ))}
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
});

export default TravelWithBestTourOperators;
