import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          About SociallyConnect
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Connecting people. Sharing moments. Building communities.
        </p>

        {/* Introduction */}
        <section className="space-y-4">
          <p>
            <span className="font-semibold">SociallyConnect</span> is a modern social networking platform
            designed to help people connect, communicate, and share their stories in a safe and engaging
            digital space. Our goal is to bring individuals closer by enabling meaningful interactions
            through technology.
          </p>
          <p>
            Whether it’s sharing updates, chatting with friends, or discovering new connections,
            SociallyConnect is built to make social interaction simple, fast, and enjoyable.
          </p>
        </section>

        {/* Mission */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to create a platform where people feel connected, heard, and valued.
            We aim to empower users to express themselves freely while maintaining a respectful and
            secure online environment.
          </p>
        </section>

        {/* Vision */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-700">
            To become a trusted social platform that fosters genuine relationships, encourages creativity,
            and supports communities across the globe.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>User-friendly social networking experience</li>
            <li>Real-time messaging and interactions</li>
            <li>Personalized profiles and content sharing</li>
            <li>Privacy-focused and secure platform</li>
            <li>Continuous improvements based on user feedback</li>
          </ul>
        </section>

        {/* Values */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 border rounded-xl">
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in building strong, positive, and inclusive communities.
              </p>
            </div>
            <div className="p-5 border rounded-xl">
              <h3 className="font-semibold mb-2">Privacy</h3>
              <p className="text-gray-600">
                Your data and personal information are always respected and protected.
              </p>
            </div>
            <div className="p-5 border rounded-xl">
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve to deliver modern and reliable features.
              </p>
            </div>
            <div className="p-5 border rounded-xl">
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-gray-600">
                We are open and honest in how we operate and communicate.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SociallyConnect. Building connections that matter. Created By - Lokesh Singh Rawat
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
