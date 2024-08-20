// import React, { useState } from 'react';

// // Define your predefined questions and responses
// const predefinedQuestions = [
//   'What is your return policy?',
//   'How can I track my order?',
//   'What are your shipping options?',
//   // Add more questions here
// ];

// const predefinedResponses = {
//   'What is your return policy?': 'Our return policy allows for returns within 30 days of purchase.',
//   'How can I track my order?': 'You can track your order by logging into your account and visiting the "Order History" section.',
//   'What are your shipping options?': 'We offer standard, expedited, and overnight shipping options.',
//   // Add more questions and answers here
// };

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [showQuestions, setShowQuestions] = useState(true);

//   const handleSend = () => {
//     if (input.trim()) {
//       const userMessage = { text: input, sender: 'user' };
//       setMessages([...messages, userMessage]);

//       // Find predefined response
//       const response = predefinedResponses[input] || 'Sorry, I did not understand that. Can you please rephrase?';
//       const botMessage = { text: response, sender: 'bot' };
//       setMessages([...messages, userMessage, botMessage]);

//       setInput('');
//       setShowQuestions(false);
//     }
//   };

//   const handleQuestionClick = (question) => {
//     const userMessage = { text: question, sender: 'user' };
//     setMessages([...messages, userMessage]);

//     const response = predefinedResponses[question] || 'Sorry, I did not understand that. Can you please rephrase?';
//     const botMessage = { text: response, sender: 'bot' };
//     setMessages([...messages, userMessage, botMessage]);

//     setShowQuestions(false);
//   };

//   return (
//     <div className="chat-container fixed bottom-0 right-0 w-full max-w-md bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
//       <div className="chat-messages flex-1 p-4 space-y-4 overflow-y-auto">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.sender} p-2 rounded-lg ${
//               msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       {showQuestions ? (
//         <div className="questions-list p-4 bg-gray-100">
//           <h2 className="text-lg font-bold mb-2">Frequently Asked Questions</h2>
//           <ul className="space-y-2">
//             {predefinedQuestions.map((question, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleQuestionClick(question)}
//                 className="cursor-pointer text-blue-600 hover:text-blue-800"
//               >
//                 {question}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="chat-input flex items-center p-2 border-t border-gray-200">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 p-2 border rounded-lg"
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSend}
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Send
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
