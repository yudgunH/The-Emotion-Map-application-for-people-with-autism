import Link from "next/link";

export default function MainLayout({ children }) {
  return (
    <div>
      <header>
        <h1>My Website</h1>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/page">Page</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>© 2024 My Website</p>
      </footer>
    </div>
  );
}
