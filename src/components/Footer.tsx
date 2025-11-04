import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, href: 'https://facebook.com/hamedbondo', label: 'Facebook' },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ), 
      href: 'https://wa.me/20XXXXXXXXXX', 
      label: 'WhatsApp' 
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <span className="text-white">حب</span>
              </div>
              <div>
                <div className="text-white">حامد بندق</div>
                <div className="text-xs text-gray-400">صوت من عندكم</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              من بورسعيد لبورسعيد - نبني مستقبل شبابنا سوا
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('principles')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ليه احنا مختلفين
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('youth-agenda')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  برنامجنا للشباب
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('biography')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  من هو حامد
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  تواصل معنا
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-lg mb-4">تواصل</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>بورسعيد، مصر</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <span dir="ltr">+20 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <span dir="ltr">info@hamedbondo.eg</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-lg mb-4">تابعنا</h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>© 2025 حملة حامد بندق. جميع الحقوق محفوظة.</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <a 
              href="/admin" 
              className="text-gray-600 hover:text-gray-400 text-xs inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              إدارة الموقع
            </a>
            <span className="text-gray-700">•</span>
            <a 
              href="https://addvalues.tech" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-400 text-xs inline-block"
            >
              made with addvalues.tech
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
