import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client for server operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-4b2f2838/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    service: "Eco Mint Backend API",
    version: "1.0.0"
  });
});

// ============================
// AUTHENTICATION ROUTES
// ============================

// User registration
app.post("/make-server-4b2f2838/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🔐 User registration request:", body);
    
    const { email, password, name, userType, walletAddress, organization } = body;
    
    // Validate required fields
    if (!email || !password || !name || !userType) {
      return c.json({ 
        success: false, 
        error: "Missing required fields" 
      }, 400);
    }
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        name, 
        userType, 
        walletAddress, 
        organization 
      },
      email_confirm: true // Auto-confirm since no email server configured
    });
    
    if (authError) {
      console.error("❌ Auth registration failed:", authError);
      return c.json({ 
        success: false, 
        error: "Registration failed",
        details: authError.message 
      }, 400);
    }
    
    // Store additional user data in KV store
    const userId = authData.user.id;
    const userProfile = {
      id: userId,
      email,
      name,
      userType,
      walletAddress: walletAddress || null,
      organization: organization || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active"
    };
    
    await kv.set(`user_profile:${userId}`, userProfile);
    await kv.set(`user_email:${email}`, { userId, userType });
    
    console.log(`✅ User registered successfully: ${email} (${userType})`);
    return c.json({ 
      success: true, 
      data: { 
        userId, 
        email, 
        name, 
        userType 
      },
      message: "User registered successfully" 
    });
    
  } catch (error) {
    console.error("❌ Registration error:", error);
    return c.json({ 
      success: false, 
      error: "Internal server error",
      details: error.message 
    }, 500);
  }
});

// User login/authentication
app.post("/make-server-4b2f2838/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🔐 User login request for:", body.email);
    
    const { email, password } = body;
    
    if (!email || !password) {
      return c.json({ 
        success: false, 
        error: "Email and password required" 
      }, 400);
    }
    
    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError) {
      console.error("❌ Login failed:", authError);
      return c.json({ 
        success: false, 
        error: "Invalid credentials" 
      }, 401);
    }
    
    // Get user profile from KV store
    const userProfile = await kv.get(`user_profile:${authData.user.id}`);
    
    console.log(`✅ User logged in successfully: ${email}`);
    return c.json({ 
      success: true, 
      data: {
        userId: authData.user.id,
        email: authData.user.email,
        accessToken: authData.session.access_token,
        profile: userProfile
      },
      message: "Login successful" 
    });
    
  } catch (error) {
    console.error("❌ Login error:", error);
    return c.json({ 
      success: false, 
      error: "Internal server error" 
    }, 500);
  }
});

// ============================
// PROJECT SUBMISSION ROUTES
// ============================

// Get all project submissions
app.get("/make-server-4b2f2838/submissions", async (c) => {
  try {
    console.log("📋 Fetching all project submissions");
    const submissions = await kv.getByPrefix("submission:");
    
    // Sort by submission date (newest first)
    const sortedSubmissions = submissions.sort((a, b) => 
      new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
    );
    
    console.log(`✅ Found ${sortedSubmissions.length} submissions`);
    return c.json({ 
      success: true, 
      data: sortedSubmissions,
      count: sortedSubmissions.length 
    });
  } catch (error) {
    console.error("❌ Error fetching submissions:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch submissions" 
    }, 500);
  }
});

// Get submissions by NGO
app.get("/make-server-4b2f2838/submissions/ngo/:ngoId", async (c) => {
  try {
    const ngoId = c.req.param("ngoId");
    console.log(`🔍 Fetching submissions for NGO: ${ngoId}`);
    
    const allSubmissions = await kv.getByPrefix("submission:");
    const ngoSubmissions = allSubmissions.filter(sub => sub.ngoId === ngoId);
    
    console.log(`✅ Found ${ngoSubmissions.length} submissions for NGO ${ngoId}`);
    return c.json({ 
      success: true, 
      data: ngoSubmissions,
      count: ngoSubmissions.length 
    });
  } catch (error) {
    console.error("❌ Error fetching NGO submissions:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch NGO submissions" 
    }, 500);
  }
});

