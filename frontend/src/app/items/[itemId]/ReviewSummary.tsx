import ReviewStars from "@/app/components/others/ReviewStars";

const ReviewSummary = ({
  ratings,
  numReviews,
}: {
  ratings: number;
  numReviews: number;
}) => {
  return (
    <div className="border-0.5 mt-3 flex w-fit items-center gap-2 rounded-sm border border-gray-700 px-2 py-1 text-sm ">
      <p>{ratings}</p>
      <ReviewStars star={ratings} />
      <p>({numReviews})</p>
    </div>
  );
};

export default ReviewSummary;
