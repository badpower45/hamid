import { useState } from 'react';
import { Users, Ticket, Lightbulb, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { supabase } from '../utils/supabase/client';

export default function ContactSection() {
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    phone: '',
    district: '',
    area: '',
  });

  const [ticketForm, setTicketForm] = useState({
    name: '',
    district: '',
    problemType: '',
    details: '',
  });

  const [ideaForm, setIdeaForm] = useState({
    name: '',
    idea: '',
    implementation: '',
  });

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .insert([{
          name: volunteerForm.name,
          phone: volunteerForm.phone,
          district: volunteerForm.district,
          area: volunteerForm.area,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      toast.success('تسلم! هنكلمك قريب جداً ♥️');
      setVolunteerForm({ name: '', phone: '', district: '', area: '' });
    } catch (error) {
      console.error('Error submitting volunteer form:', error);
      toast.error('حدث خطأ، حاول مرة تانية');
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ticketNumber = `T${Date.now().toString().slice(-8)}`;
      
      const { data, error } = await supabase
        .from('tickets')
        .insert([{
          name: ticketForm.name,
          district: ticketForm.district,
          problem_type: ticketForm.problemType,
          details: ticketForm.details,
          ticket_number: ticketNumber,
          status: 'pending',
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      toast.success(`تم! رقم شكواك: ${ticketNumber} - هنرد عليك خلال 48 ساعة`);
      setTicketForm({ name: '', district: '', problemType: '', details: '' });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error('حدث خطأ، حاول مرة تانية');
    }
  };

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('ideas')
        .insert([{
          name: ideaForm.name,
          idea: ideaForm.idea,
          implementation: ideaForm.implementation,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;

      toast.success('فكرة جامدة! شكراً ليك، هندرسها وهنتواصل معاك');
      setIdeaForm({ name: '', idea: '', implementation: '' });
    } catch (error) {
      console.error('Error submitting idea:', error);
      toast.error('حدث خطأ، حاول مرة تانية');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-green-800 mb-4">
            تعالى نتكلم
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            حملتنا بتعتمد على طاقتكم وأفكاركم، مش على الفلوس
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="volunteer" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="volunteer" className="flex items-center gap-2">
                <Users size={18} />
                <span>انضم لينا</span>
              </TabsTrigger>
              <TabsTrigger value="ticket" className="flex items-center gap-2">
                <Ticket size={18} />
                <span>شكوى</span>
              </TabsTrigger>
              <TabsTrigger value="idea" className="flex items-center gap-2">
                <Lightbulb size={18} />
                <span>فكرة</span>
              </TabsTrigger>
            </TabsList>

            {/* Volunteer Form */}
            <TabsContent value="volunteer">
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-3 text-green-800">
                    <Users />
                    يلّا بينا - كل إيد محتاجينها
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="v-name">اسمك إيه؟</Label>
                      <Input
                        id="v-name"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="v-phone">رقم موبايلك</Label>
                      <Input
                        id="v-phone"
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="v-district">ساكن فين؟</Label>
                      <Select
                        value={volunteerForm.district}
                        onValueChange={(value) => setVolunteerForm({ ...volunteerForm, district: value })}
                      >
                        <SelectTrigger id="v-district">
                          <SelectValue placeholder="اختار حيك" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="العرب">العرب</SelectItem>
                          <SelectItem value="الشرق">الشرق</SelectItem>
                          <SelectItem value="الضواحي">الضواحي</SelectItem>
                          <SelectItem value="المناخ">المناخ</SelectItem>
                          <SelectItem value="الزهور">الزهور</SelectItem>
                          <SelectItem value="بورفؤاد">بورفؤاد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="v-area">عايز تساعد في إيه؟</Label>
                      <Select
                        value={volunteerForm.area}
                        onValueChange={(value) => setVolunteerForm({ ...volunteerForm, area: value })}
                      >
                        <SelectTrigger id="v-area">
                          <SelectValue placeholder="اختار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="تنظيم">التنظيم والإدارة</SelectItem>
                          <SelectItem value="إعلام">الإعلام والسوشيال ميديا</SelectItem>
                          <SelectItem value="ميداني">الشغل الميداني</SelectItem>
                          <SelectItem value="تكنولوجيا">التكنولوجيا</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      <Send className="ml-2" size={18} />
                      يلّا بينا
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ticket Form */}
            <TabsContent value="ticket">
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-3 text-green-800">
                    <Ticket />
                    عندك مشكلة؟ قولنا - هنرد خلال 48 ساعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="t-name">اسمك</Label>
                      <Input
                        id="t-name"
                        required
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="t-district">منين؟</Label>
                      <Select
                        value={ticketForm.district}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, district: value })}
                      >
                        <SelectTrigger id="t-district">
                          <SelectValue placeholder="اختار حيك" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="العرب">العرب</SelectItem>
                          <SelectItem value="الشرق">الشرق</SelectItem>
                          <SelectItem value="الضواحي">الضواحي</SelectItem>
                          <SelectItem value="المناخ">المناخ</SelectItem>
                          <SelectItem value="الزهور">الزهور</SelectItem>
                          <SelectItem value="بورفؤاد">بورفؤاد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="t-type">المشكلة في إيه؟</Label>
                      <Select
                        value={ticketForm.problemType}
                        onValueChange={(value) => setTicketForm({ ...ticketForm, problemType: value })}
                      >
                        <SelectTrigger id="t-type">
                          <SelectValue placeholder="اختار" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="إسكان">الإسكان</SelectItem>
                          <SelectItem value="وظائف">الوظائف</SelectItem>
                          <SelectItem value="صحة">الصحة</SelectItem>
                          <SelectItem value="تعليم">التعليم</SelectItem>
                          <SelectItem value="تعديات">التعديات</SelectItem>
                          <SelectItem value="بنية تحتية">البنية التحتية</SelectItem>
                          <SelectItem value="أخرى">حاجة تانية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="t-details">قولنا التفاصيل</Label>
                      <Textarea
                        id="t-details"
                        required
                        value={ticketForm.details}
                        onChange={(e) => setTicketForm({ ...ticketForm, details: e.target.value })}
                        rows={4}
                        placeholder="اكتب المشكلة بالتفصيل..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      <Ticket className="ml-2" size={18} />
                      ابعت الشكوى
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Idea Form */}
            <TabsContent value="idea">
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center gap-3 text-green-800">
                    <Lightbulb />
                    عندك فكرة؟ شاركنا بيها
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleIdeaSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="i-name">اسمك</Label>
                      <Input
                        id="i-name"
                        required
                        value={ideaForm.name}
                        onChange={(e) => setIdeaForm({ ...ideaForm, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="i-idea">الفكرة</Label>
                      <Textarea
                        id="i-idea"
                        required
                        value={ideaForm.idea}
                        onChange={(e) => setIdeaForm({ ...ideaForm, idea: e.target.value })}
                        rows={4}
                        placeholder="اكتب فكرتك..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="i-implementation">إزاي نطبقها؟ (اختياري)</Label>
                      <Textarea
                        id="i-implementation"
                        value={ideaForm.implementation}
                        onChange={(e) => setIdeaForm({ ...ideaForm, implementation: e.target.value })}
                        rows={3}
                        placeholder="لو عندك أفكار للتنفيذ..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      <Lightbulb className="ml-2" size={18} />
                      شاركنا الفكرة
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
