// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector("#navMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/**
 * Formspree AJAX submit
 * Works with your endpoint because each <form> has action="https://formspree.io/f/xzddndwl"
 */
async function wireFormspree(formId, okId, errId) {
  const form = document.getElementById(formId);
  const ok = document.getElementById(okId);
  const err = document.getElementById(errId);
  if (!form || !ok || !err) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    ok.hidden = true;
    err.hidden = true;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Sending…";
    }

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        ok.hidden = false;
        // auto-hide success after a bit
        setTimeout(() => { ok.hidden = true; }, 6000);
      } else {
        err.hidden = false;
      }
    } catch (ex) {
      err.hidden = false;
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText || "Send";
      }
    }
  });
}

wireFormspree("sellerForm", "sellerSuccess", "sellerError");
wireFormspree("investorForm", "investorSuccess", "investorError");
wireFormspree("contactForm", "contactSuccess", "contactError");
