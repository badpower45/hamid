import { useState, useEffect } from 'react';
import { Newspaper, Video, FileText, Calendar, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-1fccac55`;

export default function MediaCenter() {
  const [news, setNews] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [showVideosDialog, setShowVideosDialog] = useState(false);
  const [showArticlesDialog, setShowArticlesDialog] = useState(false);

  useEffect(() => {
    fetchNews();
    fetchVideos();
    fetchArticles();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/news`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        setNews(data.news);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/videos`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      const data = await response.json();
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    // Handle Vimeo
    if (url.includes('vimeo')) {
      return url;
    }
    // Handle YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtube.com') 
        ? url.split('v=')[1]?.split('&')[0]
        : url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const displayedNews = news.slice(0, 6);
  const displayedVideos = videos.slice(0, 6);
  const displayedArticles = articles.slice(0, 6);

  return (
    <section id="media" className="py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl text-green-800 mb-4">
            آخر الأخبار
          </h2>
          <p className="text-lg text-gray-700">
            تابع آخر الفعاليات والمقالات
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="news">
                <Newspaper size={18} className="ml-2" />
                أخبار
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video size={18} className="ml-2" />
                فيديوهات
              </TabsTrigger>
              <TabsTrigger value="articles">
                <FileText size={18} className="ml-2" />
                مقالات
              </TabsTrigger>
            </TabsList>

            {/* News Tab */}
            <TabsContent value="news">
              {displayedNews.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  لا توجد أخبار حالياً
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedNews.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <Card className="border border-gray-200 hover:shadow-lg transition-shadow h-full">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-500">{item.date}</span>
                            </div>
                            {item.category && (
                              <Badge className="mb-3 bg-green-100 text-green-800">{item.category}</Badge>
                            )}
                            <h3 className="text-lg text-green-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.excerpt}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  {news.length > 6 && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => setShowNewsDialog(true)}
                        variant="outline"
                        className="border-green-600 text-green-700 hover:bg-green-50"
                      >
                        رؤية المزيد
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              {displayedVideos.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  لا توجد فيديوهات حالياً
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedVideos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <Card className="border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                          <div className="relative aspect-video bg-gray-900">
                            <iframe
                              src={getVideoEmbedUrl(video.url)}
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              className="w-full h-full"
                              title={video.title}
                            />
                            {video.duration && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                {video.duration}
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-lg text-green-800">{video.title}</h3>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  {videos.length > 6 && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => setShowVideosDialog(true)}
                        variant="outline"
                        className="border-green-600 text-green-700 hover:bg-green-50"
                      >
                        رؤية المزيد
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              {displayedArticles.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                  لا توجد مقالات حالياً
                </div>
              ) : (
                <>
                  <div className="max-w-4xl mx-auto space-y-4">
                    {displayedArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText size={16} className="text-green-700" />
                              <span className="text-sm text-gray-500">{article.date}</span>
                            </div>
                            <h3 className="text-xl text-green-800 mb-2">{article.title}</h3>
                            {article.content && (
                              <p className="text-gray-600 text-sm line-clamp-2">{article.content}</p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  {articles.length > 6 && (
                    <div className="text-center mt-8">
                      <Button
                        onClick={() => setShowArticlesDialog(true)}
                        variant="outline"
                        className="border-green-600 text-green-700 hover:bg-green-50"
                      >
                        رؤية المزيد
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* News Dialog */}
        <Dialog open={showNewsDialog} onOpenChange={setShowNewsDialog}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-800 flex items-center gap-2">
                <Newspaper size={24} />
                جميع الأخبار ({news.length})
              </DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {news.map((item) => (
                <Card key={item.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    {item.category && (
                      <Badge className="mb-3 bg-green-100 text-green-800">{item.category}</Badge>
                    )}
                    <h3 className="text-lg text-green-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Videos Dialog */}
        <Dialog open={showVideosDialog} onOpenChange={setShowVideosDialog}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-800 flex items-center gap-2">
                <Video size={24} />
                جميع الفيديوهات ({videos.length})
              </DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {videos.map((video) => (
                <Card key={video.id} className="border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative aspect-video bg-gray-900">
                    <iframe
                      src={getVideoEmbedUrl(video.url)}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full"
                      title={video.title}
                    />
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg text-green-800">{video.title}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Articles Dialog */}
        <Dialog open={showArticlesDialog} onOpenChange={setShowArticlesDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-green-800 flex items-center gap-2">
                <FileText size={24} />
                جميع المقالات ({articles.length})
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {articles.map((article) => (
                <Card key={article.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText size={16} className="text-green-700" />
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-xl text-green-800 mb-2">{article.title}</h3>
                    {article.content && (
                      <p className="text-gray-600 text-sm">{article.content}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
