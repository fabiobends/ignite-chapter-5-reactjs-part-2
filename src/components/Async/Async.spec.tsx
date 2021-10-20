import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Async } from ".";

describe("Async component", () => {
  it("should render correctly", async () => {
    render(<Async />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();

    /* method 1 */
    // expect(await screen.findByText("Button")).toBeInTheDocument();

    /* method 2 */
    await waitFor(() => {
      return expect(screen.getByText("Button")).toBeInTheDocument();
    });

    /* method 3 - THE OPPOSITE*/
    // await waitForElementToBeRemoved(screen.queryByText("Button"));
  });
});
