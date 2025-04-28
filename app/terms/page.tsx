export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#2a2a2a] rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using GamePredict, you agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">2. Description of Service</h2>
          <p>
            GamePredict provides NBA game predictions and statistics for entertainment purposes only. Our predictions
            are based on algorithms and historical data, but we do not guarantee accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account information and password. You agree
            to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">4. Privacy Policy</h2>
          <p>
            Your use of GamePredict is also governed by our Privacy Policy, which is incorporated by reference into
            these Terms of Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">5. Limitation of Liability</h2>
          <p>
            GamePredict is not responsible for any decisions made based on our predictions. Our service is for
            entertainment purposes only and should not be used for gambling or betting.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of GamePredict after such changes
            constitutes your acceptance of the new terms.
          </p>
        </section>
      </div>

      <p className="mt-8 text-gray-400 text-center">Last updated: April 26, 2025</p>
    </div>
  )
}
