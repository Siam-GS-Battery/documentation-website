import React, { useState, useEffect } from 'react'
import { useHistory } from '@docusaurus/router'
import { Link } from 'react-router-dom'
import Layout from '@theme/Layout'
import styles from './Project.module.css'
import memberbow from '../assets/memberbow.jpg'
import membertoi from '../assets/membertoi.jpg'
import memberduay from '../assets/memberduay.jpg'
import membernew from '../assets/membernew.jpg'
import memberjune from '../assets/memberjune.jpg'
import memberptum from '../assets/memberptum.jpg'
import memberMew from '../assets/membermew.png'
import memberfah from '../assets/memberfah.png'
import memberboss from '../assets/memberboss.png'
import Home1 from '../assets/Home1.jpg'
import Home2 from '../assets/Home2.jpg'
import Home3 from '../assets/Home3.jpg'
import projectData from '../data/documents.json'

// Image preloader component
const ImagePreloader = ({ images, onLoadComplete }) => {
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.crossOrigin = 'anonymous'
        img.src = src
      })
    }
  

    const preloadImages = async () => {
      try {
        // Load images with priority - first image first
        const imagePromises = images.map((img, index) => 
          loadImage(img.image).then(src => ({ src, priority: index === 0 }))
        )
        
        const results = await Promise.allSettled(imagePromises)
        const successfulLoads = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value.src)
        
        setLoadedImages(new Set(successfulLoads))
        setIsLoading(false)
        onLoadComplete && onLoadComplete()
      } catch (error) {
        console.warn('Some images failed to preload:', error)
        setIsLoading(false)
        onLoadComplete && onLoadComplete()
      }
    }

    preloadImages()
  }, [images, onLoadComplete])

  return null
}

// Fallback image component
const FallbackImage = ({ src, alt, className, fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTE2LjU2OSA3MCAxMzAgODMuNDMxIDEzMCAxMDBDMTMwIDExNi41NjkgMTE2LjU2OSAxMzAgMTAwIDEzMEM4My40MzEgMTMwIDcwIDExNi41NjkgNzAgMTAwQzcwIDgzLjQzMSA4My40MzEgNzAgMTAwIDcwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K' }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      decoding="async"
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    />
  )
}

// Counter Animation Component
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const checkIfVisible = () => {
      const summarySection = document.getElementById('summary-outcomes')
      if (summarySection && summarySection.classList.contains('counter-triggered') && !hasStarted) {
        setHasStarted(true)
        startAnimation()
      }
    }

    const startAnimation = () => {
      let startTime
      let animationFrame

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(target * easeOutQuart)
        
        setCount(currentCount)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          // Animation completed - trigger success animation
          setIsComplete(true)
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    // Check immediately and set up interval
    checkIfVisible()
    const interval = setInterval(checkIfVisible, 100)

    return () => {
      clearInterval(interval)
    }
  }, [target, duration, hasStarted])

  return (
    <div className="relative inline-block">
      <span className={`inline-block transition-all duration-700 ${
        isComplete 
          ? 'text-blue-700 scale-110' 
          : 'text-blue-700'
      }`}>
        {count}{suffix}
      </span>
      {isComplete && (
        <>
          {/* Firework particles */}
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-yellow-400 rounded-full firework-particle"></div>
          <div className="absolute -top-2 -right-1 w-1 h-1 bg-pink-400 rounded-full firework-particle" style={{animationDelay: '0.1s'}}></div>
          <div className="absolute -bottom-1 -left-2 w-1 h-1 bg-blue-400 rounded-full firework-particle" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-purple-400 rounded-full firework-particle" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute -top-3 left-0 w-1 h-1 bg-orange-400 rounded-full firework-particle" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute -bottom-3 right-0 w-1 h-1 bg-red-400 rounded-full firework-particle" style={{animationDelay: '0.5s'}}></div>
        </>
      )}
    </div>
  )
}

const slides = [
  {
    image: Home1,
    alt: 'Slide 1',
  },
  {
    image: Home2,
    alt: 'Slide 2',
  },
  {
    image: Home3,
    alt: 'Slide 3',
  },
]

