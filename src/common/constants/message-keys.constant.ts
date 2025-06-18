export const MessageKeys = {
	USER: {
		CREATED: "user.created",
		UPDATED: "user.updated",
		ACTIVATED: "user.activated",
		DEACTIVATED: "user.deactivated",

		ALREADY_EXIST: "user.already_exist",
		NOT_FOUND: "user.not_found",
		SUPER_ADMIN_SHOULD_NOT_HAVE_BRANCHES:
			"user.super_admin_should_not_have_branches",
		BRANCH_ADMIN_REQUIRES_BRANCHES: "user.branch_admin_requires_branches",
	},

	BRANCH: {
		CREATED: "branch.created",
		UPDATED: "branch.updated",
		ACTIVATED: "branch.activated",
		DEACTIVATED: "branch.deactivated",

		ALREADY_EXIST: "branch.already_exist",
		NOT_FOUND: "branch.not_found",
	},

	AUTH: {
		UNAUTHORIZED: "auth.unauthorized",
		INVALID_CREDENTIALS: "auth.invalid_credentials",
	},

	COMMON: {
		SUCCESS: "common.success",
	},
};
