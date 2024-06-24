import Link from 'next/link'
import React from 'react'

export default function About() {
    return (
    <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">

            <h2 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 ">
                About our QR code menu
            </h2>
            <p className="mb-4 font-light">
                Welcome to <Link href="/" className='text-blue-600 font-semibold'>sky-menu.com</Link>! Our QR code menu represents our commitment to modernizing and enhancing your dining experience.
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Our Story
            </h2>
            <p className="mb-4 font-light">
                The idea of our QR code menu was born from a desire to merge innovation with convenience. We understand the importance of accessibility and safety in today&#xb4;s world, and our digital menu reflects our dedication to meeting these needs.            
            </p>

            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                The Benefits
            </h2>
            <p className="mb-4 font-light">
                Our QR code menu isn&#xb4;t just a digital menu; it&#xb4;s a gateway to a seamless dining experience. It offers:
            </p>

            <p className="mb-4 font-light">&#8226; <b className='font-semibold'>Convenience</b>: Instant access to our complete menu from the palm of your hand.</p>

            <p className="mb-4 font-light">&#8226; <b className='font-semibold'>Real-time Updates</b>: Stay informed about our latest dishes, promotions, and seasonal offerings.</p>

            <p className="mb-4 font-light">&#8226; <b className='font-semibold'>Contactless Dining</b>: Prioritize safety with a touch-free menu, promoting a hygienic environment.</p>
            
            <h2 className="mb-4 mt-20 text-lg tracking-tight font-bold text-gray-900 ">
                Our Commitment
            </h2>
            <p className="mb-4 font-light">
                We&#xb4;re committed to providing quality service and ensuring your comfort. The QR code menu is a part of our efforts to continually improve and innovate while maintaining our commitment to exceptional dining experiences.
            </p>

            <p className='mt-20 font-light'>
                Thank you for choosing <Link href="/" className='text-blue-600 font-semibold'>sky-menu.com</Link> for your dining pleasure.
            </p>



        </div>
    </div>
  )
}
