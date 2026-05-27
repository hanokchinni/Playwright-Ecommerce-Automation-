class HomePage
{
    constructor(page)
    {
        this.page = page

        //navbar

        this.home       = page.locator('[href="/"]')
        this.signupLoginBtn  = page.getByRole('link', { name: ' Signup / Login' })
        this.productsBtn  = page.locator('[href="/products"]') 
        this.cartBtn     = page.getByRole('link', { name: 'Cart' })
        this.logoutBtn    = page.locator('[href="/logout"]')
        this.delete     = page.locator('[href="/delete_account"]')
        this.contactUsBtn    = page.locator ('[href="/contact_us"]')
        this.loggedUser = page.locator ('a:has-text("Logged in as")')

        //home
        this.logo       = page.locator('#header .logo')
        this.slider     = page.locator('#slider-carousel')
        this.subHeading = page.getByText('Full-Fledged practice website for Automation Engineers');
        this.prevArrow  = page.locator('[data-slide="prev"]')
        this.nextArrow  = page.locator('data-slide="next"')



        //category 

        this.categorySection    = page.locator('.left-sidebar');
        this.womenSection       = page.locator('[href="#Women"]')
        this.womenDress         = page.locator('[href="/category_products/1"]');
        this.womenTops          = page.locator('[href="/category_products/2"]');
        this.womenSaree         = page.locator('[href="/category_products/7"]');
        this.menSection         = page.locator('[href="#Men"]')
        this.menTshirts         = page.locator('[href="/category_products/3"]');
        this.menJeans           = page.locator('[href="/category_products/6"]');
        this.kidsSection        = page.locator('[href="#Kids"]');
        this.kidsDress          = page.locator('[href="/category_products/4"]');
        this.kidsTopsShirts     = page.locator('[href="/category_products/5"]');
        

        //brands

        this.brandsSidebar      = page.locator('.brands_products');
        this.brandPolo          = page.locator('[href="/brand_products/Polo"]');
        this.brandHM            = page.locator('[href="/brand_products/H&M"]');
        this.brandMadame        = page.locator('[href="/brand_products/Madame"]');
        this.brandMastHarbour   = page.locator('[href="/brand_products/Mast & Harbour"]');
        this.brandBabyhug       = page.locator('[href="/brand_products/Babyhug"]');
        this.brandAllenSolly    = page.locator('[href="/brand_products/Allen Solly Junior"]');
        this.brandKookieKids    = page.locator('[href="/brand_products/Kookie Kids"]');
        this.brandBiba          = page.locator('[href="/brand_products/Biba"]');


        //featured products

        this.featuredHeading    = page.locator('h2.title.text-center');
        this.productCards       = page.locator('.productinfo');
        this.addToCartBtns      = page.locator('.productinfo .add-to-cart');
        this.viewProductLinks   = page.locator('a:has-text("View Product")');


        //cart- modal

        this.addedModal         = page.locator('.modal-content')
        this.modalText          = page.locator('.modal-title ')
        this.modalViewCartBtn   = page.locator('a').filter({ hasText: 'View Cart' })
        this.modalContinueBtn   = page.locator('button:has-text("Continue Shopping")')

        //recommended items
         this.recommendedSection    = page.locator('h2:has-text("recommended items")');
        this.recommendedCarousel   = page.locator('#recommended-item-carousel');
        this.recommendedAddToCart  = page.locator('#recommended-item-carousel .add-to-cart');

        //subscribe
         this.subscribeHeading   = page.locator('h2:has-text("Subscription")');
         this.subscribeEmail     = page.locator('#susbscribe_email');
         this.subscribeBtn       = page.locator('#subscribe');
         this.subscribeSuccess   = page.locator('#success-subscribe');

         //scroll-up
         this.scrollUpBtn        = page.locator('#scrollUp');


         //footer

         this.footer             = page.locator('footer');
         this.copyrightText      = page.locator('footer p');

    }


    //navigation---------------------------------

    async goto()
    {
        await this.page.goto('/')
    }

   

    async navigateToLogin() {
    await this.signupLoginBtn.click();
    }

    async navigateToProducts() {
    await this.productsBtn.click();
    }

    async navigateToCart() {
    await this.cartBtn.click();
    }

    async navigateToContactUs() {
    await this.contactUsBtn.click();
    }

    //user actions------------------------------

     async logout() {
    await this.logoutBtn.click();
    }

     async deleteAccount() {
    await this.delete.click();
    }


    // ── Category Actions ----------------
    async clickWomenCategory() {
        await this.womenCategory.click();
    }

    async clickMenCategory() {
        await this.menCategory.click();
    }

    async clickKidsCategory() {
        await this.kidsCategory.click();
    }


    //brand
    async clickBrand(brandName)
    {
        await this.page.locator(`[href="/brand_products/${brandName}"]`).click()  //dynamically looping the same type
    }


    //addproduct

    async addProductToCart(index)
    {
        await this.productCards.nth(index).hover()            //dynamically using the index for the products
        await this.addToCartBtns.nth(index).click();
    }

    // continue shopping in modal
    async continueShopping() {
    await this.modalContinueBtn.click();
    }


    
   async viewCartFromModal() {
    await this.modalViewCartBtn.click();
    }

    //recommended items
     async addRecommendedProductToCart(index) {
    await this.recommendedAddToCart.nth(index).click();
    }

    //subscription

    async subscribeWithEmail(email) {
    //await this.scrollToBottom();
    await this.subscribeEmail.fill(email);
    await this.subscribeBtn.click();
    }

    //scroll up
     async scrollToTop() {
    await this.scrollUpBtn.click();
    }

    async closeAdIfPresent() {
    try {
        // ── Try direct close button first ────────────────
        const closeSelectors = [
            'button[id*="close"]',
            'a[id*="close"]',
            'button[class*="close"]',
            '[aria-label*="close" i]',
            '[aria-label*="dismiss" i]'
        ];

        for (const selector of closeSelectors) {
            const btn = this.page.locator(selector).first();
            if (await btn.isVisible({ timeout: 1000 })) {
                await btn.click();
                return;
            }
        }

        // ── Try inside iframe ─────────────────────────────
        const frames = this.page.frames(); // ✅ use frames() not frameLocator()
        for (const frame of frames) {
            const frameClose = frame.locator('button, a').filter({ hasText: /close|dismiss|skip/i }).first();
            try {
                if (await frameClose.isVisible({ timeout: 1000 })) {
                    await frameClose.click();
                    return;
                }
            } catch {
                continue; // frame may have detached — skip it
            }
        }

        // ── Press Escape as last resort ───────────────────
        await this.page.keyboard.press('Escape');

    } catch {
        // No ad — continue
    }
}


}

module.exports ={HomePage}