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
import { useTranslation } from "next-i18next"
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

const ModernUI: React.FC = () => {
  const { t } = useTranslation("common")
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
    if (!formData.name?.trim()) errors.name = t("nameRequired")
    if (!formData.email?.trim()) {
      errors.email = t("emailRequired")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t("invalidEmail")
    }
    if (!formData.message?.trim()) errors.message = t("messageRequired")
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
        // Here you would typically send the form data to your backend
        // For now, we'll just simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert(t("formSubmitted"))
        setFormData({ name: "", email: "", message: "" })
      } catch (error) {
        alert(t("formError"))
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
              <span className="text-xl font-bold">{t("appName")}</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {[t("home"), t("features"), t("analytics"), t("contact")].map((item) => (
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
                aria-label={darkMode ? t("lightMode") : t("darkMode")}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
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
              <h1 className="text-5xl md:text-6xl font-bold animate-fadeIn">{t("heroTitle")}</h1>
              <p className="text-xl md:text-2xl text-blue-100 animate-fadeIn">{t("heroSubtitle")}</p>
              <Button size="lg" variant="secondary">
                {t("learnMore")}
              </Button>
            </div>
          </div>
          <div className="absolute -bottom-16 left-0 w-full h-32 bg-white dark:bg-gray-900 transform -skew-y-3" />
        </motion.section>

        {/* アナリティクスセクション */}
        <section className="py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">
              {t("realTimeAnalytics")}
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
                      {t("revenueTrend")}
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
                      {t("userStatistics")}
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
                      {t("engagement")}
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
                      {t("userDistribution")}
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">{t("contact")}</h2>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-white">
                        {t("name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("namePlaceholder")}
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
                        {t("email")}
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("emailPlaceholder")}
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
                        {t("message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("messagePlaceholder")}
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
                      {t("submit")}
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

