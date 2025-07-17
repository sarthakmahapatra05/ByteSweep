import React, { useState, useEffect } from 'react';
import { FolderOpen, ArrowRight, Settings, Play, CheckCircle, Clock, Zap } from 'lucide-react';
import api from '../services/api';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RequireAuth from './RequireAuth';

function Folder3D() {
  // Simple 3D box as a folder placeholder
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.6, 1, 1]} />
      <meshStandardMaterial color={'#2E2EFF'} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

const FileOrganizer = () => {
  const [rules, setRules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    source: '',
    destination: '',
    fileTypes: [],
    condition: 'extension',
    enabled: true
  });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const res = await api.get('/files');
      setRules(res.data.files || []);
    } catch (err) {
      setRules([]);
    }
  };

  const runRule = (ruleId) => {
    const rule = rules.find(r => r.id === ruleId);
    if (!rule) return;
    const task = {
      id: Date.now().toString(),
      name: rule.name,
      status: 'running',
      progress: 0,
      filesProcessed: 0,
      totalFiles: Math.floor(Math.random() * 100) + 10,
      startTime: new Date()
    };
    setTasks(prev => [task, ...prev]);
    const interval = setInterval(() => {
      setTasks(prev => prev.map(t => {
        if (t.id === task.id && t.status === 'running') {
          const newProgress = Math.min(t.progress + Math.random() * 15, 100);
          const newFilesProcessed = Math.floor((newProgress / 100) * t.totalFiles);
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...t,
              status: 'completed',
              progress: 100,
              filesProcessed: t.totalFiles,
              endTime: new Date()
            };
          }
          return {
            ...t,
            progress: newProgress,
            filesProcessed: newFilesProcessed
          };
        }
        return t;
      }));
    }, 500);
    setRules(prev => prev.map(r =>
      r.id === ruleId
        ? { ...r, lastRun: new Date(), filesProcessed: (r.filesProcessed || 0) + task.totalFiles }
        : r
    ));
  };

  const toggleRule = (ruleId) => {
    setRules(prev => prev.map(r =>
      r.id === ruleId ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const deleteRule = (ruleId) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  const addRule = () => {
    if (!newRule.name || !newRule.source || !newRule.destination) return;
    const rule = {
      id: Date.now().toString(),
      name: newRule.name,
      source: newRule.source,
      destination: newRule.destination,
      fileTypes: newRule.fileTypes || [],
      condition: newRule.condition || 'extension',
      enabled: newRule.enabled || true
    };
    setRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      source: '',
      destination: '',
      fileTypes: [],
      condition: 'extension',
      enabled: true
    });
    setShowRuleModal(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <div className="h-4 w-4 bg-red-500 rounded-full" />;
      default:
        return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FolderOpen className="inline w-7 h-7 text-blue-600" /> File Organizer
      </h2>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-gray-900">
                {rules.filter(r => r.enabled).length}
              </p>
            </div>
            <Settings className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Running Tasks</p>
              <p className="text-2xl font-bold text-blue-600">
                {tasks.filter(t => t.status === 'running').length}
              </p>
            </div>
            <Play className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Files Processed</p>
              <p className="text-2xl font-bold text-gray-900">
                {rules.reduce((sum, r) => sum + (r.filesProcessed || 0), 0)}
              </p>
            </div>
            <FolderOpen className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>
      {/* Organization Rules */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {/* Render rules (files) here as needed */}
        {rules.map(rule => (
          <div key={rule.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={rule.enabled}
                onChange={() => toggleRule(rule.id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                <p className="text-sm text-gray-600">
                  Source: {rule.source}, Destination: {rule.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => runRule(rule.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                title="Run Rule"
              >
                <Play className="h-5 w-5" />
              </button>
              <button
                onClick={() => deleteRule(rule.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                title="Delete Rule"
              >
                <Zap className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default (props) => (
  <RequireAuth>
    <FileOrganizer {...props} />
  </RequireAuth>
); 