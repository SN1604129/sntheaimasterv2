import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        A path
        <br />
        <span>less travelled.</span>
      </h1>
      <p>
        This page isn’t here. You can find my engineering work back on the
        homepage.
      </p>
      <Link className="button button-primary" href="/">
        Back to home <Icon name="arrow" />
      </Link>
    </div>
  );
}
