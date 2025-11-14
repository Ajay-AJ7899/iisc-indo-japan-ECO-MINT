import React, { useState } from "react";
import { ethers } from "ethers";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Avatar } from "./ui/avatar";
import {
  Eye,
  CheckCircle,
  XCircle,
  Satellite,
  Bot,
  Award,
  BarChart3,
  MapPin,
  Calendar,
  FileText,
  Upload,
  Users,
  Activity,
  PieChart,
  LineChart,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Target,
  Globe,
  Wallet,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  AreaChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  Bar,
  Line,
  Pie,
  Cell,
} from "recharts";

interface AdminPortalProps {
  walletAddress?: string;
}

export function AdminPortal({ walletAddress }: AdminPortalProps) {
  const [submissions] = useState([
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      ngo: "Green Earth Foundation",
      location: "West Bengal",
      area: "500 hectares",
      aiScore: 94,
      satelliteScore: 96,
      status: "pending_review",
      submittedDate: "2025-09-01",
      estimatedCarbon: 2500,
      species: 25,
      projectType: "Blue Carbon - Mangrove",
      ndviCurrent: 0.72,
      ndviBaseline: 0.35,
      ndviTarget: 0.85,
      ndviTrend: "increasing",
      ndviChangeRate: 0.12,
    },
    {
      id: 4,
      name: "Himalayan Forest Reforestation",
      ngo: "Green Earth Foundation",
      location: "Uttarakhand",
      area: "800 hectares",
      aiScore: 92,
      satelliteScore: 88,
      status: "pending_review",
      submittedDate: "2025-09-02",
      estimatedCarbon: 4200,
      species: 35,
      projectType: "Green Carbon - Reforestation",
      ndviCurrent: 0.65,
      ndviBaseline: 0.22,
      ndviTarget: 0.82,
      ndviTrend: "increasing",
      ndviChangeRate: 0.14,
      treesPlanted: 125000,
    },
    {
      id: 6,
      name: "Rural Solar Electrification Program",
      ngo: "Solar Energy Alliance",
      location: "Rajasthan",
      area: "N/A",
      aiScore: 95,
      satelliteScore: 97,
      status: "approved",
      submittedDate: "2025-08-18",
      estimatedCarbon: 2800,
      species: 0,
      projectType: "Green Carbon - Solar",
      solarCapacity: "5.2 MW",
      homesElectrified: 1850,
      panelsInstalled: 12500,
      ndviCurrent: 0,
      ndviBaseline: 0,
      ndviTarget: 0,
      ndviTrend: "N/A",
      ndviChangeRate: 0,
    },
    {
      id: 7,
      name: "Community Solar Grid Installation",
      ngo: "Renewable Power Foundation",
      location: "Gujarat",
      area: "N/A",
      aiScore: 93,
      satelliteScore: 95,
      status: "ai_verification",
      submittedDate: "2025-08-30",
      estimatedCarbon: 3500,
      species: 0,
      projectType: "Green Carbon - Solar",
      solarCapacity: "6.8 MW",
      homesElectrified: 2400,
      panelsInstalled: 16800,
      ndviCurrent: 0,
      ndviBaseline: 0,
      ndviTarget: 0,
      ndviTrend: "N/A",
      ndviChangeRate: 0,
    },
  ]);

  const [analytics] = useState({
    totalSubmissions: 156,
    pendingReview: 23,
    approved: 89,
    rejected: 12,
    avgAiScore: 92,
    avgSatelliteScore: 89,
    avgNdviScore: 0.71,
    avgNdviImprovement: 0.28,
    totalCarbonOffset: 45600,
    certificatesIssued: 67,
  });

  // Enhanced Analytics Data
  const systemPerformanceData = [
    {
      month: "Jan 2025",
      submissions: 12,
      approved: 8,
      rejected: 2,
      pending: 2,
      avgAiScore: 88,
      avgSatelliteScore: 85,
    },
    {
      month: "Feb 2025",
      submissions: 15,
      approved: 11,
      rejected: 2,
      pending: 2,
      avgAiScore: 89,
      avgSatelliteScore: 87,
    },
    {
      month: "Mar 2025",
      submissions: 18,
      approved: 14,
      rejected: 1,
      pending: 3,
      avgAiScore: 91,
      avgSatelliteScore: 88,
    },
    {
      month: "Apr 2025",
      submissions: 20,
      approved: 16,
      rejected: 2,
      pending: 2,
      avgAiScore: 92,
      avgSatelliteScore: 89,
    },
    {
      month: "May 2025",
      submissions: 22,
      approved: 18,
      rejected: 1,
      pending: 3,
      avgAiScore: 93,
      avgSatelliteScore: 90,
    },
    {
      month: "Jun 2025",
      submissions: 25,
      approved: 20,
      rejected: 2,
      pending: 3,
      avgAiScore: 94,
      avgSatelliteScore: 91,
    },
    {
      month: "Jul 2025",
      submissions: 28,
      approved: 23,
      rejected: 1,
      pending: 4,
      avgAiScore: 95,
      avgSatelliteScore: 92,
    },
    {
      month: "Aug 2025",
      submissions: 30,
      approved: 25,
      rejected: 2,
      pending: 3,
      avgAiScore: 96,
      avgSatelliteScore: 93,
    },
  ];

  const geographicDistributionData = [
    {
      state: "West Bengal",
      projects: 25,
      totalArea: 1200,
      avgNdvi: 0.74,
      totalCarbon: 8500,
    },
    {
      state: "Kerala",
      projects: 18,
      totalArea: 850,
      avgNdvi: 0.68,
      totalCarbon: 6200,
    },
    {
      state: "Maharashtra",
      projects: 22,
      totalArea: 980,
      avgNdvi: 0.71,
      totalCarbon: 7100,
    },
    {
      state: "Gujarat",
      projects: 15,
      totalArea: 750,
      avgNdvi: 0.65,
      totalCarbon: 5800,
    },
    {
      state: "Karnataka",
      projects: 12,
      totalArea: 620,
      avgNdvi: 0.72,
      totalCarbon: 4900,
    },
    {
      state: "Goa",
      projects: 8,
      totalArea: 400,
      avgNdvi: 0.76,
      totalCarbon: 3200,
    },
    {
      state: "Odisha",
      projects: 20,
      totalArea: 950,
      avgNdvi: 0.69,
      totalCarbon: 6800,
    },
    {
      state: "Andaman & Nicobar",
      projects: 6,
      totalArea: 320,
      avgNdvi: 0.78,
      totalCarbon: 2600,
    },
  ];

  const verificationAccuracyData = [
    {
      month: "Jan",
      aiAccuracy: 88,
      satelliteAccuracy: 85,
      combinedAccuracy: 86.5,
      falsePositives: 8,
      falseNegatives: 4,
    },
    {
      month: "Feb",
      aiAccuracy: 89,
      satelliteAccuracy: 87,
      combinedAccuracy: 88,
      falsePositives: 6,
      falseNegatives: 3,
    },
    {
      month: "Mar",
      aiAccuracy: 91,
      satelliteAccuracy: 88,
      combinedAccuracy: 89.5,
      falsePositives: 5,
      falseNegatives: 3,
    },
    {
      month: "Apr",
      aiAccuracy: 92,
      satelliteAccuracy: 89,
      combinedAccuracy: 90.5,
      falsePositives: 4,
      falseNegatives: 2,
    },
    {
      month: "May",
      aiAccuracy: 93,
      satelliteAccuracy: 90,
      combinedAccuracy: 91.5,
      falsePositives: 3,
      falseNegatives: 2,
    },
    {
      month: "Jun",
      aiAccuracy: 94,
      satelliteAccuracy: 91,
      combinedAccuracy: 92.5,
      falsePositives: 2,
      falseNegatives: 1,
    },
    {
      month: "Jul",
      aiAccuracy: 95,
      satelliteAccuracy: 92,
      combinedAccuracy: 93.5,
      falsePositives: 2,
      falseNegatives: 1,
    },
    {
      month: "Aug",
      aiAccuracy: 96,
      satelliteScore: 93,
      combinedAccuracy: 94.5,
      falsePositives: 1,
      falseNegatives: 1,
    },
  ];

  const riskAssessmentData = [
    {
      name: "Low Risk",
      value: 68,
      projects: 89,
      color: "#10B981",
    },
    {
      name: "Medium Risk",
      value: 25,
      projects: 34,
      color: "#F59E0B",
    },
    {
      name: "High Risk",
      value: 7,
      projects: 9,
      color: "#EF4444",
    },
  ];

  const certificateStatusData = [
    {
      name: "Active Certificates",
      value: 67,
      color: "#10B981",
    },
    { name: "Pending Approval", value: 23, color: "#F59E0B" },
    { name: "Under Review", value: 12, color: "#3B82F6" },
    { name: "Expired/Revoked", value: 3, color: "#EF4444" },
  ];

  const ngoPerformanceData = [
    {
      ngo: "Green Earth Foundation",
      projects: 15,
      successRate: 94,
      avgScore: 93,
      totalEarnings: 350000,
    },
    {
      ngo: "Coastal Bloom NGO",
      projects: 12,
      successRate: 89,
      avgScore: 91,
      totalEarnings: 285000,
    },
    {
      ngo: "Ocean Guardians",
      projects: 18,
      successRate: 96,
      avgScore: 95,
      totalEarnings: 420000,
    },
    {
      ngo: "Mangrove Warriors",
      projects: 10,
      successRate: 87,
      avgScore: 88,
      totalEarnings: 245000,
    },
    {
      ngo: "Coastal Conservation Trust",
      projects: 14,
      successRate: 92,
      avgScore: 90,
      totalEarnings: 320000,
    },
  ];

  const carbonOffsetTrendsData = [
    {
      month: "Jan",
      verified: 3200,
      projected: 4500,
      cumulative: 3200,
    },
    {
      month: "Feb",
      verified: 4100,
      projected: 5200,
      cumulative: 7300,
    },
    {
      month: "Mar",
      verified: 5300,
      projected: 6100,
      cumulative: 12600,
    },
    {
      month: "Apr",
      verified: 6200,
      projected: 7300,
      cumulative: 18800,
    },
    {
      month: "May",
      verified: 7100,
      projected: 8200,
      cumulative: 25900,
    },
    {
      month: "Jun",
      verified: 8500,
      projected: 9100,
      cumulative: 34400,
    },
    {
      month: "Jul",
      verified: 9200,
      projected: 10200,
      cumulative: 43600,
    },
    {
      month: "Aug",
      verified: 10100,
      projected: 11500,
      cumulative: 53700,
    },
  ];

  const COLORS = [
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
  ];

  const [selectedSubmission, setSelectedSubmission] =
    useState(null);
  const [approvedSubmissions, setApprovedSubmissions] =
    useState(new Set());
  const [rejectedSubmissions, setRejectedSubmissions] =
    useState(new Set());
  const [
    showApprovalNotification,
    setShowApprovalNotification,
  ] = useState(null);
  const [
    showRejectionNotification,
    setShowRejectionNotification,
  ] = useState(null);

  // Certificate state
  const [mintedSubmissions, setMintedSubmissions] = useState<Set<number>>(new Set());

  // Preview modal state
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewSubmission, setPreviewSubmission] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
    case "pending_review":
        // Changed text-yellow-300 to text-yellow-800 for contrast
        return "bg-yellow-500/20 text-yellow-800 border-yellow-400/30";
    case "ai_verification":
        // Changed text-blue-300 to text-blue-800 for contrast
        return "bg-blue-500/20 text-blue-800 border-blue-400/30";
    case "approved":
        // Changed text-emerald-300 to text-emerald-800 for contrast
        return "bg-emerald-500/20 text-emerald-900 border-emerald-400/30";
    case "rejected":
        // Changed text-red-300 to text-red-800 for contrast
        return "bg-red-500/20 text-red-900 border-red-400/30";
    default:
        // Changed text-gray-300 to text-gray-800 for contrast
        return "bg-gray-500/20 text-gray-800 border-gray-400/30";
}
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending_review":
        return "Pending Review";
      case "ai_verification":
        return "AI Verification";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const handleApproveSubmission = (id: number) => {
    // Add to approved submissions
    setApprovedSubmissions((prev) => new Set([...prev, id]));

    // Show approval notification
    const submission = submissions.find((s) => s.id === id);
    setShowApprovalNotification({
      id,
      name: submission?.name || "Project",
      timestamp: new Date().toLocaleTimeString(),
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowApprovalNotification(null);
    }, 5000);
  };

  const handleRejectSubmission = (id: number) => {
    // Add to rejected submissions
    setRejectedSubmissions((prev) => new Set([...prev, id]));

    // Show rejection notification
    const submission = submissions.find((s) => s.id === id);
    setShowRejectionNotification({
      id,
      name: submission?.name || "Project",
      timestamp: new Date().toLocaleTimeString(),
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowRejectionNotification(null);
    }, 5000);
  };

  // Certificate Functions
  const handleIssueCertificate = (id: number) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;

    // Mark submission as having certificate issued
    setMintedSubmissions(prev => new Set([...prev, id]));
    
    // Show success notification
    const certificateId = `CERT-${String(id).padStart(3, '0')}-2025`;
    alert(`✅ Certificate Issued Successfully!\n\nCertificate ID: ${certificateId}\nProject: ${submission.name}\nNGO: ${submission.ngo}\nCarbon Credits: ${submission.estimatedCarbon}t CO₂\nLocation: ${submission.location}`);
  };

  // Preview Functions
  const handlePreviewSubmission = (submission: any) => {
    setPreviewSubmission(submission);
    setPreviewModalOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewModalOpen(false);
    setPreviewSubmission(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="dashboard" className="w-full">
        <div className="backdrop-blur-md bg-black/10 rounded-2xl border border-black/20 p-6 mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/10 border border-black/20">
            <TabsTrigger
              value="dashboard"
              className="text-black data-[state=active]:bg-black/20 data-[state=active]:text-black"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="text-black data-[state=active]:bg-black/20 data-[state=active]:text-black"
            >
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-black data-[state=active]:bg-black/20 data-[state=active]:text-black"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="text-black data-[state=active]:bg-black/20 data-[state=active]:text-black"
            >
              Certificates
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black text-sm">
                    Total Submissions
                  </p>
                  <p className="text-3xl text-black">
                    {analytics.totalSubmissions}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-black" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black/70 text-sm">
                    Pending Review
                  </p>
                  <p className="text-3xl text-black">
                    {analytics.pendingReview}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/30 rounded-xl flex items-center justify-center shadow-lg border border-yellow-600/20">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black/70 text-sm">
                    Approved Projects
                  </p>
                  <p className="text-3xl text-black">
                    {analytics.approved}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-600/80 rounded-xl flex items-center justify-center shadow-lg border border-emerald-500/30">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-black/70 text-sm">
                    Certificates Issued
                  </p>
                  <p className="text-3xl text-black">
                    {analytics.certificatesIssued}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600/80 rounded-xl flex items-center justify-center shadow-lg border border-purple-500/30">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <h3 className="text-xl text-black mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                System Analytics
              </h3>
              <div className="space-y-4">
                <div className="bg-black/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-black/70 text-sm">
                      Average AI Verification Score
                    </p>
                    <p className="text-black">
                      {analytics.avgAiScore}%
                    </p>
                  </div>
                  <Progress
                    value={analytics.avgAiScore}
                    className="h-2 bg-black/10"
                  />
                </div>
                <div className="bg-black/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-black/70 text-sm">
                      Average Satellite Score
                    </p>
                    <p className="text-black">
                      {analytics.avgSatelliteScore}%
                    </p>
                  </div>
                  <Progress
                    value={analytics.avgSatelliteScore}
                    className="h-2 bg-black/10"
                  />
                </div>
                <div className="bg-black/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-black/70 text-sm">
                      Average NDVI Score
                    </p>
                    <p className="text-black">
                      {analytics.avgNdviScore}
                    </p>
                  </div>
                  <Progress
                    value={analytics.avgNdviScore * 100}
                    className="h-2 bg-black/10"
                  />
                </div>
                <div className="bg-black/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-black/70 text-sm">
                      Avg NDVI Improvement
                    </p>
                    <p className="text-black">
                      +{analytics.avgNdviImprovement} ↗
                    </p>
                  </div>
                </div>
                <div className="bg-black/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-black/70 text-sm">
                      Total Carbon Offset
                    </p>
                    <p className="text-black">
                      {analytics.totalCarbonOffset.toLocaleString()}t CO₂
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <h3 className="text-xl text-black mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm">
                      Sundarbans Project approved
                    </p>
                    <p className="text-black/60 text-xs">
                      2 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm">
                      AI verification completed for Bhitarkanika
                    </p>
                    <p className="text-black/60 text-xs">
                      4 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Upload className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm">
                      New submission from Ocean Guardians
                    </p>
                    <p className="text-black/60 text-xs">
                      6 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Satellite className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm">
                      Satellite analysis updated
                    </p>
                    <p className="text-black/60 text-xs">
                      8 hours ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-black text-sm">
                      Kerala Project requires revision
                    </p>
                    <p className="text-black/60 text-xs">
                      1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-6">
            {submissions
              .filter((s) => !approvedSubmissions.has(s.id) && !rejectedSubmissions.has(s.id))
              .map((submission) => (
                <Card
                  key={submission.id}
                  className="backdrop-blur-md bg-black/10 border border-black/20 p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <h3 className="text-xl text-black">
                          {submission.name}
                        </h3>
                        <Badge className={
                          submission.projectType?.includes("Blue") ? "bg-blue-500/20 text-blue-800 border-blue-400/30" :
                          submission.projectType?.includes("Solar") ? "bg-amber-500/20 text-amber-800 border-amber-400/30" :
                          "bg-emerald-500/20 text-emerald-800 border-emerald-400/30"
                        }>
                          {submission.projectType}
                        </Badge>
                        <Badge
                          className={getStatusColor(submission.status)}
                        >
                          {getStatusText(submission.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-black/60 text-sm">NGO</p>
                          <p className="text-black">{submission.ngo}</p>
                        </div>
                        <div>
                          <p className="text-black/60 text-sm">Location</p>
                          <p className="text-black flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {submission.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-black/60 text-sm">Area</p>
                          <p className="text-black">{submission.area}</p>
                        </div>
                        <div>
                          <p className="text-black/60 text-sm">
                            Submitted
                          </p>
                          <p className="text-black flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(submission.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-black/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-black/70 text-sm">AI Score</p>
                            <div className="flex items-center">
                              <Bot className="w-4 h-4 mr-1 text-blue-600" />
                              <span className="text-black">{submission.aiScore}%</span>
                            </div>
                          </div>
                          <Progress value={submission.aiScore} className="h-2" />
                        </div>
                        <div className="bg-black/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-black/70 text-sm">Satellite Score</p>
                            <div className="flex items-center">
                              <Satellite className="w-4 h-4 mr-1 text-green-600" />
                              <span className="text-black">{submission.satelliteScore}%</span>
                            </div>
                          </div>
                          <Progress value={submission.satelliteScore} className="h-2" />
                        </div>
                        <div className="bg-black/5 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-black/70 text-sm">Est. Carbon</p>
                            <p className="text-black">
                              {submission.estimatedCarbon.toLocaleString()}t CO₂
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Button
                        onClick={() => handleApproveSubmission(submission.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleRejectSubmission(submission.id)}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handlePreviewSubmission(submission)}
                        variant="ghost"
                        className="text-black hover:bg-black/10"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-8">
            {/* System Performance Overview */}
            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <h3 className="text-xl text-black mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                System Performance Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={systemPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#000" 
                      fontSize={12}
                    />
                    <YAxis stroke="#000" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="submissions" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Total Submissions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="approved" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Approved"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgAiScore" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      name="Avg AI Score"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgSatelliteScore" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      name="Avg Satellite Score"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Geographic Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
                <h3 className="text-xl text-black mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Geographic Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={geographicDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="state" 
                        stroke="#000" 
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="#000" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="projects" 
                        fill="#10B981" 
                        name="Projects"
                        radius={[4, 4, 0, 0]}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
                <h3 className="text-xl text-black mb-6 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Carbon Offset Trends
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={carbonOffsetTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#000" 
                        fontSize={12}
                      />
                      <YAxis stroke="#000" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="verified" 
                        stackId="1"
                        stroke="#10B981" 
                        fill="#10B981"
                        fillOpacity={0.7}
                        name="Verified (t CO₂)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="projected" 
                        stackId="2"
                        stroke="#3B82F6" 
                        fill="#3B82F6"
                        fillOpacity={0.4}
                        name="Projected (t CO₂)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Verification Accuracy & Risk Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
                <h3 className="text-xl text-black mb-6 flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Verification Accuracy
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={verificationAccuracyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#000" 
                        fontSize={12}
                      />
                      <YAxis stroke="#000" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="aiAccuracy" 
                        stroke="#8B5CF6" 
                        strokeWidth={3}
                        name="AI Accuracy (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="satelliteAccuracy" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        name="Satellite Accuracy (%)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="combinedAccuracy" 
                        stroke="#F59E0B" 
                        strokeWidth={3}
                        name="Combined Accuracy (%)"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
                <h3 className="text-xl text-black mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Risk Assessment
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={riskAssessmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskAssessmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: '8px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* NGO Performance */}
            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <h3 className="text-xl text-black mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                NGO Performance Metrics
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/20">
                      <th className="text-left text-black py-3 px-2">NGO</th>
                      <th className="text-left text-black py-3 px-2">Projects</th>
                      <th className="text-left text-black py-3 px-2">Success Rate</th>
                      <th className="text-left text-black py-3 px-2">Avg Score</th>
                      <th className="text-left text-black py-3 px-2">Total Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ngoPerformanceData.map((ngo, index) => (
                      <tr key={index} className="border-b border-black/10">
                        <td className="text-black py-3 px-2">{ngo.ngo}</td>
                        <td className="text-black py-3 px-2">{ngo.projects}</td>
                        <td className="text-black py-3 px-2">
                          <div className="flex items-center">
                            <span className="mr-2">{ngo.successRate}%</span>
                            <div className="w-16 bg-black/10 rounded-full h-2">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full" 
                                style={{ width: `${ngo.successRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="text-black py-3 px-2">{ngo.avgScore}</td>
                        <td className="text-black py-3 px-2">
                          ${ngo.totalEarnings.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="space-y-6">
            {/* Approved submissions for certificate issuance */}
            <div className="space-y-4">
              <h3 className="text-xl text-black mb-4">Approved Projects - Ready for Certificate Issuance</h3>
              {submissions
                .filter(s => s.status === 'approved' || approvedSubmissions.has(s.id))
                .map((submission) => (
                  <Card
                    key={submission.id}
                    className="backdrop-blur-md bg-black/10 border border-black/20 p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <h3 className="text-xl text-black">{submission.name}</h3>
                          <Badge className="bg-emerald-500/20 text-emerald-800 border-emerald-400/30">
                            Approved
                          </Badge>
                          {mintedSubmissions.has(submission.id) && (
                            <Badge className="bg-purple-500/20 text-purple-800 border-purple-400/30">
                              Certificate Issued
                            </Badge>
                          )}
                        </div>
                        
                        {/* Highlighted Carbon Tokens */}
                        <div className="bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-green-500/30 border-2 border-emerald-400/50 rounded-xl p-4 mb-4 shadow-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-emerald-900/70 text-sm mb-1">🏆 Carbon Tokens to Approve</p>
                              <div className="flex items-center gap-3">
                                <Globe className="w-8 h-8 text-emerald-600" />
                                <div>
                                  <p className="text-4xl text-emerald-900">
                                    {submission.estimatedCarbon.toLocaleString()} <span className="text-2xl">Tokens</span>
                                  </p>
                                  <p className="text-emerald-800 text-sm">tons CO₂</p>
                                </div>
                              </div>
                            </div>
                            <div className="hidden md:flex w-16 h-16 bg-emerald-500/40 rounded-full items-center justify-center border-2 border-emerald-600/30">
                              <Award className="w-8 h-8 text-emerald-700" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-black/5 rounded-lg p-3">
                            <p className="text-black/60 text-sm">NGO</p>
                            <p className="text-black">{submission.ngo}</p>
                          </div>
                          <div className="bg-black/5 rounded-lg p-3">
                            <p className="text-black/60 text-sm">Location</p>
                            <p className="text-black">{submission.location}</p>
                          </div>
                          <div className="bg-black/5 rounded-lg p-3">
                            <p className="text-black/60 text-sm">AI Score</p>
                            <p className="text-black">{submission.aiScore}%</p>
                          </div>
                        </div>
                      </div>
                      
                      {!mintedSubmissions.has(submission.id) && (
                        <div className="flex flex-col gap-3 lg:w-64">
                          <Button
                            onClick={() => handleIssueCertificate(submission.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            Issue Certificate
                          </Button>
                          <Button
                            onClick={() => handlePreviewSubmission(submission)}
                            variant="ghost"
                            className="text-black hover:bg-black/10"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
            </div>

            <Card className="backdrop-blur-md bg-black/10 border border-black/20 p-6">
              <h3 className="text-xl text-black mb-6">
                Issued Certificates
              </h3>
              <div className="space-y-4">
                {mintedSubmissions.size === 0 ? (
                  <div className="bg-black/5 rounded-xl p-6 border border-black/10 text-center">
                    <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-black/40" />
                    </div>
                    <p className="text-black/60 text-sm">
                      No certificates have been issued yet.
                    </p>
                    <p className="text-black/40 text-xs mt-1">
                      Issue certificates for approved projects to see them here.
                    </p>
                  </div>
                ) : (
                  Array.from(mintedSubmissions).map((submissionId) => {
                    const submission = submissions.find(s => s.id === submissionId);
                    if (!submission) return null;
                    
                    const certificateId = `CERT-${String(submissionId).padStart(3, '0')}-2025`;
                    const issueDate = new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    });

                    return (
                      <div key={submissionId} className="bg-black/5 rounded-xl p-4 border border-black/10 flex justify-between items-center">
                        <div>
                          <p className="text-black">
                            Certificate #{certificateId}
                          </p>
                          <p className="text-black/60 text-sm">
                            {submission.name} • Issued: {issueDate}
                          </p>
                          <p className="text-black/50 text-xs mt-1">
                            {submission.estimatedCarbon}t CO₂ • {submission.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-emerald-500/20 text-emerald-800 border-emerald-400/30">
                            Issued
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-black hover:bg-black/10"
                            onClick={() => {
                              alert(`📜 Certificate Details\n\nCertificate ID: ${certificateId}\nProject: ${submission.name}\nCarbon Credits: ${submission.estimatedCarbon}t CO₂\nNGO: ${submission.ngo}\nLocation: ${submission.location}\nIssued: ${issueDate}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Notifications */}
      {showApprovalNotification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <div>
              <p className="font-medium">Project Approved!</p>
              <p className="text-sm opacity-90">
                {showApprovalNotification.name} at {showApprovalNotification.timestamp}
              </p>
            </div>
          </div>
        </div>
      )}

      {showRejectionNotification && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 mr-2" />
            <div>
              <p className="font-medium">Project Rejected</p>
              <p className="text-sm opacity-90">
                {showRejectionNotification.name} at {showRejectionNotification.timestamp}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModalOpen && previewSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md bg-white/95 border border-black/20 p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-black/10">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl text-black mb-3">
                  {previewSubmission.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Badge className={
                    previewSubmission.projectType?.includes("Blue") ? "bg-blue-500/20 text-blue-800 border-blue-400/30" :
                    previewSubmission.projectType?.includes("Solar") ? "bg-amber-500/20 text-amber-800 border-amber-400/30" :
                    "bg-emerald-500/20 text-emerald-800 border-emerald-400/30"
                  }>
                    {previewSubmission.projectType}
                  </Badge>
                  <Badge className={getStatusColor(previewSubmission.status)}>
                    {getStatusText(previewSubmission.status)}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={handleClosePreview}
                variant="ghost"
                className="text-black hover:bg-black/10 ml-4"
              >
                <XCircle className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg text-black mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/5 rounded-lg p-4">
                    <p className="text-black/60 text-sm mb-1">NGO</p>
                    <p className="text-black">{previewSubmission.ngo}</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-4">
                    <p className="text-black/60 text-sm mb-1">Location</p>
                    <p className="text-black flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {previewSubmission.location}
                    </p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-4">
                    <p className="text-black/60 text-sm mb-1">Area</p>
                    <p className="text-black">{previewSubmission.area}</p>
                  </div>
                  <div className="bg-black/5 rounded-lg p-4">
                    <p className="text-black/60 text-sm mb-1">Submitted Date</p>
                    <p className="text-black flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(previewSubmission.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Scores */}
              <div>
                <h3 className="text-lg text-black mb-4 flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Verification Scores
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-black/70">AI Verification Score</p>
                      <div className="flex items-center">
                        <Bot className="w-4 h-4 mr-1 text-blue-600" />
                        <span className="text-black text-lg">{previewSubmission.aiScore}%</span>
                      </div>
                    </div>
                    <Progress value={previewSubmission.aiScore} className="h-3" />
                  </div>
                  <div className="bg-black/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-black/70">Satellite Score</p>
                      <div className="flex items-center">
                        <Satellite className="w-4 h-4 mr-1 text-green-600" />
                        <span className="text-black text-lg">{previewSubmission.satelliteScore}%</span>
                      </div>
                    </div>
                    <Progress value={previewSubmission.satelliteScore} className="h-3" />
                  </div>
                </div>
              </div>

              {/* Carbon Impact */}
              <div>
                <h3 className="text-lg text-black mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Carbon Impact
                </h3>
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-black/70 mb-2">Estimated Carbon Offset</p>
                      <p className="text-4xl text-emerald-700">
                        {previewSubmission.estimatedCarbon.toLocaleString()}
                      </p>
                      <p className="text-black/60 text-sm mt-1">tons of CO₂</p>
                    </div>
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Globe className="w-10 h-10 text-emerald-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project-Specific Data */}
              {previewSubmission.projectType?.includes("Mangrove") && (
                <div>
                  <h3 className="text-lg text-black mb-4 flex items-center">
                    <Satellite className="w-5 h-5 mr-2" />
                    Mangrove Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Species Count</p>
                      <p className="text-black text-2xl">{previewSubmission.species}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">NDVI Current</p>
                      <p className="text-black text-2xl">{previewSubmission.ndviCurrent}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">NDVI Change Rate</p>
                      <p className="text-black text-2xl">{previewSubmission.ndviChangeRate}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">NDVI Trend</p>
                      <p className="text-black text-2xl capitalize">{previewSubmission.ndviTrend}</p>
                    </div>
                  </div>
                </div>
              )}

              {previewSubmission.projectType?.includes("Reforestation") && (
                <div>
                  <h3 className="text-lg text-black mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Reforestation Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Trees Planted</p>
                      <p className="text-black text-2xl">{previewSubmission.treesPlanted?.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Species Count</p>
                      <p className="text-black text-2xl">{previewSubmission.species}</p>
                    </div>
                  </div>
                </div>
              )}

              {previewSubmission.projectType?.includes("Solar") && (
                <div>
                  <h3 className="text-lg text-black mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Solar Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Solar Capacity</p>
                      <p className="text-black text-2xl">{previewSubmission.solarCapacity}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Homes Electrified</p>
                      <p className="text-black text-2xl">{previewSubmission.homesElectrified?.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg p-4">
                      <p className="text-black/60 text-sm mb-1">Panels Installed</p>
                      <p className="text-black text-2xl">{previewSubmission.panelsInstalled?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-black/10">
                <Button
                  onClick={() => {
                    handleApproveSubmission(previewSubmission.id);
                    handleClosePreview();
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12"
                  disabled={approvedSubmissions.has(previewSubmission.id) || rejectedSubmissions.has(previewSubmission.id)}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve Project
                </Button>
                <Button
                  onClick={() => {
                    handleRejectSubmission(previewSubmission.id);
                    handleClosePreview();
                  }}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 h-12"
                  disabled={approvedSubmissions.has(previewSubmission.id) || rejectedSubmissions.has(previewSubmission.id)}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Project
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}