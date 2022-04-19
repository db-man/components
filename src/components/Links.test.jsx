import { render, screen } from "@testing-library/react";
import { Link, Links } from "./Links";

describe("Link", () => {
  describe("given a text to child", () => {
    it('renders link with "foo" text', () => {
      render(<Link>https://foo.com/</Link>);
      const linkElement = screen.getByText(/foo/i);
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe("given a text to props", () => {
    it('renders link with "bar" text', () => {
      render(<Link href="https://foo.com/" text="bar"></Link>);
      const linkElement = screen.getByText(/bar/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});

describe("Links", () => {
  it('renders one link with "bar" text', () => {
    render(<Links links={[{ href: "https://foo.com/", text: "bar" }]}></Links>);
    const linkElement = screen.getByText(/bar/i);
    expect(linkElement).toBeInTheDocument();
  });
});