// Submit new project
app.post("/make-server-4b2f2838/submissions", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🌱 New project submission:", body);
    
    // Validate required fields
    const requiredFields = ["name", "ngoId", "ngoName", "location", "area", "estimatedCarbon"];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return c.json({ 
        success: false, 
        error: "Missing required fields",
        missingFields 
      }, 400);
    }
    
    // Generate submission ID
    const submissionId = `submission:${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create submission record
    const submission = {
      id: submissionId,
      name: body.name,
      ngoId: body.ngoId,
      ngoName: body.ngoName,
      location: body.location,
      area: body.area,
      estimatedCarbon: body.estimatedCarbon,
      species: body.species || 0,
      description: body.description || "",
      images: body.images || [],
      coordinates: body.coordinates || null,
      status: "pending_review",
      aiScore: null,
      satelliteScore: null,
      ndviCurrent: null,
      ndviBaseline: null,
      ndviTarget: null,
      ndviTrend: null,
      ndviChangeRate: null,
      submittedDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store submission
    await kv.set(submissionId, submission);
    
    // Update NGO submission count
    const ngoStats = await kv.get(`ngo_stats:${body.ngoId}`) || { 
      totalSubmissions: 0, 
      approvedSubmissions: 0, 
      rejectedSubmissions: 0 
    };
    ngoStats.totalSubmissions += 1;
    await kv.set(`ngo_stats:${body.ngoId}`, ngoStats);
    
    console.log(`✅ Project submitted successfully: ${submissionId}`);
    return c.json({ 
      success: true, 
      data: submission,
      message: "Project submitted successfully" 
    });
    
  } catch (error) {
    console.error("❌ Error submitting project:", error);
    return c.json({ 
      success: false, 
      error: "Failed to submit project" 
    }, 500);
  }
});

// Update submission status (Admin only)
app.put("/make-server-4b2f2838/submissions/:submissionId/status", async (c) => {
  try {
    const submissionId = c.req.param("submissionId");
    const body = await c.req.json();
    console.log(`📝 Updating submission status: ${submissionId} -> ${body.status}`);
    
    // Get existing submission
    const fullSubmissionId = submissionId.startsWith('submission:') ? submissionId : `submission:${submissionId}`;
    const submission = await kv.get(fullSubmissionId);
    
    if (!submission) {
      return c.json({ 
        success: false, 
        error: "Submission not found" 
      }, 404);
    }
    
    // Update submission
    const updatedSubmission = {
      ...submission,
      status: body.status,
      aiScore: body.aiScore || submission.aiScore,
      satelliteScore: body.satelliteScore || submission.satelliteScore,
      updatedAt: new Date().toISOString(),
      approvedDate: body.status === 'approved' ? new Date().toISOString() : submission.approvedDate,
      rejectedDate: body.status === 'rejected' ? new Date().toISOString() : submission.rejectedDate,
      rejectionReason: body.rejectionReason || submission.rejectionReason
    };
    
    await kv.set(fullSubmissionId, updatedSubmission);
    
    // Update NGO stats
    const ngoStats = await kv.get(`ngo_stats:${submission.ngoId}`) || { 
      totalSubmissions: 0, 
      approvedSubmissions: 0, 
      rejectedSubmissions: 0 
    };
    
    if (body.status === 'approved' && submission.status !== 'approved') {
      ngoStats.approvedSubmissions += 1;
    } else if (body.status === 'rejected' && submission.status !== 'rejected') {
      ngoStats.rejectedSubmissions += 1;
    }
    
    await kv.set(`ngo_stats:${submission.ngoId}`, ngoStats);
    
    console.log(`✅ Submission status updated: ${submissionId}`);
    return c.json({ 
      success: true, 
      data: updatedSubmission,
      message: "Submission status updated successfully" 
    });
    
  } catch (error) {
    console.error("❌ Error updating submission status:", error);
    return c.json({ 
      success: false, 
      error: "Failed to update submission status" 
    }, 500);
  }
});

// ============================
// TOKEN/NFT MINTING ROUTES
// ============================

// Get all minted tokens
app.get("/make-server-4b2f2838/minted-tokens", async (c) => {
  try {
    console.log("📋 Fetching all minted tokens");
    const tokens = await kv.getByPrefix("minted_token:");
    
    // Sort tokens by mint date (newest first)
    const sortedTokens = tokens.sort((a, b) => 
      new Date(b.mintDate).getTime() - new Date(a.mintDate).getTime()
    );
    
    console.log(`✅ Found ${sortedTokens.length} minted tokens`);
    return c.json({ 
      success: true, 
      data: sortedTokens,
      count: sortedTokens.length 
    });
  } catch (error) {
    console.error("❌ Error fetching minted tokens:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch minted tokens" 
    }, 500);
  }
});

// Get minted tokens for a specific user/wallet
app.get("/make-server-4b2f2838/minted-tokens/:walletAddress", async (c) => {
  try {
    const walletAddress = c.req.param("walletAddress");
    console.log(`🔍 Fetching minted tokens for wallet: ${walletAddress}`);
    
    const allTokens = await kv.getByPrefix("minted_token:");
    const userTokens = allTokens.filter(token => 
      token.walletAddress?.toLowerCase() === walletAddress.toLowerCase()
    );
    
    // Sort by mint date (newest first)
    const sortedTokens = userTokens.sort((a, b) => 
      new Date(b.mintDate).getTime() - new Date(a.mintDate).getTime()
    );
    
    console.log(`✅ Found ${sortedTokens.length} tokens for wallet ${walletAddress}`);
    return c.json({ 
      success: true, 
      data: sortedTokens,
      count: sortedTokens.length,
      walletAddress 
    });
  } catch (error) {
    console.error("❌ Error fetching user tokens:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch user tokens" 
    }, 500);
  }
});

// Store a new minted token
app.post("/make-server-4b2f2838/minted-tokens", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🔗 Storing new minted token:", body);
    
    // Validate required fields
    const requiredFields = ["submissionId", "tokenId", "projectName", "ngoName", "location", "carbonCredits", "walletAddress"];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      console.error("❌ Missing required fields:", missingFields);
      return c.json({ 
        success: false, 
        error: "Missing required fields",
        missingFields 
      }, 400);
    }
    
    // Create token record
    const tokenRecord = {
      id: `minted_token:${body.submissionId}:${Date.now()}`,
      submissionId: body.submissionId,
      tokenId: body.tokenId,
      projectName: body.projectName,
      ngoName: body.ngoName,
      location: body.location,
      carbonCredits: body.carbonCredits,
      tokenAmount: body.tokenAmount || "1",
      walletAddress: body.walletAddress,
      transactionHash: body.transactionHash || `0x${Math.random().toString(16).substring(2, 66)}`,
      mintDate: new Date().toISOString(),
      status: "minted",
      blockchainNetwork: body.blockchainNetwork || "polygon",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store in KV store
    await kv.set(tokenRecord.id, tokenRecord);
    
    // Also store a mapping for quick lookup by submission ID
    await kv.set(`submission_minted:${body.submissionId}`, {
      submissionId: body.submissionId,
      tokenId: tokenRecord.id,
      isMinted: true,
      mintDate: tokenRecord.mintDate
    });
    
    console.log(`✅ Successfully stored minted token: ${tokenRecord.tokenId}`);
    return c.json({ 
      success: true, 
      data: tokenRecord,
      message: "Token successfully minted and stored" 
    });
    
  } catch (error) {
    console.error("❌ Error storing minted token:", error);
    return c.json({ 
      success: false, 
      error: "Failed to store minted token" 
    }, 500);
  }
});

// ============================
// CARBON CREDITS MARKETPLACE
// ============================

// Get available carbon credits for purchase
app.get("/make-server-4b2f2838/carbon-credits/available", async (c) => {
  try {
    console.log("💳 Fetching available carbon credits");
    
    // Get approved submissions that haven't been fully purchased
    const submissions = await kv.getByPrefix("submission:");
    const approvedSubmissions = submissions.filter(sub => sub.status === 'approved');
    
    // Get purchase records to calculate remaining credits
    const purchases = await kv.getByPrefix("carbon_purchase:");
    
    const availableCredits = approvedSubmissions.map(submission => {
      // Calculate purchased credits for this submission
      const submissionPurchases = purchases.filter(p => p.submissionId === submission.id);
      const purchasedCredits = submissionPurchases.reduce((sum, p) => sum + p.creditAmount, 0);
      const remainingCredits = submission.estimatedCarbon - purchasedCredits;
      
      return {
        submissionId: submission.id,
        projectName: submission.name,
        ngoName: submission.ngoName,
        location: submission.location,
        totalCredits: submission.estimatedCarbon,
        purchasedCredits,
        remainingCredits,
        pricePerCredit: 25, // $25 per ton CO2
        totalValue: remainingCredits * 25,
        verificationDate: submission.approvedDate,
        images: submission.images || []
      };
    }).filter(credit => credit.remainingCredits > 0);
    
    console.log(`✅ Found ${availableCredits.length} available credit offerings`);
    return c.json({ 
      success: true, 
      data: availableCredits,
      count: availableCredits.length 
    });
    
  } catch (error) {
    console.error("❌ Error fetching available credits:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch available credits" 
    }, 500);
  }
});

// Purchase carbon credits
app.post("/make-server-4b2f2838/carbon-credits/purchase", async (c) => {
  try {
    const body = await c.req.json();
    console.log("💰 Processing carbon credit purchase:", body);
    
    const { submissionId, creditAmount, buyerWallet, buyerName, paymentMethod } = body;
    
    if (!submissionId || !creditAmount || !buyerWallet) {
      return c.json({ 
        success: false, 
        error: "Missing required fields" 
      }, 400);
    }
    
    // Verify submission exists and is approved
    const submission = await kv.get(submissionId);
    if (!submission || submission.status !== 'approved') {
      return c.json({ 
        success: false, 
        error: "Invalid or unapproved submission" 
      }, 400);
    }
    
    // Check available credits
    const purchases = await kv.getByPrefix("carbon_purchase:");
    const submissionPurchases = purchases.filter(p => p.submissionId === submissionId);
    const purchasedCredits = submissionPurchases.reduce((sum, p) => sum + p.creditAmount, 0);
    const remainingCredits = submission.estimatedCarbon - purchasedCredits;
    
    if (creditAmount > remainingCredits) {
      return c.json({ 
        success: false, 
        error: "Insufficient credits available",
        available: remainingCredits,
        requested: creditAmount 
      }, 400);
    }
    
    // Create purchase record
    const purchaseId = `carbon_purchase:${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const purchase = {
      id: purchaseId,
      submissionId,
      projectName: submission.name,
      ngoName: submission.ngoName,
      location: submission.location,
      creditAmount,
      pricePerCredit: 25,
      totalAmount: creditAmount * 25,
      buyerWallet,
      buyerName: buyerName || "Anonymous Buyer",
      paymentMethod: paymentMethod || "crypto",
      transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      purchaseDate: new Date().toISOString(),
      status: "completed",
      createdAt: new Date().toISOString()
    };
    
    await kv.set(purchaseId, purchase);
    
    // Update buyer's portfolio
    const buyerPortfolio = await kv.get(`buyer_portfolio:${buyerWallet}`) || {
      totalCredits: 0,
      totalSpent: 0,
      purchases: []
    };
    
    buyerPortfolio.totalCredits += creditAmount;
    buyerPortfolio.totalSpent += purchase.totalAmount;
    buyerPortfolio.purchases.push(purchaseId);
    
    await kv.set(`buyer_portfolio:${buyerWallet}`, buyerPortfolio);
    
    console.log(`✅ Carbon credit purchase completed: ${purchaseId}`);
    return c.json({ 
      success: true, 
      data: purchase,
      message: "Carbon credits purchased successfully" 
    });
    
  } catch (error) {
    console.error("❌ Error processing purchase:", error);
    return c.json({ 
      success: false, 
      error: "Failed to process purchase" 
    }, 500);
  }
});

