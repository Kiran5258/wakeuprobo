import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
          <h4 className="text-lg font-semibold">About Us</h4>
          <p className="mt-2 text-gray-400">
            We are a small tech company, passionate about web development. Our
            mission is to deliver quality solutions and keep learning.
          </p>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
          <h4 className="text-lg font-semibold  md:mx-20">Follow Us</h4>
          <div className="flex space-x-4 mt-2  md:mx-20">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/3 mb-6">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="mt-2 text-gray-400">1234 Street Name, City, Country</p>
          <p className="mt-1 text-gray-400">Email: xmaxcreation@gmail.com</p>
          <p className="mt-1 text-gray-400">Contact: 7639999740</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center">
        <p className="text-gray-400 text-sm">© 2025 Your Company. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
