//Page Heading & Search
// Product Cards
// Add to Cart Modal
// Product Detail Page
// Review Section
// Category Sidebar
// Brands Sidebar
// Subscription


class ProductPage
{
    constructor(page)
    {
        this.page = page;


        // prodcut heading
        this.allProductsHeading = page.locator('.features_items h2.title.text-center');


        //search-products

        this.searchInput         = page.locator('#search_product');
        this.searchBtn           = page.locator('#submit_search');
        this.searchedHeading     = page.locator('h2:has-text("Searched Products")');
        this.searchedProducts    = page.locator('.productinfo');

        //  Product Cards 
        this.productCards        = page.locator('.single-products');
        this.productImages       = page.locator('.productinfo img');
        this.productNames        = page.locator('.productinfo p');
        this.productPrices       = page.locator('.productinfo h2');
        this.addToCartBtns       = page.locator('.productinfo .add-to-cart');
        this.viewProductLinks    = page.locator('a:has-text("View Product")');

        //cart-model
        this.modalSuccess        = page.locator('#cartModal');
        this.modalTitle          = page.locator('#cartModal h4.modal-title');
        this.modalViewCartBtn    = page.locator('u:has-text("View Cart")');
        this.modalContinueBtn    = page.locator('button:has-text("Continue Shopping")');


        

        //  Product Detail Page 
        this.productDetailName        = page.locator('.product-information h2');
        this.productDetailCategory    = page.locator('.product-information p').first();
        this.productDetailPrice       = page.locator('.product-information span span');
        this.productDetailAvailability = page.locator('p:has-text("Availability")');
        this.productDetailCondition   = page.locator('p:has-text("Condition")');
        this.productDetailBrand       = page.locator('p:has-text("Brand")');
        this.quantityInput            = page.locator('#quantity');
        this.addToCartDetailBtn       = page.locator('button:has-text("Add to cart")');


        //  Review Section 
        this.writeReviewHeading  = page.locator('a:has-text("Write Your Review")');
        this.reviewName          = page.locator('#name');
        this.reviewEmail         = page.locator('#email');
        this.reviewText          = page.locator('#review');
        this.reviewSubmitBtn     = page.locator('#button-review');
        this.reviewSuccessMsg    = page.locator('div.alert-success span');


       //  Category Sidebar 
        this.categorySection     = page.locator('.left-sidebar');
        

        // Women
        this.womenCategory       = page.locator('a[href="#Women"]');
        this.womenDress          = page.locator('a[href="/category_products/1"]');
        this.womenTops           = page.locator('a[href="/category_products/2"]');
        this.womenSaree          = page.locator('a[href="/category_products/7"]');

        // Men
        this.menCategory         = page.locator('a[href="#Men"]');
        this.menTshirts          = page.locator('a[href="/category_products/3"]');
        this.menJeans            = page.locator('a[href="/category_products/6"]');

        // Kids
        this.kidsCategory        = page.locator('a[href="#Kids"]');
        this.kidsDress           = page.locator('a[href="/category_products/4"]');
        this.kidsTopsShirts      = page.locator('a[href="/category_products/5"]');

        // Category Page Heading
        this.categoryPageHeading = page.locator('h2.title.text-center');


        /// Brands Sidebar
        this.brandsSidebar       = page.locator('.brands_products');
        this.brandsHeading       = page.locator('.brands_products h2');

        // Individual Brands
        this.brandPolo           = page.locator('a[href="/brand_products/Polo"]');
        this.brandHM             = page.locator('a[href="/brand_products/H&M"]');
        this.brandMadame         = page.locator('a[href="/brand_products/Madame"]');
        this.brandMastHarbour    = page.locator('a[href="/brand_products/Mast & Harbour"]');
        this.brandBabyhug        = page.locator('a[href="/brand_products/Babyhug"]');
        this.brandAllenSolly     = page.locator('a[href="/brand_products/Allen Solly Junior"]');
        this.brandKookieKids     = page.locator('a[href="/brand_products/Kookie Kids"]');
        this.brandBiba           = page.locator('a[href="/brand_products/Biba"]');

        // Brand Page Heading
        this.brandPageHeading    = page.locator('.features_items h2.title');




        //subscription

        // ── Subscription ─────────────────────────────────────────
        this.subscriptionHeading = page.locator('h2:has-text("Subscription")');
        this.subscribeEmail      = page.locator('#susbscribe_email');
        this.subscribeBtn        = page.locator('#subscribe');
        this.subscribeSuccess    = page.locator('#success-subscribe');

    }

        // ── Navigation ───────────────────────────────────────────
        async goto() {
            await this.page.goto('/products');
        }

        // ── Search ───────────────────────────────────────────────
        async searchProduct(name) {
            await this.searchInput.fill(name);
            await this.searchBtn.click();
            }

        // ── Product Card Actions ──────────────────────────────────
        async hoverAndAddToCart(index) {
        await this.productCards.nth(index).hover({ force: true });
        await this.addToCartBtns.nth(index).click({ force: true });
}

        async viewProduct(index) {
            await this.viewProductLinks.nth(index).click();
        }

        // ── Modal Actions ─────────────────────────────────────────
        async continueShopping() {
            await this.modalContinueBtn.click();
        }

        async viewCartFromModal() {
            await this.modalViewCartBtn.click();
        }

        // ── Product Detail Actions ────────────────────────────────
        async setQuantity(qty) {
            await this.quantityInput.clear();
            await this.quantityInput.fill(String(qty));
        }

        async addToCartFromDetail() {
            await this.addToCartDetailBtn.click();
        }

        // ── Review Actions ────────────────────────────────────────
        async submitReview(name, email, review) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.reviewName.fill(name);
            await this.reviewEmail.fill(email);
            await this.reviewText.fill(review);
            await this.reviewSubmitBtn.click();
        }

        // ── Category Actions ──────────────────────────────────────
        async clickWomenCategory() {
            await this.womenCategory.click();
        }

        async clickMenCategory() {
            await this.menCategory.click();
        }

        async clickKidsCategory() {
            await this.kidsCategory.click();
        }

        // ── Brand Actions ─────────────────────────────────────────
        async clickBrand(brandName) {
            await this.page.locator(`a[href="/brand_products/${brandName}"]`).click();
        }

        // ── Subscription Actions ──────────────────────────────────
        async subscribeWithEmail(email) {
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await this.subscribeEmail.fill(email);
            await this.subscribeBtn.click();
        }

        


}

module.exports = { ProductPage };