import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Last updated: January 2026
        </p>

        <section className="space-y-4">
          <p>
            Welcome to <span className="font-semibold">SociallyConnect</span>. Your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your information when you use our
            social networking platform.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Personal details such as name, username, email address, and profile photo</li>
            <li>Account credentials (encrypted passwords)</li>
            <li>Content you share, including posts, comments, and messages</li>
            <li>Device and usage data (IP address, browser type, log activity)</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>To create and manage your account</li>
            <li>To provide core social networking features</li>
            <li>To improve app performance and user experience</li>
            <li>To communicate important updates and security alerts</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
          <p>
            We do not sell your personal data. Your information may only be shared with trusted services
            required to operate SociallyConnect or when legally required.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no online
            platform can guarantee 100% security.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">5. Your Rights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Access and update your personal information</li>
            <li>Request deletion of your account</li>
            <li>Control privacy settings within the app</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page
            with an updated date.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-xl font-semibold">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="font-medium text-blue-600">lokeshrawat0022@gmail.com</p>
        </section>

        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SociallyConnect. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;