// Get buyer portfolio
app.get("/make-server-4b2f2838/buyer-portfolio/:walletAddress", async (c) => {
  try {
    const walletAddress = c.req.param("walletAddress");
    console.log(`📊 Fetching buyer portfolio: ${walletAddress}`);
    
    const portfolio = await kv.get(`buyer_portfolio:${walletAddress}`) || {
      totalCredits: 0,
      totalSpent: 0,
      purchases: []
    };
    
    // Get detailed purchase information
    const purchaseDetails = [];
    for (const purchaseId of portfolio.purchases) {
      const purchase = await kv.get(purchaseId);
      if (purchase) {
        purchaseDetails.push(purchase);
      }
    }
    
    const detailedPortfolio = {
      ...portfolio,
      purchaseHistory: purchaseDetails.sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )
    };
    
    console.log(`✅ Portfolio retrieved for ${walletAddress}`);
    return c.json({ 
      success: true, 
      data: detailedPortfolio 
    });
    
  } catch (error) {
    console.error("❌ Error fetching buyer portfolio:", error);
    return c.json({ 
      success: false, 
      error: "Failed to fetch buyer portfolio" 
    }, 500);
  }
});

// ============================
// ANALYTICS & REPORTING
// ============================

// Get platform analytics
app.get("/make-server-4b2f2838/analytics/platform", async (c) => {
  try {
    console.log("📊 Generating platform analytics");
    
    // Get all data
    const submissions = await kv.getByPrefix("submission:");
    const tokens = await kv.getByPrefix("minted_token:");
    const purchases = await kv.getByPrefix("carbon_purchase:");
    const users = await kv.getByPrefix("user_profile:");
    
    // Calculate analytics
    const analytics = {
      // Submissions
      totalSubmissions: submissions.length,
      pendingSubmissions: submissions.filter(s => s.status === 'pending_review').length,
      approvedSubmissions: submissions.filter(s => s.status === 'approved').length,
      rejectedSubmissions: submissions.filter(s => s.status === 'rejected').length,
      
      // Carbon Credits
      totalCarbonCredits: submissions.reduce((sum, s) => sum + (s.estimatedCarbon || 0), 0),
      purchasedCredits: purchases.reduce((sum, p) => sum + (p.creditAmount || 0), 0),
      totalRevenue: purchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      
      // Tokens/NFTs
      totalTokensMinted: tokens.length,
      uniqueTokenHolders: new Set(tokens.map(t => t.walletAddress)).size,
      
      // Users
      totalUsers: users.length,
      ngoUsers: users.filter(u => u.userType === 'ngo').length,
      buyerUsers: users.filter(u => u.userType === 'investor').length,
      adminUsers: users.filter(u => u.userType === 'admin').length,
      
      // Geographic distribution
      projectsByLocation: submissions.reduce((acc, s) => {
        acc[s.location] = (acc[s.location] || 0) + 1;
        return acc;
      }, {}),
      
      // Monthly trends
      submissionsByMonth: submissions.reduce((acc, s) => {
        const month = new Date(s.submittedDate).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}),
      
      purchasesByMonth: purchases.reduce((acc, p) => {
        const month = new Date(p.purchaseDate).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + p.totalAmount;
        return acc;
      }, {}),
      
      lastUpdated: new Date().toISOString()
    };
    
    console.log("✅ Platform analytics generated");
    return c.json({ 
      success: true, 
      data: analytics 
    });
    
  } catch (error) {
    console.error("❌ Error generating analytics:", error);
    return c.json({ 
      success: false, 
      error: "Failed to generate analytics" 
    }, 500);
  }
});

