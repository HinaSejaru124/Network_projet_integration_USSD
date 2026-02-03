import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: IconType;
    color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'cyan';
    subtitle?: string;
}

const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600',
    cyan: 'from-cyan-500 to-cyan-600',
};

const iconBgClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    orange: 'bg-orange-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    cyan: 'bg-cyan-100',
};

const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    cyan: 'text-cyan-600',
};

export default function StatCard({ title, value, icon: Icon, color, subtitle }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:transform hover:scale-105">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
                    )}
                </div>
                <div className={`p-4 rounded-full ${iconBgClasses[color]}`}>
                    <Icon className={`w-8 h-8 ${iconColorClasses[color]}`} />
                </div>
            </div>
            <div className={`mt-4 h-2 bg-gradient-to-r ${colorClasses[color]} rounded-full`} />
        </div>
    );
}
