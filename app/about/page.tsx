export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#2a2a2a] rounded-lg">
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 mb-4">
          <img src="/images/gamepredict-logo.png" alt="GamePredict Logo" className="w-full h-full" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">About GamePredict</h1>
      </div>

      <p className="mb-4">
        GamePredict is a cutting-edge NBA game prediction platform that helps basketball enthusiasts make informed
        predictions about upcoming games.
      </p>

      <p className="mb-4">
        Our platform uses advanced analytics and machine learning algorithms to analyze team statistics, player
        performance, historical matchups, and other relevant factors to generate accurate predictions.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Our Features</h2>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Real-time game predictions with win probabilities</li>
        <li>Comprehensive team statistics and performance metrics</li>
        <li>Personal prediction tracking and performance analysis</li>
        <li>User-friendly interface for easy navigation</li>
        <li>Mobile-responsive design for on-the-go access</li>
      </ul>

      <p className="mt-8 text-gray-400 text-center">© 2025 GamePredict. All rights reserved.</p>
    </div>
  )
}
