
import { BarChart3, Download, Mail, Users, TrendingUp, Clock } from 'lucide-react';
import Layout from '../components/Layout';

const Dashboard = () => {
  const stats = [
    {
      title: 'Downloads Totales',
      value: '1,234',
      change: '+12%',
      positive: true,
      icon: Download,
    },
    {
      title: 'Newsletters Leídos',
      value: '87',
      change: '+8%',
      positive: true,
      icon: Mail,
    },
    {
      title: 'Drops Favoritos',
      value: '23',
      change: '+5',
      positive: true,
      icon: Users,
    },
    {
      title: 'Tiempo de Lectura',
      value: '4.2h',
      change: '+15min',
      positive: true,
      icon: Clock,
    },
  ];

  const recentActivity = [
    {
      action: 'Descargó',
      item: 'Fantasy Miniatures Pack Vol.1',
      time: 'Hace 2 horas',
    },
    {
      action: 'Leyó',
      item: 'Newsletter: IA en Impresión 3D',
      time: 'Hace 5 horas',
    },
    {
      action: 'Guardó',
      item: 'Tutorial: Soportes Avanzados',
      time: 'Hace 1 día',
    },
    {
      action: 'Comentó',
      item: 'Architectural Elements Pro',
      time: 'Hace 2 días',
    },
  ];

  const recommendedDrops = [
    {
      title: 'Sci-Fi Weapons Pack',
      downloads: '2.1K',
      rating: 4.8,
    },
    {
      title: 'Organic Shapes Collection',
      downloads: '1.7K',
      rating: 4.9,
    },
    {
      title: 'Mechanical Parts Library',
      downloads: '3.2K',
      rating: 4.7,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-dark-bg to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Bienvenido de vuelta, <span className="text-gradient">Maker</span>
              </h1>
              <p className="text-muted-foreground">
                Aquí tienes un resumen de tu actividad y contenido personalizado.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Plan Pro Activo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card-neon">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className={`text-sm font-medium ${
                    stat.positive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="card-neon">
                <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Actividad Reciente</span>
                </h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-dark-surface rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Download className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{' '}
                          <span className="text-primary">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="card-neon">
                <h3 className="font-semibold mb-4">Progreso del Mes</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Downloads</span>
                      <span>12/15</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Newsletters</span>
                      <span>4/4</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div className="card-neon">
                <h3 className="font-semibold mb-4">Recomendado para Ti</h3>
                <div className="space-y-3">
                  {recommendedDrops.map((drop, index) => (
                    <div key={index} className="p-3 bg-dark-surface rounded-lg">
                      <h4 className="font-medium text-sm mb-1">{drop.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{drop.downloads} downloads</span>
                        <span>⭐ {drop.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
