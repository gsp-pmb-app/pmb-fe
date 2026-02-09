import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-4",
  lg: "h-12 w-12 border-4",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "sm",
  className = "",
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-solid border-gray-300 border-t-indigo-600 ${sizeMap[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
