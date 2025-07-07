
export interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isAuthor: boolean;
  parentId?: string;
  isReported: boolean;
  helpfulVotes: number;
  userHasLiked?: boolean;
  userHasVotedHelpful?: boolean;
}

export interface CommentFormData {
  author: string;
  email: string;
  content: string;
  parentId?: string;
}

export type CommentSortOption = 'newest' | 'helpful' | 'oldest' | 'conversation';

export interface CommentStats {
  totalComments: number;
  totalReplies: number;
}
