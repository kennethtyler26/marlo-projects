import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Last updated: April 2026
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We collect information you provide directly, such as your name, email address, and company information when you create an account.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We use the information to provide, maintain, and improve our services, and to communicate with you about your account.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            3. Data Security
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            We implement appropriate security measures to protect your personal information. Your data is encrypted in transit and at rest.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            4. Contact
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            For privacy-related questions, please contact us at privacy@slatepro.io.
          </p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-slate-900 dark:text-white font-medium hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
