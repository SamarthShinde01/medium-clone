import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// Check if token is provided in the Authorization header
	if (req.headers.authorization) {
		token = req.headers.authorization; // Extract token from "Bearer <token>"
	} else if (req.cookies.jwt) {
		// Check if token is present in cookies
		token = req.cookies.jwt;
	}

	if (token) {
		try {
			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Attach the user to the request object
			req.user = await prisma.user.findFirst({ where: { id: decoded.userId } });

			next();
		} catch (err) {
			console.error(err);
			res.status(401); // Unauthorized error
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401); // Unauthorized error
		throw new Error("Not authorized, no token provided");
	}
});

export default protect;
