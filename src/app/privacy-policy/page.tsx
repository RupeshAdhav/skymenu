import Link from 'next/link'
import React from 'react'

export default function PrivacyPolicy() {
    return (
    <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 ">
                Privacy Policy
            </h2>
            <p className="mb-4 font-light">
                We are committed to safeguarding your privacy while providing an exceptional dining experience. This Privacy Policy outlines how we collect, use, and protect any information obtained through the use of our QR code menu.
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Information Collection and Use
            </h2>
            <p className="mb-4 font-light">
                When you scan our QR code menu, we may collect certain information, such as the device used, date and time of access, and menu items viewed. This data helps us improve our services, enhance menu offerings, and personalize your experience.            
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Data Security
            </h2>
            <p className="mb-4 font-light">
                We prioritize the security of your information. We employ appropriate physical, electronic, and managerial measures to prevent unauthorized access, maintain data accuracy, and ensure the correct use of information collected through our QR code menu.
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Data Sharing
            </h2>
            <p className="mb-4 font-light">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. However, non-personally identifiable information may be shared with trusted third parties for analytical or marketing purposes to enhance user experience
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Cookies and Tracking
            </h2>
            <p className="mb-4 font-light">
                We may use cookies or similar tracking technologies to enhance your browsing experience. These technologies do not collect personal information but may gather usage data to improve our services.
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Changes to this Privacy Policy
            </h2>
            <p className="mb-4 font-light">
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page, and it is recommended to periodically review this policy for updates.
            </p>

            <p className='mt-20 font-light'>
                By using <Link href="/" className='text-blue-600 font-semibold'>sky-menu.com</Link>, you consent to the terms outlined in this Privacy Policy.
            </p>

        </div>
    </div>
  )
}
