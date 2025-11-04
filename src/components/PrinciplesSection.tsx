import { useState, useEffect } from 'react';
import { Shield, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1fccac55`;

export default function PrinciplesSection() {
  const [content, setContent] = useState({
    principlesTitle: 'ليه احنا مختلفين؟',
    principlesSubtitle: 'بورسعيد تستحق سياسة نظيفة ونائب تلاقيه في الشارع مش في المكتب بس',
    principlesAxis1Title: 'نزاهة حقيقية',
    principlesAxis1Content: 'القلوب ما تنشتريش، لكن العقول نقدر نكسبها. مفيش فلوس مشبوهة - حملتنا ببرنامج واضح وتمويل شفاف. النائب اللي بيبدأ بالفلوس هيخدم الفلوس، احنا بنبدأ بيكم وهنخدمكم.',
    principlesAxis2Title: 'معاكم على طول',
    principlesAxis2Content: 'مش هتلاقوني قاعد في مكتب مستني تيجوا - أنا هكون في الشارع وبينكم. منصة رقمية للمتابعة: كل شكوى بتاخد رقم والرد خلال 48 ساعة. التواصل حق مش فضل.',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/site-content`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success && data.content) {
        setContent({
          principlesTitle: data.content.principlesTitle || content.principlesTitle,
          principlesSubtitle: data.content.principlesSubtitle || content.principlesSubtitle,
          principlesAxis1Title: data.content.principlesAxis1Title || content.principlesAxis1Title,
          principlesAxis1Content: data.content.principlesAxis1Content || content.principlesAxis1Content,
          principlesAxis2Title: data.content.principlesAxis2Title || content.principlesAxis2Title,
          principlesAxis2Content: data.content.principlesAxis2Content || content.principlesAxis2Content,
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <section id="principles" className="py-20 bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-green-800 mb-4">
            {content.principlesTitle}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            {content.principlesSubtitle}
          </p>
        </motion.div>

        {/* Attack Axes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Axis 1: Integrity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Shield className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl text-green-800">{content.principlesAxis1Title}</h3>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-600">
                  <p className="text-gray-800 leading-relaxed">
                    {content.principlesAxis1Content}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Axis 2: Presence */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Users className="text-white" size={24} />
                  </motion.div>
                  <h3 className="text-xl text-green-800">{content.principlesAxis2Title}</h3>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-600">
                  <p className="text-gray-800 leading-relaxed">
                    {content.principlesAxis2Content}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-green-800 text-white p-4 text-center">
            <h3 className="text-xl">الفرق بينّا وبين الممارسات السائدة</h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-right">المجال</TableHead>
                  <TableHead className="text-right">الممارسة السائدة</TableHead>
                  <TableHead className="text-right">ميثاقنا</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>التمويل</TableCell>
                  <TableCell className="text-red-700">
                    مال سياسي وتحالفات مبهمة
                  </TableCell>
                  <TableCell className="text-green-700">
                    تمويل شفاف وبرنامج واضح
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50">
                  <TableCell>التواصل</TableCell>
                  <TableCell className="text-red-700">
                    غياب وظهور موسمي
                  </TableCell>
                  <TableCell className="text-green-700">
                    معاكم في الشارع ومنصة رقمية
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>قضايا الشباب</TableCell>
                  <TableCell className="text-red-700">
                    عرض مشاكل وتدريب عام
                  </TableCell>
                  <TableCell className="text-green-700">
                    تشريعات ووظائف نوعية حقيقية
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
