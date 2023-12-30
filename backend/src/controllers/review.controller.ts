import { Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { reviews } from "../db/schema/review.schema";
import { and, eq } from "drizzle-orm";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting all Reviews of a particular user
export const getReviews = async (req: CustomRequest, res: Response) => {
  try {
    const allReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, req.user?.id as number));

    res.status(200).json({ status: "success", reviews: allReviews });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from getReviews, check console",
    });
    console.log(err);
  }
};

// Creating Review
export const createReview = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.body.itemId || !req.user?.id)
      throw new Error("provide all the details");

    // Checking if the user has already reviewed the item before
    const allReviews = await db
      .select()
      .from(reviews)
      .where(eq(reviews.userId, req.user?.id as number));

    if (allReviews.find((review) => review.itemId === req.body.itemId))
      throw new Error("You have already reviewed this item");

    // Checking if the user has ordered the item before to review it

    // Creating the Review request
    const [review] = await db
      .insert(reviews)
      .values({ userId: req.user.id, itemId: req.body.itemId, ...req.body })
      .returning();

    res.status(200).json({ status: "success", review });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from createReview, check console",
    });
    console.log(err);
  }
};

// Deleting a review
export const deleteReview = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.params.reviewId || !req.body.itemId)
      throw new Error("Provide the all details");

    const [review] = await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.id, Number(req.params.reviewId)),
          eq(reviews.userId, Number(req.user?.id)),
          eq(reviews.itemId, req.body.itemId)
        )
      )
      .returning();

    if (!review) throw new Error("No review found to delete");
    res.status(200).json({ status: "success", message: "review deleted" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from deleteReview, check console",
    });
    console.log(err);
  }
};