// Get NGO performance analytics
app.get("/make-server-4b2f2838/analytics/ngo/:ngoId", async (c) => {
  try {
    const ngoId = c.req.param("ngoId");
    console.log(`📊 Generating NGO analytics for: ${ngoId}`);
    
    const submissions = await kv.getByPrefix("submission:");
    const ngoSubmissions = submissions.filter(s => s.ngoId === ngoId);
    const purchases = await kv.getByPrefix("carbon_purchase:");
    const ngoRelatedPurchases = purchases.filter(p => 
      ngoSubmissions.some(s => s.id === p.submissionId)
    );
    
    const analytics = {
      ngoId,
      totalSubmissions: ngoSubmissions.length,
      approvedSubmissions: ngoSubmissions.filter(s => s.status === 'approved').length,
      rejectedSubmissions: ngoSubmissions.filter(s => s.status === 'rejected').length,
      successRate: ngoSubmissions.length > 0 ? 
        (ngoSubmissions.filter(s => s.status === 'approved').length / ngoSubmissions.length * 100) : 0,
      totalCarbonCredits: ngoSubmissions.reduce((sum, s) => sum + (s.estimatedCarbon || 0), 0),
      creditsEarning: ngoRelatedPurchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0),
      averageProjectSize: ngoSubmissions.length > 0 ? 
        ngoSubmissions.reduce((sum, s) => sum + (s.estimatedCarbon || 0), 0) / ngoSubmissions.length : 0,
      projectsByLocation: ngoSubmissions.reduce((acc, s) => {
        acc[s.location] = (acc[s.location] || 0) + 1;
        return acc;
      }, {}),
      monthlySubmissions: ngoSubmissions.reduce((acc, s) => {
        const month = new Date(s.submittedDate).toISOString().substring(0, 7);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {}),
      lastUpdated: new Date().toISOString()
    };
    
    console.log(`✅ NGO analytics generated for ${ngoId}`);
    return c.json({ 
      success: true, 
      data: analytics 
    });
    
  } catch (error) {
    console.error("❌ Error generating NGO analytics:", error);
    return c.json({ 
      success: false, 
      error: "Failed to generate NGO analytics" 
    }, 500);
  }
});

