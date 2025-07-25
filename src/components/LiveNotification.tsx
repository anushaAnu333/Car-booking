"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export default function LiveNotification({
  message,
  type,
  duration = 5000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md w-full ${getBackgroundColor()} border rounded-lg p-4 shadow-lg animate-in slide-in-from-right duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${getTextColor()}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md p-1.5 hover:bg-opacity-20 hover:bg-gray-900 focus:outline-none`}>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
