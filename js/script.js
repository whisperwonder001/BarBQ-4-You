document.addEventListener('DOMContentLoaded', () => {

    /* --- Global Cart Logic --- */
    let cart = JSON.parse(localStorage.getItem('bbq-cart')) || [];

    const updateCartBadge = () => {
        const badges = document.querySelectorAll('#cart-count-badge');
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    };

    const saveCart = () => {
        localStorage.setItem('bbq-cart', JSON.stringify(cart));
        updateCartBadge();
    };

    const showToast = (message) => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // Initialize Badge immediately before anything else
    updateCartBadge();

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
    const isInnerPage = document.body.classList.contains('cart-page') || document.body.classList.contains('order-page');

    if (isInnerPage) {
        navbar.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        if (isInnerPage || window.scrollY > 50) {
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
        const dynamicItemsSection = document.getElementById('dynamicItemsSection');
        const itemsUl = document.getElementById('itemsUl');
        const noItemsMsg = document.getElementById('noItemsMsg');
        const detailsInput = document.getElementById('details');

        const menuItems = {
            catering: [
                { en: "Authentic Chicken Biryani (KG)", ur: "مستند چکن بریانی (کلو)", price: 800 },
                { en: "Peshawari Mutton Karahi (KG)", ur: "پشاوری مٹن کڑاہی (کلو)", price: 1500 },
                { en: "Live BBQ Platter (Person)", ur: "لائیو باربی کیو پلیٹر (فی کس)", price: 2500 },
                { en: "Shahi Beef Qorma (KG)", ur: "شاہی بیف قورمہ (کلو)", price: 1200 },
                { en: "Assorted Naan & Roti (Piece)", ur: "نان اور روٹی (عدد)", price: 50 },
                { en: "Salads & Raita Station (Bowl)", ur: "سلاد اور رائتہ (پیالہ)", price: 350 },
                { en: "Traditional Drinks & Kashmiri Chai (Liter)", ur: "مشروبات اور کشمیری چائے (لیٹر)", price: 250 }
            ],
            frozen: [
                { en: "Beef Shami Kabab (Dozen)", ur: "بیف شامی کباب (درجن)", price: 1200 },
                { en: "Chicken Samosas (Dozen)", ur: "چکن سموسے (درجن)", price: 700 },
                { en: "Vegetable Spring Rolls (Dozen)", ur: "ویجیٹیبل اسپرنگ رولز (درجن)", price: 800 },
                { en: "Peshawari Chapli Kabab (KG)", ur: "پشاوری چپلی کباب (کلو)", price: 1400 },
                { en: "Punjabi Aloo Samosa (Dozen)", ur: "پنجابی آلو سموسہ (درجن)", price: 400 },
                { en: "Half-Cooked Seekh Kabab (KG)", ur: "ہاف ککڈ سیخ کباب (کلو)", price: 1500 },
                { en: "Classic Lacha Paratha (Pack of 10)", ur: "کلاسک لچھا پراٹھا (پیک 10 عدد)", price: 450 },
                { en: "Marinated Tikka Boti (KG)", ur: "میرینیٹڈ چکن تکہ بوٹی (کلو)", price: 1600 }
            ]
        };


        let selectedItems = cart.length > 0 ? cart.map(item => ({
            en: item.nameEn,
            ur: item.nameUr,
            qty: item.qty,
            unit: item.unit || 'Unit',
            price: item.price || 0
        })) : [];

        // Function to update the visual list and hidden input
        const updateAddedItemsUI = () => {
            itemsUl.innerHTML = '';
            const currentLang = localStorage.getItem('lang') || 'en';
            const orderTotalContainer = document.getElementById('orderTotalContainer');
            const orderTotalAmount = document.getElementById('orderTotalAmount');

            if (selectedItems.length === 0) {
                noItemsMsg.style.display = 'block';
                detailsInput.value = '';
                if (orderTotalContainer) orderTotalContainer.style.display = 'none';
            } else {
                noItemsMsg.style.display = 'none';
                if (orderTotalContainer) orderTotalContainer.style.display = 'block';
                let detailsStr = '';
                let totalAmount = 0;

                selectedItems.forEach((item, idx) => {
                    const lineTotal = item.qty * (item.price || 0);
                    totalAmount += lineTotal;
                    detailsStr += `${item.qty} ${item.unit} of ${item.en} - Rs ${lineTotal}\n`;

                    const li = document.createElement('li');
                    li.style.display = 'flex';
                    li.style.justifyContent = 'space-between';
                    li.style.alignItems = 'center';
                    li.style.background = 'var(--clr-bg-card)';
                    li.style.padding = '0.5rem 1rem';
                    li.style.borderRadius = '8px';
                    li.style.border = '1px solid var(--clr-border)';

                    const infoDiv = document.createElement('div');
                    infoDiv.style.display = 'flex';
                    infoDiv.style.flexDirection = 'column';
                    infoDiv.style.gap = '0.2rem';

                    const textSpan = document.createElement('span');
                    textSpan.dataset.en = `${item.qty} - ${item.en} (Rs ${item.price.toLocaleString()})`;
                    textSpan.dataset.ur = `${item.qty} - ${item.ur} (Rs ${item.price.toLocaleString()})`;
                    textSpan.textContent = `${item.qty} - ${item[currentLang]} (Rs ${item.price.toLocaleString()})`;

                    const dropdownSpan = document.createElement('span');
                    dropdownSpan.innerHTML = `
                        <select class="order-item-unit" data-index="${idx}" style="padding: 2px; font-size: 0.8rem; border: 1px solid var(--clr-border); border-radius: 4px; background: var(--clr-bg-main); color: var(--clr-text-main); margin-top: 5px;">
                            <option value="KG" ${item.unit === 'KG' ? 'selected' : ''}>KG</option>
                            <option value="Dozen" ${item.unit === 'Dozen' ? 'selected' : ''}>Dozen</option>
                            <option value="Pack" ${item.unit === 'Pack' ? 'selected' : ''}>Pack</option>
                            <option value="Persons" ${item.unit === 'Persons' ? 'selected' : ''}>Persons</option>
                            <option value="Pieces" ${item.unit === 'Pieces' ? 'selected' : ''}>Pieces</option>
                            <option value="Bowl" ${item.unit === 'Bowl' ? 'selected' : ''}>Bowl</option>
                            <option value="Liter" ${item.unit === 'Liter' ? 'selected' : ''}>Liter</option>
                            <option value="Unit" ${item.unit === 'Unit' ? 'selected' : ''}>Unit</option>
                        </select>
                    `;

                    infoDiv.appendChild(textSpan);
                    infoDiv.appendChild(dropdownSpan);

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

                    li.appendChild(infoDiv);
                    li.appendChild(rmBtn);
                    itemsUl.appendChild(li);
                });

                if (orderTotalAmount) {
                    orderTotalAmount.textContent = `Rs ${totalAmount.toLocaleString()}`;
                }
                detailsStr += `\nTotal: Rs ${totalAmount}`;
                detailsInput.value = detailsStr;
                updateLanguage(currentLang);

                // Add event listeners to the new dropdowns
                document.querySelectorAll('.order-item-unit').forEach(sel => {
                    sel.addEventListener('change', (e) => {
                        const i = e.target.dataset.index;
                        selectedItems[i].unit = e.target.value;
                        updateAddedItemsUI();
                    });
                });
            }
        };

        if (selectedItems.length > 0) {
            updateAddedItemsUI();
        }

        // Initial setup for items
        // Whenever language changes, we need to update our dynamic options text
        // We can hook into the click event of langBtns
        const langBtnsOrders = document.querySelectorAll('.lang-btn');
        langBtnsOrders.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
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

    // Add to Cart Buttons logic (for index.html)
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = {
                nameEn: btn.dataset.nameEn,
                nameUr: btn.dataset.nameUr,
                price: parseInt(btn.dataset.price),
                unit: btn.dataset.unit || 'Unit',
                img: btn.dataset.img,
                qty: 1
            };

            const existing = cart.find(i => i.nameEn === item.nameEn);
            if (existing) {
                existing.qty++;
            } else {
                cart.push(item);
            }

            saveCart();
            const currentLang = localStorage.getItem('lang') || 'en';
            const msg = currentLang === 'ur' ? 'آئٹم کارٹ میں شامل کر دیا گیا!' : 'Item added to cart!';
            showToast(msg);
        });
    });

    // Cart Page Rendering (for cart.html)
    const cartItemsWrapper = document.getElementById('cart-items-wrapper');
    const cartSummary = document.getElementById('cart-summary');
    const totalQtyEl = document.getElementById('total-qty');
    const emptyMsg = document.getElementById('empty-cart-msg');


    const renderCart = () => {
        if (!cartItemsWrapper) return;

        cartItemsWrapper.innerHTML = '';
        const currentLang = localStorage.getItem('lang') || 'en';

        if (cart.length === 0) {
            emptyMsg.style.display = 'block';
            cartSummary.style.display = 'none';
            return;
        }

        emptyMsg.style.display = 'none';
        cartSummary.style.display = 'block';

        let totalQty = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {
            totalQty += item.qty;
            totalPrice += (item.price * item.qty);

            const card = document.createElement('div');
            card.className = 'cart-item-card';

            card.innerHTML = `
                <img src="${item.img}" alt="${item.nameEn}" class="cart-item-thumb">
                <div class="cart-item-info">
                    <h4 data-en="${item.nameEn}" data-ur="${item.nameUr}">${currentLang === 'ur' ? item.nameUr : item.nameEn}</h4>
                    <p style="display: flex; align-items: center; gap: 0.5rem;">Rs ${item.price.toLocaleString()} / 
                        <select class="cart-unit-select" data-index="${index}" style="padding: 2px 5px; font-size: 0.85rem; border: 1px solid var(--clr-border); border-radius: 4px; background: var(--clr-bg-main); color: var(--clr-text-main);">
                            <option value="KG" ${item.unit === 'KG' ? 'selected' : ''}>KG</option>
                            <option value="Dozen" ${item.unit === 'Dozen' ? 'selected' : ''}>Dozen</option>
                            <option value="Pack" ${item.unit === 'Pack' ? 'selected' : ''}>Pack</option>
                            <option value="Persons" ${item.unit === 'Persons' ? 'selected' : ''}>Persons</option>
                            <option value="Pieces" ${item.unit === 'Pieces' ? 'selected' : ''}>Pieces</option>
                            <option value="Bowl" ${item.unit === 'Bowl' ? 'selected' : ''}>Bowl</option>
                            <option value="Liter" ${item.unit === 'Liter' ? 'selected' : ''}>Liter</option>
                            <option value="Unit" ${item.unit === 'Unit' ? 'selected' : ''}>Unit</option>
                        </select>
                    </p>
                    <p><strong>Subtotal: Rs ${(item.price * item.qty).toLocaleString()}</strong></p>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            cartItemsWrapper.appendChild(card);
        });

        totalQtyEl.textContent = totalQty;

        // Add Total Price to summary if element exists
        const summaryDetails = cartSummary.querySelector('.summary-details');
        if (summaryDetails) {
            summaryDetails.innerHTML = `
                <div class="summary-row">
                    <span data-en="Total Items" data-ur="کل آئٹمز">${currentLang === 'ur' ? 'کل آئٹمز' : 'Total Items'}</span>
                    <span>${totalQty}</span>
                </div>
                <div class="summary-row" style="font-size: 1.2rem; font-weight: 800; border-top: 1px solid var(--clr-border); padding-top: 1rem; margin-top: 1rem;">
                    <span data-en="Total Amount" data-ur="کل رقم">${currentLang === 'ur' ? 'کل رقم' : 'Total Amount'}</span>
                    <span>Rs ${totalPrice.toLocaleString()}</span>
                </div>
            `;
        }

        // Button Listeners
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.dataset.index;
                cart[idx].qty++;
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.dataset.index;
                if (cart[idx].qty > 1) {
                    cart[idx].qty--;
                } else {
                    cart.splice(idx, 1);
                }
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                cart.splice(btn.dataset.index, 1);
                saveCart();
                renderCart();
            });
        });

        document.querySelectorAll('.cart-unit-select').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const idx = e.target.dataset.index;
                cart[idx].unit = e.target.value;
                saveCart();
                // Optionally re-render cart here entirely, or just let it update unit silently
            });
        });

        // Proactively update scroll-reveal elements
        if (typeof observer !== 'undefined') {
            document.querySelectorAll('.cart-item-card').forEach(el => observer.observe(el));
        }
    };

    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = [];
            saveCart();
            renderCart();
        });
    }

    updateCartBadge();
    renderCart();
});
