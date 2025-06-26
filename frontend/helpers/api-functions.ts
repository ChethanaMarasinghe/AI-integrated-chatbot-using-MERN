import axios from "axios";

// Send a new chat message
export const postChatRequest = async (message: string) => {
	console.log("Sending message:", message);
	try {
		const response = await axios.post("/chat/new", { message });
		if (response.status !== 200) {
			throw new Error("Failed to post chat");
		}
		return response.data;
	} catch (err: any) {
		console.error("Post Chat Error:", err);
		throw new Error(err.message);
	}
};

// Fetch all chat messages
export const getAllChats = async () => {
	try {
		const response = await axios.get("/chat/all-chats");
		if (response.status !== 200) {
			throw new Error("Failed to get chats");
		}
		return response.data;
	} catch (err: any) {
		console.error("Get Chats Error:", err);
		throw new Error(err.message);
	}
};

// Delete all chat messages
export const deleteAllChats = async () => {
	try {
		const response = await axios.delete("/chat/delete-all-chats");
		if (response.status !== 200) {
			throw new Error("Failed to delete chats");
		}
		return response.data;
	} catch (err: any) {
		console.error("Delete Chats Error:", err);
		throw new Error(err.message);
	}
};

// Logout user
export const logoutUser = async () => {
	try {
		const response = await axios.get("/user/logout");
		if (response.status !== 200) {
			throw new Error("Logout failed");
		}
		return response.data;
	} catch (err: any) {
		console.error("Logout Error:", err);
		throw new Error(err.message);
	}
};
