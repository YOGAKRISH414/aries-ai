
import { useRef, useEffect } from "react";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const styles = getStyles(darkMode);

  const sendMessage = async () => {
  if (message.trim() === "") return;

  const userMessage = message;

  const updatedChat = [...chat, { role: "user", content: userMessage }];
  setChat(updatedChat);
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("https://aries-ai.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedChat }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);


  return (
  <div style={styles.container}>
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" ,height: "30px",alignItems: "center",
       borderRadius: "10px", background: darkMode ? "#333" : "#f5f5f5",}}>
  <h3>Aries Chat</h3>
  <button onClick={() => setDarkMode(!darkMode)}>🌙</button>
</div>

    <div style={styles.chatBox}>
      {chat.map((msg, index) => (
        <div
          key={index}
          style={
            msg.role === "user"
              ? styles.userMessage
              : styles.aiMessage
          }
        >
          {msg.content}
          <div ref={chatEndRef} />
        </div>
      ))}
    </div>

    <div style={styles.inputArea}>
      <input
          style={styles.input}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
        />
      <button style={styles.button} onClick={sendMessage}>
        Send
      </button>
     

      {loading && (
  <div style={styles.aiMessage}>
    Aries is typing...
  </div>
)}
    </div>

    {/* 👇 THIS IS THE CHAT DISPLAY */}
    <div style={{ marginBottom: "20px" }}>
      
      
   {/* coment below is the old code, above is the new code */}
   {/*chat.map((msg, index) => (
        <div key={index}>
          {msg.user && (
            <div>
              <strong>You:</strong> {msg.user}
            </div>
          )}
          {msg.ai && (
            <div>
              <strong>AI:</strong> {msg.ai}
            </div>
          )}
        </div>
   ))}*/}
    </div>

    {/* 👇 INPUT AREA */}
    {/*<input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message"
    />

    <button onClick={sendMessage}>Send</button>*/}
  </div>
);

}
const getStyles = (darkMode) => ({
  container: {
    width: "400px",
    height: "600px",
    margin: "30px auto",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #ccc",
    color: darkMode ? "#fff" : "#000",
    borderRadius: "10px",
    overflow: "hidden",
    background: darkMode ? "#1e1e1e" : "#fff",
  },

 chatBox: {
  flex: 1,
  padding: "15px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
},

  userMessage: {
    alignSelf: "flex-end",
    background: "#007bff",
    color: "white",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "70%",
  },

  aiMessage: {
    alignSelf: "flex-start",
    background: darkMode ? "#444" : "#e5e5e5",
    color: darkMode ? "#fff" : "#000",
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputArea: {
  display: "flex",
  padding: "10px",
  borderTop: "1px solid #ccc",
  gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
  padding: "10px 15px",
  borderRadius: "20px",
  background: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
},
});

export default App;