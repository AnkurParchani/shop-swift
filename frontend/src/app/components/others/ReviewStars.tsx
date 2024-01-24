import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function ReviewStars({
  star,
  starSize,
}: {
  star: number;
  starSize?: string;
}) {
  const starElements = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= star) {
      starElements.push(
        <FaStar
          key={i}
          style={{ color: "#eab308", fontSize: starSize || "15px" }}
        />,
      );
    } else {
      starElements.push(
        <CiStar
          key={i}
          style={{ color: "#eab308", fontSize: starSize || "15px" }}
        />,
      );
    }
  }

  return <div className="flex">{starElements}</div>;
}
