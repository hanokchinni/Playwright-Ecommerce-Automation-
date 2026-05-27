const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../Pages/homePage');
const { LoginPage }    = require('../Pages/loginPage');
const { ProductPage } = require('../Pages/productPage');
const userData         = require('../test-data/users.json');

test.describe('Products', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.closeAdIfPresent();

    await expect(homePage.logo).toBeVisible();

    
  });


  test('TC8: Verify All Products and product detail page', async ({ page }) => {
    const homePage     = new HomePage(page);
    const productsPage = new ProductPage(page);


    //navigate to the page
    await homePage.navigateToProducts();
    //  await homePage.closeAdIfPresent(); 


    //verify user  is navigated to All products page successfully
    await expect(productsPage.allProductsHeading).toBeVisible()

    //product list is visible
    await expect(productsPage.productCards.first()).toBeVisible() //check the first card rather than all

    //click on view product 
    await productsPage.viewProduct(0)

    //user is landed 
    await expect(page).toHaveURL(/product_details\/1/);

    //verify product details
    await expect(productsPage.productDetailName).toBeVisible();
    await expect(productsPage.productDetailCategory).toBeVisible();
    await expect(productsPage.productDetailPrice).toBeVisible();
    await expect(productsPage.productDetailAvailability).toBeVisible();
    await expect(productsPage.productDetailCondition).toBeVisible();
    await expect(productsPage.productDetailBrand).toBeVisible();
    });


   //failed in all test at once
   
    test('TC-9:Search Product',async ({page})=>{

      const homePage = new HomePage(page);
      const productPage = new ProductPage(page);
      const search = userData.searchProduct;

      //naviagte to productPage
      await homePage.navigateToProducts();
     

       await homePage.closeAdIfPresent(); 

      //verify user is navigated
      await expect(productPage.allProductsHeading).toBeVisible()

      //seacrh product name
      await productPage.searchProduct(search.name);

      //verify searched products is visible
      await expect(productPage.searchedProducts.first()).toBeVisible()

      //all searched products
      let count = await productPage.searchedProducts.count()
      for(let i=0;i<count;i++)
      {
        await expect(productPage.searchedProducts.nth(i)).toBeVisible()
      }

       
    })

    test('TC18: View Category Products', async ({ page }) => {
    const homePage     = new HomePage(page);
    const productsPage = new ProductPage(page);

    // await homePage.closeAdIfPresent();

    // Step 1 - Verify categories visible on left sidebar
    await expect(productsPage.categorySection).toBeVisible();

    // Step 2 - Click Women category
    await productsPage.clickWomenCategory();

    // Step 3 - Click Dress under Women category
     await page.goto('/category_products/1');
    await homePage.closeAdIfPresent();

    // Step 4 - Verify category page displayed
    await expect(productsPage.categoryPageHeading).toBeVisible();
    await expect(page).toHaveURL(/category_products/);

    // Step 5 - Click Men category from sidebar
    await productsPage.clickMenCategory();

    // Step 6 - Click Tshirts under Men category
    await page.waitForTimeout(1500);
    await productsPage.menTshirts.dispatchEvent('click');
      await homePage.closeAdIfPresent();

    // Step 7 - Verify Men category page displayed
    await expect(productsPage.categoryPageHeading).toBeVisible();
    await expect(page).toHaveURL(/category_products/);
    });

    test('TC19: View & Cart Brand Products', async ({ page }) => {
    const homePage     = new HomePage(page);
    const productsPage = new ProductPage(page);

    // Step 1 - Navigate to Products page
    await homePage.navigateToProducts();
    await homePage.closeAdIfPresent();

    // Step 2 - Verify Brands visible on left sidebar
    await expect(productsPage.brandsSidebar).toBeVisible();

    // Step 3 - Click on any brand (Polo)
    await productsPage.brandPolo.dispatchEvent('click'); 
    await homePage.closeAdIfPresent();

    // Step 4 - Verify brand page displayed
    await expect(productsPage.brandPageHeading).toBeVisible();
    await expect(page).toHaveURL(/brand_products\/Polo/);

    // Step 5 - Verify brand products are displayed
    await expect(productsPage.productCards.first()).toBeVisible();

    // Step 6 - Click another brand (H&M)
    await productsPage.brandHM.dispatchEvent('click');
    await homePage.closeAdIfPresent();

    // Step 7 - Verify new brand page displayed
    await expect(productsPage.brandPageHeading).toBeVisible();
    await expect(page).toHaveURL(/brand_products/);

    // Step 8 - Verify new brand products are displayed
    await expect(productsPage.productCards.first()).toBeVisible();

    });

    test('TC21: Add Review on Product', async ({ page }) => {
    const homePage     = new HomePage(page);
    const productsPage = new ProductPage(page);
    const review       = userData.review;

    // Step 1 - Navigate to Products page
    await homePage.navigateToProducts();
    await homePage.closeAdIfPresent();

    // Step 2 - Verify ALL PRODUCTS page visible
    await expect(productsPage.allProductsHeading).toBeVisible();

    // Step 3 - Click View Product
    await productsPage.viewProduct(0);
    await homePage.closeAdIfPresent();

    // Step 4 - Verify Write Your Review visible
    await expect(productsPage.writeReviewHeading).toBeVisible();

    // Step 5 - Submit review
    await productsPage.submitReview(
        review.name,
        review.email,
        review.review
    );

    // Step 6 - Verify success message
    await expect(productsPage.reviewSuccessMsg).toBeVisible();
     });

     
});