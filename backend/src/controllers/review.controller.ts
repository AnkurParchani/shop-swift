import { Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { reviews } from "../db/schema/review.schema";
import { and, eq } from "drizzle-orm";
import { orders } from "../db/schema/order.schema";
import { users } from "../db/schema/user.schema";

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

    // Getting details about user
    const userDetails = await db.query.users.findFirst({
      where: eq(users.id, req.user.id),
      with: {
        reviews: true,
        orders: {
          with: {
            orderItems: true,
          },
        },
      },
    });

    if (!userDetails) throw new Error("No user found with the userID");

    const { orders: userOrders, reviews: userReviews } = userDetails;

    // If the user has alrady reviewed this item
    if (
      userReviews.find(
        (review) =>
          review.userId === req.user?.id && review.itemId === req.body.itemId
      )
    )
      throw new Error("You have already reveiwed this item");

    // Checking If the user has ordered this item
    if (
      !userOrders.find((order) =>
        order.orderItems.find(
          (order_item) => order_item.itemId === req.body.itemId
        )
      )
    ) {
      throw new Error("You have to order this item to review it");
    }

    // Creating the Review request
    const [review] = await db
      .insert(reviews)
      .values({
        userId: req.user.id,
        itemId: req.body.itemId,
        ...req.body,
        isEdited: false,
      })
      .returning();

    res.status(200).json({ status: "success", review, user: userDetails });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from createReview, check console",
    });
    console.log(err);
  }
};

// Updating a Review
export const updateReview = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.params.reviewId) throw new Error("Provide review ID");

    const [updatedReview] = await db
      .update(reviews)
      .set({ ...req.body, userId: req.user?.id, isEdited: true })
      .where(
        and(
          eq(reviews.userId, Number(req.user?.id)),
          eq(reviews.id, req.body.reviewId)
        )
      )
      .returning();

    if (!updatedReview) throw new Error("No Review found to update");

    res.status(200).json({ status: "success", updatedReview });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "error from updateReview, check console",
    });
    console.log(err);
  }
};

// Deleting a review
export const deleteReview = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.params.reviewId) throw new Error("Provide the all details");

    const [review] = await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.id, Number(req.params.reviewId)),
          eq(reviews.userId, Number(req.user?.id))
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
