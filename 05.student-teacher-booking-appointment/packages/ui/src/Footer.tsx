const Footer = () => {
  return (
    <footer className="w-full px-6 py-4 bg-gray-900 text-center text-sm text-gray-400 mt-auto">
      <p>

        © {new Date().getFullYear()} STBA. All rights reserved.
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a href="#" className="hover:text-blue-400 transition duration-300">GitHub</a>
        <a href="#" className="hover:text-blue-400 transition duration-300">LinkedIn</a>
        <a href="#" className="hover:text-blue-400 transition duration-300">Instagram</a>
      </div>
    </footer>
  )
}

export default Footer;
