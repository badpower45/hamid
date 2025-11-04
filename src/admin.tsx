import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Textarea } from './components/ui/textarea';
import { Button } from './components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Trash2, Plus, Save, Newspaper, Video, FileText, Users, Ticket, Lightbulb, Home, Shield, Briefcase, User2, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { supabase } from './utils/supabase/client';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  // Simple client-side password gate (quick solution as requested)
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('admin_auth');
      if (v === '1') setAuthenticated(true);
    } catch (e) {
      // ignore server-side
    }
  }, []);
  
  // Site Content
  const [siteContent, setSiteContent] = useState({
    // Hero
    heroVideo: '',
    heroTitle: '',
    heroSubtitle: '',
    // Principles
    principlesTitle: '',
    principlesSubtitle: '',
    principlesAxis1Title: '',
    principlesAxis1Content: '',
    principlesAxis2Title: '',
    principlesAxis2Content: '',
    // Youth Agenda
    youthAgendaTitle: '',
    youthAgendaSubtitle: '',
    housingProblem: '',
    housingSolution1: '',
    housingSolution2: '',
    jobsProblem: '',
    jobsSolution1: '',
    jobsSolution2: '',
    // Biography
    biographyTitle: '',
    biographySubtitle: '',
    biographyText1: '',
    biographyText2: '',
    biographyText3: '',
    // Contact
    contactTitle: '',
    contactSubtitle: '',
    // Footer
    footerPhone: '',
    footerEmail: '',
    footerFacebook: '',
    footerWhatsapp: '',
  });

  // News
  const [news, setNews] = useState<any[]>([]);
  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    date: '',
    category: '',
    excerpt: '',
  });

  // Videos
  const [videos, setVideos] = useState<any[]>([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    duration: '',
  });

  // Articles
  const [articles, setArticles] = useState<any[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    date: '',
    content: '',
  });

  // Forms Data
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ideas, setIdeas] = useState<any[]>([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchSiteContent(),
        fetchNews(),
        fetchVideos(),
        fetchArticles(),
        fetchVolunteers(),
        fetchTickets(),
        fetchIdeas(),
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const fetchSiteContent = async () => {
    const response = await fetch(`${API_URL}/site-content`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    const data = await response.json();
    if (data.success) {
      setSiteContent(data.content);
    }
  };

  const saveSiteContent = async () => {
    try {
      const response = await fetch(`${API_URL}/site-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(siteContent),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم حفظ محتوى الموقع بنجاح');
      }
    } catch (error) {
      console.error('Error saving site content:', error);
      toast.error('حدث خطأ في حفظ البيانات');
    }
  };

  // News Functions
  const fetchNews = async () => {
    const response = await fetch(`${API_URL}/news`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    const data = await response.json();
    if (data.success) {
      setNews(data.news);
    }
  };

  const addNews = async () => {
    if (!newNewsItem.title || !newNewsItem.date) {
      toast.error('من فضلك املأ جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(newNewsItem),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم إضافة الخبر بنجاح');
        setNews([data.news, ...news]);
        setNewNewsItem({ title: '', date: '', category: '', excerpt: '' });
      }
    } catch (error) {
      console.error('Error adding news:', error);
      toast.error('حدث خطأ في إضافة الخبر');
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم حذف الخبر بنجاح');
        setNews(news.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('حدث خطأ في حذف الخبر');
    }
  };

  // Videos Functions
  const fetchVideos = async () => {
    const response = await fetch(`${API_URL}/videos`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    const data = await response.json();
    if (data.success) {
      setVideos(data.videos);
    }
  };

  const addVideo = async () => {
    if (!newVideo.title || !newVideo.url) {
      toast.error('من فضلك املأ جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(newVideo),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم إضافة الفيديو بنجاح');
        setVideos([data.video, ...videos]);
        setNewVideo({ title: '', url: '', duration: '' });
      }
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error('حدث خطأ في إضافة الفيديو');
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم حذف الفيديو بنجاح');
        setVideos(videos.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('حدث خطأ في حذف الفيديو');
    }
  };

  // Articles Functions
  const fetchArticles = async () => {
    const response = await fetch(`${API_URL}/articles`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    const data = await response.json();
    if (data.success) {
      setArticles(data.articles);
    }
  };

  const addArticle = async () => {
    if (!newArticle.title || !newArticle.date) {
      toast.error('من فضلك املأ جميع الحقول المطلوبة');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(newArticle),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم إضافة المقال بنجاح');
        setArticles([data.article, ...articles]);
        setNewArticle({ title: '', date: '', content: '' });
      }
    } catch (error) {
      console.error('Error adding article:', error);
      toast.error('حدث خطأ في إضافة المقال');
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success('تم حذف المقال بنجاح');
        setArticles(articles.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('حدث خطأ في حذف المقال');
    }
  };

  // Forms Data Functions
  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }
  // If not authenticated, show password prompt
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">تسجيل دخول لوحة التحكم</h2>
          <p className="text-sm text-gray-600 mb-4">ادخل كلمة المرور للدخول</p>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                // Quick insecure check as requested
                if (password === '13572468852') {
                  try {
                    localStorage.setItem('admin_auth', '1');
                  } catch (e) {}
                  setAuthenticated(true);
                } else {
                  toast.error('كلمة المرور غير صحيحة');
                }
              }}
            >
              دخول
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setPassword('');
              }}
            >
              مسح
            </Button>
          </div>
          <p className="mt-3 text-xs text-gray-500">ملاحظة: هذا تحقق على جهة العميل فقط. أنصح بإعداد تحقق على الخادم لزيادة الأمان.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-green-800 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600">إدارة محتوى الموقع</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="hero"><Home size={16} className="ml-1" /> الهيرو</TabsTrigger>
            <TabsTrigger value="principles"><Shield size={16} className="ml-1" /> المبادئ</TabsTrigger>
            <TabsTrigger value="youth"><Briefcase size={16} className="ml-1" /> الشباب</TabsTrigger>
            <TabsTrigger value="bio"><User2 size={16} className="ml-1" /> السيرة</TabsTrigger>
            <TabsTrigger value="contact"><Mail size={16} className="ml-1" /> التواصل</TabsTrigger>
            <TabsTrigger value="media"><Newspaper size={16} className="ml-1" /> المحتوى</TabsTrigger>
            <TabsTrigger value="forms"><Users size={16} className="ml-1" /> البيانات</TabsTrigger>
          </TabsList>

          {/* Hero Section Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>قسم الهيرو (الصفحة الرئيسية)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>رابط فيديو الهيرو (Vimeo/YouTube)</Label>
                  <Input
                    value={siteContent.heroVideo}
                    onChange={(e) => setSiteContent({ ...siteContent, heroVideo: e.target.value })}
                    placeholder="https://player.vimeo.com/video/..."
                  />
                </div>
                <div>
                  <Label>عنوان الهيرو (استخدم \n للسطر الجديد)</Label>
                  <Textarea
                    value={siteContent.heroTitle}
                    onChange={(e) => setSiteContent({ ...siteContent, heroTitle: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>العنوان الفرعي</Label>
                  <Input
                    value={siteContent.heroSubtitle}
                    onChange={(e) => setSiteContent({ ...siteContent, heroSubtitle: e.target.value })}
                  />
                </div>
                <Button onClick={saveSiteContent} className="bg-green-600 hover:bg-green-700">
                  <Save className="ml-2" size={18} />
                  حفظ التغييرات
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Principles Section Tab */}
          <TabsContent value="principles">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قسم المبادئ - العناوين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>العنوان الرئيسي</Label>
                    <Input
                      value={siteContent.principlesTitle}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>العنوان الفرعي</Label>
                    <Textarea
                      value={siteContent.principlesSubtitle}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesSubtitle: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المحور الأول - النزاهة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>عنوان المحور</Label>
                    <Input
                      value={siteContent.principlesAxis1Title}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesAxis1Title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>محتوى المحور</Label>
                    <Textarea
                      value={siteContent.principlesAxis1Content}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesAxis1Content: e.target.value })}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المحور الثاني - التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>عنوان المحور</Label>
                    <Input
                      value={siteContent.principlesAxis2Title}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesAxis2Title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>محتوى المحور</Label>
                    <Textarea
                      value={siteContent.principlesAxis2Content}
                      onChange={(e) => setSiteContent({ ...siteContent, principlesAxis2Content: e.target.value })}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={saveSiteContent} className="bg-green-600 hover:bg-green-700 w-full">
                <Save className="ml-2" size={18} />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          {/* Youth Agenda Tab */}
          <TabsContent value="youth">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قسم برنامج الشباب - العناوين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>العنوان الرئيسي</Label>
                    <Input
                      value={siteContent.youthAgendaTitle}
                      onChange={(e) => setSiteContent({ ...siteContent, youthAgendaTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>العنوان الفرعي</Label>
                    <Input
                      value={siteContent.youthAgendaSubtitle}
                      onChange={(e) => setSiteContent({ ...siteContent, youthAgendaSubtitle: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>قضية الإسكان</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>المشكلة</Label>
                    <Textarea
                      value={siteContent.housingProblem}
                      onChange={(e) => setSiteContent({ ...siteContent, housingProblem: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>الحل الأول</Label>
                    <Textarea
                      value={siteContent.housingSolution1}
                      onChange={(e) => setSiteContent({ ...siteContent, housingSolution1: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>الحل الثاني</Label>
                    <Textarea
                      value={siteContent.housingSolution2}
                      onChange={(e) => setSiteContent({ ...siteContent, housingSolution2: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>قضية الوظائف</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>المشكلة</Label>
                    <Textarea
                      value={siteContent.jobsProblem}
                      onChange={(e) => setSiteContent({ ...siteContent, jobsProblem: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>الحل الأول</Label>
                    <Textarea
                      value={siteContent.jobsSolution1}
                      onChange={(e) => setSiteContent({ ...siteContent, jobsSolution1: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>الحل الثاني</Label>
                    <Textarea
                      value={siteContent.jobsSolution2}
                      onChange={(e) => setSiteContent({ ...siteContent, jobsSolution2: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={saveSiteContent} className="bg-green-600 hover:bg-green-700 w-full">
                <Save className="ml-2" size={18} />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          {/* Biography Tab */}
          <TabsContent value="bio">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قسم السيرة الذاتية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>العنوان الرئيسي</Label>
                    <Input
                      value={siteContent.biographyTitle}
                      onChange={(e) => setSiteContent({ ...siteContent, biographyTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>العنوان الفرعي</Label>
                    <Input
                      value={siteContent.biographySubtitle}
                      onChange={(e) => setSiteContent({ ...siteContent, biographySubtitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>الفقرة الأولى</Label>
                    <Textarea
                      value={siteContent.biographyText1}
                      onChange={(e) => setSiteContent({ ...siteContent, biographyText1: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>الفقرة الثانية</Label>
                    <Textarea
                      value={siteContent.biographyText2}
                      onChange={(e) => setSiteContent({ ...siteContent, biographyText2: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>الفقرة الثالثة (المميزة)</Label>
                    <Textarea
                      value={siteContent.biographyText3}
                      onChange={(e) => setSiteContent({ ...siteContent, biographyText3: e.target.value })}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={saveSiteContent} className="bg-green-600 hover:bg-green-700 w-full">
                <Save className="ml-2" size={18} />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          {/* Contact & Footer Tab */}
          <TabsContent value="contact">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>قسم التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>العنوان الرئيسي</Label>
                    <Input
                      value={siteContent.contactTitle}
                      onChange={(e) => setSiteContent({ ...siteContent, contactTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>العنوان الفرعي</Label>
                    <Textarea
                      value={siteContent.contactSubtitle}
                      onChange={(e) => setSiteContent({ ...siteContent, contactSubtitle: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>معلومات الفوتر والتواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>رقم الهاتف</Label>
                    <Input
                      value={siteContent.footerPhone}
                      onChange={(e) => setSiteContent({ ...siteContent, footerPhone: e.target.value })}
                      placeholder="+20 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <Input
                      value={siteContent.footerEmail}
                      onChange={(e) => setSiteContent({ ...siteContent, footerEmail: e.target.value })}
                      placeholder="info@hamedbondo.eg"
                    />
                  </div>
                  <div>
                    <Label>رابط فيسبوك</Label>
                    <Input
                      value={siteContent.footerFacebook}
                      onChange={(e) => setSiteContent({ ...siteContent, footerFacebook: e.target.value })}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <Label>رابط واتساب</Label>
                    <Input
                      value={siteContent.footerWhatsapp}
                      onChange={(e) => setSiteContent({ ...siteContent, footerWhatsapp: e.target.value })}
                      placeholder="https://wa.me/20XXXXXXXXXX"
                    />
                  </div>
                </CardContent>
              </Card>

              <Button onClick={saveSiteContent} className="bg-green-600 hover:bg-green-700 w-full">
                <Save className="ml-2" size={18} />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          {/* Media Content Tab */}
          <TabsContent value="media">
            <Tabs defaultValue="news" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="news">الأخبار</TabsTrigger>
                <TabsTrigger value="videos">الفيديوهات</TabsTrigger>
                <TabsTrigger value="articles">المقالات</TabsTrigger>
              </TabsList>

              {/* News */}
              <TabsContent value="news">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus size={20} />
                        إضافة خبر جديد
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>العنوان</Label>
                          <Input
                            value={newNewsItem.title}
                            onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>التاريخ</Label>
                          <Input
                            value={newNewsItem.date}
                            onChange={(e) => setNewNewsItem({ ...newNewsItem, date: e.target.value })}
                            placeholder="25 أكتوبر 2025"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>التصنيف</Label>
                        <Input
                          value={newNewsItem.category}
                          onChange={(e) => setNewNewsItem({ ...newNewsItem, category: e.target.value })}
                          placeholder="ميداني، حوار، اقتصادي..."
                        />
                      </div>
                      <div>
                        <Label>المحتوى</Label>
                        <Textarea
                          value={newNewsItem.excerpt}
                          onChange={(e) => setNewNewsItem({ ...newNewsItem, excerpt: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <Button onClick={addNews} className="bg-green-600 hover:bg-green-700">
                        <Plus className="ml-2" size={18} />
                        إضافة خبر
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Newspaper size={20} />
                        الأخبار الحالية ({news.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>التصنيف</TableHead>
                            <TableHead>إجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {news.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteNews(item.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Videos */}
              <TabsContent value="videos">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus size={20} />
                        إضافة فيديو جديد
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>عنوان الفيديو</Label>
                        <Input
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>رابط الفيديو (Vimeo أو YouTube Embed)</Label>
                        <Input
                          value={newVideo.url}
                          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                          placeholder="https://player.vimeo.com/video/... أو https://www.youtube.com/embed/..."
                        />
                      </div>
                      <div>
                        <Label>المدة</Label>
                        <Input
                          value={newVideo.duration}
                          onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                          placeholder="5:30"
                        />
                      </div>
                      <Button onClick={addVideo} className="bg-green-600 hover:bg-green-700">
                        <Plus className="ml-2" size={18} />
                        إضافة فيديو
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Video size={20} />
                        الفيديوهات الحالية ({videos.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>المدة</TableHead>
                            <TableHead>إجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {videos.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell>{item.duration}</TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteVideo(item.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Articles */}
              <TabsContent value="articles">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus size={20} />
                        إضافة مقال جديد
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>عنوان المقال</Label>
                        <Input
                          value={newArticle.title}
                          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>التاريخ</Label>
                        <Input
                          value={newArticle.date}
                          onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
                          placeholder="28 أكتوبر 2025"
                        />
                      </div>
                      <div>
                        <Label>محتوى المقال</Label>
                        <Textarea
                          value={newArticle.content}
                          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                          rows={5}
                        />
                      </div>
                      <Button onClick={addArticle} className="bg-green-600 hover:bg-green-700">
                        <Plus className="ml-2" size={18} />
                        إضافة مقال
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText size={20} />
                        المقالات الحالية ({articles.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>التاريخ</TableHead>
                            <TableHead>إجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {articles.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.title}</TableCell>
                              <TableCell>{item.date}</TableCell>
                              <TableCell>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteArticle(item.id)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Forms Data Tab */}
          <TabsContent value="forms">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} />
                    المتطوعين ({volunteers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الموبايل</TableHead>
                        <TableHead>الحي</TableHead>
                        <TableHead>المجال</TableHead>
                        <TableHead>التاريخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volunteers.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                          <TableCell>{item.district}</TableCell>
                          <TableCell>{item.area}</TableCell>
                          <TableCell>{new Date(item.timestamp).toLocaleDateString('ar-EG')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket size={20} />
                    الشكاوى ({tickets.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الشكوى</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الحي</TableHead>
                        <TableHead>نوع المشكلة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التاريخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.ticketNumber}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.district}</TableCell>
                          <TableCell>{item.problemType}</TableCell>
                          <TableCell>{item.status}</TableCell>
                          <TableCell>{new Date(item.timestamp).toLocaleDateString('ar-EG')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb size={20} />
                    الأفكار ({ideas.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الاسم</TableHead>
                        <TableHead>الفكرة</TableHead>
                        <TableHead>التنفيذ</TableHead>
                        <TableHead>التاريخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ideas.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="max-w-md truncate">{item.idea}</TableCell>
                          <TableCell className="max-w-md truncate">{item.implementation}</TableCell>
                          <TableCell>{new Date(item.timestamp).toLocaleDateString('ar-EG')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
