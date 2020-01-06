package cc.mzou.api.javaapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.Random;

@Entity
@Table(name="Orders")
public class Order {
  private static final long serialVersionUID = -7068547766739353586L;

  @Id
  @Getter
  @Setter
  @Column(name="ID")
  private Integer id = new Random().nextInt(Integer.MAX_VALUE);

  @Getter
  @Setter
  private String ordername;

  @Getter
  @Setter
  private Long price;

  @Getter
  @Setter
  private Date orderdate;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "customer_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JsonIgnore
  private Customer customer;
}
