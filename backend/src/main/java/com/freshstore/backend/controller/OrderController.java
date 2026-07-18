package com.freshstore.backend.controller;

import com.freshstore.backend.dto.CheckoutRequest;
import com.freshstore.backend.entity.Order;
import com.freshstore.backend.entity.OrderItem;
import com.freshstore.backend.entity.Product;
import com.freshstore.backend.repository.OrderRepository;
import com.freshstore.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CheckoutRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Giỏ hàng trống"));
        }

        Order order = new Order();
        order.setCustomerName(request.getCustomerName());
        order.setPhone(request.getPhone());
        order.setAddress(request.getAddress());
        order.setNote(request.getNote());
        order.setPaymentMethod(request.getPaymentMethod());

        BigDecimal total = BigDecimal.ZERO;

        for (CheckoutRequest.CheckoutItem itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại: " + itemReq.getProductId()));

            if (product.getStockQuantity() < itemReq.getQuantity()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", "Sản phẩm " + product.getName() + " không đủ số lượng tồn kho"
                ));
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setPriceAtOrder(product.getPrice());
            order.getItems().add(item);

            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));

            // Trừ tồn kho
            product.setStockQuantity(product.getStockQuantity() - itemReq.getQuantity());
            productRepository.save(product);
        }

        order.setTotalAmount(total);
        Order saved = orderRepository.save(order);

        return ResponseEntity.ok(Map.of(
                "message", "Đặt hàng thành công",
                "orderId", saved.getId(),
                "totalAmount", saved.getTotalAmount()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}