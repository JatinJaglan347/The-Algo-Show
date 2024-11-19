import React from "react";

const Contact = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <div className="bg-zinc-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-300 mb-6 text-center">
          Contact Me
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Have questions, suggestions, or just want to say hello? Fill out the form below, and I'll get back to you as soon as possible.
        </p>
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your Email"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full p-3 rounded-md bg-zinc-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Your Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-zinc-700 text-gray-300 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