// ============================
// SATELLITE & AI VERIFICATION
// ============================

// Submit AI verification results
app.post("/make-server-4b2f2838/verification/ai", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🤖 Processing AI verification:", body);
    
    const { submissionId, aiScore, verificationDetails } = body;
    
    // Get submission
    const submission = await kv.get(submissionId);
    if (!submission) {
      return c.json({ 
        success: false, 
        error: "Submission not found" 
      }, 404);
    }
    
    // Update submission with AI results
    const updatedSubmission = {
      ...submission,
      aiScore,
      aiVerificationDetails: verificationDetails,
      status: submission.status === 'pending_review' ? 'ai_verification' : submission.status,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(submissionId, updatedSubmission);
    
    // Store AI verification record
    const verificationId = `ai_verification:${submissionId}:${Date.now()}`;
    const verification = {
      id: verificationId,
      submissionId,
      type: 'ai',
      score: aiScore,
      details: verificationDetails,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(verificationId, verification);
    
    console.log(`✅ AI verification completed for ${submissionId}`);
    return c.json({ 
      success: true, 
      data: verification,
      message: "AI verification completed" 
    });
    
  } catch (error) {
    console.error("❌ Error processing AI verification:", error);
    return c.json({ 
      success: false, 
      error: "Failed to process AI verification" 
    }, 500);
  }
});

