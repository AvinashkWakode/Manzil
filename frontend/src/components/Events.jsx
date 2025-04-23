import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/events?populate=Image")
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      });
  }, []);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h1 className="mb-10 text-3xl font-bold text-center text-gray-800">Our Webinars</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const { id, attributes } = event;
          const {
            Title,
            Date: eventDate,
            Description,
            Link,
            Image,
          } = attributes;

          const imageUrl = Image?.data?.attributes?.url;

          return (
            <div
              key={id}
              className="flex flex-col overflow-hidden transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
            >
              {imageUrl && (
                <img
                  src={`http://localhost:1337${imageUrl}`}
                  alt={Title}
                  className="object-cover w-full h-56"
                />
              )}

              <div className="flex flex-col justify-between flex-1 p-6">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">{Title || "Untitled Event"}</h2>

                <div className="mb-6 text-sm text-gray-700">
                  {Array.isArray(Description) && Description.length > 0 ? (
                    Description.map((block, index) => (
                      <p
                        key={index}
                        className="mb-2 leading-relaxed text-justify text-gray-700"
                      >
                        {block.children?.map((child, idx) => (
                          <span key={idx}>{child.text}</span>
                        ))}
                      </p>
                    ))
                  ) : (
                    <p className="italic text-gray-400">No description provided.</p>
                  )}
                </div>

                {/* Move date and button below the description */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    {eventDate
                      ? new window.Date(eventDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Date not available"}
                  </p>

                  {Link && isValidUrl(Link) ? (
                    <a
                      href={Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg"
                    >
                      Join Event
                    </a>
                  ) : (
                    <p className="mt-4 text-sm italic text-center text-gray-400">No link available</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
