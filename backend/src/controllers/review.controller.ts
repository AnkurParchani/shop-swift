import { NextFunction, Request, Response } from "express";
import { User } from "../../global";
import { db } from "../db/dbConnect";
import { reviews } from "../db/schema/review.schema";
import { and, eq } from "drizzle-orm";
import { users } from "../db/schema/user.schema";

import AppError from "../utils/appError";
import { handleServerError } from "../utils/handleServerError";

// CustomRequest for every request
export interface CustomRequest extends Request {
  user?: User;
}

// Getting all Reviews of a particular user
export const getReviews = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const allReviews = await db.query.reviews.findMany({
      where: eq(reviews.userId, req.user?.id as number),
      with: {
        item: {
          with: {
            images: true,
          },
        },
      },
    });

    res.status(200).json({ status: "success", reviews: allReviews });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Creating Review
export const createReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.itemId || !req.user?.id)
      return next(new AppError(400, "provide all the details"));

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

    if (!userDetails)
      return next(new AppError(404, "No user found with the userID"));

    const { orders: userOrders, reviews: userReviews } = userDetails;

    // If the user has alrady reviewed this item
    if (
      userReviews.find(
        (review) =>
          review.userId === req.user?.id && review.itemId === req.body.itemId
      )
    )
      return next(new AppError(400, "You have already reveiwed this item"));

    // Checking If the user has ordered this item
    if (
      !userOrders.find((order) =>
        order.orderItems.find(
          (order_item) => order_item.itemId === req.body.itemId
        )
      )
    ) {
      return next(
        new AppError(400, "You have to order this item to review it")
      );
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

    res.status(200).json({ status: "success", review });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Updating a Review
export const updateReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.reviewId)
      return next(new AppError(400, "Provide review ID"));

    const [updatedReview] = await db
      .update(reviews)
      .set({ ...req.body, userId: req.user?.id, isEdited: true })
      .where(
        and(
          eq(reviews.userId, Number(req.user?.id)),
          eq(reviews.id, Number(req.params.reviewId))
        )
      )
      .returning();

    if (!updatedReview)
      return next(new AppError(404, "No Review found to update"));

    res.status(200).json({ status: "success", updatedReview });
  } catch (err) {
    return handleServerError(err, next);
  }
};

// Deleting a review
export const deleteReview = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.reviewId)
      return next(new AppError(400, "Provide the all details"));

    const [review] = await db
      .delete(reviews)
      .where(
        and(
          eq(reviews.id, Number(req.params.reviewId)),
          eq(reviews.userId, Number(req.user?.id))
        )
      )
      .returning();

    if (!review) return next(new AppError(404, "No review found to delete"));

    res.status(200).json({ status: "success", message: "review deleted" });
  } catch (err) {
    return handleServerError(err, next);
  }
};
