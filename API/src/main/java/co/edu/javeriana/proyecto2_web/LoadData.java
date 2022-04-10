package co.edu.javeriana.proyecto2_web;

import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;

import co.edu.javeriana.proyecto2_web.entities.Admin;
import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.entities.BillElement;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.BillElementRepository;
import co.edu.javeriana.proyecto2_web.repositories.BillRepository;
import co.edu.javeriana.proyecto2_web.repositories.CartRepository;
import co.edu.javeriana.proyecto2_web.repositories.ProductRepository;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;

@Configuration
class LoadData {

	@Bean
	CommandLineRunner initUsersInDatabase(UserRepository userRepository) {
		return args -> {
			System.out.println("Starting Users");
			userRepository.save(createUser("abril@cano.com", "@bril123", true));
			userRepository.save(createUser("admin@admin.com", "@dmin", true));
			userRepository.save(createUser("hola@aol.com", "Contr4senia", false));
			userRepository.save(createUser("n@bayona.com", "Hola_1", false));
		};
	}

	@Bean
	CommandLineRunner initProductsInDatabase(ProductRepository productRepository) {
		return args -> {
			System.out.println("Starting Products");
			productRepository.save(createProduct("JS Hoodie", "Muestra tu pasión por JS", 70.000,
					"https://cdn.shopify.com/s/files/1/0537/9483/2552/products/BC_Nodejs_M2_6d20acb8-d70c-45f5-a14a-5087648b92bf_480x.jpg?v=1614374723",
					"offer"));
			productRepository.save(createProduct("Angular Hoodie", "Si, sé Angular ¿Se nota?", 75.500,
					"https://cdn.shopify.com/s/files/1/0537/9483/2552/products/Angular_M2_7483b564-40ed-492a-bd9c-bc577865f4d6_480x.jpg?v=1614874560",
					"offer exclusive new"));
			productRepository.save(createProduct("Code like a Girl Hoodie",
					"El saco que todo el mundo debería de tener", 80.500,
					"https://ih1.redbubble.net/image.2967274245.9043/ssrco,mhoodie,womens,fafafa:ca443f4786,front,square_product,x600-bg,f8f8f8.1u1.jpg",
					"new"));
			productRepository.save(createProduct("StackOverflow Hoodie",
					"La herramienta más poderosa de un desarrollador", 80.000,
					"https://ih1.redbubble.net/image.1055011715.8274/ssrco,mhoodie,mens,101010:01c5ca27c6,front,square_product,x600-bg,f8f8f8.1.jpg",
					"exclusive"));
		};
	}

	@Bean
	CommandLineRunner initCartsInDatabase(UserRepository userRepository, ProductRepository productRepository,
			BillElementRepository billElementRepository, CartRepository cartRepository) {
		return args -> {
			System.out.println("Starting carts");
			User user = userRepository.findByEmail("n@bayona.com", PageRequest.of(0, 1)).getContent().get(0);
			System.out.println("Agregando al carrito de " + user);
			BillElement b1 = createBillElement(productRepository.findById((long) 1).get(), (long) 2);
			BillElement b2 = createBillElement(productRepository.findById((long) 2).get(), (long) 2);
			BillElement b3 = createBillElement(productRepository.findById((long) 3).get(), (long) 2);
			List<BillElement> list = Arrays.asList(b1, b2, b3);
			billElementRepository.saveAll(list);
			Cart cart = createCart(user, list);
			cartRepository.save(cart);
		};
	}

	@Bean
	CommandLineRunner initBillsInDatabase(UserRepository userRepository, ProductRepository productRepository,
			CartRepository cartRepository, BillRepository billRepository) {
		return args -> {
			System.out.println("Starting bills");
			Cart cart = cartRepository.findById((long) 1).get();
			Bill bill = createBill(cart.getUser(), cart);
			billRepository.save(bill);
		};
	}
	

