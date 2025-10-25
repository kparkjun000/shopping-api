import React, { useState } from "react";
import { Link } from "react-router-dom";
import { urlService } from "../services/api";
import { ShortenedUrl } from "../types";
import {
  ClipboardIcon,
  CheckIcon,
  TrashIcon,
  ChartBarIcon,
  QrCodeIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

interface UrlListProps {
  urls: ShortenedUrl[];
  loading: boolean;
  onUrlDeleted: (shortCode: string) => void;
  onRefresh: () => void;
}

const UrlList: React.FC<UrlListProps> = ({
  urls,
  loading,
  onUrlDeleted,
  onRefresh,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDelete = async (shortCode: string, index: number) => {
    if (window.confirm("정말로 이 URL을 삭제하시겠습니까?")) {
      setDeletingIndex(index);
      try {
        await urlService.deleteUrl(shortCode);
        onUrlDeleted(shortCode);
      } catch (err) {
        console.error("Failed to delete URL:", err);
        alert("URL 삭제에 실패했습니다.");
      } finally {
        setDeletingIndex(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            단축된 URL 목록
          </h3>
          <button
            onClick={onRefresh}
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            새로고침
          </button>
        </div>

        {urls.length === 0 ? (
          <div className="text-center py-8">
            <LinkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              단축된 URL이 없습니다
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              위의 폼을 사용해서 첫 번째 URL을 단축해보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div
                key={url.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {url.title || "제목 없음"}
                      </h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {url.clickCount} 클릭
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {url.description || url.originalUrl}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>생성: {formatDate(url.createdAt)}</span>
                      {url.expiresAt && (
                        <span>만료: {formatDate(url.expiresAt)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => copyToClipboard(url.shortUrl, index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="URL 복사"
                    >
                      {copiedIndex === index ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <ClipboardIcon className="h-4 w-4" />
                      )}
                    </button>

                    <Link
                      to={`/analytics/${url.shortCode}`}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="분석 보기"
                    >
                      <ChartBarIcon className="h-4 w-4" />
                    </Link>

                    <a
                      href={urlService.getQrCodeUrl(url.shortCode)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="QR 코드"
                    >
                      <QrCodeIcon className="h-4 w-4" />
                    </a>

                    <button
                      onClick={() => handleDelete(url.shortCode, index)}
                      disabled={deletingIndex === index}
                      className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                      title="삭제"
                    >
                      {deletingIndex === index ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                      ) : (
                        <TrashIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-primary-600">
                        {url.shortUrl}
                      </span>
                    </div>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      원본 보기
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlList;
