import { test, expect } from '@playwright/test';
import { error } from 'console';

test('has title', async ({ page }) => {
    // Navigate to Google
    await page.goto('https://www.google.com');
  
    // Handle language popup (if shown)
    const languageButton = page.getByRole('button', { name: /Idioma:|Language:/i });
    if (await languageButton.isVisible()) {
      await languageButton.click();
      const englishUKOption = page.getByRole('menuitem', { name: 'English (United Kingdom)' }).first();
      await englishUKOption.click();
      await page.waitForTimeout(1000);
    }
  
    // Accept cookies (if shown)
    const cookieAcceptBtn = page.getByRole('button', { name: /Accept all/i });
    if (await cookieAcceptBtn.isVisible()) {
      await cookieAcceptBtn.click();
      await page.waitForTimeout(500); 
    }
  
    // Search for "automation"
    await page.fill('textarea[name="q"]', 'automation');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('domcontentloaded');
  
    // Find the Wikipedia link
    const wikiLink = page.locator('a:has-text("Wikipedia")').first();
    const wikiURL = await wikiLink.getAttribute('href');
    console.log('Wikipedia URL:', wikiURL);
  
    // Navigate to the Wikipedia page
    if (wikiURL) {
      await page.goto(wikiURL);
    } else {
      throw new Error('Wikipedia link not found');
    }
    /*
    const paragraphs = await page.locator('p').allTextContents();
    const keywords = [
        'first fully automated',
        'first automatic process',
        'first automation',
        'earliest automation'
      ];
      let foundYear = 'Not found';

      for (const paragraph of paragraphs) {
        const lower = paragraph.toLowerCase();
        if (keywords.some(keyword => lower.includes(keyword))) {
            const words = paragraph.split(/\s+/); 

            for (const word of words) {
                const cleanWord = word.replace(/[^\d]/g, ''); // remove non-digits
                const year = parseInt(cleanWord);
                if (year >= 1500 && year <= 2025) {
                    foundYear = year.toString();
                    console.log('\n Found description:', paragraph);
                    break;
                  }
                }
            
                if (foundYear !== 'Not found') break;
              }
            }
            
            console.log('\n Year found:', foundYear);

      */
  });
  

test.only('has automation', async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Automation');
    await page.waitForLoadState('domcontentloaded');
   /* const bodyText = await page.textContent('body');
    if (bodyText.includes('1785')) {
        console.log('1785 found in the page!');
    } else {
        console.log('1785 not found.');
      }*/

        const paragraphs = await page.locator('p').allTextContents();
        const keywords = [
            'first fully automated',
            'first automatic process',
            'first automation',
            'earliest automation'
          ];
          let foundYear = 'Not found';
    
          for (const paragraph of paragraphs) {
            const lower = paragraph.toLowerCase();
            if (keywords.some(keyword => lower.includes(keyword))) {
                const words = paragraph.split(/\s+/); 
    
                for (const word of words) {
                    const cleanWord = word.replace(/[^\d]/g, ''); // remove non-digits
                    const year = parseInt(cleanWord);
                    if (year >= 1500 && year <= 2025) {
                        foundYear = year.toString();
                        console.log('\n Found description:', paragraph);
                        break;
                      }
                    }
                
                    if (foundYear !== 'Not found') break;
                  }
                }
                
                console.log('\n Year found:', foundYear);
});

