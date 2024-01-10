import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function ReviewStars({ star }: { star: number }) {
  const starElements = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= star) {
      starElements.push(
        <span className="text-yellow-500">
          <FaStar />
        </span>,
      );
    } else {
      starElements.push(
        <span className="text-yellow-500">
          <CiStar />
        </span>,
      );
    }
  }

  return <div className="flex">{starElements}</div>;
}
