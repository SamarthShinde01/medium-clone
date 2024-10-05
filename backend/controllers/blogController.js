import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//POST /api/v1/blog PRIVATE
const blogPostController = asyncHandler(async (req, res) => {
	const { title, content } = req.body;
	const post = await prisma.post.create({
		data: { title, content, authorId: req.user.id },
	});

	return res.status(200).json(post);
});

//PUT /api/v1/blog/:id  PRIVATE
const blogUpdateController = asyncHandler(async (req, res) => {
	const { id } = req.params || "";
	const { title, content } = req.body;

	const post = await prisma.post.findFirst({ where: { id } });
	if (!post) {
		res.status(400);
		throw new Error("Post not found");
	}

	const updatedPost = await prisma.post.update({
		where: { id },
		data: { title, content },
	});

	return res.status(200).json(updatedPost);
});

//GET /api/v1/blog/:id  PRIVATE
const blogGetController = asyncHandler(async (req, res) => {
	const { id } = req.params || "";
	const post = await prisma.post.findFirst({ where: { id } });
	if (!post) {
		res.status(400);
		throw new Error("Post not found");
	}

	return res.status(200).json(post);
});

//GET /api/v1/blog/bulk  PRIVATE
const blogBulkController = asyncHandler(async (req, res) => {
	const posts = await prisma.post.findMany({});
	return res.status(200).json(posts);
});

export {
	blogPostController,
	blogUpdateController,
	blogGetController,
	blogBulkController,
};
