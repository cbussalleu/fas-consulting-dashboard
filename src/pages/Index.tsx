import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-display mb-6">Findasense Consulting Dashboard</h1>
        <Link 
          to="/dashboard" 
          className="bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Index;
