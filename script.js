// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "15px"
    cursor.style.height = "15px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
  })

  // Links and buttons hover effect
  const links = document.querySelectorAll("a, button, .project-card, .tech-item, .social-icon")

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "0px"
      cursor.style.height = "0px"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursorFollower.style.borderWidth = "3px"
      cursorFollower.style.background = "rgba(0, 255, 157, 0.1)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursorFollower.style.borderWidth = "2px"
      cursorFollower.style.background = "transparent"
    })
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })
  })

  // Back to top button
  const backToTop = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add the code sphere animation
  const codeSphere = document.getElementById("code-sphere")
  if (codeSphere) {
    createCodeSphere(codeSphere)
  }

  function createCodeSphere(container) {
    // Create canvas for the sphere
    const canvas = document.createElement("canvas")
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Code particles
    const particles = []
    const particleCount = 100
    const codeSnippets = [
      "function()",
      "const",
      "let",
      "if()",
      "for()",
      "while()",
      "return",
      "import",
      "export",
      "class",
      "async",
      "await",
      "{}",
      "[]",
      "</>",
      "===",
      "=>",
      "&&",
      "||",
    ]

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        size: Math.random() * 10 + 8,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Animation function
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particles
        p.z -= p.speed

        // Reset particles that go out of view
        if (p.z <= 0) {
          p.z = 1000
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        }

        // Calculate 3D projection
        const scale = 1000 / (1000 + p.z)
        const x2d = (p.x - width / 2) * scale + width / 2
        const y2d = (p.y - height / 2) * scale + height / 2

        // Draw text
        ctx.font = `${p.size * scale}px JetBrains Mono`
        ctx.fillStyle = `rgba(0, 255, 157, ${p.opacity * scale})`
        ctx.textAlign = "center"
        ctx.fillText(p.text, x2d, y2d)

        // Draw connecting lines between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const scale2 = 1000 / (1000 + p2.z)
          const x2d2 = (p2.x - width / 2) * scale2 + width / 2
          const y2d2 = (p2.y - height / 2) * scale2 + height / 2

          const distance = Math.sqrt(Math.pow(x2d - x2d2, 2) + Math.pow(y2d - y2d2, 2))

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(x2d2, y2d2)
            ctx.strokeStyle = `rgba(0, 255, 157, ${(1 - distance / 100) * 0.2 * scale * scale2})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
  }

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else if (card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }

        // Add animation
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 300)
      })
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it to console
      console.log("Form submitted:", { name, email, subject, message })

      // Reset form
      contactForm.reset()

      // Show success message (you can implement a proper notification system)
      alert("Message sent successfully!")
    })
  }

  // Add scroll reveal animations
  const revealElements = document.querySelectorAll(
    ".section-header, .about-content, .timeline-item, .tech-item, .project-card, .contact-content",
  )

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < triggerBottom) {
        element.classList.add("revealed")
      }
    })
  }

  window.addEventListener("scroll", checkReveal)
  checkReveal() // Check on initial load
})