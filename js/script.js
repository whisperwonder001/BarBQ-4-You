document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle --- */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('span');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    });

    /* --- Language Toggle --- */
    const langBtns = document.querySelectorAll('.lang-btn');
    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-en]').forEach(el => {
            if (el.getAttribute(`data-${lang}`)) {
                el.innerHTML = el.getAttribute(`data-${lang}`);
            }
        });

        // Update RTL/LTR
        if (lang === 'ur') {
            document.body.setAttribute('dir', 'rtl');
            document.body.classList.add('urdu-font');
        } else {
            document.body.setAttribute('dir', 'ltr');
            document.body.classList.remove('urdu-font');
        }

        // Update active class
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        localStorage.setItem('lang', lang);
    };

    // Load saved language
    const savedLang = localStorage.getItem('lang') || 'en';
    updateLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.getAttribute('data-lang'));
        });
    });


    /* --- Parallax Effect on Hero --- */
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
        let scrollPosition = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- Mobile Menu Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navControls = document.querySelector('.nav-controls');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navControls) {
        mobileToggle.addEventListener('click', () => {
            navControls.classList.toggle('active');
            const bars = mobileToggle.querySelectorAll('.bar');
            if (navControls.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navControls && navControls.classList.contains('active')) {
                navControls.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    /* --- Accordion Logic --- */
    const accordions = document.querySelectorAll('.service-list li');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = acc.classList.contains('active');

                // Close all currently active accordions
                accordions.forEach(a => a.classList.remove('active'));

                // If the clicked one wasn't active, open it
                if (!isActive) {
                    acc.classList.add('active');
                }
            });
        }
    });

    /* --- Scroll Reveal Animations (Fixed) --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    // Create an intersection observer for better performance and reliability
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- Order Form Logic --- */
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        const orderType = document.getElementById('orderType');
        const dynamicItemsSection = document.getElementById('dynamicItemsSection');
        const itemSelect = document.getElementById('itemSelect');
        const unitSelect = document.getElementById('unitSelect');
        const itemQty = document.getElementById('itemQty');
        const addItemBtn = document.getElementById('addItemBtn');
        const itemsUl = document.getElementById('itemsUl');
        const noItemsMsg = document.getElementById('noItemsMsg');
        const detailsInput = document.getElementById('details');

        const menuItems = {
            catering: [
                { en: "Authentic Chicken Biryani", ur: "مستند چکن بریانی" },
                { en: "Peshawari Mutton Karahi", ur: "پشاوری مٹن کڑاہی" },
                { en: "Live BBQ Platter", ur: "لائیو باربی کیو پلیٹر" },
                { en: "Shahi Beef Qorma", ur: "شاہی بیف قورمہ" },
                { en: "Assorted Naan & Roti", ur: "نان اور روٹی" },
                { en: "Salads & Raita Station", ur: "سلاد اور رائتہ" },
                { en: "Traditional Drinks & Kashmiri Chai", ur: "مشروبات اور کشمیری چائے" }
            ],
            frozen: [
                { en: "Beef Shami Kabab", ur: "بیف شامی کباب" },
                { en: "Chicken Samosas", ur: "چکن سموسے" },
                { en: "Vegetable Spring Rolls", ur: "ویجیٹیبل اسپرنگ رولز" },
                { en: "Peshawari Chapli Kabab", ur: "پشاوری چپلی کباب" },
                { en: "Punjabi Aloo Samosa", ur: "پنجابی آلو سموسہ" },
                { en: "Half-Cooked Seekh Kabab", ur: "ہاف ککڈ سیخ کباب" },
                { en: "Classic Lacha Paratha", ur: "کلاسک لچھا پراٹھا" },
                { en: "Marinated Tikka Boti", ur: "میرینیٹڈ چکن تکہ بوٹی" }
            ]
        };

        let selectedItems = [];

        orderType.addEventListener('change', (e) => {
            const val = e.target.value;
            dynamicItemsSection.style.display = 'block';

            // Clear current items
            itemSelect.innerHTML = `<option value="" disabled selected data-en="Choose an item..." data-ur="ایک آئٹم منتخب کریں...">Choose an item...</option>`;

            let itemsToDisplay = [];
            if (val === 'catering') itemsToDisplay = menuItems.catering;
            if (val === 'frozen') itemsToDisplay = menuItems.frozen;
            if (val === 'both') itemsToDisplay = [...menuItems.catering, ...menuItems.frozen];

            const currentLang = localStorage.getItem('lang') || 'en';

            itemsToDisplay.forEach((item, index) => {
                const opt = document.createElement('option');
                opt.value = index; // using index or name, we'll store the object
                opt.dataset.en = item.en;
                opt.dataset.ur = item.ur;
                opt.dataset.itemObj = JSON.stringify(item);
                opt.textContent = item[currentLang];
                itemSelect.appendChild(opt);
            });

            // Re-apply language to newly created options
            updateLanguage(currentLang);
        });

        // Function to update the visual list and hidden input
        const updateAddedItemsUI = () => {
            itemsUl.innerHTML = '';
            const currentLang = localStorage.getItem('lang') || 'en';

            if (selectedItems.length === 0) {
                noItemsMsg.style.display = 'block';
                detailsInput.value = '';
            } else {
                noItemsMsg.style.display = 'none';
                let detailsStr = '';

                selectedItems.forEach((item, idx) => {
                    // Update hidden input string
                    detailsStr += `${item.qty} ${item.unit} of ${item.en}\n`;

                    // Create UI element
                    const li = document.createElement('li');
                    li.style.display = 'flex';
                    li.style.justifyContent = 'space-between';
                    li.style.alignItems = 'center';
                    li.style.background = 'var(--clr-bg-card)';
                    li.style.padding = '0.5rem 1rem';
                    li.style.borderRadius = '8px';
                    li.style.border = '1px solid var(--clr-border)';

                    const textSpan = document.createElement('span');
                    textSpan.dataset.en = `${item.qty} ${item.unit} - ${item.en}`;
                    textSpan.dataset.ur = `${item.qty} ${item.unit} - ${item.ur}`;
                    textSpan.textContent = `${item.qty} ${item.unit} - ${item[currentLang]}`;

                    const rmBtn = document.createElement('button');
                    rmBtn.innerHTML = '×';
                    rmBtn.style.background = '#ef4444';
                    rmBtn.style.color = '#fff';
                    rmBtn.style.border = 'none';
                    rmBtn.style.borderRadius = '50%';
                    rmBtn.style.width = '24px';
                    rmBtn.style.height = '24px';
                    rmBtn.style.cursor = 'pointer';
                    rmBtn.style.display = 'flex';
                    rmBtn.style.alignItems = 'center';
                    rmBtn.style.justifyContent = 'center';

                    rmBtn.addEventListener('click', () => {
                        selectedItems.splice(idx, 1);
                        updateAddedItemsUI();
                    });

                    li.appendChild(textSpan);
                    li.appendChild(rmBtn);
                    itemsUl.appendChild(li);
                });

                detailsInput.value = detailsStr;
                updateLanguage(currentLang); // Refresh translations in newly created spans
            }
        };

        addItemBtn.addEventListener('click', () => {
            const selectedOpt = itemSelect.options[itemSelect.selectedIndex];
            if (!selectedOpt.value) return alert('Please select an item first.');

            const qty = itemQty.value;
            const unit = unitSelect.value;
            const itemObj = JSON.parse(selectedOpt.dataset.itemObj);

            selectedItems.push({
                en: itemObj.en,
                ur: itemObj.ur,
                qty: qty,
                unit: unit
            });

            // Reset inputs
            itemSelect.selectedIndex = 0;
            itemQty.value = 1;
            unitSelect.selectedIndex = 0;

            updateAddedItemsUI();
        });

        // Whenever language changes, we need to update our dynamic options text
        // We can hook into the click event of langBtns
        const langBtnsOrders = document.querySelectorAll('.lang-btn');
        langBtnsOrders.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                // Update select options text
                Array.from(itemSelect.options).forEach(opt => {
                    if (opt.dataset[lang]) {
                        opt.textContent = opt.dataset[lang];
                    }
                });
                // Update items list text via updateLanguage call in updateLanguage function globally.
                // updateLanguage globally handles [data-en] etc.
            });
        });

        // Payment Method Logic
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        const cardFields = document.getElementById('cardFields');
        const walletFields = document.getElementById('walletFields');
        const bankFields = document.getElementById('bankFields');

        if (paymentRadios && cardFields && walletFields && bankFields) {
            paymentRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    // Hide all first
                    cardFields.style.display = 'none';
                    walletFields.style.display = 'none';
                    bankFields.style.display = 'none';

                    // Show selected
                    const val = e.target.value;
                    if (val === 'card') {
                        cardFields.style.display = 'flex';
                    } else if (val === 'wallet') {
                        walletFields.style.display = 'flex';
                    } else if (val === 'bank') {
                        bankFields.style.display = 'flex';
                    }
                });
            });
        }
    }
});
