export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-6 text-center text-sm">
      <p>
        © {new Date().getFullYear()} SGG Export. All rights reserved.
      </p>

      {/* Hidden admin access */}
      <p className="mt-2 opacity-50">
        <a
          href="#/admin"
          className="hover:opacity-100 underline"
        >
          Admin
        </a>
      </p>
    </footer>
  );
}
