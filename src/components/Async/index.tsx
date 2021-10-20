import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";

export function Async() {
  const [isButtonValid, setIsButtonValid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonValid(true);
    }, 1000);
  }, []);

  return (
    <div>
      <div>Hello world</div>
      {isButtonValid && <button>Button</button>}
    </div>
  );
}
