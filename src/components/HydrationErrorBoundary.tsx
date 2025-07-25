"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class HydrationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Only catch hydration errors
    if (
      error.message.includes("hydration") ||
      error.message.includes("Hydration")
    ) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log hydration errors but don't crash the app
    if (
      error.message.includes("hydration") ||
      error.message.includes("Hydration")
    ) {
      console.warn("Hydration error caught and handled:", error.message);
    } else {
      // Re-throw non-hydration errors
      throw error;
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Loading...
              </h2>
              <p className="text-gray-600">
                Please wait while the page loads completely.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