// Use data from JSON file for projects
const projects = [
  // Projects from JSON file
  ...(projectData.projects || []).map(project => ({
    id: project.id,
    title: project.title,
    description: project.sections?.challenge ? project.sections.challenge.substring(0, 150) + '...' : 'No description available',
    image: project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    categories: project.category || [],
    division: project.division || 'it-data',
    team: project.department || 'IT Department',
  })),
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showHero, setShowHero] = useState(false)
  const history = useHistory()

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Preload images on component mount
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach(slide => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = slide.image
        document.head.appendChild(link)
      })
    }

    preloadImages()
  }, [])

  // Cache images in browser cache
  useEffect(() => {
    const cacheImages = () => {
      const allImages = [
        ...slides.map(slide => slide.image),
        ...projectData.projects.slice(0, 3).map(project => project.image),
        memberMew, memberbow, membertoi, memberduay, membernew, memberjune, memberptum
      ].filter(Boolean)

      allImages.forEach(src => {
        const img = new Image()
        img.src = src
      })
    }

    cacheImages()
  }, [])

  // Optimize image loading performance
  useEffect(() => {
    // Set image loading priority
    const setImagePriority = () => {
      const heroImages = document.querySelectorAll('.hero-slide')
      heroImages.forEach((img, index) => {
        if (index === 0) {
          img.setAttribute('fetchpriority', 'high')
        } else {
          img.setAttribute('fetchpriority', 'low')
        }
      })
    }

    if (showHero) {
      setImagePriority()
    }
  }, [showHero])

  // Handle image loading completion
  const handleImagesLoaded = () => {
    setImagesLoaded(true)
    setShowHero(true)
  }

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Counter animation trigger
  useEffect(() => {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger counter animation by adding a class
            entry.target.classList.add('counter-triggered')
          }
        })
      },
      { threshold: 0.3 }
    )

    const summarySection = document.getElementById('summary-outcomes')
    if (summarySection) {
      counterObserver.observe(summarySection)
    }

    return () => counterObserver.disconnect()
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <Layout
      title="Home"
      description="IT & Data Management Portal Homepage">
      {/* Image Preloader */}
      <ImagePreloader images={slides} onLoadComplete={handleImagesLoaded} />
      
      {/* Loading State - Full Width */}
      {!imagesLoaded && (
        <section className="relative w-screen h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-20 2xl:-mx-24" style={{marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw'}}>
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
          </div>
        </section>
      )}

      {/* Hero Section - Full Width */}
      <section className={`relative w-screen h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] 2xl:h-[90vh] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${showHero ? 'opacity-100' : 'opacity-0'} -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-20 2xl:-mx-24`} style={{marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw'}}>
        {/* Slides */}
        {slides.map((slide, idx) => (
          <FallbackImage
            key={slide.alt}
            src={slide.image}
            alt={slide.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover blur-sm transition-opacity duration-700 hero-slide ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-20" />
        {/* Text */}
        <div className={`relative z-30 flex flex-col items-center justify-center w-full h-full text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-2 sm:mb-4 md:mb-6 drop-shadow-lg animate-pulse leading-tight">
            Welcome to IT & Data Management
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto drop-shadow-md animate-pulse px-2 leading-relaxed">
            Explore our documentation, projects, and team members
          </p>
          {/* Floating elements - responsive visibility */}
          <div className="hidden md:block absolute top-10 left-10 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0s' }}></div>
          <div className="hidden md:block absolute top-20 right-20 w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-green-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
          <div className="hidden md:block absolute bottom-20 left-20 w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-yellow-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1s' }}></div>
          <div className="hidden lg:block absolute top-32 right-12 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
          <div className="hidden lg:block absolute bottom-32 right-32 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
        </div>
        {/* Navigation Arrows - Responsive */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12 2xl:left-16 top-1/2 -translate-y-1/2 z-40 bg-white/60 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 2xl:right-16 top-1/2 -translate-y-1/2 z-40 bg-white/60 hover:bg-white text-gray-800 rounded-full p-1.5 sm:p-2 md:p-3 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        {/* Slide indicators - Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 xl:bottom-16 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2 sm:space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 backdrop-blur-sm ${idx === current ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/75'}`}
            />
          ))}
        </div>
      </section>

      {/* SUMMARY OUTCOMES */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white scroll-animate" id="summary-outcomes">
        <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mt-4 sm:mt-8 md:mt-12 lg:mt-16 mb-2 sm:mb-3 md:mb-4 hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-tight">
            Summary Outcomes
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 md:mb-10 hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 md:px-6 leading-relaxed">
            Key achievements and metrics from our projects
          </p>
          <Link to="/project" className="inline-block bg-blue-600 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 rounded-md font-medium shadow hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-sm sm:text-base md:text-lg no-underline hover:no-underline">
            View More
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-16 md:mb-20 lg:mb-24">
            {[
              { number: 10, label: 'Total Projects' },
              { number: 5, label: 'Cost Saving (M)' },
              { number: 5, label: 'Time Saving (M)' }
            ].map((item, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer p-4 sm:p-6 md:p-8 rounded-lg hover:bg-gray-50">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-blue-700 mb-2 sm:mb-3 md:mb-4 group-hover:text-blue-800 transition-colors duration-300">
                  <AnimatedCounter target={item.number} duration={2500} />
                </div>
                <div className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project & Activities - Using Project Cards Grid from Project.js */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gray-50 scroll-animate">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="flex justify-between items-start mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <div className="flex-1 mr-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-tight mb-2 sm:mb-3">
                  Projects & Activities
                </h2>
              </div>
              <a href="/project" className="text-blue-600 hover:underline text-base sm:text-lg md:text-xl font-medium hover:text-blue-800 transition-colors duration-300 whitespace-nowrap flex-shrink-0 self-start">
                Read More &rarr;
              </a>
            </div>
          </div>
          
          {/* Project Cards Grid from Project.js */}
          <div className={styles.projectCards}>
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                data-category={project.categories ? project.categories.join(',') : ''}
                className={styles.projectCard}
              >
                {/* Project Image */}
                <div className={styles.projectImage}>
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </div>

                {/* Project Content */}
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  {/* Read More Link */}
                  <Link
                    to={`/project-detail?id=${project.id}`}
                    className={styles.readMoreLink}
                  >
                    Read More
                    <svg className={styles.readMoreIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                {/* Blue Bar */}
                <div className={styles.projectBar}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT TEAM */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-white scroll-animate">
        <div className="max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto text-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 hover:text-blue-600 transition-colors duration-300 cursor-pointer leading-tight">
            IT Team
          </h2>
          <p className="text-gray-500 mb-8 sm:mb-12 md:mb-16 lg:mb-20 hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-4 leading-relaxed">
            Meet our dedicated team of IT professionals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center">
            {[
              {
                id: 1,
                name: 'Thanakorn Chollavorn',
                position: 'Asst.General Manager of Information Technology & Data Management',
                image: memberptum
              },
              {
                id: 2,
                name: 'Sahachol Suwanichsuksan',
                position: 'Senior Chief of IT Development',
                image: membertoi
              },
              {
                id: 3,
                name: 'Haripong Dokput',
                position: 'Chief of IT Management',
                image: memberduay
              },
              {
                id: 4,
                name: 'Phongsaton Viangkam',
                position: 'Sr.Officer IT',
                image: membernew
              },
              {
                id: 5,
                name: 'Nisarat Hawharn',
                position: 'Data Strategy Operation',
                image: memberbow
              },
              {
                id: 6,
                name: 'Thitison Chedkai',
                position: 'Information Technology Officer',
                image: memberjune
              },
              {
                id: 7,
                name: 'Ratchanok Rachramthong',
                position: 'Project Management Officer',
                image: memberMew
              },
              {
                id: 8,
                name: 'Pantira Sripimmeang',
                position: 'Software Engineer',
                image: memberfah
              },
              {
                id: 9,
                name: 'Burased Baworncharoenpun',
                position: 'AI Engineer',
                image: memberboss
              },
            ].map((member) => (
              <div key={member.id} className="flex flex-col items-center group hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-xs">
                <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3 md:mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <FallbackImage 
                    src={member.image} 
                    alt={member.name} 
                    className="w-56 h-72 sm:w-60 sm:h-76 md:w-64 md:h-80 lg:w-68 lg:h-84 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="font-medium text-gray-800 text-center mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-6 md:mb-8 group-hover:text-blue-600 transition-colors duration-300 px-2">
                  <div className="font-bold text-sm sm:text-base md:text-lg leading-tight mb-1 sm:mb-2">{member.name}</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-500 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{member.position}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      {/* <section className="py-8 sm:py-12 bg-gray-50 scroll-animate">
        <div className="mt-10 mb-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
            {getTranslation(currentLanguage, 'partner')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 items-center">
            <div className="flex justify-center">
              <FallbackImage 
                src="https://wp.logos-download.com/wp-content/uploads/2024/10/GS_Battery_Logo.png?dl" 
                alt="Partner Logo" 
                className="h-12 sm:h-16 md:h-20 object-contain hover:scale-110 transition-all duration-300 hover:shadow-lg" 
              />
            </div>
            <div className="flex justify-center">
              <FallbackImage 
                src="https://wp.logos-download.com/wp-content/uploads/2024/10/GS_Battery_Logo.png?dl" 
                alt="Partner Logo" 
                className="h-12 sm:h-16 md:h-20 object-contain hover:scale-110 transition-all duration-300 hover:shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section> */}

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes firework {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1) translateY(-20px);
            opacity: 1;
          }
          100% {
            transform: scale(0) translateY(-40px);
            opacity: 0;
          }
        }

        .firework-particle {
          animation: firework 1.5s ease-out forwards;
        }

        /* Image optimization styles */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Hardware acceleration for smooth transitions */
        .hero-slide {
          will-change: opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Additional responsive breakpoints for xs screens */
        @media (max-width: 475px) {
          .hero-slide {
            height: 35vh !important;
          }
        }

        /* Improved text readability on small screens */
        @media (max-width: 640px) {
          .drop-shadow-lg {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          }
          
          .drop-shadow-md {
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
          }
        }

        /* Smooth scrolling for better UX */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover effects for touch devices */
        @media (hover: none) and (pointer: coarse) {
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.05);
          }
          
          .hover\\:scale-105:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
    </Layout>
  )
}
