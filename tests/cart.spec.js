const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../Pages/homePage');
const { ProductPage }  = require('../Pages/productPage');
const { CartPage }     = require('../Pages/cartPage');
const { LoginPage }    = require('../Pages/loginPage');
const userData         = require('../test-data/users.json');


test.describe('test',()=>{
    test.beforeEach(async({page})=>{

        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.closeAdIfPresent();
        await expect(homePage.logo).toBeVisible();
    })
    
    test('Tc12: Add products to cart', async ({page})=>{

        const homePage = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage   = new CartPage(page);
        const loginPage  = new LoginPage(page);


        //naviagate to products page
        await homePage.navigateToProducts();
        await homePage.closeAdIfPresent()

        //hover over first product and add to cart
        await productPage.hoverAndAddToCart(0);
        await homePage.closeAdIfPresent()

        //continue shopping
        await productPage.continueShopping();

        //hover over second part
        await productPage.hoverAndAddToCart(1);
        await homePage.closeAdIfPresent()

        //view cart
        await productPage.viewCartFromModal();
        await homePage.closeAdIfPresent()

        //verify two products are added to cart
        await expect(cartPage.cartRows).toHaveCount(2);

        //verify prices ,quantity and  total price
         
        //names
        const product1Name = await cartPage.getProductName(0);
        const product2Name = await cartPage.getProductName(1);

        expect(product1Name).toBeTruthy
        expect(product2Name).toBeTruthy

        // Step 8 - Verify prices
        const product1Price = await cartPage.getProductPrice(0);
        const product2Price = await cartPage.getProductPrice(1);

        expect(product1Price).toBeTruthy();
        expect(product2Price).toBeTruthy();

        // Step 9 - Verify quantities
        const product1Qty = await cartPage.getProductQuantity(0);
        const product2Qty = await cartPage.getProductQuantity(1);

        expect(product1Qty).toBe('1'); // default quantity is 1
        expect(product2Qty).toBe('1');

        // Step 10 - Verify totals
        const product1Total = await cartPage.getProductTotal(0);
        const product2Total = await cartPage.getProductTotal(1);

        expect(product1Total).toBeTruthy();
        expect(product2Total).toBeTruthy();


    })

    test('TC13: verify product quantity ',async ({page})=>{

        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);
        const productPage = new ProductPage(page);


        //click view product
        await productPage.viewProduct(0);
        await homePage.closeAdIfPresent();


        //verify product detail is opened;
        await expect(page).toHaveURL(/product_details/)

        //set quantity to 4
        await productPage.setQuantity(4);

        //click add to cart
        await productPage.addToCartFromDetail()
        await homePage.closeAdIfPresent();

        //click view cart
        await productPage.viewCartFromModal();
        await homePage.closeAdIfPresent();

        //verify same quantity is there or not
         const qty = await cartPage.getProductQuantity(0);
         expect(qty).toBe('4');


     })

    test('TC17: Remove Products From Cart', async ({ page }) => {
        const homePage     = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage     = new CartPage(page);

        // Step 1 - Navigate to Products page
        await homePage.navigateToProducts();
        await homePage.closeAdIfPresent();

        // Step 2 - Add a product to cart
        await productPage.hoverAndAddToCart(0);
        await homePage.closeAdIfPresent();

        // Step 3 - Click View Cart
        await productPage.viewCartFromModal();
        await homePage.closeAdIfPresent();

        // Step 4 - Verify product is in cart
        await expect(cartPage.cartRows).toHaveCount(1);

        // Step 5 - Click X button to remove product
        await cartPage.removeProduct(0);

        // Step 6 - Verify cart is empty
        await expect(cartPage.emptyCartMsg).toBeVisible();  

    });

    test('TC20: Search Products and Verify Cart After Login', async ({ page }) => {
        const homePage     = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage     = new CartPage(page);
        const loginPage    = new LoginPage(page);
        const search       = userData.searchProduct;
        const user         = userData.registeredUser;

        // Step 1 - Navigate to Products page
        await homePage.navigateToProducts();
        await homePage.closeAdIfPresent();

        // Step 2 - Search for a product
        await productPage.searchProduct(search.name);
        await homePage.closeAdIfPresent();

        // Step 3 - Verify SEARCHED PRODUCTS visible
        await expect(productPage.searchedHeading).toBeVisible();

        // Step 4 - Add all searched products to cart
        const count = await productPage.searchedProducts.count();
        for (let i = 0; i < count; i++) {
        await productPage.hoverAndAddToCart(i);
        await homePage.closeAdIfPresent();
        await productPage.continueShopping();
        }

        // Step 5 - Go to Cart
        await homePage.navigateToCart();
        await homePage.closeAdIfPresent();

        // Step 6 - Verify products visible in cart
        await expect(cartPage.cartRows.first()).toBeVisible();

        // Step 7 - Navigate to Login
        await homePage.navigateToLogin();
        await homePage.closeAdIfPresent();

        // Step 8 - Login
        await loginPage.login(user.email, user.password);

        // Step 9 - Go to Cart again
        await homePage.navigateToCart();
        await homePage.closeAdIfPresent();

        // Step 10 - Verify products still visible after login
        await expect(cartPage.cartRows.first()).toBeVisible();
    });

    test('TC22: Add to Cart from Recommended Items', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        // Step 1 - Scroll to bottom of page
        // await homePage.scrollToBottom();
        // await homePage.closeAdIfPresent();

        // Step 2 - Verify Recommended Items visible
        await expect(homePage.recommendedSection).toBeVisible();

        // Step 3 - Add first recommended product to cart
        await homePage.addRecommendedProductToCart(0);
        await homePage.closeAdIfPresent();

        // Step 4 - Click View Cart from modal
        await homePage.viewCartFromModal();
        await homePage.closeAdIfPresent();

        // Step 5 - Verify product is in cart
        await expect(cartPage.cartRows).toHaveCount(1);
        await expect(cartPage.productNames.first()).toBeVisible();
    });


})
