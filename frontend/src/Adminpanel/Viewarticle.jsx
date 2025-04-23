import { Newspaper, BookOpen, PenSquare, Mail, Users, Settings, Menu, ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy magazines data
const magazines = [
  {
    id: 2,
    title: "Ayodhya",
    image: "https://via.placeholder.com/40x40.png?text=A",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 10,
    title: "BHARATI NEWS",
    image: "https://via.placeholder.com/40x40.png?text=BN",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 9,
    title: "BHARATI TIMES",
    image: "https://via.placeholder.com/40x40.png?text=BT",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 7,
    title: "BUSINESS",
    image: "https://via.placeholder.com/40x40.png?text=B",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 1,
    title: "BVICAM",
    image: "https://via.placeholder.com/40x40.png?text=BV",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 8,
    title: "EDUCATIONS",
    image: "https://via.placeholder.com/40x40.png?text=E",
    publishedDate: "Thursday, January 30, 2025",
  },
  {
    id: 3,
    title: "Manzil",
    image: "https://via.placeholder.com/40x40.png?text=M",
    publishedDate: "Thursday, January 30, 2025",
  },
];

// SidebarItem Component
const SidebarItem = ({ icon: Icon, label, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className="flex items-center justify-between gap-2 hover:text-[#a64b2a] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" /> {label}
        </div>
        {children && (open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
      </div>
      {open && children && <div className="ml-6 mt-2 space-y-1 text-sm text-[#5a4747]">{children}</div>}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Sidebar Component
const Sidebar = () => (
  <aside className="hidden w-64 min-h-screen p-4 text-[#4b3f3f] bg-gradient-to-b from-orange-100 via-yellow-50 to-stone-100 md:block shadow-lg">
    <div className="mb-8 text-2xl font-bold text-[#7c3e1d]">Admin Panel</div>
    <nav className="space-y-4">
      <Link to="/Admin" className="block hover:text-[#a64b2a]">
        <div className="flex items-center gap-2">
          <Menu className="w-4 h-4" /> Dashboard
        </div>
      </Link>

      <SidebarItem icon={Newspaper} label="Articles">
        <div className="space-y-1">
          <Link to="/Adminpanel/Article" className="block">Add Article</Link>
          <Link to="/Adminpanel/UpdateArticle" className="block">View Articles</Link>
        </div>
      </SidebarItem>

      <SidebarItem icon={BookOpen} label="Magazines">
        <div className="space-y-1">
          <Link to="/Adminpanel/AddMagazine" className="block">Add Magazine</Link>
          <Link to="/Adminpanel/UpdateMagazine" className="block">Update Magazines</Link>
          <Link to="/Adminpanel/DeleteMagazine" className="block">Delete Magazines</Link>
        </div>
      </SidebarItem>

      <SidebarItem icon={PenSquare} label="Blogs">
        <div className="space-y-1">
          <Link to="/Adminpanel/AddBlog" className="block">Add Blog</Link>
          <Link to="/Adminpanel/UpdateBlog" className="block">Update Blogs</Link>
          <Link to="/Adminpanel/DeleteBlog" className="block">Delete Blogs</Link>
        </div>
      </SidebarItem>

      <SidebarItem icon={Mail} label="User Messages">
        <div className="space-y-1">
          <Link to="/Adminpanel/Messages" className="block">Inbox</Link>
        </div>
      </SidebarItem>

      <SidebarItem icon={Users} label="Authors">
        <div className="space-y-1">
          <Link to="/Adminpanel/AddAuthor" className="block">Add Author</Link>
          <Link to="/Adminpanel/UpdateAuthor" className="block">Update Author</Link>
          <Link to="/Adminpanel/DeleteAuthor" className="block">Delete Author</Link>
        </div>
      </SidebarItem>

      <SidebarItem icon={Settings} label="Settings">
        <div className="space-y-1">
          <Link to="/Adminpanel/Settings/General" className="block">General</Link>
          <Link to="/Adminpanel/Settings/Preferences" className="block">Preferences</Link>
          <Link to="/Adminpanel/Settings/Security" className="block">Security</Link>
        </div>
      </SidebarItem>
    </nav>
  </aside>
);

// Main Magazines Component
const Magazines = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#5c4438] mb-6">Articles</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-[#f9fafb] text-gray-700 uppercase text-xs border-b">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4">Update</th>
                <th className="px-6 py-4">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {magazines.map((magazine) => (
                <tr key={magazine.id} className="transition hover:bg-gray-100">
                  <td className="px-6 py-3 font-medium">{magazine.id}</td>
                  <td className="px-6 py-3 font-medium">{magazine.title}</td>
                  <td className="px-6 py-3">
                    <img
                      src={magazine.image}
                      alt={magazine.title}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-3">{magazine.publishedDate}</td>
                  <td className="px-6 py-3 text-blue-600 cursor-pointer hover:underline">Edit</td>
                  <td className="px-6 py-3 text-red-500 cursor-pointer hover:underline">Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Magazines;
