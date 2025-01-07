import React from 'react';
import { 
  Activity, Heart, Thermometer, Droplets, Calendar, Clock, 
  FileText, Pill, ChevronRight, ArrowLeft, MoreVertical 
} from 'lucide-react';
import { format } from 'date-fns';
import { Patient } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { patientMedications, patientRecords } from '../data';

const vitalHistory = [
  { time: '08:00', heartRate: 72, bloodPressure: 120, temperature: 37.1, oxygenLevel: 98 },
  { time: '10:00', heartRate: 75, bloodPressure: 122, temperature: 37.0, oxygenLevel: 97 },
  { time: '12:00', heartRate: 78, bloodPressure: 125, temperature: 37.2, oxygenLevel: 98 },
  { time: '14:00', heartRate: 73, bloodPressure: 118, temperature: 37.1, oxygenLevel: 99 },
  { time: '16:00', heartRate: 70, bloodPressure: 115, temperature: 37.0, oxygenLevel: 98 },
];

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}

export default function PatientDetail({ patient, onBack }: PatientDetailProps) {
  const statusColors = {
    Stable: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-200',
    Critical: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900 dark:text-red-200',
    Recovering: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900 dark:text-amber-200'
  };

  const medications = patientMedications[patient.id] || [];
  const records = patientRecords[patient.id] || [];

  return (
    <div className="p-8 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary-600 dark:text-gray-400"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Patient Profile</h1>
              <p className="text-secondary-600 dark:text-gray-400">View and manage patient information</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg dark:text-primary-400">
              Edit Profile
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-secondary-600 dark:text-gray-400">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-start gap-6">
            <img
              src={patient.image}
              alt={patient.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">{patient.name}</h2>
                  <p className="text-secondary-600 dark:text-gray-400">
                    {patient.age} years • {patient.gender} • ID: #{patient.id.padStart(6, '0')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[patient.status]}`}>
                  {patient.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-gray-400">Primary Condition</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{patient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-gray-400">Blood Type</p>
                  <p className="font-medium text-secondary-900 dark:text-white">A+</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-gray-400">Last Visit</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{format(new Date(patient.lastVisit), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-gray-400">Next Appointment</p>
                  <p className="font-medium text-primary-600 dark:text-primary-400">{format(new Date(patient.nextAppointment), 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Heart Rate',
              value: '72',
              unit: 'BPM',
              icon: Heart,
              color: 'text-red-500',
              bg: 'bg-red-50 dark:bg-red-900',
              trend: 'Normal'
            },
            {
              label: 'Blood Pressure',
              value: '120/80',
              unit: 'mmHg',
              icon: Activity,
              color: 'text-primary-500',
              bg: 'bg-primary-50 dark:bg-primary-900',
              trend: 'Optimal'
            },
            {
              label: 'Temperature',
              value: '37.2',
              unit: '°C',
              icon: Thermometer,
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-900',
              trend: 'Normal'
            },
            {
              label: 'Oxygen Level',
              value: '98',
              unit: '%',
              icon: Droplets,
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-900',
              trend: 'Good'
            }
          ].map(({ label, value, unit, icon: Icon, color, bg, trend }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-secondary-600 dark:text-gray-400 text-sm">{label}</span>
                <div className={`${bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-secondary-900 dark:text-white">{value}</span>
                <span className="text-secondary-600 dark:text-gray-400">{unit}</span>
              </div>
              <p className="text-sm text-secondary-500 dark:text-gray-400 mt-2">{trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vital History Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-secondary-900 dark:text-white">Vital History</h3>
                <p className="text-sm text-secondary-500 dark:text-gray-400">Last 24 hours</p>
              </div>
              <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm bg-white dark:bg-gray-800">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: '#e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#ef4444" 
                    name="Heart Rate"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressure" 
                    stroke="#0ea5e9" 
                    name="Blood Pressure"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Upcoming Appointments</h3>
              <Calendar className="w-5 h-5 text-secondary-400 dark:text-gray-500" />
            </div>
            <div className="space-y-4">
              {[
                { 
                  date: patient.nextAppointment,
                  time: '09:00 AM',
                  type: 'Check-up',
                  doctor: 'Dr. Smith'
                }
              ].map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">
                        {format(new Date(apt.date), 'MMM d, yyyy')}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-secondary-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{apt.time}</span>
                        <span>•</span>
                        <span>{apt.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-secondary-400 hover:text-secondary-600 dark:hover:text-gray-200">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 font-medium w-full text-center">
              View All Appointments
            </button>
          </div>
        </div>

        {/* Medical History & Records */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Current Medications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Current Medications</h3>
              <Pill className="w-5 h-5 text-secondary-400 dark:text-gray-500" />
            </div>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-secondary-900 dark:text-white">{med.name}</h4>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs dark:bg-green-900 dark:text-green-200">
                      {med.status}
                    </span>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-gray-400 mt-1">
                    {med.dosage} • {med.frequency}
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-gray-400 mt-1">
                    Prescribed by {med.prescribedBy}
                  </p>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 font-medium w-full text-center">
              View All Medications
            </button>
          </div>

          {/* Recent Documents */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Recent Documents</h3>
              <FileText className="w-5 h-5 text-secondary-400 dark:text-gray-500" />
            </div>
            <div className="space-y-4">
              {records.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-secondary-900 dark:text-white">{record.title}</h4>
                    <p className="text-sm text-secondary-500 dark:text-gray-400">
                      {format(new Date(record.date), 'MMM d, yyyy')} • {record.type}
                    </p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 text-sm font-medium">
                    View
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 font-medium w-full text-center">
              View All Documents
            </button>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Clinical Notes</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 font-medium">
                Add Note
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  date: patient.lastVisit,
                  doctor: 'Dr. Smith',
                  note: `Patient ${patient.status.toLowerCase()}. ${patient.condition} being monitored.`
                }
              ].map((note, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-secondary-900 dark:text-white">{note.doctor}</p>
                    <p className="text-xs text-secondary-500 dark:text-gray-400">
                      {format(new Date(note.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-gray-300">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
