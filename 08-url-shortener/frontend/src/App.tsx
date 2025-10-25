import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { urlService } from "./services/api";
import { ShortenedUrl } from "./types";
import Header from "./components/Header";
import UrlShortener from "./components/UrlShortener";
import UrlList from "./components/UrlList";
import Analytics from "./components/Analytics";

function App() {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      setLoading(true);
      const data = await urlService.getAllUrls();
      setUrls(data);
    } catch (error) {
      console.error("Failed to load URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlCreated = (newUrl: ShortenedUrl) => {
    setUrls((prev) => [newUrl, ...prev]);
  };

  const handleUrlDeleted = (shortCode: string) => {
    setUrls((prev) => prev.filter((url) => url.shortCode !== shortCode));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  <UrlShortener onUrlCreated={handleUrlCreated} />
                  <UrlList
                    urls={urls}
                    loading={loading}
                    onUrlDeleted={handleUrlDeleted}
                    onRefresh={loadUrls}
                  />
                </div>
              }
            />
            <Route path="/analytics/:shortCode" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
