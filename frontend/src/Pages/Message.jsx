import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Message = () => {
  const { id } = useParams(); 
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/getSingleMessage/${id}`);
        setMessage(res.data.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch message.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMessage();
    } else {
      setError("No message ID provided.");
      setIsLoading(false);
    }
  }, [id]);

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Message Details</h1>
        {isLoading ? (
          <p className="text-gray-500">Loading message...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          message && (
            <div className="space-y-4">
              <p><strong>Sender:</strong> {message.sender}</p>
              <p><strong>Room:</strong> {message.room}</p>
              <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
              <p className="text-gray-800 text-lg">{message.content}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
