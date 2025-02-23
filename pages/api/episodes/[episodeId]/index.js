//  /api/episodes/[episodeId]
// route used for Deleting a specific Episode, getting a specific Episode, Editing a specific Episode
import { getServerSession } from "next-auth/next";
import dbConnect from "@/components/lib/db";
import Episode from "@/models/Episode";
import Comment from "@/models/Comment";
import Poll from "@/models/Poll"; // Add this import statement

// Recursive function to fully populate replies
const populateRepliesRecursively = async (comments) => {
  // Convert comments to a Mongoose document array if needed
  const populatedComments = await Comment.populate(comments, {
    path: "replies",
    select: "name commentText createdAt replies likes", // Ensure to select fields
  });

  for (const comment of populatedComments) {
    if (comment.replies && comment.replies.length > 0) {
      // Recursively populate replies for each comment
      comment.replies = await populateRepliesRecursively(comment.replies);
    }
  }

  return populatedComments;
};

const handler = async (req, res) => {
 
  await dbConnect();
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const { episodeId } = req.query;

  // Delete a specific episode
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res);
    if (!session) {
      res.status(401).json({ message: "Not Authenticated to Delete an Episode!" });
      return;
    }

    try {
      const existingEpisode = await Episode.findById(episodeId);

      if (!existingEpisode) {
        return res.status(404).json({ error: "Episode not found" });
      }

      // Find and delete all comments associated with the episode
      await Comment.deleteMany({ episodeId: episodeId });
      // delete the episode
      await existingEpisode.deleteOne();
      res.status(200).json({ message: "Episode and associated comments deleted successfully" });
    } catch (error) {
      console.error("Error deleting episode:", error);
      res.status(500).json({ error: "Internal server error" });
    }
    // Fetch a specific episode
  } else if (req.method === "GET") {
    try {
      const existingEpisode = await Episode.findById(episodeId)
        .populate({
          path: "comments",
          select: "name commentText createdAt parentId replies likes",
          // populate: {
          //   path: "replies", // Populate replies for each comment
          //   select: "name commentText createdAt parentId replies", 
          //   // You can adjust which fields to select for replies
          // }
        })
        .populate({
          path: "polls",
          select: "question options"
        })
        .exec();

      if (!existingEpisode) {
        return res.status(404).json({ error: "Episode not found" });
      }

      // Populate replies recursively
    if (existingEpisode.comments) {
      existingEpisode.comments = await populateRepliesRecursively(existingEpisode.comments);
    }


      res.status(200).json(existingEpisode);
    } catch (error) {
      console.error("Error fetching episode:", error);
      res.status(500).json({ error: "Internal server error" });
    }

    // Edit a specific episode
  } else if (req.method === "PUT") {
    const session = await getServerSession(req, res);
    if (!session) {
      res.status(401).json({ message: "Not Authenticated to Edit an Episode!" });
      return;
    }

    try {
      const { title, description, imageLink, dateAired } = req.body;

      const existingEpisode = await Episode.findById(episodeId);

      if (!existingEpisode) {
        return res.status(404).json({ error: "Episode not found" });
      }

      // Update the episode with the new data
      existingEpisode.title = title;
      existingEpisode.description = description;
      existingEpisode.imageLink = imageLink;
      existingEpisode.dateAired = new Date(dateAired);

      // Save the updated episode to the database
      await existingEpisode.save();
      res.status(200).json({ message: "Episode updated successfully" });
    } catch (error) {
      console.error("Error updating episode:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

export default handler;