import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <nav style={{ margin: "2rem" }}>
      <Link to="/post">
        <h1>
          <b>A) Post a Journal</b>
        </h1>
      </Link>
      <Link to="/">
        <h1>
          <b>B) See All Journals</b>
        </h1>
      </Link>
    </nav>
  );
};
