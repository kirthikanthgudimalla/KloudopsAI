'use client';

import { useEffect, useState } from 'react';
import { 
  Cloud, 
  Server, 
  Database, 
  GitBranch, 
  Settings, 
  Zap,
  Shield,
  Monitor
} from 'lucide-react';
import { Container, Network } from './CustomIcons';

interface FloatingIcon {
  id: number;
  Icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export default function DevOpsAnimatedBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const devOpsIcons = [
      Cloud, Server, Database, GitBranch, Settings, 
      Zap, Shield, Monitor, Container, Network
    ];

    const generateIcons = () => {
      const newIcons: FloatingIcon[] = [];
      for (let i = 0; i < 20; i++) {
        newIcons.push({
          id: i,
          Icon: devOpsIcons[Math.floor(Math.random() * devOpsIcons.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 20,
          duration: 15 + Math.random() * 10,
          size: 20 + Math.random() * 30,
        });
      }
      setIcons(newIcons);
    };

    generateIcons();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating DevOps Icons */}
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="absolute animate-float opacity-30"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          <icon.Icon 
            className="text-blue-600 w-full h-full"
          />
        </div>
      ))}

      {/* Animated Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-ping" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Data Flow Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g className="opacity-30">
          <path 
            d="M 0,50 Q 300,150 600,100 T 1200,80" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M 0,200 Q 400,300 800,250 T 1200,280" 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <path 
            d="M 0,400 Q 200,500 400,450 T 800,480" 
            stroke="#10B981" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </g>
      </svg>

      {/* Code Blocks Animation */}
      <div className="absolute top-20 right-10 opacity-20">
        <div className="bg-gray-800 text-green-400 p-2 rounded text-xs font-mono animate-pulse">
          <div>$ kubectl apply -f deployment.yaml</div>
          <div>$ docker build -t app:latest .</div>
          <div>$ terraform plan</div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 opacity-20">
        <div className="bg-gray-800 text-blue-400 p-2 rounded text-xs font-mono animate-pulse" style={{ animationDelay: '3s' }}>
          <div>apiVersion: apps/v1</div>
          <div>kind: Deployment</div>
          <div>metadata:</div>
          <div>&nbsp;&nbsp;name: web-app</div>
        </div>
      </div>
    </div>
  );
}
