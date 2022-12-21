import { Component, ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface StateI {
  hasError: boolean;
}

// eslint-disable-next-line
interface PropsI {}

class ErrorBoundary extends Component<PropsI, StateI> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // typically you would log this to something like
    //   TrackJS or NewRelic
    console.error("ErrorBoundary Component caught an error", error, errorInfo);
  }
}

export default ErrorBoundary;
