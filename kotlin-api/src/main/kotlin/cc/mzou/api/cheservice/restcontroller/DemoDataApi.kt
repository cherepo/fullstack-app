package cc.mzou.api.cheservice.restcontroller

import cc.mzou.api.cheservice.model.Greeting
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.atomic.AtomicLong

@RestController
class DemoDataApi {
    val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(
            @RequestParam(name = "name", defaultValue = "world") name : String
    ) = Greeting(counter.incrementAndGet(), "Hello $name")
}