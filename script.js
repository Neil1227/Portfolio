document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.typewriter');
    const texts = ["Web Developer.", "IT Support Specialist."]; // Array of texts to loop through
    let charIndex = 0;
    let textIndex = 0;
    let isErasing = false;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (!isErasing && charIndex < currentText.length) {
            typewriterElement.innerHTML = `<span style="color: #DC5F00;">${currentText.substring(0, charIndex + 1)}</span>`;
            charIndex++;
            setTimeout(typeWriter, 200); // Typing speed
        } else if (isErasing && charIndex > 0) {
            typewriterElement.innerHTML = `<span style="color: #DC5F00;">${currentText.substring(0, charIndex - 1)}</span>`;
            charIndex--;
            setTimeout(typeWriter, 100); // Erasing speed
        } else if (!isErasing && charIndex === currentText.length) {
            setTimeout(() => {
                isErasing = true;
                setTimeout(typeWriter, 100); // Start erasing
            }, 2000); // Delay before starting to erase
        } else if (isErasing && charIndex === 0) {
            isErasing = false;
            textIndex = (textIndex + 1) % texts.length; // Switch to the next text
            setTimeout(typeWriter, 500); // Delay before starting to type the new text
        }
    }

    // Delay before starting the typewriter effect
    setTimeout(typeWriter, 2000); // 2-second delay

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const closeBtn = document.getElementById('closeBtn');

    hamburger.addEventListener('click', function() {
        menu.classList.toggle('show');
    });

    closeBtn.addEventListener('click', function() {
        menu.classList.remove('show');
    });

    // Close the menu when a menu item is clicked (optional)
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove "active" class from all menu items
            menuItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add "active" class to the clicked menu item
            this.classList.add('active');

            // Close the menu
            menu.classList.remove('show');
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {

    // Scroll-to-top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Panel Activation Logic
    let panelsElement = document.querySelectorAll('.panel');

    let removeActiveClasses = () => {
        panelsElement.forEach(panel => {
            panel.classList.remove('active');
        });
    };

    panelsElement.forEach(panel => {
        panel.addEventListener('click', () => {
            removeActiveClasses();
            panel.classList.add('active');
        });
    });

    // Navbar Scroll Detection
    window.addEventListener('scroll', function() {
        var navbar = document.querySelector('.navbar');
        var hero = document.querySelector('.hero');
        var heroHeight = hero.offsetHeight;

        if (window.scrollY > heroHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Carousel Logic
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildren = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildren.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildren.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX || e.touches[0].pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        const x = e.pageX || e.touches[0].pageX;
        carousel.scrollLeft = startScrollLeft - (x - startX);
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    };
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    document.addEventListener("touchend", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
});

document.addEventListener('scroll', function() {
    var scrollToTopButton = document.querySelector('.scroll-to-top');
    
    if (window.scrollY > 100) { // Show the button after scrolling down 100px
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.classList.toggle('dark-mode', currentTheme === 'dark');
    }

    updateIcons();

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const theme = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        location.reload(); // Reload the page to apply the new theme
    });

    function updateIcons() {
        if (document.documentElement.classList.contains('dark-mode')) {
            themeToggleBtn.querySelector('.bi-lightbulb').style.display = 'inline';
            themeToggleBtn.querySelector('.bi-lightbulb-off').style.display = 'none';
        } else {
            themeToggleBtn.querySelector('.bi-lightbulb').style.display = 'none';
            themeToggleBtn.querySelector('.bi-lightbulb-off').style.display = 'inline';
        }
    }
});
