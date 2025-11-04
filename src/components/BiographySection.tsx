import { GraduationCap, Briefcase, Award, Heart, Building } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import hamedImage from 'figma:asset/4adcf52d9f1a5f5ad10558148b7235a9068c3781.png';

export default function BiographySection() {
  const experience = [
    { icon: <Briefcase size={20} />, title: 'رائد أعمال', items: ['مؤسس ومدير مجموعة شركات بندق صن مول', 'صاحب ومدير شركة بندق للاستيراد والتصدير', 'مدير وشريك مصنع بالمنطقة الصناعية'] },
    { icon: <GraduationCap size={20} />, title: 'المؤهلات', items: ['ليسانس آداب - قسم علم النفس', 'دراسات بكلية التجارة - جامعة بورسعيد', 'محاسب وأخصائي نفسي وأسري'] },
    { icon: <Award size={20} />, title: 'التدريب', items: ['دورات في التحكيم وفض النزاعات', 'دورات في حقوق الإنسان'] },
    { icon: <Heart size={20} />, title: 'العمل الخيري', items: ['نائب مؤسسة دروب الخير الخيرية', 'مؤسس مبادرة "بلا أعباء" التعليمية', 'مبادرات لتوفير الملابس والمواد الغذائية'] },
  ];

  return (
    <section id="biography" className="py-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-green-800 mb-2">
            مين هو حامد بندق؟
          </h2>
          <p className="text-lg text-gray-700">واحد منكم... وليكم</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12 items-center">
          {/* Image */}
          <motion.div 
            className="flex items-center justify-center order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-br from-green-600 to-green-800 rounded-lg opacity-20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img
                src={hamedImage}
                alt="حامد بندق"
                className="relative rounded-lg shadow-2xl w-full max-w-md"
              />
            </div>
          </motion.div>

          {/* Biography Content */}
          <div className="order-1 lg:order-2">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg mb-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Building className="text-green-700" size={28} />
                <h3 className="text-2xl text-green-800">من بورسعيد لبورسعيد</h3>
              </div>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  رائد أعمال بورسعيدي، عنده خبرة في الأعمال والمسؤولية المجتمعية. مش بس كلام - ده واحد اشتغل وبنى وساعد.
                </p>
                <p>
                  من خلال شغله في الاستيراد والتصدير والصناعة، عايش واقع الاقتصاد البورسعيدي وفاهم تحديات الشباب في الشغل والحياة.
                </p>
                <p className="bg-green-50 p-3 rounded-lg border-r-4 border-green-600">
                  <strong>الفرق معانا:</strong> مش هتيجي تقابلني في مكتب مقفول، هتلاقيني في الشارع وبينكم. التواصل مش منّة، ده حق ليكم عليّا.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Experience Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experience.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="border-2 border-green-200 hover:border-green-400 transition-all h-full hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-700 mb-4">
                    {section.icon}
                  </div>
                  <h4 className="text-lg text-green-800 mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-gray-700 text-sm flex gap-2">
                        <span className="text-green-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-green-800 to-green-600 text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl mb-3">يلّا نبني المستقبل سوا</h3>
          <p className="mb-6 text-lg">
            مش عايز أصواتكم بس، عايز أفكاركم وطاقتكم وشراكتكم في التغيير
          </p>
          <Button
            size="lg"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-green-800 hover:bg-gray-100"
          >
            تعالوا نتكلم
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
