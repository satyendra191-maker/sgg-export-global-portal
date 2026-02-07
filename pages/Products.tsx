export default function Products() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Our Products</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="border rounded overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581092334651-ddf26d9b1b6d"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold">Industrial Raw Materials</h3>
            <p className="text-sm mt-2">
              Metals, minerals and bulk industrial supplies.
            </p>
          </div>
        </div>

        <div className="border rounded overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1586864387789-628af9feed72"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold">Machinery Components</h3>
            <p className="text-sm mt-2">
              Precision components for global manufacturing.
            </p>
          </div>
        </div>

        <div className="border rounded overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c44367f"
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold">Consumer & Commercial Goods</h3>
            <p className="text-sm mt-2">
              Export-ready goods for international markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
