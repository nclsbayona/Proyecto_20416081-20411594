package co.edu.javeriana.proyecto2_web;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

import co.edu.javeriana.proyecto2_web.entities.Admin;
import co.edu.javeriana.proyecto2_web.entities.Bill;
import co.edu.javeriana.proyecto2_web.entities.BillElement;
import co.edu.javeriana.proyecto2_web.entities.Cart;
import co.edu.javeriana.proyecto2_web.entities.Product;
import co.edu.javeriana.proyecto2_web.entities.Role;
import co.edu.javeriana.proyecto2_web.entities.User;
import co.edu.javeriana.proyecto2_web.repositories.BillRepository;
import co.edu.javeriana.proyecto2_web.repositories.BillElementRepository;
import co.edu.javeriana.proyecto2_web.repositories.CartRepository;
import co.edu.javeriana.proyecto2_web.repositories.ProductRepository;
import co.edu.javeriana.proyecto2_web.repositories.RoleRepository;
import co.edu.javeriana.proyecto2_web.repositories.UserRepository;

@Configuration
class LoadData {

	@Bean
	CommandLineRunner initUsersInDatabase(UserRepository userRepository, RoleRepository roleRepository,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		return args -> {
			System.out.println("STARTING USERS");
			Role adminRole = new Role();
			adminRole.setName("ADMIN");
			roleRepository.save(adminRole);

			Role userRole = new Role();
			userRole.setName("USER");
			roleRepository.save(userRole);

			User admin = new User();
			admin.setEmail("abril@cano.com");
			admin.setPassword(bCryptPasswordEncoder.encode("@bril123"));
			admin.setRol(userRole);
			userRepository.save(admin);

			User visitor = new User();
			visitor.setEmail("admin@admin.com");
			visitor.setPassword(bCryptPasswordEncoder.encode("password"));
			visitor.setRol(adminRole);
			userRepository.save(visitor);

			User customer = new User();
			customer.setEmail("n@bayona.com");
			customer.setPassword(bCryptPasswordEncoder.encode("Hol@_1"));
			customer.setRol(userRole);
			userRepository.save(customer);
		};
	}

	@Transactional
	@Bean
	CommandLineRunner initProductsInDatabase(ProductRepository productRepository) {
		return args -> {
			System.out.println("STARTING PRODUCTS");
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
			System.out.println("----------------------------------------------------------------------------");
		};
	}

	/*
	@Transactional
	@Bean
	CommandLineRunner initCartsInDatabase(UserRepository userRepository, ProductRepository productRepository,
			BillElementRepository billElementRepository, CartRepository cartRepository) {
		return args -> {
			System.out.println("Starting carts");
			User user = userRepository.findByEmail("abril@cano.com", PageRequest.of(0, 1)).getContent().get(0);
			System.out.println("Agregando al carrito de " + user);
			BillElement b1 = createBillElement(productRepository.findById((long) 1).get(), (long) 2);
			billElementRepository.save(b1);
			BillElement b2 = createBillElement(productRepository.findById((long) 2).get(), (long) 2);
			BillElement b3 = createBillElement(productRepository.findById((long) 3).get(), (long) 2);
			List<BillElement> billElements = new ArrayList<BillElement>();

			System.out.println("Agregando al carrito " + b1);
			
			 billElements.add(b1);
			 Cart cart=createCart(user, billElements);
			 cartRepository.save(cart);
			 System.out.println(cart);
			
		};
	}

	
	@Bean
	CommandLineRunner initBillsInDatabase(UserRepository userRepository,
	ProductRepository productRepository,
	CartRepository cartRepository, BillRepository billRepository) {
	return args -> {
	System.out.println("Starting bills");
	Cart cart = cartRepository.findById((long) 1).get();
	Bill bill = createBill(cart.getUser(), cart);
	billRepository.save(bill);
	};
	}
	 */

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
