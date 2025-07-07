
import { useState } from 'react';
import { Heart, MessageCircle, Flag, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Comment } from '@/types/comment';
import CommentForm from './CommentForm';
import { Button } from '@/components/ui/button';

interface CommentItemProps {
  comment: Comment;
  onReply: (data: any) => void;
  onLike: (commentId: string) => void;
  onHelpfulVote: (commentId: string, isHelpful: boolean) => void;
  onReport: (commentId: string) => void;
  depth?: number;
  maxDepth?: number;
}

const CommentItem = ({ 
  comment, 
  onReply, 
  onLike, 
  onHelpfulVote, 
  onReport, 
  depth = 0, 
  maxDepth = 3 
}: CommentItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'hace unos minutos';
    if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    if (diffInDays < 7) return `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const generateAvatar = (email: string, name: string) => {
    // Simple avatar generation - in real app, use Gravatar
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
    const colorIndex = email.charCodeAt(0) % colors.length;
    
    return (
      <div className={`w-10 h-10 ${comment.isAuthor ? 'w-12 h-12' : ''} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
        {getInitials(name)}
      </div>
    );
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-green-400">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-400 hover:underline" target="_blank">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-green-400 pl-4 italic text-gray-300 my-2">$1</blockquote>')
      .replace(/\n/g, '<br>');
  };

  const handleReplySubmit = async (data: any) => {
    setIsSubmittingReply(true);
    await onReply({ ...data, parentId: comment.id });
    setIsSubmittingReply(false);
    setShowReplyForm(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-gray-800 pl-6' : ''} ${comment.isAuthor ? 'border-l-2 border-green-400 pl-4 bg-green-400/5' : ''}`}>
      <div className="flex space-x-3 mb-4">
        {generateAvatar(comment.email, comment.author)}
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-white">{comment.author}</span>
            {comment.isAuthor && (
              <span className="bg-green-500 text-black px-2 py-1 rounded-full text-xs font-semibold">
                AUTOR
              </span>
            )}
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">{getTimeAgo(comment.timestamp)}</span>
          </div>

          <div 
            className="text-gray-100 mb-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(comment.content) }}
          />

          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center space-x-1 hover:text-red-400 transition-colors ${
                comment.userHasLiked ? 'text-red-400' : 'text-gray-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.userHasLiked ? 'fill-current' : ''}`} />
              <span>{comment.likes}</span>
            </button>

            {depth < maxDepth && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Responder</span>
              </button>
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onHelpfulVote(comment.id, true)}
                className={`p-1 hover:text-green-400 transition-colors ${
                  comment.userHasVotedHelpful ? 'text-green-400' : 'text-gray-400'
                }`}
                title="Útil"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onHelpfulVote(comment.id, false)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                title="No útil"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onReport(comment.id)}
              className="p-1 text-gray-400 hover:text-yellow-400 transition-colors"
              title="Reportar"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

          {comment.helpfulVotes > 0 && (
            <p className="text-xs text-gray-400 mt-2">
              {comment.helpfulVotes} persona{comment.helpfulVotes > 1 ? 's' : ''} encontraron esto útil
            </p>
          )}
        </div>
      </div>

      {showReplyForm && (
        <CommentForm
          onSubmit={handleReplySubmit}
          parentId={comment.id}
          isReply={true}
          onCancel={() => setShowReplyForm(false)}
          isSubmitting={isSubmittingReply}
        />
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.length > 3 && (
            <Button
              variant="ghost"
              onClick={() => setShowReplies(!showReplies)}
              className="text-gray-400 hover:text-white text-sm mb-3"
            >
              {showReplies ? 'Ocultar' : 'Ver'} {comment.replies.length} respuesta{comment.replies.length > 1 ? 's' : ''}
            </Button>
          )}
          
          {(showReplies || comment.replies.length <= 3) && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onLike={onLike}
                  onHelpfulVote={onHelpfulVote}
                  onReport={onReport}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
