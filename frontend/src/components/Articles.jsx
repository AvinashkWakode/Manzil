

const articles = [
  {
    id: 1,
    title: "The Future of AI in Web Development",
    description: "Explore how AI is transforming the web development industry with automation and smart tools.",
    image: "https://source.unsplash.com/600x400/?technology,ai",
  },
  {
    id: 2,
    title: "Tailwind CSS vs. Bootstrap: Which One to Choose?",
    description: "A deep dive into the differences, advantages, and use cases of Tailwind CSS and Bootstrap.",
    image: "https://source.unsplash.com/600x400/?coding,css",
  },
  {
    id: 3,
    title: "Understanding React Hooks",
    description: "Learn about useState, useEffect, and other essential React hooks for better state management.",
    image: "https://source.unsplash.com/600x400/?react,code",
  },
];

const ArticlesPage = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="pb-4 mb-12 text-5xl font-extrabold tracking-wide text-center text-gray-900 uppercase border-b-4 border-gray-800">
          Featured Articles
        </h1>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col overflow-hidden transition-all bg-white rounded-lg shadow-md md:flex-row hover:shadow-xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-64 md:w-1/2"
              />
              <div className="flex flex-col justify-between p-6">
                <div>
                  <h2 className="mb-3 text-3xl font-bold text-gray-800">
                    {article.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {article.description}
                  </p>
                </div>
                <button className="self-start px-6 py-3 mt-4 text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;