import { render, screen } from "@testing-library/react";
import TicTacToe from "./TicTacToe";

test("renders learn react link", () => {
  render(<TicTacToe />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
