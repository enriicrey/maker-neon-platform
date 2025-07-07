
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, Link, Code, Quote, Eye } from 'lucide-react';
import { CommentFormData } from '@/types/comment';

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  parentId?: string;
  isReply?: boolean;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const CommentForm = ({ onSubmit, parentId, isReply = false, onCancel, isSubmitting = false }: CommentFormProps) => {
  const [formData, setFormData] = useState<CommentFormData>({
    author: '',
    email: '',
    content: isReply ? `@usuario ` : '',
    parentId
  });
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Partial<CommentFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<CommentFormData> = {};
    
    if (!formData.author.trim()) {
      newErrors.author = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'El comentario no puede estar vacío';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'El comentario no puede exceder 1000 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      if (!isReply) {
        setFormData({ author: '', email: '', content: '', parentId });
      }
    }
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = formData.content.slice(start, end);
      const newContent = 
        formData.content.slice(0, start) + 
        before + selectedText + after + 
        formData.content.slice(end);
      
      setFormData({ ...formData, content: newContent });
    }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-green-400">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-green-400 hover:underline">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-green-400 pl-4 italic text-gray-300">$1</blockquote>');
  };

  return (
    <form onSubmit={handleSubmit} className={`bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-6 ${isReply ? 'mt-4 ml-8' : 'mt-8'}`}>
      <div className="flex flex-col space-y-4">
        {!isReply && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Tu nombre"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {errors.author && <p className="text-red-400 text-sm mt-1">{errors.author}</p>}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Tu email (no se mostrará)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
        )}

        <div>
          {/* Formatting Toolbar */}
          <div className="flex items-center space-x-2 mb-3 p-2 bg-gray-800/50 rounded-lg">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Negrita (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Cursiva (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('`', '`')}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Código (Ctrl+`)"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[', '](url)')}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Link (Ctrl+K)"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ', '')}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Cita (Ctrl+Q)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
              title="Vista previa"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {showPreview ? (
            <div 
              className="min-h-[120px] p-3 bg-gray-800/30 border border-gray-700 rounded-lg text-gray-100"
              dangerouslySetInnerHTML={{ __html: formatContent(formData.content) }}
            />
          ) : (
            <Textarea
              placeholder={isReply ? "Escribe tu respuesta..." : "¿Qué opinas sobre este artículo?"}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="min-h-[120px] bg-gray-800 border-gray-700 text-white resize-none"
            />
          )}
          
          <div className="flex justify-between items-center mt-2">
            {errors.content && <p className="text-red-400 text-sm">{errors.content}</p>}
            <div className="flex-1" />
            <p className={`text-sm ${formData.content.length > 900 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.content.length}/1000
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {isReply && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            {isSubmitting ? 'Publicando...' : (isReply ? 'Responder' : 'Publicar comentario')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
