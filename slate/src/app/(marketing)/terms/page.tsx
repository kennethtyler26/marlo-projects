import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Last updated: April 2026
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            By accessing and using SlatePro, you accept and agree to be bound by the terms and conditions of this agreement.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            2. Use License
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Permission is granted to temporarily use SlatePro for personal or commercial business purposes in accordance with these terms.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            3. Service Description
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            SlatePro provides estimation and invoicing software for creative agencies. We reserve the right to modify or discontinue the service at any time.
          </p>

          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mt-8 mb-4">
            4. Contact
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            For questions about these terms, please contact us at support@slatepro.io.
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
