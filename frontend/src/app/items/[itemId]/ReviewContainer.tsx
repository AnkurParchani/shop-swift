import ReviewStars from "@/app/components/others/ReviewStars";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { User } from "../../../../global";

type ReviewType = {
  content: string;
  date: string;
  id: number;
  isEdited: boolean;
  stars: string;
  user: User;
};

const ReviewContainer = ({ reviews }: { reviews: ReviewType[] }) => {
  return (
    <div>
      {reviews.map((review) => {
        const { id, content, isEdited, stars, date, user } = review;
        const { email: userEmail, name: userName, image } = user;

        return (
          <Card key={id}>
            <CardHeader className="flex items-start gap-3">
              <Image
                alt={`${userName} image`}
                height={40}
                className="rounded-full"
                radius="sm"
                src={user?.image?.path || "/images/default-user.jpg"}
                width={40}
              />
              <div className="flex flex-col ">
                <p className="text-md capitalize text-gray-200">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
                <p className="mt-2 text-xs text-default-500">
                  <ReviewStars star={+stars} />
                </p>
              </div>
            </CardHeader>
            <Divider />

            <CardBody className="text-sm text-gray-300">
              <p className="">{content}</p>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default ReviewContainer;
