import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface StateI {
  hasError: boolean;
}

interface PropsI {
  children: ReactNode;
}

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

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">ckick here to go back to home page</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
