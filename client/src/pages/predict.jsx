import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import { UploadCloud } from "lucide-react";

function Predict() {
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newChat, setNewChat] = useState(true);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchChats = async () => {
            const response = await axios.get("http://localhost:5000/chatbots");
            setChats(response.data);
        };
        fetchChats();
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setIsLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/predict",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setChats((prev) => [...prev, response.data]);
            setMessages((prev) => [...prev, response.data]);
            setActiveChat(response.data.chat_id);
            setNewChat(false);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (message) => {
        if (!activeChat) return;

        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/chat", {
                chat_id: activeChat,
                message: message,
            });
            setMessages((prev) => [...prev, response.data.data]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const setHandleNewChat = () => {
        setNewChat(true);
        setActiveChat(null);
        return;
    };

    const handleMessagesChange = (data) => {
        setMessages(data);
    };

    return (
        <div className="flex h-screen w-full font-sans">
            <div className="w-1/4 h-full border-r bg-gray-50 p-4">
                <button
                    onClick={() => setHandleNewChat()}
                    className="w-full bg-blue-500 text-white p-2 rounded mb-4 cursor-pointer hover:bg-blue-600"
                >
                    New Chat
                </button>
                {chats.map((chat) => (
                    <div
                        key={chat.chat_id}
                        onClick={() => setActiveChat(chat.chat_id)}
                        className={`p-2 cursor-pointer rounded mb-2 ${activeChat === chat.chat_id
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            }`}
                    >
                        {chat.predicted_label}
                    </div>
                ))}
            </div>
            <div className="flex-1 p-4 h-full flex flex-col">
                {activeChat && (
                    <ChatWindow
                        messages={messages}
                        handleMessagesChange={handleMessagesChange}
                        chat={chats.find((c) => c.chat_id === activeChat)}
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                )}
                {newChat && !activeChat && (
                    <div className="flex justify-center items-center h-full bg-gray-100 p-6">
                        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full max-w-md">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Upload Leaf Image
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Upload a leaf image to analyze its medicinal properties and
                                start a conversation.
                            </p>
                            <label
                                htmlFor="file-upload"
                                className="mt-4 flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                            >
                                <UploadCloud className="w-10 h-10 text-blue-500" />
                                <span className="mt-2 text-blue-500 font-medium">
                                    {"Click to Upload"}
                                </span>
                            </label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="file-upload"
                                accept="image/*"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
const ChatWindow = ({
    messages,
    handleMessagesChange,
    chat,
    onSendMessage,
    isLoading,
}) => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [chatInfo, setChatInfo] = useState("");
    // Fetch chat history when the component mounts or when chat.chat_id changes
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/chathistory/${chat.chat_id}`
                );

                handleMessagesChange(response.data.messages || []);
                setChatInfo(response.data.gemini_info || "");
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };
        fetchChatHistory();
    }, [chat]);

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };
    return (
        <div className="flex-1 flex flex-col h-full">
            <div className="flex-1 h-full overflow-y-auto p-4 border rounded bg-white">
                {chatInfo && (
                    <div className={`mb-4 text-left`}>
                        <div className="flex justify-start">
                            <FaRobot className="mr-2 text-green-500" />
                            <div className="bg-gray-100 p-3 rounded-lg max-w-3xl">
                                <Markdown>{chatInfo}</Markdown>
                            </div>
                        </div>
                    </div>
                )}
                {messages &&
                    messages.map((msg, index) => (
                        <>
                            <div key={index} className={`mb-4 text-right`}>
                                <div className="flex justify-end">
                                    <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                                        {msg.user}
                                    </div>
                                    <FaUser className="ml-2 text-blue-500" />
                                </div>
                            </div>
                            <div key={index + "Bot"} className={`mb-4 text-left`}>
                                <div className="flex justify-start">
                                    <FaRobot className="mr-2 text-green-500" />
                                    <div className="bg-gray-100 p-3 rounded-lg max-w-3xl">
                                        <Markdown>{msg.bot}</Markdown>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                {isLoading && (
                    <div className="flex justify-center gap-2">
                        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
                    </div>
                )}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 p-2 border rounded mr-2"
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Predict;
