import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Chat.module.css";
import ChatItem from "../components/chat/ChatItem";
import {
	deleteAllChats,
	getAllChats,
	postChatRequest,
} from "../../helpers/api-functions";

import sendIcon from "/logos/send-icon.png";
import noMsgBot from "/logos/no-msg2.png";
import upArrow from "/logos/up-arrow.png";
import ChatLoading from "../components/chat/ChatLoading";
import SpinnerOverlay from "../components/shared/SpinnerOverlay";
import toast from "react-hot-toast";

type Message = {
	role: "user" | "assistant";
	content: string;
};

const Chat = () => {
	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingChats, setIsLoadingChats] = useState(true);
	const [deleteChatToggle, setDeleteChatToggle] = useState(false);

	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const messageContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop =
				messageContainerRef.current.scrollHeight;
		}
	}, [chatMessages]);

	useEffect(() => {
		const getChats = async () => {
			try {
				const data = await getAllChats();
				setChatMessages([...data.chats]);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoadingChats(false);
			}
		};
		getChats();
	}, []);

	const sendMsgHandler = async () => {
		const content = inputRef.current?.value?.trim();
		if (!content) return;

		if (inputRef.current) inputRef.current.value = "";

		const newMessage: Message = { role: "user", content };
		setChatMessages((prev) => [...prev, newMessage]);

		setIsLoading(true);
		try {
			const chatData = await postChatRequest(content);
			setChatMessages([...chatData.chats]);
		} catch (err) {
			console.error(err);
			toast.error("Failed to send message.");
		} finally {
			setIsLoading(false);
		}
	};

	const deleteChatsToggle = () => {
		setDeleteChatToggle((prev) => !prev);
	};

	const clearChatsHandler = async () => {
		try {
			toast.loading("Deleting Messages ...", { id: "delete-msgs" });
			const data = await deleteAllChats();
			setChatMessages(data.chats);
			setDeleteChatToggle(false);
			toast.success("Deleted Messages Successfully", { id: "delete-msgs" });
		} catch (error: any) {
			toast.error(error.message || "Failed to delete messages", { id: "delete-msgs" });
		}
	};

	const motionVariants = {
		animate: {
			y: [0, -10, 0, -10, 0],
			transition: { type: "spring", y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 } },
		},
		animateReverse: {
			transform: "rotate(180deg)",
			y: "-4",
			transition: { duration: 0.5 },
		},
		initialBtn: { y: "4", opacity: 0 },
		animateBtn: { y: 0, opacity: 1, transition: { duration: 0.5 } },
		exitBtn: { y: "-20", opacity: 0, transition: { duration: 0.5 } },
	};

	const placeHolder = (
		<div className={styles.no_msgs}>
			<h3>GPT 3.5 TURBO</h3>
			<motion.div className={styles.no_msg_logo} variants={motionVariants} animate='animate'>
				<img alt='no msg bot' src={noMsgBot} />
			</motion.div>
			<p>
				It’s quiet in here! Be the first to break the silence and send a message
				to get the conversation going.
			</p>
		</div>
	);

	const chats = chatMessages.map((chat, idx) => (
		<ChatItem key={`${chat.role}-${idx}-${chat.content}`} content={chat.content} role={chat.role} />
	));

	return (
		<div className={styles.parent}>
			<div className={styles.chat} ref={messageContainerRef}>
				{isLoadingChats && <SpinnerOverlay />}
				{!isLoadingChats && (
					<>
						{chatMessages.length === 0 ? placeHolder : chats}
						{isLoading && <ChatLoading />}
					</>
				)}
			</div>

			<div className={styles.inputContainer}>
				<div className={styles.inputArea}>
					<div className={styles.eraseMsgs}>
						<motion.img
							variants={motionVariants}
							animate={!deleteChatToggle ? "animate" : "animateReverse"}
							src={upArrow}
							alt='top icon'
							onClick={deleteChatsToggle}
						/>
						<AnimatePresence>
							{deleteChatToggle && (
								<motion.button
									className={styles.eraseBtn}
									onClick={clearChatsHandler}
									variants={motionVariants}
									initial='initialBtn'
									animate='animateBtn'
									exit='exitBtn'>
									CLEAR CHATS
								</motion.button>
							)}
						</AnimatePresence>
					</div>
					<textarea
						className={styles.textArea}
						maxLength={1500}
						ref={inputRef}
						rows={1}
						disabled={isLoadingChats || isLoading}
						placeholder='Enter your query here'
					/>
					<button className={styles.icon} onClick={sendMsgHandler} disabled={isLoadingChats || isLoading}>
						<img alt='send icon' src={sendIcon} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
