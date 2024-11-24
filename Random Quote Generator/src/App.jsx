
import React, { useState } from "react";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("happiness");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    if(loading) return;
    setLoading(true); // Start loading
    const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("failed")
      }
       const result=await response.json()
       if(result && result.length>0){
       setQuote(result[0].quote)
       setAuthor(result[0].author)
        
       }
    } catch (error) {
      console.log("error fetching ",error);
      
    }
    finally{
      setLoading(false)
    }
  }
  const SelectCategory = (e) => {
    setCategory(e.target.value);
  };
  
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold shadow-md  text-gray-800 mt-10">
        Random Quote Generator
      </h1>
      <div className="flex justify-center mt-16">
        <div className="border-2 border-gray-500 lg:px-16 lg:py-20 md:px-16 md:py-20 sm:px-5 sm:py-10 shadow-lg shadow-blue-950 w-full max-w-xl mx-auto rounded-md">
          <h2 className="text-center text-2xl font-bold">QUOTEkk</h2>

          {/* Category Dropdown */}
          <select className="mb-4" onChange={SelectCategory}>
            <option value="love">Love</option>
            <option value="hope">Hope</option>
            <option value="knowledge">Knowledge</option>
            <option value="funny">Funny</option>
            <option value="beauty">Beauty</option>
            <option value="computers">Computers</option>
            <option value="death">Death</option>
          </select>

          {/* Show Loading Spinner or Quote */}
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className=" spinner-border animate-spin w-16 h-16 border-t-4 border-blue-600 border-solid rounded-full "></div>
             
            </div>
          ) : (
            <div>
              <p className="text-center mt-4">
                {quote ? `"${quote}"` : 'Click "Get Quote" to fetch a quote '}
              </p>
              <p className="text-right mt-5">{author ? `— ${author}` : ""}</p>
            </div>
          )}

          {/* Get Quote Button */}
          <div className=" p-1 w-24 mt-5 mx-auto">
            <button
              className="bg-blue-500 shadow-md shadow-sky-900/100  text-white px-5 py-2 rounded hover:bg-blue-600  customfont"
              onClick={fetchQuote}
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
