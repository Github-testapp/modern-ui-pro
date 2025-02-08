"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X, TrendingUp, BarChart2, PieChartIcon, Users } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const analyticsData = [
  { month: "1月", revenue: 8400, users: 1200, engagement: 78 },
  { month: "2月", revenue: 9600, users: 1400, engagement: 82 },
  { month: "3月", revenue: 11200, users: 1600, engagement: 85 },
  { month: "4月", revenue: 15000, users: 2000, engagement: 88 },
  { month: "5月", revenue: 12800, users: 1800, engagement: 86 },
]

const distributionData = [
  { name: "プレミアム", value: 45, color: "#3B82F6" },
  { name: "スタンダード", value: 35, color: "#10B981" },
  { name: "ベーシック", value: 20, color: "#6366F1" },
]

const TRANSLATIONS = {
  appName: "Pro UI",
  home: "ホーム",
  features: "機能",
  analytics: "分析",
  contact: "お問い合わせ",
  lightMode: "ライトモード",
  darkMode: "ダークモード",
  closeMenu: "メニューを閉じる",
  openMenu: "メニューを開く",
  heroTitle: "次世代のプロフェッショナルUI",
  heroSubtitle: "革新的なデザインと最新テクノロジーの融合",
  learnMore: "詳細を見る",
  realTimeAnalytics: "リアルタイムアナリティクス",
  revenueTrend: "収益トレンド",
  userStatistics: "ユーザー統計",
  engagement: "エンゲージメント",
  userDistribution: "ユーザー分布",
  name: "お名前",
  email: "メールアドレス",
  message: "メッセージ",
  submit: "送信する",
  namePlaceholder: "山田 太郎",
  emailPlaceholder: "your@email.com",
  messagePlaceholder: "お問い合わせ内容をご記入ください",
  nameRequired: "お名前を入力してください",
  emailRequired: "メールアドレスを入力してください",
  invalidEmail: "有効なメールアドレスを入力してください",
  messageRequired: "メッセージを入力してください",
  formSubmitted: "フォームが送信されました",
  formError: "エラーが発生しました。もう一度お試しください。",
}

const ModernUI: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!formData.name?.trim()) errors.name = TRANSLATIONS.nameRequired
    if (!formData.email?.trim()) {
      errors.email = TRANSLATIONS.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = TRANSLATIONS.invalidEmail
    }
    if (!formData.message?.trim()) errors.message = TRANSLATIONS.messageRequired
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert(TRANSLATIONS.formSubmitted)
        setFormData({ name: "", email: "", message: "" })
      } catch (error) {
        alert(TRANSLATIONS.formError)
      }
    } else {
      setFormErrors(errors)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? "dark" : ""}`}>
      {/* ヘッダー */}
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">{TRANSLATIONS.appName}</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {[TRANSLATIONS.home, TRANSLATIONS.features, TRANSLATIONS.analytics, TRANSLATIONS.contact].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-500 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? TRANSLATIONS.lightMode : TRANSLATIONS.darkMode}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? TRANSLATIONS.closeMenu : TRANSLATIONS.openMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* ヒーローセクション */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-28"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold animate-fadeIn">{TRANSLATIONS.heroTitle}</h1>
              <p className="text-xl md:text-2xl text-blue-100 animate-fadeIn">{TRANSLATIONS.heroSubtitle}</p>
              <Button size="lg" variant="secondary">
                {TRANSLATIONS.learnMore}
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-16 left-0 w-full h-32 bg-white dark:bg-gray-900 transform -skew-y-3" />
        </motion.section>

        {/* アナリティクスセクション */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">
              {TRANSLATIONS.realTimeAnalytics}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 収益チャート */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                      {TRANSLATIONS.revenueTrend}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3B82F6"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* ユーザー統計 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 text-blue-500 mr-2" />
                      {TRANSLATIONS.userStatistics}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="users" fill="#6366F1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* エンゲージメント */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                      {TRANSLATIONS.engagement}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 分布 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChartIcon className="h-5 w-5 text-blue-500 mr-2" />
                      {TRANSLATIONS.userDistribution}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {distributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* コンタクトフォーム */}
        <section className="py-24 dark:bg-gray-900">
          <div className="container mx-auto px-4 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">{TRANSLATIONS.contact}</h2>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-white">
                        {TRANSLATIONS.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={TRANSLATIONS.namePlaceholder}
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                      />
                      {formErrors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-500">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">
                        {TRANSLATIONS.email}
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={TRANSLATIONS.emailPlaceholder}
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                      />
                      {formErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-500">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 dark:text-white">
                        {TRANSLATIONS.message}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={TRANSLATIONS.messagePlaceholder}
                        rows={4}
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                      />
                      {formErrors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-500">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      {TRANSLATIONS.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ModernUI

