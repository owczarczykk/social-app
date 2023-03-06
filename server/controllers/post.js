import Post from "./../models/Post.js";
import User from "./../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, imgPath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      description,
      userImgPath: user.imgPath,
      imgPath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({ $natural: -1 });
    res.status(201).json(post); // front gets all new posts to rerender, not particular this one
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ $natural: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ $natural: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const user = await User.findById(userId);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            userId: userId,
            name: user.name,
            lastName: user.lastName,
            imgPath: user.imgPath,
            comment: comment,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
