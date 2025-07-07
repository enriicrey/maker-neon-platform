
import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUpDown } from 'lucide-react';
import { Comment, CommentFormData, CommentSortOption, CommentStats } from '@/types/comment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CommentsSectionProps {
  newsletterId: number;
}

const CommentsSection = ({ newsletterId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<CommentSortOption>('newest');
  const [stats, setStats] = useState<CommentStats>({ totalComments: 0, totalReplies: 0 });
  const [showComments, setShowComments] = useState(false);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockComments: Comment[] = [
        {
          id: '1',
          author: 'María González',
          email: 'maria@example.com',
          content: 'Excelente artículo sobre SaaS. Me ha ayudado mucho a entender los conceptos básicos. **¿Podrías hacer un seguimiento** sobre monetización?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          likes: 12,
          replies: [
            {
              id: '2',
              author: 'Autor del Newsletter',
              email: 'autor@example.com',
              content: '@María ¡Gracias por el feedback! Definitivamente haré un artículo sobre estrategias de monetización la próxima semana.',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
              likes: 8,
              replies: [],
              isAuthor: true,
              parentId: '1',
              isReported: false,
              helpfulVotes: 5,
              userHasLiked: false,
              userHasVotedHelpful: false
            }
          ],
          isAuthor: false,
          isReported: false,
          helpfulVotes: 15,
          userHasLiked: false,
          userHasVotedHelpful: true
        },
        {
          id: '3',
          author: 'Carlos Ruiz',
          email: 'carlos@example.com',
          content: 'Muy útil la sección sobre validación de ideas. Yo cometí el error de construir algo que nadie quería. > "La mayoría de startups fallan no porque el producto sea malo..." Esta frase resume todo.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          likes: 7,
          replies: [],
          isAuthor: false,
          isReported: false,
          helpfulVotes: 23,
          userHasLiked: true,
          userHasVotedHelpful: false
        }
      ];
      
      setComments(mockComments);
      setStats({
        totalComments: mockComments.length,
        totalReplies: mockComments.reduce((acc, comment) => acc + comment.replies.length, 0)
      });
      setIsLoading(false);
    };

    if (showComments) {
      loadComments();
    }
  }, [newsletterId, showComments]);

  const handleNewComment = async (data: CommentFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: data.author,
      email: data.email,
      content: data.content,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isAuthor: false,
      isReported: false,
      helpfulVotes: 0,
      userHasLiked: false,
      userHasVotedHelpful: false
    };

    if (data.parentId) {
      // Add as reply
      setComments(prev => prev.map(comment => 
        comment.id === data.parentId 
          ? { ...comment, replies: [...comment.replies, newComment] }
          : comment
      ));
    } else {
      // Add as new comment
      setComments(prev => [newComment, ...prev]);
    }
    
    setStats(prev => ({
      totalComments: data.parentId ? prev.totalComments : prev.totalComments + 1,
      totalReplies: data.parentId ? prev.totalReplies + 1 : prev.totalReplies
    }));
    
    setIsSubmitting(false);
  };

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
          userHasLiked: !comment.userHasLiked
        };
      }
      // Check replies
      return {
        ...comment,
        replies: comment.replies.map(reply => 
          reply.id === commentId
            ? {
                ...reply,
                likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
                userHasLiked: !reply.userHasLiked
              }
            : reply
        )
      };
    }));
  };

  const handleHelpfulVote = (commentId: string, isHelpful: boolean) => {
    if (!isHelpful) return; // For now, only handle helpful votes
    
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          helpfulVotes: comment.userHasVotedHelpful ? comment.helpfulVotes - 1 : comment.helpfulVotes + 1,
          userHasVotedHelpful: !comment.userHasVotedHelpful
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(reply => 
          reply.id === commentId
            ? {
                ...reply,
                helpfulVotes: reply.userHasVotedHelpful ? reply.helpfulVotes - 1 : reply.helpfulVotes + 1,
                userHasVotedHelpful: !reply.userHasVotedHelpful
              }
            : reply
        )
      };
    }));
  };

  const handleReport = (commentId: string) => {
    // In real app, this would open a report modal
    console.log('Report comment:', commentId);
    alert('Comentario reportado. Será revisado por nuestro equipo.');
  };

  const sortComments = (comments: Comment[]) => {
    const sorted = [...comments];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case 'helpful':
        return sorted.sort((a, b) => (b.likes + b.helpfulVotes) - (a.likes + a.helpfulVotes));
      default:
        return sorted;
    }
  };

  const totalCount = stats.totalComments + stats.totalReplies;

  if (!showComments && !isLoading) {
    return (
      <section className="mt-12">
        <Button
          onClick={() => setShowComments(true)}
          variant="outline"
          className="w-full p-6 bg-gray-900/50 backdrop-blur border-gray-800 hover:border-green-400"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Ver comentarios ({totalCount > 0 ? totalCount : '0'})
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-12 bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <MessageCircle className="w-6 h-6 mr-2" />
          Comentarios ({totalCount})
        </h3>
        
        {comments.length > 0 && (
          <Select value={sortBy} onValueChange={(value: CommentSortOption) => setSortBy(value)}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="helpful">Más útiles</SelectItem>
              <SelectItem value="oldest">Más antiguos</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Comment Form */}
      <CommentForm 
        onSubmit={handleNewComment}
        isSubmitting={isSubmitting}
      />

      {/* Comments List */}
      <div className="mt-8">
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-700 rounded w-32 mb-2" />
                    <div className="h-3 bg-gray-700 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-400 mb-2">Sé el primero en comentar</h4>
            <p className="text-gray-500">¡Comparte tu opinión sobre este artículo!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sortComments(comments).map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleNewComment}
                onLike={handleLike}
                onHelpfulVote={handleHelpfulVote}
                onReport={handleReport}
              />
            ))}
          </div>
        )}
      </div>

      {/* Guidelines Link */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p className="text-sm text-gray-400 text-center">
          Al comentar, aceptas nuestras{' '}
          <a href="#" className="text-green-400 hover:underline">
            políticas de comentarios
          </a>
          . Mantén el respeto y la constructividad.
        </p>
      </div>
    </section>
  );
};

export default CommentsSection;
