import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

jest.mock("../../services/stripe");

describe("Home page", () => {
  it("should render correctly", () => {
    render(<Home product={{ amount: "R$10,00", priceId: "fake-price-id" }} />);

    expect(screen.getByText(/\$10.00/i)).toBeInTheDocument();
  });

  it("should load initial data", async () => {
    const retrievePricesMocked = mocked(stripe.prices.retrieve);

    retrievePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: { product: { priceId: "fake-price-id", amount: "$10.00" } },
      })
    );
  });
});
