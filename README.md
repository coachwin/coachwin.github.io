# Weight Loss Quiz: setup guide

## Files
- `index.html`: the whole website (landing page, quiz, result, Calendly booking)
- `google-sheet-script.gs`: saves every lead to a Google Sheet (optional, but recommended)
- `img/`: create this folder for your photos (see step 1)

## 1. Add your photos
Create these files (JPG; keep each under ~400 KB):
- `img/coach.jpg`: hero photo (portrait, 4:5). Already added.
- `img/me-before.jpg` / `img/me-after.jpg`: your own transformation in the "My story" section (3:4). Already added.
  Your numbers (`stats`) and story (`story`, BM + EN) are in the settings at the top of `index.html`.
- `img/results/01.jpg` … `43.jpg`: client results (already added from the WDT Canva design; 9 show first, the rest appear under "See more results")

To add a result, export it from Canva at 1080×1350, save it as the next number (`44.jpg`), and raise `resultsCount` in `index.html`.
Only use results you have permission to share. The page says they come from the WDT coaching team.

## 2. Edit your text
At the top of the `<script>` in `index.html`, under **1. EDIT THESE SETTINGS**: brand, name, bio, Calendly link, and `defaultLang`.
All page wording is under **2. WORDING** (an `en:` block and an `ms:` block). The questions, root causes and tips are under **3. QUIZ QUESTIONS**,
each written as `{en:"…", ms:"…"}`. When you change one language, change the other one too.

## Languages (BM / EN)
- The page opens in **Bahasa Melayu** by default (`defaultLang: "ms"`). Change it to `"en"` for English first.
- Visitors can switch any time with the **BM | EN** button (top of the page and inside the quiz). Their choice is remembered.
- To force a language from a link, add `lang=`: `…/quiz/?lang=en&src=ig`
- Answers are always saved to your Sheet and Calendly **in English**, with a "Language" column showing which version the lead used.

## 3. Show quiz answers in Calendly (2 min)
Calendly → your "free_consult" event → **Booking questions** → make the **first** custom question
"Quiz result" (multi-line, optional). The quiz fills it in automatically, so the booking email shows
the lead's weakest side, scores, commitment and WhatsApp number.

## 4. Save leads to Google Sheets (5 min)
1. Create a new Google Sheet → **Extensions → Apps Script**.
2. Delete the sample code and paste in everything from `google-sheet-script.gs`. Save.
3. **Deploy → New deployment → type: Web app**. Execute as: *Me*. Who has access: *Anyone*. Deploy, then approve the permissions.
4. Copy the Web app URL (ends in `/exec`) and paste it into `sheetUrl: ""` in `index.html`.

You'll get a **Leads** tab (one row per lead; "Hot lead = YES" means book them first, "Booked?" fills in when they book)
and a **Funnel** tab (start → halfway → lead → booked, so you can see where people drop off).

## 5. Put it online for free (GitHub Pages)
1. Make a free account at github.com → **New repository** (for example `quiz`), set to Public.
2. **Add file → Upload files** → drag in `index.html` and the `img` folder → Commit.
3. **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` / root → Save.
4. After about a minute your link is `https://YOURNAME.github.io/quiz/`.

## 6. Links for your bio
Add `?src=` so the Sheet shows where each lead came from:
- Instagram: `https://YOURNAME.github.io/quiz/?src=ig`
- TikTok: `https://YOURNAME.github.io/quiz/?src=tiktok`
- Threads: `https://YOURNAME.github.io/quiz/?src=threads`

## Who gets the booking calendar straight away?
"Hot leads" see Calendly embedded right away: they want to start within a month, rate commitment 7+, and are open to investing.
Everyone else gets a free tip and a "Book my free call" button. Change the rule in `qualifies()` in `index.html`.
