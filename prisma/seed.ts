import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Create a user
	const user = await prisma.user.create({
		data: {
			id: "cm1gqjnoo00008w0s69tyfd6u",
			name: "John Doe",
			email: "johndoe@example.com",
			isActive: true,
		},
	});

	// Create an account for the user
	const account = await prisma.account.create({
		data: {
			userId: user.id,
			type: "oauth",
			provider: "discord",
			refresh_token: "f3vIUJeNTXGC42j9linaf9uMSB9R0l",
			token_type: "Bearer",
			expires_at: 1727805238,
			providerAccountId: "860937972064976946",
			access_token: "54VAfekuNWx50nIjlfxfsUBY6qGhCz",
		},
	});

	// Create a view for the user
	const view = await prisma.view.create({
		data: {
			name: "My Dashboard",
			userId: user.id,
		},
	});

	// Create a block with a layout for the view
	const block = await prisma.block.create({
		data: {
			name: "Sample Chart",
			viewId: view.id,
			type: "CHART",
			layout: {
				create: {
					x: 0,
					y: 0,
					w: 4,
					h: 4,
				},
			},
		},
	});

	// Create a post by the user
	const post = await prisma.post.create({
		data: {
			name: "First Post",
			createdById: user.id,
		},
	});

	console.log({ user, account, view, block, post });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	.finally(async () => {
		await prisma.$disconnect();
		process.exit(0);
	});
