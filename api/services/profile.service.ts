import { Request, Response } from "express";
import { fn } from "../lib/utils";
import { User } from "../models/User";
export const updateUserProfile = fn(async (req: Request, res: Response) => {});
export const getProfile = fn(async (req: Request, res: Response) => {});
export const profilePhotoUpload = fn(async (req: Request, res: Response) => {});
export const getUserProfileById = fn(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const user = await User.findById(id);
  }
);
