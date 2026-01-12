import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  styled,
  useTheme,
  Badge,
  CircularProgress,
} from "@mui/material";
import { Send, Search } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "axios.js";
import useAuth from "app/hooks/useAuth";

const ChatContainer = styled(Box)(({ theme }) => ({
  margin: "30px",
  height: "calc(100vh - 160px)",
  display: "flex",
  gap: "20px",
}));

const ContactList = styled(Card)(({ theme }) => ({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const MessageWindow = styled(Card)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const MessageList = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const MessageBubble = styled(Box)(({ theme, isOwn }) => ({
  maxWidth: "70%",
  padding: "10px 15px",
  borderRadius: isOwn ? "20px 20px 0 20px" : "20px 20px 20px 0",
  backgroundColor: isOwn ? theme.palette.primary.main : theme.palette.grey[200],
  color: isOwn ? "#fff" : "inherit",
  alignSelf: isOwn ? "flex-end" : "flex-start",
}));

const ChatRoom = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (activeContact) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
      return () => clearInterval(interval);
    }
  }, [activeContact]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get("api/Chat/contacts");
      setContacts(res.data);
      if (res.data.length > 0) setActiveContact(res.data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!activeContact) return;
    try {
      const res = await axiosInstance.get(
        `api/Chat/messages/${activeContact.id}`
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    try {
      const res = await axiosInstance.post("api/Chat/send", {
        receiverId: activeContact.id,
        message: newMessage,
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <ChatContainer>
      <ContactList>
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold">
            Messages
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search contacts..."
            sx={{ mt: 1 }}
            InputProps={{
              startAdornment: (
                <Search fontSize="small" sx={{ mr: 1, color: "grey.500" }} />
              ),
            }}
          />
        </Box>
        <Divider />
        <List sx={{ flex: 1, overflowY: "auto" }}>
          {contacts.map((c) => (
            <ListItem
              button
              key={c.id}
              selected={activeContact?.id === c.id}
              onClick={() => setActiveContact(c)}
            >
              <ListItemAvatar>
                <Badge color="success" variant="dot" invisible={false}>
                  <Avatar>{c.userName[0]}</Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={c.userName}
                secondary={c.type}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
          ))}
        </List>
      </ContactList>

      <MessageWindow>
        {activeContact ? (
          <>
            <Box p={2} display="flex" alignItems="center">
              <Avatar sx={{ mr: 2 }}>{activeContact.userName[0]}</Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {activeContact.userName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Online
                </Typography>
              </Box>
            </Box>
            <Divider />
            <MessageList ref={scrollRef}>
              {messages.map((m) => (
                <MessageBubble key={m.id} isOwn={m.senderId === user.id}>
                  <Typography variant="body2">{m.message}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      display: "block",
                      textAlign: "right",
                      mt: 0.5,
                    }}
                  >
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </MessageBubble>
              ))}
            </MessageList>
            <Divider />
            <Box
              p={2}
              component="form"
              onSubmit={handleSendMessage}
              display="flex"
            >
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                size="small"
              />
              <IconButton color="primary" type="submit" sx={{ ml: 1 }}>
                <Send />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h6" color="textSecondary">
              Select a contact to start chatting
            </Typography>
          </Box>
        )}
      </MessageWindow>
    </ChatContainer>
  );
};

export default ChatRoom;
