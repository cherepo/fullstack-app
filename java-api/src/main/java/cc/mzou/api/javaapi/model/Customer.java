package cc.mzou.api.javaapi.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name="Customer")
public class Customer implements Serializable {
  private static final long serialVersionUID = -7068547766739353586L;

  @Id
  @Getter
  @Setter
  @Column(name="ID")
  private Integer id = new Random().nextInt(Integer.MAX_VALUE);

  @Getter
  @Setter
  private String firstname;

  @Getter
  @Setter
  private String lastname;

  @Getter
  @Setter
  private Date dob;

  @Getter
  @Setter
  private String email;

  @Getter
  @Setter
  @OneToMany(cascade = CascadeType.ALL,
    fetch = FetchType.LAZY,
    mappedBy = "customer")
  private Set<Order> orders = new HashSet<>();
}
