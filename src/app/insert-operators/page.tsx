export default async function InsertOperatorsPage() {
  const message = 'Operators seeding is disabled: Tour Operators are managed as static data.';

  return (
    <div className="container mx-auto p-8 mt-20">
      <h1 className="text-2xl font-bold mb-4">Insert Tour Operators</h1>
      <div className="bg-blue-100 p-4 rounded">
        <p className="text-blue-800">ℹ️ {message}</p>
        <p className="mt-2">
          <a href="/operators" className="text-blue-600 underline">
            View All Operators
          </a>
        </p>
      </div>
    </div>
  );
}