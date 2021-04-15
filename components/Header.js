import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/weather">Weather</Link>
      <Link href="/todo">Todo</Link>
    </nav>
  );
}
