import React, { useState, useRef } from "react";
import { blocks } from "./face.content.json";
import { TextContent } from "@/components/ui/text-content";
import { FaceContentContainer } from "@/components/ui/face-content-container";
import { Icon } from "@/components/ui/icon";
import { motion, useInView } from "motion/react";

export default function ContactFace() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send form data to Web3Forms (delivers to Olivia's inbox)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0477d1fd-0851-410d-b0b9-167291724b76",
          subject: `New message from ABXY: ${formData.name}`,
          from_name: "ABXY Innovation website",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setSubmitStatus("success");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-color-1 text-white w-full" ref={ref}>
      <FaceContentContainer className="py-20 @4xl:py-32 px-4 @4xl:px-8 max-w-6xl">
        <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-16">
          
          {/* Left Side - Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="@4xl:col-span-5 flex flex-col justify-center"
          >
            <TextContent 
              content={blocks.sectionLabel.content} 
              className="font-mono text-xs text-white/60 tracking-widest uppercase mb-4" 
            />
            <TextContent 
              content={blocks.sectionTitle.content} 
              className="font-heading text-5xl @2xl:text-6xl font-bold leading-tight mb-6" 
            />
            <TextContent 
              content={blocks.sectionDesc.content} 
              className="text-lg text-white/80" 
            />
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="@4xl:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <TextContent 
                  content={blocks.namePlaceholder.content}
                  as="span"
                  className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2"
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div>
                <TextContent 
                  content={blocks.emailPlaceholder.content}
                  as="span"
                  className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder={blocks.messagePlaceholder.content}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full @sm:w-auto px-8 py-4 bg-white text-color-1 font-mono text-sm uppercase tracking-wider rounded-lg hover:bg-white/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TextContent content={blocks.submitButton.content} as="span" />
                {isSubmitting ? (
                  <Icon name="loader-2" size={18} className="animate-spin" />
                ) : (
                  <Icon name="send" size={18} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 text-sm text-white bg-red-500/20 px-4 py-3 rounded-lg border border-red-300/40">
                  <Icon name="alert-circle" size={18} />
                  <span>Something went wrong. Please email shenr20wlu@gmail.com directly.</span>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 text-sm text-white/80 bg-white/10 px-4 py-3 rounded-lg border border-white/20">
                  <Icon name="check-circle" size={18} />
                  <TextContent content={blocks.successMessage.content} as="span" />
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-32 pt-8 border-t border-white/10 text-center"
        >
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 font-mono text-xs uppercase tracking-widest">
            <a href="mailto:shenr20wlu@gmail.com" className="text-white/70 hover:text-white transition-colors py-2">Email</a>
            <a href="https://www.linkedin.com/in/ruofan-shen" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors py-2">LinkedIn</a>
            <a href="https://oliviashenrf.github.io/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors py-2">Founded by Olivia Shen</a>
          </nav>
          <TextContent 
            content={blocks.copyright.content} 
            className="text-xs text-white/40 font-mono" 
          />
        </motion.div>
      </FaceContentContainer>
    </div>
  );
}
