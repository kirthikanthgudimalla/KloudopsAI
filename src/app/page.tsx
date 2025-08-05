import Link from 'next/link';
import { ArrowRight, Users, Briefcase, Code, Shield, Zap } from 'lucide-react';
import DevOpsAnimatedBackground from '@/components/DevOpsAnimatedBackground';
import KloudOpsLogo from '@/components/KloudOpsLogo';

export default function Home() {
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Complete <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevOps Services</span> Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connect DevOps professionals, job seekers, and freelancers in one comprehensive platform. 
              Get end-to-end DevOps solutions for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center justify-center transition-all hover:scale-105 animate-glow"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-all hover:scale-105 bg-white/50 backdrop-blur-sm"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>

        {/* User Types Section */}
        <section className="bg-white/80 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Serve</h2>
              <p className="text-lg text-gray-600">Join our community of DevOps professionals</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all bg-white/50 backdrop-blur-sm animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.1s' }}>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">DevOps Users</h3>
                <p className="text-gray-600 mb-4">
                  Businesses and teams looking for reliable DevOps services and solutions
                </p>
                <Link
                  href="/auth/register?type=devops-user"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Join as DevOps User
                </Link>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all bg-white/50 backdrop-blur-sm animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.2s' }}>
                <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Job Seekers</h3>
                <p className="text-gray-600 mb-4">
                  DevOps professionals seeking new opportunities and career growth
                </p>
                <Link
                  href="/auth/register?type=job-seeker"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Find DevOps Jobs
                </Link>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all bg-white/50 backdrop-blur-sm animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.3s' }}>
                <Code className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Freelancers</h3>
                <p className="text-gray-600 mb-4">
                  Independent DevOps consultants offering specialized services
                </p>
                <Link
                  href="/auth/register?type=freelancer"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Offer Your Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our DevOps Services</h2>
              <p className="text-lg text-gray-600">Comprehensive solutions for your infrastructure needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-lg transition-all animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.1s' }}>
                <KloudOpsLogo size="lg" showText={false} className="mb-4" />
                <h3 className="text-lg font-semibold mb-2">Cloud Infrastructure</h3>
                <p className="text-gray-600">AWS, Azure, GCP deployment and management services</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-lg transition-all animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.2s' }}>
                <Zap className="h-10 w-10 text-yellow-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">CI/CD Pipelines</h3>
                <p className="text-gray-600">Automated deployment and continuous integration solutions</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-lg transition-all animate-fade-in-up hover:scale-105" style={{ animationDelay: '0.3s' }}>
                <Shield className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Security & Monitoring</h3>
                <p className="text-gray-600">Infrastructure security and real-time monitoring systems</p>
              </div>
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
                  <li><Link href="/services/cloud" className="hover:text-white transition-colors">Cloud Infrastructure</Link></li>
                  <li><Link href="/services/cicd" className="hover:text-white transition-colors">CI/CD Pipelines</Link></li>
                  <li><Link href="/services/monitoring" className="hover:text-white transition-colors">Monitoring</Link></li>
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
