import { Home, Briefcase } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';

export default function YouthAgendaSection() {
  return (
    <section id="youth-agenda" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-green-800 mb-4">
            برنامجنا للشباب
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            مش كلام فاضي - حلول حقيقية لمشاكل حقيقية
          </p>
        </motion.div>

        {/* Main Issues */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Housing Crisis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-green-200 hover:shadow-xl transition-all h-full">
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                    <Home className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl text-green-800">الإسكان</h3>
                </motion.div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-800 mb-2">المشكلة:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      شباب بورسعيد محتاج بيت يعيش فيه، مش مجرد اجتماعات ووعود
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-600">
                    <h4 className="text-green-800 mb-2">الحل:</h4>
                    <ul className="space-y-2 text-gray-800">
                      <li className="flex gap-2">
                        <span className="text-green-600">•</span>
                        <span><strong>قانون حقيقي:</strong> تخصيص إجباري لأراضي جديدة مخصصة للشباب فقط</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">•</span>
                        <span><strong>رقابة فعّالة:</strong> مساءلة المسؤولين عن تأخير تسليم الوحدات</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Jobs Crisis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="border-2 border-green-200 hover:shadow-xl transition-all h-full">
              <CardContent className="p-6">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl text-green-800">الوظائف</h3>
                </motion.div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-800 mb-2">المشكلة:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      خريجين كتير ووظائف قليلة - والموجود مش بيليق بطموح شبابنا
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-r-4 border-green-600">
                    <h4 className="text-green-800 mb-2">الحل:</h4>
                    <ul className="space-y-2 text-gray-800">
                      <li className="flex gap-2">
                        <span className="text-green-600">•</span>
                        <span><strong>Port Said Tech-Port:</strong> إلزام الشركات بـ500 وظيفة نوعية سنوياً (برمجة، لوجستيات، صيانة)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600">•</span>
                        <span><strong>تدريب هادف:</strong> ربط البرامج باحتياجات السوق الحقيقية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="bg-gradient-to-r from-green-800 to-green-600 text-white p-6 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl mb-3">عايز تكون جزء من الحل؟</h3>
          <p className="mb-4">
            تعالى نشتغل سوا ونحول الأفكار دي لواقع
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-green-800 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            يلّا بينا
          </button>
        </motion.div>
      </div>
    </section>
  );
}
