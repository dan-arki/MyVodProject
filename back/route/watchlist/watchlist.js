import express from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt } from "express-jwt";
const prisma = new PrismaClient();
const router = express.Router();

const auth = expressjwt({
  secret: process.env["JWT_SECRET"],
  algorithms: ["HS256"],
});

//add media to watchlist
router.post("/watchlist", auth, async (req, res) => {
  const user = req.auth.id;
  const { mediaId } = req.body;
  try {
    await prisma.watchList.create({
      data: {
        userId: user,
        mediaId: mediaId,
      },
    });
    res.json({ message: "Ajout du media dans la watchlist" });
  } catch (error) {
    return res.json({ message: error });
  }
});

//get watchlist
router.get("/watchlist", auth, async (req, res) => {
  const user = req.auth.id;
  try {
    const watchlist = await prisma.watchList.findMany({
      where: {
        userId: user,
      },
      include: {
        media: true,
      },
    });
    res.json(watchlist);
  } catch (error) {
    return res.json({ message: error });
  }
});

//get watchlist by id
router.get("/watchlist/:id", auth, async (req, res) => {
  const user = req.auth.id;
  const { id } = req.params;
  try {
    const watchlist = await prisma.watchList.findFirst({
      where: {
        userId: user,
        mediaId: parseInt(id),
      },
      include: {
        media: true,
      },
    });
    res.json({ isInWatchlist: watchlist ? true : false });
  } catch (error) {
    return res.json({ message: error });
  }
});

//delete media from watchlist
router.delete("/watchlist/:id", auth, async (req, res) => {
  const user = req.auth.id;
  const mediaId = parseInt(req.params.id);
  try {
    await prisma.watchList.deleteMany({
      where: {
        userId: user,
        mediaId: mediaId,
      },
    });
    res.json({ message: "Suppression du media de la watchlist" });
  } catch (error) {
    return res.json({ message: error });
  }
});
export default router;
