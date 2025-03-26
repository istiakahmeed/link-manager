"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LinkIcon,
  BookmarkIcon,
  TagIcon,
  SearchIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  SparklesIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

interface HomeContentProps {
  session: Session | null;
}

export default function HomeContent({ session }: HomeContentProps) {
  // Define firefly color palettes for each theme
  const darkModeColors = [
    "rgba(140, 140, 255, 0.25)", // Blue
    "rgba(170, 120, 255, 0.25)", // Purple
    "rgba(255, 130, 200, 0.25)", // Pink
    "rgba(120, 220, 255, 0.25)", // Light blue
    "rgba(130, 255, 180, 0.25)", // Teal
  ];

  const lightModeColors = [
    "rgba(30, 100, 255, 0.15)", // Blue
    "rgba(100, 50, 255, 0.15)", // Purple
    "rgba(255, 30, 120, 0.15)", // Pink
    "rgba(30, 150, 255, 0.15)", // Light blue
    "rgba(30, 200, 130, 0.15)", // Teal
  ];

  // Handle theme for dot pattern color
  const { resolvedTheme } = useTheme();
  const [dotColor, setDotColor] = useState("rgba(255, 255, 255, 0.8)");
  const [glowColor, setGlowColor] = useState("rgba(255, 255, 255, 0.1)");

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    setDotColor(isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)");
    // Set default glow color
    setGlowColor(
      isDark
        ? "rgba(140, 140, 255, 0.25)" // More vibrant blue-ish glow for dark mode
        : "rgba(30, 100, 255, 0.15)" // Stronger blue glow for light mode
    );
  }, [resolvedTheme]);

  // Pre-generate fixed positions for fireflies with color indexes
  const fireflyPositions = useMemo(() => {
    return Array(20)
      .fill(0)
      .map((_, i) => ({
        size: 3 + (i % 5) + Math.floor(i / 10) * 2,
        left: 5 + i * 4 + (i % 7) * 3,
        top: 10 + ((i * 5) % 80) + Math.floor(i / 4) * 8,
        delay: (i * 0.2) % 3,
        duration: 4 + (i % 5),
        glowSize: 5 + (i % 4) * 2,
        colorIndex: i % 5, // Add color index for variety
      }));
  }, []);

  // Also pre-generate feature firefly positions with colors
  const featureFireflyPositions = useMemo(() => {
    return Array(8)
      .fill(0)
      .map((_, i) => ({
        size: 2 + (i % 4),
        left: 10 + i * 10,
        top: 15 + ((i * 8) % 70),
        delay: (i * 0.3) % 2,
        duration: 6 + (i % 3) * 2,
        glowSize: 3 + (i % 3) * 2,
        colorIndex: i % 5, // Add color index
      }));
  }, []);

  // Pre-generate CTA firefly positions with colors
  const ctaFireflyPositions = useMemo(() => {
    return Array(5)
      .fill(0)
      .map((_, i) => ({
        size: 3 + (i % 3) * 2,
        left: 15 + i * 15,
        top: 20 + ((i * 12) % 60),
        delay: (i * 0.4) % 2.5,
        duration: 5 + (i % 4) * 1.5,
        glowSize: 4 + (i % 3) * 3,
        colorIndex: i % 5, // Add color index
      }));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Simplified dot pattern animation variants
  const dotPatternVariants = {
    initial: {
      opacity: 0,
      backgroundPosition: "0px 0px",
    },
    animate: {
      opacity: 0.25,
      backgroundPosition: ["0px 0px", "20px 20px"],
      transition: {
        opacity: { duration: 1 },
        backgroundPosition: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "linear",
        },
      },
    },
  };

  // Different animation variants for each section
  const featuresDotVariants = {
    initial: {
      opacity: 0,
      backgroundPosition: "0px 0px",
    },
    animate: {
      opacity: 0.1,
      backgroundPosition: ["0px 0px", "-30px 15px"],
      transition: {
        opacity: { duration: 1 },
        backgroundPosition: {
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };

  const ctaDotVariants = {
    initial: {
      opacity: 0,
      backgroundPosition: "0px 0px",
    },
    animate: {
      opacity: 0.15,
      backgroundPosition: ["0px 0px", "24px -12px"],
      transition: {
        opacity: { duration: 1 },
        backgroundPosition: {
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };

  // Simplified firefly animation
  const fireflyAnimation = {
    opacity: [0.2, 0.7, 0.4, 0.8, 0.2],
    scale: [0.8, 1.2, 1, 1.1, 0.9],
  };

  // Rainbow glow animation for feature icons
  const featureIconColors = [
    "var(--primary)",
    "rgba(130, 80, 255, 1)",
    "rgba(255, 100, 150, 1)",
    "rgba(80, 180, 255, 1)",
    "var(--primary)",
  ];

  const featureIconGlowAnimation = {
    boxShadow: [
      "0 0 0px 0px var(--primary)",
      `0 0 10px 2px ${featureIconColors[1]}`,
      `0 0 8px 1px ${featureIconColors[2]}`,
      `0 0 12px 2px ${featureIconColors[3]}`,
      "0 0 0px 0px var(--primary)",
    ],
  };

  const features = [
    {
      icon: <LinkIcon className='h-8 w-8 text-primary' />,
      title: "Save Links",
      description:
        "Quickly save and organize links from around the web with a single click",
    },
    {
      icon: <TagIcon className='h-8 w-8 text-primary' />,
      title: "Tag & Categorize",
      description:
        "Create custom tags and categories for easy organization and retrieval",
    },
    {
      icon: <SearchIcon className='h-8 w-8 text-primary' />,
      title: "Search & Filter",
      description:
        "Find exactly what you need with powerful search and filtering options",
    },
    {
      icon: <BookmarkIcon className='h-8 w-8 text-primary' />,
      title: "Access Anywhere",
      description:
        "Your links are available on any device, anytime you need them",
    },
  ];

  return (
    <div className='flex flex-col min-h-[calc(100vh-4rem)]'>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='relative w-full py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden'>
          {/* Glowing background effect */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10' />

          {/* Animated dot pattern for hero section with glow */}
          <motion.div
            className='absolute inset-0 -z-10'
            style={{
              backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              boxShadow: `inset 0 0 50px ${glowColor}`,
            }}
            variants={dotPatternVariants}
            initial='initial'
            animate='animate'
          />

          {/* Multi-colored firefly-like animated dots */}
          <div className='absolute inset-0 -z-5 overflow-hidden pointer-events-none'>
            {fireflyPositions.map((position, i) => (
              <motion.div
                key={`firefly-${i}`}
                className='absolute rounded-full'
                style={{
                  backgroundColor: "transparent",
                  boxShadow: `0 0 ${position.glowSize}px ${Math.min(
                    3,
                    Math.max(1, position.glowSize / 2)
                  )}px ${
                    resolvedTheme === "dark"
                      ? darkModeColors[position.colorIndex]
                      : lightModeColors[position.colorIndex]
                  }`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={fireflyAnimation}
                transition={{
                  duration: position.duration,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
                  delay: position.delay,
                  times: [0, 0.25, 0.5, 0.75, 1],
                }}
              />
            ))}
          </div>

          {/* Simplified floating dots effect */}
          <div className='absolute inset-0 -z-5 overflow-hidden'>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute rounded-full'
                style={{
                  backgroundColor: dotColor,
                  width: 3 + (i % 3) + "px",
                  height: 3 + (i % 3) + "px",
                  left: 10 + i * 10 + "%",
                  top: 20 + ((i * 8) % 60) + "%",
                  opacity: 0.3,
                }}
                animate={{
                  y: [0, -30],
                  x: [0, i % 2 === 0 ? 15 : -15],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Top right decorative element */}
          <motion.div
            className='absolute top-10 right-10 text-primary/20 hidden lg:block'
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <SparklesIcon className='w-24 h-24' />
          </motion.div>

          {/* Top left decorative element */}
          <motion.div
            className='absolute top-20 left-10 text-primary/15 hidden lg:block'
            initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <StarIcon className='w-16 h-16' />
          </motion.div>

          <div className='container px-4 md:px-6 mx-auto'>
            <motion.div
              className='flex flex-col items-center justify-center text-center max-w-3xl mx-auto'
              variants={container}
              initial='hidden'
              animate='show'
            >
              <motion.div variants={item} className='space-y-5'>
                <div className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-2 backdrop-blur-sm'>
                  <SparklesIcon className='mr-1 h-3.5 w-3.5' />
                  <span>Organize your digital life</span>
                </div>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Manage Your Links{" "}
                  <span className='text-primary relative'>
                    in One Place
                    <motion.span
                      className='absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30 rounded-full'
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    />
                  </span>
                </h1>
                <p className='text-muted-foreground max-w-[700px] mx-auto md:text-xl'>
                  Save, organize, and access your important links from anywhere.
                  Never lose a valuable resource again.
                </p>
              </motion.div>

              <motion.div
                variants={item}
                className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md mx-auto'
              >
                {session ? (
                  <Link href='/dashboard' className='w-full sm:w-auto'>
                    <Button
                      size='lg'
                      className='w-full sm:w-auto h-12 px-8 rounded-full group relative overflow-hidden'
                    >
                      <div className='absolute inset-0 bg-primary/10 w-full translate-x-full group-hover:translate-x-0 transition-transform duration-300'></div>
                      <span className='relative flex items-center'>
                        Go to Dashboard
                        <ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href='/api/auth/signin' className='w-full sm:w-auto'>
                    <Button
                      size='lg'
                      className='w-full sm:w-auto h-12 px-8 rounded-full group relative overflow-hidden'
                    >
                      <div className='absolute inset-0 bg-primary/10 w-full translate-x-full group-hover:translate-x-0 transition-transform duration-300'></div>
                      <span className='relative flex items-center'>
                        Get Started
                        <ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                      </span>
                    </Button>
                  </Link>
                )}
                <Link
                  href='#features'
                  className='w-full sm:w-auto cursor-pointer z-50'
                >
                  <Button
                    variant='outline'
                    size='lg'
                    className='w-full sm:w-auto h-12 px-8 rounded-full cursor-pointer'
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={item}
                className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-8'
              >
                <div className='flex items-center'>
                  <CheckCircle2Icon className='mr-1.5 h-4 w-4 text-primary' />
                  <span>Free to use</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle2Icon className='mr-1.5 h-4 w-4 text-primary' />
                  <span>Easy setup</span>
                </div>
                <div className='flex items-center'>
                  <CheckCircle2Icon className='mr-1.5 h-4 w-4 text-primary' />
                  <span>No credit card</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id='features'
          className='w-full py-16 md:py-24 bg-muted relative'
        >
          {/* Animated dot pattern for features section with subtle glow */}
          <motion.div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
              boxShadow: `inset 0 0 70px ${glowColor}`,
            }}
            variants={featuresDotVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: false }}
          />

          {/* Multi-colored feature section fireflies */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {featureFireflyPositions.map((position, i) => (
              <motion.div
                key={`feature-firefly-${i}`}
                className='absolute rounded-full'
                style={{
                  backgroundColor: "transparent",
                  boxShadow: `0 0 ${position.glowSize}px ${Math.min(
                    3,
                    Math.max(1, position.glowSize / 2)
                  )}px ${
                    resolvedTheme === "dark"
                      ? darkModeColors[position.colorIndex]
                      : lightModeColors[position.colorIndex]
                  }`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: position.duration,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                  ease: "easeInOut",
                  delay: position.delay,
                }}
              />
            ))}
          </div>

          <div className='container px-4 md:px-6 mx-auto relative'>
            <motion.div
              className='text-center mb-12'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4 backdrop-blur-sm'>
                <ZapIcon className='mr-1 h-3.5 w-3.5' />
                <span>Key Features</span>
              </div>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4'>
                Everything You Need
              </h2>
              <p className='text-lg text-muted-foreground max-w-[700px] mx-auto'>
                Our platform provides all the tools you need to organize your
                online resources effectively
              </p>
            </motion.div>

            <motion.div
              className='grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto'
              variants={container}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className='flex flex-col h-full items-center text-center rounded-xl border bg-background/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md hover:border-primary/50'
                  variants={item}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 10px 25px -5px ${glowColor}`,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  <motion.div
                    className='p-3 bg-primary/10 rounded-full mb-4 relative overflow-hidden'
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Add inner pulsing effect */}
                    <motion.div
                      className='absolute inset-0 rounded-full'
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        backgroundColor: "var(--primary)",
                        opacity: 0.1,
                      }}
                    />
                    {/* Add rainbow glow effect */}
                    <motion.div
                      className='absolute inset-0 rounded-full'
                      animate={featureIconGlowAnimation}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                        times: [0, 0.25, 0.5, 0.75, 1],
                      }}
                    />
                    {feature.icon}
                  </motion.div>
                  <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
                  <p className='text-muted-foreground flex-grow'>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='w-full py-16 md:py-24 bg-gradient-to-b from-background to-primary/5 relative'>
          {/* Animated dot pattern for CTA section with glow */}
          <motion.div
            className='absolute inset-0'
            style={{
              backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
              boxShadow: `inset 0 0 60px ${glowColor}`,
            }}
            variants={ctaDotVariants}
            initial='initial'
            whileInView='animate'
            viewport={{ once: false }}
          />

          {/* Multi-colored CTA section fireflies */}
          <div className='absolute inset-0 overflow-hidden pointer-events-none'>
            {ctaFireflyPositions.map((position, i) => (
              <motion.div
                key={`cta-firefly-${i}`}
                className='absolute rounded-full'
                style={{
                  backgroundColor: "transparent",
                  boxShadow: `0 0 ${position.glowSize}px ${Math.min(
                    3,
                    Math.max(1, position.glowSize / 2)
                  )}px ${
                    resolvedTheme === "dark"
                      ? darkModeColors[position.colorIndex]
                      : lightModeColors[position.colorIndex]
                  }`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.9, 1.2, 0.9],
                }}
                transition={{
                  duration: position.duration,
                  repeat: Infinity,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
                  delay: position.delay,
                }}
              />
            ))}
          </div>

          <div className='container px-4 md:px-6 mx-auto relative'>
            <motion.div
              className='flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-2 backdrop-blur-sm'>
                <ZapIcon className='mr-1 h-3.5 w-3.5' />
                <span>Get Started Today</span>
              </div>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Ready to organize your digital life?
              </h2>
              <p className='text-muted-foreground max-w-[600px] md:text-lg'>
                Join thousands of users who have transformed how they manage
                online resources. Start saving and organizing your links now.
              </p>
              <motion.div
                className='mt-6'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {session ? (
                  <Link href='/dashboard'>
                    <Button
                      size='lg'
                      className='h-12 px-8 rounded-full group relative overflow-hidden'
                    >
                      <motion.div
                        className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100'
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className='relative z-10 flex items-center'>
                        Go to Dashboard
                        <ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <Link href='/api/auth/signin'>
                    <Button
                      size='lg'
                      className='h-12 px-8 rounded-full group relative overflow-hidden'
                    >
                      <motion.div
                        className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100'
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className='relative z-10 flex items-center'>
                        Sign Up for Free
                        <ArrowRightIcon className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                      </span>
                    </Button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <motion.footer
        className='w-full py-8 border-t'
        variants={fadeIn}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      >
        <div className='container px-4 md:px-6 mx-auto'>
          <div className='flex flex-col items-center text-center space-y-6'>
            <div className='max-w-md'>
              <h3 className='text-lg font-semibold mb-3'>
                Personal Link Manager
              </h3>
              <p className='text-sm text-muted-foreground'>
                Your complete solution for organizing digital resources.
              </p>
            </div>

            <div className='flex flex-wrap justify-center gap-x-6 gap-y-3'>
              <Link
                href='#features'
                className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center'
              >
                Features
              </Link>
              <Link
                href='/privacy'
                className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center'
              >
                Privacy
              </Link>
              <Link
                href='/terms'
                className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center'
              >
                Terms
              </Link>
              <Link
                href='/contact'
                className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center'
              >
                Contact <ExternalLinkIcon className='ml-1 h-3 w-3' />
              </Link>
            </div>

            <div>
              <p className='text-sm text-muted-foreground'>
                © {new Date().getFullYear()} Personal Link Manager. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
