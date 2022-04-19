import { render, screen } from "@testing-library/react";
import { Link } from "./Links";

test("renders link", () => {
  render(<Link>https://foo.com/</Link>);
  const linkElement = screen.getByText(/foo/i);
  expect(linkElement).toBeInTheDocument();
});
