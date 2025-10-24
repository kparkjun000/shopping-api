package com.shopping.config;

import com.shopping.entity.Category;
import com.shopping.entity.Product;
import com.shopping.entity.User;
import com.shopping.repository.CategoryRepository;
import com.shopping.repository.ProductRepository;
import com.shopping.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        
        return args -> {
            // Check if data already exists
            if (categoryRepository.count() > 0) {
                log.info("Database already contains data. Skipping initialization.");
                return;
            }

            log.info("Initializing database with sample data...");

            // Create Categories
            Category electronics = Category.builder()
                    .name("전자제품")
                    .description("스마트폰, 노트북, 태블릿 등")
                    .build();
            categoryRepository.save(electronics);

            Category fashion = Category.builder()
                    .name("패션의류")
                    .description("남성/여성 의류 및 액세서리")
                    .build();
            categoryRepository.save(fashion);

            Category beauty = Category.builder()
                    .name("뷰티")
                    .description("화장품, 스킨케어 제품")
                    .build();
            categoryRepository.save(beauty);

            Category sports = Category.builder()
                    .name("스포츠")
                    .description("운동용품 및 스포츠웨어")
                    .build();
            categoryRepository.save(sports);

            Category home = Category.builder()
                    .name("홈/리빙")
                    .description("가구, 인테리어 소품")
                    .build();
            categoryRepository.save(home);

            // Electronics Products
            Product laptop = Product.builder()
                    .name("맥북 프로 16인치")
                    .description("M3 Max 칩, 36GB RAM, 1TB SSD")
                    .price(new BigDecimal("3890000"))
                    .stockQuantity(25)
                    .imageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop")
                    .category(electronics)
                    .isActive(true)
                    .build();
            productRepository.save(laptop);

            Product smartphone = Product.builder()
                    .name("갤럭시 S24 Ultra")
                    .description("256GB, AI 카메라, 5G 지원")
                    .price(new BigDecimal("1590000"))
                    .stockQuantity(50)
                    .imageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop")
                    .category(electronics)
                    .isActive(true)
                    .build();
            productRepository.save(smartphone);

            Product tablet = Product.builder()
                    .name("아이패드 프로 12.9")
                    .description("M2 칩, 128GB, 애플 펜슬 지원")
                    .price(new BigDecimal("1590000"))
                    .stockQuantity(30)
                    .imageUrl("https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop")
                    .category(electronics)
                    .isActive(true)
                    .build();
            productRepository.save(tablet);

            Product airpods = Product.builder()
                    .name("에어팟 프로 2세대")
                    .description("액티브 노이즈 캔슬링, USB-C 충전")
                    .price(new BigDecimal("359000"))
                    .stockQuantity(100)
                    .imageUrl("https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop")
                    .category(electronics)
                    .isActive(true)
                    .build();
            productRepository.save(airpods);

            // Fashion Products
            Product jacket = Product.builder()
                    .name("노스페이스 다운 재킷")
                    .description("프리미엄 구스다운, 방수 기능")
                    .price(new BigDecimal("389000"))
                    .stockQuantity(40)
                    .imageUrl("https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop")
                    .category(fashion)
                    .isActive(true)
                    .build();
            productRepository.save(jacket);

            Product sneakers = Product.builder()
                    .name("나이키 에어맥스 97")
                    .description("클래식 디자인, 에어 쿠셔닝")
                    .price(new BigDecimal("219000"))
                    .stockQuantity(60)
                    .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop")
                    .category(fashion)
                    .isActive(true)
                    .build();
            productRepository.save(sneakers);

            Product dress = Product.builder()
                    .name("원피스 드레스")
                    .description("여름 시즌 플로럴 패턴")
                    .price(new BigDecimal("89000"))
                    .stockQuantity(35)
                    .imageUrl("https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=500&fit=crop")
                    .category(fashion)
                    .isActive(true)
                    .build();
            productRepository.save(dress);

            Product jeans = Product.builder()
                    .name("리바이스 511 슬림핏 청바지")
                    .description("편안한 착용감의 슬림핏")
                    .price(new BigDecimal("119000"))
                    .stockQuantity(80)
                    .imageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop")
                    .category(fashion)
                    .isActive(true)
                    .build();
            productRepository.save(jeans);

            // Beauty Products
            Product skincare = Product.builder()
                    .name("설화수 자음생 크림")
                    .description("한방 안티에이징 크림")
                    .price(new BigDecimal("180000"))
                    .stockQuantity(45)
                    .imageUrl("https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=500&fit=crop")
                    .category(beauty)
                    .isActive(true)
                    .build();
            productRepository.save(skincare);

            Product perfume = Product.builder()
                    .name("샤넬 No.5 오 드 퍼퓸")
                    .description("클래식한 여성 향수 100ml")
                    .price(new BigDecimal("195000"))
                    .stockQuantity(30)
                    .imageUrl("https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop")
                    .category(beauty)
                    .isActive(true)
                    .build();
            productRepository.save(perfume);

            Product lipstick = Product.builder()
                    .name("맥 루비우 립스틱")
                    .description("매트 피니시, 장시간 지속")
                    .price(new BigDecimal("32000"))
                    .stockQuantity(120)
                    .imageUrl("https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop")
                    .category(beauty)
                    .isActive(true)
                    .build();
            productRepository.save(lipstick);

            // Sports Products
            Product yoga = Product.builder()
                    .name("룰루레몬 요가매트")
                    .description("5mm 두께, 친환경 소재")
                    .price(new BigDecimal("98000"))
                    .stockQuantity(55)
                    .imageUrl("https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop")
                    .category(sports)
                    .isActive(true)
                    .build();
            productRepository.save(yoga);

            Product dumbbell = Product.builder()
                    .name("조절식 덤벨 세트")
                    .description("5-24kg 무게 조절 가능")
                    .price(new BigDecimal("189000"))
                    .stockQuantity(20)
                    .imageUrl("https://images.unsplash.com/photo-1638805981949-f5c57034c9d2?w=500&h=500&fit=crop")
                    .category(sports)
                    .isActive(true)
                    .build();
            productRepository.save(dumbbell);

            Product bicycle = Product.builder()
                    .name("로드 자전거")
                    .description("카본 프레임, 21단 변속")
                    .price(new BigDecimal("1890000"))
                    .stockQuantity(15)
                    .imageUrl("https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop")
                    .category(sports)
                    .isActive(true)
                    .build();
            productRepository.save(bicycle);

            Product sportswear = Product.builder()
                    .name("아디다스 러닝 세트")
                    .description("통기성 좋은 운동복 상하의")
                    .price(new BigDecimal("129000"))
                    .stockQuantity(70)
                    .imageUrl("https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=500&fit=crop")
                    .category(sports)
                    .isActive(true)
                    .build();
            productRepository.save(sportswear);

            // Home/Living Products
            Product chair = Product.builder()
                    .name("허먼밀러 에어론 체어")
                    .description("인체공학적 사무용 의자")
                    .price(new BigDecimal("1690000"))
                    .stockQuantity(18)
                    .imageUrl("https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop")
                    .category(home)
                    .isActive(true)
                    .build();
            productRepository.save(chair);

            Product lamp = Product.builder()
                    .name("북유럽 스탠드 조명")
                    .description("LED, 밝기 조절 기능")
                    .price(new BigDecimal("78000"))
                    .stockQuantity(40)
                    .imageUrl("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop")
                    .category(home)
                    .isActive(true)
                    .build();
            productRepository.save(lamp);

            Product bedding = Product.builder()
                    .name("프리미엄 호텔 침구세트")
                    .description("퀸 사이즈, 이집트산 면")
                    .price(new BigDecimal("189000"))
                    .stockQuantity(25)
                    .imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=500&fit=crop")
                    .category(home)
                    .isActive(true)
                    .build();
            productRepository.save(bedding);

            Product plant = Product.builder()
                    .name("몬스테라 화분")
                    .description("대형 공기정화 식물")
                    .price(new BigDecimal("45000"))
                    .stockQuantity(50)
                    .imageUrl("https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&h=500&fit=crop")
                    .category(home)
                    .isActive(true)
                    .build();
            productRepository.save(plant);

            // Create Sample Users
            User user1 = User.builder()
                    .email("john.doe@example.com")
                    .name("홍길동")
                    .phone("010-1234-5678")
                    .address("서울특별시 강남구 테헤란로 123")
                    .build();
            userRepository.save(user1);

            User user2 = User.builder()
                    .email("jane.smith@example.com")
                    .name("김영희")
                    .phone("010-9876-5432")
                    .address("서울특별시 서초구 서초대로 456")
                    .build();
            userRepository.save(user2);

            log.info("Database initialized successfully!");
            log.info("Created {} categories", categoryRepository.count());
            log.info("Created {} products", productRepository.count());
            log.info("Created {} users", userRepository.count());
        };
    }
}
