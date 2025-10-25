import React, { useState } from "react";
import { urlService } from "../services/api";
import { CreateUrlRequest, ShortenedUrl } from "../types";
import { LinkIcon } from "@heroicons/react/24/outline";

interface UrlShortenerProps {
  onUrlCreated: (url: ShortenedUrl) => void;
}

const UrlShortener: React.FC<UrlShortenerProps> = ({ onUrlCreated }) => {
  const [formData, setFormData] = useState<CreateUrlRequest>({
    originalUrl: "",
    customAlias: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newUrl = await urlService.createShortUrl(formData);
      onUrlCreated(newUrl);
      setSuccess("URL이 성공적으로 단축되었습니다!");
      setFormData({
        originalUrl: "",
        customAlias: "",
        title: "",
        description: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "URL 단축에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          URL 단축하기
        </h3>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{success}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="originalUrl"
              className="block text-sm font-medium text-gray-700"
            >
              원본 URL *
            </label>
            <input
              type="url"
              name="originalUrl"
              id="originalUrl"
              required
              value={formData.originalUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label
              htmlFor="customAlias"
              className="block text-sm font-medium text-gray-700"
            >
              커스텀 별칭 (선택사항)
            </label>
            <input
              type="text"
              name="customAlias"
              id="customAlias"
              value={formData.customAlias}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="my-custom-link"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              제목 (선택사항)
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="링크 제목"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              설명 (선택사항)
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="링크에 대한 설명"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  단축 중...
                </div>
              ) : (
                <div className="flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  URL 단축하기
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UrlShortener;
