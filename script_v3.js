
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 3D Particle Background Animation
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 100; // Number of nodes
        const connectionDistance = 150; // Distance to draw lines

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Velocity
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(230, 175, 46, ${Math.random() * 0.5 + 0.2})`; // Gold with alpha
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(230, 175, 46, ${1 - dist / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animate();
    }


    // ==========================================
    // 2. Navigation Logic (Scroll Spy & Smooth Scroll)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideNav = document.getElementById('side-nav');

    // Smooth Scroll on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // Let default anchor behavior work with css smooth-scroll, or keep manual?
            // Let's use manual to close menu reliably
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close menu first
                if (hamburgerBtn && sideNav) {
                    hamburgerBtn.classList.remove('active');
                    sideNav.classList.remove('active');
                }

                // Scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Spy (Highlight Nav)
    const observerOptions = {
        root: null,
        threshold: 0.3 // Trigger when 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add to current
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));





    // ==========================================
    // 4. Existing Content Logic (Language, Modal, Data)
    // ==========================================

    // Modal Logic
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImagesContainer = document.getElementById('modal-images');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    const interactiveItems = document.querySelectorAll('.skill-tag, .interactive-item');
    interactiveItems.forEach(item => {
        item.addEventListener('click', () => {
            let title = item.textContent.trim();
            const h3 = item.querySelector('h3');
            if (h3) title = h3.textContent.trim();
        });
    });

    // Language Data & Logic
    const langBtn = document.getElementById('lang-switch');
    let currentLang = 'zh';

    const translations = {
        zh: {
            name: "蘇子恆",
            intro: "以數據思維結合商業直覺｜將零散市場訊號轉化為可執行的獲利策略",
            hero_subtitle: "數位行銷與分析碩士研究生｜專注於市場分析、資料視覺化與商業 AI 應用",
            hero_tags: `<span class="hero-tag-pill">Market Analysis</span> · <span class="hero-tag-pill">Data Analytics</span> · <span class="hero-tag-pill">Machine Learning</span> · <span class="hero-tag-pill">Digital Marketing</span>`,

            // Nav
            nav_home: "首頁",
            nav_edu: "學歷",
            nav_exp: "專案",
            nav_intern: "實習",
            nav_skills: "專業技能",
            nav_cert: "證照",
            nav_contact: "聯絡",

            edu_title: "學歷",
            edu_1_school: "國立高雄科技大學",
            edu_1_major: "運籌管理系日間部 學士",
            edu_1_time: "2020 - 2023",
            edu_2_school: "國立高雄科技大學",
            edu_2_major: "金融系日間部 碩士",
            edu_2_time: "2023 - 2025",
            edu_3_school: "法國雷恩商學院",
            edu_3_major: "數位行銷管理 碩士",
            edu_3_time: "2025 - 2026",

            exp_title: "專案經驗",
            exp_1_role: "旗津渡輪生質能源票價策略研究",
            exp_1_time: "Jan 2023 – Dec 2023",
            exp_1_summary: "整合TPB與VBN理論，探討消費者對綠色產品與CSR的願付價格。",
            exp_1_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Survey Research</span><span class="project-tag">Tobit Model</span>`,
            exp_1_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：探索綠色定價的心理機制】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">本專案目的在整合計畫行為理論(TPB)與價值-信念-規範理論(VBN)，探討消費者對綠色產品與CSR的願付價格。</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【研究方法與發現】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">方法上採用條件評估法(CVM)設計問卷，並運用Tobit模型修正資料偏誤進行精準估計。結果證實心理因素及特定人口特徵（如年齡、職業）顯著影響願付金額。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">建議企業與政府應鎖定高願付意願族群制定差異化定價與行銷策略，將環境價值有效轉化為市場效益。<br><br><a href="files/旗津渡輪生質能源票價研究.pdf" target="_blank" class="dashboard-btn">查看檔案</a></p>
            `,

            exp_2_role: "感染性醫療廢棄物產量預測",
            exp_2_time: "Sep 2024 – Jul 2025",
            exp_2_summary: "針對心臟科與婦產科建立科室層級的感染性廢棄物預測模型，協助醫院優化廢棄物管理。",
            exp_2_tags_list: `<span class="project-tag">Machine Learning</span><span class="project-tag">Python</span><span class="project-tag">SVR</span><span class="project-tag">SHAP</span>`,
            exp_2_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：解決一體適用的管理盲點】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">本專案目的在解決醫療廢棄物管理挑戰，分別針對心臟科與婦產科建立科室層級的感染性廢棄物預測模型，以克服傳統全院層級模型忽略科別差異的限制。</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【執行策略與技術應用】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">方法上採用三項病患結構性指標，導入比較六種機器學習演算法，並運用SHAP法解釋變數影響力。結果顯示支持向量回歸(SVR)預測效果最佳，且CMI為影響各科室感染性廢棄物產量最關鍵的因素，反映病情複雜度與廢棄物量高度相關。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">建議醫院應屏棄一體適用的管理模式，改採科室別的差異化策略，且應針對高CMI病例建立廢棄物預警機制，讓後勤單位能提前調度資源；同時，將廢棄物管理納入臨床路徑規劃，並針對不同科室特性實施客製化的醫護分類教育訓練，以落實精準減量與永續治理。</p>
            `,

            exp_3_role: "Dockmate France數位行銷策略規劃",
            exp_3_time: "Sep 2025 – Oct 2025",
            exp_3_summary: "為Dockmate制定歐洲市場全方位行銷策略，結合Google Ads與網紅行銷。",
            exp_3_tags_list: `<span class="project-tag">Digital Marketing</span><span class="project-tag">Google Ads</span><span class="project-tag">Social Media Strategy</span>`,
            exp_3_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：提升高淨值客群的品牌心佔率】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">本專案目的在為遊艇遙控器品牌Dockmate制定歐洲市場全方位行銷策略，提升高淨值客群的品牌認知與忠誠度。</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【執行策略：全漏斗行銷佈局】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">執行策略涵蓋全漏斗(Full-Funnel)路徑：首先透過「恐懼與安心」的情感訴求激發共鳴，並導入電子書與線上研討會獲取潛在客戶(Leads)；其次，運用Google Ads(40%預算)進行精準關鍵字佈局，排除無效流量並鎖定特定船型；社群方面結合Alex Jimenez等百萬級網紅與LinkedIn B2B原生廣告擴大聲量。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">成果不僅建立了一套整合Google Ads、社群與CRM自動化的精準獲客模型，更創新設計了「船長圈(Captains Circle)」遊戲化忠誠度計畫，透過分級獎勵機制有效強化舊客留存與口碑推薦。<br><br><a href="files/DockMate數位行銷策略規劃.pdf" target="_blank" class="dashboard-btn">查看檔案</a></p>
            `,

            exp_4_role: "電商客戶流失因素分析與數位行銷洞察",
            exp_4_time: "Sep 2025 – Dec 2025",
            exp_4_summary: "分析客戶流失關鍵驅動因子，並提出數據驅動的留存策略。",
            exp_4_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Power BI</span><span class="project-tag">Python</span><span class="project-tag">Customer Retention</span>`,
            exp_4_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：數據驅動的留存戰役】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">本專案透過對原始資料的整理、視覺化以及演算法分析，整合Python與Microsoft Power BI技術，深入剖析電商平台27.49%高流失率背後的關鍵驅動因子。</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【分析架構與洞察】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">分析顯示「總購買次數低於3次」為首要流失警訊，其流失風險為其他群體的1.68倍；同時，平均對話時間過短(<8.3分鐘)與低生命週期價值(<322)亦是重要預測指標。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">基於此發現，建議針對購買次數少的客群建立7-14天黃金期再行銷機制，設計專屬登陸頁面(Landing Page)與個人化EDM，並同步優化客服體驗，從源頭提升顧客黏著度與留存率。<br><br><a href="files/顧客流失分析.pdf" target="_blank" class="dashboard-btn">查看檔案</a></p>
            `,

            exp_5_role: "社群媒體使用者行為分析及預測",
            exp_5_time: "Dec 2025 – Present",
            exp_5_summary: "針對法國市場構建綠色行銷貼文的響應預測模型。",
            exp_5_tags_list: `<span class="project-tag">Social Media Analytics</span><span class="project-tag">Random Forest</span><span class="project-tag">Survey</span>`,
            exp_5_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：量化社群情感的嘗試】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">本專案目的在針對法國市場構建綠色行銷貼文的響應預測模型，以解決社群內容成效難以量化預判的痛點。</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【執行策略與模型建構】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">結合社會科學與資料科學方法，首先透過結構化問卷蒐集在地社群使用者回饋，並運用克特量表(Likert Scale)將抽象的情感反應轉化為可量化的特徵指標；其次，導入隨機森林(Random Forest)等多種監督式機器學習演算法進行訓練與效能評估，完整建立一套能依據使用者情感分數預測貼文潛在互動率的數據模型，為品牌在制定綠色內容策略時提供具科學依據的決策參考。</p>
            `,

            exp_6_role: "架設個人網頁",
            exp_6_time: "Jan 2026 – Present",
            exp_6_summary: "使用 Google AntiGravity AI 環境從零打造的個人品牌網站專案。",
            exp_6_tags_list: `<span class="project-tag">Web Development</span><span class="project-tag">AI Agent</span><span class="project-tag">Prompt Engineering</span>`,
            exp_6_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：驗證 AI 時代的開發變革】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">這個專案的誕生，源自於我想親自驗證一場正在發生的變革。我使用 Google 最新的 AI 開發環境 AntiGravity，從零開始打造了你現在看到的個人網站。對我來說，這不僅僅是為了建立一個存放作品集的空間，更是一場關於「Agentic Workflow（代理人工作流）的實戰實驗。我試圖去理解，當人工智慧不再只是被動的問答機器，而是能主動執行任務的代理人時，它將如何徹底改變我過去使用工具的模式，以及我解決問題的邏輯。</p>

                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【反思：從工程師到 AI 的專案經理】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">在開發過程中，我並未將自己定位為傳統的程式開發者，而是轉身成為這名 AI 工程師的專案經理。我不需要親手敲打每一行程式碼，也不需要死記硬背繁瑣的語法，我的核心工作轉而變成了精準的指令下達與資源控管。就像在工廠管理產能一樣，我必須在 AntiGravity 有限的 Token 額度內，思考如何用最精簡的對話次數，換取最豐富的網頁功能與內容。每一次的 Prompt（提示詞），都像是一張發給產線的標準工單，指令下得越精確，產出的良率就越高，這讓我深刻體會到，在 AI 時代，「問對問題」的能力早已超越了「寫出答案」的能力。</p>

                <p style="text-indent: 2em; margin-bottom: 1rem;">當然，過程中並非一帆風順，當排版跑掉或功能報錯時，我並沒有選擇接手重寫，而是堅持善用內建的 AI Agent 來進行除錯。我要求它不只修好錯誤，更要解釋錯誤發生的原因，讓我理解是哪一段語法邏輯產生了衝突。透過這種「指揮與反饋」的循環，我不僅成功排除了問題，更深入掌握了避免未來重複犯錯的關鍵。這段經歷讓我確信，未來的競爭力不在於誰能寫出最完美的程式碼，而在於誰能以最清晰的邏輯，指揮 AI 完成最複雜的任務。</p>
            `,

            // Images Captions (ZH)
            exp_2_imgs: [
                { "src": "files/images/機器學習模型預測結果.png", "caption": "機器學習模型預測結果績效比較" },
                { "src": "files/images/W51 shap summary plot.png", "caption": "SHAP值解釋變數影響力 心臟內科" },
                { "src": "files/images/W51 因子重要性.png", "caption": "因子重要性分析 心臟內科" }
            ],

            skills_title: "專業技能",
            skills_summary: "我具備從市場洞察、資料視覺化到建構機器學習與 RAG 系統的端對端數據能力，為企業提供全方位的 AI 策略解決方案。",
            skill_cat_1: "Data & AI",
            skill_list_1: `
                <div class="skill-item-pill">Machine Learning</div>
                <div class="skill-item-pill">Python (Pandas, Scikit-learn)</div>
                <div class="skill-item-pill">SQL & Database</div>
                <div class="skill-item-pill">RAG System Design</div>
                <div class="skill-item-pill">Data Visualization</div>
            `,
            skill_cat_2: "Marketing & Business",
            skill_list_2: `
                <div class="skill-item-pill">Market Analysis</div>
                <div class="skill-item-pill">Digital Marketing Strategy</div>
                <div class="skill-item-pill">Performance Ads (Google/Meta)</div>
                <div class="skill-item-pill">Social Media Analytics</div>
                <div class="skill-item-pill">Consumer Behavior</div>
            `,
            skill_cat_3: "Tools & Platforms",
            skill_list_3: `
                <div class="skill-item-pill">Power BI</div>
                <div class="skill-item-pill">Google Analytics 4 (GA4)</div>
                <div class="skill-item-pill">Google AI Ads</div>
                <div class="skill-item-pill">HubSpot</div>
                <div class="skill-item-pill">AntiGravity / GitHub</div>
            `,

            hint_text: "(點擊查看更多資訊)",

            contact_title: "聯絡我",
            contact_btn: "Email",

            about_btn: "關於我",
            about_desc: `
                <p style="text-indent: 2em; margin-bottom: 2rem;">您好，我是蘇子恆。我的個性沉穩內斂，習慣對感興趣的事物進行深度思考，並以結構化的方式釐清問題本質；同時也樂於跨出舒適圈，主動探索未知與新方法。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【跨領域的學術背景】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">在台灣取得運籌管理學士學位後，我選擇跨入金融研究所，期望從供應鏈的實務運作延伸至資本市場的價值評估；隨後為了拓展對市場端的理解，我毅然前往法國攻讀數位行銷管理。</p>
                <p style="text-indent: 2em; margin-bottom: 1.5rem;">這一連串選擇源於我對商業全貌的好奇。我希望結合運籌的流程思維、金融的嚴謹邏輯與行銷的市場洞察，成為能用數據說話、協助企業做出精準決策的複合型人才。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【熱愛挑戰的生活態度】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">求學之餘，我是一名熱愛獨旅的人。利用學校假期，我獨自遊歷法國各地；從行程規劃到應對突發狀況，獨旅不只滿足好奇心，也磨練了我獨立解決問題與快速適應的能力。我相信，無論面對陌生城市或複雜的數據專案，只要保持開放並持續學習，就能找到更好的解法。</p>
            `,

            view_details_btn: "查看詳情",

            cert_title: "證照與能力證明",

            cert_subtitle_prof: "專業證照",
            cert_1_name: "生產管理證照",
            cert_1_detail: "中國工業工程學會 (CIIE)<br><span class=\"cert-date\">2022年7月</span>",
            cert_2_name: "ESG 素養證書 (專業級與進階級)",
            cert_2_detail: "IPOE<br><span class=\"cert-date\">2023年12月</span>",
            cert_3_name: "淨零碳規劃管理師證照-初級",
            cert_3_detail: "經濟部產業發展署(IPAS)<br><span class=\"cert-date\">2024年12月</span>",
            cert_4_name: "AI應用規劃管理師-初級",
            cert_4_detail: "經濟部產業發展署(IPAS)<br><span class=\"cert-date\">2025年5月</span>",
            cert_google_name: "Google AI-Powered Performance Ads Certification",
            cert_google_detail: "Google<br><span class=\"cert-date\">2025年8月</span>",
            cert_hubspot_name: "Social Media Certified",
            cert_hubspot_detail: "HubSpot Academy<br><span class=\"cert-date\">2025年8月</span>",

            cert_subtitle_lang: "語言能力",
            cert_5_name: "TOEIC",
            cert_5_detail: "Score: 810<br><span class=\"cert-date\">2024年12月</span>",

            cert_subtitle_course: "修習課程",
            cert_6_name: "Udemy Power BI Certificate Prep Course",
            cert_6_detail: "Udemy<br><span class=\"cert-date\">2026年1月</span>",

            view_cert_btn: "查看證書",

            resume_btn: "下載履歷",

            intern_title: "實習經驗",
            intern_1_title: "Golden Corporation Sdn Bhd｜廠務實習生",
            intern_1_time: "2023年7月 - 2023年8月",
            intern_1_desc: "Rotated through storage, production, quality control, and aquaculture, assisting in process optimization and basic reporting.",

            intern1role: "Golden Corporation Sdn Bhd｜廠務實習生",
            intern1detail: `
                <p style="text-indent: 2em; margin-bottom: 1rem;">大三升大四那年暑假，為了踏出舒適圈，我選擇去到了汶萊實習。我本來就喜歡勇於嘗試，也喜歡走出跟別人不一樣的人生路線。同時我也想踏出課本，親眼看看所學和實際運作之間，到底差了哪些細節。</p>
                
                <p style="text-indent: 2em; margin-bottom: 1rem;">我的實習期間是 2023/7/1 到 2023/8/31，職務是廠務實習生，實習地點在汶萊的 Golden Corporation Sdn Bhd。</p>
                <p style="text-indent: 2em; margin-bottom: 2rem;">這份實習的設計不是把我固定在單一職位，而是讓我輪調於各個工作站，包含倉儲、生產線、品管實驗室、養蝦場、物流區。當走過這些站點，我才明白一間工廠不是由某個部門單獨撐起來的，它更像是一張彼此牽動的網。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【倉儲 Warehousing】</h4>
                <p style="text-indent: 2em; margin-bottom: 1.5rem;">倉儲像是起點，我開始在意物料怎麼被放好，怎麼被找到，怎麼被對上後續需求。那是一種很樸素的秩序感，卻也是最容易被忽略的基本功，因為只要起點亂了，後面的每一步都要花更多力氣把它拉回來。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【生產線 Production Line】</h4>
                <p style="text-indent: 2em; margin-bottom: 1.5rem;">生產線像是節奏本身，我看見標準化如何讓每一天的產出變得更一致，也看見現場如何用經驗去補齊那些標準沒寫到的角落。那一刻才理解，流程不是寫在紙上就會自己運轉，它要靠人去守，靠人去接，靠人把每一次交接都做得更清楚。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【品管實驗室 QC Lab】</h4>
                <p style="text-indent: 2em; margin-bottom: 1.5rem;">走進品管實驗室，感覺又不一樣了。在那裡，品質是一種必須被記錄、被判斷、被溝通的語言。我開始聽懂，原來現場跟實驗室其實在講同一件事，只是站在不同的位置，用不同的方式，讓事情往更穩定的方向走。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【養蝦場與物流 Farms & Logistics】</h4>
                <p style="text-indent: 2em; margin-bottom: 1.5rem;">養蝦場讓我看見前端的真實，很多事情不是按個按鈕就會理想發生。物流區則是把所有心血匯聚成一次出貨，穩穩地送出去，才算完成了責任。輪調一圈後，更能體會工廠之所以能運作，是因為每個部門都在自己的位置上，願意把資訊講清楚，把責任扛起來。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【心得 Summary】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">這份實習很難量化，因為它更像是學著把自己丟進系統裡。我帶走的不是漂亮的數字，而是一種看事情的方式，從單點的工作，變成去理解整個流程的流動，從個人的任務，變成去感受跨部門協作的節奏。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">也因為這段經歷，我更確定自己嚮往的，不是把人生鎖在安全的範圍裡。我追求的不是特立獨行本身，而是願意讓自己投入真實世界，走進不熟悉的領域，承認落差的存在，然後用更謙虛、更務實的方式，把該有的專業一點一點填補起來。</p>
            `,

            intern_1_imgs: [
                { "src": "files/images/golden1.JPG", "caption": "與老闆的合照~" },
                { "src": "files/images/golden2.JPG", "caption": "與員工的合照~" },
                { "src": "files/images/golden3.JPG", "caption": "在品管站體驗的我~" }
            ],

            skill_2_imgs: [
                { "src": "files/images/churned rate dashboard1.png", "caption": "使用Power BI建立的客戶流失率分析儀表板" },
                { "src": "files/images/churned rate dashboard2.png", "caption": "使用Power BI key influencer分析哪個因素影響最大" },
                { "src": "files/images/amazon dashboard.png", "caption": "使用Power BI建立Amazon評論分析儀表板" }
            ],

            exp_7_role: "論文檢索增強系統建置",
            exp_7_time: "Feb 2026 – Present",
            exp_7_summary: "開發 RAG 系統解決學術資訊過載，實現自然語言問答與 APA 引用生成的自動化研究助理。",
            exp_7_tags_list: `<span class="project-tag">RAG</span><span class="project-tag">LLM</span><span class="project-tag">Docker</span><span class="project-tag">FastAPI</span><span class="project-tag">OpenSearch</span>`,
            exp_7_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【專案緣起：從家人的健康需求出發】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">因為家人的健康問題，於是我開始尋找天然的輔助方案，希望能深入了解「靈芝」等素材在免疫調節或重症輔助上的具體科學實證。</p>
                <p style="text-indent: 2em; margin-bottom: 1rem;">為了確保這些選擇安全且有效，我開始查找相關論文，試圖在 PubMed 與 Google Scholar 上尋求解答。但發現過程充滿挑戰——面對海量的學術文獻，不僅需要花費數小時逐篇檢索、下載 PDF，且文中充斥著艱澀難懂的生醫專業術語，一般人難以在短時間內消化並整合出有用的資訊。</p>
                <p style="text-indent: 2em; margin-bottom: 2rem;">這個「資訊獲取門檻」的痛點，讓我萌生了改變的念頭。所以我開發了這個 RAG（檢索增強生成）系統，旨在成為研究者與大眾之間的橋樑。透過 AI 技術，系統能自動閱讀並理解數百篇專業期刊論文，讓使用者只需用「自然語言」提問（例如：「靈芝對化療副作用有幫助嗎？」），就能獲得有憑有據、附帶 APA 引用格式的專業解答。這不只是一個問答機器人，更是一個能讓專業知識觸手可及的 24 小時學術研究助理。</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【我在這個專案中學到了什麼？】</h4>
                <p style="text-indent: 2em; margin-bottom: 1rem;">這個專案是一個完整的 End-to-End AI 系統開發實戰，讓我掌握了從數據採集到模型部署的全端技能：</p>
                
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc;">
                    <li style="margin-bottom: 0.8rem;"><strong>1. 深度 RAG 架構開發</strong><br>
                    向量檢索 (Vector Search)：學會使用 OpenSearch 進行大規模向量存儲與檢索，並實作 Hybrid Search (BM25 + Vector) 提升檢索精準度。<br>
                    文檔處理 (Document Processing)：掌握 PyMuPDF 等工具解析複雜排版的學術 PDF，並實施智能分塊 (Chunking) 策略以保留上下文語意。<br>
                    LLM 整合：利用 Ollama 本地部署 Llama 3 模型，並透過 Prompt Engineering 讓模型專注於事實回答，避免幻覺產生。</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>2. 資料工程與爬蟲</strong><br>
                    自動化數據管道：設計並實作 Airflow 概念的自動化爬蟲，定期從「靈芝新聞網」抓取最新研究，並自動下載 PDF 全文。<br>
                    資料清洗：處理非結構化數據，將 PDF 轉換為機器可讀的格式。</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>3. 微服務架構與 DevOps</strong><br>
                    Docker 化部署：將 PostgreSQL、OpenSearch、Redis、Ollama 和應用程式容器化，使用 Docker Compose 進行編排，實現「一鍵啟動」。<br>
                    系統優化：優化 Redis 快取策略與資料庫查詢效能。</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>4. 全端應用開發</strong><br>
                    後端 API：使用 FastAPI 建構高效能的 RESTful API。<br>
                    互動式前端：使用 Gradio 快速打造直觀的 Chatbot 介面，並實作即時串流回應。</li>
                </ul>
                <p style="margin-top: 20px;"><a href="https://github.com/hanssusansu/Ganoderma-Paper-RAG-System-" target="_blank" class="dashboard-btn">查看 GitHub 專案代碼</a></p>
            `,
            exp_7_imgs: [
                { "src": "files/images/rag system flow chart ch.png", "caption": "系統架構流程圖" },
                { "src": "files/images/docker screen shot.png", "caption": "Docker 容器運行狀態" },
                { "src": "files/images/rag system apply screen shot.jpg", "caption": "RAG 系統實際操作介面" }
            ]
        },

        en: {
            name: "Tzu-Heng Su",
            intro: "Bridging Data Logic & Business Intuition | Transforming Market Noise into Profitable Guidance",
            hero_subtitle: "MSc Digital Marketing & Analytics | Specializing in Market Analysis, Data Visualization & AI Applications",
            hero_tags: `<span class="hero-tag-pill">Market Analysis</span> · <span class="hero-tag-pill">Data Analytics</span> · <span class="hero-tag-pill">Machine Learning</span> · <span class="hero-tag-pill">Digital Marketing</span>`,

            // Nav
            nav_home: "Home",
            nav_edu: "Education",
            nav_exp: "Projects",
            nav_intern: "Internship",
            nav_skills: "Skills",
            nav_cert: "Certificates",
            nav_contact: "Contact",

            edu_title: "Education",
            edu_1_school: "National Kaohsiung University of Science and Technology",
            edu_1_major: "B.S. in Logistics Management",
            edu_1_time: "2020 - 2023",
            edu_2_school: "National Kaohsiung University of Science and Technology",
            edu_2_major: "M.S. in Finance",
            edu_2_time: "2023 - 2025",
            edu_3_school: "Rennes School of Business",
            edu_3_major: "MSc in Digital Marketing Management",
            edu_3_time: "2025 - 2026",

            exp_title: "Project Experience",

            exp_1_time: "Jan 2023 – Dec 2023",
            exp_1_role: "Cijin Ferry Biofuel Pricing Strategy Research",
            exp_1_summary: "Integrated TPB and VBN theories to explore consumers' willingness to pay (WTP) for green products.",
            exp_1_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Survey Research</span><span class="project-tag">Tobit Model</span>`,
            exp_1_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Exploring the Psychology of Green Pricing】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to integrate the Theory of Planned Behavior (TPB) and Value-Belief-Norm Theory (VBN) to explore consumers' willingness to pay (WTP) for green products and CSR.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Methodology & Findings】</h4>
                <p style="margin-bottom: 1rem;">The method employed the Contingent Valuation Method (CVM) for questionnaire design and used the Tobit model to correct data bias for precise estimation. The results confirmed that psychological factors and specific demographic characteristics (e.g., age, occupation) significantly affect WTP.</p>
                <p style="margin-bottom: 1rem;">It is suggested that enterprises and governments should target high-WTP groups to formulate differentiated pricing and marketing strategies, effectively transforming environmental value into market benefits.<br><br><a href="files/旗津渡輪生質能源票價研究.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_2_time: "Sep 2024 – Jul 2025",
            exp_2_role: "Infectious Medical Waste Generation Prediction",
            exp_2_summary: "Built department-level waste prediction models for Cardiology and OB/GYN to optimize hospital waste management.",
            exp_2_tags_list: `<span class="project-tag">Machine Learning</span><span class="project-tag">Python</span><span class="project-tag">SVR</span><span class="project-tag">SHAP</span>`,
            exp_2_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Solving the One-Size-Fits-All Blind Spot】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to solve medical waste management challenges by establishing department-level infectious waste prediction models specifically for Cardiology and Obstetrics & Gynecology, overcoming the limitations of traditional hospital-wide models that ignore departmental differences.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy & Tech Application】</h4>
                <p style="margin-bottom: 1rem;">The method used three patient structural indicators, compared six machine learning algorithms, and used SHAP to explain variable influence. The results showed that Support Vector Regression (SVR) performed best, and Case Mix Index (CMI) was the most critical factor affecting infectious waste generation in each department, reflecting a high correlation between disease complexity and waste volume.</p>
                <p style="margin-bottom: 1rem;">It is suggested that hospitals abandon the one-size-fits-all management model in favor of departmental differentiation strategies, establish waste warning mechanisms for high-CMI cases to allow logistics units to schedule resources in advance, integrate waste management into clinical pathways, and implement customized medical classification training based on departmental characteristics to achieve precise reduction and sustainable governance.</p>
            `,

            exp_3_time: "Sep 2025 – Oct 2025",
            exp_3_role: "Dockmate France Digital Marketing Strategy Planning",
            exp_3_summary: "Formulated a comprehensive marketing strategy for Dockmate, combining Google Ads and Influencers.",
            exp_3_tags_list: `<span class="project-tag">Digital Marketing</span><span class="project-tag">Google Ads</span><span class="project-tag">Social Media Strategy</span>`,
            exp_3_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Capturing High-Net-Worth Mindshares】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to formulate a comprehensive European market marketing strategy for the yacht remote control brand Dockmate, enhancing brand awareness and loyalty among high-net-worth clients.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy: Full-Funnel Marketing】</h4>
                <p style="margin-bottom: 1rem;">The execution strategy covered the Full-Funnel path: first, using emotional appeals of 'Fear and Peace of Mind' to resonate, and introducing e-books and webinars to acquire leads; second, using Google Ads (40% of budget) for precise keyword layout, excluding invalid traffic and targeting specific boat types; on the social front, combining million-follower influencers like Alex Jimenez and LinkedIn B2B native ads to expand volume.</p>
                <p style="margin-bottom: 1rem;">The result was not only a precise customer acquisition model integrating Google Ads, social media, and CRM automation, but also the innovative design of the 'Captains Circle' gamified loyalty program, effectively strengthening retention and word-of-mouth recommendations through tiered reward mechanisms.<br><br><a href="files/DockMate數位行銷策略規劃.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_4_time: "Sep 2025 – Dec 2025",
            exp_4_role: "E-commerce Customer Churn Analysis & Insights",
            exp_4_summary: "Analyzed key drivers behind customer churn and proposed data-driven retention strategies.",
            exp_4_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Power BI</span><span class="project-tag">Python</span><span class="project-tag">Customer Retention</span>`,
            exp_4_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Data-Driven Retention Campaign】</h4>
                <p style="margin-bottom: 1rem;">This project integrated Python and Microsoft Power BI technologies to process primitive data, visualize it, and perform algorithmic analysis, deeply analyzing the key drivers behind a high 27.49% churn rate on an e-commerce platform.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Analysis Architecture & Insights】</h4>
                <p style="margin-bottom: 1rem;">Analysis showed that 'total purchases under 3 times' was the primary churn warning signal, with a churn risk 1.68 times that of other groups; meanwhile, short average conversation time (<8.3 minutes) and low Customer Lifetime Value (<322) were also important predictive indicators.</p>
                <p style="margin-bottom: 1rem;">Based on these findings, it is suggested to establish a 7-14 day 'golden period' remarketing mechanism for customers with few purchases, designing exclusive Landing Pages and personalized EDMs, while synchronously optimizing customer service experience to improve customer stickiness and retention from the source.<br><br><a href="files/顧客流失分析.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_5_time: "Dec 2025 – Present",
            exp_5_role: "Social Media User Behavior Analysis & Prediction",
            exp_5_summary: "Built a response prediction model for green marketing posts in the French market.",
            exp_5_tags_list: `<span class="project-tag">Social Media Analytics</span><span class="project-tag">Random Forest</span><span class="project-tag">Survey</span>`,
            exp_5_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Attempting to Quantify Social Sentiment】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to build a response prediction model for green marketing posts in the French market, solving the pain point of difficulty in quantifying and predicting social content performance.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy & Modeling】</h4>
                <p style="margin-bottom: 1rem;">Combining social science and data science methods, local social user feedback was first collected through structured questionnaires, utilizing the Likert Scale to convert abstract emotional responses into quantifiable feature indicators; secondly, Random Forest and other supervised machine learning algorithms were introduced for training and performance evaluation, fully establishing a data model capable of predicting potential post interaction rates based on user sentiment scores, providing scientific decision-making reference for brands when formulating green content strategies.</p>
            `,

            exp_6_time: "Jan 2026 – Present",
            exp_6_role: "Building Personal Website",
            exp_6_summary: "A personal brand website built from scratch using Google AntiGravity AI environment.",
            exp_6_tags_list: `<span class="project-tag">Web Development</span><span class="project-tag">AI Agent</span><span class="project-tag">Prompt Engineering</span>`,
            exp_6_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Verifying the AI Development Revolution】</h4>
                <p style="margin-bottom: 1rem;">The birth of this project stems from my desire to personally verify a revolution that is taking place. I used Google's latest AI development environment, AntiGravity, to build the personal website you see now from scratch. For me, this is not just to build a space to store my portfolio, but a practical experiment on "Agentic Workflow". I tried to understand how AI, when it is no longer just a passive Q&A machine but an agent that can actively perform tasks, will completely change my past patterns of using tools and my logic for solving problems.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Reflection: From Developer to AI PM】</h4>
                <p style="margin-bottom: 1rem;">In the development process, I did not position myself as a traditional programmer, but turned into the project manager of this AI engineer. I didn't need to type every line of code by hand, nor did I need to memorize tedious syntax. My core work shifted to precise instruction giving and resource control. Just like managing production capacity in a factory, I had to think about how to exchange the fewest dialogue turns for the richest web functions and content within AntiGravity's limited Token quota. Every Prompt is like a standard work order issued to the production line; the more precise the instructions, the higher the yield rate. This made me deeply realize that in the AI era, the ability to "ask the right questions" has long surpassed the ability to "write the answers".</p>
                
                <p style="margin-bottom: 1rem;">Of course, the process was not smooth sailing. When the layout broke or functions reported errors, I did not choose to take over and rewrite it, but insisted on using the built-in AI Agent for debugging. I asked it not only to fix the error but also to explain the cause of the error, letting me understand which part of the syntax logic caused the conflict. Through this cycle of "command and feedback", I not only successfully eliminated problems but also deeply mastered the keys to avoiding future repetition of mistakes. This experience convinced me that future competitiveness lies not in who can write the most perfect code, but in who can command AI to complete the most complex tasks with the clearest logic.</p>
            `,

            // Images Captions (EN)
            exp_2_imgs: [
                { "src": "files/images/機器學習模型預測結果.png", "caption": "Comparison of Machine Learning Model Prediction Performance" },
                { "src": "files/images/W51 shap summary plot.png", "caption": "SHAP Summary Plot - Cardiology" },
                { "src": "files/images/W51 因子重要性.png", "caption": "Factor Importance Analysis - Cardiology" }
            ],

            skills_title: "Skills",
            skills_summary: "Specialize in the end-to-end data analysis process, from market data collection, data cleaning, and visualization to machine learning modeling and strategic recommendations.",
            skill_cat_1: "Data & AI",
            skill_list_1: `
                <div class="skill-item-pill">Machine Learning</div>
                <div class="skill-item-pill">Python (Pandas, Scikit-learn)</div>
                <div class="skill-item-pill">SQL & Database</div>
                <div class="skill-item-pill">RAG System Design</div>
                <div class="skill-item-pill">Data Visualization</div>
            `,
            skill_cat_2: "Marketing & Business",
            skill_list_2: `
                <div class="skill-item-pill">Market Analysis</div>
                <div class="skill-item-pill">Digital Marketing Strategy</div>
                <div class="skill-item-pill">Performance Ads (Google)</div>
                <div class="skill-item-pill">Social Media Analytics</div>
                <div class="skill-item-pill">Consumer Behavior</div>
            `,
            skill_cat_3: "Tools & Platforms",
            skill_list_3: `
                <div class="skill-item-pill">Power BI</div>
                <div class="skill-item-pill">Google Analytics 4 (GA4)</div>
                <div class="skill-item-pill">Google Ads</div>
                <div class="skill-item-pill">HubSpot</div>
                <div class="skill-item-pill">AntiGravity / GitHub</div>
            `,

            hint_text: "(Click for more info)",

            contact_title: "Contact Me",
            contact_btn: "Email",

            about_btn: "About Me",
            about_desc: `
                <p style="margin-bottom: 2rem;">Hello, I am Tzu-Heng Su. My personality is defined by a balance of steady analysis and active exploration. I am accustomed to thinking deeply to clarify the essence of problems, but I am equally happy to embrace the unknown. This curiosity led me to build a diverse academic background. I started with Logistics Management in Taiwan, moved into Finance to understand capital valuation, and finally studied Digital Marketing Management in France to grasp market dynamics.</p>
                
                <p style="margin-bottom: 2rem;">I aspire to be a multifaceted talent who can combine process efficiency, financial logic, and consumer insights. By speaking the language of data, I hope to assist enterprises in making precise and strategic decisions.</p>
                
                <p style="margin-bottom: 1rem;">My adaptability extends beyond the classroom. As a solo traveler who has explored France extensively, I have learned to solve problems independently and navigate unfamiliar environments with confidence. Whether I am facing a strange city or a complex data project, I believe that staying open and continuously learning is the key to finding the best solution.</p>
            `,

            view_details_btn: "View Details",

            cert_title: "Certificates & Proof of Ability",

            cert_subtitle_prof: "Professional Certificates",
            cert_1_name: "Production Management Certificate",
            cert_1_detail: "Chinese Institute of Industrial Engineers (CIIE)<br><span class=\"cert-date\">July 2022</span>",
            cert_2_name: "ESG Literacy Certificate (Professional & Advanced)",
            cert_2_detail: "IPOE<br><span class=\"cert-date\">Dec 2023</span>",
            cert_3_name: "Net Zero Planning Manager",
            cert_3_detail: "Industrial Development Administration (IPAS)<br><span class=\"cert-date\">Dec 2024</span>",
            cert_4_name: "AI Application Planning Manager",
            cert_4_detail: "Industrial Development Administration (IPAS)<br><span class=\"cert-date\">May 2025</span>",
            cert_google_name: "Google AI-Powered Performance Ads Certification",
            cert_google_detail: "Google<br><span class=\"cert-date\">Aug 2025</span>",
            cert_hubspot_name: "Social Media Certified",
            cert_hubspot_detail: "HubSpot Academy<br><span class=\"cert-date\">Aug 2025</span>",

            cert_subtitle_lang: "Language Proficiency",
            cert_5_name: "TOEIC",
            cert_5_detail: "Score: 810<br><span class=\"cert-date\">Dec 2024</span>",

            cert_subtitle_course: "Courses",
            cert_6_name: "Udemy Power BI Certificate Prep Course",
            cert_6_detail: "Udemy<br><span class=\"cert-date\">Jan 2026</span>",

            view_cert_btn: "View Certificate",

            resume_btn: "Download CV",

            intern_title: "Internship Experience",
            intern_1_title: "Golden Corporation Sdn Bhd | Plant Intern",
            intern_1_time: "Jul 2023 - Aug 2023",
            intern_1_desc: "Rotated through storage, production, quality control, and aquaculture, assisting in process optimization and basic reporting.",

            intern1role: "Golden Corporation Sdn Bhd | Plant Intern",
            intern1detail: `
                <p style="margin-bottom: 1rem;">In the summer between my junior and senior years, to step out of my comfort zone, I chose to go to Brunei for an internship. I have always liked to try boldly and also liked to take a life path different from others. At the same time, I also wanted to step out of the textbooks and see with my own eyes what the difference is between what I learned and actual operations.</p>
                
                <p style="margin-bottom: 1rem;">My internship period was from July 1, 2023 to August 31, 2023. The position was Plant Intern, and the internship location was Golden Corporation Sdn Bhd in Brunei.</p>
                <p style="margin-bottom: 2rem;">The design of this internship was not to fix me in a single position, but to let me rotate through various workstations, including warehousing, production lines, quality control laboratories, shrimp farms, and logistics areas. When I walked through these stations, I realized that a factory is not supported by a certain department alone, but is more like a web that affects each other.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Warehousing】</h4>
                <p style="margin-bottom: 1.5rem;">Warehousing is like the starting point. I started to care about how materials are placed, how they are found, and how they match subsequent needs. That is a very simple sense of order, but it is also the basic skill that is most easily overlooked, because as long as the starting point is messy, every subsequent step takes more effort to pull it back.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Production Line】</h4>
                <p style="margin-bottom: 1.5rem;">The production line is like the rhythm itself. I saw how standardization makes daily output more consistent, and also saw how the site uses experience to fill in the corners not written in the standards. At that moment, I understood that the process does not run itself just because it is written on paper. It relies on people to guard it, rely on people to pick it up, and rely on people to make every handover clearer.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【QC Lab】</h4>
                <p style="margin-bottom: 1.5rem;">Walking into the quality control laboratory, the feeling was different again. There, quality is a language that must be recorded, judged, and communicated. I began to understand that the site and the laboratory are actually talking about the same thing, just standing in different positions and using different ways to make things go in a more stable direction.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Farms & Logistics】</h4>
                <p style="margin-bottom: 1.5rem;">The shrimp farm let me see the reality at the front end. Many things do not happen ideally just by pressing a button. The logistics area is like gathering all efforts into one delivery. Going out and delivering steadily counts as completing the responsibility. After the rotation, I could understand better that the reason why the factory works is because every department is willing to explain information clearly and take responsibility in their own position.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Summary】</h4>
                <p style="margin-bottom: 1rem;">This internship is hard to quantify because it is more like learning to throw myself into the system. What I took away was not beautiful numbers, but a way of seeing things, moving from single-point work to understanding the entire process, and from personal tasks to the rhythm of cross-departmental collaboration.</p>
                <p style="margin-bottom: 1rem;">Also because of this experience, I am more certain that what I yearn for is not to lock my life in a safe range. What I pursue is not being different itself, but being willing to put myself into the real world, walk into unfamiliar fields, admit the existence of gaps, and use a more humble and practical way to fill up the required professionalism bit by bit.</p>
            `,

            intern_1_imgs: [
                { "src": "files/images/golden1.JPG", "caption": "Photo with the Boss~" },
                { "src": "files/images/golden2.JPG", "caption": "Photo with Staff~" },
                { "src": "files/images/golden3.JPG", "caption": "Experiencing the QC Station~" }
            ],

            skill_2_imgs: [
                { "src": "files/images/churned rate dashboard1.png", "caption": "Customer Churn Rate Analysis Dashboard built with Power BI" },
                { "src": "files/images/churned rate dashboard2.png", "caption": "Using Power BI Key Influencer to analyze which factor has the greatest impact" },
                { "src": "files/images/amazon dashboard.png", "caption": "Amazon Review Analysis Dashboard built with Power BI" }
            ],

            exp_7_role: "Paper RAG System Construction",
            exp_7_time: "Feb 2026 – Present",
            exp_7_summary: "Developed a RAG system to solve scientific information overload, enabling natural language QA and automated APA citation generation.",
            exp_7_tags_list: `<span class="project-tag">RAG</span><span class="project-tag">LLM</span><span class="project-tag">Docker</span><span class="project-tag">FastAPI</span><span class="project-tag">OpenSearch</span>`,
            exp_7_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Starting from Family Health Needs】</h4>
                <p style="margin-bottom: 1rem;">Due to family health issues, I began looking for natural adjuvant solutions, hoping to deeply understand the specific scientific evidence of ingredients like "Reishi" (Ganoderma) in immunomodulation or critical care support.</p>
                <p style="margin-bottom: 1rem;">To ensure these choices were safe and effective, I started searching for relevant papers, trying to find answers on PubMed and Google Scholar. However, I found the process full of challenges—facing a massive amount of academic literature, it not only required spending hours searching and downloading PDFs one by one, but the texts were also filled with obscure biomedical terminology, making it difficult for the average person to digest and integrate useful information in a short time.</p>
                <p style="margin-bottom: 2rem;">This pain point of "information access barrier" gave me the idea to make a change. So I developed this RAG (Retrieval-Augmented Generation) system, aiming to bridge the gap between researchers and the general public. Through AI technology, the system can automatically read and understand hundreds of professional journal papers, allowing users to simply ask questions in "natural language" (e.g., "Does Reishi help with chemotherapy side effects?") and receive grounded answers complete with APA citations. This is not just a Q&A bot, but a 24/7 academic research assistant that makes professional knowledge accessible.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【What I Learned】</h4>
                <p style="margin-bottom: 1rem;">This project was a complete End-to-End AI system development experience, allowing me to master full-stack skills from data collection to model deployment:</p>
                
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc;">
                    <li style="margin-bottom: 0.8rem;"><strong>1. Deep RAG Architecture Development</strong><br>
                    Vector Search: Mastered using OpenSearch for large-scale vector storage and retrieval, and implemented Hybrid Search (BM25 + Vector) to improve accuracy.<br>
                    Document Processing: Mastered tools like PyMuPDF to parse complex academic PDF layouts and implemented intelligent chunking strategies to preserve context.<br>
                    LLM Integration: Locally deployed Llama 3 models using Ollama and utilized Prompt Engineering to focus the model on factual answers and avoid hallucinations.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>2. Data Engineering & Crawling</strong><br>
                    Automated Data Pipelines: Designed and implemented Airflow-concept automated crawlers to regularly fetch the latest research from sources like "Reishi News" and automatically download full-text PDFs.<br>
                    Data Cleaning: Processed unstructured data, converting PDFs into machine-readable formats.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>3. Microservices & DevOps</strong><br>
                    Containerization: Containerized PostgreSQL, OpenSearch, Redis, Ollama, and applications using Docker Compose for "one-click startup".<br>
                    System Optimization: Optimized Redis caching strategies and database query performance.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>4. Full-Stack Application Development</strong><br>
                    Backend API: Built high-performance RESTful APIs using FastAPI.<br>
                    Interactive Frontend: Used Gradio to quickly build intuitive Chatbot interfaces and implemented real-time streaming responses.</li>
                </ul>
                <p style="margin-top: 20px;"><a href="https://github.com/hanssusansu/Ganoderma-Paper-RAG-System-" target="_blank" class="dashboard-btn">View GitHub Repository</a></p>
            `,
            exp_7_imgs: [
                { "src": "files/images/rag system flow chart eng.png", "caption": "System Architecture Flowchart" },
                { "src": "files/images/docker screen shot.png", "caption": "Docker Container Status" },
                { "src": "files/images/rag system apply screen shot.jpg", "caption": "RAG System UI" }
            ]
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key] != null) {
                // Use innerHTML to handle HTML content (e.g., skill lists, detailed project info)
                el.innerHTML = translations[lang][key];
            }
        });

        // Update descriptions and image lists stored in attributes
        document.querySelectorAll('.skill-tag, .interactive-item, .about-btn').forEach(item => {
            const descKey = item.getAttribute('data-desc-key');
            if (descKey && translations[lang] && translations[lang][descKey] != null) {
                item.setAttribute('data-desc', translations[lang][descKey]);
            }
            const imagesKey = item.getAttribute('data-images-key');
            if (imagesKey && translations[lang] && translations[lang][imagesKey]) {
                item.setAttribute('data-images', JSON.stringify(translations[lang][imagesKey]));
            }
        });

        if (langBtn) {
            langBtn.textContent = lang === 'zh' ? 'EN / 中' : '中 / EN';
        }
    }

    // Modal click handler update (dynamic content)
    document.querySelectorAll('.skill-tag, .interactive-item, .about-btn').forEach(item => {
        item.addEventListener('click', () => {
            let title = item.textContent.trim();
            // Adjust title extraction for complex items
            const h3 = item.querySelector('h3');
            if (h3) title = h3.textContent.trim();
            // Special case for 'About Me' button which has no h3
            if (item.classList.contains('about-btn')) {
                title = translations[currentLang]['about_btn']; // Use translated title
            }

            // NEW LOGIC: Look up directly from translations object to ensure HTML is preserved
            const descKey = item.getAttribute('data-desc-key');
            let desc = '';
            if (descKey && translations[currentLang] && translations[currentLang][descKey]) {
                desc = translations[currentLang][descKey];
            } else {
                desc = item.getAttribute('data-desc') || '';
            }

            modalTitle.textContent = title;
            modalDesc.innerHTML = desc;

            modalImagesContainer.innerHTML = '';
            const imagesData = item.getAttribute('data-images');
            if (imagesData) {
                try {
                    const images = JSON.parse(imagesData);
                    images.forEach(imgData => {
                        const imageItem = document.createElement('div');
                        imageItem.className = 'modal-image-item';

                        const img = document.createElement('img');
                        img.src = imgData.src;
                        img.alt = imgData.caption || '';

                        const caption = document.createElement('p');
                        caption.className = 'modal-image-caption';
                        caption.textContent = imgData.caption || '';

                        imageItem.appendChild(img);
                        imageItem.appendChild(caption);
                        modalImagesContainer.appendChild(imageItem);
                    });
                } catch (e) {
                    console.error('Error parsing images data:', e);
                }
            }
            modal.classList.add('active');
        });
    });

    // Hamburger Logic (Existing)
    if (hamburgerBtn && sideNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            sideNav.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !sideNav.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                sideNav.classList.remove('active');
            }
        });
    }

    // Lang Switch Logic
    updateLanguage(currentLang);
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'zh' ? 'en' : 'zh';
            updateLanguage(currentLang);
        });
    }

    // ==========================================
    // 5. HTML Custom Cursor & Real Animations
    // ==========================================

    // Create cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track movement
    // Halo is 40x40, center is 20,20
    document.addEventListener('mousemove', (e) => {
        const offset = 20;

        cursor.style.setProperty('--x', (e.clientX - offset) + 'px');
        cursor.style.setProperty('--y', (e.clientY - offset) + 'px');

        // Apply basic transform for idle state if not animating
        if (!cursor.classList.contains('clicking')) {
            cursor.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`;
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            // Trigger Click/Poke Animation
            cursor.classList.remove('clicking');
            void cursor.offsetWidth; // trigger reflow
            cursor.classList.add('clicking');

            // Trigger Data Ripple
            createDataRipple(e.clientX, e.clientY);
        }
    });

    // Clean up animation class
    cursor.addEventListener('animationend', () => {
        cursor.classList.remove('clicking');
    });

    function createDataRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('data-ripple');
        // Position handled by CSS transform translate(-50%, -50%) combined with top/left
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
        }, 600); // Match animation duration
    }


});