	@Bean
	CommandLineRunner init(UserRepository userRepository, ProductRepository productRepository,
			BillRepository billRepository, CartRepository cartRepository) {
		return args -> {
			try {
				while (true) {
					Scanner sc = new Scanner(System.in);
					System.out.println("1. Add User/Admin");
					System.out.println("2. Add Product");
					System.out.println("3. All Users");
					System.out.println("4. All Products");
					System.out.println("5. All Carts");
					System.out.println("6. All Bills");
					System.out.println("7. Users by domain");
					System.out.println("8. Remove product");
					System.out.println("9. Remove user");
					System.out.println("10. Remove cart");
					System.out.println("11. Bills by user");
					int opc = sc.nextInt();
					switch (opc) {

						case 1: {
							System.out.println("Email:");
							String email = sc.nextLine();
							System.out.println("Password:");
							String password = sc.nextLine();
							boolean admin = sc.nextBoolean();
							System.out.println("Email:" + email + "\nPassword:" + password + "\nAdmin:" + admin);
							userRepository.save(LoadData.createUser(email, password, admin));
							break;
						}

						case 2: {
							System.out.println("Name:");
							String name = sc.nextLine();
							System.out.println("Description:");
							String description = sc.nextLine();
							System.out.println("Image Url");
							String imageUrl = sc.nextLine();
							System.out.println("Specials:");
							String specials = sc.nextLine();
							System.out.println("Price:");
							double price = sc.nextDouble();
							System.out.println("Name:" + name + "\nPrice:" + price + "\nDescription:" + description
									+ "\nImage Url:" + imageUrl + "\nSpecials:" + specials);
							productRepository
									.save(LoadData.createProduct(name, description, price, imageUrl, specials));
							break;
						}

						case 3: {
							System.out.println("All Users:");
							for (User u : userRepository.findAll()) {
								System.out.println(u);
							}
							break;
						}

						case 4: {
							System.out.println("All Products:");
							for (Product p : productRepository.findAll()) {
								System.out.println(p);
							}
							break;
						}

						case 5: {
							System.out.println("All Carts:");
							for (Cart c : cartRepository.findAll()) {
								System.out.println(c);
							}
							break;
						}

						case 6: {
							System.out.println("All Bills:");
							for (Bill b : billRepository.findAll()) {
								System.out.println(b);
							}
							break;
						}

						case 7: {
							System.out.println("Domain:");
							String domain = sc.nextLine();
							System.out.println("Users with domain:" + domain);
							for (User u : userRepository.findByEmailEndingWith(domain, PageRequest.of(0, 10))) {
								System.out.println(u);
							}
							break;
						}

						case 8: {
							System.out.println("Product Id:");
							long id = sc.nextLong();
							System.out.println("Product Id:" + id);
							productRepository.deleteById(id);
							break;
						}

						case 9: {
							System.out.println("User Id:");
							long id = sc.nextLong();
							System.out.println("User Id:" + id);
							userRepository.deleteById(id);
							break;
						}

						case 10: {
							System.out.println("Cart Id:");
							long id = sc.nextLong();
							System.out.println("Cart Id:" + id);
							cartRepository.deleteById(id);
							break;
						}

						case 11: {
							System.out.println("User Id:");
							long id = sc.nextLong();
							System.out.println("User Id:" + id);
							System.out.println("Bills with user:" + id);
							for (Bill b : billRepository.findByUserId(id, PageRequest.of(0, 10))) {
								System.out.println(b);
							}
							break;
						}

						default:
							System.out.println("Invalid option");
							System.exit(1);
							sc.close();
							break;
					}
				}
			} catch (Exception e) {
			}
		};
	}

	static User createUser(String email, String password, boolean isAdmin) {
		User user = (isAdmin) ? new Admin(email, password) : new User(email, password);
		return user;
	}

	static Product createProduct(String name, String description, double price, String imageUrl, String specials) {
		Product product = new Product(name, description, price, imageUrl, specials);
		return product;
	}

	static Cart createCart(User user, List<BillElement> billElements) {
		Cart cart = new Cart(user, billElements);
		return cart;
	}

	static BillElement createBillElement(Product product, Long quantity) {
		BillElement billElement = new BillElement(product, quantity);
		return billElement;
	}

	static Bill createBill(User user, Cart cart) {
		Bill bill = new Bill(cart, user);
		return bill;
	}
}
