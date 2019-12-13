package cc.mzou.api.cheservice.restcontroller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/actuator")
class HealthController {
  @RequestMapping("/health")
  fun healthCheck(): String{
    return "Health check " + Date();
  }
}
