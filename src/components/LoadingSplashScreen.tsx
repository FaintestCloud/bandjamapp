export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
        <div className="text-white text-2xl font-bold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}