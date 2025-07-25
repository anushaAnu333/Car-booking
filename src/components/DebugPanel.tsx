"use client";

import { useState } from "react";
import { Bug, ChevronDown, ChevronUp } from "lucide-react";

interface DebugPanelProps {
  searchData: any;
  availabilityData: any[];
  lastUpdate: Date;
  isLoading: boolean;
}

export default function DebugPanel({
  searchData,
  availabilityData,
  lastUpdate,
  isLoading,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-gray-900 text-white rounded-lg shadow-xl min-w-80">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bug className="w-4 h-4" />
            <span className="text-sm font-medium">Debug Panel</span>
            {isLoading && (
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {isOpen && (
          <div className="p-3 border-t border-gray-700 rounded-b-lg max-h-96 overflow-y-auto">
            <div className="space-y-3 text-xs">
              {/* Status */}
              <div>
                <div className="text-gray-400 mb-1">Status:</div>
                <div
                  className={`px-2 py-1 rounded text-xs font-mono ${
                    isLoading
                      ? "bg-yellow-800 text-yellow-200"
                      : "bg-green-800 text-green-200"
                  }`}>
                  {isLoading ? "CHECKING AVAILABILITY" : "READY"}
                </div>
              </div>

              {/* Last Update */}
              <div>
                <div className="text-gray-400 mb-1">Last Update:</div>
                <div className="font-mono text-green-400">
                  {lastUpdate.toLocaleTimeString()}
                </div>
              </div>

              {/* Search Data */}
              <div>
                <div className="text-gray-400 mb-1">Search Parameters:</div>
                <pre className="bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(searchData, null, 2)}
                </pre>
              </div>

              {/* Availability Results */}
              <div>
                <div className="text-gray-400 mb-1">
                  Availability Results ({availabilityData.length}):
                </div>
                <pre className="bg-gray-800 p-2 rounded text-xs overflow-x-auto max-h-40">
                  {JSON.stringify(availabilityData, null, 2)}
                </pre>
              </div>

              {/* API Test */}
              <div>
                <div className="text-gray-400 mb-1">Quick Tests:</div>
                <div className="space-y-1">
                  <button
                    className="w-full text-left px-2 py-1 bg-blue-800 hover:bg-blue-700 rounded text-xs"
                    onClick={() => {
                      fetch("/api/cars")
                        .then((r) => r.json())
                        .then((data) => console.log("Cars API:", data))
                        .catch((e) => console.error("Cars API Error:", e));
                    }}>
                    Test Cars API
                  </button>

                  <button
                    className="w-full text-left px-2 py-1 bg-purple-800 hover:bg-purple-700 rounded text-xs"
                    onClick={() => {
                      fetch("/api/locations")
                        .then((r) => r.json())
                        .then((data) => console.log("Locations API:", data))
                        .catch((e) => console.error("Locations API Error:", e));
                    }}>
                    Test Locations API
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
