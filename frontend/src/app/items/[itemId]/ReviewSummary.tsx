import ReviewStars from "@/app/components/others/ReviewStars";

const ReviewSummary = ({
  ratings,
  numReviews,
}: {
  ratings: number;
  numReviews: number;
}) => {
  return (
    <div className="border-0.5 mt-3 flex w-fit items-center gap-2 rounded-sm border border-gray-700 px-2 py-1 text-sm text-gray-300">
      <p>{ratings}</p>
      <ReviewStars star={ratings} />
      <p className="text-gray-500">({numReviews})</p>
    </div>
  );
};

export default ReviewSummary;
