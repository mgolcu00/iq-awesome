import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../store/themeStore';

interface ChartProps {
  data: Array<{
    range: string;
    percentage: number;
  }>;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const { t } = useTranslation();
  const { isDark } = useThemeStore();

  const textColor = isDark ? '#e5e7eb' : '#374151';
  const lineColor = isDark ? '#60a5fa' : '#4f46e5';

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="range" 
            stroke={textColor}
            tick={{ fill: textColor }}
          />
          <YAxis 
            stroke={textColor}
            tick={{ fill: textColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              color: isDark ? '#e5e7eb' : '#374151'
            }}
            cursor={{ stroke: textColor }}
          />
          <Line 
            type="monotone"
            dataKey="percentage" 
            stroke={lineColor}
            strokeWidth={2}
            dot={{ fill: lineColor, strokeWidth: 2 }}
            name={t('chart.percentage')}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;