// Submit satellite verification results
app.post("/make-server-4b2f2838/verification/satellite", async (c) => {
  try {
    const body = await c.req.json();
    console.log("🛰️ Processing satellite verification:", body);
    
    const { submissionId, satelliteScore, ndviData, verificationDetails } = body;
    
    // Get submission
    const submission = await kv.get(submissionId);
    if (!submission) {
      return c.json({ 
        success: false, 
        error: "Submission not found" 
      }, 404);
    }
    
    // Update submission with satellite results
    const updatedSubmission = {
      ...submission,
      satelliteScore,
      ndviCurrent: ndviData?.current || submission.ndviCurrent,
      ndviBaseline: ndviData?.baseline || submission.ndviBaseline,
      ndviTarget: ndviData?.target || submission.ndviTarget,
      ndviTrend: ndviData?.trend || submission.ndviTrend,
      ndviChangeRate: ndviData?.changeRate || submission.ndviChangeRate,
      satelliteVerificationDetails: verificationDetails,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(submissionId, updatedSubmission);
    
    // Store satellite verification record
    const verificationId = `satellite_verification:${submissionId}:${Date.now()}`;
    const verification = {
      id: verificationId,
      submissionId,
      type: 'satellite',
      score: satelliteScore,
      ndviData,
      details: verificationDetails,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(verificationId, verification);
    
    console.log(`✅ Satellite verification completed for ${submissionId}`);
    return c.json({ 
      success: true, 
      data: verification,
      message: "Satellite verification completed" 
    });
    
  } catch (error) {
    console.error("❌ Error processing satellite verification:", error);
    return c.json({ 
      success: false, 
      error: "Failed to process satellite verification" 
    }, 500);
  }
});

// ============================
// FILE STORAGE ROUTES
// ============================

// Initialize storage bucket on startup
async function initializeStorage() {
  try {
    const bucketName = 'make-4b2f2838-coastly-storage';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.log(`🪣 Creating storage bucket: ${bucketName}`);
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        allowedMimeTypes: ['image/*', 'application/pdf']
      });
      if (error) {
        console.error('❌ Failed to create bucket:', error);
      } else {
        console.log(`✅ Storage bucket created: ${bucketName}`);
      }
    } else {
      console.log(`✅ Storage bucket exists: ${bucketName}`);
    }
  } catch (error) {
    console.error('❌ Error initializing storage:', error);
  }
}

