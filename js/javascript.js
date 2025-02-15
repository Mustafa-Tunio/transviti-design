$(document).ready(function () {
  // Initialize GSAP animation
  gsap.fromTo(
    '.hero-content h1',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
  );

  // Counter Animation
  const counters = document.querySelectorAll('.counter-item');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;

      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = `${target}+`;
      }
    };
    updateCount();
  });

  // Three.js Animation
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#hero-animation"),
    alpha: true, // Allow for transparent background
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc, wireframe: true });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(50, 50, 50);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  $(window).resize(function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // Typewriter Text Animation
  var dataText = ["Welcome To The Future", "Our Services Are", "Web Development.", "Mobile Application"];
  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      $(".hero-content h1").html(text.substring(0, i + 1) + '<span aria-hidden="true"></span>');
      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == 'function') {
      setTimeout(fnCallback, 700);
    }
  }

  function StartTextAnimation(i) {
    if (i >= dataText.length) {
      setTimeout(function () {
        StartTextAnimation(0);
      }, 20000);
    } else {
      typeWriter(dataText[i], 0, function () {
        StartTextAnimation(i + 1);
      });
    }
  }
  StartTextAnimation(0);

  // Owl Carousel Initialization
  $('.owl-carousel').owlCarousel({
  items: 1, // Adjust this depending on your layout
  loop: true,
  nav: true,
  dots: false,
  center: false,
  margin: 20,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplaySpeed: 1500,
  autoplayHoverPause: true,
  animateOut: 'fadeOut',
  navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
  responsive: {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1000: {
      items: 3,
    },
    1220: {
      items: 4,
    }
  }
});


  // Tab Functionality
  const tabButtons = $('.tab-button');
  const tabContents = $('.tab-content');

  tabButtons.click(function () {
    // Remove active class from all buttons and contents
    tabButtons.removeClass('active');
    tabContents.removeClass('active');

    // Add active class to clicked button and corresponding tab content
    $(this).addClass('active');
    const tabId = $(this).data('tab');
    const activeTabContent = $(`#${tabId}`);
    activeTabContent.addClass('active');

    // Reinitialize Owl Carousel for the active tab
    setTimeout(() => {
      activeTabContent.find('.owl-carousel').trigger('refresh.owl.carousel');
    }, 500);
  });
});
