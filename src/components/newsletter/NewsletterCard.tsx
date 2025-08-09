import { Clock, Eye, Share2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Newsletter } from '@/types/newsletter';
import { memo, useCallback, useMemo } from 'react';

interface NewsletterCardProps {
  newsletter: Newsletter;
  onClick?: (newsletter: Newsletter) => void;
}

const NewsletterCard = memo(({ newsletter, onClick }: NewsletterCardProps) => {
  const navigate = useNavigate();
  
  const categoryLabels = useMemo(() => ({
    'drops-exclusivos': '🔥 Drops Exclusivos',
    'tutoriales-tecnicos': '🛠️ Tutoriales Técnicos',
    'estrategias-negocio': '💰 Estrategias de Negocio',
    'tendencias-sector': '🌟 Tendencias del Sector',
    'casos-estudio': '📊 Casos de Estudio',
  }), []);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(newsletter);
    } else {
      navigate(`/newsletter/${newsletter.id}`);
    }
  }, [onClick, newsletter, navigate]);

  return (
    <article
      className={`card-neon group cursor-pointer transition-all duration-300 hover:scale-105 ${
        newsletter.featured ? 'border-primary/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="aspect-video bg-dark-surface rounded-lg overflow-hidden mb-4">
        {newsletter.image ? (
          <img 
            src={newsletter.image} 
            alt={newsletter.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-neon-cyan/20 flex items-center justify-center">
            <span className="text-2xl">{categoryLabels[newsletter.category].split(' ')[0]}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {categoryLabels[newsletter.category]}
          </span>
          {newsletter.featured && (
            <span className="text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded">
              DESTACADO
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
          {newsletter.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {newsletter.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-dark-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{newsletter.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{newsletter.views}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Share2 className="w-3 h-3" />
              <span>{newsletter.popularity.shares}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{newsletter.popularity.comments}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {newsletter.date}
        </div>
      </div>
    </article>
  );
});

export default NewsletterCard;
