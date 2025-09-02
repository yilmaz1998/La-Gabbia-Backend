/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('menu_items').del()
  await knex('menu_items').insert([
 { name: "Margherita Pizza", price: 8.99, image_url: "https://www.chelseasmessyapron.com/wp-content/uploads/2019/06/15-Minute-Margarita-Pizza-5.jpg", description: "Classic pizza with tomato and mozzarella", type: "Pizza" },
 { name: "Pepperoni Pizza", price: 9.99, image_url: "https://daddioskitchen.com/wp-content/uploads/2023/01/IMG-5299.jpg", description: "Pepperoni, cheese, tomato sauce", type: "Pizza" },
 { name: "Veggie Pizza", price: 9.49, image_url: "https://hellolittlehome.com/wp-content/uploads/2014/08/summer-pizza-3.jpg", description: "Pizza with assorted vegetables", type: "Pizza" },
 { name: "Hawaiian Pizza", price: 10.49, image_url: "https://hips.hearstapps.com/hmg-prod/images/hawaiian-pizza-index-65f4641de4b08.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*", description: "Pizza with ham and pineapple", type: "Pizza" },
 { name: "BBQ Chicken Pizza", price: 10.99, image_url: "https://thevirtualcaterer.com/wp-content/uploads/2024/05/BBQ-Chicken-Pizza-2-500x500.jpg", description: "Pizza with BBQ chicken and onions", type: "Pizza" },
 { name: "Cheeseburger", price: 7.99, image_url: "https://www.oliveandmango.com/images/uploads/2021_06_21_classic_grilled_cheeseburger_1.jpg", description: "Beef burger with cheese and lettuce", type: "Burger" },
 { name: "Veggie Burger", price: 7.49, image_url: "https://www.realsimple.com/thmb/z3cQCYXTyDQS9ddsqqlTVE8fnpc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/real-simple-mushroom-black-bean-burgers-recipe-0c365277d4294e6db2daa3353d6ff605.jpg", description: "Grilled veggie patty with fresh veggies", type: "Burger" },
 { name: "Bacon Burger", price: 8.49, image_url: "https://www.sargento.com/assets/Uploads/Recipe/Image/cheddarbaconcheeseburger__FocusFillWyIwLjAwIiwiMC4wMCIsODAwLDQ3OF0_CompressedW10.jpg", description: "Beef burger with bacon and cheese", type: "Burger" },
 { name: "Grilled Chicken Sandwich", price: 7.99, image_url: "https://assets.bonappetit.com/photos/5b69f160dbdc967b93bc1c42/4:3/w_4024,h_3018,c_limit/ba-grilled-chicken-sando.jpg", description: "Grilled chicken with lettuce and tomato", type: "Sandwich" },
 { name: "BLT Sandwich", price: 6.99, image_url: "https://www.add1tbsp.com/wp-content/uploads/2016/09/MG_5584.jpg", description: "Bacon, lettuce, tomato on toast", type: "Sandwich" },
 { name: "Club Sandwich", price: 7.49, image_url: "https://simplyhomecooked.com/wp-content/uploads/2023/12/turkey-club-sandwich-3.jpg", description: "Triple-layer sandwich with turkey, bacon, lettuce", type: "Sandwich" },
 { name: "Spaghetti Bolognese", price: 9.49, image_url: "https://vikalinka.com/wp-content/uploads/2020/03/Spaghetti-Bolognese-13-Edit.jpg", description: "Pasta with meat sauce", type: "Pasta" },
 { name: "Fettuccine Alfredo", price: 9.99, image_url: "https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg", description: "Pasta with creamy Alfredo sauce", type: "Pasta" },
 { name: "Lasagna", price: 10.99, image_url: "https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/1391_4k.jpg", description: "Layers of pasta, meat, and cheese", type: "Pasta" },
 { name: "Chicken Alfredo", price: 10.99, image_url: "https://girlwiththeironcast.com/wp-content/uploads/2022/04/blackened-chicken-alfredo-9.jpg", description: "Pasta with chicken in Alfredo sauce", type: "Pasta" },
 { name: "Mushroom Risotto", price: 11.49, image_url: "https://www.sandravalvassori.com/wp-content/uploads/2024/02/Risotto-Mushroom-2-352-500x500.jpg", description: "Creamy risotto with mushrooms", type: "Pasta" },
 { name: "Caesar Salad", price: 5.99, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpoeHKz2IGrtZfIwPOB1qdAr4dLP2B1gCwUg&s", description: "Romaine, croutons, Caesar dressing", type: "Salad" },
 { name: "Garden Salad", price: 5.49, image_url: "https://feelgoodfoodie.net/wp-content/uploads/2023/03/Everyday-Garden-Salad-07.jpg", description: "Mixed greens with vegetables", type: "Salad" },
 { name: "Greek Salad", price: 5.49, image_url: "https://www.themediterraneandish.com/wp-content/uploads/2023/08/Greek-salad-web-story-poster-image.jpeg", description: "Tomato, cucumber, olives, feta cheese", type: "Salad" },
 { name: "Caprese Salad", price: 5.99, image_url: "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/07/Caprese-Salad-2-2.jpg", description: "Tomato, mozzarella, basil", type: "Salad" },
 { name: "Chicken Wings", price: 6.99, image_url: "https://rusticthaikitchen.com/wp-content/uploads/2025/02/Chicken-Wings-6-Pcs-1-1.webp", description: "Spicy chicken wings, 6 pcs", type: "Snack" },
 { name: "French Fries", price: 2.99, image_url: "https://images.themodernproper.com/production/posts/2022/Homemade-French-Fries_8.jpg?w=1200&h=1200&q=60&fm=jpg&fit=crop&dm=1662474181&s=15046582e76b761a200998df2dcad0fd", description: "Crispy golden fries", type: "Snack" },
 { name: "Onion Rings", price: 3.49, image_url: "https://static01.nyt.com/images/2020/04/22/dining/ejm-sourdough-03/ejm-sourdough-03-mediumSquareAt3X.jpg", description: "Battered and fried onion rings", type: "Snack" },
 { name: "Mozzarella Sticks", price: 4.49, image_url: "https://easyweeknightrecipes.com/wp-content/uploads/2024/04/Mozzarella-Sticks_0013.jpg", description: "Fried cheese sticks with marinara", type: "Snack" },
 { name: "Chicken Nuggets", price: 5.49, image_url: "https://joyfoodsunshine.com/wp-content/uploads/2021/08/healthy-homemade-chicken-nuggets-recipe-7.jpg", description: "Breaded chicken pieces, 6 pcs", type: "Snack" },
 { name: "Garlic Bread", price: 3.99, image_url: "https://www.ambitiouskitchen.com/wp-content/uploads/2023/02/Garlic-Bread-4.jpg", description: "Toasted garlic bread slices", type: "Snack" },
 { name: "Bruschetta", price: 4.49, image_url: "https://cdn.loveandlemons.com/wp-content/uploads/2025/05/bruschetta.jpg", description: "Grilled bread with tomato topping", type: "Snack" },
 { name: "Pancakes", price: 5.99, image_url: "https://hips.hearstapps.com/hmg-prod/images/best-homemade-pancakes-index-640775a2dbad8.jpg?crop=0.8890503582601677xw:1xh;center,top&resize=1200:*", description: "Fluffy pancakes with syrup", type: "Dessert" },
 { name: "Waffles", price: 6.49, image_url: "https://noshingwiththenolands.com/wp-content/uploads/2018/01/Belgian-Waffles-IMG_4979-CROPPED.jpg", description: "Crispy waffles with toppings", type: "Dessert" },
 { name: "Chocolate Cake", price: 4.99, image_url: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice.jpg", description: "Rich chocolate cake slice", type: "Dessert" },
 { name: "Cheesecake", price: 5.49, image_url: "https://butternutbakeryblog.com/wp-content/uploads/2020/04/cheesecake-slice.jpg", description: "Classic cheesecake slice", type: "Dessert" },
 { name: "Ice Cream Sundae", price: 4.99, image_url: "https://preppykitchen.com/wp-content/uploads/2021/04/Hot-Fudge-Sundae-Feature.jpg", description: "Ice cream with toppings", type: "Dessert" },
 { name: "Coffee", price: 2.49, image_url: "https://media.cnn.com/api/v1/images/stellar/prod/150929101049-black-coffee-stock.jpg?q=w_3000,h_3074,x_0,y_0,c_fill", description: "Fresh brewed coffee", type: "Drink" },
 { name: "Tea", price: 1.99, image_url: "https://www.botanicalinterests.com/community/blog/wp-content/uploads/2024/08/herbs-for-tea.jpg", description: "Hot herbal tea", type: "Drink" },
 { name: "Soda", price: 1.49, image_url: "https://media.istockphoto.com/id/533575209/photo/soft-drink-being-poured-into-glass.jpg?s=612x612&w=0&k=20&c=OPfGgxIkH_6j-ozfWol5RxypTAIZSmkR3NL-qsJ7_Qk=", description: "Carbonated drink", type: "Drink" },
 { name: "Lemonade", price: 2.49, image_url: "https://www.texanerin.com/content/uploads/2014/08/honey-lemonade-2-650x975.jpg", description: "Fresh lemonade", type: "Drink" },
 { name: "Iced Coffee", price: 2.99, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQwJ4Cs8IV6EmaxczPWKeVgKuPcAgG8Ou-w&s", description: "Cold coffee with ice", type: "Drink" },
 { name: "Espresso", price: 2.49, image_url: "https://www.tasteofhome.com/wp-content/uploads/2023/03/TOH-espresso-GettyImages-1291298315-JVcrop.jpg?fit=700,467", description: "Strong espresso shot", type: "Drink" },
 { name: "Cappuccino", price: 2.99, image_url: "https://tchibo.us/cdn/shop/articles/cappucino.jpg?v=1690196460&width=1440", description: "Espresso with steamed milk foam", type: "Drink" },
 { name: "Latte", price: 3.49, image_url: "https://www.frontiercoop.com/media/recipe/resized/520x520/wysiwyg/Chicory-Root-Latte-1080x1080.jpg", description: "Espresso with milk", type: "Drink" },
 { name: "Mocha", price: 3.99, image_url: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/the_perfect_mocha_coffee_29100_16x9.jpg.webp", description: "Chocolate flavored coffee", type: "Drink" }
  ]);
};
