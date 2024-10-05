import asynHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import generateToken from "../utils/generateToken.js";
const prisma = new PrismaClient();

//POST /api/v1/user/signup PUBLIC
const userSignupController = asynHandler(async (req, res) => {
	const { name, username, password } = req.body;

	const userExist = await prisma.user.findFirst({ where: { username } });
	if (userExist) {
		res.status(400);
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: { name, username, password: hashedPassword },
	});

	if (user) {
		generateToken(res, user.id);
		return res.status(200).json(user);
	} else {
		res.status(400);
		throw new Error("Something went wrong");
	}
});

//POST /api/v1/user/signin PUBLIC
const userSigninController = asynHandler(async (req, res) => {
	const { username, password } = req.body;
	const userExist = await prisma.user.findFirst({ where: { username } });
	if (!userExist) {
		res.status(400);
		throw new Error("User does not exists");
	}

	const matchPassword = await bcrypt.compare(password, userExist.password);

	if (!matchPassword) {
		res.status(400);
		throw new Error("Password does not match, try again");
	}

	generateToken(res, userExist.id); // Assuming your token is stored in cookies or headers
	return res.status(200).json({
		id: userExist.id,
		username: userExist.username,
		name: userExist.name,
	});
});

//POST /api/v1/user/logout PUBLIC
const userLogoutController = asynHandler(async (req, res) => {
	res.cookie("jwt", "", { http: true, expires: new Date(0) });
	return res.status(200).json({ message: "Logged Out Successfully" });
});

//GET /api/v1/user/profile PRIVATE
const userGetController = asynHandler(async (req, res) => {
	const user = await prisma.user.findFirst({ where: { id: req.user.id } });
	if (!user) {
		res.status(400);
		throw new Error("Unable to fetch user");
	}

	return res.status(200).json(user);
});

//GET /api/v1/user/author PUBLIC
const userAuthorController = asynHandler(async (req, res) => {
	const user = await prisma.user.findFirst({
		where: { id: req.body.id },
	});
	if (!user) {
		res.status(400);
		throw new Error("Unable to fetch user");
	}

	return res.status(200).json(user);
});

//PUT /api/v1/user/profile PRIVATE
const userUpdateController = asynHandler(async (req, res) => {
	const user = await prisma.user.findFirst({ where: { id: req.user.id } });

	if (!user) {
		res.status(404).json({ message: "User not found" });
		return;
	}

	const updatedData = {
		name: req.body.name || user.name,
		username: req.body.username || user.username,
	};

	if (req.body.password) {
		// Hash the new password if provided
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		updatedData.password = hashedPassword;
	}

	// Update the user in the database
	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: updatedData,
	});

	// Respond with the updated user
	res.status(200).json(updatedUser);
});

export {
	userSignupController,
	userSigninController,
	userGetController,
	userUpdateController,
	userLogoutController,
	userAuthorController,
};
