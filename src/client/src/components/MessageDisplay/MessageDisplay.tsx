import React from 'react';
import { Message } from '../../store/messageStore';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';
import { AlertCircle, CheckCircle, User, Bot } from 'lucide-react';

interface MessageDisplayProps {
  message: Message;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return null; // Don't display system messages
  }

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-white" />
        </div>
      )}

      {/* Message Content */}
      <div
        className={`max-w-2xl ${
          isUser
            ? 'bg-blue-600 text-white rounded-lg rounded-tr-none'
            : 'bg-slate-700 text-slate-100 rounded-lg rounded-tl-none'
        } px-4 py-3`}
      >
        {isAssistant ? (
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={message.content} />
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        )}

        {/* Tool Calls Display */}
        {message.toolCalls && message.toolCalls.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-xs font-semibold opacity-75">Tools Used:</div>
            {message.toolCalls.map((toolCall, idx) => (
              <div
                key={idx}
                className="bg-black/20 rounded px-2 py-1 text-xs font-mono"
              >
                <span className="text-green-400">{toolCall.name}</span>
                {Object.keys(toolCall.arguments).length > 0 && (
                  <pre className="mt-1 text-xs overflow-x-auto">
                    {JSON.stringify(toolCall.arguments, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-white" />
        </div>
      )}

      {/* Timestamp */}
      <div className="text-xs text-slate-400 self-end mb-1">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
};
