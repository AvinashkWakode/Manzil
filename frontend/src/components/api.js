import axios from 'axios';

const API_URL = 'http://localhost:1337/api';
const STRAPI_URL = 'http://localhost:1337';

/** ✅ Register User */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signups`, {
      data: {
        FullName: userData.name,
        ContactNumber: userData.contact,
        Email: userData.email,
        Password: userData.password, 
      },
    });

    if (response.data.data) {
      console.log("✅ Registration Successful!");
      return { success: true, message: "Registration successful!" };
    } else {
      console.error("❌ Registration failed:", response.data);
      return { success: false, message: "Registration failed. Try again!" };
    }
  } catch (error) {
    console.error("❌ Error registering user:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.error?.message || "An error occurred!" };
  }
};

/** ✅ Secure Login (Using Strapi Auth) */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier: email, // Strapi uses "identifier" instead of "email"
      password: password,
    });

    if (response.data.jwt) {
      return { 
        success: true, 
        message: "Login successful!", 
        token: response.data.jwt, 
        user: response.data.user 
      };
    } else {
      return { success: false, message: "Invalid email or password!" };
    }
  } catch (error) {
    console.error("❌ Error logging in user:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.error?.message || "An error occurred during login!" };
  }
};






/** ✅ Fetch Articles */
export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles?populate=*`);
    
    return response.data.data.map(article => ({
      id: article.id,
      title: article.attributes.Title || "No Title", 
      content: article.attributes.Content 
        ? article.attributes.Content.map(block => block.children?.[0]?.text || "").join(" ")
        : "No content available", 
      publishedDate: article.attributes.PublishedDate || "Unknown date",
      image: article.attributes.Image?.data 
        ? STRAPI_URL + article.attributes.Image.data.attributes.url 
        : null // Handle missing cover image
    }));
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    return [];
  }
};







/** ✅ Fetch Magazines */
export const fetchMagazines = async () => {
  try {
    const response = await axios.get(`${API_URL}/magazines?populate=*`);
    
    return response.data.data.map(magazine => ({
      id: magazine.id,
      title: magazine.attributes.Title || "No Title", 
      content: magazine.attributes.Content 
        ? magazine.attributes.Content.map(block => block.children?.[0]?.text || "").join(" ")
        : "No content available", 
           publishedDate: magazine.attributes.PublishedDate || "Unknown date",
           price: magazine.attributes.Price || "N/A",
           image: magazine.attributes.Image?.data 
        ? STRAPI_URL + magazine.attributes.Image.data.attributes.url 
        : null // Handle missing cover image
    }));
  } catch (error) {
    console.error("❌ Error fetching magazines:", error);
    return [];
  }
};




/** ✅ Fetch Blogs (With Cover Image & PDF) */
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs?populate=*`);
    
    return response.data.data.map(blog => ({
      id: blog.id,
      title: blog.attributes.Title || "No Title", 
      coverImage: blog.attributes.CoverImage?.data 
        ? STRAPI_URL + blog.attributes.CoverImage.data.attributes.url 
        : null,
      pdfFile: blog.attributes.PdfFile?.data 
        ? STRAPI_URL + blog.attributes.PdfFile.data.attributes.url 
        : null
    }));
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return [];
  }
};