// Upload file endpoint
app.post("/make-server-4b2f2838/upload", async (c) => {
  try {
    const bucketName = 'make-4b2f2838-coastly-storage';
    
    // Handle file upload logic here
    // Note: This is a placeholder - actual implementation would handle multipart form data
    console.log("📁 File upload request received");
    
    // Return mock response for now
    return c.json({
      success: true,
      message: "File upload endpoint ready",
      bucket: bucketName
    });
    
  } catch (error) {
    console.error("❌ File upload error:", error);
    return c.json({ 
      success: false, 
      error: "File upload failed" 
    }, 500);
  }
});

// ============================
// DATA SEEDING & INITIALIZATION
// ============================

// Import seeding functions
import { seedCoastlyData, checkDataExists } from "./seed_data.tsx";

// Initialize with sample data
app.post("/make-server-4b2f2838/initialize-data", async (c) => {
  try {
    console.log("🌱 Data initialization request received");
    
    const dataCheck = await checkDataExists();
    
    if (dataCheck.hasData) {
      console.log(`ℹ️ Data already exists: ${dataCheck.users} users, ${dataCheck.submissions} submissions, ${dataCheck.tokens} tokens`);
      return c.json({
        success: true,
        message: "Data already exists",
        data: dataCheck,
        action: "no_action_taken"
      });
    }
    
    await seedCoastlyData();
    
    const finalCheck = await checkDataExists();
    
    console.log("✅ Data initialization completed");
    return c.json({
      success: true,
      message: "Sample data initialized successfully",
      data: finalCheck,
      action: "data_seeded"
    });
    
  } catch (error) {
    console.error("❌ Data initialization failed:", error);
    return c.json({
      success: false,
      error: "Failed to initialize data",
      details: error.message
    }, 500);
  }
});

// Check current data status
app.get("/make-server-4b2f2838/data-status", async (c) => {
  try {
    const dataCheck = await checkDataExists();
    return c.json({
      success: true,
      data: dataCheck
    });
  } catch (error) {
    console.error("❌ Error checking data status:", error);
    return c.json({
      success: false,
      error: "Failed to check data status"
    }, 500);
  }
});

// Initialize storage on server start
initializeStorage();

console.log("🚀 Coastly Backend Server started successfully!");
console.log("📊 Available endpoints:");
console.log("   🔐 Authentication: /auth/register, /auth/login");
console.log("   🌱 Submissions: /submissions");
console.log("   🔗 Minted Tokens: /minted-tokens");
console.log("   💳 Carbon Credits: /carbon-credits/available, /carbon-credits/purchase");
console.log("   📊 Analytics: /analytics/platform, /analytics/ngo/:ngoId");
console.log("   🤖 Verification: /verification/ai, /verification/satellite");
console.log("   📁 Storage: /upload");
console.log("   🛠️ Utilities: /initialize-data, /data-status");

Deno.serve(app.fetch);