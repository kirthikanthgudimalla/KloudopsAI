import Link from 'next/link';
import { 
  Zap, 
  Shield, 
  Monitor, 
  Database, 
  GitBranch,
  Server,
  Lock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import DevOpsAnimatedBackground from '@/components/DevOpsAnimatedBackground';
import KloudOpsLogo from '@/components/KloudOpsLogo';

export default function Services() {
  const services = [
    {
      id: 'cloud-infrastructure',
      title: 'Cloud Infrastructure',
      description: 'Complete cloud setup and management across AWS, Azure, and Google Cloud Platform',
      icon: Server,
      color: 'blue',
      features: [
        'Multi-cloud architecture design',
        'Infrastructure as Code (IaC)',
        'Cost optimization strategies',
        'Migration services',
        'Disaster recovery planning'
      ],
      pricing: 'Starting at $500/month'
    },
    {
      id: 'cicd-pipelines',
      title: 'CI/CD Pipelines',
      description: 'Automated deployment pipelines for faster, reliable software delivery',
      icon: Zap,
      color: 'yellow',
      features: [
        'Jenkins, GitLab CI, GitHub Actions',
        'Automated testing integration',
        'Blue-green deployments',
        'Rollback strategies',
        'Pipeline monitoring'
      ],
      pricing: 'Starting at $300/month'
    },
    {
      id: 'monitoring-observability',
      title: 'Monitoring & Observability',
      description: 'Comprehensive monitoring solutions for infrastructure and applications',
      icon: Monitor,
      color: 'green',
      features: [
        'Real-time monitoring dashboards',
        'Log aggregation and analysis',
        'Performance metrics tracking',
        'Alert management',
        'APM integration'
      ],
      pricing: 'Starting at $200/month'
    },
    {
      id: 'security-compliance',
      title: 'Security & Compliance',
      description: 'Enterprise-grade security and compliance management',
      icon: Shield,
      color: 'red',
      features: [
        'Security audits and assessments',
        'Compliance frameworks (SOC2, HIPAA)',
        'Vulnerability management',
        'Identity and access management',
        'Security automation'
      ],
      pricing: 'Starting at $400/month'
    },
    {
      id: 'database-management',
      title: 'Database Management',
      description: 'Database optimization, backup, and scaling solutions',
      icon: Database,
      color: 'purple',
      features: [
        'Database performance tuning',
        'Automated backup solutions',
        'High availability setup',
        'Migration services',
        'Database monitoring'
      ],
      pricing: 'Starting at $250/month'
    },
    {
      id: 'version-control',
      title: 'Version Control & GitOps',
      description: 'Git workflow optimization and GitOps implementation',
      icon: GitBranch,
      color: 'indigo',
      features: [
        'Git workflow design',
        'Branch strategy implementation',
        'GitOps pipeline setup',
        'Code quality automation',
        'Collaboration tools setup'
      ],
      pricing: 'Starting at $150/month'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-100',
      yellow: 'text-yellow-600 bg-yellow-100',
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colorMap[color as keyof typeof colorMap] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen relative">
      <DevOpsAnimatedBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <KloudOpsLogo size="md" className="animate-slide-in" />
              </div>
              <div className="flex items-center space-x-4 animate-slide-in">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all hover:scale-105 animate-glow"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-white/80 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Comprehensive <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevOps Services</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              End-to-end DevOps solutions to accelerate your development process, 
              improve reliability, and scale your infrastructure efficiently.
            </p>
            <Link
              href="/auth/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium inline-flex items-center transition-all hover:scale-105 animate-glow animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all animate-fade-in-up hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${getColorClasses(service.color)}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Pricing */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          {service.pricing}
                        </span>
                        <Link
                          href={`/services/${service.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center transition-colors"
                        >
                          Learn More <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white/80 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose KloudOps AI?</h2>
              <p className="text-lg text-gray-600">Expert DevOps professionals delivering exceptional results</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Server className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
                <p className="text-gray-600">Certified DevOps engineers with years of enterprise experience</p>
              </div>
              
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Security First</h3>
                <p className="text-gray-600">Enterprise-grade security practices and compliance standards</p>
              </div>
              
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round-the-clock monitoring and support for your infrastructure</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600/90 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
              Ready to Transform Your DevOps?
            </h2>
            <p className="text-xl text-blue-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join hundreds of companies already using our DevOps services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition-all hover:scale-105"
              >
                Start Free Consultation
              </Link>
              <Link
                href="/contact"
                className="border border-white text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all hover:scale-105"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900/90 backdrop-blur-sm text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="animate-fade-in-up">
                <KloudOpsLogo size="sm" textSize="text-lg" className="mb-4" />
                <p className="text-gray-400">
                  Your trusted partner for comprehensive DevOps services and solutions.
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services/cloud-infrastructure" className="hover:text-white transition-colors">Cloud Infrastructure</Link></li>
                  <li><Link href="/services/cicd-pipelines" className="hover:text-white transition-colors">CI/CD Pipelines</Link></li>
                  <li><Link href="/services/monitoring-observability" className="hover:text-white transition-colors">Monitoring</Link></li>
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h4 className="text-lg font-semibold mb-4">Community</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/jobs" className="hover:text-white transition-colors">Job Board</Link></li>
                  <li><Link href="/freelancers" className="hover:text-white transition-colors">Find Freelancers</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                </ul>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p>&copy; 2025 KloudOps AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
