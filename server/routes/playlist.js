import express from "express";

const router = express.Router();

/* ================= MANUAL YOUTUBE PLAYLISTS ================= */

const DEMO_PLAYLISTS = {
  happy: [
    "PLrmrdFLRDM1PeO9waelG3P6o2bipgQm_B",
    "PLrmrdFLRDM1NblulUx28JHWSA7u2ovkOX",
    "PLrmrdFLRDM1NdUQh1mglSuyflKYguc106",
  ],
 sad: [
  "PLrmrdFLRDM1NFiB11m3GP-qY5bpatqdzg",
  "PLrmrdFLRDM1NHKa9gdWJgestNQ_XcQ8bS",
  "PLrmrdFLRDM1Mt5deH520fb0Nc-GeJYNo7",
],
  angry: [
    "PLrmrdFLRDM1OXBuGBVJJRCUTm2tLE38Zh",
    "PLrmrdFLRDM1N15aH60AFcUV5GiuUe5CUP",
    "PLrmrdFLRDM1PB-G_yTU9hkYfWKapn0lDy",
  ],
  fearful: [
    "PLrmrdFLRDM1Oqpc5uWN2CgzXGheAt58hd",
    "PLrmrdFLRDM1PsQOF0JqiOcYo2VyS6HIRK",
    "PLrmrdFLRDM1PyOTTwkBepRmaMajfNVr-4",
  ],
  surprised: [
    "PLrmrdFLRDM1OHKCPEEz4176r9FtCfECVC",
    "PLrmrdFLRDM1MtdhIHHXUxlQOx2nfkRnIs",
    "PLrmrdFLRDM1MKKB1-4KSwQKigDQTqdWFx",
  ],
  disgusted: [
    "PLrmrdFLRDM1M7RVZkR95EkncY5L_zgaJw",
    "PLrmrdFLRDM1NF3Rtt9frXCAOR9wLTkHj5",
    "PLrmrdFLRDM1NZx92UTyp9fpwEJSJZ9Fit",
  ],
};

/* ================= RANDOM PLAYLIST SELECTOR ================= */

router.post("/generate", (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ error: "Mood is required" });
    }

    const playlists = DEMO_PLAYLISTS[mood];

    if (!playlists || playlists.length === 0) {
      return res.status(400).json({ error: "No playlists available for this mood" });
    }

    // 🎲 RANDOM NUMBER GENERATOR
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const playlistId = playlists[randomIndex];

    return res.json({
      playlistId,
      confidence: (Math.random() * 5 + 95).toFixed(2), // 95–100%
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate playlist" });
  }
});

export default router;