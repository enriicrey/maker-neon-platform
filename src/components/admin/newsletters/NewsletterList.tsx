
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Send,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Newsletter {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  sent_at: string | null;
  open_rate: number;
  click_rate: number;
  total_recipients: number;
  newsletter_categories: {
    name: string;
    color: string;
  } | null;
}

const statusColors = {
  draft: 'bg-gray-500',
  scheduled: 'bg-yellow-500',
  sent: 'bg-green-500',
  archived: 'bg-blue-500',
  deleted: 'bg-red-500',
};

const NewsletterList: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletters')
        .select(`
          id,
          title,
          slug,
          status,
          created_at,
          sent_at,
          open_rate,
          click_rate,
          total_recipients,
          newsletter_categories (
            name,
            color
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNewsletters(data || []);
    } catch (error) {
      console.error('Error fetching newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || newsletter.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteNewsletter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('newsletters')
        .update({ status: 'deleted' })
        .eq('id', id);

      if (error) throw error;
      fetchNewsletters();
    } catch (error) {
      console.error('Error deleting newsletter:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-64 bg-gray-800 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Newsletters</h2>
          <p className="text-gray-400">Gestiona todas las newsletters del sistema</p>
        </div>
        <Link to="/admin/newsletters/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Newsletter
          </Button>
        </Link>
      </div>

      <Card className="bg-dark-surface border-dark-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Lista de Newsletters</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar newsletters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="all">Todos los estados</option>
                <option value="draft">Borrador</option>
                <option value="scheduled">Programada</option>
                <option value="sent">Enviada</option>
                <option value="archived">Archivada</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Título</TableHead>
                <TableHead className="text-gray-400">Estado</TableHead>
                <TableHead className="text-gray-400">Categoría</TableHead>
                <TableHead className="text-gray-400">Fecha</TableHead>
                <TableHead className="text-gray-400">Estadísticas</TableHead>
                <TableHead className="text-gray-400">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNewsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="text-white font-medium">
                    {newsletter.title}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${statusColors[newsletter.status as keyof typeof statusColors]} text-white`}
                    >
                      {newsletter.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {newsletter.newsletter_categories && (
                      <Badge 
                        style={{ backgroundColor: newsletter.newsletter_categories.color }}
                        className="text-white"
                      >
                        {newsletter.newsletter_categories.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(newsletter.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {newsletter.status === 'sent' && (
                      <div className="text-xs">
                        <div>Abierto: {newsletter.open_rate}%</div>
                        <div>Clics: {newsletter.click_rate}%</div>
                        <div>Recipients: {newsletter.total_recipients}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem className="text-gray-300">
                          <Eye className="mr-2 h-4 w-4" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {newsletter.status === 'draft' && (
                          <DropdownMenuItem className="text-gray-300">
                            <Send className="mr-2 h-4 w-4" />
                            Enviar
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-gray-300">
                          <Calendar className="mr-2 h-4 w-4" />
                          Programar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-400"
                          onClick={() => handleDeleteNewsletter(newsletter.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterList;
