import { Mail, BookOpen, User, Settings, Bookmark } from "lucide-react";

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-100 via-yellow-50 to-stone-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Welcome Card */}
        <div className="flex flex-col items-center justify-between col-span-1 p-6 text-white shadow-xl md:col-span-2 lg:col-span-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Jane!</h2>
            <p className="mt-1 text-sm">Here a quick overview of your magazine activity.</p>
          </div>
          <User className="w-12 h-12 mt-4 md:mt-0" />
        </div>

        {/* Subscriptions */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="w-5 h-5" /> My Subscriptions
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>📚 <em>Fashion Forward</em> (Active)</li>
            <li>📘 <em>Tech Today</em> (Expired)</li>
          </ul>
          <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md">Manage Subscriptions</button>
        </div>

        {/* Saved Articles */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Bookmark className="w-5 h-5" /> Saved Articles
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>📰 <em>AI and the Future</em></li>
            <li>📰 <em>Top 10 Fashion Trends in 2025</em></li>
          </ul>
          <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md">View All Saved</button>
        </div>

        {/* Recommendations */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="text-xl font-semibold">Recommended for You</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>🔮 <em>Modern Mystics</em></li>
            <li>🎮 <em>Gameverse Monthly</em></li>
          </ul>
          <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md">Explore Magazines</button>
        </div>

        {/* Newsletter Preferences */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Mail className="w-5 h-5" /> Newsletter Preferences
          </h3>
          <p className="mt-2 text-sm">Youre subscribed to weekly updates on Tech and Fashion.</p>
          <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md">Edit Preferences</button>
        </div>

        {/* Account Settings */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Settings className="w-5 h-5" /> Account Settings
          </h3>
          <p className="mt-2 text-sm">Update your profile, password, and privacy settings.</p>
          <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md">Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
