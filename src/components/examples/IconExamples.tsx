import { Icon } from '@/components/ui/icons';

export default function IconExamples() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Icon Examples</h2>
      
      {/* Basic Icons */}
      <div className="flex gap-4 items-center">
        <Icon name="file" size={24} />
        <Icon name="globe" size={24} />
        <Icon name="window" size={24} />
      </div>

      {/* Utility Icons */}
      <div className="flex gap-4 items-center">
        <Icon name="heart" size={24} className="text-red-500" />
        <Icon name="bell" size={24} className="text-blue-500" />
        <Icon name="cart" size={24} className="text-green-500" />
      </div>

      {/* Navigation Icons */}
      <div className="flex gap-4 items-center">
        <Icon name="menu" size={24} />
        <Icon name="close" size={24} />
        <Icon name="search" size={24} />
        <Icon name="user" size={24} />
      </div>

      {/* Travel-related Icons */}
      <div className="flex gap-4 items-center">
        <Icon name="location" size={24} className="text-emerald-600" />
        <Icon name="calendar" size={24} className="text-purple-600" />
        <Icon name="star" size={24} className="text-yellow-500" />
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 items-center">
        <Icon name="facebook" size={24} className="text-blue-600" />
        <Icon name="instagram" size={24} className="text-pink-600" />
        <Icon name="twitter" size={24} className="text-sky-500" />
      </div>
    </div>
  );
}