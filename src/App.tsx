import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import LandingPage from './pages/LandingPage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import PrivacyPolicy from './pages/common/PrivacyPolicy';
import TermsOfService from './pages/common/TermsOfService';
import Blog from './pages/Blog';
import AdminDashboard from './pages/admin/Dashboard';
import AdminQuestions from './pages/admin/Questions';
import AdminUsers from './pages/admin/Users';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="test" element={<TestPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="blog" element={<Blog />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="questions" element={<AdminQuestions />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      
      </Routes>
        </Layout>
    </BrowserRouter>
  );
}

export default App;