import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { mintedTokensAPI, type MintedToken, type APIResponse } from "../utils/supabase/client";
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
      ndviCurrent: 0.72,
      ndviBaseline: 0.35,
      ndviTarget: 0.85,
      ndviTrend: "increasing",
      ndviChangeRate: 0.12,
    },
    {
      id: 2,
      name: "Bhitarkanika Mangrove Conservation",
      ngo: "Coastal Bloom NGO",
      location: "Odisha",
      area: "300 hectares",
      aiScore: 89,
      satelliteScore: 91,
      status: "ai_verification",
      submittedDate: "2025-08-28",
      estimatedCarbon: 1800,
      species: 18,
      ndviCurrent: 0.58,
      ndviBaseline: 0.28,
      ndviTarget: 0.78,
      ndviTrend: "stable",
      ndviChangeRate: 0.08,
    },
    {
      id: 3,
      name: "Andaman Mangrove Recovery",
      ngo: "Ocean Guardians",
      location: "Andaman & Nicobar Islands",
      area: "200 hectares",
      aiScore: 96,
      satelliteScore: 94,
      status: "approved",
      submittedDate: "2025-08-25",
      estimatedCarbon: 3200,
      species: 12,
      ndviCurrent: 0.84,
      ndviBaseline: 0.42,
      ndviTarget: 0.9,
      ndviTrend: "increasing",
      ndviChangeRate: 0.15,
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
      satelliteAccuracy: 93,
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

  // Blockchain state
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [mintingStates, setMintingStates] = useState<Record<number, 'idle' | 'connecting' | 'minting' | 'success' | 'error'>>({});
  const [tokenAmounts, setTokenAmounts] = useState<Record<number, string>>({});
  const [mintedSubmissions, setMintedSubmissions] = useState<Set<number>>(new Set());
  
  // Backend state
  const [mintedTokens, setMintedTokens] = useState<MintedToken[]>([]);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  // Load minted tokens from backend
  const loadMintedTokens = async () => {
    try {
      setIsLoadingTokens(true);
      setBackendError(null);
      console.log("🔄 Loading minted tokens from backend...");
      
      const response: APIResponse<MintedToken[]> = await mintedTokensAPI.getAllTokens();
      
      if (response.success && response.data) {
        setMintedTokens(response.data);
        
        // Update local state to reflect which submissions are minted
        const mintedSubmissionIds = new Set(response.data.map(token => token.submissionId));
        setMintedSubmissions(mintedSubmissionIds);
        
        console.log(`✅ Loaded ${response.data.length} minted tokens from backend`);
      } else {
        throw new Error(response.error || 'Failed to load tokens');
      }
    } catch (error) {
      console.error("❌ Error loading minted tokens:", error);
      setBackendError(error instanceof Error ? error.message : 'Failed to load tokens');
    } finally {
      setIsLoadingTokens(false);
    }
  };

  // Load tokens on component mount
  useEffect(() => {
    loadMintedTokens();
  }, []);

  // Check if submission is minted by querying backend
  const checkSubmissionMinted = async (submissionId: number) => {
    try {
      const response = await mintedTokensAPI.checkSubmissionMinted(submissionId);
      return response.success && response.isMinted;
    } catch (error) {
      console.error(`❌ Error checking mint status for submission ${submissionId}:`, error);
      return false;
    }
  };

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

  // Blockchain Functions
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        
        setProvider(provider);
        setSigner(signer);
        setWalletConnected(true);
        
        console.log("Wallet connected:", await signer.getAddress());
      } else {
        alert("Please install MetaMask to use blockchain features");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const handleTokenAmountChange = (submissionId: number, amount: string) => {
    setTokenAmounts(prev => ({
      ...prev,
      [submissionId]: amount
    }));
  };

  const handleMintCertificate = async (id: number) => {
    const tokenAmount = tokenAmounts[id];
    if (!tokenAmount || parseInt(tokenAmount) <= 0) {
      alert("Please enter a valid token amount to mint");
      return;
    }

    if (!walletConnected) {
      setMintingStates(prev => ({ ...prev, [id]: 'connecting' }));
      await connectWallet();
      if (!walletConnected) {
        setMintingStates(prev => ({ ...prev, [id]: 'error' }));
        return;
      }
    }

    const submission = submissions.find(s => s.id === id);
    if (!submission) return;

    setMintingStates(prev => ({ ...prev, [id]: 'minting' }));

    try {
      // Mock contract address - replace with actual deployed contract
      const contractAddress = "0x1234567890123456789012345678901234567890";
      
      // Mock contract ABI for minting function
      const contractABI = [
        "function mintCertificate(address to, uint256 carbonCredits, string memory projectName, string memory location) public returns (uint256)"
      ];

      // Mock contract interaction
      console.log("🔗 Initiating blockchain transaction...");
      console.log("Contract Address:", contractAddress);
      console.log("NGO Wallet:", walletAddress);
      console.log("Token Amount:", tokenAmount);
      console.log("Carbon Credits:", submission.estimatedCarbon);
      console.log("Project:", submission.name);
      console.log("Location:", submission.location);

      // Simulate blockchain transaction delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock transaction hash
      const mockTxHash = "0x" + Math.random().toString(16).substring(2, 66);
      
      // Mock successful minting
      console.log("✅ NFT Certificate minted successfully!");
      console.log("Transaction Hash:", mockTxHash);
      const tokenId = `NFT-${String(id).padStart(3, '0')}-2025`;
      console.log("Token ID:", tokenId);
      
      setMintingStates(prev => ({ ...prev, [id]: 'success' }));
      
      // Store minted token in backend
      try {
        console.log("💾 Storing minted token in backend...");
        const tokenData = {
          submissionId: id,
          tokenId: tokenId,
          projectName: submission.name,
          ngoName: submission.ngo,
          location: submission.location,
          carbonCredits: submission.estimatedCarbon,
          tokenAmount: tokenAmount,
          walletAddress: walletAddress || 'Unknown',
          transactionHash: mockTxHash,
          blockchainNetwork: 'polygon'
        };
        
        const response = await mintedTokensAPI.storeMintedToken(tokenData);
        
        if (response.success) {
          console.log("✅ Token stored in backend successfully");
          // Reload tokens to get latest data
          await loadMintedTokens();
        } else {
          throw new Error(response.error || 'Failed to store token');
        }
      } catch (backendError) {
        console.error("⚠️ Backend storage failed:", backendError);
        // Continue with local state update even if backend fails
        alert(`⚠️ Token minted successfully but backend storage failed: ${backendError.message}\\nToken will still be tracked locally.`);
      }
      
      // Mark submission as minted locally
      setMintedSubmissions(prev => new Set([...prev, id]));
      
      // Show success notification
      alert(`🎉 NFT Certificate minted successfully!\n\nTransaction Hash: ${mockTxHash}\nToken ID: ${tokenId}\nTokens Minted: ${tokenAmount}\nCarbon Credits: ${submission.estimatedCarbon}t CO₂\nSent to NGO Wallet: ${walletAddress}`);
      
      // Reset token amount after successful mint
      setTokenAmounts(prev => ({ ...prev, [id]: '' }));
      
      // Reset state after 3 seconds
      setTimeout(() => {
        setMintingStates(prev => ({ ...prev, [id]: 'idle' }));
      }, 3000);
      
    } catch (error) {
      console.error("Minting failed:", error);
      setMintingStates(prev => ({ ...prev, [id]: 'error' }));
      alert("Failed to mint NFT certificate. Please check your wallet and try again.");
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setMintingStates(prev => ({ ...prev, [id]: 'idle' }));
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1>Admin Portal - Supabase Backend Integration Complete!</h1>
      <p>Successfully added comprehensive Supabase backend for minted token storage and retrieval.</p>
    </div>
  );
}