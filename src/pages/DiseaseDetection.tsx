import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Image, Loader2, AlertTriangle, CheckCircle2, XCircle, Sparkles, RefreshCw } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";

const DiseaseDetection = () => {
  const [stage, setStage] = useState<"upload" | "analyzing" | "results">("upload");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated detection results
  const results = {
    disease: "Leaf Spot Disease",
    confidence: 94,
    severity: "Moderate",
    plantType: "Monstera Deliciosa",
    symptoms: [
      "Brown circular spots on leaves",
      "Yellow halos around spots",
      "Leaves may drop prematurely",
    ],
    causes: [
      "Fungal infection (Cercospora)",
      "Overwatering",
      "Poor air circulation",
    ],
    treatment: [
      "Remove affected leaves immediately",
      "Apply copper-based fungicide",
      "Improve air circulation around plant",
      "Reduce watering frequency",
      "Avoid wetting leaves when watering",
    ],
  };

  const handleUpload = () => {
    setStage("analyzing");
    // Simulate AI analysis
    setTimeout(() => {
      setStage("results");
    }, 3000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload();
  };

  const resetDetection = () => {
    setStage("upload");
  };

  return (
    <div className="min-h-screen pb-10">
      <AnimatedBackground />
      <Header showBack title="Disease Detection" />

      <main className="container px-4 pt-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-space text-3xl font-bold text-foreground mb-2">
            AI <span className="gradient-text">Disease Detection</span>
          </h1>
          <p className="text-muted-foreground">
            Upload a photo of your plant to diagnose diseases and get treatment recommendations
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Upload Stage */}
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                  relative rounded-3xl border-2 border-dashed p-10 text-center
                  transition-all duration-300 cursor-pointer
                  ${dragActive 
                    ? "border-primary bg-primary/10 shadow-glow-md" 
                    : "border-glass-border hover:border-primary/50 hover:bg-muted/20"
                  }
                `}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Upload className="h-10 w-10 text-primary" />
                </motion.div>

                <h3 className="font-space text-xl font-semibold text-foreground mb-2">
                  Drop your plant photo here
                </h3>
                <p className="text-muted-foreground mb-4">
                  or click to browse files
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPG, PNG, HEIC • Max size: 10MB
                </p>
              </div>

              {/* Alternative Options */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  className="glass-card p-6 text-center hover:border-primary/50 transition-all"
                >
                  <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
                  <span className="font-medium text-foreground">Take Photo</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  className="glass-card p-6 text-center hover:border-secondary/50 transition-all"
                >
                  <Image className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <span className="font-medium text-foreground">From Gallery</span>
                </motion.button>
              </div>

              {/* Tips */}
              <div className="glass-card p-6">
                <h4 className="font-space font-semibold text-foreground mb-3">
                  Tips for best results
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Take clear, well-lit photos of affected areas
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Include both healthy and affected parts for comparison
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Avoid blurry or dark images
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Analyzing Stage */}
          {stage === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-10 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <Loader2 className="h-10 w-10 text-primary" />
              </motion.div>

              <h3 className="font-space text-2xl font-bold text-foreground mb-2">
                Analyzing Your Plant
              </h3>
              <p className="text-muted-foreground mb-6">
                Our AI is examining the image for potential issues...
              </p>

              <div className="max-w-xs mx-auto">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Stage */}
          {stage === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Detection Result Header */}
              <div className="glass-card p-6 border-l-4 border-l-primary">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-destructive/10">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h2 className="font-space text-xl font-bold text-foreground">
                        {results.disease}
                      </h2>
                      <p className="text-muted-foreground">Detected on {results.plantType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">{results.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                    {results.severity} Severity
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Detected 3 key indicators
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div className="glass-card p-6">
                <h3 className="font-space text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Symptoms Identified
                </h3>
                <ul className="space-y-3">
                  {results.symptoms.map((symptom, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      {symptom}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Treatment */}
              <div className="glass-card p-6 border border-primary/30">
                <h3 className="font-space text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Recommended Treatment
                </h3>
                <ol className="space-y-3">
                  {results.treatment.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-foreground">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetDetection}
                  className="flex-1 btn-glass flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Scan Another
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 btn-neon flex items-center justify-center gap-2"
                >
                  Save Report
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default DiseaseDetection;
